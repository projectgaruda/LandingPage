"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const ADMIN_EMAIL = "projectgarudarv@gmail.com";

export async function createAnnouncement(formData: FormData) {
  const body = (formData.get("body") as string | null)?.trim();
  if (!body) return;
  if (body.length > 500) {
    throw new Error("Announcement is too long (max 500 chars).");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { error } = await supabase.from("announcements").insert({
    body,
    author_id: user.id,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/dashboard");
}

export async function deleteAnnouncement(formData: FormData) {
  const id = formData.get("id") as string | null;
  if (!id) return;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // The DB policy enforces author-or-admin, but we double-check here
  // so we can give a sensible error message client-side.
  const { data: row } = await supabase
    .from("announcements")
    .select("author_id")
    .eq("id", id)
    .single();

  const isAuthor = row?.author_id === user.id;
  const isAdmin = user.email === ADMIN_EMAIL;
  if (!isAuthor && !isAdmin) {
    throw new Error("Not authorised to delete this announcement.");
  }

  const { error } = await supabase.from("announcements").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/dashboard");
}
