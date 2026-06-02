import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import CategoryTabs from "@/components/CategoryTabs";
import Reveal from "@/components/Reveal";
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
    .select(
      `
      id, title, body, image_url, created_at, category,
      author:profiles!posts_author_id_fkey (
        id, full_name, avatar_url, usn, branch, blog_banner_url
      )
    `,
    )
    .order("created_at", { ascending: false });

  if (activeCategory !== "All") {
    query = query.eq("category", activeCategory);
  }

  const { data: posts } = await query;
  const postCount = posts?.length ?? 0;

  return (
    <div className={styles.page}>
      {/* ====== HEADER ====== */}
      <section className={styles.pageHeader}>
        <div className={styles.headerMedia} aria-hidden="true">
          {profile?.blog_banner_url ? (
            <img
              src={profile.blog_banner_url}
              alt=""
              className={styles.headerPhoto}
            />
          ) : (
            <img
              src="/images/core_team_with_car.jpg"
              alt=""
              className={styles.headerPhoto}
            />
          )}
          <div className={styles.headerOverlay} />
          <div className={styles.headerGrain} />
        </div>

        <div className={`container ${styles.headerContainer}`}>
          <Reveal as="div" className={styles.headerBody}>
            <span className={styles.headerKicker}>
              <span className={styles.headerKickerNum}>N° 01</span>
              <span className={styles.headerKickerDivider} />
              Knowledge Base
            </span>
            <h1 className={styles.pageTitle}>
              The <span className={styles.accent}>blog</span>.
            </h1>
            <p className={styles.pageDesc}>
              Build notes, lab reports, race recaps, and everything the team
              wants to leave on the record for the next batch.
            </p>

            <div className={styles.headerCtas}>
              {canPost ? (
                <Link href="/blog/new" className="btn-primary">
                  Write a Post
                </Link>
              ) : (
                <Link href="/profile/setup" className="btn-primary">
                  Complete profile to post
                </Link>
              )}
              <Link href="/dashboard" className={styles.headerGhost}>
                Back to dashboard
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ====== FEED ====== */}
      <section className={`section ${styles.feedSection}`}>
        <div className="container">
          <Reveal as="div">
            <div className={styles.feedHead}>
              <span className={styles.sectionKicker}>
                <span className={styles.sectionKickerNum}>N° 02</span>
                <span className={styles.sectionKickerDivider} />
                {activeCategory === "All" ? "All Posts" : activeCategory}
              </span>
              <span className={styles.feedCount}>
                {String(postCount).padStart(3, "0")} Posts
              </span>
            </div>
            <h2 className={styles.sectionTitle}>
              {activeCategory === "All"
                ? "From the team."
                : `${activeCategory}.`}
            </h2>
          </Reveal>

          {/* Category tabs */}
          <Suspense fallback={<div className={styles.tabsPlaceholder} />}>
            <CategoryTabs active={activeCategory} />
          </Suspense>

          {!canPost && (
            <div className={styles.notice}>
              <span className={styles.noticeDot} />
              Finish setting up your profile to post.{" "}
              <Link href="/profile/setup" className={styles.noticeLink}>
                Complete profile →
              </Link>
            </div>
          )}

          {!posts || posts.length === 0 ? (
            <div className={styles.empty}>
              <p>
                No posts{" "}
                {activeCategory !== "All" ? `in "${activeCategory}"` : "yet"}.
                Be the first.
              </p>
            </div>
          ) : (
            <ol className={styles.feed}>
              {posts.map((post: any, i: number) => {
                const author = post.author as {
                  id: string;
                  full_name: string | null;
                  avatar_url: string | null;
                  usn: string | null;
                  branch: string | null;
                  blog_banner_url: string | null;
                } | null;

                const canDelete = isAdmin || post.author?.id === user.id;
                const coverImg =
                  post.image_url ?? author?.blog_banner_url ?? null;

                const excerpt = post.body
                  ? post.body.replace(/[#*`$\\[\]()>_~]/g, "").slice(0, 200).trimEnd() +
                    (post.body.length > 200 ? "…" : "")
                  : "";

                const dateStr = new Date(post.created_at).toLocaleDateString(
                  "en-IN",
                  { day: "numeric", month: "short", year: "numeric" },
                );

                const words = post.body ? post.body.split(/\s+/).length : 0;
                const readMin = Math.max(1, Math.round(words / 200));

                return (
                  <Reveal
                    as="li"
                    key={post.id}
                    className={styles.article}
                    delay={(i % 4) * 80}
                  >
                    <div className={styles.articleBody}>
                      <div className={styles.articleMeta}>
                        <span className={styles.articleMetaIndex}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className={styles.articleMetaDivider} />
                        <span>{dateStr}</span>
                        {post.category && post.category !== "General" && (
                          <>
                            <span className={styles.articleMetaSep}>·</span>
                            <span className={styles.articleCat}>
                              {post.category}
                            </span>
                          </>
                        )}
                        <span className={styles.articleMetaSep}>·</span>
                        <span>{readMin} min read</span>
                      </div>

                      <Link
                        href={`/blog/${post.id}`}
                        className={styles.titleLink}
                      >
                        <h2 className={styles.postTitle}>{post.title}</h2>
                      </Link>

                      {excerpt && (
                        <p className={styles.excerpt}>{excerpt}</p>
                      )}

                      <div className={styles.articleFoot}>
                        <div className={styles.authorRow}>
                          {author?.avatar_url ? (
                            <img
                              src={author.avatar_url}
                              alt={author.full_name ?? ""}
                              className={styles.avatar}
                            />
                          ) : (
                            <div className={styles.avatarInitials}>
                              {(author?.full_name ?? "?")[0].toUpperCase()}
                            </div>
                          )}
                          <span className={styles.authorName}>
                            {author?.full_name ?? "Anonymous"}
                          </span>
                        </div>
                        <div className={styles.articleActions}>
                          <Link
                            href={`/blog/${post.id}`}
                            className={styles.readBtn}
                          >
                            Read <span aria-hidden="true">→</span>
                          </Link>
                          {canDelete && (
                            <form action={deletePost.bind(null, post.id)}>
                              <button
                                type="submit"
                                className={styles.deleteBtn}
                                aria-label="Delete post"
                              >
                                Delete
                              </button>
                            </form>
                          )}
                        </div>
                      </div>
                    </div>

                    {coverImg && (
                      <Link
                        href={`/blog/${post.id}`}
                        className={styles.thumbWrap}
                      >
                        <img src={coverImg} alt="" className={styles.thumb} />
                      </Link>
                    )}
                  </Reveal>
                );
              })}
            </ol>
          )}
        </div>
      </section>
    </div>
  );
}
