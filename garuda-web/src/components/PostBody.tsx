"use client";

import { InlineMath, BlockMath } from "react-katex";
import { parseMath } from "@/lib/latex";

export default function PostBody({ text }: { text: string }) {
  const chunks = parseMath(text);

  return (
    <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.7 }}>
      {chunks.map((chunk, i) => {
        if (chunk.type === "text") {
          return <span key={i}>{chunk.value}</span>;
        }
        if (chunk.type === "inline-math") {
          try {
            return <InlineMath key={i} math={chunk.value} />;
          } catch {
            return <code key={i}>{chunk.value}</code>;
          }
        }
        try {
          return <BlockMath key={i} math={chunk.value} />;
        } catch {
          return <pre key={i}>{chunk.value}</pre>;
        }
      })}
    </div>
  );
}