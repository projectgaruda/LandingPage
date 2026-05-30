import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";
import HeroSection from "@/components/HeroSection";
import BigTypeSection from "@/components/BigTypeSection";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "GARUDA | Super Mileage Engineering Club",
  description:
    "GARUDA — Engineering Excellence. Uncompromising Performance. We build ultra-efficient super mileage vehicles and compete at international events like Shell Eco-marathon.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* ====== LATEST BUILD ====== */}
      <section className={`section ${styles.featuredSection}`}>
        <div className="container">
          <Reveal as="div">
            <div className="section-label">Latest Build</div>
            <h2 className={styles.featuredTitle}>
              Garuda <span>2025</span>
            </h2>
          </Reveal>

          <div className={styles.featuredGrid}>
            <Reveal as="div" className={styles.featuredImg}>
              <img
                src="/images/builds/garuda_2025.jpeg"
                alt="GAJA"
                className={styles.buildImg}
              />
              <div className={styles.imgOverlay} />
              <span className={styles.featuredStatus}>
                <span className={styles.featuredStatusDot} />
                In Development
              </span>
            </Reveal>

            <Reveal as="div" className={styles.featuredInfo} delay={150}>
              <div className={styles.featuredMeta}>
                <div className={styles.featuredMetaRow}>
                  <span className={styles.featuredMetaLabel}>Programme</span>
                  <span className={styles.featuredMetaVal}>
                    Super-Mileage Vehicle · Battery Electric
                  </span>
                </div>
                <div className={styles.featuredMetaRow}>
                  <span className={styles.featuredMetaLabel}>Year</span>
                  <span className={styles.featuredMetaVal}>2025 — 2026</span>
                </div>
                <div className={styles.featuredMetaRow}>
                  <span className={styles.featuredMetaLabel}>Status</span>
                  <span className={styles.featuredMetaVal}>
                    Active Development
                  </span>
                </div>
              </div>

              <p className={styles.featuredCopy}>
                The current car is in active development across mechanical and
                electrical departments. Full specifications, race classification
                and competition details will be announced ahead of the next
                international event.
              </p>

              <Link
                href="/builds"
                className="btn-primary"
                style={{ marginTop: "0.5rem" }}
              >
                See All Builds →
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ====== BIG-TYPE EDITORIAL MOMENT ====== */}
      <BigTypeSection />

      {/* ====== CTA BANNER ====== */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaGlow} />
        <div className="container">
          <Reveal as="div" className={styles.ctaInner}>
            <div>
              <h2 className={styles.ctaTitle}>Ready to engineer the future?</h2>
              <p className={styles.ctaDesc}>
                Join GARUDA and be part of something extraordinary.
              </p>
            </div>
            <div className={styles.ctaBtns}>
              <Link href="/join" className="btn-primary">
                Join the Team →
              </Link>
              <Link href="/team" className="btn-outline">
                Meet the Team
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
