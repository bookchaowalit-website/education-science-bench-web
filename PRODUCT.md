# Observation Bench — Product truth

> Inferred from the code and copy (no user interview). Checked against the portfolio card claims review
> (`portfolio-site-web/docs/audits/CARD-CLAIMS-REVIEW-2026-10.md`, row `science-lab`, evidence Prototype) on
> 2026-10-23.

## What it is

A client-only experiment notebook with synthetic, illustrative curves and an in-memory bench log.

## Who it is for

A student or curious builder learning to frame "change one thing, look again", or a portfolio visitor.

## What works today

1. Three experiment tabs (light / leaf, water / soil, heat / reaction); choosing one sets its variable, unit, colour,
   note and baseline value.
2. A slider (1–100) changes the input; the readout and the SVG curve redraw from a fixed formula. The curve is clamped
   so it always stays inside the chart.
3. "Record observation" adds "experiment / value unit" to the bench log, newest first, keeping the last four.
4. Front-end and server errors go to Sentry (errors only, personal data stripped) when `NEXT_PUBLIC_SENTRY_DSN` is set.

## What does not work (and must not be claimed)

- No sensor, dataset or real measurement: the curve is a synthetic sine-based shape, not a model of the experiment.
- No lab validation, safety guidance or curriculum.
- The bench log lives in page memory and is lost on reload. No account, storage or sync. No API route.

## Live URL and deploy state

- Live: https://science.bookchaowalit.com (HTTP 200 on 2026-10-23).
- The Vercel project `bookchaowalit-science-bench-frontend` is linked to this repository
  (`bookchaowalit-website/education-science-bench-web`, branch `main`), so each push to `main` deploys to production.
  Last production deploy before this work: 2026-10-23, commit 298a59e (Git, READY).
- `NEXT_PUBLIC_SENTRY_DSN` is set on the Vercel project (Sentry project `education-science-bench-web`, org
  `personal-yu0`).

## Boundaries

- Browser-only, no server data. The only outbound call is a Sentry error report, when the DSN is set.
