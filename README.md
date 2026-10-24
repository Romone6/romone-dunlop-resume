# Romone Dunlop — TV Channel Portfolio

A standalone React and Vite portfolio presented as a retro television. Visitors tune through channels for Romone's background, projects, experience, and contact details. Channel imagery, typography, transitions, and the remote interaction are built into the app.

## Run locally

```bash
npm ci
npm run dev
```

## Build and preview

```bash
npm run build
npm run preview
```

The production site is written to `dist/`. Deploy that directory to a static host, or configure a Vite project with `npm ci` as its install command, `npm run build` as its build command, and `dist` as its output directory. Add `romone.me` through the host's domain settings and use the DNS records provided by that host. This repository does not change DNS or publish a deployment.

## Source layout

- `src/ChannelMvp.jsx` — channel content, remote behavior, and TV interface.
- `src/channel-mvp.css` — television, room, channel-specific styling, and responsive layout.
- `public/channel-scenes/` — channel artwork and scene assets.
- `public/models/` and `public/media/` — 3D and visual assets retained from the earlier spaceflight concept.
- `remaster/` — design research and measurement artifacts.
- `assets/blender/` — source files used to create the earlier spacecraft and planet models.

Edit channel wording in `src/ChannelMvp.jsx`. Keep project claims aligned with confirmed facts, including that Romone helped build JOINRFS.
