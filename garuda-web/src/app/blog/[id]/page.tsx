import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deletePost } from "@/app/actions/blog";
import PostBody from "@/components/PostBody";
import styles from "./page.module.css";

const ADMIN_EMAIL = "projectgarudarv@gmail.com";

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: post } = await supabase
    .from("posts")
    .select(`
      id,
      title,
      body,
      image_url,
      created_at,
      author:profiles!posts_author_id_fkey (
        id, full_name, avatar_url, usn, branch, blog_banner_url
      )
    `)
    .eq("id", id)
    .single();

  if (!post) notFound();

  const author = (post as any).author as {
    id: string;
    full_name: string | null;
    avatar_url: string | null;
    usn: string | null;
    branch: string | null;
    blog_banner_url: string | null;
  } | null;

  const canDelete = user.email === ADMIN_EMAIL || author?.id === user.id;
  const coverImg = post.image_url ?? author?.blog_banner_url ?? null;

  const dateStr = new Date(post.created_at).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.topBar}>
          <Link href="/blog" className={styles.back}>← Back to Blog</Link>
          {canDelete && (
            <form action={deletePost.bind(null, post.id)}>
              <button type="submit" className={styles.deleteBtn}>Delete post</button>
            </form>
          )}
        </div>

        <article className={styles.article}>
          {coverImg && (
            <div className={styles.coverWrap}>
              <img src={coverImg} alt="" className={styles.cover} />
            </div>
          )}

          <div className={styles.header}>
            <h1 className={styles.title}>{post.title}</h1>
            <div className={styles.meta}>
              {author?.avatar_url ? (
                <img src={author.avatar_url} alt={author.full_name ?? ""} className={styles.avatar} />
              ) : (
                <div className={styles.avatarInitials}>
                  {(author?.full_name ?? "?")[0].toUpperCase()}
                </div>
              )}
              <div className={styles.metaText}>
                <span className={styles.authorName}>{author?.full_name ?? "Anonymous"}</span>
                <span className={styles.metaSub}>
                  {author?.usn && <>{author.usn} · </>}
                  {author?.branch && <>{author.branch} · </>}
                  {dateStr}
                </span>
              </div>
            </div>
          </div>

          <div className={styles.body}>
            <PostBody text={post.body} />
          </div>
        </article>
      </div>
    </div>
  );
}
