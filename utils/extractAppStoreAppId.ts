export function extractAppStoreAppId(url: string): string | null {
  const regex = /id(\d+)/;
  const match = url.match(regex);

  return match ? match[1] : null;
}
