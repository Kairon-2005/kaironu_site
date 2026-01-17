import { sql } from '@vercel/postgres';
import crypto from 'crypto';
export { renderers } from '../../../renderers.mjs';

function hashReplyKey(key) {
  const pepper = process.env.MESSAGE_KEY_PEPPER || "default-pepper-change-me";
  return crypto.createHash("sha256").update(key + pepper).digest("hex");
}
const POST = async ({ request }) => {
  try {
    const data = await request.json();
    if (!data.id || !data.key) {
      return new Response(JSON.stringify({ ok: false, error: "ID and key are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const keyHash = hashReplyKey(data.key);
    const result = await sql`
      SELECT reply_text, replied_at
      FROM messages 
      WHERE id = ${data.id} 
        AND reply_preference = 'key' 
        AND reply_key_hash = ${keyHash}
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
      reply: message.reply_text || null,
      repliedAt: message.replied_at || null
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error fetching reply:", error);
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
