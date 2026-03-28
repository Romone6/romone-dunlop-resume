# romone-me-rebuild

Premium personal website rebuild for romone.me using Next.js App Router, TypeScript, Tailwind CSS, and Framer Motion.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion (subtle reveals only)
- lucide-react icons
- Local typed content model in `src/content/site.ts`

## Quick Start (PowerShell)

```powershell
npm install
npm run dev
```

Open <http://localhost:3000>.

## Quality Commands

```powershell
npm run lint
npm run typecheck
npm run test
npm run smoke
```

`npm run smoke` is a local scripted E2E proof that builds, starts production server, and checks all core routes.

## Project Structure

- `src/app` -> App Router pages and metadata routes (`sitemap.ts`, `robots.ts`)
- `src/components/site` -> site-level reusable components
- `src/components/ui` -> low-level UI primitives
- `src/content/site.ts` -> typed content source and helper selectors
- `src/lib` -> shared utilities and metadata helper
- `public/images`, `public/logos`, `public/og` -> assets and placeholders
- `docs/runbook.md` -> runnable commands
- `docs/asset-map.md` -> placeholder asset replacement map
- `docs/ASSUMPTIONS.md` -> implementation assumptions

## Content Editing

Update `src/content/site.ts` to modify:

- hero copy and chips
- roles
- projects
- organisations
- milestones
- vision/future plans
- socials

## Swap Placeholders Before Production

1. Replace the branded board or project visuals in `public/images` if you want final photography or screenshots.
2. Replace or refine the current logo files in `public/logos` as needed.
3. Update direct LinkedIn and X profile URLs in `src/content/site.ts` if you want those cards to point to exact profile pages.
4. Add any final approved public affiliations or media assets.

## Vercel Deployment

1. Push this repository to GitHub.
2. Create a new Vercel project and import the repository.
3. Framework preset: `Next.js`.
4. Build command: `npm run build` (default).
5. Output directory: `.next` (default).
6. Deploy and attach `romone.me` domain in Vercel project settings.

## Notes

- External links are opened with safe `noopener noreferrer` handling.
- Images use `next/image` with a fallback panel component for missing assets.
- Routes implemented: `/`, `/about`, `/projects`, `/roles`, `/vision`, `/contact`.
