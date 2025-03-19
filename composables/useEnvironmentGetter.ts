export async function useEnvironmentGetter() {
  const { productionUrls } = await import("~/app.config");
  const nuxtConfig = useRuntimeConfig();
  const { siteUrl } = nuxtConfig.public;
  return {
    isProduction: productionUrls.includes(siteUrl),
  };
}
