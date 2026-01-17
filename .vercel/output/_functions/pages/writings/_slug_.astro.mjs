import { c as createComponent, a as createAstro, r as renderHead, g as renderComponent, b as renderTemplate } from '../../chunks/astro/server_CYfxY4af.mjs';
import 'piccolore';
/* empty css                                    */
import { r as renderEntry, c as countWords, g as getCollection } from '../../chunks/wordCount_D3j4iEOs.mjs';
/* empty css                                     */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
async function getStaticPaths() {
  const writings = await getCollection("writings");
  return writings.map((writing) => ({
    params: { slug: writing.slug },
    props: { writing }
  }));
}
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { writing } = Astro2.props;
  const { Content } = await renderEntry(writing);
  const counts = countWords(writing.body ?? "");
  function formatDate(date) {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }
  function formatLength(counts2) {
    const parts = [];
    if (counts2.englishWords > 0) parts.push(`${counts2.englishWords} words`);
    if (counts2.chineseChars > 0) parts.push(`${counts2.chineseChars} \u5B57`);
    return parts.join(" \xB7 ") || "0";
  }
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${writing.data.title}</title>${renderHead()}</head> <body class="bg-black text-white min-h-screen"> <!-- Home button --> <a href="/" class="fixed top-6 left-6 z-50 text-[#F5F2EA]/50 hover:text-[#F5F2EA]/80 text-sm transition-all duration-300" style="text-shadow: 0 0 20px rgba(245,242,234,0.1);">
← Home
</a> <article class="max-w-2xl mx-auto px-8 py-12 pt-20"> <header class="mb-12"> <a href="/writings" class="text-gray-500 hover:text-gray-300 text-sm mb-6 inline-block transition-colors">
← Back to writings
</a> <h1 class="text-4xl font-bold mb-4 leading-tight">${writing.data.title}</h1> <div class="flex flex-wrap gap-4 text-sm text-gray-500"> <span>${formatDate(writing.data.date)}</span> <span class="text-gray-700">·</span> <span>${writing.data.category}</span> <span class="text-gray-700">·</span> <span>${formatLength(counts)}</span> </div> </header> <div class="prose prose-invert prose-lg max-w-none leading-relaxed text-gray-300 space-y-6"> ${renderComponent($$result, "Content", Content, {})} </div> </article> </body></html>`;
}, "/Users/kairon/Projects/web/kaironu/digital-doppler/src/pages/writings/[slug].astro", void 0);

const $$file = "/Users/kairon/Projects/web/kaironu/digital-doppler/src/pages/writings/[slug].astro";
const $$url = "/writings/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
