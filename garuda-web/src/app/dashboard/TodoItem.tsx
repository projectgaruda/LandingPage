"use client";

import { useState, useTransition } from "react";
import { toggleTodo } from "@/app/actions/todos";
import TodoDetail from "./TodoDetail";
import { notify } from "./toastHelpers";
import styles from "./page.module.css";

export type Todo = {
  id: string;
  title: string;
  description: string | null;
  done: boolean;
  deadline: string | null;
  group_name: string | null;
};

function formatDeadline(deadline: string): {
  display: string;
  variant: "default" | "soon" | "overdue";
} {
  const dl = new Date(deadline + "T00:00:00");
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const dlOnly = new Date(dl);
  dlOnly.setHours(0, 0, 0, 0);
  const diff = Math.round(
    (dlOnly.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
  );

  let display: string;
  if (diff === 0) display = "today";
  else if (diff === 1) display = "tomorrow";
  else if (diff === -1) display = "yesterday";
  else if (diff < -1) display = `${Math.abs(diff)}d ago`;
  else if (diff < 7)
    display = dlOnly.toLocaleDateString("en-IN", { weekday: "short" });
  else
    display = dlOnly.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    });

  let variant: "default" | "soon" | "overdue" = "default";
  if (diff < 0) variant = "overdue";
  else if (diff <= 2) variant = "soon";

  return { display, variant };
}

type Props = {
  todo: Todo;
  groups: readonly string[];
};

export default function TodoItem({ todo, groups }: Props) {
  const [pending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [dragging, setDragging] = useState(false);

  function onToggle(e: React.MouseEvent) {
    e.stopPropagation();
    const fd = new FormData();
    fd.append("id", todo.id);
    fd.append("done", String(todo.done));
    const goingDone = !todo.done;
    const tid = notify.loading(goingDone ? "Marking done…" : "Moving back…");
    startTransition(async () => {
      try {
        await toggleTodo(fd);
        notify.success(goingDone ? "Done" : "Back in todo", tid);
      } catch {
        notify.error("Couldn't update task", tid);
      }
    });
  }

  function onDragStart(e: React.DragEvent<HTMLLIElement>) {
    e.dataTransfer.setData("application/x-todo-id", todo.id);
    e.dataTransfer.setData("application/x-todo-done", String(todo.done));
    e.dataTransfer.effectAllowed = "move";
    setDragging(true);
  }

  function onDragEnd() {
    setDragging(false);
  }

  const deadline = todo.deadline ? formatDeadline(todo.deadline) : null;
  const hasDesc = !!(todo.description && todo.description.trim());

  return (
    <>
      <li
        className={`${styles.todoRow} ${todo.done ? styles.todoRowDone : ""} ${pending ? styles.todoRowPending : ""} ${dragging ? styles.todoRowDragging : ""}`}
        draggable
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <button
          type="button"
          className={`${styles.todoCheckbox} ${todo.done ? styles.todoCheckboxDone : ""}`}
          onClick={onToggle}
          aria-label={todo.done ? "Mark not done" : "Mark done"}
          disabled={pending}
        >
          {todo.done && (
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
        </button>

        <button
          type="button"
          className={styles.todoTitleBtn}
          onClick={() => setOpen(true)}
          aria-label={`Open task: ${todo.title}`}
        >
          <span className={styles.todoTitle}>{todo.title}</span>
          {hasDesc && (
            <span className={styles.todoHasDesc} aria-hidden="true">
              ⋯
            </span>
          )}
        </button>

        {deadline && (
          <span
            className={`${styles.todoDeadline} ${
              deadline.variant === "soon"
                ? styles.todoDeadlineSoon
                : deadline.variant === "overdue"
                  ? styles.todoDeadlineOverdue
                  : ""
            }`}
          >
            {deadline.display}
          </span>
        )}
      </li>

      <TodoDetail
        todo={todo}
        groups={groups}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
