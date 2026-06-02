import { redirect } from "next/navigation";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { deleteAnnouncement } from "@/app/actions/announcements";
import AnnouncementComposer from "./AnnouncementComposer";
import GroupSwitcher from "./GroupSwitcher";
import TodoColumn from "./TodoColumn";
import TodoComposer from "./TodoComposer";
import TodoItem, { type Todo } from "./TodoItem";
import BuildProgressComposer from "./BuildProgressComposer";
import BuildProgressItem, {
  type BuildProgress,
} from "./BuildProgressItem";
import EventEditor, { type EventRow } from "./EventEditor";
import Toaster from "./Toaster";
import styles from "./page.module.css";

const ADMIN_EMAIL = "projectgarudarv@gmail.com";

// Edit these to rename / add / remove groups.
const GROUPS = ["Mechanical", "Electrical", "Operations"] as const;
type Group = (typeof GROUPS)[number];

const TARGET_EVENT = {
  name: "Shell Eco-marathon ",
  date: new Date("2027-00-00"),//in YYYY/MM/DD format
};

type AnnouncementRow = {
  id: string;
  body: string;
  author_id: string;
  created_at: string;
  author: { full_name: string | null; avatar_url: string | null } | null;
};

function formatRelative(iso: string): string {
  const now = Date.now();
  const t = new Date(iso).getTime();
  const sec = Math.max(0, Math.round((now - t) / 1000));
  if (sec < 60) return "just now";
  const min = Math.round(sec / 60);
  if (min < 60) return `${min}m ago`;
  const hr = Math.round(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const day = Math.round(hr / 24);
  if (day < 30) return `${day}d ago`;
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
}

function daysUntil(target: Date): number {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const t = new Date(target);
  t.setHours(0, 0, 0, 0);
  return Math.max(0, Math.round((t.getTime() - now.getTime()) / 86400000));
}

type SearchParams = Promise<{ group?: string }>;

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { group: groupParam } = await searchParams;
  const activeGroup: Group = (GROUPS as readonly string[]).includes(
    groupParam ?? "",
  )
    ? (groupParam as Group)
    : GROUPS[0];

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, avatar_url, profile_completed")
    .eq("id", user.id)
    .single();
  if (!profile?.profile_completed) redirect("/profile/setup");

  const isAdmin = user.email === ADMIN_EMAIL;

  const { data: announcements } = await supabase
    .from("announcements")
    .select(
      `id, body, author_id, created_at, author:profiles!announcements_author_id_fkey(full_name, avatar_url)`,
    )
    .order("created_at", { ascending: false })
    .limit(5);

  const annList = (announcements ?? []) as unknown as AnnouncementRow[];

  // Todos for this group
  const { data: allTodos } = await supabase
    .from("todos")
    .select("id, title, description, done, deadline, group_name")
    .eq("group_name", activeGroup)
    .order("done", { ascending: true })
    .order("position", { ascending: false })
    .order("created_at", { ascending: false });

  const todos = (allTodos ?? []) as Todo[];
  const pending = todos.filter((t) => !t.done);
  const done = todos.filter((t) => t.done);

  // Build progress for this group
  const { data: bpData } = await supabase
    .from("build_progress")
    .select("id, title, description, group_name, todo_ids")
    .eq("group_name", activeGroup)
    .order("position", { ascending: false });
  const buildProgress = (bpData ?? []) as BuildProgress[];

  // Open-task counts across all groups for the switcher dropdown
  const { data: countsRaw } = await supabase
    .from("todos")
    .select("group_name")
    .eq("done", false);

  const counts: Record<string, number> = {};
  for (const g of GROUPS) counts[g] = 0;
  if (countsRaw) {
    for (const row of countsRaw as { group_name: string | null }[]) {
      if (row.group_name && row.group_name in counts) {
        counts[row.group_name] += 1;
      }
    }
  }

  // Events
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayISO = today.toISOString().slice(0, 10);
  const { data: eventRows } = await supabase
    .from("events")
    .select("id, label, event_date, tag")
    .gte("event_date", todayISO)
    .order("event_date", { ascending: true });
  const events = (eventRows ?? []) as EventRow[];

  const eventDays = daysUntil(TARGET_EVENT.date);
  const targetDateStr = TARGET_EVENT.date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const firstName = (profile.full_name ?? "Member").split(/\s+/)[0];

  return (
    <div className={styles.page}>
      <div className="container">
        {/* ===== Top strip ===== */}
        <header className={styles.top}>
          <div className={styles.greeting}>
            <h1 className={styles.hello}>
              Hello, <span className={styles.helloName}>{firstName}</span>.
            </h1>
            <p className={styles.helloSub}>
              {pending.length === 0
                ? "nothing on the list"
                : `${pending.length} open in ${activeGroup}`}
            </p>
          </div>

          <aside className={styles.targetBox} aria-label="Target event">
            <span className={styles.targetLabel}>Target Event</span>
            <span className={styles.targetName}>{TARGET_EVENT.name}</span>
            <span className={styles.targetMeta}>
              <span>{targetDateStr}</span>
              <span className={styles.targetMetaSep}>·</span>
              <span className={styles.targetDays}>{eventDays} days</span>
            </span>
          </aside>
        </header>

        {/* ===== Announcement banner ===== */}
        <section className={styles.announceBanner} aria-label="Announcements">
          {annList.length > 0 && (
            <div className={styles.announceList}>
              {annList.map((a) => {
                const isAuthor = a.author_id === user.id;
                const canDelete = isAdmin || isAuthor;
                return (
                  <div key={a.id} className={styles.announce}>
                    <span className={styles.announceDot} aria-hidden="true" />
                    <p className={styles.announceText}>{a.body}</p>
                    <span className={styles.announceMeta}>
                      <span>{a.author?.full_name ?? "Member"}</span>
                      <span className={styles.announceMetaSep}>·</span>
                      <span>{formatRelative(a.created_at)}</span>
                    </span>
                    {canDelete && (
                      <form
                        action={deleteAnnouncement}
                        className={styles.announceDeleteForm}
                      >
                        <input type="hidden" name="id" value={a.id} />
                        <button
                          type="submit"
                          className={styles.announceDelete}
                          aria-label="Remove announcement"
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
                      </form>
                    )}
                  </div>
                );
              })}
            </div>
          )}
          <AnnouncementComposer />
        </section>

        {/* ===== Group switcher (hidden by default) ===== */}
        <div className={styles.switcherRow}>
          <Suspense fallback={<div className={styles.switcherFallback} />}>
            <GroupSwitcher
              groups={GROUPS}
              active={activeGroup}
              counts={counts}
            />
          </Suspense>
          <p className={styles.switcherHint}>
            Drag tasks between Todo and Done.
          </p>
        </div>

        {/* ===== Three columns: Todo | Done | Build Progress ===== */}
        <section className={styles.board} aria-label="Task board">
          <TodoColumn state="todo" title="Todo" count={pending.length}>
            <TodoComposer groups={GROUPS} defaultGroup={activeGroup} />

            {pending.length === 0 ? (
              <p className={styles.empty}>Empty. Add a task above.</p>
            ) : (
              <ul className={styles.todoList}>
                {pending.map((t) => (
                  <TodoItem key={t.id} todo={t} groups={GROUPS} />
                ))}
              </ul>
            )}
          </TodoColumn>

          <TodoColumn state="done" title="Done" count={done.length}>
            {done.length === 0 ? (
              <p className={styles.empty}>
                Drag a task here when complete.
              </p>
            ) : (
              <ul className={styles.todoList}>
                {done.map((t) => (
                  <TodoItem key={t.id} todo={t} groups={GROUPS} />
                ))}
              </ul>
            )}
          </TodoColumn>

          <div className={styles.column}>
            <div className={styles.columnHead}>
              <h2 className={styles.columnTitle}>Build Progress</h2>
              <span className={styles.columnCount}>{buildProgress.length}</span>
            </div>

            <BuildProgressComposer
              groups={GROUPS}
              defaultGroup={activeGroup}
            />

            {buildProgress.length === 0 ? (
              <p className={styles.empty}>
                Add a milestone, then link the tasks that finish it.
              </p>
            ) : (
              <ul className={styles.bpList}>
                {buildProgress.map((bp) => (
                  <BuildProgressItem
                    key={bp.id}
                    item={bp}
                    groups={GROUPS}
                    groupTodos={todos}
                  />
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* ===== Upcoming events (editable) ===== */}
        <EventEditor events={events} />

        <Toaster />
      </div>
    </div>
  );
}
