# The original's design system, as measured

Measured from https://iview.abc.net.au/show/fireman-sam at 1440px.

Reference only. Reuse the scale and rhythm; replace the identity (palette, typeface, brand color, icons, imagery).

## Colors

| Role | Color |
|---|---|
| canvas | #17181c |
| surface | #25292d |
| ink | #ffffff |
| ink-soft | #a2a3a4 |
| accent | #22ddd9 |
| on-accent | #ffffff |
| border | #454649 |

Brand colors to stay away from: #22ddd9, #ffa8bf, #99c4ff.

## Type

Fonts: abcsans (99.9%, weights 400/600/700/800); Arial (0.1%, weights 400).
Body size 16px; average step ratio above body 1.13.

| Size | Line height | Weight | Family | Share | Used for |
|---|---|---|---|---|---|
| 12px | 20px | 400 | abcsans | 10.4% | span, strong, a |
| 14px | 24px | 400 | abcsans | 30.9% | span, a, p |
| 16px | 24px | 400 | abcsans | 52.3% | p, a, h3 |
| 18px | 24px | 700 | abcsans | 5.6% | h3 |

## Spacing, corners, depth, motion

Spacing base 4px (87% of measured gaps are multiples). Scale: 4, 8, 10, 11, 12, 16, 24, 32.

Corners: 8px (62), 50% (8), 16px (6), 999px (5), 100% (2), 32px (1).

Shadows: `rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.05) 0px 2px 4px -1px`.

Motion: durations 200ms, 350ms, 150ms, 500ms; easings ease-out, cubic-bezier(0, 0, 0.58, 1), cubic-bezier(0.27, 1.06, 0.18, 1); 0 keyframe animations.

Layout widths: 1248px, 1280px, 1408px.

Breakpoints: 543px, 544px, 767px, 768px, 991px, 992px, 1199px, 1200px.

Logo: svg, 48x20. Never reuse it.

Gradients seen: 2.
