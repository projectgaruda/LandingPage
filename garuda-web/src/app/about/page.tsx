import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about GARUDA — our mission, history, achievements, and the engineering excellence that drives us to compete on the international stage.",
};

const milestones = [
  { 
    year: "2006", 
    title: "Foundation", 
    desc: "RVCE establishes India’s first student-driven super mileage team, setting the stage for a legacy of ultra-efficient vehicle research." 
  },
  { 
    year: "2008", 
    title: "Debut Prototype: 'Black Coffin'", 
    desc: "The team unveils its first petrol-run prototype. Achieved a historic mileage of 200 kmpl and won the Rotaract Young Achiever’s Award." 
  },
  { 
    year: "2009", 
    title: "International Entry (SEM UK)", 
    desc: "First Asian team to participate with two vehicles at Shell Eco-Marathon UK. Awarded the 'Perseverance in the Face of Adversity' prize." 
  },
  { 
    year: "2012", 
    title: "Historic Electric Milestone", 
    desc: "Competed in SEM with an Electric Prototype. Placed 14th globally, becoming the only Indian team to finish and first to clock mileage." 
  },
  { 
    year: "2015", 
    title: "International Endurance", 
    desc: "Only Indian team to clear the International Endurance Test. Secured 7th place out of 40 international teams." 
  },
  { 
    year: "2017", 
    title: "Urban Concept Shift", 
    desc: "Transitions to Battery Electric Urban Concept category, successfully passing all static and dynamic tests for this complex class." 
  },
  { 
    year: "2019", 
    title: "Technical Excellence (SEMA)", 
    desc: "Participated in SEMA Asia at Sepang International Circuit, Malaysia, clearing all rigorous technical and safety checks." 
  },
  { 
    year: "2024–2026", 
    title: "Future & Innovation", 
    desc: "Active research hub for EV design, focusing on efficient electric drives and advanced battery technology for upcoming competitions." 
  },
];

const values = [
  { icon: "🎯", title: "Precision Engineering", desc: "Every component is designed, simulated, and tested before fabrication. We leave nothing to chance." },
  { icon: "🤝", title: "Collaborative Culture", desc: "Multidisciplinary teams working together — mechanical, electrical, aero, software, and management." },
  { icon: "🌱", title: "Sustainability First", desc: "Ultra-efficient vehicles are the future. We pioneer technologies that reduce fossil fuel dependence." },
  { icon: "🏆", title: "Competition Excellence", desc: "We compete to win, but more importantly, to prove that student engineers can change the world." },
];

export default function AboutPage() {
  return (
    <div className={styles.page}>
      {/* Header */}
      <section className={styles.pageHeader}>
        <div className={styles.headerBg} />
        <div className="container">
          <div className="section-label">Our Story</div>
          <h1 className={styles.pageTitle}>
            About <span className={styles.accent}>GARUDA</span>
          </h1>
          <p className={styles.pageDesc}>
            We are a team of passionate engineers on a mission to redefine what's 
            possible in fuel efficiency. From a college workshop to the world stage.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="section">
        <div className="container">
          <div className={styles.missionGrid}>
            <div className={styles.missionLeft}>
              <div className="section-label">Mission</div>
              <h2 className="section-title">
                Why We <span>Build</span>
              </h2>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: "1rem" }}>
                GARUDA exists to bridge the gap between theoretical engineering and real-world 
                impact. Super mileage vehicles represent the ultimate challenge — maximum efficiency 
                from minimum fuel — and solving this problem requires mastery across every 
                engineering discipline.
              </p>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.8 }}>
                We are affiliated with RVCE, Bengaluru, and have represented India at 
                Shell Eco-Marathon Asia multiple times, building a legacy of excellence 
                and innovation that continues to grow each year.
              </p>
            </div>
            <div className={styles.missionRight}>
              <div className={styles.missionImage}>
                <img src="/images/5.jpg" alt="GARUDA team at work" className={styles.aboutImg} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section" style={{ background: "var(--bg-surface)", padding: "5rem 0" }}>
        <div className="container">
          <div className="section-label">What Drives Us</div>
          <h2 className="section-title">Our <span>Values</span></h2>
          <div className={styles.valuesGrid}>
            {values.map((v) => (
              <div key={v.title} className={`card ${styles.valueCard}`}>
                <span className={styles.valueIcon}>{v.icon}</span>
                <h3 className={styles.valueTitle}>{v.title}</h3>
                <p className={styles.valueDesc}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section">
        <div className="container">
          <div className="section-label">Our Journey</div>
          <h2 className="section-title">Key <span>Milestones</span></h2>
          <div className={styles.timeline}>
            {milestones.map((m, i) => (
              <div key={m.year} className={`${styles.timelineItem} ${i % 2 === 0 ? styles.timelineLeft : styles.timelineRight}`}>
                <div className={styles.timelineCard}>
                  <div className={styles.timelineYear}>{m.year}</div>
                  <h3 className={styles.timelineTitle}>{m.title}</h3>
                  <p className={styles.timelineDesc}>{m.desc}</p>
                </div>
                <div className={styles.timelineDot} />
              </div>
            ))}
            <div className={styles.timelineLine} />
          </div>
        </div>
      </section>
    </div>
  );
}
