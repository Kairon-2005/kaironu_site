import type { APIRoute } from 'astro';
import { sql } from '@vercel/postgres';
import { validateAuth, validateEnvVars } from '../../../../utils/auth';

export const GET: APIRoute = async ({ request, url }) => {
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

    // Get query parameters for filtering
    const type = url.searchParams.get('type') || 'all';
    const status = url.searchParams.get('status') || 'all';
    const wants_reply = url.searchParams.get('wants_reply') || 'all';
    const has_reply = url.searchParams.get('has_reply') || 'all';

    // Build WHERE clause dynamically
    const conditions = [];
    const params = [];

    if (type !== 'all') {
      conditions.push(`m.type = $${params.length + 1}`);
      params.push(type);
    }
    if (status !== 'all') {
      conditions.push(`m.status = $${params.length + 1}`);
      params.push(status);
    }
    if (wants_reply === 'yes') {
      conditions.push('m.wants_reply = true');
    } else if (wants_reply === 'no') {
      conditions.push('m.wants_reply = false');
    }
    if (has_reply === 'yes') {
      conditions.push('r.id IS NOT NULL');
    } else if (has_reply === 'no') {
      conditions.push('r.id IS NULL');
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
    
    const query = `
      SELECT 
        m.id, m.created_at, m.type, m.body, m.nickname, m.email,
        m.wants_reply, m.status, m.admin_notes, m.ip_hash, m.user_agent,
        r.id as reply_id, r.reply_body, r.created_at as reply_created_at,
        r.published, r.published_at
      FROM messages m 
      LEFT JOIN replies r ON m.id = r.message_id
      ${whereClause}
      ORDER BY m.created_at DESC
    `;

    const result = await sql.query(query, params);
    const messages = result.rows;

    return new Response(JSON.stringify({ ok: true, messages }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Error fetching messages:', error);
    
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