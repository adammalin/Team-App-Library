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
  assert.match(html, /Codex resources/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
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
  assert.match(html, /Deck first\. Inspection second\. Questions third\. Edits last\./i);
  assert.match(html, /Ask no more than three questions at a time/i);
  assert.match(html, /Do not begin authoring slides until the minimum viable brief is confirmed/i);
  assert.match(html, /Do not begin mutation until it is confirmed/i);
  assert.match(html, /<details class="plugin-inventory">/i);
  assert.match(html, /What’s included in the plugin\?/i);
  assert.match(html, /ORNL-Presentation-16x9-Template\.potx/i);
  assert.match(html, /Support-Assertion-Evidence-Model-Examples\.potx/i);
  assert.match(html, /No font installers are included/i);
  assert.match(html, /No separate production ORNL logo file is included/i);
  assert.match(html, /A cleanup can correctly return HOLD/i);
  assert.match(
    html,
    /fd5d87bb980de5938eaed63e76a1a38a8cd2c90c2d8ef363b73c429a693ff27f/,
  );
  assert.match(html, /ornl-presentation-designer-1\.1\.2\.zip/);
  assert.match(
    html,
    /https:\/\/adammalin\.github\.io\/Team-App-Library\/assets\/downloads\/ornl-presentation-designer-1\.1\.2\.zip/,
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
    "public/assets/downloads/ornl-presentation-designer-1.1.2.zip",
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
