"use client";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import styles from "./ContactMailto.module.css";

const EMAIL = "garuda@rvce.edu.in";

export default function ContactMailto() {
  const [copied, setCopied] = useState(false);
  const reduced = useReducedMotion();

  function copy() {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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

      <motion.div className={styles.emailRow} variants={childVariants} custom={1} initial="hidden" animate="visible">
        <a href={`mailto:${EMAIL}`} className={styles.email}>
          {EMAIL}
        </a>
        <motion.button
          className={`${styles.copyBtn} ${copied ? styles.copyBtnDone : ""}`}
          onClick={copy}
          aria-label={copied ? "Copied!" : "Copy email"}
          whileTap={reduced ? {} : { scale: 0.88 }}
          title={copied ? "Copied!" : "Copy to clipboard"}
        >
          {copied ? (
            <motion.span
              key="check"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
            >
              ✓
            </motion.span>
          ) : (
            <motion.span key="copy" initial={{ opacity: 1 }}>
              ⧉
            </motion.span>
          )}
        </motion.button>
      </motion.div>

      <motion.p className={styles.subtext} variants={childVariants} custom={2} initial="hidden" animate="visible">
        For sponsorships, media, or general inquiries — we read every message.
      </motion.p>

      <motion.a
        href={`mailto:${EMAIL}`}
        className={styles.mailBtn}
        variants={childVariants}
        custom={3}
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
