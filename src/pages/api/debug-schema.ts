import type { APIRoute } from 'astro';
import { sql } from '@vercel/postgres';

export const prerender = false;

// Temporary debug endpoint - remove after debugging
export const GET: APIRoute = async ({ request }) => {
  try {
    // Check table structure
    const columnsResult = await sql`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns 
      WHERE table_name = 'messages'
      ORDER BY ordinal_position
    `;
    
    // Check constraints
    const constraintsResult = await sql`
      SELECT constraint_name, constraint_type
      FROM information_schema.table_constraints
      WHERE table_name = 'messages'
    `;
    
    // Check check constraints
    const checkConstraintsResult = await sql`
      SELECT conname, pg_get_constraintdef(oid) as definition
      FROM pg_constraint
      WHERE conrelid = 'messages'::regclass AND contype = 'c'
    `;
    
    // Get recent debug logs if table exists
    let debugLogs = [];
    try {
      const logsResult = await sql`
        SELECT * FROM debug_log ORDER BY created_at DESC LIMIT 10
      `;
      debugLogs = logsResult.rows;
    } catch (e) {
      debugLogs = [{ error: 'debug_log table does not exist yet' }];
    }
    
    // Try a test insert (dry run with transaction rollback)
    let testResults = {
      treehole: { success: false, error: '' },
      public: { success: false, error: '' },
      private: { success: false, error: '' }
    };
    
    for (const type of ['treehole', 'public', 'private'] as const) {
      try {
        // Begin transaction
        await sql`BEGIN`;
        await sql`
          INSERT INTO messages (type, nickname, email, body, ip_hash, user_agent, key_hash, wants_reply, status)
          VALUES (${type}, 'test', null, 'test message', 'testhash', 'testagent', null, ${type === 'private'}, 'pending')
        `;
        // Rollback - we don't actually want to insert
        await sql`ROLLBACK`;
        testResults[type] = { success: true, error: '' };
      } catch (e: any) {
        await sql`ROLLBACK`;
        testResults[type] = { success: false, error: e.message || 'Unknown error' };
      }
    }
    
    return new Response(JSON.stringify({
      columns: columnsResult.rows,
      constraints: constraintsResult.rows,
      checkConstraints: checkConstraintsResult.rows,
      debugLogs,
      testInserts: testResults
    }, null, 2), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error: any) {
    return new Response(JSON.stringify({ 
      error: error.message,
      code: error.code,
      detail: error.detail
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
