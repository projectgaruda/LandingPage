-- ============================================================
-- ADD-ON #2: build_progress
--   Phases / milestones with linked todos. Auto-completes when
--   every linked todo is marked done.
-- Append below todos_groups_and_events.sql. Idempotent.
-- ============================================================

create table if not exists public.build_progress (
  id           uuid primary key default gen_random_uuid(),
  title        text not null check (char_length(title) between 1 and 240),
  description  text check (description is null or char_length(description) <= 5000),
  group_name   text,
  todo_ids     uuid[] not null default '{}',
  position     integer not null default 0,
  created_by   uuid references public.profiles(id) on delete set null,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index if not exists build_progress_group_idx
  on public.build_progress (group_name, position desc);

drop trigger if exists build_progress_touch_updated_at on public.build_progress;
create trigger build_progress_touch_updated_at
  before update on public.build_progress
  for each row execute function public.touch_updated_at();

alter table public.build_progress enable row level security;

drop policy if exists "BuildProgress: read for authenticated"   on public.build_progress;
create policy "BuildProgress: read for authenticated"
  on public.build_progress for select
  to authenticated
  using (true);

drop policy if exists "BuildProgress: insert for authenticated" on public.build_progress;
create policy "BuildProgress: insert for authenticated"
  on public.build_progress for insert
  to authenticated
  with check (auth.uid() = created_by);

drop policy if exists "BuildProgress: update for authenticated" on public.build_progress;
create policy "BuildProgress: update for authenticated"
  on public.build_progress for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "BuildProgress: delete for authenticated" on public.build_progress;
create policy "BuildProgress: delete for authenticated"
  on public.build_progress for delete
  to authenticated
  using (true);

notify pgrst, 'reload schema';
