"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import {
  deleteBuildProgress,
  updateBuildProgress,
} from "@/app/actions/build_progress";
import { notify } from "./toastHelpers";
import type { BuildProgress } from "./BuildProgressItem";
import type { Todo } from "./TodoItem";
import styles from "./page.module.css";

type Props = {
  item: BuildProgress;
  groups: readonly string[];
  groupTodos: Todo[];
  open: boolean;
  onClose: () => void;
};

export default function BuildProgressDetail({
  item,
  groups,
  groupTodos,
  open,
  onClose,
}: Props) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description ?? "");
  const [groupName, setGroupName] = useState(
    item.group_name ?? groups[0] ?? "",
  );
  const [selectedIds, setSelectedIds] = useState<string[]>(item.todo_ids);

  useEffect(() => {
    setTitle(item.title);
    setDescription(item.description ?? "");
    setGroupName(item.group_name ?? groups[0] ?? "");
    setSelectedIds(item.todo_ids);
  }, [item, groups]);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  function toggle(id: string) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  function onSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData();
    fd.append("id", item.id);
    fd.append("title", title);
    fd.append("description", description);
    fd.append("group_name", groupName);
    fd.append("todo_ids", JSON.stringify(selectedIds));

    const tid = notify.loading("Saving milestone…");
    startTransition(async () => {
      try {
        await updateBuildProgress(fd);
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
    if (!confirm("Delete this milestone?")) return;
    const fd = new FormData();
    fd.append("id", item.id);
    const tid = notify.loading("Deleting milestone…");
    startTransition(async () => {
      try {
        await deleteBuildProgress(fd);
        notify.success("Deleted", tid);
        onClose();
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Couldn't delete.";
        notify.error(msg, tid);
        setError(msg);
      }
    });
  }

  // Sort todos: pending first, then done
  const sortedTodos = [...groupTodos].sort((a, b) => {
    if (a.done === b.done) return 0;
    return a.done ? 1 : -1;
  });

  const linkedCount = selectedIds.length;
  const doneCount = sortedTodos.filter(
    (t) => selectedIds.includes(t.id) && t.done,
  ).length;

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
          <span className={styles.bpDetailIcon} aria-hidden="true">
            ◐
          </span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.detailTitle}
            placeholder="Milestone title"
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

        <label className={styles.detailFieldLabel} htmlFor="bp-desc">
          Description
        </label>
        <textarea
          id="bp-desc"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.detailDesc}
          placeholder="What does this milestone cover…"
          rows={4}
          disabled={pending}
        />

        <div className={styles.detailRow}>
          <div className={styles.detailRowField}>
            <label className={styles.detailFieldLabel} htmlFor="bp-group">
              Group
            </label>
            <select
              id="bp-group"
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
            <label className={styles.detailFieldLabel}>Progress</label>
            <span className={styles.bpDetailProgress}>
              {linkedCount === 0
                ? "no linked tasks"
                : `${doneCount}/${linkedCount} done`}
            </span>
          </div>
        </div>

        <label className={styles.detailFieldLabel}>
          Linked tasks ({groupName})
        </label>
        <div className={styles.bpLinker}>
          {sortedTodos.length === 0 ? (
            <p className={styles.empty}>
              No tasks in this group yet. Add tasks first.
            </p>
          ) : (
            sortedTodos.map((t) => {
              const checked = selectedIds.includes(t.id);
              return (
                <label
                  key={t.id}
                  className={`${styles.bpLinkRow} ${t.done ? styles.bpLinkRowDone : ""}`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggle(t.id)}
                    disabled={pending}
                  />
                  <span className={styles.bpLinkTitle}>{t.title}</span>
                  {t.done && (
                    <span className={styles.bpLinkDoneTag}>done</span>
                  )}
                </label>
              );
            })
          )}
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
