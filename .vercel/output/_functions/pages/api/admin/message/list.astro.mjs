import { sql } from '@vercel/postgres';
import { v as validateEnvVars, a as validateAuth } from '../../../../chunks/auth_xgDOlbyf.mjs';
export { renderers } from '../../../../renderers.mjs';

const GET = async ({ request, url }) => {
  try {
    validateEnvVars(["ADMIN_USER", "ADMIN_PASS"]);
    const authResult = validateAuth(request);
    if (!authResult.ok) {
      return new Response(JSON.stringify({ ok: false, error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    const type = url.searchParams.get("type") || "all";
    const status = url.searchParams.get("status") || "all";
    const wants_reply = url.searchParams.get("wants_reply") || "all";
    const has_reply = url.searchParams.get("has_reply") || "all";
    const conditions = [];
    const params = [];
    if (type !== "all") {
      conditions.push(`m.type = $${params.length + 1}`);
      params.push(type);
    }
    if (status !== "all") {
      conditions.push(`m.status = $${params.length + 1}`);
      params.push(status);
    }
    if (wants_reply === "yes") {
      conditions.push("m.wants_reply = true");
    } else if (wants_reply === "no") {
      conditions.push("m.wants_reply = false");
    }
    if (has_reply === "yes") {
      conditions.push("r.id IS NOT NULL");
    } else if (has_reply === "no") {
      conditions.push("r.id IS NULL");
    }
    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
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
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
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
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
