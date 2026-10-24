# The original's design system, as measured

Measured from https://press.hulu.com/shows/futurama/ at 1440px.

Reference only. Reuse the scale and rhythm; replace the identity (palette, typeface, brand color, icons, imagery).

## Colors

| Role | Color |
|---|---|
| canvas | #ffffff |
| surface | #000000 |
| ink | #151515 |
| ink-soft | none |
| accent | #1ce783 |
| on-accent | #151515 |
| border | #d8d8d8 |

Brand colors to stay away from: #1ce783, #1a62e8, #0066cc.

## Type

Fonts: ABC Modern (96%, weights 200/300/400); graphik-medium (4%, weights 400).
Body size 18px; average step ratio above body 1.33.

| Size | Line height | Weight | Family | Share | Used for |
|---|---|---|---|---|---|
| 14px | 21px | 200 | ABC Modern | 12.5% | a, li |
| 18px | 22px | 200 | ABC Modern | 80.3% | a, p, div |
| 24px | 28px | 200 | ABC Modern | 6.5% | span, div |
| 32px | 42px | 400 | ABC Modern | 0.6% | h1 |

## Spacing, corners, depth, motion

Spacing base 8px (78% of measured gaps are multiples). Scale: 4, 8, 9, 16, 22, 24, 28, 32, 44, 56, 64.

Corners: 5px (2).

Shadows: `rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.5) 0px 2px 4px 0px`.

Motion: durations 300ms; easings cubic-bezier(0.4, 0, 0.2, 1); 0 keyframe animations.

Layout widths: 1408px.

Breakpoints: 376px, 640px, 768px, 769px, 770px, 1024px, 1025px, 1280px.

Logo: img "Hulu Press", 112x18, saved as futurama-logo.svg for the sweep. Never reuse it.

No gradients.
