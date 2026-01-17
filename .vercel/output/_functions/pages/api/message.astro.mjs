import { sql } from '@vercel/postgres';
import crypto from 'crypto';
export { renderers } from '../../renderers.mjs';

const rateLimitStore = /* @__PURE__ */ new Map();
function createIpHash(ip, userAgent) {
  const pepper = process.env.MESSAGE_KEY_PEPPER || "default-pepper-change-me";
  return crypto.createHash("sha256").update(ip + userAgent + pepper).digest("hex");
}
function generateReplyKey() {
  return crypto.randomBytes(16).toString("base64url");
}
function hashReplyKey(key) {
  const pepper = process.env.MESSAGE_KEY_PEPPER || "default-pepper-change-me";
  return crypto.createHash("sha256").update(key + pepper).digest("hex");
}
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
    const data = await request.json();
    if (!data.body || data.body.trim().length === 0) {
      return new Response(JSON.stringify({ ok: false, error: "Message body is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    if (!data.mode || !["public", "private"].includes(data.mode)) {
      return new Response(JSON.stringify({ ok: false, error: "Invalid mode" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    if (!data.replyPreference || !["none", "key"].includes(data.replyPreference)) {
      return new Response(JSON.stringify({ ok: false, error: "Invalid reply preference" }), {
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
        mode, reply_preference, display_name, is_anonymous, body, 
        ip_hash, user_agent, reply_key_hash
      ) VALUES (
        ${data.mode}, ${data.replyPreference}, ${data.displayName || "Anonymous"}, 
        ${Boolean(data.isAnonymous)}, ${data.body.trim()}, 
        ${ipHash}, ${userAgent}, ${replyKeyHash}
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
