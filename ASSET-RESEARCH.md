# Spacecraft and planet asset research

Research date: 30 September 2026

## Direction

Build a distinctive visitor spacecraft in Blender, then export a web-sized GLB. Use real space-agency models as engineering references. Keep the randomized worlds original with procedurally generated surface maps instead of reusing the same Solar System planets unchanged.

## Shortlist

| Source | Finding | Use |
| --- | --- | --- |
| [NASA 3D Resources](https://science.nasa.gov/3d-resources/) | NASA describes its models, textures and images as free to download and use, subject to its media-use guidance. | First place to look for accurate reference geometry and planet textures. Attribute NASA/JPL contributors; avoid NASA insignia and any third-party marked content. |
| [Cassini–Huygens model](https://science.nasa.gov/3d-resources/cassini-huygens-b/) | Downloadable GLB is 403.95 KB. It is the orbiter only; the thermal blanketing is not shown. Source is NASA/JPL/Solar System Simulator. | Compact spacecraft reference for antenna, bus and instrument details. Too unlike a crewed explorer to use as the hero ship unchanged. |
| [GOES spacecraft model](https://science.nasa.gov/mission/goes-spacecraft-3d-model/) | NASA offers a 6.14 MB binary glTF model. It is a geostationary Earth-observation satellite. | Good reference for high-detail satellite surfaces; not the right silhouette for the travelling ship. |
| [NASA/JPL Jupiter map](https://science.nasa.gov/3d-resources/jupiter/) | NASA provides JPEG and TIFF planet textures made from Voyager imagery; credited to JPL and Caltech. | Candidate real texture for a Jupiter-like gas giant, and a reference for banding. |
| [NASA/JPL Saturn map](https://science.nasa.gov/3d-resources/saturn/) | The NASA page labels its map “Fictional.” JPL says its gas-giant maps are representative. | Do not present as a factual Saturn surface. Use only as inspiration for fictional gas-giant banding. |
| [BlenderKit “The Nomad”](https://www.blenderkit.com/asset-gallery-detail/6ae41daa-3da1-4dc0-9210-18a246a65524/) | Royalty-free listing, but 495.8 MiB and 698,049 polygons; it is designed as a furnished space caravan. | Reject for the live page: excessive download/geometry cost and the wrong visual character. |

NASA’s [media guidance](https://www.nasa.gov/nasa-brand-center/images-and-media/) says factual NASA content is generally usable for informational purposes, including personal web pages, with NASA credited and no implication of NASA endorsement. Check each individual asset for third-party copyright notices before reuse.

## Proposed production path

1. Make the traveller ship original in Blender, using practical aerospace forms: pressure hull, heat shielding, radiator panels, docking collar, navigation lights, layered engine bells and restrained wear. Avoid glass-canopy fighter-jet styling.
2. Keep the web model light: bake surface detail into PBR textures, create a lower-detail export for distant views, and export as GLB for Three.js.
3. Build planet families from a shared sphere and material system. Generate fictional albedo, height and normal maps so no planet is presented as a real Solar System body.
4. Load the exports into the route with procedural fallbacks while assets load or if a model request fails.

## Implemented asset set

- `assets/blender/romone-spaceflight.blend` is the Blender source scene.
- `assets/blender/build_spacecraft.py` builds the original pressure-hull explorer and exports `public/models/romone-explorer.glb` plus `public/models/planets/{terran,desert,ice,gas}.glb`.
- `assets/blender/generate_planet_maps.py` creates the seeded fictional planet albedo, height and normal maps in `assets/blender/planet-maps/`; the GLB exports embed the maps.
- `assets/previews/spacecraft-and-planets.png` is a render from the source scene.
- `src/App.jsx` selects planet families from each randomized route seed and uses the custom explorer model. The earlier Three.js ship and faceted planet meshes remain as load/error fallbacks.

No NASA or third-party model or texture is bundled in the site. NASA resources informed research only. The spacecraft geometry and planet maps in the current build are original project assets.

## Sources

- [NASA 3D asset catalogue](https://science.nasa.gov/3d-resources/)
- [NASA images and media usage guidelines](https://www.nasa.gov/nasa-brand-center/images-and-media/)
- [JPL Solar System Simulator texture maps and limitations](https://space.jpl.nasa.gov/tmaps/)
