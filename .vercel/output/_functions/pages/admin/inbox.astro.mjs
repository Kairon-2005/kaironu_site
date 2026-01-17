import { c as createComponent, a as createAstro, r as renderHead, b as renderTemplate, d as addAttribute, e as defineScriptVars } from '../../chunks/astro/server_CYfxY4af.mjs';
import 'piccolore';
import 'clsx';
/* empty css                                    */
import { sql } from '@vercel/postgres';
export { renderers } from '../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$Inbox = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Inbox;
  const auth = Astro2.request.headers.get("Authorization");
  const ADMIN_USER = "admin";
  const ADMIN_PASS = "admin";
  if (!auth) {
    return new Response("Unauthorized", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Admin Area"' }
    });
  }
  const [scheme, encoded] = auth.split(" ");
  if (scheme !== "Basic") {
    return new Response("Unauthorized", { status: 401 });
  }
  const [user, pass] = atob(encoded).split(":");
  if (user !== ADMIN_USER || pass !== ADMIN_PASS) {
    return new Response("Unauthorized", { status: 401 });
  }
  const url = new URL(Astro2.request.url);
  const mode = url.searchParams.get("mode") || "all";
  const status = url.searchParams.get("status") || "all";
  const replyPref = url.searchParams.get("reply_preference") || "all";
  const replied = url.searchParams.get("replied") || "all";
  const messageId = url.searchParams.get("id");
  let messages = [];
  let selectedMessage = null;
  let error = null;
  try {
    const conditions = [];
    const params = [];
    let paramIndex = 1;
    if (mode !== "all") {
      conditions.push(`mode = $${paramIndex}`);
      params.push(mode);
      paramIndex++;
    }
    if (status !== "all") {
      conditions.push(`status = $${paramIndex}`);
      params.push(status);
      paramIndex++;
    }
    if (replyPref !== "all") {
      conditions.push(`reply_preference = $${paramIndex}`);
      params.push(replyPref);
      paramIndex++;
    }
    if (replied === "yes") {
      conditions.push("reply_text IS NOT NULL");
    } else if (replied === "no") {
      conditions.push("reply_text IS NULL");
    }
    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
    const query = `
    SELECT id, created_at, mode, reply_preference, display_name, is_anonymous, 
           body, status, admin_tags, reply_text, replied_at, ip_hash, user_agent
    FROM messages 
    ${whereClause}
    ORDER BY created_at DESC
  `;
    const result = await sql.query(query, params);
    messages = result.rows;
    if (messageId) {
      selectedMessage = messages.find((m) => m.id === messageId);
    }
  } catch (err) {
    error = err.message;
  }
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"><title>Admin Inbox</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap" rel="stylesheet">${renderHead()}</head> <body class="bg-black text-white min-h-screen"> <div class="container mx-auto px-8 py-16 max-w-7xl"> <!-- Header --> <div class="mb-12"> <a href="/" class="inline-block mb-8 text-[#F5F2EA] hover:text-white transition-colors duration-300 text-lg">
← Home
</a> <h1 class="text-4xl font-light text-[#F5F2EA] font-serif italic mb-4">Admin Inbox</h1> </div> ${selectedMessage ? renderTemplate`<!-- Message detail view -->
        <div class="space-y-8"> <div class="flex items-center space-x-4"> <a href="/admin/inbox" class="text-[#F5F2EA] hover:text-white transition-colors duration-300">
← Back to inbox
</a> </div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-8"> <!-- Message content --> <div class="space-y-6"> <div class="bg-black border border-[#F5F2EA]/30 rounded-lg p-6"> <div class="space-y-4"> <div class="flex justify-between items-start"> <h2 class="text-[#F5F2EA] text-xl font-serif">${selectedMessage.display_name}</h2> <time class="text-[#F5F2EA]/50 text-sm"> ${new Date(selectedMessage.created_at).toLocaleString()} </time> </div> <div class="flex flex-wrap gap-2 text-xs"> <span class="px-2 py-1 bg-[#F5F2EA]/10 text-[#F5F2EA] rounded"> ${selectedMessage.mode} </span> <span class="px-2 py-1 bg-[#F5F2EA]/10 text-[#F5F2EA] rounded"> ${selectedMessage.reply_preference} </span> <span${addAttribute(`px-2 py-1 rounded ${selectedMessage.status === "approved" ? "bg-green-900/30 text-green-300" : selectedMessage.status === "rejected" ? "bg-red-900/30 text-red-300" : "bg-yellow-900/30 text-yellow-300"}`, "class")}> ${selectedMessage.status} </span> </div> <div class="text-[#F5F2EA] leading-relaxed whitespace-pre-wrap"> ${selectedMessage.body} </div> </div> </div> </div> <!-- Admin controls --> <div class="space-y-6"> <form id="updateForm" class="bg-black border border-[#F5F2EA]/30 rounded-lg p-6 space-y-4"> <h3 class="text-[#F5F2EA] text-lg font-serif mb-4">Update Message</h3> <div> <label class="block text-[#F5F2EA] text-sm mb-2">Status</label> <select name="status" class="w-full bg-black border border-[#F5F2EA] rounded px-3 py-2 text-[#F5F2EA]"> <option value="pending"${addAttribute(selectedMessage.status === "pending" ? "selected" : "", "selectedMessage.status === 'pending' ? 'selected' : ''")}>Pending</option> <option value="approved"${addAttribute(selectedMessage.status === "approved" ? "selected" : "", "selectedMessage.status === 'approved' ? 'selected' : ''")}>Approved</option> <option value="rejected"${addAttribute(selectedMessage.status === "rejected" ? "selected" : "", "selectedMessage.status === 'rejected' ? 'selected' : ''")}>Rejected</option> </select> </div> <div> <label class="block text-[#F5F2EA] text-sm mb-2">Reply</label> <textarea name="replyText" rows="6" class="w-full bg-black border border-[#F5F2EA] rounded px-3 py-2 text-[#F5F2EA] resize-vertical" placeholder="Write a reply...">${selectedMessage.reply_text || ""}</textarea> </div> <button type="submit" class="w-full bg-transparent border border-[#F5F2EA] text-[#F5F2EA] px-4 py-3 rounded hover:bg-[#F5F2EA] hover:text-black transition-all duration-300">
Save Changes
</button> <div id="saveStatus" class="hidden text-sm"></div> </form> <!-- Metadata --> <div class="bg-black border border-[#F5F2EA]/20 rounded-lg p-4 text-xs"> <h4 class="text-[#F5F2EA] mb-2">Metadata</h4> <div class="space-y-1 text-[#F5F2EA]/60"> <div>ID: ${selectedMessage.id}</div> <div>IP Hash: ${selectedMessage.ip_hash || "None"}</div> <div>User Agent: ${selectedMessage.user_agent || "None"}</div> ${selectedMessage.replied_at && renderTemplate`<div>Replied: ${new Date(selectedMessage.replied_at).toLocaleString()}</div>`} </div> </div> </div> </div> </div>` : renderTemplate`<!-- Message list view -->
        <div class="space-y-8"> <!-- Filters --> <form method="get" class="bg-black border border-[#F5F2EA]/30 rounded-lg p-6"> <h2 class="text-[#F5F2EA] text-lg font-serif mb-4">Filters</h2> <div class="grid grid-cols-2 md:grid-cols-4 gap-4"> <div> <label class="block text-[#F5F2EA] text-sm mb-2">Mode</label> <select name="mode" class="w-full bg-black border border-[#F5F2EA] rounded px-3 py-2 text-[#F5F2EA] text-sm"> <option value="all"${addAttribute(mode === "all" ? "selected" : "", "mode === 'all' ? 'selected' : ''")}>All</option> <option value="public"${addAttribute(mode === "public" ? "selected" : "", "mode === 'public' ? 'selected' : ''")}>Public</option> <option value="private"${addAttribute(mode === "private" ? "selected" : "", "mode === 'private' ? 'selected' : ''")}>Private</option> </select> </div> <div> <label class="block text-[#F5F2EA] text-sm mb-2">Status</label> <select name="status" class="w-full bg-black border border-[#F5F2EA] rounded px-3 py-2 text-[#F5F2EA] text-sm"> <option value="all"${addAttribute(status === "all" ? "selected" : "", "status === 'all' ? 'selected' : ''")}>All</option> <option value="pending"${addAttribute(status === "pending" ? "selected" : "", "status === 'pending' ? 'selected' : ''")}>Pending</option> <option value="approved"${addAttribute(status === "approved" ? "selected" : "", "status === 'approved' ? 'selected' : ''")}>Approved</option> <option value="rejected"${addAttribute(status === "rejected" ? "selected" : "", "status === 'rejected' ? 'selected' : ''")}>Rejected</option> </select> </div> <div> <label class="block text-[#F5F2EA] text-sm mb-2">Reply Pref</label> <select name="reply_preference" class="w-full bg-black border border-[#F5F2EA] rounded px-3 py-2 text-[#F5F2EA] text-sm"> <option value="all"${addAttribute(replyPref === "all" ? "selected" : "", "replyPref === 'all' ? 'selected' : ''")}>All</option> <option value="none"${addAttribute(replyPref === "none" ? "selected" : "", "replyPref === 'none' ? 'selected' : ''")}>None</option> <option value="key"${addAttribute(replyPref === "key" ? "selected" : "", "replyPref === 'key' ? 'selected' : ''")}>Key</option> </select> </div> <div> <label class="block text-[#F5F2EA] text-sm mb-2">Replied</label> <select name="replied" class="w-full bg-black border border-[#F5F2EA] rounded px-3 py-2 text-[#F5F2EA] text-sm"> <option value="all"${addAttribute(replied === "all" ? "selected" : "", "replied === 'all' ? 'selected' : ''")}>All</option> <option value="yes"${addAttribute(replied === "yes" ? "selected" : "", "replied === 'yes' ? 'selected' : ''")}>Yes</option> <option value="no"${addAttribute(replied === "no" ? "selected" : "", "replied === 'no' ? 'selected' : ''")}>No</option> </select> </div> </div> <button type="submit" class="mt-4 bg-transparent border border-[#F5F2EA] text-[#F5F2EA] px-4 py-2 rounded hover:bg-[#F5F2EA] hover:text-black transition-all duration-300 text-sm">
Apply Filters
</button> </form> <!-- Messages table --> ${error ? renderTemplate`<div class="text-red-400 text-sm">Error: ${error}</div>` : messages.length === 0 ? renderTemplate`<div class="text-[#F5F2EA]/70 text-center py-8">No messages found.</div>` : renderTemplate`<div class="bg-black border border-[#F5F2EA]/30 rounded-lg overflow-hidden"> <table class="w-full"> <thead> <tr class="border-b border-[#F5F2EA]/20"> <th class="px-6 py-4 text-left text-[#F5F2EA] text-sm font-serif">Name</th> <th class="px-6 py-4 text-left text-[#F5F2EA] text-sm font-serif">Mode</th> <th class="px-6 py-4 text-left text-[#F5F2EA] text-sm font-serif">Status</th> <th class="px-6 py-4 text-left text-[#F5F2EA] text-sm font-serif">Reply</th> <th class="px-6 py-4 text-left text-[#F5F2EA] text-sm font-serif">Date</th> <th class="px-6 py-4 text-left text-[#F5F2EA] text-sm font-serif">Preview</th> </tr> </thead> <tbody> ${messages.map((message) => renderTemplate`<tr class="border-b border-[#F5F2EA]/10 hover:bg-[#F5F2EA]/5 transition-colors duration-300"> <td class="px-6 py-4"> <a${addAttribute(`/admin/inbox?id=${message.id}`, "href")} class="text-[#F5F2EA] hover:text-white transition-colors duration-300"> ${message.display_name} </a> </td> <td class="px-6 py-4 text-[#F5F2EA]/80 text-sm">${message.mode}</td> <td class="px-6 py-4"> <span${addAttribute(`px-2 py-1 rounded text-xs ${message.status === "approved" ? "bg-green-900/30 text-green-300" : message.status === "rejected" ? "bg-red-900/30 text-red-300" : "bg-yellow-900/30 text-yellow-300"}`, "class")}> ${message.status} </span> </td> <td class="px-6 py-4 text-[#F5F2EA]/80 text-sm"> ${message.reply_text ? "✓" : message.reply_preference} </td> <td class="px-6 py-4 text-[#F5F2EA]/60 text-sm"> ${new Date(message.created_at).toLocaleDateString()} </td> <td class="px-6 py-4 text-[#F5F2EA]/70 text-sm max-w-xs"> <div class="truncate">${message.body}</div> </td> </tr>`)} </tbody> </table> </div>`} </div>`} </div> ${selectedMessage && renderTemplate(_a || (_a = __template(["<script>(function(){", "\n        const form = document.getElementById('updateForm');\n        const saveStatus = document.getElementById('saveStatus');\n\n        form.addEventListener('submit', async (e) => {\n          e.preventDefault();\n          \n          const formData = new FormData(form);\n          const data = {\n            id: messageId,\n            status: formData.get('status'),\n            replyText: formData.get('replyText')\n          };\n\n          try {\n            const response = await fetch('/api/admin/message/update', {\n              method: 'POST',\n              headers: { 'Content-Type': 'application/json' },\n              body: JSON.stringify(data)\n            });\n\n            const result = await response.json();\n\n            if (result.ok) {\n              saveStatus.textContent = 'Changes saved successfully';\n              saveStatus.className = 'text-green-400 text-sm';\n              saveStatus.classList.remove('hidden');\n              \n              setTimeout(() => {\n                saveStatus.classList.add('hidden');\n              }, 3000);\n            } else {\n              throw new Error(result.error || 'Failed to save changes');\n            }\n          } catch (err) {\n            saveStatus.textContent = `Error: ${err.message}`;\n            saveStatus.className = 'text-red-400 text-sm';\n            saveStatus.classList.remove('hidden');\n          }\n        });\n      })();</script>"], ["<script>(function(){", "\n        const form = document.getElementById('updateForm');\n        const saveStatus = document.getElementById('saveStatus');\n\n        form.addEventListener('submit', async (e) => {\n          e.preventDefault();\n          \n          const formData = new FormData(form);\n          const data = {\n            id: messageId,\n            status: formData.get('status'),\n            replyText: formData.get('replyText')\n          };\n\n          try {\n            const response = await fetch('/api/admin/message/update', {\n              method: 'POST',\n              headers: { 'Content-Type': 'application/json' },\n              body: JSON.stringify(data)\n            });\n\n            const result = await response.json();\n\n            if (result.ok) {\n              saveStatus.textContent = 'Changes saved successfully';\n              saveStatus.className = 'text-green-400 text-sm';\n              saveStatus.classList.remove('hidden');\n              \n              setTimeout(() => {\n                saveStatus.classList.add('hidden');\n              }, 3000);\n            } else {\n              throw new Error(result.error || 'Failed to save changes');\n            }\n          } catch (err) {\n            saveStatus.textContent = \\`Error: \\${err.message}\\`;\n            saveStatus.className = 'text-red-400 text-sm';\n            saveStatus.classList.remove('hidden');\n          }\n        });\n      })();</script>"])), defineScriptVars({ messageId: selectedMessage.id }))} </body> </html>`;
}, "/Users/kairon/Projects/web/kaironu/digital-doppler/src/pages/admin/inbox.astro", void 0);
const $$file = "/Users/kairon/Projects/web/kaironu/digital-doppler/src/pages/admin/inbox.astro";
const $$url = "/admin/inbox";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Inbox,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
