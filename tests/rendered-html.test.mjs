import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set(
    "test",
    String(process.pid) + "-" + String(Date.now()) + "-" + pathname,
  );
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost" + pathname, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the app catalog", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Team App Library<\/title>/i);
  assert.match(html, /Choose a tool\./);
  assert.match(html, /Badge Blur/);
  assert.match(html, /src="\/assets\/icons\/badge-blur\.png"/);
  assert.match(html, /ORNL OrgChart Studio/);
  assert.match(html, /USA Map Studio/);
  assert.match(html, /ORNL Presentation Designer/);
  assert.match(html, /DOE Proposal Figure 1/);
  assert.match(html, /3D Modeling Agent/);
  assert.match(html, /Extend Codex with purpose-built workflows\./);
  assert.match(html, /Codex resources/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("server-renders the complete beta 3D Modeling Agent resource", async () => {
  const response = await render("/resources/3d-modeling-agent");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Beta · Codex Agent Plugin · 3D production/i);
  assert.match(html, /One skill\. Six representation-aware routes\./i);
  assert.match(html, /Build 3D assets as editable systems/i);
  assert.match(html, /\$3d-modeling-agent/);
  assert.match(html, /Deterministic procedural/i);
  assert.match(html, /Parametric CAD/i);
  assert.match(html, /Measured reconstruction/i);
  assert.match(html, /A beautiful render is evidence/i);
  assert.match(html, /Version 0\.1\.0/i);
  assert.match(html, /3d-modeling-agent-0\.1\.0\.zip/);
  assert.match(
    html,
    /https:\/\/adammalin\.github\.io\/Team-App-Library\/assets\/downloads\/3d-modeling-agent-0\.1\.0\.zip/,
  );
  assert.match(
    html,
    /298f00a1ac92eb8aaaee849e7b0d231536be8152e8c405f03e3050f77857e821/,
  );
  assert.match(html, /seven-case self-test/i);
  assert.doesNotMatch(html, /placeholder|lorem ipsum/i);
});

test("server-renders the complete beta DOE Proposal Figure 1 resource", async () => {
  const response = await render("/resources/ercp-proposal-figures");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Beta · Codex Agent Plugin · Scientific Figure 1/i);
  assert.match(html, /One plugin\. One evidence-gated Figure 1 workflow\./i);
  assert.match(html, /Paste one checked prompt to install the complete plugin\./i);
  assert.match(html, /\$create-ercp-proposal-figures/);
  assert.match(html, /completely label-free Figure 1 collaboration draft/i);
  assert.match(html, /one opaque 1536 × 1024 raster PNG/i);
  assert.match(html, /Version 1\.2\.0-beta\.2/i);
  assert.match(html, /ercp-proposal-figures-1\.2\.0-beta\.2\.zip/);
  assert.match(
    html,
    /https:\/\/adammalin\.github\.io\/Team-App-Library\/assets\/downloads\/ercp-proposal-figures-1\.2\.0-beta\.2\.zip/,
  );
  assert.match(
    html,
    /f26b756f5d0034560f49af503cd4f22314f1ead677ad13d6917fb2e8f9d2d85d/,
  );
  assert.match(html, /ercp-proposal-figures-1\.2\.0-beta\.2-preview\.png/);
  assert.match(html, /Version 1\.2\.0-beta\.2 creates Figure 1 collaboration drafts only/i);
  assert.match(html, /Apple Vision OCR now passes its availability metadata directly/i);
  assert.match(html, /128-character interface limit/i);
  assert.match(html, /Eight style references/i);
  assert.match(html, /three cleared real-proposal benchmarks/i);
  assert.match(html, /mean selected score of 4\.64\/5/i);
  assert.match(html, /without forcing five literal regions or a fixed final-art palette/i);
  assert.match(html, /brand-neutral/i);
  assert.doesNotMatch(html, /fixed proposal-role colors|Vision uses pale sage/i);
  assert.doesNotMatch(html, /placeholder|lorem ipsum/i);
});

test("server-renders the complete ORNL Presentation Designer resource", async () => {
  const response = await render("/resources/ornl-presentation-designer");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /One plugin\. Two presentation skills\./i);
  assert.match(html, /Paste one prompt\. Codex handles the download and installation\./i);
  assert.match(html, /You are authorized to download that exact public ZIP/i);
  assert.match(html, /\$create-ornl-presentations/);
  assert.match(html, /\$clean-up-ornl-presentations/);
  assert.match(html, /Files first\. Questions second\. Slides third\./i);
  assert.match(html, /Deck first\. Inspection second\. Design decisions third\. Edits last\./i);
  assert.match(html, /Ask no more than three questions at a time/i);
  assert.match(html, /Do not begin authoring slides until the minimum viable brief is confirmed/i);
  assert.match(html, /Confident redesign is the default/i);
  assert.match(html, /Treat the source as content to preserve, not a layout to imitate/i);
  assert.match(html, /complete a second design pass before propagation/i);
  assert.match(html, /Light polish/i);
  assert.match(html, /Transformative/i);
  assert.match(html, /<details class="plugin-inventory">/i);
  assert.match(html, /What’s included in the plugin\?/i);
  assert.match(html, /ORNL-Presentation-16x9-Template\.potx/i);
  assert.match(html, /Support-Assertion-Evidence-Model-Examples\.potx/i);
  assert.match(html, /No font installers are included/i);
  assert.match(html, /No separate production ORNL logo file is included/i);
  assert.match(html, /An unsafe writer now routes through PowerPoint/i);
  assert.match(html, /Native PowerPoint fallback/i);
  assert.match(
    html,
    /only if both the ordinary path and the authorized PowerPoint-native path are unavailable or fail/i,
  );
  assert.match(
    html,
    /60c45d99d259f18e211a0ed90dee33566086e6dccd00513821fe312894920b78/,
  );
  assert.match(html, /ornl-presentation-designer-1\.2\.0\.zip/);
  assert.match(
    html,
    /https:\/\/adammalin\.github\.io\/Team-App-Library\/assets\/downloads\/ornl-presentation-designer-1\.2\.0\.zip/,
  );
  assert.doesNotMatch(html, /ABSOLUTE PATH TO ornl-presentation-designer/i);
  assert.doesNotMatch(html, /APPROVED SOURCE FILES:/i);
  assert.doesNotMatch(html, /SOURCE PPTX:/i);
});

test("server-renders app-specific documentation routes", async () => {
  const routes = [
    ["/apps/badge-blur/install", "badge-blur-install.zsh"],
    ["/apps/orgchart-studio/update", "orgchart-studio-install.zsh"],
    ["/apps/usa-map-studio/usage", "What the app looks like"],
    ["/apps/usa-map-studio/uninstall", "What stays behind"],
    ["/apps/badge-blur/ai-integration", "Grounding DINO Tiny"],
    ["/apps/orgchart-studio/ai-integration", "replace_chart_draft"],
    ["/apps/usa-map-studio/ai-integration", "get_app_status"],
  ];

  for (const [pathname, expected] of routes) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);
    const html = await response.text();
    assert.match(html, new RegExp(expected, "i"), pathname);
    assert.match(html, /Draft internal documentation/i, pathname);
  }
});

test("distinguishes offline AI from review-first MCP control", async () => {
  const [badge, orgchart, map] = await Promise.all([
    render("/apps/badge-blur/ai-integration"),
    render("/apps/orgchart-studio/ai-integration"),
    render("/apps/usa-map-studio/ai-integration"),
  ]);

  const [badgeHtml, orgchartHtml, mapHtml] = await Promise.all([
    badge.text(),
    orgchart.text(),
    map.text(),
  ]);

  assert.match(badgeHtml, /Local \/ offline AI/i);
  assert.match(badgeHtml, /Remote model loading is disabled/i);
  assert.match(badgeHtml, /Human review remains required/i);

  assert.match(orgchartHtml, /Model Context Protocol/i);
  assert.match(orgchartHtml, /orgchart_studio/i);
  assert.match(orgchartHtml, /saved chart remains unchanged/i);

  assert.match(mapHtml, /usa_map_studio/i);
  assert.match(mapHtml, /get_app_status/i);
  assert.match(mapHtml, /Apply to working map/i);
});

test("publishes the current USA Map Studio release and portable cleanup commands", async () => {
  const [overview, macUninstall, windowsUninstall] = await Promise.all([
    render("/apps/usa-map-studio"),
    render("/apps/usa-map-studio/uninstall?platform=mac"),
    render("/apps/usa-map-studio/uninstall?platform=windows"),
  ]);

  const [overviewHtml, macHtml, windowsHtml] = await Promise.all([
    overview.text(),
    macUninstall.text(),
    windowsUninstall.text(),
  ]);

  assert.match(overviewHtml, /0\.8\.0/);
  assert.match(overviewHtml, /USA-Map-Studio-User-Guide-v0\.8\.0\.pdf/);
  assert.match(macHtml, /Remove-USA-Map-Studio-MCP\.command/);
  assert.match(windowsHtml, /Remove-USA-Map-Studio-MCP\.cmd/);
  assert.doesNotMatch(`${macHtml}\n${windowsHtml}`, /npm run mcp:remove/);
});

test("ships the supplied PDFs and removes starter preview content", async () => {
  const files = [
    "public/assets/guides/Badge-Blur-macOS-Quick-Start.pdf",
    "public/assets/guides/ORNL-OrgChart-Studio-macOS-Quick-Start.pdf",
    "public/assets/guides/USA-Map-Studio-User-Guide-v0.8.0.pdf",
    "public/assets/icons/badge-blur.png",
    "public/assets/icons/orgchart-studio-topbar.svg",
    "public/assets/screenshots/orgchart-studio-editor.png",
    "public/assets/downloads/ornl-presentation-designer-1.2.0.zip",
  ];

  await Promise.all(files.map((file) => access(new URL(file, projectRoot))));
  await assert.rejects(access(new URL("app/_sites-preview", projectRoot)));
});

test("keeps brand-created containers square and starter metadata absent", async () => {
  const [css, layout, packageJson] = await Promise.all([
    readFile(new URL("app/globals.css", projectRoot), "utf8"),
    readFile(new URL("app/layout.tsx", projectRoot), "utf8"),
    readFile(new URL("package.json", projectRoot), "utf8"),
  ]);

  const radiusDeclarations = css.match(/border-radius\s*:\s*[^;]+/g) ?? [];
  assert.deepEqual(radiusDeclarations, ["border-radius: 50%"]);
  assert.doesNotMatch(layout, /Starter Project|codex-preview|_sites-preview/);
  assert.match(packageJson, /"name": "team-app-library"/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
