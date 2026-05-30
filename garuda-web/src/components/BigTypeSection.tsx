"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./BigTypeSection.module.css";

export default function BigTypeSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const rect = section.getBoundingClientRect();
        const vh = window.innerHeight;
        const total = rect.height + vh;
        const travelled = vh - rect.top;
        const t = Math.min(1, Math.max(0, travelled / total));
        setProgress(t);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const photoScale = 1 + progress * 0.08;
  const photoOpacity = 0.18 + (1 - Math.abs(progress - 0.5) * 2) * 0.22;
  const headlineY = (0.5 - progress) * 60;

  return (
    <section ref={sectionRef} className={styles.bigType}>
      <div className={styles.bigStage}>
        <div
          className={styles.bigPhotoWrap}
          style={{
            transform: `scale(${photoScale.toFixed(3)})`,
            opacity: photoOpacity.toFixed(3),
          }}
          aria-hidden="true"
        >
          <img
            src="/images/core_team_with_car.jpg"
            alt=""
            className={styles.bigPhoto}
          />
        </div>

        <div className={styles.bigOverlay} aria-hidden="true" />
        <div className={styles.bigGrain} aria-hidden="true" />

        <div className={styles.bigInner}>
          <span className={styles.bigKicker}>
            <span className={styles.bigKickerNum}>N° 03</span>
            <span className={styles.bigKickerDivider} />
            The Pursuit
          </span>

          <h2
            className={styles.bigHeadline}
            style={{ transform: `translateY(${headlineY.toFixed(2)}px)` }}
          >
            <span className={styles.bigLine}>Designed.</span>
            <span className={styles.bigLine}>Built.</span>
            <span className={styles.bigLine}>Raced.</span>
            <span className={`${styles.bigLine} ${styles.bigLineAccent}`}>
              By students.
            </span>
          </h2>

          <p className={styles.bigSub}>
            Every prototype that has carried the GARUDA name was sketched,
            machined, and driven by undergraduates from RV College of
            Engineering. The cars are professional. The team is not. XD

          </p>

          <Link href="/team" className={styles.bigLink}>
            Meet the people
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
