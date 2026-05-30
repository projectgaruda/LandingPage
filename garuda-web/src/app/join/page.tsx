import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Join the Team",
  description:
    "Apply to Project Garuda — RVCE's super-mileage vehicle team. Open to undergraduates across mechanical, electrical, software, and management disciplines.",
};

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
            <h2 className={styles.sectionTitle}>From application to garage.</h2>
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
              <form className={`card ${styles.form}`}>
                <div className={styles.formRow}>
                  <div className="form-group" style={{ flex: 1 }}>
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div className="form-group" style={{ flex: 1 }}>
                    <label className="form-label">RVCE Email</label>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="name.branchYY@rvce.edu.in"
                      required
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className="form-group" style={{ flex: 1 }}>
                    <label className="form-label">Branch</label>
                    <select className="form-input" required defaultValue="">
                      <option value="" disabled>Select your branch</option>
                      <option value="ME">Mechanical (ME)</option>
                      <option value="EEE">Electrical & Electronics (EEE)</option>
                      <option value="ECE">Electronics & Communication (ECE)</option>
                      <option value="CSE">Computer Science (CSE)</option>
                      <option value="ISE">Information Science (ISE)</option>
                      <option value="AS">Aerospace (AS)</option>
                      <option value="IEM">Industrial Engineering (IEM)</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="form-group" style={{ flex: 1 }}>
                    <label className="form-label">Year of Study</label>
                    <select className="form-input" required defaultValue="">
                      <option value="" disabled>Select year</option>
                      <option value="1">1st Year</option>
                      <option value="2">2nd Year</option>
                      <option value="3">3rd Year</option>
                      <option value="4">4th Year</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Discipline of Interest</label>
                  <select className="form-input" required defaultValue="">
                    <option value="" disabled>What do you want to work on?</option>
                    <option value="mechanical">Mechanical</option>
                    <option value="electrical">Electrical</option>
                    <option value="software">Software & Telemetry</option>
                    <option value="management">Management & Operations</option>
                    <option value="unsure">Unsure — open to suggestions</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Why do you want to join?</label>
                  <textarea
                    className="form-input"
                    rows={5}
                    placeholder="Tell us briefly — projects you've worked on, what excites you about super-mileage vehicles, what you'd like to contribute."
                    required
                  ></textarea>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Portfolio / GitHub / LinkedIn{" "}
                    <span className={styles.optional}>(optional)</span>
                  </label>
                  <input
                    type="url"
                    className="form-input"
                    placeholder="https://"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  Submit Application →
                </button>

                <p className={styles.formFootnote}>
                  We'll be in touch within two to three weeks during the
                  recruitment window. Outside the window, we keep applications
                  on file for the next intake.
                </p>
              </form>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
