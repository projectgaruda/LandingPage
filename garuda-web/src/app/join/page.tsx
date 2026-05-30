import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Join the Team",
  description:
    "Apply to Project Garuda — RVCE's super-mileage vehicle team. Open to undergraduates across mechanical, electrical, software, and management disciplines.",
};

const GARUDA_EMAIL = "garuda@rvce.edu.in";
const STUDENT_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfcLz2fS3wVs3ZpbUiVJ2JRbj6_uh1EjeKTUzH3-a-rhuJOHQ/viewform?embedded=true";
const STUDENT_FORM_FALLBACK =
  "https://docs.google.com/forms/d/e/1FAIpQLSfcLz2fS3wVs3ZpbUiVJ2JRbj6_uh1EjeKTUzH3-a-rhuJOHQ/viewform";

const disciplines = [
  {
    num: "01",
    title: "Mechanical",
    desc: "Chassis, suspension, aerodynamics, powertrain, manufacturing, composites.",
  },
  {
    num: "02",
    title: "Electrical",
    desc: "Battery & BMS, motor & drives, embedded systems, data acquisition, harnessing.",
  },
  {
    num: "03",
    title: "Software & Telemetry",
    desc: "Vehicle simulation, live telemetry, lap analysis, driver feedback tools.",
  },
  {
    num: "04",
    title: "Management & Ops",
    desc: "Sponsorship, finance, logistics, social media, event coordination.",
  },
];

const process = [
  {
    step: "01",
    title: "Apply",
    desc: "Fill out the form below. Tell us about you, your branch, and the discipline you want to work in.",
  },
  {
    step: "02",
    title: "Shortlist",
    desc: "We review every application. Shortlisted candidates are contacted within two to three weeks.",
  },
  {
    step: "03",
    title: "Interview & Task",
    desc: "A short conversation with the leads, plus a small technical or operational task relevant to your discipline.",
  },
  {
    step: "04",
    title: "Onboard",
    desc: "Selected members join the workshop, get assigned to a sub-team, and start contributing to the active build.",
  },
];

export default function JoinPage() {
  return (
    <div className={styles.page}>
      {/* ====== HEADER ====== */}
      <section className={styles.pageHeader}>
        <div className={styles.headerMedia} aria-hidden="true">
          <img
            src="/images/core_team_with_car.jpg"
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
              For Students
            </span>
            <h1 className={styles.pageTitle}>
              Build the next <span className={styles.accent}>one.</span>
            </h1>
            <p className={styles.pageDesc}>
              Applications are open year-round, with the main intake at the
              start of each academic year. If you're an undergraduate at RVCE
              who wants to spend a meaningful part of college actually building
              something — this is the page.
            </p>
            <div className={styles.headerBtns}>
              <a href="#apply" className="btn-primary">
                Apply Now
              </a>
              <Link href="/contact" className={styles.headerGhost}>
                Sponsor instead? <span aria-hidden="true">→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ====== DISCIPLINES ====== */}
      <section className={`section ${styles.disciplinesSection}`}>
        <div className="container">
          <Reveal as="div">
            <span className={styles.sectionKicker}>
              <span className={styles.sectionKickerNum}>N° 02</span>
              <span className={styles.sectionKickerDivider} />
              Who We Recruit
            </span>
            <h2 className={styles.sectionTitle}>
              Four disciplines, one car.
            </h2>
            <p className={styles.sectionLead}>
              We recruit across the whole engineering stack — you don't need to
              be from mechanical to join the mechanical team, and we welcome
              first-years.
            </p>
          </Reveal>

          <ol className={styles.principlesList}>
            {disciplines.map((d, i) => (
              <Reveal
                as="li"
                key={d.title}
                className={styles.principle}
                delay={i * 90}
              >
                <span className={styles.principleNum}>{d.num}</span>
                <div className={styles.principleBody}>
                  <h3 className={styles.principleTitle}>{d.title}</h3>
                  <p className={styles.principleDesc}>{d.desc}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ====== PROCESS ====== */}
      <section className={`section ${styles.processSection}`}>
        <div className="container">
          <Reveal as="div">
            <span className={styles.sectionKicker}>
              <span className={styles.sectionKickerNum}>N° 03</span>
              <span className={styles.sectionKickerDivider} />
              The Process
            </span>
            <h2 className={styles.sectionTitle}>From application to workshop.</h2>
          </Reveal>

          <ol className={styles.processList}>
            {process.map((p, i) => (
              <Reveal
                as="li"
                key={p.step}
                className={styles.processItem}
                delay={i * 100}
              >
                <span className={styles.processStep}>{p.step}</span>
                <div className={styles.processBody}>
                  <h3 className={styles.processTitle}>{p.title}</h3>
                  <p className={styles.processDesc}>{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ====== APPLY FORM ====== */}
      <section className={`section ${styles.applySection}`} id="apply">
        <div className="container">
          <div className={styles.applyGrid}>
            <Reveal as="div" className={styles.applyIntro}>
              <span className={styles.sectionKicker}>
                <span className={styles.sectionKickerNum}>N° 04</span>
                <span className={styles.sectionKickerDivider} />
                Application
              </span>
              <h2 className={styles.sectionTitle}>Apply.</h2>
              <p className={styles.applyHelpText}>
                Fill in the form — we'll read it. Replies usually go out within
                two to three weeks during the recruitment window. If you have
                questions before applying, email{" "}
                <a href="mailto:garuda@rvce.edu.in" className={styles.inlineLink}>
                  garuda@rvce.edu.in
                </a>
                .
              </p>
              <p className={styles.applyAside}>
                Not a student looking to join? &nbsp;
                <Link href="/contact" className={styles.inlineLink}>
                  Sponsor or press inquiries →
                </Link>
              </p>
            </Reveal>

            <Reveal as="div" className={styles.applyFormWrap} delay={120}>
              <div className={styles.embedHeader}>
                <span className={styles.embedHeaderLabel}>
                  <span className={styles.embedHeaderDot} />
                  Application Form
                </span>
                <a
                  href={STUDENT_FORM_FALLBACK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.embedHeaderLink}
                >
                  Open in new tab <span aria-hidden="true">↗</span>
                </a>
              </div>

              <div className={styles.embedFrame}>
                <iframe
                  src={STUDENT_FORM_URL}
                  title="GARUDA Student Application"
                  className={styles.embedIframe}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                >
                  Loading the application form…
                </iframe>
              </div>

              <p className={styles.formFootnote}>
                Form hosted on Google Forms. If it doesn't load, you can{" "}
                <a
                  href={STUDENT_FORM_FALLBACK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.inlineLink}
                >
                  open it directly
                </a>{" "}
                or write to{" "}
                <a
                  href={`mailto:${GARUDA_EMAIL}`}
                  className={styles.inlineLink}
                >
                  {GARUDA_EMAIL}
                </a>
                .
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
