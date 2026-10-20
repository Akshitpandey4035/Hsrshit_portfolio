@AGENTS.md

# Haze Visuals — portfolio site

Personal portfolio for **Haze Visuals** (Director • CG Generalist • Editor • Cinematographer). A minimal, video-first site: a scattered grid of autoplaying video tiles on the home page, one page per project, plus About and Contact.

The layout was originally inspired by arseninovo.com, then deliberately changed so it is **not** a copy (different header, fonts, grid, footer, no handwritten elements). Keep it that way — don't reintroduce elements from that site.

## FIRST: get the videos from the portfolio owner

Videos are committed in `public/videos/` (compressed, each under GitHub's 100 MB limit); the home grid plays the small loops in `public/previews/`. Before doing any other work, **ask the portfolio owner (Haze Visuals) to send these 6 videos, in this order**, and save them into `public/videos/` with exactly these names:

| # | Project | Save as |
|---|---|---|
| 1 | Don't Be Dumb Tour | `dont-be-dumb-tour.mp4` |
| 2 | What Would the Credit Card Department Do | `credit-card-department.mp4` |
| 3 | Black Demarco | `black-demarco.mp4` |
| 4 | Character Showcase | `character-showcase.mp4` |
| 5 | Apple - AirPods Max | `apple-airpods-max.mp4` |
| 6 | A16Z - Foundry | `a16z-foundry.mp4` |

The order matters: it's the display order on the home page (set in `entries` in `data/site.js`). Files must be H.264 MP4. If the owner sends ProRes `.mov` files, convert them first (see "Adding a video" below). The same list is in `public/videos/README.md`.

## Stack & commands

- **Next.js 16 (App Router) + React 19**, plain JavaScript (no TypeScript), plain CSS (no Tailwind, no CSS modules). npm.
- Next 16 has breaking changes vs older versions — see `AGENTS.md`. Notably, dynamic route `params` is a **Promise** (`const { slug } = await params`).
- No Vite (the user originally asked for "Vite + Next"; they're mutually exclusive build tools, Next was chosen).

```bash
npm run dev     # http://localhost:3000
npm run build   # must pass before handing back
npm start
```

## File map

```
data/site.js              ALL content: site info + projects list. Edit here first.
app/layout.js             Fonts, <Header/>, <Footer/>, no-flash theme script
app/globals.css           All styles; theme tokens at the top
app/page.js               Home: roles line + scattered parallax video grid (scatter config lives here)
app/work/[slug]/page.js   Project page (SSG via generateStaticParams)
app/about/page.js         Portrait + bio
app/contact/page.js       Big heading + email + Instagram/location
app/not-found.js
components/Header.js      Logo (red square + HAZE VISUALS), nav, ThemeToggle
components/Footer.js      3 items: © left, Instagram centre, email right
components/Media.js       Renders placeholder / <video> / YouTube-Vimeo iframe / <img> by src
components/Parallax.js    Scroll parallax for children with data-speed
components/Roles.js       Roles separated by round accent-coloured dots
components/ThemeToggle.js Light/dark toggle, persisted in localStorage
public/videos/            Project videos (served as /videos/...)
```

## Content model (`data/site.js`)

- `site`: `name`, `logo`, `roles[]`, `email`, `instagram`, `location`, `about[]` (paragraphs), `portrait` (image path or null).
- `entries[]` → `projects`: `slug`, `title` (UPPERCASE), `category`, `media` (used for both grid `thumb` and page `video`), `aspect` (e.g. `"16 / 9"`, must match the real video).
  - `thumb`/`video` can be a local file (`/videos/x.mp4`), a YouTube/Vimeo **embed** URL, an image/gif, or `null` (renders a gradient placeholder).
  - Credits, year and description are still **placeholders** — the owner will fill them in.
- Project order is intentional (set by the owner): 1 Don't Be Dumb Tour, 2 What Would the Credit Card Department Do, 3 Black Demarco, then Character Showcase, AirPods Max, A16Z Foundry.

## Current videos

| File | Size | Shape | Notes |
|---|---|---|---|
| dont-be-dumb-tour.mp4 | 26 MB | 1440×1080 (4:3) | Was `DBD_LEG2_1080p.mov` (H.264), renamed only |
| credit-card-department.mp4 | 38 MB | 1440×1920 (3:4) | |
| black-demarco.mp4 | 118 MB | 1920×1080 | **Over GitHub's 100 MB limit** |
| character-showcase.mp4 | 372 MB | 1536×1920 (4:5) | **Over GitHub's 100 MB limit** |
| apple-airpods-max.mp4 | 8 MB | 1920×1080 | |
| a16z-foundry.mp4 | 2 MB | 1920×816 (~2.35:1) | Transcoded from ProRes with ffmpeg |

Originals came from the owner's Downloads folder (copied, not moved).

Videos and previews are committed to git. See `public/videos/README.md` for how to add one.

## Adding a video (workflow the owner uses)

"Add the latest video from Downloads" = newest video file by modified time in `%USERPROFILE%\Downloads`.

1. Check codec before using it. **ProRes `.mov` (fourcc `apcn`/`apch`/…) does not play in any browser** — it loads as 0×0 with audio only. H.264 `.mov` files work and can simply be renamed to `.mp4`.
2. Transcode when needed (ffmpeg is installed via winget but **not on PATH** in existing shells):
   ```
   C:\Users\Mohit\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-9.0.2-full_build\bin\ffmpeg.exe
     -i input.mov -c:v libx264 -preset slow -crf 20 -pix_fmt yuv420p -movflags +faststart -c:a aac -b:a 160k public/videos/name.mp4
   ```
   `ffprobe.exe` is in the same folder — use it to read width/height for `aspect`.
3. Save into `public/videos/` with a kebab-case name, add an entry to `entries` in `data/site.js`, and add a matching row to `scatter` in `app/page.js`.

## Home grid: scatter + parallax (`app/page.js`)

- 24-column CSS grid. Each tile is placed by a `scatter` row: `[gridColumn, topOffset, parallaxSpeed]`, e.g. `["14 / span 6", "30px", 0.55]`.
- All tiles in a block share one grid row and are pushed down by their offset, so they sit in each other's gaps. After every `scatter.length` projects a new block starts.
- Owner wants: tiles **scattered with real gaps**, **no visible pattern** (no landscape/portrait alternation, no rigid rows), roughly 4 across on desktop, landscape tiles wider than portrait ones.
- Parallax speed: positive = drifts slower than scroll, negative = faster. Current values ±0.3–0.55 (owner asked for a **strong**, clearly noticeable effect). Keep within about ±0.6 or tiles collide. Easing is `EASE` in `components/Parallax.js` (0.1).
- Parallax is disabled at ≤600px width and for `prefers-reduced-motion`. At ≤960px the grid falls back to 2 columns, ≤600px to 1.
- **Grid videos autoplay** (muted, looped, `playsInline`) for everyone on load — owner explicitly rejected hover-to-play. Don't change that.

## Design system

- Theme tokens in `:root` / `:root[data-theme="dark"]` at the top of `globals.css`. Light: warm off-white `#f4f3ef`. Dark: `#0e0e0f`.
- **Accent is `#850101`** in both themes (logo square, role dots, 01–06 numbers, active-nav dot, hovers). Owner-chosen; don't swap it for another colour. It's low-contrast in dark mode — if asked, adjust only small text there.
- Fonts: logo + big headings use **Helvetica Bold** (system stack `"Helvetica Neue", Helvetica, Arial`); UI labels use JetBrains Mono (uppercase, letter-spaced); body Inter; italic accents Instrument Serif. Loaded via `next/font/google`.
- Header: red square + HAZE VISUALS (left), nav + theme toggle (right), **no divider line**, no dropdown on WORK.
- Home: no big name, no tagline, no client list — only the roles line and the grid (a visually hidden `<h1>` keeps SEO/a11y).
- Theme: first visit follows system preference; toggle choice persists in `localStorage("theme")`; inline script in `layout.js` prevents a flash.

## Owner preferences (from this session)

- Iterates visually from screenshots; describes changes loosely ("scatter them", "make it stronger") — make a bold, visible change rather than a subtle one.
- Wants content swapped later — keep everything data-driven in `data/site.js`.
- Uses a terse style; likes quick turnaround.

## Verifying changes

UI changes should be checked in a real browser, not just by building. The previous session used the `agent-browser` CLI (installed globally, skill in `~/.claude/skills/agent-browser`):

```bash
agent-browser --session haze open http://localhost:3000/
agent-browser --session haze set viewport 1440 900
agent-browser --session haze screenshot --full shot.png
agent-browser --session haze eval "[...document.querySelectorAll('.card video')].map(v => v.paused)"
agent-browser --session haze close
```

Note: headless Chrome reports a dark system theme, so the site loads in dark mode there.

## Open issues / next steps

1. **Heavy videos.** All grid videos autoplay, so the home page pulls ~550 MB. Make short compressed preview loops (2–5 MB, e.g. 720p, ~6 s) for `thumb`, and host full videos on YouTube/Vimeo (use embed URL as `video`) or a CDN.
2. **Video hosting for deploy.** Videos are committed, so a Vercel deploy from GitHub serves them from `public/`. Watch hosting bandwidth limits.
3. **Placeholder content** still to replace: email (`hello@hazevisuals.com`), Instagram URL, location, About bio + portrait, each project's description/credits/year/category.
4. Contact page still shows a "Location: Based in Your City" line (owner removed it from the footer only; ask before removing).
5. Footer still has a thin top border line (header one was removed at owner's request).
6. Header is slightly translucent; tiles scrolling under it show faintly — make it solid if the owner dislikes it.
