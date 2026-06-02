"use client";

import { useState } from "react";
import BuildProgressDetail from "./BuildProgressDetail";
import type { Todo } from "./TodoItem";
import styles from "./page.module.css";

export type BuildProgress = {
  id: string;
  title: string;
  description: string | null;
  group_name: string | null;
  todo_ids: string[];
};

type Props = {
  item: BuildProgress;
  groups: readonly string[];
  groupTodos: Todo[];
};

export default function BuildProgressItem({ item, groups, groupTodos }: Props) {
  const [open, setOpen] = useState(false);

  const linkedTodos = groupTodos.filter((t) => item.todo_ids.includes(t.id));
  const total = linkedTodos.length;
  const done = linkedTodos.filter((t) => t.done).length;
  const isComplete = total > 0 && done === total;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <>
      <li className={styles.bpRow}>
        <button
          type="button"
          className={styles.bpRowBtn}
          onClick={() => setOpen(true)}
          aria-label={`Open milestone: ${item.title}`}
        >
          <span
            className={`${styles.bpCheck} ${isComplete ? styles.bpCheckDone : ""}`}
            aria-hidden="true"
          >
            {isComplete && (
              <svg
                width="11"
                height="11"
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
          </span>
          <div className={styles.bpBody}>
            <span
              className={`${styles.bpTitle} ${isComplete ? styles.bpTitleDone : ""}`}
            >
              {item.title}
            </span>
            <span className={styles.bpMeta}>
              {total === 0 ? (
                "no linked tasks"
              ) : (
                <>
                  {done}/{total} done
                </>
              )}
            </span>
          </div>
        </button>
        {total > 0 && (
          <div className={styles.bpBar} aria-hidden="true">
            <span
              className={styles.bpBarFill}
              style={{ width: `${pct}%` }}
            />
          </div>
        )}
      </li>

      <BuildProgressDetail
        item={item}
        groups={groups}
        groupTodos={groupTodos}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
