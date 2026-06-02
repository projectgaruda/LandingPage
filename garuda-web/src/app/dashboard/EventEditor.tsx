"use client";

import { useRef, useState, useTransition } from "react";
import { createEvent, deleteEvent } from "@/app/actions/events";
import { notify } from "./toastHelpers";
import styles from "./page.module.css";

export type EventRow = {
  id: string;
  label: string;
  event_date: string; // YYYY-MM-DD
  tag: string | null;
};

const TAGS = ["Internal", "Testing", "Deadline", "Competition"];

type Props = {
  events: EventRow[];
};

function formatDate(iso: string) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

export default function EventEditor({ events }: Props) {
  const [pending, startTransition] = useTransition();
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  function onAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const fd = new FormData(form);
    if (!(fd.get("label") as string)?.trim()) return;
    if (!(fd.get("event_date") as string)?.trim()) return;
    const tid = notify.loading("Adding event…");
    startTransition(async () => {
      try {
        await createEvent(fd);
        notify.success("Event added", tid);
        form.reset();
        setAdding(false);
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Couldn't add event.";
        notify.error(msg, tid);
        setError(msg);
      }
    });
  }

  function onDelete(id: string) {
    if (!confirm("Delete this event?")) return;
    const fd = new FormData();
    fd.append("id", id);
    const tid = notify.loading("Deleting event…");
    startTransition(async () => {
      try {
        await deleteEvent(fd);
        notify.success("Deleted", tid);
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Couldn't delete event.";
        notify.error(msg, tid);
      }
    });
  }

  return (
    <section className={styles.events} aria-label="Upcoming events">
      <header className={styles.eventsHead}>
        <h2 className={styles.eventsTitle}>Upcoming</h2>
        {!adding && (
          <button
            type="button"
            className={styles.eventAddToggle}
            onClick={() => setAdding(true)}
          >
            + Add event
          </button>
        )}
      </header>

      {adding && (
        <form
          ref={formRef}
          onSubmit={onAdd}
          className={styles.eventForm}
          aria-label="Add event"
        >
          <input
            type="date"
            name="event_date"
            className={styles.eventFormDate}
            required
            disabled={pending}
          />
          <input
            type="text"
            name="label"
            className={styles.eventFormLabel}
            placeholder="Event name…"
            maxLength={200}
            required
            disabled={pending}
          />
          <select
            name="tag"
            className={styles.eventFormTag}
            defaultValue="Internal"
            disabled={pending}
          >
            {TAGS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <div className={styles.eventFormActions}>
            <button
              type="button"
              className={styles.eventFormCancel}
              onClick={() => {
                setAdding(false);
                setError(null);
                formRef.current?.reset();
              }}
              disabled={pending}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.eventFormSave}
              disabled={pending}
            >
              {pending ? "…" : "Add"}
            </button>
          </div>
          {error && (
            <span className={styles.eventFormError}>{error}</span>
          )}
        </form>
      )}

      {events.length === 0 ? (
        <p className={styles.empty}>No upcoming events. Add one above.</p>
      ) : (
        <ul className={styles.eventsList}>
          {events.map((ev) => (
            <li key={ev.id} className={styles.eventRow}>
              <span className={styles.eventDate}>
                {formatDate(ev.event_date)}
              </span>
              <span className={styles.eventLabel}>{ev.label}</span>
              {ev.tag ? (
                <span
                  className={`${styles.eventTag} ${styles[`eventTag_${ev.tag}`] ?? ""}`}
                >
                  {ev.tag}
                </span>
              ) : (
                <span />
              )}
              <button
                type="button"
                className={styles.eventDelete}
                onClick={() => onDelete(ev.id)}
                disabled={pending}
                aria-label={`Delete ${ev.label}`}
              >
                <svg
                  width="14"
                  height="14"
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
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
