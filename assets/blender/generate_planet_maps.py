"""Create seamless colour and height maps for the fictional exoplanets."""

from pathlib import Path

import numpy as np
from PIL import Image
from scipy.ndimage import gaussian_filter


ROOT = Path(__file__).resolve().parents[2]
OUTPUT = ROOT / "assets" / "blender" / "planet-maps"
WIDTH, HEIGHT = 1536, 768


def field(seed: int, layers: tuple[tuple[float, float], ...]) -> np.ndarray:
    rng = np.random.default_rng(seed)
    result = np.zeros((HEIGHT, WIDTH), dtype=np.float32)
    for sigma, weight in layers:
        noise = rng.standard_normal((HEIGHT, WIDTH)).astype(np.float32)
        noise = gaussian_filter(noise, sigma=(sigma * 0.5, sigma), mode="wrap")
        noise -= noise.mean()
        noise /= max(noise.std(), 1e-6)
        result += noise * weight
    result -= result.mean()
    result /= max(result.std(), 1e-6)
    return result


def smooth(a: np.ndarray, low: float, high: float) -> np.ndarray:
    t = np.clip((a - low) / (high - low), 0, 1)
    return t * t * (3 - 2 * t)


def ramp(value: np.ndarray, stops: list[tuple[float, tuple[int, int, int]]]) -> np.ndarray:
    output = np.zeros((*value.shape, 3), dtype=np.float32)
    for channel in range(3):
        output[..., channel] = np.interp(
            value,
            [stop[0] for stop in stops],
            [stop[1][channel] for stop in stops],
        )
    return output


def save(name: str, colour: np.ndarray, height: np.ndarray) -> None:
    colour = np.clip(colour, 0, 255).astype(np.uint8)
    height = np.clip(height, 0, 255).astype(np.uint8)
    Image.fromarray(colour, "RGB").save(OUTPUT / f"{name}-albedo.jpg", quality=94, optimize=True)
    Image.fromarray(height, "L").save(OUTPUT / f"{name}-height.png", optimize=True)
    surface = height.astype(np.float32) / 255
    dy, dx = np.gradient(surface)
    normal = np.stack((-dx * 3.2, -dy * 3.2, np.ones_like(surface)), axis=-1)
    normal /= np.maximum(np.linalg.norm(normal, axis=-1, keepdims=True), 1e-6)
    normal = np.clip((normal * 0.5 + 0.5) * 255, 0, 255).astype(np.uint8)
    Image.fromarray(normal, "RGB").save(OUTPUT / f"{name}-normal.png", optimize=True)


def terran() -> None:
    land = field(61201, ((145, 0.8), (68, 0.55), (23, 0.35), (7, 0.18)))
    relief = field(61202, ((70, 0.6), (25, 0.45), (8, 0.22)))
    cloud = field(61203, ((38, 0.66), (15, 0.4), (5, 0.18)))
    lat = np.broadcast_to(np.linspace(-1, 1, HEIGHT, dtype=np.float32)[:, None], (HEIGHT, WIDTH))
    ocean_depth = smooth(-land, -0.3, 1.35)
    continent = smooth(land, -0.05, 0.28)
    ocean = ramp(ocean_depth, [(0, (13, 56, 86)), (0.45, (14, 91, 128)), (1, (4, 24, 49))])
    latitude = np.abs(lat)
    biomes = ramp(relief + latitude * 0.9, [(-1, (18, 55, 42)), (0, (49, 102, 57)), (0.8, (124, 119, 77)), (1.9, (216, 218, 207))])
    colour = ocean * (1 - continent[..., None]) + biomes * continent[..., None]
    colour += np.clip((relief - 0.78)[..., None], 0, 0.5) * np.array([74, 65, 50], dtype=np.float32)
    clouds = smooth(cloud + np.sin(lat * 18 + relief * 0.6) * 0.11, 0.85, 1.35) * 0.34
    colour = colour * (1 - clouds[..., None]) + np.array([222, 230, 234], dtype=np.float32) * clouds[..., None]
    height = 24 + continent * (95 + np.clip(relief, -1, 2) * 40)
    save("terran", colour, height)


def desert() -> None:
    structure = field(78114, ((125, 0.8), (48, 0.55), (15, 0.35), (4, 0.18)))
    detail = field(78115, ((19, 0.58), (7, 0.35), (2, 0.12)))
    lat = np.broadcast_to(np.linspace(-1, 1, HEIGHT, dtype=np.float32)[:, None], (HEIGHT, WIDTH))
    dune = np.sin(np.linspace(0, 32 * np.pi, WIDTH, dtype=np.float32))[None, :] * (0.18 + np.abs(lat) * 0.18)
    terrain = structure * 0.67 + detail * 0.2 + dune
    colour = ramp(terrain + detail * 0.16, [(-1.8, (55, 43, 34)), (-0.55, (126, 73, 43)), (0.05, (186, 126, 73)), (0.85, (230, 184, 120)), (1.8, (246, 220, 170))])
    colour += (np.sin(terrain * 11 + detail * 2) > 0.97)[..., None] * np.array([15, 12, 5], dtype=np.float32)
    save("desert", colour, 70 + np.clip(terrain + 1.8, 0, 3.6) * 40)


def ice() -> None:
    base = field(90442, ((112, 0.72), (38, 0.55), (13, 0.36), (4, 0.15)))
    fractures = field(90443, ((31, 0.55), (9, 0.36), (2, 0.18)))
    ridges = np.exp(-np.abs(fractures + base * 0.23) * 7.5)
    lat = np.broadcast_to(np.linspace(-1, 1, HEIGHT, dtype=np.float32)[:, None], (HEIGHT, WIDTH))
    colour = ramp(base + ridges * 0.62 + np.abs(lat) * 0.18, [(-1.8, (13, 43, 79)), (-0.6, (30, 86, 129)), (0.25, (98, 153, 181)), (1.1, (201, 224, 230)), (2.0, (245, 249, 244))])
    crack_mask = smooth(np.abs(fractures + base * 0.23), 0.02, 0.1)
    colour *= 0.55 + 0.45 * crack_mask[..., None]
    save("ice", colour, 55 + ridges * 120 + np.clip(base, -1, 1) * 26)


def gas_giant() -> None:
    turbulence = field(33007, ((78, 0.52), (29, 0.41), (10, 0.23), (3, 0.1)))
    lat = np.broadcast_to(np.linspace(-1, 1, HEIGHT, dtype=np.float32)[:, None], (HEIGHT, WIDTH))
    bands = np.sin(lat * 33 + turbulence * 1.9 + np.sin(lat * 8 + turbulence) * 1.1)
    bands += np.sin(lat * 76 + turbulence * 3.2) * 0.17
    colour = ramp(bands + turbulence * 0.23, [(-1.3, (74, 72, 98)), (-0.55, (112, 105, 139)), (0.0, (188, 148, 126)), (0.48, (222, 185, 145)), (1.25, (118, 105, 129))])
    yy, xx = np.mgrid[0:HEIGHT, 0:WIDTH].astype(np.float32)
    for x, y, sx, sy, strength in [(0.28, 0.39, 72, 29, 0.78), (0.73, 0.64, 42, 21, -0.48)]:
        dx = np.minimum(np.abs(xx - x * WIDTH), WIDTH - np.abs(xx - x * WIDTH)) / sx
        dy = (yy - y * HEIGHT) / sy
        storm = np.exp(-(dx * dx + dy * dy) * 1.25) * strength
        colour += storm[..., None] * np.array([37, 7, -14], dtype=np.float32)
    save("gas", colour, 118 + bands * 15 + turbulence * 8)


def main() -> None:
    OUTPUT.mkdir(parents=True, exist_ok=True)
    terran()
    desert()
    ice()
    gas_giant()
    print(f"Planet maps written to {OUTPUT}")


if __name__ == "__main__":
    main()
