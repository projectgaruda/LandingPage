"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  return { supabase, user };
}

export async function createTodo(formData: FormData) {
  const title = (formData.get("title") as string | null)?.trim();
  const descRaw = (formData.get("description") as string | null) ?? "";
  const description = descRaw.trim() === "" ? null : descRaw.trim();
  const deadlineRaw = (formData.get("deadline") as string | null) ?? "";
  const deadline = deadlineRaw.trim() === "" ? null : deadlineRaw.trim();
  const groupName = (formData.get("group_name") as string | null)?.trim() || null;

  if (!title) return;
  if (title.length > 240) {
    throw new Error("Todo is too long (max 240 chars).");
  }

  const { supabase, user } = await requireUser();

  // Insert at the top of this group — position = max + 1 in the same group.
  const { data: top } = await supabase
    .from("todos")
    .select("position")
    .eq("group_name", groupName)
    .order("position", { ascending: false })
    .limit(1)
    .maybeSingle();

  const nextPos = (top?.position ?? 0) + 1;

  const { error } = await supabase.from("todos").insert({
    user_id: user.id,
    title,
    description,
    deadline,
    group_name: groupName,
    position: nextPos,
  });
  if (error) throw new Error(error.message);

  revalidatePath("/dashboard");
}

export async function toggleTodo(formData: FormData) {
  const id = formData.get("id") as string | null;
  const done = formData.get("done") === "true";
  if (!id) return;

  const { supabase } = await requireUser();

  const { error } = await supabase
    .from("todos")
    .update({ done: !done })
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/dashboard");
}

export async function deleteTodo(formData: FormData) {
  const id = formData.get("id") as string | null;
  if (!id) return;

  const { supabase } = await requireUser();

  const { error } = await supabase.from("todos").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/dashboard");
}

export async function updateTodo(formData: FormData) {
  const id = formData.get("id") as string | null;
  const title = (formData.get("title") as string | null)?.trim();
  const descRaw = (formData.get("description") as string | null) ?? "";
  const description = descRaw.trim() === "" ? null : descRaw.trim();
  const deadlineRaw = (formData.get("deadline") as string | null) ?? "";
  const deadline = deadlineRaw.trim() === "" ? null : deadlineRaw.trim();
  const groupName = (formData.get("group_name") as string | null)?.trim() || null;

  if (!id || !title) return;
  if (title.length > 240) {
    throw new Error("Todo is too long (max 240 chars).");
  }

  const { supabase } = await requireUser();

  const { error } = await supabase
    .from("todos")
    .update({ title, description, deadline, group_name: groupName })
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/dashboard");
}
