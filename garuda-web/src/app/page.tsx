import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";
import HeroSection from "@/components/HeroSection";
import CompetitionsSection from "@/components/CompetitionsSection";

export const metadata: Metadata = {
  title: "GARUDA — Super Mileage Club | RV College of Engineering",
  description:
    "GARUDA is the Super Mileage Club of RV College of Engineering (RVCE), Bengaluru. We design, build, and race ultra-efficient vehicles at Shell Eco-Marathon Asia. RVCE students — apply now and join India's top student engineering team.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* ====== FEATURED BUILD (Server Side) ====== */}
      <section className={`section ${styles.featuredSection}`}>
        <div className="container">
          <div className="section-label">Latest Build</div>
          <h2 className="section-title">
            GARUDA <span>2019</span>
          </h2>

          <div className={styles.featuredGrid}>
            <div className={styles.featuredImg}>
              <img src="/images/side_view_2019.jpg" alt="GARUDA 2019" className={styles.buildImg} />
              <div className={styles.imgOverlay} />
            </div>

            <div className={styles.featuredInfo}>
              <div className={styles.specGrid}>
                {[
                  { label: "Powertrain", val: "Fully Electric" },
                  { label: "Vehicle Mass", val: "≈ 120 kg" },
                  { label: "Chassis", val: "Al + Carbon Fiber" },
                  { label: "Category", val: "UrbanConcept" },
                  { label: "Event", val: "Shell Eco-Marathon Asia" },
                  { label: "Year", val: "2019" },
                ].map((spec) => (
                  <div key={spec.label} className={styles.spec}>
                    <span className={styles.specLabel}>{spec.label}</span>
                    <span className={styles.specVal}>{spec.val}</span>
                  </div>
                ))}
              </div>
              <Link href="/builds" className="btn-primary" style={{ marginTop: "2rem" }}>
                View All Builds →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ====== COMPETITIONS ====== */}
      <CompetitionsSection />

      {/* ====== CTA BANNER (Server Side) ====== */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaGlow} />
        <div className="container">
          <div className={styles.ctaInner}>
            <div>
              <h2 className={styles.ctaTitle}>Ready to engineer the future?</h2>
              <p className={styles.ctaDesc}>Join GARUDA and be part of something extraordinary.</p>
            </div>
            <div className={styles.ctaBtns}>
              <Link href="/contact" className="btn-primary">Get in Touch →</Link>
              <Link href="/team" className="btn-outline">Meet the Team</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
