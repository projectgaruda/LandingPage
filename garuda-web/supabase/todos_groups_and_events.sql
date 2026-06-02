-- ============================================================
-- TODO GROUPS + EDITABLE EVENTS
-- Idempotent. Safe to re-run. Non-destructive.
--
-- What this does:
--   1. Adds `group_name` column to existing `todos` table.
--   2. Backfills any existing rows with a default group (only
--      where group_name IS NULL, never overwrites).
--   3. Loosens todo RLS from per-user to team-shared (any
--      authenticated team member can read/write).
--   4. Creates a new `events` table with the same team-shared
--      access pattern.
--
-- IMPORTANT NOTE on policy change (step 3):
--   The previous policies were "user can only see/edit own todos".
--   The new policies are "any authenticated user can edit any todo".
--   This is the user-requested behaviour (team-shared lists).
--   If you have existing personal todos, they will become visible
--   to other team members after this runs.
-- ============================================================

-- 1. Add group_name column to todos
alter table public.todos
  add column if not exists group_name text;

-- 2. Backfill any NULL group_name to a sensible default
update public.todos
  set group_name = 'Operations'
  where group_name is null;

-- 3. Replace todo RLS — team-shared (read/write for any authenticated)
drop policy if exists "Todos: read own"    on public.todos;
drop policy if exists "Todos: insert own"  on public.todos;
drop policy if exists "Todos: update own"  on public.todos;
drop policy if exists "Todos: delete own"  on public.todos;

drop policy if exists "Todos: read for authenticated"   on public.todos;
create policy "Todos: read for authenticated"
  on public.todos for select
  to authenticated
  using (true);

drop policy if exists "Todos: insert for authenticated" on public.todos;
create policy "Todos: insert for authenticated"
  on public.todos for insert
  to authenticated
  with check (auth.uid() = user_id);  -- still record who created

drop policy if exists "Todos: update for authenticated" on public.todos;
create policy "Todos: update for authenticated"
  on public.todos for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Todos: delete for authenticated" on public.todos;
create policy "Todos: delete for authenticated"
  on public.todos for delete
  to authenticated
  using (true);

-- ============================================================
-- 4. EVENTS — team-shared, editable by any authenticated user
-- ============================================================
create table if not exists public.events (
  id          uuid primary key default gen_random_uuid(),
  label       text not null check (char_length(label) between 1 and 200),
  event_date  date not null,
  tag         text,
  created_by  uuid references public.profiles(id) on delete set null,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists events_date_idx
  on public.events (event_date);

-- Ensure the updated_at trigger function exists (idempotent).
-- Safe even if you've already run announcements_todos.sql.
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists events_touch_updated_at on public.events;
create trigger events_touch_updated_at
  before update on public.events
  for each row execute function public.touch_updated_at();

alter table public.events enable row level security;

drop policy if exists "Events: read for authenticated"   on public.events;
create policy "Events: read for authenticated"
  on public.events for select
  to authenticated
  using (true);

drop policy if exists "Events: insert for authenticated" on public.events;
create policy "Events: insert for authenticated"
  on public.events for insert
  to authenticated
  with check (auth.uid() = created_by);

drop policy if exists "Events: update for authenticated" on public.events;
create policy "Events: update for authenticated"
  on public.events for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Events: delete for authenticated" on public.events;
create policy "Events: delete for authenticated"
  on public.events for delete
  to authenticated
  using (true);

-- ============================================================
-- 5. REFRESH POSTGREST SCHEMA CACHE
--    Tells the Supabase API layer about the new table / columns.
--    Without this, you may hit "Could not find the table" errors.
-- ============================================================
notify pgrst, 'reload schema';
