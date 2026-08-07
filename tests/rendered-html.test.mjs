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
  assert.match(html, /Choose an app\./);
  assert.match(html, /Badge Blur/);
  assert.match(html, /src="\/assets\/icons\/badge-blur\.png"/);
  assert.match(html, /ORNL OrgChart Studio/);
  assert.match(html, /USA Map Studio/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("server-renders app-specific documentation routes", async () => {
  const routes = [
    ["/apps/badge-blur/install", "badge-blur-install.zsh"],
    ["/apps/orgchart-studio/update", "orgchart-studio-install.zsh"],
    ["/apps/usa-map-studio/usage", "What the app looks like"],
    ["/apps/usa-map-studio/uninstall", "What stays behind"],
  ];

  for (const [pathname, expected] of routes) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);
    const html = await response.text();
    assert.match(html, new RegExp(expected, "i"), pathname);
    assert.match(html, /Draft internal documentation/i, pathname);
  }
});

test("ships the supplied PDFs and removes starter preview content", async () => {
  const files = [
    "public/assets/guides/Badge-Blur-macOS-Quick-Start.pdf",
    "public/assets/guides/ORNL-OrgChart-Studio-macOS-Quick-Start.pdf",
    "public/assets/guides/USA-Map-Studio-User-Guide.pdf",
    "public/assets/icons/badge-blur.png",
    "public/assets/icons/orgchart-studio-topbar.svg",
    "public/assets/screenshots/orgchart-studio-editor.png",
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
