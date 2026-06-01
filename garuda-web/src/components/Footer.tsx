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

const socials = [
  {
    href: "https://www.instagram.com/projectgaruda",
    label: "Instagram",
    cls: styles.socialInstagram,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
  },
  {
    href: "https://www.linkedin.com/company/project-garuda/?originalSubdomain=in",
    label: "LinkedIn",
    cls: styles.socialLinkedIn,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    href: "https://www.youtube.com/@GarudaRVCE",
    label: "YouTube",
    cls: styles.socialYouTube,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
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
              A student engineering club dedicated to designing and racing
              ultra-efficient super mileage vehicles at international competitions
              including Shell Eco-marathon.
            </p>
            <div className={styles.socials}>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className={`${styles.socialBtn} ${s.cls}`}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {s.icon}
                </a>
              ))}
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
            <p className={styles.contactLine}>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "middle", marginRight: "7px", flexShrink: 0 }}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              <a href="mailto:garuda@rvce.edu.in" className={styles.contactEmail}>garuda@rvce.edu.in</a>
            </p>
            <p className={styles.contactLine}>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "middle", marginRight: "7px", flexShrink: 0 }}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              <a href="mailto:projectgarudarv@gmail.com" className={styles.contactEmail}>projectgarudarv@gmail.com</a>
            </p>
            <p className={styles.contactLine}>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "middle", marginRight: "7px", flexShrink: 0 }}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              RVCE, Bengaluru, Karnataka
            </p>
            <Link href="/contact" className="btn-outline" style={{ marginTop: "1rem", fontSize: "0.65rem" }}>
              Contact Us
            </Link>
          </div>

        </div>

        <div className={styles.bottom}>
          <p className={styles.copy}>
            © {new Date().getFullYear()} GARUDA Super Mileage Club, RVCE. All rights reserved.
          </p>
          <div className={styles.bottomRight}>
            <Link href="/dashboard" className={styles.memberLink}>
              Already a member?
            </Link>
            <div className={styles.badge}>
              <span className={styles.badgeDot} />
              Shell Eco-Marathon Participant
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
