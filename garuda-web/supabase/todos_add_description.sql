-- ============================================================
-- TODOS — add optional description column
-- Idempotent. Safe to re-run. Non-destructive.
-- Adds `description` text column to existing `todos` table.
-- Existing rows get NULL description (fine, the UI handles it).
-- ============================================================

alter table public.todos
  add column if not exists description text;

-- Optional sanity-check: confirm the column landed.
-- select column_name, data_type from information_schema.columns
-- where table_schema = 'public' and table_name = 'todos';
