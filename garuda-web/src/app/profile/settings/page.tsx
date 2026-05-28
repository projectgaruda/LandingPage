"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import styles from "./page.module.css";

const BRANCHES = [
  "Mechanical", "Aerospace", "ECE", "CSE", "ISE", "EEE",
  "Civil", "Chemical", "Biotech", "IEM", "ETE", "Other",
];

export default function ProfileSettingsPage() {
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const [fullName, setFullName] = useState("");
  const [usn, setUsn] = useState("");
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");
  const [blogBannerUrl, setBlogBannerUrl] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }

      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, usn, branch, semester, blog_banner_url, avatar_url, profile_completed")
        .eq("id", user.id)
        .single();

      if (!profile?.profile_completed) { router.push("/profile/setup"); return; }

      setFullName(profile.full_name ?? "");
      setUsn(profile.usn ?? "");
      setBranch(profile.branch ?? "");
      setSemester(profile.semester?.toString() ?? "");
      setBlogBannerUrl(profile.blog_banner_url ?? "");
      setAvatarUrl(profile.avatar_url ?? "");
      setChecking(false);
    })();
  }, [router, supabase]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSaved(false);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/login"); return; }

    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        full_name: fullName.trim() || null,
        usn: usn.trim().toUpperCase() || null,
        branch: branch || null,
        semester: semester ? parseInt(semester) : null,
        blog_banner_url: blogBannerUrl.trim() || null,
      })
      .eq("id", user.id);

    if (updateError) {
      if (updateError.code === "23505") {
        setError("That USN is already registered — contact admin if this is a mistake.");
      } else {
        setError(updateError.message);
      }
    } else {
      setSaved(true);
      router.refresh();
    }

    setLoading(false);
  };

  if (checking) {
    return (
      <div className={styles.page}>
        <div className="container"><p className={styles.loading}>Loading…</p></div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.wrap}>
          <div className={styles.header}>
            <h1 className={styles.title}>Profile Settings</h1>
            <p className={styles.subtitle}>Update your info and blog banner.</p>
          </div>

          {/* Avatar preview */}
          {avatarUrl && (
            <div className={styles.avatarRow}>
              <img src={avatarUrl} alt="Your avatar" className={styles.avatar} />
              <span className={styles.avatarNote}>
                Avatar is synced from Google — change it in your Google account.
              </span>
            </div>
          )}

          <form className={styles.form} onSubmit={handleSubmit}>
            {error && <div className={styles.error}>{error}</div>}
            {saved && <div className={styles.success}>Settings saved!</div>}

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Personal Info</h2>

              <div className="form-group">
                <label className="form-label" htmlFor="full-name">Display Name</label>
                <input
                  id="full-name"
                  type="text"
                  className="form-input"
                  placeholder="Your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="usn">USN</label>
                <input
                  id="usn"
                  type="text"
                  className="form-input"
                  placeholder="1RV22ME000"
                  value={usn}
                  onChange={(e) => setUsn(e.target.value)}
                />
              </div>

              <div className={styles.row}>
                <div className="form-group">
                  <label className="form-label" htmlFor="branch">Branch</label>
                  <select
                    id="branch"
                    className="form-input"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                  >
                    <option value="">Select branch</option>
                    {BRANCHES.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="semester">Semester</label>
                  <select
                    id="semester"
                    className="form-input"
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                  >
                    <option value="">Select semester</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                      <option key={s} value={s}>Semester {s}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Blog Banner</h2>
              <p className={styles.sectionDesc}>
                This image appears as the header on your blog posts when no cover image is uploaded.
                Use a public image URL (e.g. from Unsplash or your own host).
              </p>

              <div className="form-group">
                <label className="form-label" htmlFor="blog-banner">Banner Image URL</label>
                <input
                  id="blog-banner"
                  type="url"
                  className="form-input"
                  placeholder="https://example.com/your-banner.jpg"
                  value={blogBannerUrl}
                  onChange={(e) => setBlogBannerUrl(e.target.value)}
                />
              </div>

              {blogBannerUrl && (
                <div className={styles.bannerPreview}>
                  <img src={blogBannerUrl} alt="Banner preview" className={styles.bannerImg} />
                </div>
              )}
            </div>

            <div className={styles.actions}>
              <button
                type="button"
                className="btn-outline"
                onClick={() => router.back()}
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? "Saving…" : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
