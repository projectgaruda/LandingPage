"use client";

import { useCallback, useEffect, useState } from "react";
import styles from "./ImageCarousel.module.css";

interface ImageCarouselProps {
  images: string[];
  alt: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export default function ImageCarousel({
  images,
  alt,
  autoPlay = true,
  autoPlayInterval = 4500,
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    goNext();
  };

  useEffect(() => {
    if (!autoPlay || paused || images.length <= 1) return;
    const id = window.setInterval(goNext, autoPlayInterval);
    return () => window.clearInterval(id);
  }, [autoPlay, autoPlayInterval, paused, images.length, goNext]);

  if (!images || images.length === 0) return null;

  if (images.length === 1) {
    return (
      <div
        className={styles.carouselContainer}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className={styles.slide}>
          <img src={images[0]} alt={alt} className={styles.carouselImage} />
        </div>
      </div>
    );
  }

  return (
    <div
      className={styles.carouselContainer}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className={styles.slidesWrapper}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, i) => (
          <div key={i} className={styles.slide}>
            <img
              src={img}
              alt={`${alt} - View ${i + 1}`}
              className={styles.carouselImage}
            />
          </div>
        ))}
      </div>

      <button
        onClick={handlePrev}
        className={`${styles.navButton} ${styles.prevButton}`}
        aria-label="Previous image"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>
      <button
        onClick={handleNext}
        className={`${styles.navButton} ${styles.nextButton}`}
        aria-label="Next image"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>

      <div className={styles.dots}>
        {images.map((_, i) => (
          <button
            key={i}
            onClick={(e) => {
              e.preventDefault();
              setCurrentIndex(i);
            }}
            className={`${styles.dot} ${i === currentIndex ? styles.activeDot : ""}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
