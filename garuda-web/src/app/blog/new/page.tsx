"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { normalizeLatex, hasLatex } from "@/lib/latex";
import PostBody from "@/components/PostBody";
import styles from "./page.module.css";

export default function NewPostPage() {
  const router = useRouter();
  const supabase = createClient();
  const [userId, setUserId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  // Check user can post
  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }

      const { data: profile } = await supabase
        .from("profiles")
        .select("profile_completed")
        .eq("id", user.id)
        .single();

      if (!profile?.profile_completed) {
        router.push("/profile/setup");
        return;
      }
      setUserId(user.id);
    })();
  }, [router, supabase]);

  const normalizedBody = normalizeLatex(body);
  const mathDetected = hasLatex(normalizedBody) && normalizedBody !== body;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImagePreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;
    setLoading(true);
    setError("");

    try {
      let imageUrl: string | null = null;

      if (imageFile) {
        // Validate
        if (imageFile.size > 5 * 1024 * 1024) {
          throw new Error("Image must be under 5MB");
        }
        if (!imageFile.type.startsWith("image/")) {
          throw new Error("File must be an image");
        }

        // Upload to {userId}/{timestamp}-{filename}
        const ext = imageFile.name.split(".").pop();
        const path = `${userId}/${Date.now()}.${ext}`;

        const { error: uploadError } = await supabase
          .storage
          .from("post-images")
          .upload(path, imageFile);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase
          .storage
          .from("post-images")
          .getPublicUrl(path);

        imageUrl = urlData.publicUrl;
      }

      const { error: insertError } = await supabase
        .from("posts")
        .insert({
          author_id: userId,
          title: title.trim(),
          body: normalizedBody,
          image_url: imageUrl,
        });

      if (insertError) throw insertError;

      router.push("/blog");
      router.refresh();
    } catch (err: any) {
      setError(err.message ?? "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.wrap}>
          <h1 className={styles.title}>New post</h1>

          <form className={styles.form} onSubmit={handleSubmit}>
            {error && <div className={styles.error}>{error}</div>}

            <div className="form-group">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What's the post about?"
                required
                maxLength={200}
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Body
                <span className={styles.hint}>
                  Math: wrap in $...$ for inline, $$...$$ for block. Chatbot pastes are auto-cleaned.
                </span>
              </label>
              <textarea
                className="form-input"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Write something..."
                rows={10}
                required
                style={{ resize: "vertical", fontFamily: "inherit" }}
              />
              {mathDetected && (
                <div className={styles.mathNotice}>
                  ✨ Detected math symbols and normalized them. Preview to confirm.
                </div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Image (optional)</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className={styles.fileInput}
              />
              {imagePreview && (
                <img src={imagePreview} alt="" className={styles.preview} />
              )}
            </div>

            <div className={styles.actions}>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setShowPreview(!showPreview)}
              >
                {showPreview ? "Hide preview" : "Show preview"}
              </button>
              <button
                type="submit"
                className="btn-primary"
                disabled={loading || !title.trim() || !body.trim()}
              >
                {loading ? "Publishing..." : "Publish"}
              </button>
            </div>

            {showPreview && (
              <div className={`card ${styles.previewCard}`}>
                <h2 className={styles.previewTitle}>{title || "Title preview"}</h2>
                <PostBody text={normalizedBody || "Body preview..."} />
                {imagePreview && (
                  <img src={imagePreview} alt="" className={styles.preview} />
                )}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}