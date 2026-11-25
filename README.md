# Pirouette & Pulse Dance

A static Next.js website for **Pirouette & Pulse Dance**, a fictitious Minneapolis dance studio created as a sample template (`next-dance-studio`) for the Jamstacks gallery. No application code depends on the starter or portal repository at runtime.

To preview locally (Node 24+ and npm):

```sh
npm ci
npm run dev
```

Or build and serve the static export:

```sh
npm run check
npm start
```

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Home: Opening Night hero, tempo count strip, style cubbies, hanging level tags, live call board preview, next concert ticket stub, uniform teaser, and stage door visit block with `LocalBusiness` / `EducationalOrganization` JSON-LD |
| `/classes/` | Six styles in recital-programme running order (each with its BPM count strip), mirror-wall level chart, faculty cast list, and term fees |
| `/timetable/` | Weekly Mon–Sat call board with style, level and day filters synced to the URL query (`?style=ballet&level=junior`) and browser "Today" highlight in `America/Chicago` |
| `/concerts/` | Featured next show ticket stub, rest of the season with `DanceEvent` JSON-LD and browser countdowns, show-week steps, and programme archive |
| `/uniform/` | Hanger rail of leotard colours by level, kit packing tags by style, hair guide, front-desk studio shop, swap rail, and a clean CSS print checklist |
| `/contact/` | Stage door enquiries with the hosted Jamstacks support form (when configured) or visible email fallback, cue sheet of what to include, copy-email button, phone, address, and live front desk hours |
| `/404.html` | Empty-stage "You've missed your mark." page with links back to Home, Timetable, and Contact |

## File ownership

Edit page-specific headings, introductions, and calls to action directly in the route's `app/**/page.tsx` file. Edit structured business data, schedules, concerts, and uniform items in `content/`.

| File | Owns |
| --- | --- |
| `content/business.ts` | Studio name, tagline, introduction, email, phone, address, landmark, parking, front desk opening hours, term line, and Contact enquiry copy |
| `content/classes.ts` | Levels (ages, durations, leotard colours), six dance styles (BPM, descriptions, signature steps), teachers, studio rooms, and term fees |
| `content/timetable.ts` | The 28 weekly classes (`id`, day, start/end, style, level, room, teacher, `availability`) |
| `content/concerts.ts` | Upcoming concerts, performances, ticket prices, `ticketStatus`, dress rehearsals, costume fees, and past programme archive |
| `content/uniform.ts` | Style kit lists, hair rules, and front-desk studio shop items (`price`, `stock`) |
| `content/validate.ts` | Build-time and test-time content validator (unique IDs, references, durations, opening hours, room/teacher overlaps, prices, dates, statuses) |
| `app/**/page.tsx` | Route metadata and page-specific copy as JSX children of named section components |
| `components/*.tsx` | Section layouts, semantic markup, accessibility, and client interactions (`timetable-board.tsx`, `call-board-today.tsx`, `desk-status.tsx`, `countdown.tsx`, `jamstacks-support-form.tsx`, `copy-email.tsx`) |
| `components/art/*.tsx` | Bespoke inline SVG artwork (`stage.tsx`, `objects.tsx`, `icons.tsx`) using CSS palette tokens |
| `app/tailwind.input.css` | Light ("matinee") and dark ("blackout") colour tokens, `@theme inline` mappings, surface textures, count-strip animation, reduced motion, and print checklist styles |
| `app/icon.svg`, `public/og.png`, `public/images/hero-*.webp` | Branded pointe-shoe/pulse site icon, 1200×630 Open Graph image, and paired light/dark editorial hero photography |
| `lib/schedule.ts`, `lib/hours.ts` | `America/Chicago` time-zone logic for front desk status, today's call board, and concert countdowns |
| `lib/structured-data.ts` | `LocalBusiness` / `EducationalOrganization` and `DanceEvent` JSON-LD derived from `content/` |
| `site.config.json` | Public name, description, hostname, `timeZone`, and Jamstacks integration (`siteId`, `cdnUrl`, optional `provisioningId`). Never put business content here; the provisioner replaces this file wholesale. |
| `app/sitemap.ts` | Public routes; update when adding a page |

## Frequent owner edits

### 1. Change a class's availability

Open [`content/timetable.ts`](content/timetable.ts), find the class by its `id` (for example `tue-contemporary-inter`), and change `availability` to `'open'`, `'few-spots'`, or `'waitlist'`:

```ts
{ id: 'tue-contemporary-inter', day: 'tue', start: '16:30', end: '17:30', style: 'contemporary', level: 'inter', room: 'mirror-room', teacher: 'wren-castellanos', availability: 'few-spots' },
```

Run `npm run check` to validate and rebuild. The updated badge appears on `/timetable/` (on the `tue-contemporary-inter` slip) and on Home's call board preview when Tuesday is the active day.

### 2. Change a concert's ticket status

Open [`content/concerts.ts`](content/concerts.ts), find the concert by its `id` (for example `winter-showcase-2026`), and change `ticketStatus` to `'coming-soon'`, `'on-sale'`, `'few-left'`, or `'sold-out'`:

```ts
ticketStatus: 'few-left',
```

Run `npm run check` to validate and rebuild. The updated stamp ("Few tickets left") appears on Home's "Next on stage" ticket stub and on `/concerts/`.

## Appearance, fonts and time-zone behavior

- **Fonts**: self-hosted via `@fontsource/abril-fatface` (display headings, numerals, wordmark — SIL Open Font License 1.1) and `@fontsource-variable/league-spartan` (body and UI — SIL Open Font License 1.1).
- **Themes**: light ("matinee") and dark ("blackout") colour tokens in `app/tailwind.input.css` with automatic `prefers-color-scheme` and explicit `.dark`/`.light` support via `jamstacks` (`ThemeProvider`, `ThemeScript`, `DarkModeToggle`). Primary button fills maintain ≥ 4.5:1 contrast with white text in both modes.
- **Time-dependent copy**: front desk open/closed status (`DeskStatus`), Home's call board (`CallBoardToday`), Timetable's "Today" highlight (`TimetableBoard`), and concert countdowns (`Countdown`) run only in the browser in `site.config.json`'s `timeZone` (`America/Chicago`) and refresh every minute. Static/no-JS HTML stays neutral. Same-day opening hours only; overnight intervals fail validation.
- **Motion & print**: count-strip stepping, scroll reveals, and curtain/ribbon animations are disabled under `prefers-reduced-motion: reduce`. Printing `/uniform/` hides navigation and art and renders a plain checkbox kit checklist.

## Public configuration

```json
{
  "name": "Pirouette & Pulse Dance",
  "description": "Ballet, contemporary, jazz, tap, hip-hop and musical theatre for ages 3 to adult in Minneapolis, with a weekly timetable, two concerts a year and a clear uniform guide.",
  "domain": "next-dance-studio.jamstacks.net",
  "timeZone": "America/Chicago",
  "jamstacks": { "siteId": "", "cdnUrl": "https://cdn.jamstacks.net" }
}
```

Replace `domain` with your own hostname when deploying your studio site. Do not invent canonical URLs when the deployed address is unknown.

| Environment variable | Public build-time meaning |
| --- | --- |
| `JAMSTACKS_SITE` | Website ID; blank retains file default, absent ID gives email fallback |
| `NEXT_PUBLIC_JAMSTACKS_CDN_URL` | CDN asset base; default `https://cdn.jamstacks.net` |
| `NEXT_PUBLIC_SITE_DOMAIN` | Hostname overriding config domain |
| `SITE_TIME_ZONE` | IANA zone overriding config timeZone |
| `PAGES_BASE_PATH` | Project path such as `/preview`; blank for custom domain/root |
| `PAGES_BASE_URL` | Actual Pages origin and path; takes precedence for canonical URLs |
| `JAMSTACKS_ALLOW_LOCAL_CDN` | Explicit localhost-only testing opt-in; disallowed in Actions |

Copy `.env.example` to `.env.local` for Next.js local work. All listed values are public. Never add tokens, SMTP credentials, or publishing keys.

## Contact contract

The real `<jamstacks-support-form>` host and one `{cdn}/sites/{siteId}/embed.js` bootstrap appear only on `/contact/` when a public site ID is configured. Without a site ID there is no embed host or script request. The public email (`hello@pirouetteandpulse.com`) remains visible in either case. The hosted runtime owns name, email, and message fields, validation, submission, and results. Contact navigation uses full-document loads via `SiteLink` in both directions. All copy phrases trials, waitlist requests, and ticket requests as enquiries; nothing is confirmed or paid through the website.

For local Jamstacks development, configure an explicit local CDN URL and `JAMSTACKS_ALLOW_LOCAL_CDN=1`; remote builds reject localhost. A locally loaded component does not prove real message delivery—test delivery separately against a configured site/backend.

## Checks and preview

```sh
npm run check
PAGES_BASE_PATH=/preview PAGES_BASE_URL=https://owner.github.io/preview JAMSTACKS_SITE=demo-site npm run build
npm start -- --base /preview --port 3000
```

`npm run check` runs all unit/content/schedule/config tests, Next.js typegen + TypeScript typecheck, and the static export. Return to a normal build (`npm run build`) before capturing final assets.

## GitHub Pages deployment

`.github/workflows/pages.yml` runs `npm ci`, tests, typecheck, and static export, preserving Jamstacks' `provisioning_id` dispatch input and correlated run name. Configure Pages to use GitHub Actions (do not add `public/CNAME`). Custom domain setup uses `SITE_DOMAIN`, else `site.config.json`'s `domain`, else `<repo-name>.jamstacks.net`.

## Content Security Policy

A host-level CSP must permit same-origin Next.js scripts/assets, the inline theme and reveal bootstraps (via hash/nonce), the configured Jamstacks CDN scripts/assets, and the published form's API connection origin. Apply CSP at the host; static export cannot set response headers.

## Publishing assets and cleanup

`jamstacks/` is removable gallery-only source metadata. Ordinary builds, tests, and GitHub Pages work after it is deleted. To regenerate gallery screenshots and validate the manifest:

```sh
node /home/mythz/src/mythz/jamstacks.net/tools/template-screenshots/capture.mjs \
  --template /path/to/next-dance-studio --modes light,dark --executable /usr/bin/chromium
node --test jamstacks/config.test.mjs
```

After reviewing the site, remove `plan/` and `.claude/skills/` before publishing the gallery template.
