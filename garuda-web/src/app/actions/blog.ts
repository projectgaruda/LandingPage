"use server";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const ADMIN_EMAIL = "projectgarudarv@gmail.com";

export async function deletePost(postId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: post } = await supabase
    .from("posts")
    .select("author_id")
    .eq("id", postId)
    .single();

  const isAuthor = post?.author_id === user.id;
  const isAdmin = user.email === ADMIN_EMAIL;

  if (!isAuthor && !isAdmin) {
    throw new Error("Not authorised to delete this post");
  }

  await supabase.from("posts").delete().eq("id", postId);
  redirect("/blog");
}
