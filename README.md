# Team App Library

A searchable catalog for the team's desktop apps, web apps, versioned Custom GPTs, and Codex plugins. Desktop apps retain task-focused documentation for installing from source, updating, launching again, uninstalling, and learning the interface. The site also contains dated API Cost Studies for comparing measured workflow cost, capacity, and outcomes over time.

## Included apps

- Badge Blur
- ORNL OrgChart Studio
- USA Map Studio

## Included web apps

- OrgChart Studio (recommended browser workflow)
- Door Sign Studio
- QR Studio

## Included Custom GPTs

- ORNL Brand Agent (preferred version plus previous-version links)
- Icon Enhancer Agent
- Project Summarizer Agent
- ORNL WordPress Mockup Assistant (preferred version plus previous-version links)
- Text Extractor

## Included Codex resources

- ORNL - OrgChart Studio (v0.5.0 browser-first ORNL workspace companion)

- ORNL – Presentations (workspace plugin with quick-start guide)
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

## Historical OrgChart Studio documentation update — November 17, 2026

The current three-page guide is `ORNL-OrgChart-Studio-Desktop-Quick-Start-2026-11-17.pdf`; the dated October 27 guide is retained. Stable desktop/Mac PDF URLs and the thumbnail now mirror the current supplied files. Mac and Windows install/update copy controls match `public/assets/downloads/orgchart-studio-install-{macos,windows}.txt` and the reviewed source command files. Both platform commands are one line.

The plugin is v0.3.3. On November 18, 2026, link access was verified as “Anyone in ORNL with the link”: UNLISTED discoverability with workspace reader access and the existing owner retained. ORNL workspace members can use the direct link; this does not share anyone’s local chart database. Public manual installation follows app v0.1.0 main, the plugin keeps its verified v0.2.0 source pin, and existing newer local v0.3.0 copies are not advertised as a public release. The plugin guide is `/resources/orgchart-studio/`. No plugin archive or org-chart data is distributed by this update.

## OrgChart browser-first catalog update — November 20, 2026

The catalog now links the live browser app at https://adammalin.github.io/Org-Chart-Studio/ and the browser guide at `/web-apps/orgchart-studio/`. The guide prominently links the optional shared companion plugin v0.5.0. All desktop documentation routes and the desktop catalog card recommend trying the browser first while preserving native setup instructions, unchanged installer commands, and the original dated PDFs. The plugin guide covers the browser-first release, current official-source URL, visible review, history, saves, and optional desktop setup.

Verified app source `0bce551173fcff7a9c3df8f42a5696bc8cac75be`, Pages `3e5f8ad6f62cc51776687343a5eda8ffe171f66e`. Shared plugin `Plugin_8765a02936388191b4ce25a3ad811246`, v0.5.0, workspace reader access and unlisted discovery verified November 20. The live app link is stable and follows future deployments; desktop public-main and plugin fresh-install pins remain separate. No chart database or retained sources are included.

## Browser-first PDF guide — November 20, 2026

The primary guide is now `ORNL-OrgChart-Studio-Quick-Start-2026-11-20.pdf`: browser workflow and saving (page 1), enabling and using the shared companion v0.5.0 (page 2), and optional Mac/Windows native setup with complete commands (page 3). Browser, plugin and desktop guide pages link it. The generic Quick-Start and legacy unversioned Desktop-Quick-Start aliases serve the same revised bytes; dated desktop and macOS originals remain unchanged. The primary preview now shows the browser-first cover.

Rebuild with `python3 scripts/build_orgchart_quick_start.py --font-dir /path/to/fonts`; requires ReportLab, pypdf, Muli Regular/Bold/ExtraBold and IBM Plex Mono Regular. The generator reads URLs, plugin version and exact install commands from `app/orgchart-studio-data.ts`, verifies commands against their downloadable text files, and retains single-command ActualText in the PDF. Verify all three rendered pages and links before copying to stable aliases and publishing.
