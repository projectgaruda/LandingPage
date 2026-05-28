"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./Lightbox.module.css";

export default function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
  useEffect(() => {
    const handle = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handle);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handle);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true">
      <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">✕</button>
      <img src={src} alt="" className={styles.img} onClick={e => e.stopPropagation()} />
    </div>,
    document.body
  );
}
