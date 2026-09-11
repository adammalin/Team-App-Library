# Team App Library

A searchable catalog for the team's desktop apps, web apps, versioned Custom GPTs, and Codex plugins. Desktop apps retain task-focused documentation for installing from source, updating, launching again, uninstalling, and learning the interface. The site also contains dated API Cost Studies for comparing measured workflow cost, capacity, and outcomes over time.

## Included apps

- Badge Blur
- ORNL OrgChart Studio
- USA Map Studio

## Included web apps

- QR Studio

## Included Custom GPTs

- ORNL Brand Agent (preferred version plus previous-version links)
- Icon Enhancer Agent
- Project Summarizer Agent
- ORNL WordPress Mockup Assistant (preferred version plus previous-version links)
- Text Extractor

## Included Codex resources

- ORNL Presentation Designer
- DOE Proposal Figure 1
- 3D Modeling Agent

## API Cost Studies

- ORNL Brand Agent V2.3.2 heavy-duty EV graphic baseline (September 11, 2026)

Each study publishes structured datapoints plus downloadable comparison and per-setting PDFs. Public study records contain calculated usage deltas only; cumulative account screenshots remain private. See [`docs/API_COST_STUDIES.md`](docs/API_COST_STUDIES.md) for the repeatable content workflow.

The site packages the supplied PDF guides as unchanged downloads and includes current, source-repository-backed commands. It does not distribute unsigned installers or app bundles.

## Run locally

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Verify

```bash
npm test
npm run lint
```

`npm test` builds the site and checks the catalog, version-aware external links, documentation routes, downloadable guides, and core presentation constraints. Run `npm run test:pages` before publishing to verify the complete GitHub Pages export.

## Update the content

- App metadata and instructions: `app/app-data.ts`
- Unified catalog entries, categories, and GPT version links: `app/tool-catalog-data.ts`
- Search and category-filter interface: `app/components/ToolCatalog.tsx`
- Site layout and styling: `app/`
- App icons and screenshots: `public/assets/`
- Downloadable guides: `public/assets/guides/`
- Downloadable Agent Plugins: `public/assets/downloads/`
- API cost study records and reports: `public/assets/cost-studies/`
- API cost study index and detail pages: `app/cost-studies/`

Keep commands aligned with each application's current README and source scripts. Preserve supplied PDFs unchanged; add a newly versioned guide when documentation is revised.

## Publishing status

The public catalog is deployed to GitHub Pages by `.github/workflows/deploy-pages.yml` after changes reach `main`. Validate the Pages export locally before publishing, then confirm the workflow and public routes after the push.
