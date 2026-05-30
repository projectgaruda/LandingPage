import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach Project Garuda — sponsorship, recruitment, press, or anything in between.",
};

const GARUDA_EMAIL = "garuda@rvce.edu.in";
const MAP_URL = "https://www.google.com/maps?q=12.923242,77.497903";

export default function ContactPage() {
  return (
    <div className={styles.page}>
      {/* ====== HEADER ====== */}
      <section className={styles.pageHeader}>
        <div className={styles.headerMedia} aria-hidden="true">
          <img
            src="/images/banner_pic.jpg"
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
              Contact
            </span>
            <h1 className={styles.pageTitle}>
              Where do you <span className={styles.accent}>start</span>?
            </h1>
            <p className={styles.pageDesc}>
              Different reasons, different routes. Pick the one that fits — or
              write to us directly.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ====== ROUTING CARDS ====== */}
      <section className={`section ${styles.routesSection}`}>
        <div className="container">
          <div className={styles.routesGrid}>
            <Reveal as="div" className={`${styles.routeCard} ${styles.routeCardPrimary}`}>
              <span className={styles.routeKicker}>
                <span className={styles.routeKickerNum}>01</span>
                <span className={styles.routeKickerDivider} />
                Sponsors &amp; Partners
              </span>
              <h2 className={styles.routeTitle}>
                Back the build.
              </h2>
              <p className={styles.routeDesc}>
                A premium sponsorship deck, tier breakdown, and a dedicated
                inquiry form lives on the sponsors page. Most efficient route
                for organizations.
              </p>
              <Link href="/sponsors#inquire" className="btn-primary">
                Go to Sponsor Enquiry
              </Link>
            </Reveal>

            <Reveal as="div" className={styles.routeCard} delay={120}>
              <span className={styles.routeKicker}>
                <span className={styles.routeKickerNum}>02</span>
                <span className={styles.routeKickerDivider} />
                Recruitment
              </span>
              <h2 className={styles.routeTitle}>
                Join the team.
              </h2>
              <p className={styles.routeDesc}>
                Recruitment opens each academic year for RVCE undergraduates
                from any branch. The application form lives on its own page.
              </p>
              <Link href="/join" className={styles.routeGhost}>
                Go to Application
                <span aria-hidden="true">→</span>
              </Link>
            </Reveal>

            <Reveal as="div" className={styles.routeCard} delay={240}>
              <span className={styles.routeKicker}>
                <span className={styles.routeKickerNum}>03</span>
                <span className={styles.routeKickerDivider} />
                Press &amp; Other
              </span>
              <h2 className={styles.routeTitle}>
                Everything else.
              </h2>
              <p className={styles.routeDesc}>
                Media inquiries, collaboration ideas, visiting the workshop,
                anything else — write to us directly and we'll route it.
              </p>
              <a
                href={`mailto:${GARUDA_EMAIL}`}
                className={styles.routeGhost}
              >
                {GARUDA_EMAIL}
                <span aria-hidden="true">→</span>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ====== FOOTPRINT ====== */}
      <section className={`section ${styles.footprintSection}`}>
        <div className="container">
          <Reveal as="div">
            <span className={styles.sectionKicker}>
              <span className={styles.sectionKickerNum}>N° 02</span>
              <span className={styles.sectionKickerDivider} />
              Find Us
            </span>
            <h2 className={styles.footprintTitle}>Location</h2>
          </Reveal>

          <div className={styles.footprintGrid}>
            <Reveal as="div" className={styles.footprintInfo}>
              <div className={styles.footprintRow}>
                <span className={styles.footprintLabel}>Address</span>
                <span className={styles.footprintVal}>
                  Beside Design Thinking Huddle building,Club Area,
                  <br />
                  RV College of Engineering
                  <br />
                  Mysore Road, Bengaluru-560059
                </span>
              </div>
              <div className={styles.footprintRow}>
                <span className={styles.footprintLabel}>Coordinates</span>
                <span className={styles.footprintVal}>
                  12°55′23.7″N · 77°29′52.5″E
                </span>
              </div>
              <div className={styles.footprintRow}>
                <span className={styles.footprintLabel}>Email</span>
                <a
                  href={`mailto:${GARUDA_EMAIL}`}
                  className={styles.footprintLink}
                >
                  {GARUDA_EMAIL}
                </a>
              </div>
              <div className={styles.footprintRow}>
                <span className={styles.footprintLabel}>Map</span>
                <a
                  href={MAP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.footprintLink}
                >
                  Open in Google Maps
                  <span aria-hidden="true"> →</span>
                </a>
              </div>
            </Reveal>

            <Reveal as="a"
              href={MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mapTile}
              delay={120}
            >
              <span className={styles.mapTileLabel}>
                <span className={styles.mapTileDot} />
                12.92° N · 77.50° E
              </span>
              <span className={styles.mapTileTitle}>The Workshop</span>
              <span className={styles.mapTileSub}>
                Beside Design Thinking Huddle · RVCE
              </span>
              <span className={styles.mapTileLink}>
                View on map <span aria-hidden="true">→</span>
              </span>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
