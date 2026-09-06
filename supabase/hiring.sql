-- Hiring tracker schema.
-- Run once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.
--
-- Everything here is reachable ONLY through the service role. RLS is enabled
-- with no policies at all, which means anon and authenticated clients can read
-- nothing -- deny by default. The panel never talks to Supabase from the
-- browser; it goes through /hiring, which proxy.ts guards with Basic Auth and
-- which queries using the service role key server-side.

create table if not exists public.hiring_candidates (
  id            text primary key,          -- CV filename stem, stable across rebuilds
  role          text not null,             -- 'marketing-intern' | 'business-development-intern'
  name          text not null,
  location      text,
  education     text,

  -- Assessment: regenerated from assessments.json on each upload.
  tier          text,
  rating_seed   int  default 0,            -- suggested rating
  verdict       text,
  strengths     jsonb not null default '[]'::jsonb,
  concerns      jsonb not null default '[]'::jsonb,

  -- Extracted from the CV.
  email         text,
  phone         text,
  signals       text,
  studying      boolean not null default false,
  flag          text,

  -- Storage object paths inside the private 'hiring-cvs' bucket.
  cv_object     text,
  text_object   text,
  text_label    text,

  -- His decisions. NOT overwritten by re-uploading CVs.
  status        text not null default 'New',
  rating        int  not null default 0,
  notes         text not null default '',

  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists hiring_candidates_role_idx
  on public.hiring_candidates (role);

alter table public.hiring_candidates enable row level security;

-- No policies on purpose. With RLS on and zero policies, every non-service-role
-- client is denied. Do not add a "read for authenticated" policy here: these
-- rows carry candidates' phone numbers and home addresses.

create or replace function public.touch_hiring_candidates()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists hiring_candidates_touch on public.hiring_candidates;
create trigger hiring_candidates_touch
  before update on public.hiring_candidates
  for each row execute function public.touch_hiring_candidates();
