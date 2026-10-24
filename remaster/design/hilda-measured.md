# The original's design system, as measured

Measured from https://media.netflix.com/en/only-on-netflix/80115346 at 1440px.

Reference only. Reuse the scale and rhythm; replace the identity (palette, typeface, brand color, icons, imagery).

## Colors

| Role | Color |
|---|---|
| canvas | #0f0f0f |
| surface | #232323 |
| ink | #e7e7e7 |
| ink-soft | none |
| accent | #e50914 |
| on-accent | #ffffff |
| border | #e50914 |

Brand colors to stay away from: #e50914.

## Type

Fonts: -apple-system (98.8%, weights 400/600/700); Netflix Sans (1.2%, weights 700).
Body size 14px; average step ratio above body 1.2.

| Size | Line height | Weight | Family | Share | Used for |
|---|---|---|---|---|---|
| 10px | 12.5px | 700 | -apple-system | 2% | h1 |
| 12px | 18px | 600 | -apple-system | 0.8% | h6 |
| 13px | 22.75px | 600 | -apple-system | 8.5% | span |
| 14px | 21px | 400 | -apple-system | 79.9% | a, div |
| 16px | 24px | 700 | Netflix Sans | 1.2% | span |
| 20px | 25px | 700 | -apple-system | 7.1% | h1, p |
| 24px | 30px | 700 | -apple-system | 0.5% | h1 |

## Spacing, corners, depth, motion

Spacing base 2px (74% of measured gaps are multiples). Scale: 1, 6, 8, 9, 12, 14, 18, 20, 24, 36, 40, 80.

Corners: 4px (9), 8px (2).

Shadows: `rgba(0, 0, 0, 0.4) 0px 2px 10px -5px`.

Motion: durations 250ms, 300ms, 700ms; easings cubic-bezier(0.4, 0, 0.2, 1), ease, ease-in-out; 1 keyframe animations.

Layout widths: 1024px.

Breakpoints: 425px, 550px, 600px, 720px, 768px, 896px, 960px, 1280px.

Logo: img "Company Logo", 0x0, saved as hilda-logo.png for the sweep. Never reuse it.

Gradients seen: 2.
