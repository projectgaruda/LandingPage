import Link from "next/link";
import styles from "./Footer.module.css";

const quickLinks = [
  { href: "/about", label: "About Us" },
  { href: "/builds", label: "Previous Builds" },
  { href: "/team", label: "Our Team" },
  { href: "/gallery", label: "Gallery" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/contact", label: "Contact" },
];

const services = [
  "Vehicle Design",
  "Aerodynamics",
  "Powertrain Engineering",
  "Data Analysis",
  "Race Strategy",
  "R&D Innovation",
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.glow} />
      <div className="container">
        <div className={styles.grid}>
          {/* Brand */}
          <div className={styles.brand}>
            <div className={styles.logo}>
              <span className={styles.logoIcon}>⬡</span>
              <span className={styles.logoText}>GARUDA</span>
            </div>
            <p className={styles.tagline}>
              Engineering Excellence.<br />
              Uncompromising Performance.
            </p>
            <p className={styles.desc}>
              A professional engineering club dedicated to designing and racing 
              ultra-efficient super mileage vehicles at international competitions 
              including Shell Eco-marathon.
            </p>
            <div className={styles.socials}>
              <a href="https://www.instagram.com/projectgaruda" className={styles.socialBtn} aria-label="Instagram">Instagram</a>
              <a href="https://www.linkedin.com/company/project-garuda/?originalSubdomain=in" className={styles.socialBtn} aria-label="LinkedIn">LinkedIn</a>
              <a href="https://www.youtube.com/@GarudaRVCE" className={styles.socialBtn} aria-label="YouTube">YouTube</a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Quick Links</h4>
            <ul className={styles.list}>
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={styles.listLink}>
                    <span className={styles.arrow}>→</span> {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Our Focus</h4>
            <ul className={styles.list}>
              {services.map((s) => (
                <li key={s} className={styles.listItem}>
                  <span className={styles.dot} />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / Hours */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Business Hours</h4>
            <ul className={styles.hours}>
              <li><span>Mon – Fri</span><span>9:00 AM – 6:00 PM</span></li>
              <li><span>Saturday</span><span>10:00 AM – 4:00 PM</span></li>
              <li><span>Sunday</span><span className={styles.closed}>Closed</span></li>
            </ul>
            <div className={styles.divider} />
            <h4 className={styles.colTitle}>Get In Touch</h4>
            <p className={styles.contactLine}>📧 garuda@rvce.edu.in</p>
            <p className={styles.contactLine}>📍 RVCE, Bengaluru, Karnataka</p>
            <Link href="/contact" className="btn-outline" style={{ marginTop: "1rem", fontSize: "0.65rem" }}>
              Contact Us
            </Link>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copy}>
            © {new Date().getFullYear()} GARUDA Engineering Club. All rights reserved.
          </p>
          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            Shell Eco-Marathon Participant
          </div>
        </div>
      </div>
    </footer>
  );
}
