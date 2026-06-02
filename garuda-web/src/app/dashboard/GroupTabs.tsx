"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import styles from "./page.module.css";

export type GroupCounts = Record<string, number>;

type Props = {
  groups: readonly string[];
  active: string;
  counts: GroupCounts;
};

export default function GroupTabs({ groups, active, counts }: Props) {
  const pathname = usePathname();
  const params = useSearchParams();

  function hrefFor(group: string) {
    const next = new URLSearchParams(params.toString());
    next.set("group", group);
    return `${pathname}?${next.toString()}`;
  }

  return (
    <nav className={styles.groupTabs} aria-label="Todo groups">
      {groups.map((g) => {
        const isActive = g === active;
        const count = counts[g] ?? 0;
        return (
          <Link
            key={g}
            href={hrefFor(g)}
            className={`${styles.groupTab} ${isActive ? styles.groupTabActive : ""}`}
            aria-current={isActive ? "page" : undefined}
          >
            <span>{g}</span>
            <span className={styles.groupTabCount}>{count}</span>
          </Link>
        );
      })}
    </nav>
  );
}
