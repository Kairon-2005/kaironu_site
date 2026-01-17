import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CEbOjkjA.mjs';
import { manifest } from './manifest_OjIHl54u.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/admin/inbox.astro.mjs');
const _page2 = () => import('./pages/api/admin/message/update.astro.mjs');
const _page3 = () => import('./pages/api/message/reply.astro.mjs');
const _page4 = () => import('./pages/api/message.astro.mjs');
const _page5 = () => import('./pages/fragments.astro.mjs');
const _page6 = () => import('./pages/letters/_id_.astro.mjs');
const _page7 = () => import('./pages/letters.astro.mjs');
const _page8 = () => import('./pages/message/key/_id_.astro.mjs');
const _page9 = () => import('./pages/message/reply/_id_.astro.mjs');
const _page10 = () => import('./pages/message/sent.astro.mjs');
const _page11 = () => import('./pages/message.astro.mjs');
const _page12 = () => import('./pages/writings/_slug_.astro.mjs');
const _page13 = () => import('./pages/writings.astro.mjs');
const _page14 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/admin/inbox.astro", _page1],
    ["src/pages/api/admin/message/update.ts", _page2],
    ["src/pages/api/message/reply.ts", _page3],
    ["src/pages/api/message.ts", _page4],
    ["src/pages/fragments.astro", _page5],
    ["src/pages/letters/[id].astro", _page6],
    ["src/pages/letters.astro", _page7],
    ["src/pages/message/key/[id].astro", _page8],
    ["src/pages/message/reply/[id].astro", _page9],
    ["src/pages/message/sent.astro", _page10],
    ["src/pages/message.astro", _page11],
    ["src/pages/writings/[slug].astro", _page12],
    ["src/pages/writings.astro", _page13],
    ["src/pages/index.astro", _page14]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "42ba6712-d842-4157-b55c-ee678da74ccb",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
