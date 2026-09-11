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
  assert.match(html, /Find the right tool\./);
  assert.match(html, /Search the catalog/);
  assert.match(html, /Desktop apps/);
  assert.match(html, /Web apps/);
  assert.match(html, /Custom GPTs/);
  assert.match(html, /Codex plugins/);
  assert.match(html, /Showing[\s\S]{0,40}12[\s\S]{0,40}of[\s\S]{0,40}12[\s\S]{0,40}tools/);
  assert.match(html, /Badge Blur/);
  assert.match(html, /src="\/assets\/icons\/badge-blur\.png"/);
  assert.match(html, /ORNL OrgChart Studio/);
  assert.match(html, /USA Map Studio/);
  assert.match(html, /QR Studio/);
  assert.match(html, /https:\/\/adammalin\.github\.io\/QR-code-gen\//);
  assert.match(html, /fully transparent background/i);
  assert.match(html, /ORNL Brand Agent/);
  assert.match(html, /Preferred · v2\.3\.2/);
  assert.match(html, /Previous versions[\s\S]{0,40}1/);
  assert.match(
    html,
    /https:\/\/chatgpt\.com\/g\/g-6a57d24b2aa48191a15d3be17f6d8651-ornl-brand-agent-v2-3-2/,
  );
  assert.match(
    html,
    /https:\/\/chatgpt\.com\/g\/g-69f267456cc08191876ba6ffdacb7e40-ornl-brand-visual-design-agent/,
  );
  assert.match(html, /Icon Enhancer Agent/);
  assert.match(html, /Project Summarizer Agent/);
  assert.match(html, /ORNL WordPress Mockup Assistant/);
  assert.match(html, /Text Extractor/);
  assert.match(html, /Recommended · GPT-5\.6 Sol/);
  assert.match(
    html,
    /https:\/\/chatgpt\.com\/g\/g-69f26eaffef081919d05910e460478de-icon-enhancer-agent/,
  );
  assert.match(
    html,
    /https:\/\/chatgpt\.com\/g\/g-69f253f6e8dc8191a4ffc67040a92bc0-project-summarizer-agent/,
  );
  assert.match(
    html,
    /https:\/\/chatgpt\.com\/g\/g-6a74f3054b188191b3eb3edd4f1943e5-ornl-wordpress-mockup-assistant-v2/,
  );
  assert.match(
    html,
    /https:\/\/chatgpt\.com\/g\/g-6a5fd09b18c48191ac155e81c833ea78-ornl-wordpress-mockup-assistant/,
  );
  assert.match(
    html,
    /https:\/\/chatgpt\.com\/g\/g-69fa3e43c0488191a071b20ca59d5fcd-text-extractor/,
  );
  assert.match(html, /ORNL Presentation Designer/);
  assert.match(html, /DOE Proposal Figure 1/);
  assert.match(html, /3D Modeling Agent/);
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
  assert.match(html, /Install from the Plugins Directory, then open a fresh task\./i);
  assert.match(
    html,
    /https:\/\/chatgpt\.com\/plugins\/Plugin_a3d052654ad88191873ab54059f268a4\?open_in_app/,
  );
  assert.match(html, /Manual verified installation \(ZIP \+ checksum\)/i);
  assert.match(html, /\$create-ercp-proposal-figures/);
  assert.match(html, /completely label-free Figure 1 collaboration draft/i);
  assert.match(html, /one opaque 1536 × 1024 raster PNG/i);
  assert.match(html, /Version 1\.2\.0-beta\.5/i);
  assert.match(html, /ercp-proposal-figures-1\.2\.0-beta\.5\.zip/);
  assert.match(
    html,
    /https:\/\/adammalin\.github\.io\/Team-App-Library\/assets\/downloads\/ercp-proposal-figures-1\.2\.0-beta\.5\.zip/,
  );
  assert.match(
    html,
    /a11af3c53c6b7eb611f3ad1b0263d992440074d9c82a74049826c63ac2c264c6/,
  );
  assert.match(html, /ercp-proposal-figures-1\.2\.0-beta\.5-preview\.png/);
  assert.match(html, /Where it fits in proposal development/);
  assert.match(html, /Download PDF guide/i);
  assert.match(
    html,
    /DOE-Proposal-Figure-1-Codex-Skill-Guide-1\.2\.0-beta\.5\.pdf/,
  );
  assert.match(html, /Download presentation/i);
  assert.match(
    html,
    /DOE-Proposal-Figure-1-Process-Overview-Draft-2026-09-11-v2\.pptx/,
  );
  assert.match(html, /Editable process overview · PowerPoint · 6 slides/i);
  assert.match(html, /complete installation prompt, the complete Figure 1 prompt/i);
  assert.match(html, /Version 1\.2\.0-beta\.5 creates Figure 1 collaboration drafts only/i);
  assert.match(html, /three to five required, proposal-specific visual forms/i);
  assert.match(html, /source-backed before state, scientific action, changed after/i);
  assert.match(html, /generic future-benefit substitution/i);
  assert.match(html, /modest diagrammatic depth is an advisory/i);
  assert.match(html, /Eight legacy layouts \+ one flat-style target/i);
  assert.match(html, /never attach them to image generation/i);
  assert.match(html, /DUNE transformation in 3\/3 images instead of 1\/3/i);
  assert.match(html, /Lear[\s\S]{0,80}glyph failure from 3\/3 images to 0\/3/i);
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
