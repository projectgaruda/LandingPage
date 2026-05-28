"use client";

import { useState } from "react";
import Lightbox from "./Lightbox";

export default function ClickableCover({ src, className }: { src: string; className?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <img
        src={src}
        alt=""
        className={className}
        onClick={() => setOpen(true)}
        style={{ cursor: "zoom-in" }}
        title="Click to enlarge"
      />
      {open && <Lightbox src={src} onClose={() => setOpen(false)} />}
    </>
  );
}
