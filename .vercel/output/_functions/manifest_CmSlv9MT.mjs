import 'piccolore';
import { k as decodeKey } from './chunks/astro/server_CYfxY4af.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_DepSLErz.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/kairon/Projects/web/kaironu/digital-doppler/","cacheDir":"file:///Users/kairon/Projects/web/kaironu/digital-doppler/node_modules/.astro/","outDir":"file:///Users/kairon/Projects/web/kaironu/digital-doppler/dist/","srcDir":"file:///Users/kairon/Projects/web/kaironu/digital-doppler/src/","publicDir":"file:///Users/kairon/Projects/web/kaironu/digital-doppler/public/","buildClientDir":"file:///Users/kairon/Projects/web/kaironu/digital-doppler/dist/client/","buildServerDir":"file:///Users/kairon/Projects/web/kaironu/digital-doppler/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/inbox.CzMWBeAF.css"}],"routeData":{"route":"/admin/inbox","isIndex":false,"type":"page","pattern":"^\\/admin\\/inbox\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"inbox","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/inbox.astro","pathname":"/admin/inbox","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/admin/message/update","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/admin\\/message\\/update\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"message","dynamic":false,"spread":false}],[{"content":"update","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/admin/message/update.ts","pathname":"/api/admin/message/update","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/message/reply","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/message\\/reply\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"message","dynamic":false,"spread":false}],[{"content":"reply","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/message/reply.ts","pathname":"/api/message/reply","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/message","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/message\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"message","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/message.ts","pathname":"/api/message","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/inbox.CzMWBeAF.css"},{"type":"inline","content":".line-clamp-3[data-astro-cid-p65iu5ts]{display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}\n"}],"routeData":{"route":"/fragments","isIndex":false,"type":"page","pattern":"^\\/fragments\\/?$","segments":[[{"content":"fragments","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/fragments.astro","pathname":"/fragments","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/inbox.CzMWBeAF.css"}],"routeData":{"route":"/letters","isIndex":false,"type":"page","pattern":"^\\/letters\\/?$","segments":[[{"content":"letters","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/letters.astro","pathname":"/letters","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/inbox.CzMWBeAF.css"}],"routeData":{"route":"/message/sent","isIndex":false,"type":"page","pattern":"^\\/message\\/sent\\/?$","segments":[[{"content":"message","dynamic":false,"spread":false}],[{"content":"sent","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/message/sent.astro","pathname":"/message/sent","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/inbox.CzMWBeAF.css"},{"type":"inline","content":"input[data-astro-cid-o6t6v3xu][type=radio]{appearance:none;border-radius:50%}input[data-astro-cid-o6t6v3xu][type=radio]:checked{background-color:#f5f2ea}input[data-astro-cid-o6t6v3xu][type=radio]:checked:before{content:\"\";display:block;width:6px;height:6px;border-radius:50%;background-color:#000;margin:1px auto}input[data-astro-cid-o6t6v3xu][type=checkbox]{appearance:none}input[data-astro-cid-o6t6v3xu][type=checkbox]:checked{background-color:#f5f2ea;position:relative}input[data-astro-cid-o6t6v3xu][type=checkbox]:checked:before{content:\"✓\";position:absolute;top:0;left:0;width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:#000;font-size:12px}\n"}],"routeData":{"route":"/message","isIndex":false,"type":"page","pattern":"^\\/message\\/?$","segments":[[{"content":"message","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/message.astro","pathname":"/message","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/inbox.CzMWBeAF.css"}],"routeData":{"route":"/writings","isIndex":false,"type":"page","pattern":"^\\/writings\\/?$","segments":[[{"content":"writings","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/writings.astro","pathname":"/writings","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/inbox.CzMWBeAF.css"},{"type":"external","src":"/_astro/index.Bj_JdXe2.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/kairon/Projects/web/kaironu/digital-doppler/src/pages/admin/inbox.astro",{"propagation":"none","containsHead":true}],["/Users/kairon/Projects/web/kaironu/digital-doppler/src/pages/fragments.astro",{"propagation":"none","containsHead":true}],["/Users/kairon/Projects/web/kaironu/digital-doppler/src/pages/letters/[id].astro",{"propagation":"none","containsHead":true}],["/Users/kairon/Projects/web/kaironu/digital-doppler/src/pages/letters.astro",{"propagation":"none","containsHead":true}],["/Users/kairon/Projects/web/kaironu/digital-doppler/src/pages/message/key/[id].astro",{"propagation":"none","containsHead":true}],["/Users/kairon/Projects/web/kaironu/digital-doppler/src/pages/message/reply/[id].astro",{"propagation":"none","containsHead":true}],["/Users/kairon/Projects/web/kaironu/digital-doppler/src/pages/message/sent.astro",{"propagation":"none","containsHead":true}],["/Users/kairon/Projects/web/kaironu/digital-doppler/src/pages/message.astro",{"propagation":"none","containsHead":true}],["/Users/kairon/Projects/web/kaironu/digital-doppler/src/pages/writings/[slug].astro",{"propagation":"in-tree","containsHead":true}],["/Users/kairon/Projects/web/kaironu/digital-doppler/src/pages/writings.astro",{"propagation":"in-tree","containsHead":true}],["/Users/kairon/Projects/web/kaironu/digital-doppler/src/pages/index.astro",{"propagation":"none","containsHead":true}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/writings@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/writings/[slug]@_@astro",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/admin/inbox@_@astro":"pages/admin/inbox.astro.mjs","\u0000@astro-page:src/pages/api/admin/message/update@_@ts":"pages/api/admin/message/update.astro.mjs","\u0000@astro-page:src/pages/api/message/reply@_@ts":"pages/api/message/reply.astro.mjs","\u0000@astro-page:src/pages/api/message@_@ts":"pages/api/message.astro.mjs","\u0000@astro-page:src/pages/fragments@_@astro":"pages/fragments.astro.mjs","\u0000@astro-page:src/pages/letters/[id]@_@astro":"pages/letters/_id_.astro.mjs","\u0000@astro-page:src/pages/letters@_@astro":"pages/letters.astro.mjs","\u0000@astro-page:src/pages/message/key/[id]@_@astro":"pages/message/key/_id_.astro.mjs","\u0000@astro-page:src/pages/message/reply/[id]@_@astro":"pages/message/reply/_id_.astro.mjs","\u0000@astro-page:src/pages/message/sent@_@astro":"pages/message/sent.astro.mjs","\u0000@astro-page:src/pages/message@_@astro":"pages/message.astro.mjs","\u0000@astro-page:src/pages/writings/[slug]@_@astro":"pages/writings/_slug_.astro.mjs","\u0000@astro-page:src/pages/writings@_@astro":"pages/writings.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_CmSlv9MT.mjs","/Users/kairon/Projects/web/kaironu/digital-doppler/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_BXHG3AJc.mjs","/Users/kairon/Projects/web/kaironu/digital-doppler/.astro/content-assets.mjs":"chunks/content-assets_DleWbedO.mjs","/Users/kairon/Projects/web/kaironu/digital-doppler/.astro/content-modules.mjs":"chunks/content-modules_Dz-S_Wwv.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_CfvxXiQm.mjs","/Users/kairon/Projects/web/kaironu/digital-doppler/src/pages/message/key/[id].astro?astro&type=script&index=0&lang.ts":"_astro/_id_.astro_astro_type_script_index_0_lang.zwfCf6EE.js","/Users/kairon/Projects/web/kaironu/digital-doppler/src/pages/message.astro?astro&type=script&index=0&lang.ts":"_astro/message.astro_astro_type_script_index_0_lang.HtOfpbOe.js","/Users/kairon/Projects/web/kaironu/digital-doppler/src/pages/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.BKqkeoU0.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/kairon/Projects/web/kaironu/digital-doppler/src/pages/message/key/[id].astro?astro&type=script&index=0&lang.ts","const e=document.getElementById(\"copyBtn\"),t=document.getElementById(\"replyKey\");e.addEventListener(\"click\",async()=>{try{await navigator.clipboard.writeText(t.value),e.textContent=\"Copied!\",setTimeout(()=>{e.textContent=\"Copy\"},2e3)}catch{t.select(),document.execCommand(\"copy\"),e.textContent=\"Copied!\",setTimeout(()=>{e.textContent=\"Copy\"},2e3)}});"],["/Users/kairon/Projects/web/kaironu/digital-doppler/src/pages/message.astro?astro&type=script&index=0&lang.ts","const s=document.getElementById(\"anonymous\"),a=document.getElementById(\"nameField\"),r=document.getElementById(\"displayName\"),i=document.getElementById(\"messageForm\"),n=document.getElementById(\"submitBtn\"),o=document.getElementById(\"error\");s.addEventListener(\"change\",()=>{s.checked?(a.classList.add(\"hidden\"),r.required=!1):(a.classList.remove(\"hidden\"),r.required=!0)});i.addEventListener(\"submit\",async m=>{m.preventDefault(),n.disabled=!0,n.textContent=\"Sending...\",o.classList.add(\"hidden\");const t=new FormData(i),c={isAnonymous:s.checked,displayName:s.checked?\"Anonymous\":t.get(\"displayName\")||\"\",mode:t.get(\"mode\"),replyPreference:t.get(\"replyPreference\"),body:t.get(\"body\")};try{const e=await(await fetch(\"/api/message\",{method:\"POST\",headers:{\"Content-Type\":\"application/json\"},body:JSON.stringify(c)})).json();if(e.ok)e.key?window.location.href=`/message/key/${e.id}?k=${encodeURIComponent(e.key)}`:window.location.href=\"/message/sent\";else throw new Error(e.error||\"Failed to send message\")}catch(d){o.textContent=d.message,o.classList.remove(\"hidden\"),n.disabled=!1,n.textContent=\"Send\"}});"]],"assets":["/_astro/inbox.CzMWBeAF.css","/_astro/index.Bj_JdXe2.css","/favicon.svg","/_astro/index.astro_astro_type_script_index_0_lang.BKqkeoU0.js","/assets/portal/layer1.jpeg"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"CZ9CZRkUhnDjzLDdElzJnbqXyK5o6uVVRYWGpKRTazU="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
