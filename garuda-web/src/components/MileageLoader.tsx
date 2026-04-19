"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./MileageLoader.module.css";

export default function MileageLoader() {
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);
    setCount(0);
    const duration = 1200;
    const steps = 60;
    const interval = duration / steps;
    let current = 0;
    const timer = setInterval(() => {
      current++;
      setCount(Math.round((current / steps) * 200));
      if (current >= steps) {
        clearInterval(timer);
        setTimeout(() => setLoading(false), 200);
      }
    }, interval);
    return () => clearInterval(timer);
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.loaderWrap}>
        {/* Speedometer arc */}
        <div className={styles.gauge}>
          <svg viewBox="0 0 200 120" className={styles.gaugeSvg}>
            <defs>
              <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--bg-card)" />
                <stop offset="100%" stopColor="var(--accent-green)" />
              </linearGradient>
            </defs>
            {/* Background arc */}
            <path
              d="M 20 110 A 80 80 0 0 1 180 110"
              fill="none"
              stroke="var(--border)"
              strokeWidth="6"
              strokeLinecap="round"
            />
            {/* Progress arc */}
            <path
              d="M 20 110 A 80 80 0 0 1 180 110"
              fill="none"
              stroke="url(#arcGrad)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray="251.2"
              strokeDashoffset={251.2 - (count / 200) * 251.2}
              className={styles.arcProgress}
            />
            {/* Tick marks */}
            {[...Array(11)].map((_, i) => {
              const angle = -180 + i * 18;
              const rad = (angle * Math.PI) / 180;
              const x1 = 100 + 72 * Math.cos(rad);
              const y1 = 110 + 72 * Math.sin(rad);
              const x2 = 100 + 80 * Math.cos(rad);
              const y2 = 110 + 80 * Math.sin(rad);
              return (
                <line
                  key={i}
                  x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke="var(--border)"
                  strokeWidth={i % 5 === 0 ? 1.5 : 0.5}
                />
              );
            })}
          </svg>

          {/* Odometer digits */}
          <div className={styles.odometer}>
            <span className={styles.odoDigits}>{String(count).padStart(3, "0")}</span>
            <span className={styles.odoUnit}>KM/kWh</span>
          </div>
        </div>

        <div className={styles.label}>INITIALIZING GARUDA</div>
        <div className={styles.dots}>
          <span /><span /><span />
        </div>
      </div>
    </div>
  );
}
