import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";
import Reveal from "@/components/Reveal";
import TeamMemberCard, {
  type TeamMember,
} from "@/components/TeamMemberCard";

export const metadata: Metadata = {
  title: "The Team",
  description:
    "The engineers, designers, and operators behind GARUDA's super-mileage vehicles.",
};

/* ============================================================
   MEMBER DATA
   - Drop photos in /public/images/team/{slug}.jpg
   - Set `photo: "/images/team/<slug>.jpg"` to use it (otherwise initials show)
   - Add or remove members from these arrays as needed
============================================================ */

const captain: TeamMember = {
  slug: "abhinandhan",
  name: "Abhinandhan",
  role: "Club Captain · Mechanical",
  contribution:
    "Leads the team across every discipline — from build planning to race day.",
  photo: "/images/team/abhinandhan.jpg",
};

const mechMembers: TeamMember[] = [
  {
    slug: "mech-1",
    name: null,
    role: "Chassis & Structure",
    contribution: "Contribution details to follow.",
    photo: null,
  },
  {
    slug: "mech-2",
    name: null,
    role: "Aerodynamics",
    contribution: "Contribution details to follow.",
    photo: null,
  },
  {
    slug: "mech-3",
    name: null,
    role: "Powertrain & Drivetrain",
    contribution: "Contribution details to follow.",
    photo: null,
  },
  {
    slug: "mech-4",
    name: null,
    role: "Manufacturing & Composites",
    contribution: "Contribution details to follow.",
    photo: null,
  },
];

const eeMembers: TeamMember[] = [
  {
    slug: "ee-1",
    name: null,
    role: "Battery & BMS",
    contribution: "Contribution details to follow.",
    photo: null,
  },
  {
    slug: "ee-2",
    name: null,
    role: "Motor & Drives",
    contribution: "Contribution details to follow.",
    photo: null,
  },
  {
    slug: "ee-3",
    name: null,
    role: "Embedded Systems",
    contribution: "Contribution details to follow.",
    photo: null,
  },
  {
    slug: "ee-4",
    name: null,
    role: "Data Acquisition",
    contribution: "Contribution details to follow.",
    photo: null,
  },
];

const management: TeamMember[] = [
  {
    slug: "club-manager",
    name: null,
    role: "Club Manager",
    contribution: "Contribution details to follow.",
    photo: null,
  },
  {
    slug: "fund-manager",
    name: null,
    role: "Fund Manager",
    contribution: "Contribution details to follow.",
    photo: null,
  },
  {
    slug: "social-media",
    name: null,
    role: "Social Media",
    contribution: "Contribution details to follow.",
    photo: null,
  },
];

export default function TeamPage() {
  return (
    <div className={styles.page}>
      {/* ====== PAGE HEADER ====== */}
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
              The Team
            </span>
            <h1 className={styles.pageTitle}>
              The people <span className={styles.accent}>behind</span> the cars.
            </h1>
            <p className={styles.pageDesc}>
              Every prototype that has carried the GARUDA name was sketched,
              machined, wired, and driven by undergraduates from RV College of
              Engineering. Here is the current crew.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ====== CAPTAIN ====== */}
      <section className={`section ${styles.captainSection}`}>
        <div className="container">
          <Reveal as="div">
            <span className={styles.sectionKicker}>
              <span className={styles.sectionKickerNum}>N° 02</span>
              <span className={styles.sectionKickerDivider} />
              Captain
            </span>
            <h2 className={styles.sectionTitle}>Heading the build.</h2>
          </Reveal>

          <Reveal as="div" className={styles.captainWrap} delay={120}>
            <TeamMemberCard
              member={captain}
              variant="captain"
              highlight
            />
          </Reveal>
        </div>
      </section>

      {/* ====== DISCIPLINES — Mech || Electrical (parity) ====== */}
      <section className={`section ${styles.disciplinesSection}`}>
        <div className="container">
          <Reveal as="div">
            <span className={styles.sectionKicker}>
              <span className={styles.sectionKickerNum}>N° 03</span>
              <span className={styles.sectionKickerDivider} />
              Mechanical &nbsp;∥&nbsp; Electrical
            </span>
            <h2 className={styles.sectionTitle}>The disciplines.</h2>
            <p className={styles.sectionLead}>
              Two halves of every build, working in parallel — and, on a good
              day, in agreement.
            </p>
          </Reveal>

          <div className={styles.rivalGrid}>
            <Reveal as="div" className={styles.rivalColumn} delay={100}>
              <header className={styles.rivalHeader}>
                <span className={styles.rivalLetter}>M</span>
                <div className={styles.rivalLabel}>
                  <span className={styles.rivalName}>Mechanical</span>
                  <span className={styles.rivalCount}>
                    {String(mechMembers.length).padStart(2, "0")} Members
                  </span>
                </div>
              </header>
              <div className={styles.rivalMembers}>
                {mechMembers.map((m) => (
                  <TeamMemberCard key={m.slug} member={m} />
                ))}
              </div>
            </Reveal>

            <div className={styles.rivalDivider} aria-hidden="true">
              <span className={styles.rivalDividerLine} />
              <span className={styles.rivalDividerMark}>vs.</span>
              <span className={styles.rivalDividerLine} />
            </div>

            <Reveal as="div" className={styles.rivalColumn} delay={200}>
              <header className={styles.rivalHeader}>
                <span className={styles.rivalLetter}>E</span>
                <div className={styles.rivalLabel}>
                  <span className={styles.rivalName}>Electrical</span>
                  <span className={styles.rivalCount}>
                    {String(eeMembers.length).padStart(2, "0")} Members
                  </span>
                </div>
              </header>
              <div className={styles.rivalMembers}>
                {eeMembers.map((m) => (
                  <TeamMemberCard key={m.slug} member={m} />
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ====== MANAGEMENT ====== */}
      <section className={`section ${styles.mgmtSection}`}>
        <div className="container">
          <Reveal as="div">
            <span className={styles.sectionKicker}>
              <span className={styles.sectionKickerNum}>N° 04</span>
              <span className={styles.sectionKickerDivider} />
              Operations
            </span>
            <h2 className={styles.sectionTitle}>Management.</h2>
            <p className={styles.sectionLead}>
              The people who make sure the cars actually get to the start line.
            </p>
          </Reveal>

          <div className={styles.mgmtGrid}>
            {management.map((m, i) => (
              <Reveal as="div" key={m.slug} delay={i * 90}>
                <TeamMemberCard member={m} />
              </Reveal>
            ))}
          </div>
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
                We recruit each year.
              </h2>
              <p className={styles.joinDesc}>
                Mechanical, electrical, aerospace, software, design,
                management. If the work above looks like the kind of thing
                you'd lose sleep over, we'd like to hear from you.
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
