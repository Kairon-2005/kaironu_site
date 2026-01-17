import { c as createComponent, a as createAstro, r as renderHead, b as renderTemplate } from '../../chunks/astro/server_CYfxY4af.mjs';
import 'piccolore';
import 'clsx';
/* empty css                                    */
import { sql } from '@vercel/postgres';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
async function getStaticPaths() {
  return [];
}
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  let letter = null;
  let error = null;
  try {
    const result = await sql`
    SELECT id, display_name, created_at, body, replied_at, reply_text
    FROM messages 
    WHERE id = ${id} AND mode = 'public' AND status = 'approved'
  `;
    if (result.rows.length > 0) {
      letter = result.rows[0];
    } else {
      return Astro2.redirect("/letters");
    }
  } catch (err) {
    error = err.message;
  }
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"><title>${letter ? `Letter from ${letter.display_name}` : "Letter"}</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap" rel="stylesheet">${renderHead()}</head> <body class="bg-black text-white min-h-screen"> <div class="container mx-auto px-8 py-16 max-w-3xl"> <!-- Header --> <div class="mb-12"> <div class="flex items-center space-x-4 mb-8"> <a href="/" class="text-[#F5F2EA] hover:text-white transition-colors duration-300 text-lg">
← Home
</a> <span class="text-[#F5F2EA]/50">•</span> <a href="/letters" class="text-[#F5F2EA] hover:text-white transition-colors duration-300 text-lg">
← Back to letters
</a> </div> ${letter && renderTemplate`<div class="space-y-2"> <h1 class="text-4xl font-light text-[#F5F2EA] font-serif italic">${letter.display_name}</h1> <time class="text-[#F5F2EA]/60 text-sm"> ${new Date(letter.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  })} </time> </div>`} </div> ${error ? renderTemplate`<div class="text-red-400 text-sm">Error loading letter: ${error}</div>` : letter ? renderTemplate`<div class="space-y-12"> <!-- Letter content --> <div class="bg-black border border-[#F5F2EA]/30 rounded-lg p-8"> <div class="text-[#F5F2EA] leading-relaxed whitespace-pre-wrap font-serif text-lg"> ${letter.body} </div> </div> <!-- Reply if exists --> ${letter.reply_text && renderTemplate`<div class="space-y-4"> <div class="h-px bg-[#F5F2EA]/20"></div> <div class="bg-black border border-[#F5F2EA]/20 rounded-lg p-8"> <div class="mb-4"> <div class="text-[#F5F2EA]/80 text-sm font-serif italic">Reply</div> ${letter.replied_at && renderTemplate`<time class="text-[#F5F2EA]/50 text-xs"> ${new Date(letter.replied_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  })} </time>`} </div> <div class="text-[#F5F2EA]/90 leading-relaxed whitespace-pre-wrap font-serif"> ${letter.reply_text} </div> </div> </div>`} </div>` : null} </div> </body></html>`;
}, "/Users/kairon/Projects/web/kaironu/digital-doppler/src/pages/letters/[id].astro", void 0);

const $$file = "/Users/kairon/Projects/web/kaironu/digital-doppler/src/pages/letters/[id].astro";
const $$url = "/letters/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
