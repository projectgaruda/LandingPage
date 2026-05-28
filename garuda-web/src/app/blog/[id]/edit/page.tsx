"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { normalizeLatex, hasLatex } from "@/lib/latex";
import { compressImage } from "@/lib/imageCompression";
import PostBody from "@/components/PostBody";
import styles from "../../new/page.module.css";

const ADMIN_EMAIL = "projectgarudarv@gmail.com";

const CATEGORIES = [
  "General", "Electrical", "Mechanical", "Aerodynamics",
  "Software", "Events", "Announcements",
];

const TEXT_COLORS = [
  { label: "Default", value: "" },
  { label: "White",   value: "#ffffff" },
  { label: "Light",   value: "#e2e8f0" },
  { label: "Grey",    value: "#94a3b8" },
  { label: "Black",   value: "#0f172a" },
  { label: "Red",     value: "#ef4444" },
  { label: "Orange",  value: "#f97316" },
  { label: "Yellow",  value: "#eab308" },
  { label: "Green",   value: "#22c55e" },
  { label: "Teal",    value: "#14b8a6" },
  { label: "Blue",    value: "#3b82f6" },
  { label: "Purple",  value: "#a855f7" },
  { label: "Accent",  value: "#2bff00" },
];

const FONTS = [
  { label: "Default", value: "" },
  { label: "Serif",   value: "Georgia, serif" },
  { label: "Mono",    value: "'JetBrains Mono', monospace" },
  { label: "Sans",    value: "system-ui, sans-serif" },
];

function insertWrap(ta: HTMLTextAreaElement, before: string, after: string, placeholder: string, cb: (v: string) => void) {
  const s = ta.selectionStart, e = ta.selectionEnd;
  const sel = ta.value.slice(s, e) || placeholder;
  cb(ta.value.slice(0, s) + before + sel + after + ta.value.slice(e));
  requestAnimationFrame(() => { ta.focus(); ta.setSelectionRange(s + before.length, s + before.length + sel.length); });
}

function applyLinePrefix(ta: HTMLTextAreaElement, prefix: string, cb: (v: string) => void) {
  const s = ta.selectionStart;
  const ls = ta.value.lastIndexOf("\n", s - 1) + 1;
  const le = ta.value.indexOf("\n", s);
  const line = ta.value.slice(ls, le === -1 ? ta.value.length : le).replace(/^(#{1,6}\s|>\s)/, "");
  const nl = prefix + line;
  cb(ta.value.slice(0, ls) + nl + (le === -1 ? "" : ta.value.slice(le)));
  requestAnimationFrame(() => { ta.focus(); ta.setSelectionRange(ls + nl.length, ls + nl.length); });
}

function wrapInSpan(ta: HTMLTextAreaElement, styleAttr: string, cb: (v: string) => void) {
  const s = ta.selectionStart, e = ta.selectionEnd;
  const sel = ta.value.slice(s, e) || "text";
  const open = `<span style="${styleAttr}">`;
  cb(ta.value.slice(0, s) + open + sel + `</span>` + ta.value.slice(e));
  requestAnimationFrame(() => { ta.focus(); ta.setSelectionRange(s + open.length, s + open.length + sel.length); });
}

type EditorMode = "write" | "raw";

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const supabase = createClient();

  const [userId,    setUserId]    = useState<string | null>(null);
  const [title,     setTitle]     = useState("");
  const [body,      setBody]      = useState("");
  const [category,  setCategory]  = useState("General");
  const [loading,   setLoading]   = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState<string | null>(null);
  const [error,     setError]     = useState("");
  const [editorMode, setEditorMode] = useState<EditorMode>("write");
  const [postId,     setPostId]    = useState<string | null>(null);
  const [notFound,   setNotFound]  = useState(false);

  const [bannerFile,         setBannerFile]         = useState<File | null>(null);
  const [bannerPreview,      setBannerPreview]      = useState<string | null>(null);
  const [bannerHover,        setBannerHover]        = useState(false);
  const [existingBannerUrl,  setExistingBannerUrl]  = useState<string | null>(null);

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);

  const [linkInputOpen, setLinkInputOpen] = useState(false);
  const [linkUrlInput,  setLinkUrlInput]  = useState("");
  const linkUrlRef = useRef<HTMLInputElement>(null);

  const [findOpen,    setFindOpen]    = useState(false);
  const [findText,    setFindText]    = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [matchIdx,    setMatchIdx]    = useState(0);
  const findInputRef = useRef<HTMLInputElement>(null);

  const histRef   = useRef<{ stack: string[]; pos: number }>({ stack: [""], pos: 0 });
  const histTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const commitHistory = useCallback((val: string, immediate = false) => {
    const flush = () => {
      const h = histRef.current;
      if (h.stack[h.pos] !== val) { h.stack = [...h.stack.slice(0, h.pos + 1), val]; h.pos = h.stack.length - 1; }
    };
    if (immediate) { if (histTimer.current) clearTimeout(histTimer.current); flush(); return; }
    if (histTimer.current) clearTimeout(histTimer.current);
    histTimer.current = setTimeout(flush, 600);
  }, []);

  const updateBody = useCallback((val: string, immediate = false) => {
    setBody(val); commitHistory(val, immediate);
  }, [commitHistory]);

  const handleUndo = useCallback(() => {
    const h = histRef.current;
    if (h.stack[h.pos] !== body) { h.stack = [...h.stack.slice(0, h.pos + 1), body]; h.pos = h.stack.length - 1; }
    if (h.pos > 0) { h.pos--; setBody(h.stack[h.pos]); }
  }, [body]);

  const handleRedo = useCallback(() => {
    const h = histRef.current;
    if (h.pos < h.stack.length - 1) { h.pos++; setBody(h.stack[h.pos]); }
  }, []);

  const taRef          = useRef<HTMLTextAreaElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const imageInsertRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      const { id } = await params;
      setPostId(id);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }
      const { data: post } = await supabase
        .from("posts").select("id, title, body, image_url, category, author_id").eq("id", id).single();
      if (!post) { setNotFound(true); return; }
      const isAdmin = user.email === ADMIN_EMAIL;
      if (post.author_id !== user.id && !isAdmin) { router.push(`/blog/${id}`); return; }
      setUserId(user.id);
      setTitle(post.title ?? "");
      setCategory(post.category ?? "General");
      if (post.image_url) { setExistingBannerUrl(post.image_url); setBannerPreview(post.image_url); }
      // Initialise body + history
      const b = post.body ?? "";
      setBody(b);
      histRef.current = { stack: [b], pos: 0 };
    })();
  }, [params, router, supabase]);

  useEffect(() => {
    if (!activeDropdown) return;
    const h = (e: MouseEvent) => {
      if (toolbarRef.current && !toolbarRef.current.contains(e.target as Node))
        setActiveDropdown(null);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [activeDropdown]);

  useEffect(() => { if (linkInputOpen) setTimeout(() => linkUrlRef.current?.focus(), 50); }, [linkInputOpen]);
  useEffect(() => { if (findOpen) setTimeout(() => findInputRef.current?.focus(), 50); }, [findOpen]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "f" && document.activeElement === taRef.current) {
        e.preventDefault(); setFindOpen(o => !o);
      }
      if (e.key === "Escape") { setFindOpen(false); setLinkInputOpen(false); setActiveDropdown(null); }
    };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, []);

  const toggleDropdown = (name: string) => setActiveDropdown(p => (p === name ? null : name));

  const matches = useMemo(() => {
    if (!findText.trim()) return [];
    const lower = body.toLowerCase(), search = findText.toLowerCase();
    const out: number[] = [];
    let i = 0;
    while (true) {
      const idx = lower.indexOf(search, i);
      if (idx === -1) break;
      out.push(idx); i = idx + 1;
    }
    return out;
  }, [body, findText]);

  const goToMatch = useCallback((idx: number) => {
    const ta = taRef.current;
    if (!ta || matches.length === 0) return;
    const safe = ((idx % matches.length) + matches.length) % matches.length;
    setMatchIdx(safe);
    ta.focus(); ta.setSelectionRange(matches[safe], matches[safe] + findText.length);
  }, [matches, findText]);

  const findNext = useCallback(() => goToMatch(matchIdx + 1), [goToMatch, matchIdx]);
  const findPrev = useCallback(() => goToMatch(matchIdx - 1), [goToMatch, matchIdx]);

  const replaceCurrent = useCallback(() => {
    if (!findText || matches.length === 0) return;
    const start = matches[matchIdx % matches.length];
    updateBody(body.slice(0, start) + replaceText + body.slice(start + findText.length), true);
  }, [findText, replaceText, matches, matchIdx, body, updateBody]);

  const replaceAll = useCallback(() => {
    if (!findText) return;
    const esc = findText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    updateBody(body.replace(new RegExp(esc, "gi"), replaceText), true);
  }, [findText, replaceText, body, updateBody]);

  const uploadImage = useCallback(async (file: File): Promise<string> => {
    if (!userId) throw new Error("Not signed in");
    if (!file.type.startsWith("image/")) throw new Error("File must be an image");
    setUploadMsg("Compressing image...");
    let f = file;
    try {
      const r = await compressImage(file);
      setUploadMsg(`Compressed ${r.originalKB} KB to ${r.compressedKB} KB. Uploading...`);
      f = r.file;
    } catch { setUploadMsg("Uploading..."); }
    if (f.size > 8 * 1024 * 1024) throw new Error("Image must be under 8 MB");
    const path = `${userId}/${Date.now()}.jpg`;
    const { error: upErr } = await supabase.storage.from("post-images").upload(path, f);
    if (upErr) throw upErr;
    return supabase.storage.from("post-images").getPublicUrl(path).data.publicUrl;
  }, [userId, supabase]);

  const handleBannerFile = async (file: File) => {
    setBannerPreview(URL.createObjectURL(file)); setBannerFile(file);
    setUploading(true); setUploadMsg("Compressing banner...");
    try {
      const r = await compressImage(file, 1600, 0.85);
      setBannerFile(r.file); setBannerPreview(URL.createObjectURL(r.file));
      setUploadMsg(`Banner compressed ${r.originalKB} KB to ${r.compressedKB} KB`);
      setTimeout(() => setUploadMsg(null), 3000);
    } catch { setUploadMsg(null); } finally { setUploading(false); }
  };

  const handleBannerDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f?.type.startsWith("image/")) handleBannerFile(f);
  };

  const handleBannerPaste = useCallback((e: ClipboardEvent) => {
    if (document.activeElement === taRef.current) return;
    const item = Array.from(e.clipboardData?.items ?? []).find(i => i.type.startsWith("image/"));
    const f = item?.getAsFile();
    if (f) handleBannerFile(f);
  }, []);

  useEffect(() => {
    document.addEventListener("paste", handleBannerPaste);
    return () => document.removeEventListener("paste", handleBannerPaste);
  }, [handleBannerPaste]);

  const handleTextareaPaste = useCallback(async (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const img = Array.from(e.clipboardData.items).find(i => i.type.startsWith("image/"));
    if (img) {
      e.preventDefault();
      const file = img.getAsFile();
      if (!file) return;
      setUploading(true); setUploadMsg(null);
      try {
        const url = await uploadImage(file);
        const ta = taRef.current!;
        const cur = ta.selectionStart;
        updateBody(ta.value.slice(0, cur) + `\n![image](${url})\n` + ta.value.slice(cur), true);
      } catch (err: unknown) { setError(err instanceof Error ? err.message : "Upload failed"); }
      finally { setUploading(false); setUploadMsg(null); }
      return;
    }
    const pasted = e.clipboardData.getData("text");
    if (/^https?:\/\/\S+$/.test(pasted.trim())) {
      e.preventDefault();
      const ta = taRef.current!;
      const s = ta.selectionStart, ep = ta.selectionEnd;
      const sel = ta.value.slice(s, ep), url = pasted.trim();
      updateBody(ta.value.slice(0, s) + (sel ? `[${sel}](${url})` : `[${url}](${url})`) + ta.value.slice(ep), true);
    }
  }, [uploadImage, updateBody]);

  const handleInsertImageFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true); setUploadMsg(null);
    try {
      const url = await uploadImage(file);
      const ta = taRef.current!;
      const cur = ta.selectionStart;
      updateBody(ta.value.slice(0, cur) + `\n![image](${url})\n` + ta.value.slice(cur), true);
    } catch (err: unknown) { setError(err instanceof Error ? err.message : "Upload failed"); }
    finally { setUploading(false); setUploadMsg(null); e.target.value = ""; }
  };

  const handleInsertLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taRef.current || !linkUrlInput.trim()) return;
    const ta = taRef.current, s = ta.selectionStart, ep = ta.selectionEnd;
    const sel = ta.value.slice(s, ep), url = linkUrlInput.trim(), text = sel || url;
    updateBody(ta.value.slice(0, s) + `[${text}](${url})` + ta.value.slice(ep), true);
    setLinkInputOpen(false); setLinkUrlInput("");
    requestAnimationFrame(() => { ta.focus(); ta.setSelectionRange(s + 1, s + 1 + text.length); });
  };

  // Preview click → jump to that text in the textarea
  const handlePreviewClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const ta = taRef.current;
    if (!ta) return;
    // Get a text snippet from the clicked element or selection
    const sel = window.getSelection()?.toString().trim() ?? "";
    const target = e.target as HTMLElement;
    const raw = sel.length >= 3 ? sel : (target.textContent?.trim() ?? "");
    const snippet = raw.slice(0, 60);
    if (snippet.length < 3) return;
    // Search body for the snippet
    const lower = body.toLowerCase();
    const snipLower = snippet.toLowerCase();
    let idx = lower.indexOf(snipLower);
    if (idx === -1 && snippet.length > 15) idx = lower.indexOf(snipLower.slice(0, 20));
    if (idx === -1) return;
    // Select in textarea and scroll to it
    ta.focus();
    ta.setSelectionRange(idx, idx + Math.min(snippet.length, 60));
    const linesBefore = body.slice(0, idx).split("\n").length - 1;
    const lineH = parseInt(getComputedStyle(ta).lineHeight) || 26;
    ta.scrollTop = Math.max(0, (linesBefore - 3) * lineH);
  }, [body]);

  const tb = (fn: () => void) => (e: React.MouseEvent) => { e.preventDefault(); fn(); };
  const bold   = tb(() => taRef.current && insertWrap(taRef.current, "**", "**", "bold text",  v => updateBody(v, true)));
  const italic = tb(() => taRef.current && insertWrap(taRef.current, "*",  "*",  "italic text", v => updateBody(v, true)));
  const hr     = tb(() => taRef.current && insertWrap(taRef.current, "\n---\n", "", "",         v => updateBody(v, true)));
  const heading = (n: number) => tb(() => taRef.current && applyLinePrefix(taRef.current, "#".repeat(n) + " ", v => updateBody(v, true)));
  const applyColor = (color: string) => {
    if (taRef.current && color) wrapInSpan(taRef.current, `color:${color}`, v => updateBody(v, true));
    setActiveDropdown(null);
  };
  const applyFont = (font: string) => {
    if (taRef.current && font) wrapInSpan(taRef.current, `font-family:${font}`, v => updateBody(v, true));
    setActiveDropdown(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userId || !postId) return;
    setLoading(true); setError("");
    try {
      let imageUrl: string | null = existingBannerUrl;
      if (bannerFile) {
        setUploading(true); setUploadMsg("Uploading banner...");
        try {
          const path = `${userId}/${Date.now()}-banner.jpg`;
          const { error: upErr } = await supabase.storage.from("post-images").upload(path, bannerFile);
          if (upErr) throw upErr;
          imageUrl = supabase.storage.from("post-images").getPublicUrl(path).data.publicUrl;
        } finally { setUploading(false); setUploadMsg(null); }
      } else if (!bannerPreview) {
        imageUrl = null;
      }
      const { error: ue } = await supabase.from("posts").update({
        title: title.trim(), body: normalizeLatex(body), image_url: imageUrl, category,
      }).eq("id", postId);
      if (ue) throw ue;
      router.push(`/blog/${postId}`); router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  };

  const normalizedBody = normalizeLatex(body);
  const mathDetected   = hasLatex(normalizedBody) && normalizedBody !== body;

  if (notFound) return <div className={styles.notFound}>Post not found.</div>;

  return (
    <div className={styles.page}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.doc}>

          {/* Toolbar */}
          <div className={styles.toolbar} ref={toolbarRef} aria-label="Formatting toolbar">
            <button type="button" className={styles.tbBtn} title="Undo" onClick={handleUndo}>&#8617;</button>
            <button type="button" className={styles.tbBtn} title="Redo" onClick={handleRedo}>&#8618;</button>
            <div className={styles.tbSep} />
            <button type="button" className={`${styles.tbBtn} ${styles.tbH}`} onClick={heading(1)}>H1</button>
            <button type="button" className={`${styles.tbBtn} ${styles.tbH}`} onClick={heading(2)}>H2</button>
            <button type="button" className={`${styles.tbBtn} ${styles.tbH}`} onClick={heading(3)}>H3</button>
            <button type="button" className={`${styles.tbBtn} ${styles.tbH}`} onClick={heading(4)}>H4</button>
            <div className={styles.tbSep} />
            <button type="button" className={styles.tbBtn} onClick={bold}><strong>B</strong></button>
            <button type="button" className={`${styles.tbBtn} ${styles.tbItalic}`} onClick={italic}>I</button>
            <button type="button" className={styles.tbBtn} title="Horizontal Rule" onClick={hr}>&#8212;</button>
            <div className={styles.tbSep} />

            <div className={styles.tbDrop}>
              <button type="button" className={`${styles.tbDropBtn} ${activeDropdown === "color" ? styles.tbDropBtnActive : ""}`} title="Text color" onClick={() => toggleDropdown("color")}>
                A<span className={styles.colorBar} />
              </button>
              {activeDropdown === "color" && (
                <div className={`${styles.tbDropMenu} ${styles.colorMenu}`}>
                  {TEXT_COLORS.map(c => (
                    <button key={c.label} type="button" className={styles.colorSwatch}
                      style={{ background: c.value || "var(--text-primary)", outline: c.value === "" ? "2px solid var(--accent-green)" : "2px solid transparent" }}
                      title={c.label} onMouseDown={e => { e.preventDefault(); applyColor(c.value); }} />
                  ))}
                </div>
              )}
            </div>

            <div className={styles.tbDrop}>
              <button type="button" className={`${styles.tbDropBtn} ${activeDropdown === "font" ? styles.tbDropBtnActive : ""}`} onClick={() => toggleDropdown("font")}>Font</button>
              {activeDropdown === "font" && (
                <div className={styles.tbDropMenu}>
                  {FONTS.map(f => (
                    <button key={f.label} type="button" className={styles.tbDropItem} style={{ fontFamily: f.value || "inherit" }} onMouseDown={e => { e.preventDefault(); applyFont(f.value); }}>
                      {f.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className={styles.tbSep} />

            <div className={styles.tbDrop}>
              <button type="button" className={`${styles.tbDropBtn} ${styles.tbInsert} ${activeDropdown === "insert" ? styles.tbDropBtnActive : ""}`} disabled={uploading} onClick={() => toggleDropdown("insert")}>Insert</button>
              {activeDropdown === "insert" && (
                <div className={styles.tbDropMenu}>
                  <button type="button" className={styles.tbDropItem} onMouseDown={e => { e.preventDefault(); imageInsertRef.current?.click(); setActiveDropdown(null); }}>Image</button>
                  <button type="button" className={styles.tbDropItem} onMouseDown={e => { e.preventDefault(); setLinkInputOpen(true); setActiveDropdown(null); }}>Link</button>
                  <div className={styles.dropSep} />
                  <button type="button" className={styles.tbDropItem} onMouseDown={e => { e.preventDefault(); if (taRef.current) insertWrap(taRef.current, "\n```\n", "\n```\n", "code here", v => updateBody(v, true)); setActiveDropdown(null); }}>Code Block</button>
                </div>
              )}
            </div>

            <input ref={imageInsertRef} type="file" accept="image/*" aria-label="Insert image into post" className={styles.hiddenInput} onChange={handleInsertImageFile} />
            <div className={styles.tbSep} />

            <button type="button" className={`${styles.tbBtn} ${findOpen ? styles.tbBtnActive : ""}`} title="Find and Replace" onClick={() => setFindOpen(o => !o)}>Find</button>

            <div className={styles.tbRight}>
              <select className={styles.categorySelect} value={category} aria-label="Post category" onChange={e => setCategory(e.target.value)}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <div className={styles.modeToggle}>
                <button type="button" className={`${styles.modeBtn} ${editorMode === "write" ? styles.modeBtnActive : ""}`} onClick={() => setEditorMode("write")}>Write</button>
                <button type="button" className={`${styles.modeBtn} ${editorMode === "raw"   ? styles.modeBtnActive : ""}`} onClick={() => setEditorMode("raw")}>Markdown</button>
              </div>
            </div>
          </div>

          {/* Find and Replace bar */}
          {findOpen && (
            <div className={styles.findBar}>
              <div className={styles.findRow}>
                <span className={styles.findLabel}>Find</span>
                <input ref={findInputRef} type="text" className={styles.findInput} placeholder="Search..." value={findText} onChange={e => { setFindText(e.target.value); setMatchIdx(0); }} />
                <span className={styles.findCount}>{findText ? `${matches.length > 0 ? matchIdx + 1 : 0}/${matches.length}` : ""}</span>
                <button type="button" className={styles.findNav} onClick={findPrev} disabled={matches.length === 0}>&#8593;</button>
                <button type="button" className={styles.findNav} onClick={findNext} disabled={matches.length === 0}>&#8595;</button>
              </div>
              <div className={styles.findRow}>
                <span className={styles.findLabel}>Replace</span>
                <input type="text" className={styles.findInput} placeholder="Replacement..." value={replaceText} onChange={e => setReplaceText(e.target.value)} />
                <button type="button" className={styles.findAction} onClick={replaceCurrent} disabled={matches.length === 0}>Replace</button>
                <button type="button" className={styles.findAction} onClick={replaceAll} disabled={!findText || matches.length === 0}>All</button>
                <button type="button" className={styles.findClose} onClick={() => { setFindOpen(false); setFindText(""); setReplaceText(""); }}>&#10005;</button>
              </div>
            </div>
          )}

          {/* Link bar */}
          {linkInputOpen && (
            <form className={styles.linkBar} onSubmit={handleInsertLink}>
              <span className={styles.linkBarLabel}>URL</span>
              <input ref={linkUrlRef} type="url" className={styles.linkBarInput} placeholder="https://..." value={linkUrlInput} onChange={e => setLinkUrlInput(e.target.value)} />
              <button type="submit" className={styles.linkBarInsert} disabled={!linkUrlInput.trim()}>Insert</button>
              <button type="button" className={styles.linkBarCancel} onClick={() => { setLinkInputOpen(false); setLinkUrlInput(""); }}>Cancel</button>
            </form>
          )}

          {/* Notices */}
          <div className={styles.notices}>
            {error && <div className={styles.error}>{error}</div>}
            {mathDetected && <div className={styles.mathNotice}>Math notation detected and normalised.</div>}
            {uploading && <div className={styles.uploadNotice}>{uploadMsg ?? "Uploading..."}</div>}
          </div>

          {/* Banner */}
          {bannerPreview ? (
            <div className={styles.docBanner} onMouseEnter={() => setBannerHover(true)} onMouseLeave={() => setBannerHover(false)} onDragOver={e => e.preventDefault()} onDrop={handleBannerDrop}>
              <img src={bannerPreview} alt="" className={styles.docBannerImg} />
              {bannerHover && (
                <div className={styles.docBannerOverlay}>
                  <button type="button" className={styles.bannerBtn} onClick={() => bannerInputRef.current?.click()}>Change</button>
                  <button type="button" className={styles.bannerBtnRed} onClick={() => { setBannerPreview(null); setBannerFile(null); setExistingBannerUrl(null); }}>Remove</button>
                </div>
              )}
            </div>
          ) : (
            <button type="button" className={styles.docBannerEmpty} onClick={() => bannerInputRef.current?.click()} onDragOver={e => e.preventDefault()} onDrop={handleBannerDrop}>
              + Add cover image
            </button>
          )}

          <input ref={bannerInputRef} type="file" accept="image/*" aria-label="Upload cover image" className={styles.hiddenInput}
            onChange={e => { const f = e.target.files?.[0]; if (f) handleBannerFile(f); e.target.value = ""; }} />

          {/* Title */}
          <input id="post-title" type="text" className={styles.titleInput} placeholder="Post title..." value={title} onChange={e => setTitle(e.target.value)} required maxLength={200} />

          {/* Editor */}
          <div className={`${styles.editorWrap} ${editorMode === "raw" ? styles.editorRaw : ""}`}>
            <div className={styles.editorPane}>
              <textarea ref={taRef} id="post-body" className={styles.bodyTextarea}
                value={body}
                onChange={e => updateBody(e.target.value)}
                onPaste={handleTextareaPaste}
                onKeyDown={e => {
                  const mod = e.ctrlKey || e.metaKey;
                  if (mod && e.key === "z" && !e.shiftKey) { e.preventDefault(); handleUndo(); }
                  if (mod && (e.key === "y" || (e.key === "z" && e.shiftKey))) { e.preventDefault(); handleRedo(); }
                }}
                placeholder="Start writing..." required aria-label="Post body" />
            </div>
            {editorMode === "write" && (
              <div className={styles.previewPane} onClick={handlePreviewClick} title="Click text to jump to it in the editor">
                <div className={styles.previewPaneInner}>
                  <PostBody text={normalizedBody || "Start writing to see a preview..."} />
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className={styles.actions}>
            <button type="button" className="btn-outline" onClick={() => postId && router.push(`/blog/${postId}`)}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={loading || uploading || !title.trim() || !body.trim()}>
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>

        </div>
      </form>
    </div>
  );
}
