"use client";
import { motion, useReducedMotion } from "framer-motion";
import styles from "@/app/page.module.css";

export default function CompetitionsSection() {
  const reduced = useReducedMotion();

  return (
    <section className={styles.competitionsSection}>
      {/* Banner image background */}
      <div
        className={styles.competitionsBannerBg}
        style={{ backgroundImage: "url('/images/sem_banner.jpg')" }}
        aria-hidden
      />
      <div className={styles.competitionsOverlay} aria-hidden />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>

        {/* "Designed. Built. Raced." tagline */}
        <div className={styles.taglineRow}>
          {["Designed.", "Built.", "Raced.", "By students."].map((word, i) => (
            <motion.span
              key={word}
              className={styles.taglineWord}
              initial={reduced ? {} : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              {word}
            </motion.span>
          ))}
        </div>

        {/* Section label */}
        <motion.div
          className={`section-label ${styles.competitionsLabel}`}
          initial={reduced ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.55, duration: 0.4 }}
        >
          Where We Compete
        </motion.div>

        {/* Competition card */}
        <motion.div
          className={styles.semCard}
          initial={reduced ? {} : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.65, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Animated icon */}
          <div className={styles.semIconWrap}>
            <motion.img
              src="/images/sem_icon.png"
              alt="Shell Eco-Marathon logo"
              className={styles.semIcon}
              animate={reduced ? {} : { y: [0, -10, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
            {/* Glow ring under icon */}
            <motion.div
              className={styles.semIconGlow}
              animate={reduced ? {} : { scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden
            />
          </div>

          {/* Info */}
          <div className={styles.semInfo}>
            <p className={styles.semEyebrow}>Official Competition</p>
            <h3 className={styles.semName}>Shell Eco-Marathon</h3>
            <p className={styles.semRegion}>Asia Pacific</p>
            <p className={styles.semDesc}>
              The world's premier energy-efficiency motorsport. Over 180 student teams from
              40+ countries engineer vehicles designed to travel as far as possible on the least
              amount of energy. GARUDA has been representing India and RVCE at this stage since 2007.
            </p>

            <div className={styles.semStats}>
              {[
                { val: "180+", label: "Teams" },
                { val: "40+",  label: "Countries" },
                { val: "200+", label: "km/L goal" },
              ].map((s) => (
                <div key={s.label} className={styles.semStat}>
                  <span className={styles.semStatVal}>{s.val}</span>
                  <span className={styles.semStatLabel}>{s.label}</span>
                </div>
              ))}
            </div>

            <a
              href="https://www.shellecomarathon.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={`btn-primary ${styles.semCta}`}
            >
              Learn More about SEM →
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
