import { c as createComponent, r as renderHead, d as addAttribute, b as renderTemplate } from '../chunks/astro/server_CYfxY4af.mjs';
import 'piccolore';
import 'clsx';
/* empty css                                 */
import { g as getCollection, c as countWords } from '../chunks/wordCount_D3j4iEOs.mjs';
export { renderers } from '../renderers.mjs';

const $$Writings = createComponent(async ($$result, $$props, $$slots) => {
  const allWritings = await getCollection("writings");
  const writings = allWritings.filter((writing) => !writing.data.draft).sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
  const writingsWithWordCount = await Promise.all(
    writings.map(async (writing) => {
      const wordCount = countWords(writing.body ?? "");
      return { ...writing, wordCount };
    })
  );
  function formatDate(date) {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Writings</title>${renderHead()}</head> <body class="bg-black text-white min-h-screen"> <!-- Home button --> <a href="/" class="fixed top-6 left-6 z-50 text-[#F5F2EA]/50 hover:text-[#F5F2EA]/80 text-sm transition-all duration-300" style="text-shadow: 0 0 20px rgba(245,242,234,0.1);">
← Home
</a> <div class="max-w-3xl mx-auto px-8 py-12 pt-20"> <h1 class="text-4xl font-bold mb-12">Writings</h1> <div class="space-y-8"> ${writingsWithWordCount.map((writing) => renderTemplate`<a${addAttribute(`/writings/${writing.slug}`, "href")} class="block group"> <article class="border-b border-gray-800 pb-8 transition-colors hover:border-gray-600"> <h2 class="text-2xl font-semibold mb-2 group-hover:text-gray-300 transition-colors"> ${writing.data.title} </h2> <div class="flex flex-wrap gap-4 text-sm text-gray-500 mb-3"> <span>${formatDate(writing.data.date)}</span> <span class="text-gray-700">·</span> <span>${writing.data.category}</span> <span class="text-gray-700">·</span> <span>${writing.wordCount} words</span> </div> ${writing.data.summary && renderTemplate`<p class="text-gray-400">${writing.data.summary}</p>`} </article> </a>`)} </div> ${writingsWithWordCount.length === 0 && renderTemplate`<p class="text-gray-500">No writings yet.</p>`} </div> </body></html>`;
}, "/Users/kairon/Projects/web/kaironu/digital-doppler/src/pages/writings.astro", void 0);

const $$file = "/Users/kairon/Projects/web/kaironu/digital-doppler/src/pages/writings.astro";
const $$url = "/writings";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Writings,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
