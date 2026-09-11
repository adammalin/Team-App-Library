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
  "out/cost-studies/index.html",
  "out/cost-studies/ornl-brand-agent-v2-3-2-heavy-duty-ev-2026-09-11/index.html",
];

test("exports every catalog and documentation route", async () => {
  await Promise.all(exportedPages.map((file) => access(new URL(file, projectRoot))));
});

test("prefixes routes and assets for the GitHub project site", async () => {
  const [home, badgeGuide, presentationGuide, figureGuide, modelingGuide, costIndex, costStudy] = await Promise.all([
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
    readFile(new URL("out/cost-studies/index.html", projectRoot), "utf8"),
    readFile(
      new URL(
        "out/cost-studies/ornl-brand-agent-v2-3-2-heavy-duty-ev-2026-09-11/index.html",
        projectRoot,
      ),
      "utf8",
    ),
  ]);

  assert.match(home, new RegExp(`href="${basePath}/apps/badge-blur/"`));
  assert.match(home, new RegExp(`src="${basePath}/assets/icons/badge-blur\\.png"`));
  assert.match(home, new RegExp(`${basePath}/_next/static/`));
  assert.match(home, /https:\/\/adammalin\.github\.io\/QR-code-gen\//);
  assert.match(
    home,
    /https:\/\/chatgpt\.com\/g\/g-6a57d24b2aa48191a15d3be17f6d8651-ornl-brand-agent-v2-3-2/,
  );
  assert.match(
    home,
    /https:\/\/chatgpt\.com\/g\/g-69f267456cc08191876ba6ffdacb7e40-ornl-brand-visual-design-agent/,
  );
  assert.match(
    home,
    /https:\/\/chatgpt\.com\/g\/g-69f26eaffef081919d05910e460478de-icon-enhancer-agent/,
  );
  assert.match(
    home,
    /https:\/\/chatgpt\.com\/g\/g-69f253f6e8dc8191a4ffc67040a92bc0-project-summarizer-agent/,
  );
  assert.match(
    home,
    /https:\/\/chatgpt\.com\/g\/g-6a74f3054b188191b3eb3edd4f1943e5-ornl-wordpress-mockup-assistant-v2/,
  );
  assert.match(
    home,
    /https:\/\/chatgpt\.com\/g\/g-6a5fd09b18c48191ac155e81c833ea78-ornl-wordpress-mockup-assistant/,
  );
  assert.match(
    home,
    /https:\/\/chatgpt\.com\/g\/g-69fa3e43c0488191a071b20ca59d5fcd-text-extractor/,
  );
  assert.match(home, /Previous versions[\s\S]{0,40}1/);
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
      `${basePath}/assets/downloads/ercp-proposal-figures-1\\.2\\.0-beta\\.5\\.zip`,
    ),
  );
  assert.match(
    figureGuide,
    new RegExp(
      `${basePath}/assets/screenshots/ercp-proposal-figures-1\\.2\\.0-beta\\.5-preview\\.png`,
    ),
  );
  assert.match(
    figureGuide,
    new RegExp(
      `${basePath}/assets/guides/DOE-Proposal-Figure-1-Codex-Skill-Guide-1\\.2\\.0-beta\\.5\\.pdf`,
    ),
  );
  assert.match(
    figureGuide,
    new RegExp(
      `${basePath}/assets/presentations/DOE-Proposal-Figure-1-Process-Overview-Draft-2026-09-11-v2\\.pptx`,
    ),
  );
  assert.match(
    figureGuide,
    /https:\/\/adammalin\.github\.io\/Team-App-Library\/assets\/downloads\/ercp-proposal-figures-1\.2\.0-beta\.5\.zip/,
  );
  assert.match(
    figureGuide,
    /https:\/\/chatgpt\.com\/plugins\/Plugin_a3d052654ad88191873ab54059f268a4\?open_in_app/,
  );
  assert.match(figureGuide, /Beta[\s\S]{0,80}Version[\s\S]{0,80}1\.2\.0-beta\.5/i);
  assert.match(figureGuide, /completely label-free Figure 1 collaboration draft/i);
  assert.match(figureGuide, /brand-neutral/i);
  assert.match(figureGuide, /Eight legacy layouts \+ one flat-style target/i);
  assert.match(figureGuide, /DUNE transformation in 3\/3 images instead of 1\/3/i);
  assert.match(figureGuide, /Lear[\s\S]{0,80}glyph failure from 3\/3 images to 0\/3/i);
  assert.match(figureGuide, /without forcing five literal regions or a fixed final-art palette/i);
  assert.match(figureGuide, /a11af3c53c6b7eb611f3ad1b0263d992440074d9c82a74049826c63ac2c264c6/);
  assert.match(figureGuide, /three to five required, proposal-specific visual forms/i);
  assert.match(figureGuide, /source-backed before state, scientific action, changed after/i);
  assert.match(figureGuide, /generic future-benefit substitution/i);
  assert.match(figureGuide, /modest diagrammatic depth is an advisory/i);
  assert.match(figureGuide, /never attach them to image generation/i);
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
  assert.match(home, new RegExp(`href="${basePath}/cost-studies/"`));
  assert.match(
    costIndex,
    new RegExp(
      `href="${basePath}/cost-studies/ornl-brand-agent-v2-3-2-heavy-duty-ev-2026-09-11/"`,
    ),
  );
  assert.match(
    costStudy,
    new RegExp(
      `${basePath}/assets/cost-studies/2026-09-11-ornl-brand-agent-v2-3-2/ORNL_Brand_Agent_Model_Cost_Comparison\\.pdf`,
    ),
  );
  assert.match(
    costStudy,
    new RegExp(
      `${basePath}/assets/cost-studies/2026-09-11-ornl-brand-agent-v2-3-2/study-data\\.json`,
    ),
  );
  assert.match(
    costStudy,
    new RegExp(
      `${basePath}/assets/cost-studies/2026-09-11-ornl-brand-agent-v2-3-2/project-brief\\.md`,
    ),
  );
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
    "out/assets/guides/DOE-Proposal-Figure-1-Codex-Skill-Guide-1.2.0-beta.5.pdf",
    "out/assets/presentations/DOE-Proposal-Figure-1-Process-Overview-Draft-2026-09-11-v2.pptx",
    "out/assets/downloads/ornl-presentation-designer-1.2.0.zip",
    "out/assets/downloads/ercp-proposal-figures-1.2.0-beta.5.zip",
    "out/assets/downloads/3d-modeling-agent-0.1.0.zip",
    "out/assets/screenshots/ercp-proposal-figures-1.2.0-beta.5-preview.png",
    "out/assets/cost-studies/2026-09-11-ornl-brand-agent-v2-3-2/study-data.json",
    "out/assets/cost-studies/2026-09-11-ornl-brand-agent-v2-3-2/project-brief.md",
    "out/assets/cost-studies/2026-09-11-ornl-brand-agent-v2-3-2/ORNL_Brand_Agent_Model_Cost_Comparison.pdf",
    "out/assets/cost-studies/2026-09-11-ornl-brand-agent-v2-3-2/ORNL_Brand_Agent_GPT-5.6-Sol_Instant_Cost_Capacity.pdf",
    "out/assets/cost-studies/2026-09-11-ornl-brand-agent-v2-3-2/ORNL_Brand_Agent_GPT-5.6-Sol_Thinking-Mini_Cost_Capacity.pdf",
    "out/assets/cost-studies/2026-09-11-ornl-brand-agent-v2-3-2/ORNL_Brand_Agent_GPT-5.6-Sol_Light_Cost_Capacity.pdf",
    "out/assets/cost-studies/2026-09-11-ornl-brand-agent-v2-3-2/ORNL_Brand_Agent_GPT-5.6-Sol_Thinking-Standard_Cost_Capacity.pdf",
    "out/assets/cost-studies/2026-09-11-ornl-brand-agent-v2-3-2/ORNL_Brand_Agent_GPT-5.6-Sol_Pro_Cost_Capacity.pdf",
  ];

  await Promise.all(files.map((file) => access(new URL(file, projectRoot))));
});
