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

export async function createBuildProgress(formData: FormData) {
  const title = (formData.get("title") as string | null)?.trim();
  const descRaw = (formData.get("description") as string | null) ?? "";
  const description = descRaw.trim() === "" ? null : descRaw.trim();
  const groupName =
    (formData.get("group_name") as string | null)?.trim() || null;

  if (!title) return;
  if (title.length > 240) {
    throw new Error("Title too long (max 240 chars).");
  }

  const { supabase, user } = await requireUser();

  // Insert at top of group.
  const { data: top } = await supabase
    .from("build_progress")
    .select("position")
    .eq("group_name", groupName)
    .order("position", { ascending: false })
    .limit(1)
    .maybeSingle();

  const nextPos = (top?.position ?? 0) + 1;

  const { error } = await supabase.from("build_progress").insert({
    title,
    description,
    group_name: groupName,
    position: nextPos,
    created_by: user.id,
  });
  if (error) throw new Error(error.message);

  revalidatePath("/dashboard");
}

export async function updateBuildProgress(formData: FormData) {
  const id = formData.get("id") as string | null;
  const title = (formData.get("title") as string | null)?.trim();
  const descRaw = (formData.get("description") as string | null) ?? "";
  const description = descRaw.trim() === "" ? null : descRaw.trim();
  const groupName =
    (formData.get("group_name") as string | null)?.trim() || null;

  // todo_ids comes as a JSON array string from the client.
  const todoIdsRaw = formData.get("todo_ids") as string | null;
  let todoIds: string[] = [];
  if (todoIdsRaw) {
    try {
      const parsed = JSON.parse(todoIdsRaw);
      if (Array.isArray(parsed)) {
        todoIds = parsed.filter(
          (v): v is string => typeof v === "string" && v.length > 0,
        );
      }
    } catch {
      // ignore malformed input — keeps existing if any
    }
  }

  if (!id || !title) return;
  if (title.length > 240) {
    throw new Error("Title too long (max 240 chars).");
  }

  const { supabase } = await requireUser();

  const { error } = await supabase
    .from("build_progress")
    .update({
      title,
      description,
      group_name: groupName,
      todo_ids: todoIds,
    })
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/dashboard");
}

export async function deleteBuildProgress(formData: FormData) {
  const id = formData.get("id") as string | null;
  if (!id) return;

  const { supabase } = await requireUser();

  const { error } = await supabase
    .from("build_progress")
    .delete()
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/dashboard");
}
