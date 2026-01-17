import { sql } from '@vercel/postgres';
import { v as validateEnvVars, a as validateAuth } from '../../../../chunks/auth_xgDOlbyf.mjs';
export { renderers } from '../../../../renderers.mjs';

const POST = async ({ request }) => {
  try {
    validateEnvVars(["ADMIN_USER", "ADMIN_PASS"]);
    const authResult = validateAuth(request);
    if (!authResult.ok) {
      return new Response(JSON.stringify({ ok: false, error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    const data = await request.json();
    if (!data.id) {
      return new Response(JSON.stringify({ ok: false, error: "Message ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const hasValidStatus = data.status && ["pending", "approved", "rejected"].includes(data.status);
    const hasReplyText = data.replyText !== void 0;
    if (!hasValidStatus && !hasReplyText) {
      return new Response(JSON.stringify({ ok: false, error: "No valid updates provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    if (hasValidStatus) {
      await sql`UPDATE messages SET status = ${data.status} WHERE id = ${data.id}`;
    }
    if (hasReplyText && data.replyText && data.replyText.trim()) {
      const existingReply = await sql`
        SELECT id FROM replies WHERE message_id = ${data.id}
      `;
      if (existingReply.rows.length > 0) {
        await sql`
          UPDATE replies 
          SET reply_body = ${data.replyText.trim()}, created_at = now()
          WHERE message_id = ${data.id}
        `;
      } else {
        await sql`
          INSERT INTO replies (message_id, reply_body)
          VALUES (${data.id}, ${data.replyText.trim()})
        `;
      }
    } else if (hasReplyText && (!data.replyText || !data.replyText.trim())) {
      await sql`DELETE FROM replies WHERE message_id = ${data.id}`;
    }
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error updating message:", error);
    return new Response(JSON.stringify({ ok: false, error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
