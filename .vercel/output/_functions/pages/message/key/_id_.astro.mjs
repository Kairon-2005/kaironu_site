import { c as createComponent, a as createAstro, r as renderHead, d as addAttribute, f as renderScript, b as renderTemplate } from '../../../chunks/astro/server_CYfxY4af.mjs';
import 'piccolore';
import 'clsx';
/* empty css                                       */
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro();
async function getStaticPaths() {
  return [];
}
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  const url = new URL(Astro2.request.url);
  const key = url.searchParams.get("k");
  if (!key) {
    return Astro2.redirect("/message");
  }
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"><title>Reply Key</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap" rel="stylesheet">${renderHead()}</head> <body class="bg-black text-white min-h-screen"> <div class="container mx-auto px-8 py-16 max-w-2xl"> <!-- Header --> <div class="mb-12"> <a href="/" class="inline-block mb-8 text-[#F5F2EA] hover:text-white transition-colors duration-300 text-lg">
← Home
</a> <h1 class="text-4xl font-light text-[#F5F2EA] font-serif italic mb-4">Reply Key</h1> </div> <div class="space-y-8"> <div class="bg-black border border-[#F5F2EA] rounded-lg p-6"> <div class="mb-4"> <label class="block text-[#F5F2EA] text-sm mb-2">Your reply key:</label> <div class="flex items-center space-x-3"> <input type="text" id="replyKey" readonly${addAttribute(key, "value")} class="flex-1 bg-transparent border border-[#F5F2EA] rounded px-4 py-3 text-[#F5F2EA] font-mono text-sm"> <button id="copyBtn" class="bg-transparent border border-[#F5F2EA] text-[#F5F2EA] px-4 py-3 rounded hover:bg-[#F5F2EA] hover:text-black transition-all duration-300 text-sm">
Copy
</button> </div> </div> <p class="text-[#F5F2EA]/70 text-sm leading-relaxed">
Save this key to view replies later at: <br> <code class="text-xs font-mono">/message/reply/${id}</code> </p> </div> <a href="/" class="inline-block bg-transparent border border-[#F5F2EA] text-[#F5F2EA] px-8 py-3 rounded hover:bg-[#F5F2EA] hover:text-black transition-all duration-300 font-serif italic">
← Home
</a> </div> </div> ${renderScript($$result, "/Users/kairon/Projects/web/kaironu/digital-doppler/src/pages/message/key/[id].astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "/Users/kairon/Projects/web/kaironu/digital-doppler/src/pages/message/key/[id].astro", void 0);

const $$file = "/Users/kairon/Projects/web/kaironu/digital-doppler/src/pages/message/key/[id].astro";
const $$url = "/message/key/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
