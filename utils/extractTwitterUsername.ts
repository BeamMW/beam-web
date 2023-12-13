export function extractXUsername(url: string): string | null {
  const regex = /x\.com\/([a-zA-Z0-9_]+)/;
  const match = url.match(regex);

  return match ? "@" + match[1] : null;
}
