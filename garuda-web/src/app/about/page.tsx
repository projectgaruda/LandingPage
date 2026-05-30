import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about GARUDA — our mission, history, achievements, and the engineering excellence that drives us to compete on the international stage.",
};

const milestones = [
  {
    year: "2006",
    title: "Foundation",
    desc: "RVCE establishes India's first student-driven super-mileage team, setting the stage for two decades of ultra-efficient vehicle research.",
  },
  {
    year: "2008",
    title: "Debut Prototype — Black Coffin",
    desc: "The team unveils its first petrol-run prototype. Achieves a historic mileage of 200 km/L and wins the Rotaract Young Achiever's Award.",
  },
  {
    year: "2009",
    title: "International Debut — SEM UK",
    desc: "First Asian team to participate with two vehicles at Shell Eco-marathon UK. Awarded the 'Perseverance in the Face of Adversity' prize.",
  },
  {
    year: "2012",
    title: "First Electric Prototype",
    desc: "Competes in SEM with an Electric Prototype alongside the IC programme. Placed 14th globally — the only Indian team to finish and first to clock mileage.",
  },
  {
    year: "2015",
    title: "International Endurance",
    desc: "Only Indian team to clear the International Endurance Test. Secures 7th place out of 40 international teams with Phoenix, the first Urban Concept.",
  },
  {
    year: "2018",
    title: "Electric Era Begins — Vajra",
    desc: "The team transitions fully from internal combustion to battery-electric vehicles. Vajra debuts as a UrbanConcept BEV with an aluminium chassis and carbon-fibre superstructure.",
    pivot: true,
  },
  {
    year: "2019",
    title: "Mjolnir at SEM Asia",
    desc: "Built on Vajra's electric foundation, Mjolnir refines powertrain efficiency and reduces vehicle mass. Competes at Shell Eco-marathon Asia, Sepang.",
  },
  {
    year: "2024 — 2026",
    title: "Research Forward",
    desc: "Active R&D in efficient electric drives, battery management, and lightweight composites for upcoming international competitions.",
  },
];

const principles = [
  {
    num: "01",
    title: "Precision Engineering",
    desc: "Every component is designed, simulated, and tested before fabrication. Nothing is left to chance.",
  },
  {
    num: "02",
    title: "Collaborative Culture",
    desc: "Mechanical, electrical, aero, software, and management — multidisciplinary teams working in lockstep.",
  },
  {
    num: "03",
    title: "Sustainability First",
    desc: "Ultra-efficient vehicles are the future. We pioneer technologies that reduce energy footprint at every layer.",
  },
  {
    num: "04",
    title: "Competition Excellence",
    desc: "We compete to win, but also to prove that undergraduate engineers can build cars that matter.",
  },
];

export default function AboutPage() {
  return (
    <div className={styles.page}>
      {/* ====== PAGE HEADER ====== */}
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
              About the Team
            </span>
            <h1 className={styles.pageTitle}>
              Two decades of <span className={styles.accent}>efficiency.</span>
            </h1>
            <p className={styles.pageDesc}>
              From a college workshop to Sepang International Circuit — a
              student team rebuilt across eighteen batches, eleven prototypes,
              and one stubborn idea: that a litre of fuel — and now a kilowatt
              of charge — can go further than anyone thinks.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ====== MISSION ====== */}
      <section className={`section ${styles.missionSection}`}>
        <div className="container">
          <div className={styles.missionGrid}>
            <Reveal as="div" className={styles.missionLeft}>
              <span className={styles.sectionKicker}>
                <span className={styles.sectionKickerNum}>N° 02</span>
                <span className={styles.sectionKickerDivider} />
                Mission
              </span>
              <h2 className={styles.sectionTitle}>
                Why we build.
              </h2>
              <p className={styles.bodyText}>
                GARUDA exists to bridge the gap between theoretical engineering
                and real-world impact. Super-mileage vehicles are the ultimate
                discipline test — extracting maximum range from minimum input —
                and getting it right demands mastery across every engineering
                department at once.
              </p>
              <p className={styles.bodyText}>
                Affiliated with RVCE, Bengaluru, the team has represented India
                at Shell Eco-marathon Asia for over a decade. The current era is
                fully battery-electric, focused on light, efficient Urban
                Concept vehicles.
              </p>
            </Reveal>

            <Reveal as="div" className={styles.missionRight} delay={150}>
              <div className={`${styles.missionImage} ${styles.clipReveal}`}>
                <img
                  src="/images/core_team_with_car.jpg"
                  alt="GARUDA team with their build"
                  className={styles.aboutImg}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ====== PRINCIPLES ====== */}
      <section className={`section ${styles.principlesSection}`}>
        <div className="container">
          <Reveal as="div">
            <span className={styles.sectionKicker}>
              <span className={styles.sectionKickerNum}>N° 03</span>
              <span className={styles.sectionKickerDivider} />
              What Drives Us
            </span>
            <h2 className={styles.sectionTitle}>Principles.</h2>
          </Reveal>

          <ol className={styles.principlesList}>
            {principles.map((p, i) => (
              <Reveal
                as="li"
                key={p.title}
                className={styles.principle}
                delay={i * 90}
              >
                <span className={styles.principleNum}>{p.num}</span>
                <div className={styles.principleBody}>
                  <h3 className={styles.principleTitle}>{p.title}</h3>
                  <p className={styles.principleDesc}>{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ====== TIMELINE ====== */}
      <section className={`section ${styles.timelineSection}`}>
        <div className="container">
          <Reveal as="div">
            <span className={styles.sectionKicker}>
              <span className={styles.sectionKickerNum}>N° 04</span>
              <span className={styles.sectionKickerDivider} />
              The Record
            </span>
            <h2 className={styles.sectionTitle}>Twenty years, in moments.</h2>
          </Reveal>

          <ol className={styles.timeline}>
            <span className={styles.timelineSpine} aria-hidden="true" />
            {milestones.map((m, i) => (
              <Reveal
                as="li"
                key={m.year}
                className={`${styles.tlItem} ${i % 2 === 0 ? styles.tlLeft : styles.tlRight} ${m.pivot ? styles.tlPivot : ""}`}
              >
                <span className={styles.tlDot} aria-hidden="true" />
                <div className={styles.tlContent}>
                  <span className={styles.tlYear}>{m.year}</span>
                  <h3 className={styles.tlTitle}>{m.title}</h3>
                  <p className={styles.tlDesc}>{m.desc}</p>
                  {m.pivot && (
                    <span className={styles.tlPivotTag}>EV Transition</span>
                  )}
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ====== JOIN CTA ====== */}
      <section className={styles.joinSection}>
        <div className="container">
          <Reveal as="div" className={styles.joinInner}>
            <div>
              <span className={styles.sectionKicker}>
                <span className={styles.sectionKickerNum}>N° 05</span>
                <span className={styles.sectionKickerDivider} />
                Apply
              </span>
              <h2 className={styles.joinTitle}>
                Build the next one with us.
              </h2>
              <p className={styles.joinDesc}>
                We recruit each year from across RVCE — mechanical, electrical,
                aerospace, software, and management. If the work above looks
                like the kind of thing you'd lose sleep over, we'd like to hear
                from you.
              </p>
            </div>
            <div className={styles.joinBtns}>
              <Link href="/join" className="btn-primary">
                Join the Team
              </Link>
              <Link href="/builds" className={styles.joinGhost}>
                See the Builds <span aria-hidden="true">→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
