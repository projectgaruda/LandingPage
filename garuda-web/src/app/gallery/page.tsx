import type { Metadata } from "next";
import styles from "./page.module.css";
import Reveal from "@/components/Reveal";
import GalleryGrid, { type GalleryImage } from "@/components/GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Two decades of GARUDA — prototypes, workshop hours, race days, awards, and the crews that built it all.",
};

const images: GalleryImage[] = [
  { src: "/images/gallery/1.jpg", alt: "Garuda Prototype Front View", category: "Builds" },
  { src: "/images/gallery/2.jpg", alt: "Prototype Chassis Assembly", category: "Workshop" },
  { src: "/images/gallery/2. batch 2025-2026.jpg", alt: "Garuda Team Batch 2025 — 2026", category: "Team" },
  { src: "/images/gallery/3.jpg", alt: "Aerodynamic Shell Prep", category: "Workshop" },
  { src: "/images/gallery/Young-achivers-1 (3).png", alt: "Team with the Young Achiever Trophy", category: "Awards" },
  { src: "/images/gallery/4.jpg", alt: "Testing Phase — Track Run", category: "Events" },
  { src: "/images/gallery/Young-achivers-1 (2).png", alt: "Award Presentation Ceremony", category: "Awards" },
  { src: "/images/gallery/6.jpg", alt: "Engine & Drivetrain Integration", category: "Workshop" },
  { src: "/images/gallery/7.jpg", alt: "Carbon Fibre Shell Layup", category: "Workshop" },
  { src: "/images/gallery/8.jpg", alt: "Race Day Prep — Shell Eco-marathon", category: "Events" },
  { src: "/images/gallery/9.jpg", alt: "Aero Optimization Results", category: "Builds" },
  { src: "/images/gallery/IMG-20240209-WA0009.jpg", alt: "National Championship Achievement", category: "Events" },
  { src: "/images/gallery/IMG-20240606-WA0008.jpg", alt: "International Track Inspection", category: "Events" },
  { src: "/images/gallery/image.png", alt: "2025 Prototype", category: "Builds" },
  // { src: "/images/gallery/IMG_20251108_154849537.jpg", alt: "Advanced EV Drive Research", category: "Research" },
  { src: "/images/gallery/Young-achivers-1 (1).png", alt: "Young Achiever Award 2008", category: "Awards" },
];

export default function GalleryPage() {
  return (
    <div className={styles.page}>
      {/* ====== HEADER ====== */}
      <section className={styles.pageHeader}>
        <div className={styles.headerMedia} aria-hidden="true">
          <img
            src="/images/2019_Shell_ecoMarathon_team_with_car.jpg"
            alt=""
            className={styles.headerPhoto}
          />
          <div className={styles.headerOverlay} />
          <div className={styles.headerGrain} />
        </div>

        <div className={`container ${styles.headerContainer}`}>
          <Reveal as="div" className={styles.headerBody}>
            <span className={styles.headerKicker}>
              <span className={styles.headerKickerNum}>N° 01</span>
              <span className={styles.headerKickerDivider} />
              The Archive
            </span>
            <h1 className={styles.pageTitle}>
              Two decades, <span className={styles.accent}>frame by frame</span>.
            </h1>
            <p className={styles.pageDesc}>
              Prototypes from the workshop floor, race-day photos from
              international circuits, award nights, and the rotating crews of
              undergraduates that have carried the team since 2006. Click any
              photo to enlarge.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ====== GALLERY ====== */}
      <section className={`section ${styles.gallerySection}`}>
        <div className="container">
          <Reveal as="div">
            <span className={styles.sectionKicker}>
              <span className={styles.sectionKickerNum}>N° 02</span>
              <span className={styles.sectionKickerDivider} />
              {String(images.length).padStart(3, "0")} Photographs
            </span>
            <h2 className={styles.sectionTitle}>Browse the archive.</h2>
          </Reveal>

          <GalleryGrid images={images} />
        </div>
      </section>
    </div>
  );
}
