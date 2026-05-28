"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeRaw from "rehype-raw";
import rehypeKatex from "rehype-katex";
import { normalizeLatex } from "@/lib/latex";
import Lightbox from "./Lightbox";
import styles from "./PostBody.module.css";

function PostImage({ src, alt }: { src?: string; alt?: string }) {
  const [errored, setErrored] = useState(false);
  const [lightbox, setLightbox] = useState(false);
  if (!src || errored) {
    return (
      <span className={styles.imgError}>
        [Image unavailable{errored ? " — the storage bucket may not be public" : ""}]
      </span>
    );
  }
  return (
    <>
      <img
        src={src}
        alt={alt ?? ""}
        className={`${styles.img} ${styles.imgClickable}`}
        onClick={() => setLightbox(true)}
        onError={() => setErrored(true)}
        title="Click to enlarge"
      />
      {lightbox && <Lightbox src={src} onClose={() => setLightbox(false)} />}
    </>
  );
}

export default function PostBody({ text }: { text: string }) {
  return (
    <div className={styles.body}>
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeRaw, rehypeKatex]}
        components={{
          a: ({ href, children }) => (
            <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
          ),
          img: ({ src, alt }) => <PostImage src={src} alt={alt} />,
        }}
      >
        {normalizeLatex(text ?? "")}
      </ReactMarkdown>
    </div>
  );
}
