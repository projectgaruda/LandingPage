"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { signOut } from "@/app/actions/auth";
import ThemeToggle from "./ThemeToggle";
import styles from "./Navbar.module.css";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/builds", label: "Previous Builds" },
  { href: "/gallery", label: "Gallery" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/contact", label: "Contact" },
];

interface Props {
  user: User | null;
  profile: {
    full_name: string | null;
    avatar_url: string | null;
    usn: string | null;
    branch: string | null;
    role: string | null;
  } | null;
}

export default function Navbar({ user, profile }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); setDropOpen(false); }, [pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    if (!dropOpen) return;
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [dropOpen]);

  // Close dropdown on Escape
  useEffect(() => {
    if (!dropOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setDropOpen(false); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [dropOpen]);

  const initials = profile?.full_name
    ? profile.full_name.trim()[0].toUpperCase()
    : user?.email?.[0].toUpperCase() ?? "?";

  const displayName = profile?.full_name ?? user?.email ?? "Member";
  const displaySub = profile?.usn
    ? `${profile.usn}${profile.branch ? " · " + profile.branch : ""}`
    : user?.email ?? "";

  async function handleSignOut() {
    setDropOpen(false);
    await signOut();
    router.refresh();
  }

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <img src="/GarudaLogo1.png" alt="PROJECT GARUDA" className={styles.logoImg} />
        </Link>

        <ul className={styles.links}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`${styles.link} ${pathname === link.href ? styles.active : ""}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.cta}>
          <ThemeToggle />

          {user ? (
            <>
              <Link
                href="/dashboard"
                className={`${styles.link} ${pathname === "/dashboard" ? styles.active : ""}`}
              >
                Dashboard
              </Link>
              <Link
                href="/blog"
                className={`${styles.link} ${pathname.startsWith("/blog") ? styles.active : ""}`}
              >
                Blog
              </Link>

              {/* Avatar → dropdown */}
              <div className={styles.dropdownWrap} ref={dropRef}>
                <button
                  type="button"
                  className={styles.avatarBtn}
                  onClick={() => setDropOpen((v) => !v)}
                  aria-label="Open profile menu"
                >
                  {profile?.avatar_url ? (
                    <img src={profile.avatar_url} alt={displayName} className={styles.userAvatar} />
                  ) : (
                    <div className={styles.userInitials}>{initials}</div>
                  )}
                </button>

                {dropOpen && (
                  <div className={styles.dropdown}>
                    {/* User info */}
                    <div className={styles.dropHeader}>
                      {profile?.avatar_url ? (
                        <img src={profile.avatar_url} alt={displayName} className={styles.dropAvatar} />
                      ) : (
                        <div className={styles.dropInitials}>{initials}</div>
                      )}
                      <div className={styles.dropInfo}>
                        <div className={styles.dropName}>{displayName}</div>
                        <div className={styles.dropSub}>{displaySub}</div>
                        {profile?.role && (
                          <div className={styles.dropRole}>{profile.role}</div>
                        )}
                      </div>
                    </div>

                    {/* Links */}
                    <div className={styles.dropLinks}>
                      <Link href="/dashboard" className={styles.dropLink} onClick={() => setDropOpen(false)}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                        Dashboard
                      </Link>
                      <Link href="/blog" className={styles.dropLink} onClick={() => setDropOpen(false)}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                        Blog
                      </Link>
                      <Link href="/profile/settings" className={styles.dropLink} onClick={() => setDropOpen(false)}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        Profile Settings
                      </Link>
                      <div className={styles.dropDivider} />
                      <button type="button" className={styles.dropSignOut} onClick={handleSignOut}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link href="/login" className={styles.loginBtn}>Student Login</Link>
              <Link href="/contact" className="btn-primary">Get in Touch</Link>
            </>
          )}
        </div>

        <button
          type="button"
          className={`${styles.hamburger} ${menuOpen ? styles.open : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileOpen : ""}`}>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`${styles.mobileLink} ${pathname === link.href ? styles.activeMobile : ""}`}
          >
            {link.label}
          </Link>
        ))}
        <div className={styles.mobileDivider} />
        {user ? (
          <>
            <Link href="/dashboard" className={`${styles.mobileLink} ${pathname === "/dashboard" ? styles.activeMobile : ""}`}>Dashboard</Link>
            <Link href="/blog" className={`${styles.mobileLink} ${pathname.startsWith("/blog") ? styles.activeMobile : ""}`}>Blog</Link>
            <Link href="/profile/settings" className={`${styles.mobileLink} ${pathname === "/profile/settings" ? styles.activeMobile : ""}`}>Profile Settings</Link>
            <button type="button" className={styles.mobileSignOut} onClick={handleSignOut}>Sign Out</button>
          </>
        ) : (
          <>
            <Link href="/login" className={styles.mobileLoginBtn}>Student Login</Link>
            <Link href="/contact" className={`btn-primary ${styles.mobileCta}`}>Get in Touch</Link>
          </>
        )}
        <div className={styles.mobileThemeRow}><ThemeToggle /></div>
      </div>
    </nav>
  );
}
