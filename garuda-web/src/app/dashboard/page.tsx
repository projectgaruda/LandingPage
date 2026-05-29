import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import styles from "./page.module.css";

const BUILD_STAGES = [
  { label: "Concept Design", done: true },
  { label: "Detailed Design", done: true },
  { label: "Fabrication", done: false },
  { label: "Testing & Tuning", done: false },
  { label: "Competition", done: false },
];

const RESOURCES = [
  { label: "CAD Repository", href: "#" },
  { label: "Component Specs Sheet", href: "#" },
  { label: "Budget Tracker", href: "#" },
  { label: "Competition Rulebook", href: "#" },
  { label: "Meeting Notes Archive", href: "#" },
];

const EVENTS = [
  { date: new Date("2026-06-07"), display: "Jun 7", label: "Suspension review session", tag: "Internal" },
  { date: new Date("2026-06-14"), display: "Jun 14", label: "Battery pack stress test", tag: "Testing" },
  { date: new Date("2026-07-01"), display: "Jul 1", label: "Documentation submission deadline", tag: "Deadline" },
  { date: new Date("2026-10-12"), display: "Oct 12", label: "Shell Eco-Marathon Asia 2026", tag: "Competition" },
];

const ANNOUNCEMENTS = [
  { text: "Next full-team meeting: Saturday 10 AM, Workshop Bay 3", time: "Today" },
  { text: "Motor controller datasheets uploaded to CAD repo — review before Friday", time: "Yesterday" },
  { text: "Shell Eco-Marathon registration deadline: confirm attendance ASAP", time: "2 days ago" },
];

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile?.profile_completed) redirect("/profile/setup");

  const [{ count: memberCount }, { count: postCount }, { data: recentPosts }] =
    await Promise.all([
      supabase.from("profiles").select("id", { count: "exact", head: true }).eq("profile_completed", true),
      supabase.from("posts").select("id", { count: "exact", head: true }),
      supabase
        .from("posts")
        .select(`id, title, created_at, author:profiles!posts_author_id_fkey(full_name, avatar_url)`)
        .order("created_at", { ascending: false })
        .limit(4),
    ]);

  // Compute countdown to next event
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const nextEvent = EVENTS.find(e => e.date >= today) ?? EVENTS[EVENTS.length - 1];
  const msUntil = nextEvent.date.getTime() - today.getTime();
  const daysUntil = Math.max(0, Math.ceil(msUntil / (1000 * 60 * 60 * 24)));

  return (
    <div className={styles.page}>
      <div className="container">

        {/* Welcome bar */}
        <div className={styles.welcomeBar}>
          <div className={styles.welcomeLeft}>
            {profile.avatar_url ? (
              <img src={profile.avatar_url} alt="" className={styles.welcomeAvatar} />
            ) : (
              <div className={styles.welcomeAvatarInitials}>
                {(profile.full_name ?? "M")[0].toUpperCase()}
              </div>
            )}
            <div className={styles.welcomeText}>
              <span className={styles.welcomeLabel}>Welcome back</span>
              <h1 className={styles.welcomeName}>{profile.full_name ?? "Member"}</h1>
              <p className={styles.welcomeSub}>
                {profile.branch} · Sem {profile.semester} ·{" "}
                <span className={styles.roleTag}>{profile.role ?? profile.user_type}</span>
              </p>
            </div>
          </div>
          <Link href="/profile/settings" className={styles.editProfileBtn}>
            Edit Profile
          </Link>
        </div>

        {/* Stats row */}
        <div className={styles.statsRow}>
          {[
            { value: memberCount ?? 0, label: "Team Members" },
            { value: postCount ?? 0, label: "Blog Posts" },
            { value: "SEM 25", label: "Target Event" },
            { value: "EV Mk.3", label: "Current Build" },
          ].map((s) => (
            <div key={s.label} className={styles.statCard}>
              <div className={styles.statValue}>{s.value}</div>
              <div className={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Countdown banner */}
        <div className={`${styles.countdown} ${nextEvent.tag === "Competition" ? styles.countdownCompetition : nextEvent.tag === "Deadline" ? styles.countdownDeadline : ""}`}>
          <div className={styles.countdownLeft}>
            <span className={styles.countdownTag}>{nextEvent.tag}</span>
            <span className={styles.countdownLabel}>{nextEvent.label}</span>
            <span className={styles.countdownDate}>{nextEvent.display}</span>
          </div>
          <div className={styles.countdownRight}>
            <span className={styles.countdownDays}>{daysUntil}</span>
            <span className={styles.countdownUnit}>days away</span>
          </div>
        </div>

        {/* Main grid */}
        <div className={styles.mainGrid}>

          {/* Left column */}
          <div className={styles.col}>

            {/* Announcements */}
            <div className={styles.section}>
              <div className={styles.sectionHead}>
                <h2 className={styles.sectionTitle}>Announcements</h2>
                <span className={styles.sectionBadge}>Pinned by leads</span>
              </div>
              <div className={styles.announcements}>
                {ANNOUNCEMENTS.map((a) => (
                  <div key={a.text} className={styles.announcementItem}>
                    <span className={styles.announceDot} />
                    <div>
                      <p className={styles.announceText}>{a.text}</p>
                      <span className={styles.announceTime}>{a.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming events */}
            <div className={styles.section}>
              <div className={styles.sectionHead}>
                <h2 className={styles.sectionTitle}>Upcoming Events</h2>
              </div>
              <div className={styles.events}>
                {EVENTS.map((ev) => {
                  const isPast = ev.date < today;
                  const isNext = ev === nextEvent;
                  return (
                    <div key={ev.label} className={`${styles.eventItem} ${isPast ? styles.eventPast : ""} ${isNext ? styles.eventNext : ""}`}>
                      <div className={styles.eventDate}>{ev.display}</div>
                      <div className={styles.eventBody}>
                        <span className={styles.eventLabel}>{ev.label}</span>
                        <span className={`${styles.eventTag} ${styles[`tag${ev.tag}`]}`}>{ev.tag}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right column */}
          <div className={styles.col}>

            {/* Quick actions */}
            <div className={styles.section}>
              <h2 className={`${styles.sectionTitle} ${styles.sectionTitleSpaced}`}>Quick Actions</h2>
              <div className={styles.quickActions}>
                <Link href="/blog/new" className="btn-primary">Write Post</Link>
                <Link href="/blog" className="btn-outline">Read Blog</Link>
                <Link href="/profile/settings" className="btn-outline">Edit Profile</Link>
              </div>
            </div>

            {/* Recent blog posts */}
            <div className={styles.section}>
              <div className={styles.sectionHead}>
                <h2 className={styles.sectionTitle}>Recent Posts</h2>
                <Link href="/blog" className={styles.seeAll}>See all</Link>
              </div>
              {!recentPosts || recentPosts.length === 0 ? (
                <p className={styles.empty}>No posts yet.</p>
              ) : (
                <div className={styles.postList}>
                  {recentPosts.map((p: any) => (
                    <Link key={p.id} href={`/blog/${p.id}`} className={styles.postItem}>
                      <div className={styles.postItemInner}>
                        {p.author?.avatar_url ? (
                          <img src={p.author.avatar_url} alt="" className={styles.postAvatar} />
                        ) : (
                          <div className={styles.postAvatarInitials}>
                            {(p.author?.full_name ?? "?")[0].toUpperCase()}
                          </div>
                        )}
                        <div>
                          <p className={styles.postItemTitle}>{p.title}</p>
                          <p className={styles.postItemMeta}>
                            {p.author?.full_name} ·{" "}
                            {new Date(p.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
              <Link href="/blog/new" className={`btn-primary ${styles.newPostBtn}`}>
                + Write a Post
              </Link>
            </div>

            {/* Resources */}
            <div className={styles.section}>
              <div className={styles.sectionHead}>
                <h2 className={styles.sectionTitle}>Resources</h2>
                <span className={styles.sectionBadge}>Managed by leads</span>
              </div>
              <div className={styles.resourceList}>
                {RESOURCES.map((r) => (
                  <a key={r.label} href={r.href} className={styles.resourceItem}>
                    <span className={styles.resourceLabel}>{r.label}</span>
                    <span className={styles.resourceArrow}>→</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Build progress */}
            <div className={styles.section}>
              <div className={styles.sectionHead}>
                <h2 className={styles.sectionTitle}>Build Progress — EV Mk.3</h2>
                <span className={styles.sectionBadge}>2 / 5 complete</span>
              </div>
              <div className={styles.buildTrack}>
                {BUILD_STAGES.map((stage, i) => (
                  <div key={stage.label} className={styles.buildStep}>
                    <div className={`${styles.stepDot} ${stage.done ? styles.stepDone : i === 2 ? styles.stepActive : ""}`}>
                      {stage.done ? "✓" : i + 1}
                    </div>
                    {i < BUILD_STAGES.length - 1 && (
                      <div className={`${styles.stepLine} ${stage.done ? styles.stepLineDone : ""}`} />
                    )}
                    <span className={`${styles.stepLabel} ${stage.done ? styles.stepLabelDone : i === 2 ? styles.stepLabelActive : ""}`}>
                      {stage.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
