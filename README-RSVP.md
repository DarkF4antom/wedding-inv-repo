# RSVP backend

## 1. Install the client

Run from the SvelteKit project root:

    npm install @supabase/supabase-js

## 2. Create the database table

Open Supabase Dashboard -> SQL Editor and run:

    supabase/rsvp.sql

The table has RLS enabled and no public SELECT/INSERT grants.
The website talks to `/api/rsvp`, and that server endpoint writes to Supabase.

## 3. Local environment

Create `.env` in the project root:

    SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
    SUPABASE_SECRET_KEY=sb_secret_...

Do not commit `.env`.

## 4. Vercel

Add the same two environment variables in:
Project -> Settings -> Environment Variables

Use the secret key only as a server environment variable.

## 5. Endpoint

POST `/api/rsvp`

Body:

    {
      "name": "Rahul",
      "contact": "9876543210",
      "attending": true,
      "guestCount": 2,
      "message": "Looking forward to it!",
      "website": ""
    }

The endpoint validates the data, ignores obvious bot submissions via the honeypot,
and inserts the RSVP into `public.rsvps`.

## 6. Admin tracking later

The next step can be a protected `/admin/rsvp` page showing:
- total responses
- attending / not attending
- expected guest count
- searchable RSVP table
- CSV export

Do not expose the admin query through the public browser.
