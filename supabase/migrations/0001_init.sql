-- BSA Life Driver — initial schema
-- Three MVP divisions: Daily Life, Fitness (workouts + weight), Notebook.
-- Every table is scoped to the logged-in user via Row Level Security,
-- since the Supabase publishable key is exposed in the browser bundle
-- once deployed (see CLAUDE.md Decisions Log, 2026-08-23).

create extension if not exists "pgcrypto";

-- Daily Life: plain tasks across Home / Car / NOC / Work categories.
create table daily_life_tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  title text not null,
  category text not null check (category in ('Home', 'Car', 'NOC', 'Work')),
  priority text not null default 'Normal' check (priority in ('Normal', 'High')),
  status text not null default 'Not Started' check (status in ('Not Started', 'In Progress', 'Done')),
  due_date date,
  completed_date date,
  notes text,
  created_at timestamptz not null default now()
);

-- Fitness: workout sessions, logged weekly in a batch.
-- Routine is free text (open vocabulary, e.g. "Legs and Shoulders", "Swimming").
-- Volume (exercises/sets/reps/weight) is captured as free text in `notes` for MVP.
create table fitness_workouts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  session_date date not null,
  routine text not null,
  duration_minutes integer,
  notes text,
  created_at timestamptz not null default now()
);

-- Fitness: body weight, logged monthly.
create table fitness_weight_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  log_date date not null,
  weight_kg numeric(5, 2) not null,
  notes text,
  created_at timestamptz not null default now()
);

-- Notebook: personal reference material, not actionable (no status/dates).
-- Type is open vocabulary, seeded with Quote / Books / Movies / Websites / Agencies.
create table notebook_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  name text not null,
  type text not null,
  notes text,
  created_at timestamptz not null default now()
);

-- Row Level Security: every table is private to its owning user.
alter table daily_life_tasks enable row level security;
alter table fitness_workouts enable row level security;
alter table fitness_weight_logs enable row level security;
alter table notebook_entries enable row level security;

create policy "Owner can manage their daily life tasks"
  on daily_life_tasks for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Owner can manage their fitness workouts"
  on fitness_workouts for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Owner can manage their fitness weight logs"
  on fitness_weight_logs for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Owner can manage their notebook entries"
  on notebook_entries for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
