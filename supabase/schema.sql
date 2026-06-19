-- ============================================================
-- GROWVIA — SUPABASE DATABASE SCHEMA
-- Run this entire block in: Supabase Dashboard → SQL Editor → Run
-- ============================================================

-- ============================================
-- TABLE 1: PROFILES
-- ============================================
-- Why: Supabase Auth creates users in auth.users (internal table we can't modify).
-- We create our own profiles table that extends auth.users with app-specific fields.
-- The id references auth.users so they stay in sync.
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  name text not null,
  username text unique not null,
  email text unique not null,
  avatar_url text,
  talent_score integer default 0,
  domain text default 'Undecided',
  streak_days integer default 0,
  bio text,
  skills text[] default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- TABLE 2: DNA RESULTS
-- ============================================
-- Why: Stores the result of the Career DNA quiz.
-- Each user can take it multiple times — we store all results, fetch latest.
-- raw_answers is jsonb so we store the original answers for future re-analysis.
create table public.dna_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  builder_score integer not null,
  researcher_score integer not null,
  analytical_score integer not null,
  leader_score integer not null,
  designer_score integer not null,
  top_domain text not null,
  recommended_domains text[] not null,
  raw_answers jsonb,
  created_at timestamptz default now()
);

-- ============================================
-- TABLE 3: OPPORTUNITIES
-- ============================================
-- Why: Stores internships, hackathons, fellowships, etc.
-- match_score is pre-computed relevance (0-100) — not personalized yet.
-- type uses a check constraint so only valid values are allowed.
create table public.opportunities (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  type text not null check (type in ('internship','hackathon','fellowship','scholarship','competition')),
  organization text not null,
  domain text not null,
  match_score integer default 0,
  deadline date not null,
  description text,
  apply_url text,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- ============================================
-- TABLE 4: BADGES
-- ============================================
-- Why: Gamification. Users earn badges for completing actions.
-- badge_icon stores an emoji or icon name — frontend decides how to render.
create table public.badges (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  badge_name text not null,
  badge_icon text not null,
  badge_description text,
  earned_at timestamptz default now()
);

-- ============================================
-- TABLE 5: MISSIONS
-- ============================================
-- Why: Daily tasks/challenges for students.
-- XP system for engagement. completed flag tracks progress.
create table public.missions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  task text not null,
  xp integer default 10,
  completed boolean default false,
  category text,
  created_at timestamptz default now()
);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================
-- Why RLS: Even if someone calls Supabase directly (bypassing our API),
-- they cannot see another user's data. Security at the database level.

alter table public.profiles enable row level security;
alter table public.dna_results enable row level security;
alter table public.badges enable row level security;
alter table public.missions enable row level security;

-- Profiles: users can only see/edit their own profile
-- EXCEPTION: public profile view by username is allowed (for Talent Passport feature)
create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

create policy "Public can view any profile by username" on public.profiles
  for select using (true);

-- DNA Results: private, only the owner
create policy "Users can view own DNA" on public.dna_results
  for select using (auth.uid() = user_id);

create policy "Users can insert own DNA" on public.dna_results
  for insert with check (auth.uid() = user_id);

-- Opportunities: fully public read (no auth needed to browse)
alter table public.opportunities enable row level security;
create policy "Anyone can view opportunities" on public.opportunities
  for select using (is_active = true);

-- Badges: private per user
create policy "Users can view own badges" on public.badges
  for select using (auth.uid() = user_id);

-- Missions: private, user can view and update their own
create policy "Users can view own missions" on public.missions
  for select using (auth.uid() = user_id);

create policy "Users can update own missions" on public.missions
  for update using (auth.uid() = user_id);

-- ============================================
-- SEED DATA — OPPORTUNITIES
-- ============================================
-- Why: Frontend needs real data to display on Opportunity Radar.
-- Hardcoded for now; can be replaced with a scraper/admin panel later.
insert into public.opportunities (title, type, organization, domain, match_score, deadline, description, apply_url) values
('Google Summer of Code 2026', 'fellowship', 'Google', 'All', 91, '2026-04-04', 'Open source fellowship by Google', 'https://summerofcode.withgoogle.com'),
('Microsoft Explore Internship', 'internship', 'Microsoft', 'Web Dev', 87, '2026-06-30', 'Internship for second year students', 'https://careers.microsoft.com'),
('MLH Fellowship', 'fellowship', 'MLH', 'AI/ML', 84, '2026-07-15', 'Open source fellowship for hackers', 'https://fellowship.mlh.io'),
('Smart India Hackathon', 'hackathon', 'Govt of India', 'All', 96, '2026-08-01', 'National level hackathon', 'https://sih.gov.in'),
('Flipkart Grid 7.0', 'competition', 'Flipkart', 'All', 78, '2026-07-20', 'Engineering challenge by Flipkart', 'https://unstop.com'),
('Amazon ML Summer School', 'fellowship', 'Amazon', 'AI/ML', 82, '2026-05-31', 'ML program by Amazon', 'https://amazon.jobs'),
('GitHub Externship', 'internship', 'GitHub', 'Web Dev', 79, '2026-07-01', 'Remote internship at GitHub', 'https://github.com'),
('Devfolio Hackathon', 'hackathon', 'Devfolio', 'All', 88, '2026-06-25', 'Web3 hackathon by Devfolio', 'https://devfolio.co'),
('Outreachy Internship', 'internship', 'Outreachy', 'All', 75, '2026-08-15', 'Internship for underrepresented groups', 'https://outreachy.org'),
('FOSSASIA Fellowship', 'fellowship', 'FOSSASIA', 'All', 72, '2026-07-30', 'Open source fellowship Asia', 'https://fossasia.org');
