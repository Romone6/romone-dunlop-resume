# Journey assets

The explorer and four fictional planet families are original Blender assets for the Three.js flight.

## Regenerate

Requirements: Blender 4.0 or newer with the glTF 2.0 exporter, plus Python 3 with NumPy, Pillow and SciPy.

```sh
python3 assets/blender/generate_planet_maps.py
blender -b --factory-startup --python assets/blender/build_spacecraft.py
```

The generator writes reusable albedo, height and normal maps under `planet-maps/`. The Blender script saves `romone-spaceflight.blend`, renders `../previews/spacecraft-and-planets.png`, and exports self-contained GLBs into `../../public/models/`.

The site loads GLB files from `public/models/`. They include their materials and textures; the generator maps remain alongside the source so the fictional planet surfaces can be revised and rebuilt.
