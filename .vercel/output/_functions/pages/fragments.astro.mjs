import { c as createComponent, b as renderTemplate, e as defineScriptVars, d as addAttribute, r as renderHead } from '../chunks/astro/server_CYfxY4af.mjs';
import 'piccolore';
import 'clsx';
/* empty css                                 */
/* empty css                                     */
export { renderers } from '../renderers.mjs';

const fragments = [
	{
		text: "The best code is the code you don't write.",
		source: "Programming wisdom",
		date: "2025-01-15",
		tags: [
			"code",
			"simplicity"
		]
	},
	{
		text: "We are the universe experiencing itself.",
		source: "Carl Sagan",
		date: "2025-01-14",
		tags: [
			"cosmos",
			"philosophy"
		]
	},
	{
		text: "Every exit is an entry somewhere else.",
		source: "Tom Stoppard",
		date: "2025-01-12",
		tags: [
			"transitions",
			"perspective"
		]
	},
	{
		text: "The only way out is through.",
		source: "Robert Frost",
		date: "2025-01-10",
		tags: [
			"perseverance"
		]
	},
	{
		text: "In the middle of difficulty lies opportunity.",
		source: "Albert Einstein",
		date: "2025-01-08",
		tags: [
			"opportunity",
			"challenge"
		]
	},
	{
		text: "Reality is merely an illusion, albeit a very persistent one.",
		source: "Albert Einstein",
		date: "2025-01-05",
		tags: [
			"reality",
			"perception"
		]
	},
	{
		text: "The map is not the territory.",
		source: "Alfred Korzybski",
		date: "2025-01-03",
		tags: [
			"abstraction",
			"models"
		]
	},
	{
		text: "Simplicity is the ultimate sophistication.",
		source: "Leonardo da Vinci",
		date: "2024-12-28",
		tags: [
			"design",
			"simplicity"
		]
	},
	{
		text: "Time flies like an arrow; fruit flies like a banana.",
		source: "Groucho Marx",
		date: "2024-12-20",
		tags: [
			"humor",
			"language"
		]
	},
	{
		text: "The future is already here — it's just not evenly distributed.",
		source: "William Gibson",
		date: "2024-12-15",
		tags: [
			"future",
			"technology"
		]
	},
	{
		text: "We shape our tools, and thereafter our tools shape us.",
		source: "Marshall McLuhan",
		date: "2024-12-10",
		tags: [
			"technology",
			"humanity"
		]
	},
	{
		text: "Not all those who wander are lost.",
		source: "J.R.R. Tolkien",
		date: "2024-12-05",
		tags: [
			"journey",
			"exploration"
		]
	}
];

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Fragments = createComponent(($$result, $$props, $$slots) => {
  const typedFragments = fragments;
  return renderTemplate(_a || (_a = __template(['<html lang="en" data-astro-cid-p65iu5ts> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Fragments</title>', '</head> <body class="bg-black text-white min-h-screen" data-astro-cid-p65iu5ts> <!-- Home button --> <a href="/" class="fixed top-6 left-6 z-50 text-[#F5F2EA]/50 hover:text-[#F5F2EA]/80 text-sm transition-all duration-300" style="text-shadow: 0 0 20px rgba(245,242,234,0.1);" data-astro-cid-p65iu5ts>\n\u2190 Home\n</a> <div class="max-w-6xl mx-auto px-8 py-12 pt-20" data-astro-cid-p65iu5ts> <h1 class="text-4xl font-bold mb-12" data-astro-cid-p65iu5ts>Fragments</h1> <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" data-astro-cid-p65iu5ts> ', ' </div> </div> <!-- Modal Overlay --> <div id="modal" class="fixed inset-0 bg-black/90 backdrop-blur-sm hidden items-center justify-center z-50 p-8" data-astro-cid-p65iu5ts> <div class="bg-gray-950 border border-gray-800 rounded-xl max-w-xl w-full p-8 relative" data-astro-cid-p65iu5ts> <button id="modal-close" class="absolute top-4 right-4 text-gray-500 hover:text-white text-2xl leading-none" data-astro-cid-p65iu5ts>&times;</button> <p id="modal-text" class="text-xl text-gray-200 leading-relaxed mb-6" data-astro-cid-p65iu5ts></p> <p id="modal-source" class="text-gray-500 text-sm" data-astro-cid-p65iu5ts></p> <div id="modal-tags" class="mt-4 flex flex-wrap gap-2" data-astro-cid-p65iu5ts></div> </div> </div> <script>(function(){', "\n      const modal = document.getElementById('modal');\n      const modalText = document.getElementById('modal-text');\n      const modalSource = document.getElementById('modal-source');\n      const modalTags = document.getElementById('modal-tags');\n      const modalClose = document.getElementById('modal-close');\n      const cards = document.querySelectorAll('.fragment-card');\n\n      cards.forEach(card => {\n        card.addEventListener('click', () => {\n          const index = parseInt(card.dataset.index);\n          const fragment = fragments[index];\n\n          modalText.textContent = fragment.text;\n          modalSource.textContent = fragment.source ? `\u2014 ${fragment.source}` : '';\n\n          modalTags.innerHTML = '';\n          if (fragment.tags && fragment.tags.length > 0) {\n            fragment.tags.forEach(tag => {\n              const span = document.createElement('span');\n              span.className = 'text-xs px-2 py-1 bg-gray-800 text-gray-400 rounded';\n              span.textContent = tag;\n              modalTags.appendChild(span);\n            });\n          }\n\n          modal.classList.remove('hidden');\n          modal.classList.add('flex');\n        });\n      });\n\n      modalClose.addEventListener('click', () => {\n        modal.classList.add('hidden');\n        modal.classList.remove('flex');\n      });\n\n      modal.addEventListener('click', (e) => {\n        if (e.target === modal) {\n          modal.classList.add('hidden');\n          modal.classList.remove('flex');\n        }\n      });\n\n      document.addEventListener('keydown', (e) => {\n        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {\n          modal.classList.add('hidden');\n          modal.classList.remove('flex');\n        }\n      });\n    })();<\/script>  </body> </html>"], ['<html lang="en" data-astro-cid-p65iu5ts> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Fragments</title>', '</head> <body class="bg-black text-white min-h-screen" data-astro-cid-p65iu5ts> <!-- Home button --> <a href="/" class="fixed top-6 left-6 z-50 text-[#F5F2EA]/50 hover:text-[#F5F2EA]/80 text-sm transition-all duration-300" style="text-shadow: 0 0 20px rgba(245,242,234,0.1);" data-astro-cid-p65iu5ts>\n\u2190 Home\n</a> <div class="max-w-6xl mx-auto px-8 py-12 pt-20" data-astro-cid-p65iu5ts> <h1 class="text-4xl font-bold mb-12" data-astro-cid-p65iu5ts>Fragments</h1> <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" data-astro-cid-p65iu5ts> ', ' </div> </div> <!-- Modal Overlay --> <div id="modal" class="fixed inset-0 bg-black/90 backdrop-blur-sm hidden items-center justify-center z-50 p-8" data-astro-cid-p65iu5ts> <div class="bg-gray-950 border border-gray-800 rounded-xl max-w-xl w-full p-8 relative" data-astro-cid-p65iu5ts> <button id="modal-close" class="absolute top-4 right-4 text-gray-500 hover:text-white text-2xl leading-none" data-astro-cid-p65iu5ts>&times;</button> <p id="modal-text" class="text-xl text-gray-200 leading-relaxed mb-6" data-astro-cid-p65iu5ts></p> <p id="modal-source" class="text-gray-500 text-sm" data-astro-cid-p65iu5ts></p> <div id="modal-tags" class="mt-4 flex flex-wrap gap-2" data-astro-cid-p65iu5ts></div> </div> </div> <script>(function(){', "\n      const modal = document.getElementById('modal');\n      const modalText = document.getElementById('modal-text');\n      const modalSource = document.getElementById('modal-source');\n      const modalTags = document.getElementById('modal-tags');\n      const modalClose = document.getElementById('modal-close');\n      const cards = document.querySelectorAll('.fragment-card');\n\n      cards.forEach(card => {\n        card.addEventListener('click', () => {\n          const index = parseInt(card.dataset.index);\n          const fragment = fragments[index];\n\n          modalText.textContent = fragment.text;\n          modalSource.textContent = fragment.source ? \\`\u2014 \\${fragment.source}\\` : '';\n\n          modalTags.innerHTML = '';\n          if (fragment.tags && fragment.tags.length > 0) {\n            fragment.tags.forEach(tag => {\n              const span = document.createElement('span');\n              span.className = 'text-xs px-2 py-1 bg-gray-800 text-gray-400 rounded';\n              span.textContent = tag;\n              modalTags.appendChild(span);\n            });\n          }\n\n          modal.classList.remove('hidden');\n          modal.classList.add('flex');\n        });\n      });\n\n      modalClose.addEventListener('click', () => {\n        modal.classList.add('hidden');\n        modal.classList.remove('flex');\n      });\n\n      modal.addEventListener('click', (e) => {\n        if (e.target === modal) {\n          modal.classList.add('hidden');\n          modal.classList.remove('flex');\n        }\n      });\n\n      document.addEventListener('keydown', (e) => {\n        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {\n          modal.classList.add('hidden');\n          modal.classList.remove('flex');\n        }\n      });\n    })();<\/script>  </body> </html>"])), renderHead(), typedFragments.map((fragment, index) => renderTemplate`<button class="fragment-card text-left p-6 border border-gray-800 rounded-lg transition-all duration-200 hover:scale-[1.02] hover:border-gray-600 hover:bg-gray-900/50 cursor-pointer"${addAttribute(index, "data-index")} data-astro-cid-p65iu5ts> <p class="text-gray-300 line-clamp-3" data-astro-cid-p65iu5ts>${fragment.text}</p> ${fragment.source && renderTemplate`<p class="text-gray-600 text-sm mt-3" data-astro-cid-p65iu5ts>— ${fragment.source}</p>`} </button>`), defineScriptVars({ fragments: typedFragments }));
}, "/Users/kairon/Projects/web/kaironu/digital-doppler/src/pages/fragments.astro", void 0);

const $$file = "/Users/kairon/Projects/web/kaironu/digital-doppler/src/pages/fragments.astro";
const $$url = "/fragments";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Fragments,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
