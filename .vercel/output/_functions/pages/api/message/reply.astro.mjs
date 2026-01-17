import { sql } from '@vercel/postgres';
import { h as hashReplyKey } from '../../../chunks/crypto_DOOsr3tZ.mjs';
import { v as validateEnvVars } from '../../../chunks/auth_xgDOlbyf.mjs';
export { renderers } from '../../../renderers.mjs';

const POST = async ({ request }) => {
  try {
    validateEnvVars(["MESSAGE_KEY_PEPPER"]);
    const data = await request.json();
    if (!data.id || !data.key) {
      return new Response(JSON.stringify({ ok: false, error: "ID and key are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const keyHash = hashReplyKey(data.key);
    const result = await sql`
      SELECT m.id, r.reply_body, r.created_at as replied_at
      FROM messages m
      LEFT JOIN replies r ON m.id = r.message_id
      WHERE m.id = ${data.id} 
        AND m.wants_reply = true 
        AND m.key_hash = ${keyHash}
    `;
    if (result.rows.length === 0) {
      return new Response(JSON.stringify({ ok: false, error: "Invalid message ID or key" }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }
    const message = result.rows[0];
    return new Response(JSON.stringify({
      ok: true,
      reply: message.reply_body || null,
      repliedAt: message.replied_at || null
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error fetching reply:", error);
    if (error instanceof Error && error.message.includes("environment variable")) {
      return new Response(JSON.stringify({ ok: false, error: "Server configuration error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
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
