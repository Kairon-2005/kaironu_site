import { sql } from '@vercel/postgres';
export { renderers } from '../../../../renderers.mjs';

function constantTimeCompare(a, b) {
  if (a.length !== b.length) {
    return false;
  }
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}
const POST = async ({ request }) => {
  try {
    const auth = request.headers.get("Authorization");
    const ADMIN_USER = process.env.ADMIN_USER;
    const ADMIN_PASS = process.env.ADMIN_PASS;
    if (!ADMIN_USER || !ADMIN_PASS) {
      throw new Error("Missing ADMIN_USER / ADMIN_PASS env vars");
    }
    if (!auth) {
      return new Response(JSON.stringify({ ok: false, error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    const [scheme, encoded] = auth.split(" ");
    if (scheme !== "Basic") {
      return new Response(JSON.stringify({ ok: false, error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    const [user, pass] = atob(encoded).split(":");
    if (!constantTimeCompare(user, ADMIN_USER) || !constantTimeCompare(pass, ADMIN_PASS)) {
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
    if (data.status && data.replyText !== void 0) {
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
      await sql`UPDATE messages SET status = ${data.status} WHERE id = ${data.id}`;
    } else if (data.replyText !== void 0) {
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
