import type { APIRoute } from 'astro';
import { sql } from '@vercel/postgres';
import { createIpHash, generateReplyKey, hashReplyKey } from '../../utils/crypto';
import { validateEnvVars } from '../../utils/auth';

export const prerender = false;

// Debug mode - set to false in production after fixing
const DEBUG_MODE = import.meta.env.DEV || import.meta.env.ENABLE_DEBUG === 'true';

// Helper to log debug info to database
async function logDebugError(errorType: string, messageType: string, errorMessage: string, payload: string) {
  try {
    await sql`
      INSERT INTO debug_log (error_type, message_type, error_message, payload, created_at)
      VALUES (${errorType}, ${messageType}, ${errorMessage.substring(0, 500)}, ${payload.substring(0, 1000)}, now())
    `;
  } catch (e) {
    console.error('Failed to write debug log:', e);
  }
}

// Rate limiting store (in-memory fallback)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ipHash: string): boolean {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000; // 10 minutes
  const maxRequests = 5;

  const entry = rateLimitStore.get(ipHash);
  
  if (!entry || now > entry.resetTime) {
    rateLimitStore.set(ipHash, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (entry.count >= maxRequests) {
    return false;
  }

  entry.count++;
  return true;
}

export const POST: APIRoute = async ({ request }) => {
  // Declare data outside try block so it's accessible in catch
  let data: any = null;
  
  try {
    // Validate required environment variables
    validateEnvVars(['MESSAGE_KEY_PEPPER']);
    
    // Debug: Check if POSTGRES_URL is set (don't log the actual value!)
    if (!process.env.POSTGRES_URL) {
      console.error('POSTGRES_URL environment variable is not set');
      return new Response(JSON.stringify({ ok: false, error: 'Database configuration error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    data = await request.json();
    
    // Validate required fields
    if (!data.body || data.body.trim().length === 0) {
      return new Response(JSON.stringify({ ok: false, error: 'Message body is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validate message type - support public letter, treehole, and private reply
    if (!data.type || !['public', 'treehole', 'private'].includes(data.type)) {
      return new Response(JSON.stringify({ ok: false, error: 'Invalid message type. Must be: public, treehole, or private' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validate reply preference
    const validReplyPrefs = data.type === 'private' ? ['email', 'key'] : ['none'];
    if (!data.replyPreference || !validReplyPrefs.includes(data.replyPreference)) {
      return new Response(JSON.stringify({ 
        ok: false, 
        error: `Invalid reply preference for ${data.type} message. Must be: ${validReplyPrefs.join(', ')}` 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Get client info for rate limiting
    const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0] || 
                    request.headers.get('x-real-ip') || 
                    '127.0.0.1';
    const userAgent = request.headers.get('user-agent') || '';
    const ipHash = createIpHash(clientIp, userAgent);

    // Check rate limit
    if (!checkRateLimit(ipHash)) {
      return new Response(JSON.stringify({ ok: false, error: 'Rate limit exceeded. Try again later.' }), {
        status: 429,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Generate reply key if needed
    let replyKey = null;
    let replyKeyHash = null;
    
    if (data.replyPreference === 'key') {
      replyKey = generateReplyKey();
      replyKeyHash = hashReplyKey(replyKey);
    }

    // Debug: Log the payload before insert
    const debugPayload = JSON.stringify({
      type: data.type,
      nickname: data.nickname || null,
      email: data.email || null,
      bodyLength: data.body?.length,
      replyPreference: data.replyPreference,
      wantsReply: data.replyPreference !== 'none'
    });
    console.log('DEBUG: Attempting insert with payload:', debugPayload);

    // Insert message into database using @vercel/postgres with pooled connection (POSTGRES_URL)
    const result = await sql`
      INSERT INTO messages (
        type, nickname, email, body, 
        ip_hash, user_agent, key_hash, wants_reply, status
      ) VALUES (
        ${data.type}, ${data.nickname || null}, 
        ${data.email || null}, ${data.body.trim()}, 
        ${ipHash}, ${userAgent}, ${replyKeyHash}, ${data.replyPreference !== 'none'},
        'pending'
      )
      RETURNING id
    `;

    const messageId = result.rows[0].id;
    
    const response: any = { ok: true, id: messageId };
    if (replyKey) {
      response.key = replyKey;
    }

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error: any) {
    // Enhanced error logging
    const errorMessage = error?.message || 'Unknown error';
    const errorCode = error?.code || 'NO_CODE';
    const errorDetail = error?.detail || '';
    const errorHint = error?.hint || '';
    
    console.error('Error creating message:', {
      message: errorMessage,
      code: errorCode,
      detail: errorDetail,
      hint: errorHint,
      stack: error?.stack
    });
    
    // Try to log to debug_log table
    try {
      const debugPayload = JSON.stringify({
        type: data?.type,
        nickname: data?.nickname,
        hasEmail: !!data?.email,
        bodyLength: data?.body?.length,
        replyPreference: data?.replyPreference
      });
      await logDebugError(errorCode, data?.type || 'unknown', errorMessage, debugPayload);
    } catch (logError) {
      console.error('Failed to log error to database:', logError);
    }
    
    // Return detailed error in debug mode
    if (DEBUG_MODE) {
      return new Response(JSON.stringify({ 
        ok: false, 
        error: 'Internal server error',
        debug: {
          message: errorMessage,
          code: errorCode,
          detail: errorDetail,
          hint: errorHint
        }
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Provide more specific error message for connection issues
    if (errorMessage.includes('invalid_connection_string') || errorMessage.includes('connection')) {
      console.error('Database connection error - check POSTGRES_URL environment variable');
      return new Response(JSON.stringify({ ok: false, error: 'Database connection error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    return new Response(JSON.stringify({ ok: false, error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};