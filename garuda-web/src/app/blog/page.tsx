import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PostBody from "@/components/PostBody";
import styles from "./page.module.css";

export default async function BlogPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("profile_completed")
    .eq("id", user.id)
    .single();

  const canPost = profile?.profile_completed === true;

  const { data: posts } = await supabase
    .from("posts")
    .select(`
      id,
      title,
      body,
      image_url,
      created_at,
      author:profiles!posts_author_id_fkey (
        id, full_name, avatar_url, usn, branch
      )
    `)
    .order("created_at", { ascending: false });

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.header}>
          <h1 className={styles.title}>Blog</h1>
          {canPost && (
            <Link href="/blog/new" className="btn-primary">
              + New post
            </Link>
          )}
        </div>

        {!canPost && (
          <div className={`card ${styles.notice}`}>
            <p>
              Finish setting up your profile to post.{" "}
              <Link href="/profile/setup" className={styles.link}>
                Complete profile →
              </Link>
            </p>
          </div>
        )}

        {!posts || posts.length === 0 ? (
          <div className={`card ${styles.empty}`}>
            <p>No posts yet. Be the first!</p>
          </div>
        ) : (
          <div className={styles.feed}>
            {posts.map((post: any) => (
              <article key={post.id} className={`card ${styles.post}`}>
                <header className={styles.postHeader}>
                  {post.author?.avatar_url ? (
                    <img
                      src={post.author.avatar_url}
                      alt={post.author.full_name}
                      className={styles.avatar}
                    />
                  ) : (
                    <div className={styles.avatarPlaceholder}>
                      {(post.author?.full_name ?? "?")[0].toUpperCase()}
                    </div>
                  )}
                  <div>
                    <div className={styles.authorName}>
                      {post.author?.full_name}
                    </div>
                    <div className={styles.postMeta}>
                      {post.author?.usn && <span>{post.author.usn}</span>}
                      <span>·</span>
                      <span>{new Date(post.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </header>

                <h2 className={styles.postTitle}>{post.title}</h2>
                <PostBody text={post.body} />

                {post.image_url && (
                  <img
                    src={post.image_url}
                    alt=""
                    className={styles.postImage}
                  />
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}