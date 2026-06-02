"use client";

import { useState, useTransition } from "react";
import { toggleTodo } from "@/app/actions/todos";
import { notify } from "./toastHelpers";
import styles from "./page.module.css";

type Props = {
  /** What state items in this column have. Drops onto this column toggle to this state. */
  state: "todo" | "done";
  title: string;
  count: number;
  children: React.ReactNode;
};

export default function TodoColumn({ state, title, count, children }: Props) {
  const [hovering, setHovering] = useState(false);
  const [, startTransition] = useTransition();

  function onDragOver(e: React.DragEvent<HTMLDivElement>) {
    // Only treat as a valid drop target when something todo-shaped is being dragged
    if (Array.from(e.dataTransfer.types).includes("application/x-todo-id")) {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      setHovering(true);
    }
  }

  function onDragLeave() {
    setHovering(false);
  }

  function onDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setHovering(false);
    const id = e.dataTransfer.getData("application/x-todo-id");
    const wasDone = e.dataTransfer.getData("application/x-todo-done") === "true";

    if (!id) return;
    const targetDone = state === "done";
    if (wasDone === targetDone) return;

    const fd = new FormData();
    fd.append("id", id);
    fd.append("done", String(wasDone));
    const tid = notify.loading(
      targetDone ? "Moving to Done…" : "Moving to Todo…",
    );
    startTransition(async () => {
      try {
        await toggleTodo(fd);
        notify.success(targetDone ? "Done" : "Back in todo", tid);
      } catch {
        notify.error("Couldn't move task", tid);
      }
    });
  }

  return (
    <div
      className={`${styles.column} ${hovering ? styles.columnHover : ""}`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <div className={styles.columnHead}>
        <h2 className={styles.columnTitle}>{title}</h2>
        <span className={styles.columnCount}>{count}</span>
      </div>
      {children}
    </div>
  );
}
