import type { Metadata } from "next";
import styles from "./page.module.css";
import ContactMailto from "@/components/ContactMailto";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the GARUDA Super Mileage Club for partnerships, recruitment, or general inquiries.",
};

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <section className={styles.pageHeader}>
        <div className={styles.headerBg} />
        <div className="container">
          <div className="section-label">Connect With Us</div>
          <h1 className={styles.pageTitle}>
            Get in <span className={styles.accent}>Touch</span>
          </h1>
          <p className={styles.pageDesc}>
            Whether you're looking for sponsorship opportunities, media inquiries,
            or interested in joining the team, we'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.contactGrid}>

            {/* Left — contact info */}
            <div className={styles.contactInfo}>
              <div className={`card ${styles.infoCard}`}>
                <h3 className={styles.infoTitle}>Contact Details</h3>
                <div className={styles.infoList}>
                  <div className={styles.infoItem}>
                    <span className={styles.icon}>📍</span>
                    <div>
                      <p className={styles.label}>Location</p>
                      <p className={styles.value}>
                        <a
                          href="https://maps.google.com/?q=RV+College+of+Engineering+Bangalore"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          RV College of Engineering, Mysore Road, Bengaluru, KA - 560059
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.icon}>📧</span>
                    <div>
                      <p className={styles.label}>Email</p>
                      <p className={styles.value}>
                        <a href="mailto:garuda@rvce.edu.in">garuda@rvce.edu.in</a>
                      </p>
                    </div>
                  </div>
                </div>

                <div className={styles.divider} />

                <h3 className={styles.infoTitle}>Operation Hours</h3>
                <ul className={styles.hoursList}>
                  <li><span>Mon – Fri</span> <span>9:00 AM – 6:00 PM</span></li>
                  <li><span>Sat</span> <span>10:00 AM – 4:00 PM</span></li>
                  <li><span>Sun</span> <span className={styles.closed}>Closed</span></li>
                </ul>
              </div>
            </div>

            {/* Right — fancy mailto */}
            <ContactMailto />

          </div>
        </div>
      </section>
    </div>
  );
}
