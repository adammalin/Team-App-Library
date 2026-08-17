import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);
const basePath = "/Team-App-Library";

const exportedPages = [
  "out/index.html",
  "out/apps/badge-blur/index.html",
  "out/apps/orgchart-studio/index.html",
  "out/apps/usa-map-studio/index.html",
  "out/apps/badge-blur/install/index.html",
  "out/apps/badge-blur/update/index.html",
  "out/apps/badge-blur/run/index.html",
  "out/apps/badge-blur/uninstall/index.html",
  "out/apps/badge-blur/usage/index.html",
  "out/apps/badge-blur/ai-integration/index.html",
  "out/apps/orgchart-studio/install/index.html",
  "out/apps/orgchart-studio/update/index.html",
  "out/apps/orgchart-studio/run/index.html",
  "out/apps/orgchart-studio/uninstall/index.html",
  "out/apps/orgchart-studio/usage/index.html",
  "out/apps/orgchart-studio/ai-integration/index.html",
  "out/apps/usa-map-studio/install/index.html",
  "out/apps/usa-map-studio/update/index.html",
  "out/apps/usa-map-studio/run/index.html",
  "out/apps/usa-map-studio/uninstall/index.html",
  "out/apps/usa-map-studio/usage/index.html",
  "out/apps/usa-map-studio/ai-integration/index.html",
];

test("exports every catalog and documentation route", async () => {
  await Promise.all(exportedPages.map((file) => access(new URL(file, projectRoot))));
});

test("prefixes routes and assets for the GitHub project site", async () => {
  const [home, badgeGuide] = await Promise.all([
    readFile(new URL("out/index.html", projectRoot), "utf8"),
    readFile(new URL("out/apps/badge-blur/index.html", projectRoot), "utf8"),
  ]);

  assert.match(home, new RegExp(`href="${basePath}/apps/badge-blur/"`));
  assert.match(home, new RegExp(`src="${basePath}/assets/icons/badge-blur\\.png"`));
  assert.match(home, new RegExp(`${basePath}/_next/static/`));
  assert.match(
    home,
    /https:\/\/adammalin\.github\.io\/Team-App-Library\/og\.png/,
  );
  assert.match(
    badgeGuide,
    new RegExp(`${basePath}/assets/guides/Badge-Blur-macOS-Quick-Start\\.pdf`),
  );
  assert.doesNotMatch(home, /(?:href|src)="\/(?:apps|assets|_next)\//);
});

test("all exported local links resolve inside the Pages artifact", async () => {
  const checked = new Set();

  for (const page of exportedPages) {
    const html = await readFile(new URL(page, projectRoot), "utf8");
    const references = html.matchAll(/(?:href|src)="([^"#]+)"/g);

    for (const match of references) {
      const value = match[1];
      if (!value.startsWith(basePath + "/")) continue;

      const path = value.slice(basePath.length + 1).split("?")[0];
      if (!path || checked.has(path)) continue;
      checked.add(path);

      const target = path.endsWith("/") ? `out/${path}index.html` : `out/${path}`;
      await access(new URL(target, projectRoot));
    }
  }

  assert.ok(checked.size > 30, "expected the export to contain local routes and assets");
});

test("copies downloadable files and disables Jekyll processing", async () => {
  const files = [
    "out/.nojekyll",
    "out/og.png",
    "out/assets/icons/badge-blur.png",
    "out/assets/icons/orgchart-studio-topbar.svg",
    "out/assets/guides/Badge-Blur-macOS-Quick-Start.pdf",
    "out/assets/guides/ORNL-OrgChart-Studio-macOS-Quick-Start.pdf",
    "out/assets/guides/USA-Map-Studio-User-Guide-v0.8.0.pdf",
  ];

  await Promise.all(files.map((file) => access(new URL(file, projectRoot))));
});
