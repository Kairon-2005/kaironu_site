import type { APIRoute } from 'astro';
import { sql } from '@vercel/postgres';

function constantTimeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }
  
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  
  return result === 0;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    // Basic Auth check
    const auth = request.headers.get('Authorization');
    const ADMIN_USER = process.env.ADMIN_USER;
    const ADMIN_PASS = process.env.ADMIN_PASS;
    if (!ADMIN_USER || !ADMIN_PASS) {
    throw new Error('Missing ADMIN_USER / ADMIN_PASS env vars');
}

    if (!auth) {
      return new Response(JSON.stringify({ ok: false, error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const [scheme, encoded] = auth.split(' ');
    if (scheme !== 'Basic') {
      return new Response(JSON.stringify({ ok: false, error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const [user, pass] = atob(encoded).split(':');
    if (!constantTimeCompare(user, ADMIN_USER) || !constantTimeCompare(pass, ADMIN_PASS)) {
      return new Response(JSON.stringify({ ok: false, error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const data = await request.json();
    
    if (!data.id) {
      return new Response(JSON.stringify({ ok: false, error: 'Message ID is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validate the update data
    const hasValidStatus = data.status && ['pending', 'approved', 'rejected'].includes(data.status);
    const hasReplyText = data.replyText !== undefined;
    
    if (!hasValidStatus && !hasReplyText) {
      return new Response(JSON.stringify({ ok: false, error: 'No valid updates provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Use template literal approach - more secure and readable
    if (data.status && data.replyText !== undefined) {
      // Both status and reply text updates
      if (data.replyText && data.replyText.trim()) {
        await sql`UPDATE messages SET 
          status = ${data.status}, 
          reply_text = ${data.replyText},
          replied_at = now()
          WHERE id = ${data.id}`;
      } else {
        await sql`UPDATE messages SET 
          status = ${data.status}, 
          reply_text = ${data.replyText}
          WHERE id = ${data.id}`;
      }
    } else if (data.status) {
      // Status update only
      await sql`UPDATE messages SET status = ${data.status} WHERE id = ${data.id}`;
    } else if (data.replyText !== undefined) {
      // Reply text update only
      if (data.replyText && data.replyText.trim()) {
        await sql`UPDATE messages SET 
          reply_text = ${data.replyText},
          replied_at = now()
          WHERE id = ${data.id}`;
      } else {
        await sql`UPDATE messages SET reply_text = ${data.replyText} WHERE id = ${data.id}`;
      }
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Error updating message:', error);
    return new Response(JSON.stringify({ ok: false, error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};