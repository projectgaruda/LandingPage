import Link from "next/link";
import styles from "./Footer.module.css";

const exploreLinks = [
  { href: "/", label: "Home" },
  { href: "/team", label: "Team" },
  { href: "/builds", label: "Previous Builds" },
  { href: "/gallery", label: "Gallery" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/contact", label: "Contact" },
];

const socials = [
  {
    label: "Instagram",
    handle: "@projectgaruda",
    href: "https://www.instagram.com/projectgaruda",
  },
  {
    label: "LinkedIn",
    handle: "Project Garuda",
    href: "https://www.linkedin.com/company/project-garuda/?originalSubdomain=in",
  },
  {
    label: "YouTube",
    handle: "@GarudaRVCE",
    href: "https://www.youtube.com/@GarudaRVCE",
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.glow} aria-hidden="true" />

      <div className="container">
        {/* ===== Wordmark masthead ===== */}
        <div className={styles.masthead}>
          <Link href="/" className={styles.wordmarkLink}>
            <span className={styles.wordmark}>GARUDA</span>
          </Link>
          <div className={styles.mastheadRight}>
            <span className={styles.tagKicker}>
              <span className={styles.tagKickerDot} />
              Est. 2004 · RVCE · Bengaluru
            </span>
            <p className={styles.tagline}>
              A student engineering team building ultra-efficient vehicles for
              international competition.
            </p>
          </div>
        </div>

        <div className={styles.divider} />

        {/* ===== Columns ===== */}
        <div className={styles.grid}>
          {/* Brand */}
          <div className={styles.brand}>
            <Link href="/" className={styles.logoWrap}>
              <img
                src="/GarudaLogo1.png"
                alt="Project Garuda"
                className={styles.logoImg}
              />
            </Link>
            <p className={styles.desc}>
              GARUDA — Super-Mileage Vehicle Team. Designing, building, and
              racing battery-electric Urban Concept cars with the engineering
              departments at RV College of Engineering.
            </p>
          </div>

          {/* Explore */}
          <nav className={styles.col} aria-label="Footer navigation">
            <h4 className={styles.colTitle}>Explore</h4>
            <ul className={styles.list}>
              {exploreLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={styles.listLink}>
                    {l.label}
                    <span className={styles.linkArrow} aria-hidden="true">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Follow</h4>
            <ul className={styles.list}>
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                  >
                    <span className={styles.socialPlatform}>{s.label}</span>
                    <span className={styles.socialHandle}>{s.handle}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Contact</h4>
            <ul className={styles.list}>
              <li className={styles.contactLine}>
                <span className={styles.contactLabel}>Email</span>
                <a
                  href="mailto:garuda@rvce.edu.in"
                  className={styles.contactValue}
                >
                  garuda@rvce.edu.in
                </a>
              </li>
              <li className={styles.contactLine}>
                <span className={styles.contactLabel}>Workshop</span>
                <a
                  href="https://www.google.com/maps?q=12.923242,77.497903"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactValue}
                >
                  Beside Design Thinking Huddle
                  <br />
                  RVCE · Bengaluru
                </a>
              </li>
            </ul>
            <Link href="/join" className={styles.contactCta}>
              Join the Team
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* ===== Bottom strip ===== */}
        <div className={styles.bottom}>
          <span className={styles.copy}>
            © {year} Project Garuda · RV College of Engineering
          </span>
          <span className={styles.badge}>
            <span className={styles.badgeDot} />
            Shell Eco-marathon · International Participant
          </span>
        </div>
      </div>
    </footer>
  );
}
