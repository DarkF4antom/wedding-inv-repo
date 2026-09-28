# Krishna & Nidhun — SvelteKit Wedding Invitation

A self-contained, interactive South Indian wedding invitation designed for Vercel.

## Details included from the supplied invitation

- Bride: Krishna
- Bride's parents: Sri. Kishore Kumar & Smt. Ragi Kishore
- Groom: Nidhun
- Groom's parents: Sri. Ramachandran & Smt. Mini Ramachandran
- Date: Saturday, 12 December 2026
- Muhurtham: 7:35 AM to 9:00 AM
- Muhurtham venue: Alakananda Backwater Resort and Homestay, Vadanappally
- Reception: 5:00 PM onwards
- Reception venue: St. John the Baptist Church Hall, Kodakara

## Run

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Production

```bash
npm run build
npm run preview
```

## Assets

Do NOT use the supplied reference invitation as the website background.

Add real artwork later under:

- `static/images/ganapathi.png`
- `static/images/floral-top.png`
- `static/images/floral-corner-left.png`
- `static/images/floral-corner-right.png`
- `static/images/couple.jpg`

The current site deliberately uses clean image slots instead of generated/pixel-art substitutes.


## Supplied artwork currently installed

- `static/images/ganapathi.png`
- `static/images/floral.png`

In SvelteKit, files in `static/` are served from the site root, so these are referenced as `/images/ganapathi.png` and `/images/floral.png`.


The Ganapathi asset is transparent-cropped to its visible artwork bounds for accurate positioning.
