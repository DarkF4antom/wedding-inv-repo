# Wedding invitation visual revamp

Replace these files in the existing SvelteKit project:

- `src/routes/+page.svelte`
- `src/styles.css`

Add these two image files:

- `static/images/bride.png`
- `static/images/groom.png`

This version implements:
- maroon radial background (#9a0133 centre -> #6c0123 edges)
- gold typography/accent palette
- bride/groom portraits on the invitation page
- formal gold reception theme
- sequential page unlocking
- top navigation that only exposes unlocked sections
- RSVP UI

The RSVP currently records the response only in the page state and shows a confirmation screen.
Supabase persistence is intentionally the next step so the static/Vercel setup is not mixed with database work yet.
