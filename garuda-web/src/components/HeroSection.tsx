import Link from "next/link";
import styles from "@/app/page.module.css";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";

const stats = [
  { value: 200, suffix: "+", label: "km/L Record" },
  { value: 6, suffix: "+", label: "International Events", pad: 2 },
  { value: 11, suffix: "+", label: "Cars Built" },
  { value: 20, suffix: "", label: "Years on Track" },
];

const principles = [
  {
    num: "01",
    title: "Ultra Efficiency",
    desc: "Vehicles tuned to extract every Watt-hour ",
  },
  {
    num: "02",
    title: "Global Competition (SEM)",
    desc: "Representing INDIA & RVCE  at Shell Eco-marathon ",
  },
  {
    num: "03",
    title: "Research First",
    desc: "Aerodynamics, lightweight composites, and powertrain work as a discipline",
  },
];

export default function HeroSection() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroMedia} aria-hidden="true">
          <img
            src="/images/car_on_track.jpg"
            alt=""
            className={styles.heroPhoto}
          />
          <div className={styles.heroOverlay} />
          <div className={styles.heroVignette} />
          <div className={styles.heroGrain} />
        </div>

        <aside className={styles.heroRail} aria-hidden="true">
          <span className={styles.heroRailLine}>Est. 2006</span>
          <span className={styles.heroRailDot} />
          <span className={styles.heroRailLine}>RVCE · Bengaluru</span>
        </aside>

        <div className={`container ${styles.heroContainer}`}>
          <Reveal as="div" className={styles.heroBody} delay={300}>
            <span className={styles.heroKicker}>
              <span className={styles.heroKickerDot} />
              Project Garuda &nbsp;·&nbsp;Super Mileage Vehicle Team
            </span>

            <h1 className={styles.heroTitle}>
              Engineered
              <br />
              for <span className={styles.heroAccent}>distance</span>.
            </h1>

            <p className={styles.heroLead}>
              A student engineering team at RV College of Engineering,
              building ultra-efficient vehicles for international competition.
              Twenty years of super-mileage prototypes. Pivot to battery-electric since
              2018.
            </p>

            <div className={styles.heroBtns}>
              <Link href="/builds" className="btn-primary">
                See the Builds
              </Link>
              <Link href="/about" className={styles.heroGhostLink}>
                About the Team
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </Reveal>

          <Reveal as="div" className={styles.heroMeta} delay={500}>
            {stats.map((s) => (
              <div key={s.label} className={styles.heroStat}>
                <span className={styles.heroStatVal}>
                  <CountUp end={s.value} pad={s.pad} />
                  {s.suffix}
                </span>
                <span className={styles.heroStatLabel}>{s.label}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ====== ABOUT PREVIEW ====== */}
      <section className={`section ${styles.aboutSection}`}>
        <div className="container">
          <div className={styles.aboutGrid}>
            <Reveal as="div" className={styles.aboutLeft}>
              <span className={styles.aboutKicker}>
                <span className={styles.aboutKickerNum}>N° 02</span>
                <span className={styles.aboutKickerDivider} />
                The Team
              </span>
              <h2 className={styles.aboutTitle}>
                More distance per drop.
              </h2>
              <p className={styles.aboutText}>
                GARUDA is a multidisciplinary student engineering club at RV
                College of Engineering. From concept sketches to competition
                grids, we design and build super-mileage vehicles that question
                the limits of automotive efficiency.
              </p>
              <p className={styles.aboutText}>
                Two decades of prototypes, eleven cars, and a long run at Shell
                Eco-marathon Asia — IC-engined through 2016, fully electric
                since 2018. Built by undergraduates, one batch at a time.
              </p>
              <Link href="/about" className={styles.aboutLink}>
                Read our story
                <span aria-hidden="true">→</span>
              </Link>
            </Reveal>

            <Reveal as="ol" className={styles.principlesList} delay={150}>
              {principles.map((p) => (
                <li key={p.title} className={styles.principle}>
                  <span className={styles.principleNum}>{p.num}</span>
                  <div className={styles.principleBody}>
                    <h3 className={styles.principleTitle}>{p.title}</h3>
                    <p className={styles.principleDesc}>{p.desc}</p>
                  </div>
                </li>
              ))}
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
