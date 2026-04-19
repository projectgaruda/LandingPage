import type { Metadata } from "next";
import styles from "./page.module.css";

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
                  <li><span>Mon - Fri</span> <span>9:00 AM - 6:00 PM</span></li>
                  <li><span>Sat</span> <span>10:00 AM - 4:00 PM</span></li>
                  <li><span>Sun</span> <span className={styles.closed}>Closed</span></li>
                </ul>
              </div>
            </div>

            <div className={styles.contactFormWrap}>
              <form className={`card ${styles.form}`}>
                <div className={styles.formRow}>
                  <div className="form-group" style={{ flex: 1 }}>
                    <label className="form-label">Full Name</label>
                    <input type="text" className="form-input" placeholder="Enter your name" required />
                  </div>
                  <div className="form-group" style={{ flex: 1 }}>
                    <label className="form-label">Email Address</label>
                    <input type="email" className="form-input" placeholder="email@example.com" required />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <select className="form-input" required>
                    <option value="">Select inquiry type</option>
                    <option value="sponsorship">Sponsorship</option>
                    <option value="recruitment">Recruitment</option>
                    <option value="media">Media / Press</option>
                    <option value="general">General Inquiry</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea className="form-input" rows={6} placeholder="How can we help you?" required></textarea>
                </div>

                <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                  Send Message →
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}