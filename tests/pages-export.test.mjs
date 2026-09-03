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
  "out/resources/ornl-presentation-designer/index.html",
  "out/resources/ercp-proposal-figures/index.html",
  "out/resources/3d-modeling-agent/index.html",
];

test("exports every catalog and documentation route", async () => {
  await Promise.all(exportedPages.map((file) => access(new URL(file, projectRoot))));
});

test("prefixes routes and assets for the GitHub project site", async () => {
  const [home, badgeGuide, presentationGuide, figureGuide, modelingGuide] = await Promise.all([
    readFile(new URL("out/index.html", projectRoot), "utf8"),
    readFile(new URL("out/apps/badge-blur/index.html", projectRoot), "utf8"),
    readFile(
      new URL("out/resources/ornl-presentation-designer/index.html", projectRoot),
      "utf8",
    ),
    readFile(
      new URL("out/resources/ercp-proposal-figures/index.html", projectRoot),
      "utf8",
    ),
    readFile(
      new URL("out/resources/3d-modeling-agent/index.html", projectRoot),
      "utf8",
    ),
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
  assert.match(
    home,
    new RegExp(`href="${basePath}/resources/ornl-presentation-designer/"`),
  );
  assert.match(
    presentationGuide,
    new RegExp(
      `${basePath}/assets/downloads/ornl-presentation-designer-1\\.2\\.0\\.zip`,
    ),
  );
  assert.match(
    presentationGuide,
    /https:\/\/adammalin\.github\.io\/Team-App-Library\/assets\/downloads\/ornl-presentation-designer-1\.2\.0\.zip/,
  );
  assert.match(
    home,
    new RegExp(`href="${basePath}/resources/ercp-proposal-figures/"`),
  );
  assert.match(
    figureGuide,
    new RegExp(
      `${basePath}/assets/downloads/ercp-proposal-figures-1\\.2\\.0-beta\\.2\\.zip`,
    ),
  );
  assert.match(
    figureGuide,
    new RegExp(
      `${basePath}/assets/screenshots/ercp-proposal-figures-1\\.2\\.0-beta\\.2-preview\\.png`,
    ),
  );
  assert.match(
    figureGuide,
    /https:\/\/adammalin\.github\.io\/Team-App-Library\/assets\/downloads\/ercp-proposal-figures-1\.2\.0-beta\.2\.zip/,
  );
  assert.match(figureGuide, /Beta[\s\S]{0,80}Version[\s\S]{0,80}1\.2\.0-beta\.2/i);
  assert.match(figureGuide, /completely label-free Figure 1 collaboration draft/i);
  assert.match(figureGuide, /brand-neutral/i);
  assert.match(figureGuide, /Eight style references/i);
  assert.match(figureGuide, /three cleared real-proposal benchmarks/i);
  assert.match(figureGuide, /mean selected score of 4\.64\/5/i);
  assert.match(figureGuide, /without forcing five literal regions or a fixed final-art palette/i);
  assert.match(figureGuide, /f26b756f5d0034560f49af503cd4f22314f1ead677ad13d6917fb2e8f9d2d85d/);
  assert.match(figureGuide, /Apple Vision OCR now passes its availability metadata directly/i);
  assert.doesNotMatch(figureGuide, /fixed proposal-role colors|Vision uses pale sage/i);
  assert.match(
    home,
    new RegExp(`href="${basePath}/resources/3d-modeling-agent/"`),
  );
  assert.match(
    modelingGuide,
    new RegExp(`${basePath}/assets/downloads/3d-modeling-agent-0\\.1\\.0\\.zip`),
  );
  assert.match(
    modelingGuide,
    /https:\/\/adammalin\.github\.io\/Team-App-Library\/assets\/downloads\/3d-modeling-agent-0\.1\.0\.zip/,
  );
  assert.match(modelingGuide, /Beta[\s\S]{0,80}Version[\s\S]{0,80}0\.1\.0/i);
  assert.match(modelingGuide, /One skill\. Six representation-aware routes\./i);
  assert.match(modelingGuide, /298f00a1ac92eb8aaaee849e7b0d231536be8152e8c405f03e3050f77857e821/);
  assert.doesNotMatch(presentationGuide, /ABSOLUTE PATH TO ornl-presentation-designer/i);
  assert.match(presentationGuide, /Files first\. Questions second\. Slides third\./i);
  assert.match(
    presentationGuide,
    /Deck first\. Inspection second\. Design decisions third\. Edits last\./i,
  );
  assert.match(presentationGuide, /Confident redesign is the default/i);
  assert.match(presentationGuide, /complete a second design pass before propagation/i);
  assert.match(presentationGuide, /What’s included in the plugin\?/i);
  assert.match(presentationGuide, /ORNL-Presentation-16x9-Template\.potx/i);
  assert.match(presentationGuide, /No font installers are included/i);
  assert.doesNotMatch(presentationGuide, /APPROVED SOURCE FILES:/i);
  assert.doesNotMatch(presentationGuide, /SOURCE PPTX:/i);
  assert.doesNotMatch(home, /(?:href|src)="\/(?:apps|assets|resources|_next)\//);
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
    "out/assets/downloads/ornl-presentation-designer-1.2.0.zip",
    "out/assets/downloads/ercp-proposal-figures-1.2.0-beta.2.zip",
    "out/assets/downloads/3d-modeling-agent-0.1.0.zip",
    "out/assets/screenshots/ercp-proposal-figures-1.2.0-beta.2-preview.png",
  ];

  await Promise.all(files.map((file) => access(new URL(file, projectRoot))));
});
