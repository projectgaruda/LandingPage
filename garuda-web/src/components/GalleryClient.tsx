"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Lightbox from "@/components/Lightbox";
import styles from "@/app/gallery/page.module.css";

type GalleryImage = { src: string; alt: string; category: string };

const CATEGORY_COLORS: Record<string, { text: string; bg: string; border: string }> = {
  Builds:      { text: "#2bff00", bg: "rgba(43,255,0,0.12)",      border: "rgba(43,255,0,0.35)" },
  Fabrication: { text: "#f59e0b", bg: "rgba(245,158,11,0.12)",    border: "rgba(245,158,11,0.35)" },
  Team:        { text: "#60a5fa", bg: "rgba(96,165,250,0.12)",    border: "rgba(96,165,250,0.35)" },
  Awards:      { text: "#fbbf24", bg: "rgba(251,191,36,0.12)",    border: "rgba(251,191,36,0.35)" },
  Testing:     { text: "#f87171", bg: "rgba(248,113,113,0.12)",   border: "rgba(248,113,113,0.35)" },
  Events:      { text: "#34d399", bg: "rgba(52,211,153,0.12)",    border: "rgba(52,211,153,0.35)" },
  Technical:   { text: "#fb923c", bg: "rgba(251,146,60,0.12)",    border: "rgba(251,146,60,0.35)" },
  Design:      { text: "#e879f9", bg: "rgba(232,121,249,0.12)",   border: "rgba(232,121,249,0.35)" },
};

export default function GalleryClient({ images }: { images: GalleryImage[] }) {
  const [active, setActive] = useState("All");
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const categories = ["All", ...Array.from(new Set(images.map((i) => i.category)))];
  const filtered = active === "All" ? images : images.filter((i) => i.category === active);
  const activePalette = active !== "All" ? CATEGORY_COLORS[active] : null;

  return (
    <>
      {/* Filter tabs */}
      <div className={styles.filterRow}>
        {categories.map((cat) => {
          const palette = CATEGORY_COLORS[cat];
          const isActive = cat === active;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className={`${styles.filterTab} ${isActive ? styles.filterTabActive : ""}`}
              style={isActive && palette ? {
                color: palette.text,
                borderColor: palette.border,
                background: palette.bg,
              } : isActive ? undefined : undefined}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Count */}
      <p className={styles.filterCount}>
        {filtered.length} {filtered.length === 1 ? "photo" : "photos"}
        {active !== "All" && (
          <> in <span style={{ color: activePalette?.text ?? "var(--accent-green)" }}>{active}</span></>
        )}
      </p>

      {/* Masonry grid — key change re-triggers entry animations on filter switch */}
      <div key={active} className={styles.galleryGrid}>
        {filtered.map((img, i) => {
          const palette = CATEGORY_COLORS[img.category];
          return (
            <motion.div
              key={img.src}
              className={styles.galleryItem}
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.38, delay: Math.min(i * 0.05, 0.5), ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className={styles.imageWrap}
                onClick={() => setLightboxSrc(img.src)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setLightboxSrc(img.src)}
                aria-label={`Open: ${img.alt}`}
              >
                <img src={img.src} alt={img.alt} className={styles.image} loading="lazy" />
                <div className={styles.overlay}>
                  <div className={styles.overlayContent}>
                    <span
                      className={styles.category}
                      style={palette ? {
                        color: palette.text,
                        background: palette.bg,
                        borderColor: palette.border,
                      } : undefined}
                    >
                      {img.category}
                    </span>
                    <p className={styles.label}>{img.alt}</p>
                  </div>
                  <span className={styles.zoomHint} aria-hidden>⊕ View</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {lightboxSrc && (
        <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
      )}
    </>
  );
}
