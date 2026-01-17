import type { APIRoute } from 'astro';
import { sql } from '@vercel/postgres';
import crypto from 'crypto';

// Rate limiting store (in-memory fallback)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function createIpHash(ip: string, userAgent: string): string {
  const pepper = process.env.MESSAGE_KEY_PEPPER || 'default-pepper-change-me';
  return crypto.createHash('sha256').update(ip + userAgent + pepper).digest('hex');
}

function generateReplyKey(): string {
  return crypto.randomBytes(16).toString('base64url');
}

function hashReplyKey(key: string): string {
  const pepper = process.env.MESSAGE_KEY_PEPPER || 'default-pepper-change-me';
  return crypto.createHash('sha256').update(key + pepper).digest('hex');
}

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
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.body || data.body.trim().length === 0) {
      return new Response(JSON.stringify({ ok: false, error: 'Message body is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!data.mode || !['public', 'private'].includes(data.mode)) {
      return new Response(JSON.stringify({ ok: false, error: 'Invalid mode' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!data.replyPreference || !['none', 'key'].includes(data.replyPreference)) {
      return new Response(JSON.stringify({ ok: false, error: 'Invalid reply preference' }), {
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

    // Insert message into database
    const result = await sql`
      INSERT INTO messages (
        mode, reply_preference, display_name, is_anonymous, body, 
        ip_hash, user_agent, reply_key_hash
      ) VALUES (
        ${data.mode}, ${data.replyPreference}, ${data.displayName || 'Anonymous'}, 
        ${Boolean(data.isAnonymous)}, ${data.body.trim()}, 
        ${ipHash}, ${userAgent}, ${replyKeyHash}
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
    
  } catch (error) {
    console.error('Error creating message:', error);
    return new Response(JSON.stringify({ ok: false, error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};