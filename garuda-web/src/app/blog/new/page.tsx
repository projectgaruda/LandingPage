"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { normalizeLatex, hasLatex } from "@/lib/latex";
import PostBody from "@/components/PostBody";
import styles from "./page.module.css";

const CATEGORIES = [
  "General", "Electrical", "Mechanical", "Aerodynamics",
  "Software", "Events", "Announcements",
];

// ── helpers ────────────────────────────────────────────────────────────────

function insertWrap(
  ta: HTMLTextAreaElement,
  before: string,
  after: string,
  placeholder: string,
  setBody: (v: string) => void,
) {
  const s = ta.selectionStart;
  const e = ta.selectionEnd;
  const selected = ta.value.slice(s, e) || placeholder;
  const next = ta.value.slice(0, s) + before + selected + after + ta.value.slice(e);
  setBody(next);
  requestAnimationFrame(() => {
    ta.focus();
    ta.setSelectionRange(s + before.length, s + before.length + selected.length);
  });
}

function insertLinePrefix(
  ta: HTMLTextAreaElement,
  prefix: string,
  setBody: (v: string) => void,
) {
  const s = ta.selectionStart;
  const lineStart = ta.value.lastIndexOf("\n", s - 1) + 1;
  const next = ta.value.slice(0, lineStart) + prefix + ta.value.slice(lineStart);
  setBody(next);
  requestAnimationFrame(() => {
    ta.focus();
    ta.setSelectionRange(s + prefix.length, s + prefix.length);
  });
}

// ── component ──────────────────────────────────────────────────────────────

export default function NewPostPage() {
  const router = useRouter();
  const supabase = createClient();

  const [userId, setUserId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("General");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  // Banner
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);

  const taRef = useRef<HTMLTextAreaElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const imageInsertRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }
      const { data: profile } = await supabase
        .from("profiles")
        .select("profile_completed, blog_banner_url")
        .eq("id", user.id)
        .single();
      if (!profile?.profile_completed) { router.push("/profile/setup"); return; }
      // Pre-fill banner from profile if set
      if (profile.blog_banner_url) setBannerPreview(profile.blog_banner_url);
      setUserId(user.id);
    })();
  }, [router, supabase]);

  // Auto-grow textarea
  const growTextarea = () => {
    const ta = taRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = ta.scrollHeight + "px";
  };

  // ── upload helper ──
  const uploadImage = useCallback(async (file: File): Promise<string> => {
    if (!userId) throw new Error("Not signed in");
    if (file.size > 8 * 1024 * 1024) throw new Error("Image must be under 8 MB");
    if (!file.type.startsWith("image/")) throw new Error("File must be an image");
    const ext = file.name.split(".").pop() ?? "png";
    const path = `${userId}/${Date.now()}.${ext}`;
    const { error: upErr } = await supabase.storage.from("post-images").upload(path, file);
    if (upErr) throw upErr;
    const { data } = supabase.storage.from("post-images").getPublicUrl(path);
    return data.publicUrl;
  }, [userId, supabase]);

  // ── banner ──
  const handleBannerFile = async (file: File) => {
    setBannerPreview(URL.createObjectURL(file));
    setBannerFile(file);
  };

  const handleBannerDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith("image/")) handleBannerFile(file);
  };

  const handleBannerPaste = useCallback((e: ClipboardEvent) => {
    // Only intercept paste when not in the textarea
    if (document.activeElement === taRef.current) return;
    const item = Array.from(e.clipboardData?.items ?? []).find(i => i.type.startsWith("image/"));
    if (!item) return;
    const file = item.getAsFile();
    if (file) handleBannerFile(file);
  }, []);

  useEffect(() => {
    document.addEventListener("paste", handleBannerPaste);
    return () => document.removeEventListener("paste", handleBannerPaste);
  }, [handleBannerPaste]);

  // ── paste image inside textarea ──
  const handleTextareaPaste = useCallback(async (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const item = Array.from(e.clipboardData.items).find(i => i.type.startsWith("image/"));
    if (!item) return;
    e.preventDefault();
    const file = item.getAsFile();
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file);
      const ta = taRef.current!;
      const cursor = ta.selectionStart;
      const insertion = `\n![image](${url})\n`;
      setBody(v => v.slice(0, cursor) + insertion + v.slice(cursor));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }, [uploadImage]);

  // ── insert image from toolbar button ──
  const handleInsertImageFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file);
      const ta = taRef.current!;
      const cursor = ta.selectionStart;
      const insertion = `\n![image](${url})\n`;
      setBody(v => v.slice(0, cursor) + insertion + v.slice(cursor));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  // ── toolbar actions ──
  const tb = (action: () => void) => (e: React.MouseEvent) => {
    e.preventDefault();
    action();
  };

  const bold = tb(() => taRef.current && insertWrap(taRef.current, "**", "**", "bold text", setBody));
  const italic = tb(() => taRef.current && insertWrap(taRef.current, "*", "*", "italic text", setBody));
  const heading = (n: number) => tb(() => taRef.current && insertLinePrefix(taRef.current, "#".repeat(n) + " ", setBody));
  const hr = tb(() => taRef.current && insertWrap(taRef.current, "\n---\n", "", "", setBody));
  const code = tb(() => taRef.current && insertWrap(taRef.current, "`", "`", "code", setBody));
  const codeBlock = tb(() => taRef.current && insertWrap(taRef.current, "\n```\n", "\n```\n", "code here", setBody));

  // ── submit ──
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userId) return;
    setLoading(true);
    setError("");

    try {
      let imageUrl: string | null = null;

      if (bannerFile) {
        imageUrl = await uploadImage(bannerFile);
      } else if (bannerPreview && bannerPreview.startsWith("http")) {
        imageUrl = bannerPreview; // was from profile
      }

      const { error: insertError } = await supabase.from("posts").insert({
        author_id: userId,
        title: title.trim(),
        body: normalizeLatex(body),
        image_url: imageUrl,
        category,
      });
      if (insertError) throw insertError;

      router.push("/blog");
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  };

  const normalizedBody = normalizeLatex(body);
  const mathDetected = hasLatex(normalizedBody) && normalizedBody !== body;

  return (
    <div className={styles.page}>
      <form className={styles.form} onSubmit={handleSubmit}>

        {/* ── Banner zone ── */}
        {bannerPreview ? (
          /* Has image — plain div, no nested-button issue */
          <div
            className={`${styles.bannerZone} ${styles.bannerHasImg}`}
            onDragOver={e => e.preventDefault()}
            onDrop={handleBannerDrop}
          >
            <img src={bannerPreview} alt="Banner" className={styles.bannerImg} />
            <div className={styles.bannerActions}>
              <button type="button" className={styles.bannerBtn} onClick={() => bannerInputRef.current?.click()}>
                Change
              </button>
              <button type="button" className={styles.bannerBtnRed} onClick={() => { setBannerPreview(null); setBannerFile(null); }}>
                Remove
              </button>
            </div>
            <input
              ref={bannerInputRef}
              type="file"
              accept="image/*"
              className={styles.hiddenInput}
              onChange={e => { const f = e.target.files?.[0]; if (f) handleBannerFile(f); e.target.value = ""; }}
              aria-label="Upload banner image"
            />
          </div>
        ) : (
          /* No image — single button, file input is a sibling outside it */
          <>
            <button
              type="button"
              className={styles.bannerZone}
              onDragOver={e => e.preventDefault()}
              onDrop={handleBannerDrop}
              onClick={() => bannerInputRef.current?.click()}
              aria-label="Add banner image"
            >
              <div className={styles.bannerPlaceholder}>
                <span className={styles.bannerIcon}>🖼️</span>
                <span className={styles.bannerHint}>
                  Add a banner — click, drag &amp; drop, or Ctrl+V an image
                </span>
              </div>
            </button>
            <input
              ref={bannerInputRef}
              type="file"
              accept="image/*"
              className={styles.hiddenInput}
              onChange={e => { const f = e.target.files?.[0]; if (f) handleBannerFile(f); e.target.value = ""; }}
              aria-label="Upload banner image"
            />
          </>
        )}

        {/* ── Document area ── */}
        <div className={styles.doc}>
          {error && <div className={styles.error}>{error}</div>}
          {mathDetected && (
            <div className={styles.mathNotice}>✨ Math notation detected and normalised — check preview.</div>
          )}
          {uploading && <div className={styles.uploadNotice}>⬆️ Uploading image…</div>}

          {/* Title */}
          <input
            id="post-title"
            type="text"
            className={styles.titleInput}
            placeholder="Post title…"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            maxLength={200}
          />

          {/* Category */}
          <div className={styles.metaRow}>
            <label className={styles.metaLabel} htmlFor="post-category">Category</label>
            <select
              id="post-category"
              className={styles.categorySelect}
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Toolbar */}
          <div className={styles.toolbar} aria-label="Formatting toolbar">
            <button type="button" className={styles.tbBtn} onClick={bold} title="Bold (select text first)"><strong>B</strong></button>
            <button type="button" className={styles.tbBtn} onClick={italic} title="Italic"><em>I</em></button>
            <div className={styles.tbSep} />
            <button type="button" className={styles.tbBtn} onClick={heading(1)} title="Heading 1">H1</button>
            <button type="button" className={styles.tbBtn} onClick={heading(2)} title="Heading 2">H2</button>
            <button type="button" className={styles.tbBtn} onClick={heading(3)} title="Heading 3">H3</button>
            <button type="button" className={styles.tbBtn} onClick={heading(4)} title="Heading 4">H4</button>
            <div className={styles.tbSep} />
            <button type="button" className={styles.tbBtn} onClick={hr} title="Horizontal rule">—</button>
            <button type="button" className={styles.tbBtn} onClick={code} title="Inline code">&#96;</button>
            <button type="button" className={styles.tbBtn} onClick={codeBlock} title="Code block">&#96;&#96;&#96;</button>
            <div className={styles.tbSep} />
            <button
              type="button"
              className={`${styles.tbBtn} ${styles.tbImage}`}
              onClick={() => imageInsertRef.current?.click()}
              title="Insert image"
              disabled={uploading}
            >
              📷 Image
            </button>
            <input
              ref={imageInsertRef}
              type="file"
              accept="image/*"
              className={styles.hiddenInput}
              onChange={handleInsertImageFile}
              aria-label="Insert image into post"
            />
            <div className={styles.tbSep} />
            <span className={styles.tbHint}>$…$ inline math · $$…$$ block</span>
          </div>

          {/* Body textarea */}
          <textarea
            ref={taRef}
            id="post-body"
            className={styles.bodyTextarea}
            value={body}
            onChange={e => { setBody(e.target.value); growTextarea(); }}
            onPaste={handleTextareaPaste}
            placeholder="Start writing… (Ctrl+V to paste images, markdown supported)"
            required
            rows={18}
            aria-label="Post body"
          />

          {/* Actions */}
          <div className={styles.actions}>
            <button
              type="button"
              className={`btn-outline ${styles.previewToggle}`}
              onClick={() => setShowPreview(v => !v)}
            >
              {showPreview ? "Hide Preview" : "Show Preview"}
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={loading || uploading || !title.trim() || !body.trim()}
            >
              {loading ? "Publishing…" : "Publish →"}
            </button>
          </div>

          {/* Preview */}
          {showPreview && (
            <div className={styles.previewWrap}>
              <div className={styles.previewHeader}>Preview</div>
              {bannerPreview && (
                <img src={bannerPreview} alt="" className={styles.previewBanner} />
              )}
              <h1 className={styles.previewTitle}>{title || "Untitled"}</h1>
              <PostBody text={normalizedBody || "Nothing written yet…"} />
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
