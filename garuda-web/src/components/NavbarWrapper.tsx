import { createClient } from "@/lib/supabase/server";
import Navbar from "./Navbar";

export default async function NavbarWrapper() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let profile: {
    full_name: string | null;
    avatar_url: string | null;
    usn: string | null;
    branch: string | null;
    role: string | null;
  } | null = null;

  if (user) {
    const { data } = await supabase
      .from("profiles")
      .select("full_name, avatar_url, usn, branch, role")
      .eq("id", user.id)
      .single();
    profile = data;
  }

  return <Navbar user={user} profile={profile} />;
}
