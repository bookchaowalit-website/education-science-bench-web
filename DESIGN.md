# Design direction — Observation Bench

A small experiment notebook over three synthetic experiments. Since 2026-11-19 the site uses the shared
**Reader shell** (see `READER.md`): `app/reader-shell.css`, `components/reader-shell.tsx` and
`tests/reader-shell.test.tsx` are copied byte for byte from content-techblog-web. Geist via `next/font`
(variable on `<html>`), `--rs-*` tokens in light and dark.

- Structure: one h1 and lede (states that every curve is illustrative), experiment chips (`aria-pressed`), the
  bench card (readout as a `role="status"` line, the curve in the accent colour, the note, a labelled 44px
  slider, Record observation), then the bench log.
- Units read the same everywhere ("8 hours", "31 °C", "54%") through `formatValue` in `lib/science-bench.ts`.
- Bench log: an empty state that says how to start; the four newest observations, newest first, for this visit.
- Floor: text ≥ 12px, controls ≥ 44px, 4.5:1 text contrast, forced colours, no horizontal scroll at 320px,
  footer link back to https://bookchaowalit.com/.
- Honesty: synthetic, illustrative measurements; no sensor, dataset or lab validation.
