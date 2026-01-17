import { c as createComponent, r as renderHead, f as renderScript, b as renderTemplate } from '../chunks/astro/server_CYfxY4af.mjs';
import 'piccolore';
import 'clsx';
/* empty css                                 */
/* empty css                                   */
export { renderers } from '../renderers.mjs';

const $$Message = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="en" data-astro-cid-o6t6v3xu> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"><title>Message</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap" rel="stylesheet">${renderHead()}</head> <body class="bg-black text-white min-h-screen" data-astro-cid-o6t6v3xu> <div class="container mx-auto px-8 py-16 max-w-2xl" data-astro-cid-o6t6v3xu> <!-- Header --> <div class="mb-12" data-astro-cid-o6t6v3xu> <a href="/" class="inline-block mb-8 text-[#F5F2EA] hover:text-white transition-colors duration-300 text-lg" data-astro-cid-o6t6v3xu>
← Home
</a> <h1 class="text-4xl font-light text-[#F5F2EA] font-serif italic mb-4" data-astro-cid-o6t6v3xu>Message</h1> </div> <!-- Form --> <form id="messageForm" class="space-y-8" data-astro-cid-o6t6v3xu> <!-- Anonymous toggle --> <div class="space-y-3" data-astro-cid-o6t6v3xu> <label class="flex items-center space-x-3 cursor-pointer" data-astro-cid-o6t6v3xu> <input type="checkbox" id="anonymous" checked class="w-4 h-4 bg-transparent border border-[#F5F2EA] rounded" data-astro-cid-o6t6v3xu> <span class="text-[#F5F2EA]" data-astro-cid-o6t6v3xu>Anonymous</span> </label> </div> <!-- Display name (hidden when anonymous) --> <div id="nameField" class="space-y-3 hidden" data-astro-cid-o6t6v3xu> <label for="displayName" class="block text-[#F5F2EA] text-sm" data-astro-cid-o6t6v3xu>Name</label> <input type="text" id="displayName" name="displayName" class="w-full bg-transparent border border-[#F5F2EA] rounded px-4 py-3 text-[#F5F2EA] placeholder-gray-500 focus:outline-none focus:border-white transition-colors duration-300" placeholder="Your name" data-astro-cid-o6t6v3xu> </div> <!-- Mode selector --> <div class="space-y-3" data-astro-cid-o6t6v3xu> <label class="block text-[#F5F2EA] text-sm" data-astro-cid-o6t6v3xu>Type</label> <div class="space-y-2" data-astro-cid-o6t6v3xu> <label class="flex items-center space-x-3 cursor-pointer" data-astro-cid-o6t6v3xu> <input type="radio" name="mode" value="public" class="w-4 h-4 border border-[#F5F2EA] bg-transparent" data-astro-cid-o6t6v3xu> <span class="text-[#F5F2EA]" data-astro-cid-o6t6v3xu>Public letter</span> </label> <label class="flex items-center space-x-3 cursor-pointer" data-astro-cid-o6t6v3xu> <input type="radio" name="mode" value="private" checked class="w-4 h-4 border border-[#F5F2EA] bg-transparent" data-astro-cid-o6t6v3xu> <span class="text-[#F5F2EA]" data-astro-cid-o6t6v3xu>Private message</span> </label> </div> </div> <!-- Reply preference --> <div class="space-y-3" data-astro-cid-o6t6v3xu> <label class="block text-[#F5F2EA] text-sm" data-astro-cid-o6t6v3xu>Reply</label> <div class="space-y-2" data-astro-cid-o6t6v3xu> <label class="flex items-center space-x-3 cursor-pointer" data-astro-cid-o6t6v3xu> <input type="radio" name="replyPreference" value="none" checked class="w-4 h-4 border border-[#F5F2EA] bg-transparent" data-astro-cid-o6t6v3xu> <span class="text-[#F5F2EA]" data-astro-cid-o6t6v3xu>No reply</span> </label> <label class="flex items-center space-x-3 cursor-pointer" data-astro-cid-o6t6v3xu> <input type="radio" name="replyPreference" value="key" class="w-4 h-4 border border-[#F5F2EA] bg-transparent" data-astro-cid-o6t6v3xu> <span class="text-[#F5F2EA]" data-astro-cid-o6t6v3xu>Allow reply via key</span> </label> </div> </div> <!-- Message body --> <div class="space-y-3" data-astro-cid-o6t6v3xu> <label for="body" class="block text-[#F5F2EA] text-sm" data-astro-cid-o6t6v3xu>Message</label> <textarea id="body" name="body" rows="8" required class="w-full bg-transparent border border-[#F5F2EA] rounded px-4 py-3 text-[#F5F2EA] placeholder-gray-500 focus:outline-none focus:border-white transition-colors duration-300 resize-vertical" placeholder="Your message..." data-astro-cid-o6t6v3xu></textarea> </div> <!-- Submit --> <button type="submit" id="submitBtn" class="w-full bg-transparent border border-[#F5F2EA] text-[#F5F2EA] px-6 py-4 rounded hover:bg-[#F5F2EA] hover:text-black transition-all duration-300 font-serif italic text-lg" data-astro-cid-o6t6v3xu>
Send
</button> <!-- Error display --> <div id="error" class="hidden text-red-400 text-sm" data-astro-cid-o6t6v3xu></div> </form> </div>  ${renderScript($$result, "/Users/kairon/Projects/web/kaironu/digital-doppler/src/pages/message.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "/Users/kairon/Projects/web/kaironu/digital-doppler/src/pages/message.astro", void 0);

const $$file = "/Users/kairon/Projects/web/kaironu/digital-doppler/src/pages/message.astro";
const $$url = "/message";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Message,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
