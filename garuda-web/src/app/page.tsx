import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";
import HeroSection from "@/components/HeroSection";

export const metadata: Metadata = {
  title: "ProjectGaruda RVCE",
  description:
    "GARUDA — Engineering Excellence. Uncompromising Performance. We build ultra-efficient super mileage vehicles and compete at international events like Shell Eco-marathon.",
};

// ─── data ─────────────────────────────────────────────────────────────────
const ACHIEVEMENTS = [
  "Shell Eco-Marathon Asia",
  "Top 10 · UrbanConcept ICE",
  "120+ km/kWh Efficiency",
  "8+ Years of Engineering",
  "40+ Member Team",
  "Best Technical Innovation · 2022",
];

const SPEC_LIST = [
  { label: "Top Speed", val: "235 mph equivalent" },
  { label: "Vehicle Mass", val: "≈ 45 kg" },
  { label: "Engine Type", val: "Internal Combustion" },
  { label: "Category", val: "UrbanConcept" },
  { label: "Event", val: "Shell Eco-Marathon Asia" },
  { label: "Year", val: "2023" },
];

const SPONSORS_PRINCIPAL = ["MIT MANIPAL", "SHELL", "ALTAIR", "SIEMENS"];
const SPONSORS_GOLD = ["ANSYS", "DASSAULT", "BOSCH", "TATA", "MAHLE", "BRIDGESTONE"];
const SPONSORS_SILVER = [
  "3M", "HENKEL", "SKF", "MICHELIN", "LAPP", "MOTUL", "NTN", "KEYENCE",
];

// ─── page ─────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* ====== ACHIEVEMENT MARQUEE ====== */}
      <section className={styles.marquee} aria-label="Achievements">
        <div className={styles.marqueeTrack}>
          {[...ACHIEVEMENTS, ...ACHIEVEMENTS, ...ACHIEVEMENTS].map((item, i) => (
            <span key={i} className={styles.marqueeItem}>
              <span className={styles.marqueeText}>{item}</span>
              <span className={styles.marqueeDot} aria-hidden>◆</span>
            </span>
          ))}
        </div>
        <div className={styles.marqueeFadeL} aria-hidden />
        <div className={styles.marqueeFadeR} aria-hidden />
      </section>

      {/* ====== FEATURED BUILD ====== */}
      <section className={`section ${styles.featuredSection}`}>
        <div className="container">
          <div className="section-label">Latest Build</div>
          <h2 className="section-title">
            GARUDA <span>FALCON 2023</span>
          </h2>

          <div className={styles.featuredGrid}>
            <div className={styles.featuredImg}>
              <img
                src="/images/1.jpg"
                alt="GARUDA FALCON 2023"
                className={styles.buildImg}
              />
              <div className={styles.imgOverlay} />
              <div className={styles.imgCorner} aria-hidden>
                <span>F · 2023</span>
              </div>
            </div>

            <div className={styles.featuredInfo}>
              <div className={styles.specGrid}>
                {SPEC_LIST.map((spec) => (
                  <div key={spec.label} className={styles.spec}>
                    <span className={styles.specLabel}>{spec.label}</span>
                    <span className={styles.specVal}>{spec.val}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/builds"
                className="btn-primary"
                style={{ marginTop: "2rem" }}
              >
                View All Builds →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ====== DUAL MANIFESTO CARDS ====== */}
      <section className={styles.manifesto}>
        <div className="container">
          <div className={styles.manifestoGrid}>
            <Link href="/recruitment" className={styles.manifestoCard}>
              <div className={styles.manifestoTag}>01 — JOIN</div>
              <h3 className={styles.manifestoTitle}>
                Build the next <em>machine.</em>
              </h3>
              <p className={styles.manifestoDesc}>
                Chassis, aero, powertrain, electronics, business — every discipline
                matters. Push your limits with a team that ships.
              </p>
              <span className={styles.manifestoCta}>
                Join the Team <span aria-hidden>→</span>
              </span>
            </Link>

            <Link href="/sponsors" className={styles.manifestoCard}>
              <div className={styles.manifestoTag}>02 — PARTNER</div>
              <h3 className={styles.manifestoTitle}>
                Partner with <em>performance.</em>
              </h3>
              <p className={styles.manifestoDesc}>
                Back a team pushing the frontier of fuel efficiency. Align your
                brand with engineering that competes on the world stage.
              </p>
              <span className={styles.manifestoCta}>
                Partner with Us <span aria-hidden>→</span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ====== SPONSORS ====== */}
      <section className={styles.sponsors}>
        <div className="container">
          <div className="section-label">Partners</div>
          <h2 className="section-title">
            Powered by <span>Belief.</span>
          </h2>
          <p className={styles.sponsorsLede}>
            Industry leaders enabling our engineering, manufacturing, and
            competition.
          </p>

          <div className={styles.tier}>
            <div className={styles.tierLabel}>Principal Sponsors</div>
            <div className={styles.tierGridLarge}>
              {SPONSORS_PRINCIPAL.map((s) => (
                <div key={s} className={styles.sponsorCell}>
                  <span className={styles.sponsorMark}>{s}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.tier}>
            <div className={styles.tierLabel}>Gold Sponsors</div>
            <div className={styles.tierGridMed}>
              {SPONSORS_GOLD.map((s) => (
                <div key={s} className={styles.sponsorCell}>
                  <span className={styles.sponsorMark}>{s}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.tier}>
            <div className={styles.tierLabel}>Silver Sponsors</div>
            <div className={styles.tierGridSmall}>
              {SPONSORS_SILVER.map((s) => (
                <div key={s} className={styles.sponsorCell}>
                  <span className={styles.sponsorMark}>{s}</span>
                </div>
              ))}
            </div>
          </div>

          <Link href="/sponsors" className={styles.sponsorsLink}>
            View all partners →
          </Link>
        </div>
      </section>

      {/* ====== ABOUT SHELL ECO-MARATHON ====== */}
      <section className={styles.aboutSem}>
        <div className="container">
          <div className={styles.aboutGrid}>
            <div className={styles.aboutLabel}>
              <div className={styles.aboutLabelText}>THE COMPETITION</div>
              <div className={styles.aboutLabelBar} />
            </div>
            <div className={styles.aboutBody}>
              <h3 className={styles.aboutTitle}>
                Shell <em>Eco-marathon.</em>
              </h3>
              <p className={styles.aboutDesc}>
                Shell Eco-marathon challenges student teams from around the world
                to design, build, and drive the most energy-efficient vehicle
                possible. Teams spend months in the workshop refining chassis,
                powertrain, and aerodynamics — then compete head-to-head on a
                closed circuit to see who can travel the furthest on the least
                fuel. It's where engineering discipline meets obsessive
                optimization.
              </p>
              <a
                href="https://www.shellecomarathon.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.aboutLink}
              >
                Learn more →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ====== FINAL CTA ====== */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaGlow} />
        <div className="container">
          <div className={styles.ctaInner}>
            <div>
              <h2 className={styles.ctaTitle}>
                Ready to engineer the <em>future?</em>
              </h2>
              <p className={styles.ctaDesc}>
                Join GARUDA and be part of something extraordinary.
              </p>
            </div>
            <div className={styles.ctaBtns}>
              <Link href="/contact" className="btn-primary">
                Get in Touch →
              </Link>
              <Link href="/team" className="btn-outline">
                Meet the Team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
