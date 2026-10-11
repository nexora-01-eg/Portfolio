# NEXORA Portfolio Platform — Architecture (Phase 1)

## Principles

1. **Zero build step.** Pure HTML5/CSS3/vanilla JS. `index.html` runs by
   opening the file directly — no bundler, no Node, no framework.
2. **Data-driven, not code-driven.** Every project, industry, design
   system, and component is an entry in `/data/*.json`. Adding the
   501st project means adding a JSON entry and an asset folder —
   never touching platform code.
3. **Isolation over coupling.** Each design system in
   `/design-systems/` is fully self-contained. Each project in
   `/projects/` follows one fixed template shape. Neither reaches
   into the other or into `/core/`.
4. **Tokens are the only source of visual truth.** All color,
   spacing, radius, shadow, motion, and z-index values live in
   `core/css/tokens.css`. No other file hardcodes a raw value.
5. **Core does one job: bootstrap.** `/core/js/` provides
   infrastructure (routing, search, filters, manifest loading,
   theme, storage, helpers, animation) with empty/stub logic where
   Phase 1 explicitly excludes implementation. No page or business
   logic lives in `/core/`.

## Folder responsibilities

| Folder             | Responsibility |
|--------------------|-----------------|
| `core/`            | Platform infrastructure: CSS tokens/foundation, JS modules |
| `assets/`          | Global, platform-wide images/icons/fonts/animations |
| `data/`            | JSON single source of truth for all dynamic content |
| `pages/`           | Future standalone pages (empty in Phase 1) |
| `components/`      | Future reusable UI components, organized by category (empty in Phase 1) |
| `widgets/`         | Future composite/interactive widgets (empty in Phase 1) |
| `projects/`        | Future demo projects, each following `_template/`'s shape |
| `industries/`      | Industry-specific landing content (empty in Phase 1) |
| `design-systems/`  | 14 fully isolated design-system folders, one per vertical |
| `docs/`            | Platform documentation |

## Why this scales to 500+ projects without restructuring

- New project → copy `/projects/_template/`, fill `project.json`,
  append one entry to `/data/projects.json`. No code changes.
- New industry → append one entry to `/data/industries.json` and
  create `/design-systems/<industry>/`. No code changes.
- New component → add a folder under the matching
  `/components/<category>/`, append one entry to
  `/data/components.json`. No code changes.
- Because navigation, search, and filters all read from `/data/`
  at runtime (`manifest.js`), the platform's *code* footprint stays
  constant regardless of how much *content* it holds.

## What Phase 1 intentionally does NOT include

- No demo projects (only the `_template/` shape)
- No dashboards
- No component implementations (folders + README only)
- No search/filter UI or matching logic (interfaces only)
- No design-system-specific styling (folders + README only)
