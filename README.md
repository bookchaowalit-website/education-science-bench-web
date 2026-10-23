# Observation Bench

A small experiment notebook: three synthetic experiments (light / leaf, water / soil, heat / reaction), a slider that
changes one input, an SVG curve that redraws from it, and a bench log of the last four recorded observations.
Every curve is illustrative and computed in the code; no sensor or lab data is involved.

Live: https://science.bookchaowalit.com (Vercel deploys each push to `main`, see `PRODUCT.md`).

## What it does not do

- No real measurements, sensors, datasets, lab validation, safety guidance or curriculum. No account. Nothing is saved.

## Run

```bash
npm ci
npm run dev
```

## Checks

```bash
npm test           # Vitest: curve and log logic, home page render, Sentry scrubbing
npm run lint
npm run typecheck
npm run build
```

CI (`.github/workflows/ci.yml`) runs the shared Node workflow (with a line-coverage gate) and the shared security
scan on every push and PR to `main`.

## Code map

- `lib/science-bench.ts`: the experiment set plus `findExperiment`, `curvePoints` (clamped to the chart) and
  `recordObservation` (newest first, at most four, unique ids), used by the page.
- `app/page.tsx`: the client bench.
- `lib/sentry.ts` + `instrumentation*.ts`: error reporting to Sentry, errors only, personal data stripped; off when
  `NEXT_PUBLIC_SENTRY_DSN` is unset.
