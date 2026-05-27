"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import styles from "./page.module.css";

const BRANCHES = [
  "Mechanical", "Aerospace", "ECE", "CSE", "ISE", "EEE",
  "Civil", "Chemical", "Biotech", "IEM", "ETE", "Other",
];

export default function ProfileSetupPage() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");

  const [usn, setUsn] = useState("");
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");

  // On mount: redirect if not logged in or already completed
  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      setEmail(user.email ?? "");

      const { data: profile } = await supabase
        .from("profiles")
        .select("profile_completed, usn, branch, semester")
        .eq("id", user.id)
        .single();

      if (profile?.profile_completed) {
        router.push("/dashboard");
        return;
      }
      if (profile) {
        setUsn(profile.usn ?? "");
        setBranch(profile.branch ?? "");
        setSemester(profile.semester?.toString() ?? "");
      }
      setChecking(false);
    })();
  }, [router, supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push("/login");
      return;
    }

    const { error } = await supabase
      .from("profiles")
      .update({
        usn: usn.trim().toUpperCase(),
        branch,
        semester: parseInt(semester),
        profile_completed: true,
      })
      .eq("id", user.id);

    if (error) {
      // Handle duplicate USN nicely
      if (error.code === "23505") {
        setError("This USN is already registered. Contact admin if this is a mistake.");
      } else {
        setError(error.message);
      }
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  };

  if (checking) {
    return <div className={styles.page}><div className="container"><p>Loading...</p></div></div>;
  }

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.cardWrap}>
          <div className={`card ${styles.card}`}>
            <div className={styles.header}>
              <h1 className={styles.title}>Complete Your Profile</h1>
              <p className={styles.subtitle}>
                Signed in as <strong>{email}</strong>
              </p>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
              {error && <div className={styles.error}>{error}</div>}

              <div className="form-group">
                <label className="form-label">USN</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="1RV22ME000"
                  value={usn}
                  onChange={(e) => setUsn(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Branch</label>
                <select
                  className="form-input"
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  required
                >
                  <option value="">Select branch</option>
                  {BRANCHES.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Semester</label>
                <select
                  className="form-input"
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  required
                >
                  <option value="">Select semester</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                    <option key={s} value={s}>Semester {s}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="btn-primary"
                disabled={loading}
                style={{ width: "100%", justifyContent: "center", marginTop: "1rem" }}
              >
                {loading ? "Saving..." : "Save & Continue →"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}