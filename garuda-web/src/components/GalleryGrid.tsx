"use client";

import { useMemo, useState } from "react";
import Lightbox from "@/components/Lightbox";
import Reveal from "@/components/Reveal";
import styles from "./GalleryGrid.module.css";

export type GalleryImage = {
  src: string;
  alt: string;
  category: string;
};

type Props = {
  images: GalleryImage[];
};

export default function GalleryGrid({ images }: Props) {
  const [active, setActive] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("All");

  const categories = useMemo(() => {
    const set = new Set<string>();
    images.forEach((img) => set.add(img.category));
    return ["All", ...Array.from(set)];
  }, [images]);

  const filtered = useMemo(
    () =>
      filter === "All"
        ? images
        : images.filter((img) => img.category === filter),
    [filter, images],
  );

  return (
    <>
      {/* ----- Filter pills ----- */}
      <div className={styles.filters} role="tablist" aria-label="Filter by category">
        {categories.map((cat) => {
          const isActive = filter === cat;
          const count =
            cat === "All"
              ? images.length
              : images.filter((i) => i.category === cat).length;
          return (
            <button
              type="button"
              key={cat}
              role="tab"
              aria-selected={isActive}
              className={`${styles.filterPill} ${isActive ? styles.filterPillActive : ""}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
              <span className={styles.filterCount}>
                {String(count).padStart(2, "0")}
              </span>
            </button>
          );
        })}
      </div>

      {/* ----- Masonry grid ----- */}
      <div className={styles.grid}>
        {filtered.map((img, i) => (
          <Reveal
            as="figure"
            key={img.src}
            className={styles.item}
            delay={(i % 6) * 70}
          >
            <button
              type="button"
              className={styles.tile}
              onClick={() => setActive(img.src)}
              aria-label={`Open ${img.alt}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className={styles.image}
                loading="lazy"
              />
              <span className={styles.overlay} aria-hidden="true">
                <span className={styles.overlayCategory}>{img.category}</span>
                <span className={styles.overlayLabel}>{img.alt}</span>
              </span>
              <span className={styles.zoomMark} aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h6v6" />
                  <path d="M14 10l7-7" />
                  <path d="M9 21H3v-6" />
                  <path d="M10 14l-7 7" />
                </svg>
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className={styles.empty}>No photos in this category yet.</p>
      )}

      {active && <Lightbox src={active} onClose={() => setActive(null)} />}
    </>
  );
}
