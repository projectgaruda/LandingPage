import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Gallery",
  description: "A visual journey through GARUDA's engineering projects, competition moments, and team highlights.",
};

const images = [
  { src: "/images/gallery/1.jpg", alt: "Garuda Prototype Front View", category: "Builds" },
  { src: "/images/gallery/2.jpg", alt: "Prototype Chassis Assembly", category: "Fabrication" },
  { src: "/images/gallery/2. batch 2025-2026.jpg", alt: "Garuda Team Batch 2025-2026", category: "Team" },
  { src: "/images/gallery/3.jpg", alt: "Aerodynamic Shell Prep", category: "Fabrication" },
  { src: "/images/gallery/Young-achivers-1 (3).png", alt: "Team with the Young Achiever Trophy", category: "Awards" },
  { src: "/images/gallery/4.jpg", alt: "Testing Phase - Track Run", category: "Testing" },
  { src: "/images/gallery/Young-achivers-1 (2).png", alt: "Award Presentation Ceremony", category: "Awards" },
  { src: "/images/gallery/5.jpg", alt: "Prototype Interior Layout", category: "Builds" },
  { src: "/images/gallery/6. head light.jpeg", alt: "Custom Headlight Design", category: "Technical" },
  { src: "/images/gallery/6.jpg", alt: "Engine & Drivetrain Integration", category: "Technical" },
  { src: "/images/gallery/7.jpg", alt: "Team working on Carbon Fiber Shell", category: "Fabrication" },
  { src: "/images/gallery/8.jpg", alt: "Race Day Prep (SHELL)", category: "Events" },
  { src: "/images/gallery/9.jpg", alt: "Aero Optimization Results", category: "Design" },
  { src: "/images/gallery/IMG-20240209-WA0009.jpg", alt: "National Championship Achievement", category: "Events" },
  { src: "/images/gallery/IMG-20240606-WA0008.jpg", alt: "International Track Inspection", category: "Events" },
  { src: "/images/gallery/image.png", alt: "2025 - Prototype", category: "Builds" },
  //{ src: "/images/gallery/IMG_20251108_154849537.jpg", alt: "Advanced EV Drive Research", category: "Research" },
  { src: "/images/gallery/Young-achivers-1 (1).png", alt: "Young Achiever Award 2008", category: "Awards" },
];

export default function GalleryPage() {
  return (
    <div className={styles.page}>
      <section className={styles.pageHeader}>
        <div className={styles.headerBg} />
        <div className="container">
          <div className="section-label">Moments in Motion</div>
          <h1 className={styles.pageTitle}>
            Engineering <span className={styles.accent}>Gallery</span>
          </h1>
          <p className={styles.pageDesc}>
            Explore our visual archive of vehicle prototypes, fabrication processes,
            and highlights from international racing events.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.galleryGrid}>
            {images.map((img, index) => (
              <div key={index} className={styles.galleryItem}>
                <div className={styles.imageWrap}>
                  <img src={img.src} alt={img.alt} className={styles.image} />
                  <div className={styles.overlay}>
                    <span className={styles.category}>{img.category}</span>
                    <p className={styles.label}>{img.alt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
