# Belli landing page

Static Astro port of the Claude Design exports in `design/`:

| Page | Design file | Source |
|---|---|---|
| `/` | `Belli Landing Page v8.dc.html` | `src/pages/index.astro`, one file per section in `src/sections/` (same order as the design) |
| `/kontak` | `Belli Kontak.dc.html` | `src/pages/kontak.astro` |
| `/kebijakan-privasi` | `Belli Kebijakan Privasi.dc.html` | `src/pages/kebijakan-privasi.astro` |
| `/blog`, `/blog/<slug>` | `Belli Blog.dc.html`, `Belli Blog Detail.dc.html` | `src/pages/blog/`, `src/layouts/Blog.astro`, `src/lib/blog.ts` |

The layout follows v8. The landing page keeps the shortened copy; text that only exists in v8
(feature list, pricing table, example sites) comes from v8. Subpages share
`src/layouts/Page.astro` (header and footer).

Styling is Tailwind v4. The colour and font tokens (shadcn-style names, v8 values) are in
`src/styles/global.css`: Outfit, Caveat for the handwritten notes, and DM Mono for URLs and labels.
Shared pieces (Button, Badge, Card, BrowserFrame) are in `src/components/ui/`.
There's no React. The menu, price toggle, plan picker, FAQ and forms are native HTML plus small
scripts that flip `data-*` attributes.

`src/scripts/slider.ts` runs both sliders (Dashboard and Contoh website). Mark the root with
`data-slider data-interval`, every element of slide i with `data-slide="i"`, and add optional
`data-tab`, `data-prev`, `data-next` and `data-counter`. Autoplay pauses on hover or focus and
is off with reduced motion or `config.autoplay = false`.

Every "Coba gratis" and "Daftar" button links to `/kontak`, with the topic (and plan) ticked through
the URL, e.g. `/kontak?topik=program-perintis` or `/kontak?topik=daftar-paket&paket=katalog`. The form
sends the answers to Web3Forms (`config.web3formsKey`), which emails them to the inbox the key was
made for. One of WhatsApp or email is required so we can reply; a hidden `botcheck` field catches
bots. After sending, a thank-you panel offers "Lanjut chat di WhatsApp" with the same answers.

The design was drawn with `content-box` sizing, and Tailwind uses `border-box`. Some sizes are
therefore padding-inclusive, e.g. `max-w-[1248px] px-6` is the design's 1200px column.

Needs Node 24 (`.nvmrc`). Astro 7 refuses Node 22.22.

```sh
nvm use
npm install
npm run dev       # http://localhost:4321
npm run build     # static site in dist/
```

## Blog

Articles are Markdown files in `src/content/blog/`. `src/content/blog/_CARA-MENULIS.md` lists every
field and the Markdown features (lead paragraph, `##` sections for the table of contents, the
WhatsApp chat callout, numbered steps).

## Deploy

Cloudflare Pages project `belli` (belli-7xq.pages.dev) builds every push: `main` goes live on
https://belli.id, other branches get a preview URL. `www.belli.id` redirects to `belli.id` (zone
redirect rule). Pages installs with npm 10, so after changing dependencies refresh the lock file
with `npx npm@10 install --package-lock-only`, or the build fails on `npm ci`.

## Still open

- `/kebijakan-privasi` and `/syarat-ketentuan` are kept basic: no UU PDP reference, age limit,
  liability cap, or court venue. Add those only after a lawyer has reviewed them.
- `slotsLeft` in `src/config.ts` is updated by hand when a Perintis slot is taken.
- In the Web3Forms dashboard, restrict the access key to the live domain.
- The 4 "Segera hadir" examples in `src/sections/Examples.astro`: add `host` and `img` when a demo exists.

`public/contoh/*.webp` are 1440×900 screenshots of the two client sites. `public/og.jpg` is the
share image (1200×630, under 300 KB for WhatsApp). `src/assets/fitur/` holds the Unsplash photos in
the features mock; Astro converts them to sized WebP at build time.
