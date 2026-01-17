import type { APIRoute } from 'astro';
import { sql } from '@vercel/postgres';
import crypto from 'crypto';

function hashReplyKey(key: string): string {
  const pepper = process.env.MESSAGE_KEY_PEPPER || 'default-pepper-change-me';
  return crypto.createHash('sha256').update(key + pepper).digest('hex');
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    
    if (!data.id || !data.key) {
      return new Response(JSON.stringify({ ok: false, error: 'ID and key are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Hash the provided key
    const keyHash = hashReplyKey(data.key);

    // Look up the message
    const result = await sql`
      SELECT reply_text, replied_at
      FROM messages 
      WHERE id = ${data.id} 
        AND reply_preference = 'key' 
        AND reply_key_hash = ${keyHash}
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
      reply: message.reply_text || null,
      repliedAt: message.replied_at || null
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Error fetching reply:', error);
    return new Response(JSON.stringify({ ok: false, error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};