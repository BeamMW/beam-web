const WORDS_PER_MINUTE = 200;

interface BodyNode {
  type?: string;
  value?: string;
  children?: BodyNode[];
}

const collectText = (
  node: BodyNode | null | undefined,
  out: string[],
): void => {
  if (!node) return;
  if (node.type === "text" && typeof node.value === "string") {
    out.push(node.value);
  }
  if (node.children) {
    for (const child of node.children) collectText(child, out);
  }
};

export const readingTimeMinutes = (body: unknown): number => {
  const parts: string[] = [];
  collectText(body as BodyNode, parts);
  const words = parts.join(" ").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
};
