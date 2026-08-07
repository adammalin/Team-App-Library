# Team App Library

A local-first app catalog and documentation site for the team's unsigned Electron apps. Each app has task-focused pages for installing from source, updating, launching again, uninstalling, and learning the interface.

## Included apps

- Badge Blur
- ORNL OrgChart Studio
- USA Map Studio

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

Keep commands aligned with each application's current README and source scripts. Preserve supplied PDFs unchanged; add a newly versioned guide when documentation is revised.

## Publishing status

This project is a local draft. Hosting, access controls, and publication are separate decisions and are intentionally not configured here.
