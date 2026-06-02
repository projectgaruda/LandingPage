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

export async function createEvent(formData: FormData) {
  const label = (formData.get("label") as string | null)?.trim();
  const dateRaw = (formData.get("event_date") as string | null)?.trim();
  const tag = (formData.get("tag") as string | null)?.trim() || null;

  if (!label || !dateRaw) return;
  if (label.length > 200) {
    throw new Error("Event label too long (max 200 chars).");
  }

  const { supabase, user } = await requireUser();

  const { error } = await supabase.from("events").insert({
    label,
    event_date: dateRaw,
    tag,
    created_by: user.id,
  });
  if (error) throw new Error(error.message);

  revalidatePath("/dashboard");
}

export async function deleteEvent(formData: FormData) {
  const id = formData.get("id") as string | null;
  if (!id) return;

  const { supabase } = await requireUser();

  const { error } = await supabase.from("events").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/dashboard");
}
