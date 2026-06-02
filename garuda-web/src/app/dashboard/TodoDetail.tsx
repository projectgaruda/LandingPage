"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { deleteTodo, toggleTodo, updateTodo } from "@/app/actions/todos";
import { notify } from "./toastHelpers";
import styles from "./page.module.css";
import type { Todo } from "./TodoItem";

type Props = {
  todo: Todo;
  groups: readonly string[];
  open: boolean;
  onClose: () => void;
};

export default function TodoDetail({ todo, groups, open, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description ?? "");
  const [deadline, setDeadline] = useState(todo.deadline ?? "");
  const [groupName, setGroupName] = useState(
    todo.group_name ?? groups[0] ?? "",
  );
  const [done, setDone] = useState(todo.done);

  useEffect(() => {
    setTitle(todo.title);
    setDescription(todo.description ?? "");
    setDeadline(todo.deadline ?? "");
    setGroupName(todo.group_name ?? groups[0] ?? "");
    setDone(todo.done);
  }, [todo, groups]);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  function onSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData();
    fd.append("id", todo.id);
    fd.append("title", title);
    fd.append("description", description);
    fd.append("deadline", deadline);
    fd.append("group_name", groupName);

    const tid = notify.loading("Saving…");
    startTransition(async () => {
      try {
        await updateTodo(fd);
        if (done !== todo.done) {
          const fdToggle = new FormData();
          fdToggle.append("id", todo.id);
          fdToggle.append("done", String(todo.done));
          await toggleTodo(fdToggle);
        }
        notify.success("Saved", tid);
        onClose();
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Couldn't save.";
        notify.error(msg, tid);
        setError(msg);
      }
    });
  }

  function onDelete() {
    if (!confirm("Delete this task?")) return;
    const fd = new FormData();
    fd.append("id", todo.id);
    const tid = notify.loading("Deleting task…");
    startTransition(async () => {
      try {
        await deleteTodo(fd);
        notify.success("Deleted", tid);
        onClose();
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Couldn't delete.";
        notify.error(msg, tid);
        setError(msg);
      }
    });
  }

  return (
    <dialog
      ref={dialogRef}
      className={styles.detailDialog}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
    >
      <form onSubmit={onSave} className={styles.detailForm}>
        <header className={styles.detailHead}>
          <button
            type="button"
            className={`${styles.todoCheckbox} ${done ? styles.todoCheckboxDone : ""}`}
            onClick={() => setDone((v) => !v)}
            aria-label={done ? "Mark not done" : "Mark done"}
          >
            {done && (
              <svg
                width="12"
                height="12"
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
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.detailTitle}
            placeholder="Task title"
            maxLength={240}
            required
            disabled={pending}
          />
          <button
            type="button"
            className={styles.detailClose}
            onClick={onClose}
            aria-label="Close"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6L6 18" />
              <path d="M6 6l12 12" />
            </svg>
          </button>
        </header>

        <label className={styles.detailFieldLabel} htmlFor="detail-desc">
          Description
        </label>
        <textarea
          id="detail-desc"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.detailDesc}
          placeholder="Add a description…"
          rows={6}
          disabled={pending}
        />

        <div className={styles.detailRow}>
          <div className={styles.detailRowField}>
            <label
              className={styles.detailFieldLabel}
              htmlFor="detail-group"
            >
              Group
            </label>
            <select
              id="detail-group"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className={styles.detailSelect}
              disabled={pending}
            >
              {groups.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.detailRowField}>
            <label
              className={styles.detailFieldLabel}
              htmlFor="detail-date"
            >
              Due date
            </label>
            <input
              id="detail-date"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className={styles.detailDate}
              disabled={pending}
            />
          </div>
        </div>

        {error && <p className={styles.detailError}>{error}</p>}

        <footer className={styles.detailFoot}>
          <button
            type="button"
            className={styles.detailDelete}
            onClick={onDelete}
            disabled={pending}
          >
            Delete
          </button>
          <div className={styles.detailFootRight}>
            <button
              type="button"
              className={styles.detailCancel}
              onClick={onClose}
              disabled={pending}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.detailSave}
              disabled={pending}
            >
              {pending ? "Saving…" : "Save"}
            </button>
          </div>
        </footer>
      </form>
    </dialog>
  );
}
