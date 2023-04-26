export async function useEnvironmentGetter() {
  const { dappnetUrls, productionUrls } = await import("~/app.config");
  const nuxtConfig = useRuntimeConfig();
  const { siteUrl } = nuxtConfig.public;
  return {
    isDappnet: dappnetUrls.includes(siteUrl),
    isProduction: productionUrls.includes(siteUrl),
  };
}
