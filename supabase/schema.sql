create extension if not exists pgcrypto;

create table if not exists public.portfolio_admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.portfolio_items (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('projects', 'experiences', 'skills', 'achievements')),
  content jsonb not null,
  sort_order integer not null default 0,
  published boolean not null default true,
  updated_at timestamptz not null default now()
);

create index if not exists portfolio_items_public_order
  on public.portfolio_items (kind, published, sort_order);

grant select on table public.portfolio_items to anon, authenticated;
grant insert, update, delete on table public.portfolio_items to authenticated;
grant select on table public.portfolio_admins to authenticated;

alter table public.portfolio_admins enable row level security;
alter table public.portfolio_items enable row level security;

create or replace function public.is_portfolio_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.portfolio_admins
    where user_id = (select auth.uid())
  );
$$;

revoke all on function public.is_portfolio_admin() from public;
grant execute on function public.is_portfolio_admin() to authenticated;

drop policy if exists "Admins can read their own access" on public.portfolio_admins;
create policy "Admins can read their own access"
  on public.portfolio_admins
  for select
  to authenticated
  using (user_id = (select auth.uid()));

drop policy if exists "Public can read published portfolio items" on public.portfolio_items;
create policy "Public can read published portfolio items"
  on public.portfolio_items
  for select
  to anon, authenticated
  using (published = true);

drop policy if exists "Admins can read all portfolio items" on public.portfolio_items;
create policy "Admins can read all portfolio items"
  on public.portfolio_items
  for select
  to authenticated
  using (public.is_portfolio_admin());

drop policy if exists "Admins can insert portfolio items" on public.portfolio_items;
create policy "Admins can insert portfolio items"
  on public.portfolio_items
  for insert
  to authenticated
  with check (public.is_portfolio_admin());

drop policy if exists "Admins can update portfolio items" on public.portfolio_items;
create policy "Admins can update portfolio items"
  on public.portfolio_items
  for update
  to authenticated
  using (public.is_portfolio_admin())
  with check (public.is_portfolio_admin());

drop policy if exists "Admins can delete portfolio items" on public.portfolio_items;
create policy "Admins can delete portfolio items"
  on public.portfolio_items
  for delete
  to authenticated
  using (public.is_portfolio_admin());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'portfolio-media',
  'portfolio-media',
  true,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public can read portfolio media" on storage.objects;
create policy "Public can read portfolio media"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'portfolio-media');

drop policy if exists "Admins can upload portfolio media" on storage.objects;
create policy "Admins can upload portfolio media"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'portfolio-media'
    and public.is_portfolio_admin()
  );

drop policy if exists "Admins can update portfolio media" on storage.objects;
create policy "Admins can update portfolio media"
  on storage.objects
  for update
  to authenticated
  using (
    bucket_id = 'portfolio-media'
    and public.is_portfolio_admin()
  )
  with check (
    bucket_id = 'portfolio-media'
    and public.is_portfolio_admin()
  );

drop policy if exists "Admins can delete portfolio media" on storage.objects;
create policy "Admins can delete portfolio media"
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id = 'portfolio-media'
    and public.is_portfolio_admin()
  );

-- After creating the owner account in Supabase Auth, run once with that email:
-- insert into public.portfolio_admins (user_id)
-- select id from auth.users where email = 'YOUR_ADMIN_EMAIL'
-- on conflict (user_id) do nothing;