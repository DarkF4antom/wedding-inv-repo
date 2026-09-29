-- Run this in Supabase Dashboard -> SQL Editor.
-- This creates a private RSVP table. The public website writes through
-- the SvelteKit /api/rsvp server endpoint, not directly to the table.

create table if not exists public.rsvps (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  contact text,
  attending boolean not null,
  guest_count integer not null default 0,
  message text,
  created_at timestamptz not null default now(),

  constraint rsvps_name_length
    check (char_length(name) between 1 and 120),

  constraint rsvps_contact_length
    check (contact is null or char_length(contact) <= 160),

  constraint rsvps_message_length
    check (message is null or char_length(message) <= 1000),

  constraint rsvps_guest_count
    check (
      (attending = true and guest_count between 1 and 20)
      or
      (attending = false and guest_count = 0)
    )
);

alter table public.rsvps enable row level security;

-- Keep the RSVP data private from website visitors.
revoke all on table public.rsvps from anon, authenticated;

-- The SvelteKit backend uses the Supabase secret key/server role.
grant all on table public.rsvps to service_role;

create index if not exists rsvps_created_at_idx
  on public.rsvps (created_at desc);
