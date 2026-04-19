import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Previous Builds",
  description:
    "Explore all GARUDA super mileage vehicle builds — FALCON 2023, GARUDA G1, GARUDA VENOM, and more. Each representing the pinnacle of student engineering.",
};

const builds = [
  {
    id: "falcon-2023",
    name: "GARUDA FALCON",
    year: "2023",
    tag: "Latest",
    image: "/images/2.jpg",
    category: "UrbanConcept — IC Engine",
    event: "Shell Eco-Marathon Asia 2023",
    stats: [
      { label: "Mileage", val: "428 km/L" },
      { label: "Vehicle Mass", val: "45 kg" },
      { label: "Top Speed", val: "25 km/h" },
      { label: "Engine", val: "50cc IC" },
    ],
    desc: "Our most aerodynamic build to date. The FALCON features a low-drag monocoque body crafted from carbon fibre composites, redesigned suspension geometry, and an optimized fuel delivery system.",
  },
  {
    id: "venom",
    name: "GARUDA VENOM",
    year: "2022",
    tag: null,
    image: "/images/3.jpg",
    category: "Prototype — IC Engine",
    event: "Shell Eco-Marathon Asia 2022",
    stats: [
      { label: "Mileage", val: "312 km/L" },
      { label: "Vehicle Mass", val: "52 kg" },
      { label: "Top Speed", val: "22 km/h" },
      { label: "Engine", val: "50cc IC" },
    ],
    desc: "VENOM marked our transition to a full prototype category entry. A complete redesign of the drivetrain and wheel bearings reduced friction losses by 40%.",
  },
  {
    id: "g1",
    name: "GARUDA G1",
    year: "2020",
    tag: null,
    image: "/images/4.jpg",
    category: "UrbanConcept — IC Engine",
    event: "Shell Eco-Marathon Asia 2020",
    stats: [
      { label: "Mileage", val: "187 km/L" },
      { label: "Vehicle Mass", val: "68 kg" },
      { label: "Top Speed", val: "20 km/h" },
      { label: "Engine", val: "50cc IC" },
    ],
    desc: "The G1 was our first international competition entry. A foundational vehicle that established GARUDA's design philosophy and our team's engineering culture.",
  },
];

export default function BuildsPage() {
  return (
    <div className={styles.page}>
      {/* Header */}
      <section className={styles.pageHeader}>
        <div className={styles.headerBg} />
        <div className="container">
          <div className="section-label">Our Engineering</div>
          <h1 className={styles.pageTitle}>
            Previous <span className={styles.accent}>Builds</span>
          </h1>
          <p className={styles.pageDesc}>
            Every vehicle represents thousands of hours of design, iteration, and 
            relentless pursuit of efficiency. A legacy built one revolution at a time.
          </p>
        </div>
      </section>

      {/* Builds */}
      <section className="section">
        <div className="container">
          {builds.map((build, i) => (
            <div key={build.id} className={`${styles.buildRow} ${i % 2 === 1 ? styles.buildRowReverse : ""}`}>
              {/* Image */}
              <div className={styles.buildImageWrap}>
                <img src={build.image} alt={build.name} className={styles.buildImage} />
                {build.tag && <div className={styles.buildTag}>{build.tag}</div>}
                <div className={styles.buildOverlay} />
              </div>

              {/* Info */}
              <div className={styles.buildInfo}>
                <div className={styles.buildYear}>{build.year}</div>
                <h2 className={styles.buildName}>{build.name}</h2>
                <div className={styles.buildCategory}>{build.category}</div>
                <p className={styles.buildDesc}>{build.desc}</p>

                <div className={styles.buildEvent}>
                  <span className={styles.eventDot} />
                  {build.event}
                </div>

                <div className={styles.buildStats}>
                  {build.stats.map((s) => (
                    <div key={s.label} className={styles.buildStat}>
                      <span className={styles.statVal}>{s.val}</span>
                      <span className={styles.statLabel}>{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className="container">
          <h3 className={styles.ctaTitle}>Interested in our next build?</h3>
          <h4 className={styles.ctaDesc}>Follow our journey as we push the limits even further.</h4>
          <div className={styles.ctaBtns}>
            <Link href="/contact" className="btn-primary">Get in Touch →</Link>
            <Link href="/gallery" className="btn-outline">View Gallery</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
