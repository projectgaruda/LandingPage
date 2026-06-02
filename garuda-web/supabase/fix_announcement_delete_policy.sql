-- ============================================================
-- FIX: announcement delete policy — "permission denied for table users"
--
-- Root cause: the previous policy queried auth.users to look up the
-- caller's email. The `authenticated` role does NOT have SELECT on
-- auth.users, so Postgres rejects the policy check.
--
-- The fix: read the email from the JWT via auth.jwt() ->> 'email'.
-- This is the Supabase-recommended pattern and needs no extra grants.
--
-- Idempotent. Safe to re-run.
-- ============================================================

drop policy if exists "Announcements: delete own or admin" on public.announcements;
create policy "Announcements: delete own or admin"
  on public.announcements
  for delete
  to authenticated
  using (
    auth.uid() = author_id
    or (auth.jwt() ->> 'email') = 'projectgarudarv@gmail.com'
  );

notify pgrst, 'reload schema';
