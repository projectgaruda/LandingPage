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
    color: "#FFD700",
    glow: "rgba(255, 215, 0, 0.18)",
    border: "rgba(255, 215, 0, 0.45)",
  },
  {
    tier: "Silver",
    sponsors: [{ name: "Coming soon", placeholder: true }],
    color: "#C0C0C0",
    glow: "rgba(192, 192, 192, 0.12)",
    border: "rgba(192, 192, 192, 0.35)",
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
          {sponsorTiers.map((tier) => (
            <div key={tier.tier} className={styles.tierSection}>
              <div className={styles.tierHeader}>
                <span
                  className={styles.tierMedal}
                  style={{ color: tier.color, borderColor: tier.border, background: tier.glow }}
                >
                  {tier.tier === "Gold" ? "🥇" : "🥈"}
                </span>
                <h2 className={styles.tierTitle} style={{ color: tier.color }}>
                  {tier.tier} Partners
                </h2>
              </div>
              <div className={styles.sponsorGrid}>
                {tier.sponsors.map((sponsor, sIdx) => (
                  <div
                    key={sIdx}
                    className={`${styles.sponsorCard} ${sponsor.placeholder ? styles.sponsorCardPlaceholder : ""}`}
                    style={sponsor.placeholder ? {} : {
                      borderColor: tier.border,
                      boxShadow: `0 0 32px ${tier.glow}, 0 4px 16px rgba(0,0,0,0.08)`,
                    }}
                  >
                    {!sponsor.placeholder && (
                      <div
                        className={styles.tierAccentLine}
                        style={{ background: `linear-gradient(90deg, transparent, ${tier.color}, transparent)` }}
                      />
                    )}
                    <div className={styles.sponsorPlaceholder}>
                      <span
                        className={`${styles.sponsorName} ${sponsor.placeholder ? styles.sponsorNameMuted : ""}`}
                        style={sponsor.placeholder ? {} : { color: tier.color }}
                      >
                        {sponsor.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Workshop location map */}
          <div className={styles.mapSection}>
            <h3 className={styles.mapTitle}>Our Workshop</h3>
            <p className={styles.mapSubtitle}>RV College of Engineering, Mysore Road, Bengaluru — 560059</p>
            <div className={styles.mapWrap}>
              <iframe
                src="https://maps.google.com/maps?q=RV+College+of+Engineering,+Bengaluru,+Karnataka&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="GARUDA Workshop — RV College of Engineering"
              />
            </div>
          </div>

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
