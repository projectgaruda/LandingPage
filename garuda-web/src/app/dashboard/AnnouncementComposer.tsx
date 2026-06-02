"use client";

import { useRef, useState, useTransition } from "react";
import { createAnnouncement } from "@/app/actions/announcements";
import { notify } from "./toastHelpers";
import styles from "./page.module.css";

export default function AnnouncementComposer() {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const body = (fd.get("body") as string)?.trim();
    if (!body) return;
    const tid = notify.loading("Posting…");
    startTransition(async () => {
      try {
        await createAnnouncement(fd);
        notify.success("Posted", tid);
        form.reset();
        setOpen(false);
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Couldn't post.";
        notify.error(msg, tid);
        setError(msg);
      }
    });
  }

  if (!open) {
    return (
      <button
        type="button"
        className={styles.composerToggle}
        onClick={() => setOpen(true)}
      >
        <span className={styles.composerPlus} aria-hidden="true">
          +
        </span>
        Post announcement
      </button>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      className={styles.composer}
      aria-label="Post an announcement"
    >
      <textarea
        name="body"
        className={styles.composerInput}
        placeholder="What's the announcement? (max 500 chars)"
        rows={2}
        maxLength={500}
        required
        autoFocus
        disabled={pending}
      />
      <div className={styles.composerActions}>
        {error && <span className={styles.composerError}>{error}</span>}
        <button
          type="button"
          className={styles.composerCancel}
          onClick={() => {
            setOpen(false);
            setError(null);
          }}
          disabled={pending}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={styles.composerSubmit}
          disabled={pending}
        >
          {pending ? "Posting…" : "Post"}
        </button>
      </div>
    </form>
  );
}
