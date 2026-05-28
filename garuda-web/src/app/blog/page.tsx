import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import CategoryTabs from "@/components/CategoryTabs";
import { deletePost } from "@/app/actions/blog";
import styles from "./page.module.css";

const ADMIN_EMAIL = "projectgarudarv@gmail.com";

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const activeCategory = category ?? "All";

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("profile_completed, blog_banner_url")
    .eq("id", user.id)
    .single();

  const canPost = profile?.profile_completed === true;
  const isAdmin = user.email === ADMIN_EMAIL;

  let query = supabase
    .from("posts")
    .select(`
      id, title, body, image_url, created_at, category,
      author:profiles!posts_author_id_fkey (
        id, full_name, avatar_url, usn, branch, blog_banner_url
      )
    `)
    .order("created_at", { ascending: false });

  if (activeCategory !== "All") {
    query = query.eq("category", activeCategory);
  }

  const { data: posts } = await query;

  return (
    <div className={styles.page}>
      {/* Blog banner */}
      {profile?.blog_banner_url && (
        <div className={styles.bannerWrap}>
          <img src={profile.blog_banner_url} alt="" className={styles.banner} />
          <div className={styles.bannerOverlay} />
        </div>
      )}

      <div className="container">
        <div className={styles.header}>
          <div>
            <p className="section-label">Team Knowledge Base</p>
            <h1 className={styles.title}>The <span>Blog</span></h1>
          </div>
          {canPost && (
            <Link href="/blog/new" className="btn-primary">+ New Post</Link>
          )}
        </div>

        {!canPost && (
          <div className={`card ${styles.notice}`}>
            <p>
              Finish setting up your profile to post.{" "}
              <Link href="/profile/setup" className={styles.link}>Complete profile →</Link>
            </p>
          </div>
        )}

        {/* Category tabs need useSearchParams — wrap in Suspense */}
        <Suspense fallback={<div className={styles.tabsPlaceholder} />}>
          <CategoryTabs active={activeCategory} />
        </Suspense>

        {!posts || posts.length === 0 ? (
          <div className={`card ${styles.empty}`}>
            <p>No posts {activeCategory !== "All" ? `in "${activeCategory}"` : "yet"}. Be the first!</p>
          </div>
        ) : (
          <div className={styles.feed}>
            {posts.map((post: any) => {
              const author = post.author as {
                id: string;
                full_name: string | null;
                avatar_url: string | null;
                usn: string | null;
                branch: string | null;
                blog_banner_url: string | null;
              } | null;

              const canDelete = isAdmin || post.author?.id === user.id;

              const coverImg = post.image_url ?? author?.blog_banner_url ?? null;

              const excerpt = post.body
                ? post.body.replace(/[#*`$\\[\]()>_~]/g, "").slice(0, 180).trimEnd() +
                  (post.body.length > 180 ? "…" : "")
                : "";

              const dateStr = new Date(post.created_at).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              });

              const words = post.body ? post.body.split(/\s+/).length : 0;
              const readMin = Math.max(1, Math.round(words / 200));

              return (
                <article key={post.id} className={styles.article}>
                  {/* Text side */}
                  <div className={styles.articleBody}>
                    {/* Author + meta */}
                    <div className={styles.authorRow}>
                      {author?.avatar_url ? (
                        <img src={author.avatar_url} alt={author.full_name ?? ""} className={styles.avatar} />
                      ) : (
                        <div className={styles.avatarInitials}>
                          {(author?.full_name ?? "?")[0].toUpperCase()}
                        </div>
                      )}
                      <span className={styles.authorName}>{author?.full_name ?? "Anonymous"}</span>
                      <span className={styles.dot}>·</span>
                      <span className={styles.date}>{dateStr}</span>
                      {post.category && post.category !== "General" && (
                        <>
                          <span className={styles.dot}>·</span>
                          <span className={styles.catTag}>{post.category}</span>
                        </>
                      )}
                    </div>

                    {/* Title */}
                    <Link href={`/blog/${post.id}`} className={styles.titleLink}>
                      <h2 className={styles.postTitle}>{post.title}</h2>
                    </Link>

                    {/* Excerpt */}
                    {excerpt && <p className={styles.excerpt}>{excerpt}</p>}

                    {/* Footer */}
                    <div className={styles.articleFooter}>
                      <span className={styles.readTime}>{readMin} min read</span>
                      <div className={styles.articleActions}>
                        <Link href={`/blog/${post.id}`} className={styles.readBtn}>Read →</Link>
                        {canDelete && (
                          <form action={deletePost.bind(null, post.id)}>
                            <button type="submit" className={styles.deleteBtn}>Delete</button>
                          </form>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Thumbnail */}
                  {coverImg && (
                    <Link href={`/blog/${post.id}`} className={styles.thumbWrap}>
                      <img src={coverImg} alt="" className={styles.thumb} />
                    </Link>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
