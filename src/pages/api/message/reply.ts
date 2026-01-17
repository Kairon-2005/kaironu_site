import type { APIRoute } from 'astro';
import { sql } from '@vercel/postgres';
import { hashReplyKey } from '../../../utils/crypto';
import { validateEnvVars } from '../../../utils/auth';

export const POST: APIRoute = async ({ request }) => {
  try {
    // Validate required environment variables
    validateEnvVars(['MESSAGE_KEY_PEPPER']);
    
    const data = await request.json();
    
    if (!data.id || !data.key) {
      return new Response(JSON.stringify({ ok: false, error: 'ID and key are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Hash the provided key
    const keyHash = hashReplyKey(data.key);

    // Look up the message and its reply
    const result = await sql`
      SELECT m.id, r.reply_body, r.created_at as replied_at
      FROM messages m
      LEFT JOIN replies r ON m.id = r.message_id
      WHERE m.id = ${data.id} 
        AND m.wants_reply = true 
        AND m.key_hash = ${keyHash}
    `;

    if (result.rows.length === 0) {
      return new Response(JSON.stringify({ ok: false, error: 'Invalid message ID or key' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const message = result.rows[0];
    
    return new Response(JSON.stringify({ 
      ok: true, 
      reply: message.reply_body || null,
      repliedAt: message.replied_at || null
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Error fetching reply:', error);
    
    // Return specific error message for missing env vars
    if (error instanceof Error && error.message.includes('environment variable')) {
      return new Response(JSON.stringify({ ok: false, error: 'Server configuration error' }), {
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