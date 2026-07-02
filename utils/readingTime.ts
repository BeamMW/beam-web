const WORDS_PER_MINUTE = 200;

// Collect all visible text from a Nuxt Content body. Content v3 uses the
// Minimark compact AST where text nodes are bare strings and element nodes are
// arrays shaped like `[tag, props, ...children]`. The root is an object with a
// `value` array. The legacy `{ type, value, children }` shape is also handled
// so the helper stays robust.
const collectText = (node: unknown, out: string[]): void => {
  if (typeof node === "string") {
    out.push(node);
    return;
  }
  if (Array.isArray(node)) {
    // Minimark element node: [tag, props, ...children]
    for (let i = 2; i < node.length; i++) collectText(node[i], out);
    return;
  }
  if (node && typeof node === "object") {
    const n = node as { type?: string; value?: unknown; children?: unknown };
    if (n.type === "text" && typeof n.value === "string") {
      out.push(n.value);
    } else if (Array.isArray(n.value)) {
      for (const child of n.value) collectText(child, out);
    }
    if (Array.isArray(n.children)) {
      for (const child of n.children) collectText(child, out);
    }
  }
};

export const readingTimeMinutes = (body: unknown): number => {
  const parts: string[] = [];
  collectText(body, parts);
  const words = parts.join(" ").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
};
