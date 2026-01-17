import type { APIRoute } from 'astro';
import { sql } from '@vercel/postgres';
import { validateAuth, validateEnvVars } from '../../../../utils/auth';

export const POST: APIRoute = async ({ request }) => {
  try {
    // Validate required environment variables
    validateEnvVars(['ADMIN_USER', 'ADMIN_PASS']);
    
    // Basic Auth check
    const authResult = validateAuth(request);
    if (!authResult.ok) {
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

    // Update message status if provided
    if (hasValidStatus) {
      await sql`UPDATE messages SET status = ${data.status} WHERE id = ${data.id}`;
    }

    // Handle reply text update
    if (hasReplyText && data.replyText && data.replyText.trim()) {
      // Check if a reply already exists
      const existingReply = await sql`
        SELECT id FROM replies WHERE message_id = ${data.id}
      `;
      
      if (existingReply.rows.length > 0) {
        // Update existing reply
        await sql`
          UPDATE replies 
          SET reply_body = ${data.replyText.trim()}, created_at = now()
          WHERE message_id = ${data.id}
        `;
      } else {
        // Create new reply
        await sql`
          INSERT INTO replies (message_id, reply_body)
          VALUES (${data.id}, ${data.replyText.trim()})
        `;
      }
    } else if (hasReplyText && (!data.replyText || !data.replyText.trim())) {
      // Delete reply if empty text provided
      await sql`DELETE FROM replies WHERE message_id = ${data.id}`;
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