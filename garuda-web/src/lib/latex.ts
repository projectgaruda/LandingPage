/**
 * Detects and cleans malformed LaTeX from chatbot pastes.
 *
 * Chatbots often output stuff like:
 *   "The integral /∫/ of /x²/ equals..."
 *   "The integral \(\int\) of \(x^2\) equals..."
 *   "$$\frac{a}{b}$$"
 *
 * We normalize all of these into standard $...$ (inline) and $$...$$ (block).
 */
export function normalizeLatex(text: string): string {
  let out = text;

  // 1. \(...\) → $...$  (inline math from many chatbots)
  out = out.replace(/\\\((.+?)\\\)/g, (_, m) => `$${m.trim()}$`);

  // 2. \[...\] → $$...$$  (block math)
  out = out.replace(/\\\[(.+?)\\\]/gs, (_, m) => `$$${m.trim()}$$`);

  // 3. /symbol/ pattern — only when content looks like math
  //    Catches "/∫/", "/x²/", "/\frac{a}{b}/" but not "/about/" or "/contact/"
  out = out.replace(/\/([^/\n]{1,80})\//g, (match, inner) => {
    const trimmed = inner.trim();
    // Skip if it looks like a URL path: only ASCII letters, common path chars
    if (/^[a-zA-Z0-9_-]+$/.test(trimmed)) return match;
    // Skip if it looks like a domain name or filename (contains a dot)
    // This prevents corrupting Supabase URLs like /xxx.supabase.co/ or /file.jpg/
    if (/\./.test(trimmed)) return match;
    // Skip if too short and just regular letters
    if (trimmed.length <= 2 && /^[a-zA-Z]+$/.test(trimmed)) return match;
    // Looks like math — wrap it
    return `$${trimmed}$`;
  });

  return out;
}

/**
 * Parses text into chunks of plain text and math expressions.
 * Used by the renderer.
 */
export type Chunk =
  | { type: "text"; value: string }
  | { type: "inline-math"; value: string }
  | { type: "block-math"; value: string };

export function parseMath(text: string): Chunk[] {
  const chunks: Chunk[] = [];
  // Match $$...$$ (block) or $...$ (inline). Block first to avoid overlap.
  const regex = /(\$\$([^$]+)\$\$)|(\$([^$\n]+)\$)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      chunks.push({ type: "text", value: text.slice(lastIndex, match.index) });
    }
    if (match[2] !== undefined) {
      chunks.push({ type: "block-math", value: match[2].trim() });
    } else if (match[4] !== undefined) {
      chunks.push({ type: "inline-math", value: match[4].trim() });
    }
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    chunks.push({ type: "text", value: text.slice(lastIndex) });
  }
  return chunks;
}

/**
 * Quick check: does this text look like it has math in it?
 * Used to show a "math detected" notice in the editor.
 */
export function hasLatex(text: string): boolean {
  return (
    /\$[^$\n]+\$/.test(text) ||
    /\$\$[^$]+\$\$/.test(text) ||
    /\\\(.+?\\\)/.test(text) ||
    /\\\[.+?\\\]/s.test(text)
  );
}