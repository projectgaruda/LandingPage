"use client";

import { useEffect, useRef, useState } from "react";
import type {
  ToastEventDetail,
  ToastVariant,
} from "./toastHelpers";
import styles from "./page.module.css";

type ToastItem = {
  id: string;
  message: string;
  variant: ToastVariant;
  exiting?: boolean;
};

const SUCCESS_TTL = 1600;
const ERROR_TTL = 4000;
const EXIT_DURATION = 200;

export default function Toaster() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const dismissTimers = useRef<Map<string, ReturnType<typeof setTimeout>>>(
    new Map(),
  );
  const exitTimers = useRef<Map<string, ReturnType<typeof setTimeout>>>(
    new Map(),
  );

  useEffect(() => {
    function scheduleDismiss(id: string, ttl: number) {
      const existing = dismissTimers.current.get(id);
      if (existing) clearTimeout(existing);
      const t = setTimeout(() => {
        // start exit animation
        setToasts((prev) =>
          prev.map((x) => (x.id === id ? { ...x, exiting: true } : x)),
        );
        const exitT = setTimeout(() => {
          setToasts((prev) => prev.filter((x) => x.id !== id));
          exitTimers.current.delete(id);
        }, EXIT_DURATION);
        exitTimers.current.set(id, exitT);
        dismissTimers.current.delete(id);
      }, ttl);
      dismissTimers.current.set(id, t);
    }

    function onToast(e: Event) {
      const ce = e as CustomEvent<ToastEventDetail>;
      if (!ce.detail) return;
      const { id: providedId, message, variant } = ce.detail;
      const id = providedId ?? `t-${Math.random().toString(36).slice(2)}`;

      setToasts((prev) => {
        const exists = prev.find((t) => t.id === id);
        if (exists) {
          return prev.map((t) =>
            t.id === id ? { ...t, message, variant, exiting: false } : t,
          );
        }
        return [...prev, { id, message, variant }];
      });

      // Cancel any pending dismiss for this id (we may be upgrading state)
      const oldDismiss = dismissTimers.current.get(id);
      if (oldDismiss) {
        clearTimeout(oldDismiss);
        dismissTimers.current.delete(id);
      }

      // Schedule auto-dismiss for non-loading
      if (variant !== "loading") {
        scheduleDismiss(id, variant === "success" ? SUCCESS_TTL : ERROR_TTL);
      }
    }

    window.addEventListener("garuda:toast", onToast);
    return () => {
      window.removeEventListener("garuda:toast", onToast);
      dismissTimers.current.forEach((t) => clearTimeout(t));
      exitTimers.current.forEach((t) => clearTimeout(t));
      dismissTimers.current.clear();
      exitTimers.current.clear();
    };
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className={styles.toaster} role="status" aria-live="polite">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`${styles.toast} ${styles[`toast_${t.variant}`]} ${t.exiting ? styles.toastExiting : ""}`}
        >
          <span className={styles.toastIcon} aria-hidden="true">
            {t.variant === "loading" && (
              <span className={styles.toastSpinner} />
            )}
            {t.variant === "success" && (
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
            {t.variant === "error" && (
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6L6 18" />
                <path d="M6 6l12 12" />
              </svg>
            )}
          </span>
          <span className={styles.toastMsg}>{t.message}</span>
        </div>
      ))}
    </div>
  );
}
