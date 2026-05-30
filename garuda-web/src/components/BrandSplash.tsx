"use client";

import { useEffect, useState } from "react";
import styles from "./BrandSplash.module.css";

const SPLASH_KEY = "garuda-splash-shown";
const SPLASH_DURATION = 2200;

const LETTERS = ["G", "A", "R", "U", "D", "A"];

export default function BrandSplash() {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    let shown = false;
    try {
      shown = sessionStorage.getItem(SPLASH_KEY) === "1";
    } catch {
      shown = false;
    }
    if (shown) return;

    setVisible(true);
    try {
      sessionStorage.setItem(SPLASH_KEY, "1");
    } catch {}

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const leaveTimer = window.setTimeout(() => {
      setLeaving(true);
    }, SPLASH_DURATION - 600);

    const hideTimer = window.setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = prevOverflow;
    }, SPLASH_DURATION);

    return () => {
      clearTimeout(leaveTimer);
      clearTimeout(hideTimer);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`${styles.splash} ${leaving ? styles.leaving : ""}`}
      aria-hidden="true"
    >
      <div className={styles.inner}>
        <span className={styles.kicker}>Project Garuda · Est. 2004</span>

        <div className={styles.wordmark}>
          {LETTERS.map((letter, i) => (
            <span
              key={i}
              className={styles.letter}
              style={{ animationDelay: `${0.08 + i * 0.09}s` }}
            >
              {letter}
            </span>
          ))}
        </div>

        <div className={styles.rule} />

        <span className={styles.tag}>Super Mileage Vehicle Team · RVCE</span>
      </div>

      <div className={styles.wipe} />
    </div>
  );
}
