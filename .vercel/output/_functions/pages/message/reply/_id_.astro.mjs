import { c as createComponent, a as createAstro, b as renderTemplate, e as defineScriptVars, r as renderHead } from '../../../chunks/astro/server_CYfxY4af.mjs';
import 'piccolore';
import 'clsx';
/* empty css                                       */
export { renderers } from '../../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
async function getStaticPaths() {
  return [];
}
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  return renderTemplate(_a || (_a = __template(['<html lang="en"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"><title>View Reply</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap" rel="stylesheet">', '</head> <body class="bg-black text-white min-h-screen"> <div class="container mx-auto px-8 py-16 max-w-2xl"> <!-- Header --> <div class="mb-12"> <a href="/" class="inline-block mb-8 text-[#F5F2EA] hover:text-white transition-colors duration-300 text-lg">\n\u2190 Home\n</a> <h1 class="text-4xl font-light text-[#F5F2EA] font-serif italic mb-4">View Reply</h1> </div> <!-- Key input form --> <div id="keyForm" class="space-y-8"> <div class="space-y-3"> <label for="replyKey" class="block text-[#F5F2EA] text-sm">Reply Key</label> <input type="text" id="replyKey" name="replyKey" required class="w-full bg-transparent border border-[#F5F2EA] rounded px-4 py-3 text-[#F5F2EA] placeholder-gray-500 focus:outline-none focus:border-white transition-colors duration-300 font-mono" placeholder="Enter your reply key"> </div> <button type="submit" id="submitBtn" class="w-full bg-transparent border border-[#F5F2EA] text-[#F5F2EA] px-6 py-4 rounded hover:bg-[#F5F2EA] hover:text-black transition-all duration-300 font-serif italic text-lg">\nView Reply\n</button> <div id="error" class="hidden text-red-400 text-sm"></div> </div> <!-- Reply content --> <div id="replyContent" class="hidden space-y-8"> <div class="bg-black border border-[#F5F2EA] rounded-lg p-6"> <div id="replyText" class="text-[#F5F2EA] leading-relaxed whitespace-pre-wrap"></div> </div> <a href="/" class="inline-block bg-transparent border border-[#F5F2EA] text-[#F5F2EA] px-8 py-3 rounded hover:bg-[#F5F2EA] hover:text-black transition-all duration-300 font-serif italic">\n\u2190 Home\n</a> </div> </div> <script>(function(){', "\n      const keyForm = document.getElementById('keyForm');\n      const keyInput = document.getElementById('replyKey');\n      const submitBtn = document.getElementById('submitBtn');\n      const error = document.getElementById('error');\n      const replyContent = document.getElementById('replyContent');\n      const replyText = document.getElementById('replyText');\n\n      submitBtn.addEventListener('click', async (e) => {\n        e.preventDefault();\n        \n        const key = keyInput.value.trim();\n        if (!key) {\n          error.textContent = 'Please enter a reply key';\n          error.classList.remove('hidden');\n          return;\n        }\n\n        submitBtn.disabled = true;\n        submitBtn.textContent = 'Checking...';\n        error.classList.add('hidden');\n\n        try {\n          const response = await fetch('/api/message/reply', {\n            method: 'POST',\n            headers: { 'Content-Type': 'application/json' },\n            body: JSON.stringify({ id: messageId, key })\n          });\n\n          const result = await response.json();\n\n          if (result.ok) {\n            if (result.reply) {\n              replyText.textContent = result.reply;\n              keyForm.classList.add('hidden');\n              replyContent.classList.remove('hidden');\n            } else {\n              replyText.textContent = 'No reply yet.';\n              keyForm.classList.add('hidden');\n              replyContent.classList.remove('hidden');\n            }\n          } else {\n            throw new Error(result.error || 'Invalid key');\n          }\n        } catch (err) {\n          error.textContent = err.message;\n          error.classList.remove('hidden');\n          submitBtn.disabled = false;\n          submitBtn.textContent = 'View Reply';\n        }\n      });\n\n      // Allow Enter key submission\n      keyInput.addEventListener('keydown', (e) => {\n        if (e.key === 'Enter') {\n          submitBtn.click();\n        }\n      });\n    })();<\/script> </body> </html>"])), renderHead(), defineScriptVars({ messageId: id }));
}, "/Users/kairon/Projects/web/kaironu/digital-doppler/src/pages/message/reply/[id].astro", void 0);

const $$file = "/Users/kairon/Projects/web/kaironu/digital-doppler/src/pages/message/reply/[id].astro";
const $$url = "/message/reply/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
