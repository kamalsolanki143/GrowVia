-- ============================================
-- GROWVIA — Complete Database Schema
-- Run this in Supabase SQL Editor
-- ============================================

-- PROFILES
create table profiles (
  id uuid references auth.users on delete cascade,
  full_name text,
  username text unique,
  phone text,
  college text,
  degree text,
  graduation_year int,
  avatar_url text,
  created_at timestamp default now(),
  primary key (id)
);
alter table profiles enable row level security;
create policy "Users can view own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);
create policy "Users can insert own profile" on profiles for insert with check (auth.uid() = id);

-- CAREER DNA
create table career_dna (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade,
  answers jsonb,
  result jsonb,
  career_paths text[],
  strengths text[],
  completed_at timestamp default now()
);
alter table career_dna enable row level security;
create policy "Users can manage own DNA" on career_dna for all using (auth.uid() = user_id);

-- OPPORTUNITIES
create table opportunities (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  company text,
  type text,
  domain text,
  deadline date,
  stipend text,
  link text,
  is_verified boolean default false,
  created_at timestamp default now()
);
alter table opportunities enable row level security;
create policy "Anyone can view opportunities" on opportunities for select using (true);

-- MISSIONS
create table missions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade,
  title text,
  description text,
  points int default 10,
  is_completed boolean default false,
  due_date date,
  created_at timestamp default now()
);
alter table missions enable row level security;
create policy "Users can manage own missions" on missions for all using (auth.uid() = user_id);

-- AUTO CREATE PROFILE ON SIGNUP
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, username, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    coalesce(new.raw_user_meta_data->>'username', 'user_' || substr(new.id::text, 1, 8)),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
