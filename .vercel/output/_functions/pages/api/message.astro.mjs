import { sql } from '@vercel/postgres';
import { c as createIpHash, g as generateReplyKey, h as hashReplyKey } from '../../chunks/crypto_DOOsr3tZ.mjs';
import { v as validateEnvVars } from '../../chunks/auth_xgDOlbyf.mjs';
export { renderers } from '../../renderers.mjs';

const rateLimitStore = /* @__PURE__ */ new Map();
function checkRateLimit(ipHash) {
  const now = Date.now();
  const windowMs = 10 * 60 * 1e3;
  const maxRequests = 5;
  const entry = rateLimitStore.get(ipHash);
  if (!entry || now > entry.resetTime) {
    rateLimitStore.set(ipHash, { count: 1, resetTime: now + windowMs });
    return true;
  }
  if (entry.count >= maxRequests) {
    return false;
  }
  entry.count++;
  return true;
}
const POST = async ({ request }) => {
  try {
    validateEnvVars(["MESSAGE_KEY_PEPPER"]);
    const data = await request.json();
    if (!data.body || data.body.trim().length === 0) {
      return new Response(JSON.stringify({ ok: false, error: "Message body is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    if (!data.type || !["public", "treehole", "private"].includes(data.type)) {
      return new Response(JSON.stringify({ ok: false, error: "Invalid message type. Must be: public, treehole, or private" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const validReplyPrefs = data.type === "private" ? ["email", "key"] : ["none"];
    if (!data.replyPreference || !validReplyPrefs.includes(data.replyPreference)) {
      return new Response(JSON.stringify({
        ok: false,
        error: `Invalid reply preference for ${data.type} message. Must be: ${validReplyPrefs.join(", ")}`
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0] || request.headers.get("x-real-ip") || "127.0.0.1";
    const userAgent = request.headers.get("user-agent") || "";
    const ipHash = createIpHash(clientIp, userAgent);
    if (!checkRateLimit(ipHash)) {
      return new Response(JSON.stringify({ ok: false, error: "Rate limit exceeded. Try again later." }), {
        status: 429,
        headers: { "Content-Type": "application/json" }
      });
    }
    let replyKey = null;
    let replyKeyHash = null;
    if (data.replyPreference === "key") {
      replyKey = generateReplyKey();
      replyKeyHash = hashReplyKey(replyKey);
    }
    const result = await sql`
      INSERT INTO messages (
        type, reply_preference, nickname, email, body, 
        ip_hash, user_agent, key_hash, wants_reply, status
      ) VALUES (
        ${data.type}, ${data.replyPreference}, ${data.nickname || null}, 
        ${data.email || null}, ${data.body.trim()}, 
        ${ipHash}, ${userAgent}, ${replyKeyHash}, ${data.replyPreference !== "none"},
        'pending'
      )
      RETURNING id
    `;
    const messageId = result.rows[0].id;
    const response = { ok: true, id: messageId };
    if (replyKey) {
      response.key = replyKey;
    }
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error creating message:", error);
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
