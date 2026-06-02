"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import styles from "./page.module.css";

type Props = {
  groups: readonly string[];
  active: string;
  counts: Record<string, number>;
};

export default function GroupSwitcher({ groups, active, counts }: Props) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function switchTo(g: string) {
    const next = new URLSearchParams(params.toString());
    next.set("group", g);
    router.push(`${pathname}?${next.toString()}`);
    setOpen(false);
  }

  const activeCount = counts[active] ?? 0;
  const others = groups.filter((g) => g !== active);

  return (
    <div className={styles.switcher} ref={ref}>
      <button
        type="button"
        className={`${styles.switcherCurrent} ${open ? styles.switcherCurrentOpen : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={styles.switcherLabel}>Group</span>
        <span className={styles.switcherName}>{active}</span>
        <span className={styles.switcherCount}>{activeCount}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`${styles.switcherCaret} ${open ? styles.switcherCaretOpen : ""}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <ul className={styles.switcherMenu} role="listbox">
          {others.map((g) => (
            <li key={g}>
              <button
                type="button"
                className={styles.switcherOption}
                onClick={() => switchTo(g)}
                role="option"
                aria-selected={false}
              >
                <span>{g}</span>
                <span className={styles.switcherCount}>
                  {counts[g] ?? 0}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
