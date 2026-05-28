"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import styles from "./CategoryTabs.module.css";

export const CATEGORIES = [
  "All",
  "General",
  "Electrical",
  "Mechanical",
  "Aerodynamics",
  "Software",
  "Events",
  "Announcements",
];

export default function CategoryTabs({ active }: { active: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function select(cat: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (cat === "All") {
      params.delete("category");
    } else {
      params.set("category", cat);
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className={styles.tabs}>
      {CATEGORIES.map((cat) => {
        const isActive = cat === active || (cat === "All" && active === "All");
        return (
          <button
            key={cat}
            type="button"
            className={`${styles.tab} ${isActive ? styles.tabActive : ""}`}
            onClick={() => select(cat)}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
