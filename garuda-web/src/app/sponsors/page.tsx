import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Sponsors",
  description: "Our mission is made possible by the generous support of our corporate and institutional sponsors.",
};

const sponsorTiers = [
  {
    tier: "Gold",
    sponsors: [{ name: "RVCE", placeholder: false }],
    color: "#ffd700",
  },
  {
    tier: "Silver",
    sponsors: [{ name: "Coming soon", placeholder: true }],
    color: "#c0c0c0",
  },
];

export default function SponsorsPage() {
  return (
    <div className={styles.page}>
      <section className={styles.pageHeader}>
        <div className={styles.headerBg} />
        <div className="container">
          <div className="section-label">Partners in Innovation</div>
          <h1 className={styles.pageTitle}>
            Our <span className={styles.accent}>Sponsors</span>
          </h1>
          <p className={styles.pageDesc}>
            Our project is made possible through the collaboration of industry
            leaders who share our vision of a more efficient future.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {sponsorTiers.map((tier, tIdx) => (
            <div key={tIdx} className={styles.tierSection}>
              <h2 className={styles.tierTitle} style={{ color: tier.color }}>
                {tier.tier} Partners
              </h2>
              <div className={styles.sponsorGrid}>
                {tier.sponsors.map((sponsor, sIdx) => (
                  <div
                    key={sIdx}
                    className={`card ${styles.sponsorCard} ${sponsor.placeholder ? styles.sponsorCardPlaceholder : ""}`}
                  >
                    <div className={styles.sponsorPlaceholder}>
                      <span
                        className={`${styles.sponsorName} ${sponsor.placeholder ? styles.sponsorNameMuted : ""}`}
                      >
                        {sponsor.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className={styles.ctaCard}>
            <div className={styles.ctaGlow} />
            <h3 className={styles.ctaTitle}>Become a Sponsor</h3>
            <p className={styles.ctaDesc}>
              Support the next generation of engineers and associate your brand
              with cutting-edge innovation in fuel efficiency.
            </p>
            <a href="/contact" className="btn-primary">Partnership Inquiry</a>
          </div>
        </div>
      </section>
    </div>
  );
}
