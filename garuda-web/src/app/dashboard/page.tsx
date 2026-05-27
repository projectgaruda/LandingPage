import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "./LogoutButton";
import styles from "./page.module.css";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile?.profile_completed) {
    redirect("/profile/setup");
  }

  return (
    <div className={styles.page}>
      <div className="container">
        {/* Profile header */}
        <div className={`card ${styles.profileCard}`}>
          <div className={styles.profileLeft}>
            {profile.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt={profile.full_name ?? "avatar"}
                className={styles.avatar}
              />
            ) : (
              <div className={styles.avatarPlaceholder}>
                {(profile.full_name ?? "?")[0].toUpperCase()}
              </div>
            )}
            <div>
              <h1 className={styles.name}>{profile.full_name ?? "Member"}</h1>
              <div className={styles.meta}>
                <span className={styles.badge}>{profile.role}</span>
                <span className={styles.badge}>{profile.user_type}</span>
                {profile.usn && <span className={styles.usn}>{profile.usn}</span>}
              </div>
              <p className={styles.subtle}>
                {profile.branch} · Semester {profile.semester}
              </p>
            </div>
          </div>
          <LogoutButton />
        </div>

         {/* Blog link */}
        <div className={`card ${styles.section}`}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Blog</h2>
            <a href="/blog" className="btn-secondary">View all posts →</a>
          </div>
          <p className={styles.empty}>
            Share updates, photos, and ideas with the team.
          </p>
        </div>
      </div>
    </div>
  );
}