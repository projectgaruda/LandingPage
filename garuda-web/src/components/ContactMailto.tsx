"use client";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import styles from "./ContactMailto.module.css";

const EMAILS = [
  { address: "garuda@rvce.edu.in",        label: "Official" },
  { address: "projectgarudarv@gmail.com", label: "General" },
];

export default function ContactMailto() {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const reduced = useReducedMotion();

  function copy(address: string, idx: number) {
    navigator.clipboard.writeText(address).then(() => {
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 2000);
    });
  }

  const cardVariants = {
    hidden: { opacity: 0, y: reduced ? 0 : 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
  };

  const childVariants = {
    hidden: { opacity: 0, y: reduced ? 0 : 14 },
    visible: (i: number) => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.1 + 0.2, duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <motion.div
      className={styles.card}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={reduced ? {} : { y: -4, transition: { duration: 0.25, ease: "easeOut" } }}
    >
      {/* Glow orb */}
      <div className={styles.glow} aria-hidden />

      <motion.span className={styles.eyebrow} variants={childVariants} custom={0} initial="hidden" animate="visible">
        Drop us a line
      </motion.span>

      {/* Both email addresses */}
      {EMAILS.map(({ address, label }, idx) => (
        <motion.div
          key={address}
          className={styles.emailRow}
          variants={childVariants}
          custom={idx + 1}
          initial="hidden"
          animate="visible"
        >
          <div className={styles.emailBlock}>
            <span className={styles.emailLabel}>{label}</span>
            <a href={`mailto:${address}`} className={styles.email}>
              {address}
            </a>
          </div>
          <motion.button
            className={`${styles.copyBtn} ${copiedIdx === idx ? styles.copyBtnDone : ""}`}
            onClick={() => copy(address, idx)}
            aria-label={copiedIdx === idx ? "Copied!" : `Copy ${address}`}
            whileTap={reduced ? {} : { scale: 0.88 }}
            title={copiedIdx === idx ? "Copied!" : "Copy to clipboard"}
          >
            {copiedIdx === idx ? (
              <motion.span
                key="check"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
              >
                ✓
              </motion.span>
            ) : (
              <motion.span key="copy" initial={{ opacity: 1 }}>⧉</motion.span>
            )}
          </motion.button>
        </motion.div>
      ))}

      <motion.p className={styles.subtext} variants={childVariants} custom={3} initial="hidden" animate="visible">
        For sponsorships, media, or general inquiries — we read every message.
      </motion.p>

      <motion.a
        href={`mailto:${EMAILS[0].address}`}
        className={styles.mailBtn}
        variants={childVariants}
        custom={4}
        initial="hidden"
        animate="visible"
        whileHover={reduced ? {} : "hover"}
      >
        <span>Open in Mail</span>
        <motion.span
          className={styles.arrow}
          variants={{ hover: { x: 5, transition: { duration: 0.2 } } }}
        >
          →
        </motion.span>
      </motion.a>
    </motion.div>
  );
}
