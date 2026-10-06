---
version: alpha
name: Deadrock Live
summary: "A restrained terminal UI for a live concert page: deep black-green surfaces, off-white information, lime interaction, and orange-red failures."
colors:
  primary: "#B8FF72"
  primary-alt: "#79FF9A"
  canvas: "#050806"
  base: "#0D1110"
  surface: "#121916"
  primary-text: "#E7EEE8"
  secondary-text: "#A7B4AA"
  border: "#3B5741"
  error: "#FF5B35"
  youtube: "#FF3B30"
typography:
  body:
    fontFamily: "Pretendard Variable, Pretendard, -apple-system, sans-serif"
    fontSize: 1rem
  terminal:
    fontFamily: "JetBrains Mono, SFMono-Regular, Menlo, Monaco, Consolas, Pretendard Variable, Pretendard, monospace"
    fontSize: 0.75rem
spacing:
  xs: 4px
  sm: 8px
  md: 14px
  lg: 18px
components:
  action-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#0E120F"
    padding: 12px
  surface-default:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary-text}"
    padding: 14px
  error-log:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.error}"
    padding: 4px
---

## Overview

This concert uses terminal language as information architecture, not as a neon green-screen skin. The concert remains readable first; terminal treatment is reserved for labels, logs, and section structure.

## Colors

- **Lime `#B8FF72`:** only interactive/selected states and SQL emphasis.
- **Orange-red `#FF5B35`:** only errors, the crossed-out `L` in the DEADROCK logo, and glitch offsets in the section nav.
- **Mint `#79FF9A`:** only the `R` in the DEADROCK logo and the RGB-split offset in the section nav.
- **YouTube red `#FF3B30`:** YouTube mark only.
- **Neutral surfaces:** use only canvas, base, and surface levels. Do not add component-specific dark greens.
- **Typography:** use primary and secondary tokens only. Do not use purple or decorative orange labels.

## Typography

Pretendard is the sole display and Korean-information family: titles, event details, cards, and buttons all use it. JetBrains Mono is only for terminal syntax: SQL/logs, command prefixes, labels, metadata, and tab controls. Korean glyphs in a terminal string fall back to Pretendard.

## Layout

Use 18px side padding for primary sections and full-width 1px borders for transcript/table rows. Preserve breathing room between sections; do not create rounded card collections.

## Shapes

TUI elements use square corners. Borders are 1px `border`.

## Components

- Open-state control and main CTA use lime with dark text.
- The section nav is a lime hologram: scanlines and a sweeping sheen on the bar, an angled translucent lime panel behind the selected item, and a short glitch (label scramble with orange-red and mint offsets) when the selection changes or at random intervals. All of it stops under reduced motion.
- Error output uses orange-red text on a dark surface.
- Every normal row uses the shared surface and border values.

## Do's and Don'ts

- Do keep accent color role-based.
- Do keep YouTube red isolated to its brand icon.
- Don't use purple session labels.
- Don't use orange for ordinary labels, hints, dates, or metadata.
- Don't introduce a new literal color in a component; add a token first.
