# The original's design system, as measured

Measured from https://www.youtube.com/watch?v=MbT7t6i03TQ at 1440px.

Reference only. Reuse the scale and rhythm; replace the identity (palette, typeface, brand color, icons, imagery).

## Colors

| Role | Color |
|---|---|
| canvas | #ffffff |
| surface | #000000 |
| ink | #0f0f0f |
| ink-soft | #606060 |
| accent | #b2b2b2 |
| on-accent | #0f0f0f |
| border | #c6c6c6 |

Brand colors to stay away from: #065fd4.

## Type

Fonts: Roboto (99.7%, weights 400/500/700); YouTube Noto (0.3%, weights 400/500).
Body size 14px; average step ratio above body 1.43.

| Size | Line height | Weight | Family | Share | Used for |
|---|---|---|---|---|---|
| 12px | 18px | 400 | Roboto | 29.9% | span, div, yt-formatted-string |
| 14px | 20px | 500 | Roboto | 67.8% | span, tp-yt-paper-button, h2 |
| 20px | 28px | 700 | Roboto | 1.7% | yt-formatted-string |

## Spacing, corners, depth, motion

Spacing base 4px (88% of measured gaps are multiples). Scale: 1, 2, 4, 8, 12, 16, 139.

Corners: 8px (41), 4px (41), 20px (22), 12px (7), 28px (4), 3px (2).

Shadows: `rgb(238, 238, 238) 0px 1px 2px 0px inset`.

Motion: durations 100ms, 200ms, 250ms, 300ms; easings cubic-bezier(0.05, 0, 0, 1), cubic-bezier(0.4, 0, 1, 1), cubic-bezier(0, 0, 0.2, 1); 0 keyframe animations.

Layout widths: none found.

Breakpoints: 299px, 300px, 600px, 656px, 840px, 931px, 1024px, 1080px.

Logo: svg, 93x20. Never reuse it.

No gradients.
