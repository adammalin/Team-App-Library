# Team App Library

A local-first app catalog and documentation site for the team's unsigned Electron apps. Each app has task-focused pages for installing from source, updating, launching again, uninstalling, and learning the interface.

## Included apps

- Badge Blur
- ORNL OrgChart Studio
- USA Map Studio

## Included Codex resources

- ORNL Presentation Designer
- DOE Proposal Figure 1
- 3D Modeling Agent

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

`npm test` builds the site and checks the catalog, documentation routes, downloadable guides, and core presentation constraints.

## Update the content

- App metadata and instructions: `app/app-data.ts`
- Site layout and styling: `app/`
- App icons and screenshots: `public/assets/`
- Downloadable guides: `public/assets/guides/`
- Downloadable Agent Plugins: `public/assets/downloads/`

Keep commands aligned with each application's current README and source scripts. Preserve supplied PDFs unchanged; add a newly versioned guide when documentation is revised.

## Publishing status

The public catalog is deployed to GitHub Pages by `.github/workflows/deploy-pages.yml` after changes reach `main`. Validate the Pages export locally before publishing, then confirm the workflow and public routes after the push.
