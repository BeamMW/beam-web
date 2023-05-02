export function extractTwitterUsername(url: string): string | null {
  const regex = /twitter\.com\/([a-zA-Z0-9_]+)/;
  const match = url.match(regex);

  return match ? "@" + match[1] : null;
}
