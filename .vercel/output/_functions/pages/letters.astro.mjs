import { c as createComponent, r as renderHead, b as renderTemplate, d as addAttribute } from '../chunks/astro/server_CYfxY4af.mjs';
import 'piccolore';
import 'clsx';
/* empty css                                 */
import { sql } from '@vercel/postgres';
export { renderers } from '../renderers.mjs';

const $$Letters = createComponent(async ($$result, $$props, $$slots) => {
  let letters = [];
  let error = null;
  try {
    const result = await sql`
    SELECT id, display_name, created_at, body, replied_at, reply_text
    FROM messages 
    WHERE mode = 'public' AND status = 'approved'
    ORDER BY created_at DESC
  `;
    letters = result.rows;
  } catch (err) {
    error = err.message;
  }
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"><title>Letters</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap" rel="stylesheet">${renderHead()}</head> <body class="bg-black text-white min-h-screen"> <div class="container mx-auto px-8 py-16 max-w-4xl"> <!-- Header --> <div class="mb-12"> <a href="/" class="inline-block mb-8 text-[#F5F2EA] hover:text-white transition-colors duration-300 text-lg">
← Home
</a> <h1 class="text-4xl font-light text-[#F5F2EA] font-serif italic mb-4">Letters</h1> </div> ${error ? renderTemplate`<div class="text-red-400 text-sm">Error loading letters: ${error}</div>` : letters.length === 0 ? renderTemplate`<div class="text-[#F5F2EA]/70 text-center py-12">
No letters yet.
</div>` : renderTemplate`<div class="space-y-6"> ${letters.map((letter) => {
    const excerpt = letter.body.length > 200 ? letter.body.substring(0, 200) + "..." : letter.body;
    const date = new Date(letter.created_at).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
    return renderTemplate`<div class="bg-black border border-[#F5F2EA]/30 rounded-lg p-6 hover:border-[#F5F2EA]/60 transition-colors duration-300"> <a${addAttribute(`/letters/${letter.id}`, "href")} class="block group"> <div class="flex justify-between items-start mb-3"> <h3 class="text-[#F5F2EA] font-serif italic group-hover:text-white transition-colors duration-300"> ${letter.display_name} </h3> <time class="text-[#F5F2EA]/50 text-sm">${date}</time> </div> <p class="text-[#F5F2EA]/80 leading-relaxed">${excerpt}</p> ${letter.reply_text && renderTemplate`<div class="mt-3 text-[#F5F2EA]/60 text-sm">
Has reply
</div>`} </a> </div>`;
  })} </div>`} </div> </body></html>`;
}, "/Users/kairon/Projects/web/kaironu/digital-doppler/src/pages/letters.astro", void 0);

const $$file = "/Users/kairon/Projects/web/kaironu/digital-doppler/src/pages/letters.astro";
const $$url = "/letters";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Letters,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
