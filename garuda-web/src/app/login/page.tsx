"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.css";

export default function LoginPage() {
  const [usn, setUsn] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // Just for display/context in login
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      usn,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid USN or Password. Please try again.");
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.loginCardWrap}>
          <div className={`card ${styles.loginCard}`}>
            <div className={styles.header}>
              <div className={styles.logo}>⬡</div>
              <h1 className={styles.title}>Student Portal</h1>
              <p className={styles.subtitle}>Enter your credentials to access your dashboard</p>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
              {error && <div className={styles.error}>{error}</div>}

              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Enter your name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label">USN</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="1RV21ME000" 
                  value={usn} 
                  onChange={(e) => setUsn(e.target.value)} 
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <input 
                  type="password" 
                  className="form-input" 
                  placeholder="••••••••" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
              </div>

              <button 
                type="submit" 
                className="btn-primary" 
                disabled={loading}
                style={{ width: "100%", justifyContent: "center", marginTop: "1rem" }}
              >
                {loading ? "Authenticating..." : "Login →"}
              </button>
            </form>

            <div className={styles.footer}>
              <p>Problems logging in? <Link href="/contact" className={styles.link}>Contact Admin</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
