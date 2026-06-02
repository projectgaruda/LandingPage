"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { createTodo } from "@/app/actions/todos";
import { notify } from "./toastHelpers";
import styles from "./page.module.css";

type Props = {
  groups: readonly string[];
  defaultGroup: string;
};

export default function TodoComposer({ groups, defaultGroup }: Props) {
  const [pending, startTransition] = useTransition();
  const [active, setActive] = useState(false);
  const [group, setGroup] = useState(defaultGroup);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const titleRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setGroup(defaultGroup);
  }, [defaultGroup]);

  useEffect(() => {
    if (active) titleRef.current?.focus();
  }, [active]);

  function close() {
    formRef.current?.reset();
    setActive(false);
    setGroup(defaultGroup);
    setError(null);
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const title = (fd.get("title") as string)?.trim();
    if (!title) return;
    fd.set("group_name", group);
    const tid = notify.loading("Adding task…");
    startTransition(async () => {
      try {
        await createTodo(fd);
        notify.success("Task added", tid);
        form.reset();
        setActive(false);
        setGroup(defaultGroup);
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Couldn't add task.";
        notify.error(msg, tid);
        setError(msg);
      }
    });
  }

  if (!active) {
    return (
      <button
        type="button"
        className={styles.addButton}
        onClick={() => setActive(true)}
      >
        <span className={styles.addButtonPlus} aria-hidden="true">
          +
        </span>
        Add task
      </button>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      className={styles.todoComposer}
      aria-label="Add a task"
    >
      <input
        ref={titleRef}
        type="text"
        name="title"
        className={styles.todoComposerInput}
        placeholder="Task title…"
        maxLength={240}
        required
        disabled={pending}
      />
      <textarea
        name="description"
        className={styles.todoComposerDesc}
        placeholder="Description (optional)…"
        rows={2}
        disabled={pending}
      />
      <div className={styles.todoComposerOptions}>
        <label className={styles.todoComposerFieldLabel}>
          Group
          <select
            className={styles.todoComposerSelect}
            value={group}
            onChange={(e) => setGroup(e.target.value)}
            disabled={pending}
          >
            {groups.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.todoComposerFieldLabel}>
          Due
          <input
            type="date"
            name="deadline"
            className={styles.todoComposerDateInput}
            disabled={pending}
          />
        </label>
      </div>
      <div className={styles.composerFoot}>
        {error && <span className={styles.composerError}>{error}</span>}
        <button
          type="button"
          className={styles.composerCancel}
          onClick={close}
          disabled={pending}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={styles.composerSave}
          disabled={pending}
        >
          {pending ? "Adding…" : "Add task"}
        </button>
      </div>
    </form>
  );
}
