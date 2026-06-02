-- ============================================================
-- ANNOUNCEMENTS + TODOS
-- Apply in the Supabase SQL Editor.
-- Idempotent: safe to re-run.
-- ============================================================

-- Helper: admin email (kept in sync with src/app/actions/announcements.ts)
-- (We don't store it in the DB; policies check the auth.email() function.)

-- ============================================================
-- 1. ANNOUNCEMENTS
--    Any authenticated team member can create.
--    Anyone authenticated can read.
--    Author can delete their own; admin email can delete any.
-- ============================================================

create table if not exists public.announcements (
  id          uuid primary key default gen_random_uuid(),
  body        text not null check (char_length(body) between 1 and 500),
  author_id   uuid not null references public.profiles(id) on delete cascade,
  created_at  timestamptz not null default now()
);

create index if not exists announcements_created_at_idx
  on public.announcements (created_at desc);

alter table public.announcements enable row level security;

-- Read: any authenticated user
drop policy if exists "Announcements: read for authenticated" on public.announcements;
create policy "Announcements: read for authenticated"
  on public.announcements
  for select
  to authenticated
  using (true);

-- Insert: any authenticated user; must be the author themselves
drop policy if exists "Announcements: insert own" on public.announcements;
create policy "Announcements: insert own"
  on public.announcements
  for insert
  to authenticated
  with check (auth.uid() = author_id);

-- Delete: own announcement, OR admin email.
-- Email is read from the JWT (auth.jwt) — the `authenticated` role
-- does NOT have SELECT permission on auth.users, so querying that
-- table directly here triggers "permission denied for table users".
drop policy if exists "Announcements: delete own or admin" on public.announcements;
create policy "Announcements: delete own or admin"
  on public.announcements
  for delete
  to authenticated
  using (
    auth.uid() = author_id
    or (auth.jwt() ->> 'email') = 'projectgarudarv@gmail.com'
  );

-- ============================================================
-- 2. TODOS
--    Strictly per-user. Each user reads/writes their own only.
-- ============================================================

create table if not exists public.todos (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references public.profiles(id) on delete cascade,
  title       text not null check (char_length(title) between 1 and 240),
  done        boolean not null default false,
  deadline    date,
  position    integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists todos_user_pos_idx
  on public.todos (user_id, done, position, created_at desc);

-- Auto-touch updated_at
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists todos_touch_updated_at on public.todos;
create trigger todos_touch_updated_at
  before update on public.todos
  for each row execute function public.touch_updated_at();

alter table public.todos enable row level security;

drop policy if exists "Todos: read own" on public.todos;
create policy "Todos: read own"
  on public.todos
  for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Todos: insert own" on public.todos;
create policy "Todos: insert own"
  on public.todos
  for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Todos: update own" on public.todos;
create policy "Todos: update own"
  on public.todos
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Todos: delete own" on public.todos;
create policy "Todos: delete own"
  on public.todos
  for delete
  to authenticated
  using (auth.uid() = user_id);
