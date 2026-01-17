import { c as createComponent, r as renderHead, b as renderTemplate } from '../../chunks/astro/server_B2hf15fw.mjs';
import 'piccolore';
import 'clsx';
/* empty css                                    */
export { renderers } from '../../renderers.mjs';

const $$Sent = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"><title>Message Sent</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap" rel="stylesheet">${renderHead()}</head> <body class="bg-black text-white min-h-screen flex items-center justify-center"> <div class="text-center max-w-md mx-auto px-8"> <h1 class="text-4xl font-light text-[#F5F2EA] font-serif italic mb-6">Message Sent</h1> <p class="text-[#F5F2EA]/80 mb-8 leading-relaxed">
Your message has been received successfully.
</p> <a href="/" class="inline-block bg-transparent border border-[#F5F2EA] text-[#F5F2EA] px-8 py-3 rounded hover:bg-[#F5F2EA] hover:text-black transition-all duration-300 font-serif italic">
← Back to Home
</a> </div> </body></html>`;
}, "/Users/kairon/Projects/web/kaironu/digital-doppler/src/pages/message/sent.astro", void 0);

const $$file = "/Users/kairon/Projects/web/kaironu/digital-doppler/src/pages/message/sent.astro";
const $$url = "/message/sent";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Sent,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
