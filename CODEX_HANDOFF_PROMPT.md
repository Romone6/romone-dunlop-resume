# Codex handoff prompt

Continue the Romone Dunlop personal-site redesign using this standalone source folder as the authoritative latest project state. This is a Vite/React/Three.js site exported from a Sites project so it can be developed and hosted independently.

## Goal

Keep the site as an automatic, deliberate, cinematic spaceship journey through Romone's work. The rocket launches from a realistic ground launchpad, passes through a natural Earth-like atmosphere, reaches space, then carries the visitor through the project/story stops. Keep the ship prominent, motion fluid, the layout uncluttered, and the existing pause/start/story controls working.

## Changes already present in this source

- The start/wordmark entry path was restored to the prior story sequence. Preserve all existing factual project copy; do not rewrite the text without checking with Romone.
- Removed the colored/numbered atmosphere stage labels.
- Added a procedural launch complex: ground deck, flame trench, steel tower/gantry, cross-bracing, service platforms/arms, and floodlights.
- Added a gradual rocket ascent with separated exhaust bells, camera transition, and continuous physically based sky scattering that fades into the existing starfield.
- Kept existing models, project stops, scene controls, and journey logic.

## Work to do

1. Inspect the full source, run the app, and compare it with the previous live version if a screenshot or recording is supplied. Treat the source here as the latest updated target.
2. Find and fix visual/runtime regressions in the launchpad, rocket visibility, engine separation, ascent camera, atmosphere transition, and arrival at the first story stop. The rocket must remain visible and must not clip through geometry.
3. Verify the start button begins the launch from the pad, fades after activation, and does not reveal a blank scene. Verify pause/resume and reduced-motion behavior.
4. Preserve the realistic uncolored atmosphere, restrained typography, existing project language, and established project facts. No decorative labels, invented achievements, or replacement copy.
5. Ensure the app works as a standalone static Vite build. `npm run build` must output a deployable `dist/` directory.
6. Run the app and verify desktop and mobile layouts, browser console, loading of all GLB models and images, and a full launch-to-first-stop journey before proposing further visual changes.
7. When implementation is complete, explain how to deploy the `dist/` folder to the chosen host and connect `romone.me` using that host's DNS instructions. Do not change DNS or publish without an explicit request.

Do not add Sites-only configuration or require Sites publishing scripts. First understand the existing implementation before changing it.
