"use client";

import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { normalizeLatex } from "@/lib/latex";
import styles from "./PostBody.module.css";

export default function PostBody({ text }: { text: string }) {
  return (
    <div className={styles.body}>
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          a: ({ href, children }) => (
            <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
          ),
          img: ({ src, alt }) => (
            <img src={src} alt={alt ?? ""} className={styles.img} />
          ),
        }}
      >
        {normalizeLatex(text ?? "")}
      </ReactMarkdown>
    </div>
  );
}
