export default defineNuxtRouteMiddleware((to) => {
  // Canonical URLs have no trailing slash — every route is prerendered
  // slash-less. Redirect e.g. /docs/ecosystem/ -> /docs/ecosystem so
  // trailing-slash links, bookmarks, or crawlers don't land on an
  // unprerendered route (which 404s on load, or on SPA navigation re-runs a
  // client-side content query that boots the @nuxt/content SQLite-WASM engine).
  // Done in middleware rather than public/_redirects because Cloudflare Pages
  // requires splats at the end of a source path, so a single global
  // trailing-slash rule (/*/ -> /:splat) isn't expressible there.
  if (to.path.length > 1 && to.path.endsWith("/")) {
    return navigateTo(
      {
        path: to.path.replace(/\/+$/, ""),
        query: to.query,
        hash: to.hash,
      },
      { redirectCode: 301 },
    );
  }
});
