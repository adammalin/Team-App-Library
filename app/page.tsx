import type { Metadata } from "next";
import { ArrowRight, ChatCircleDots, MagnifyingGlass, SquaresFour } from "@phosphor-icons/react/dist/ssr";
import { SiteHeader } from "./components/SiteHeader";
import { ToolCatalog } from "./components/ToolCatalog";
import { toolCatalogEntries } from "./tool-catalog-data";

const catalogCounts = {
  desktopApps: toolCatalogEntries.filter((tool) => tool.category === "desktop-app").length,
  webApps: toolCatalogEntries.filter((tool) => tool.category === "web-app").length,
  customGpts: toolCatalogEntries.filter((tool) => tool.category === "custom-gpt").length,
  codexPlugins: toolCatalogEntries.filter((tool) => tool.category === "codex-plugin").length,
};

function twoDigitCount(value: number) {
  return String(value).padStart(2, "0");
}

export const metadata: Metadata = {
  title: "Team App Library",
  description:
    "Search the team's desktop apps, web apps, Custom GPTs, and Codex plugins.",
};

export default function Home() {
  return (
    <div className="home-page">
      <SiteHeader />
      <main>
        <section className="home-hero">
          <div className="home-hero__copy">
            <span className="eyebrow">Desktop apps · Web apps · Custom GPTs · Codex plugins</span>
            <h1>
              Find the right tool.
              <br />
              Get to work.
            </h1>
            <p>
              Search one growing catalog for installable apps, browser-based utilities,
              versioned Custom GPTs, and purpose-built Codex workflows.
            </p>
            <a className="primary-action" href="#tools">
              Search the catalog
              <ArrowRight />
            </a>
          </div>
          <div className="home-hero__rail" aria-label="Library summary">
            <span>{twoDigitCount(catalogCounts.desktopApps)}</span>
            <strong>Desktop apps</strong>
            <hr />
            <span>{twoDigitCount(catalogCounts.webApps)}</span>
            <strong>Web apps</strong>
            <hr />
            <span>{twoDigitCount(catalogCounts.customGpts)}</span>
            <strong>Custom GPTs · Version-aware links</strong>
            <hr />
            <span>{twoDigitCount(catalogCounts.codexPlugins)}</span>
            <strong>Codex plugins</strong>
          </div>
        </section>

        <section className="assurance-strip" aria-label="Catalog features">
          <span>
            <MagnifyingGlass />
            Search one catalog
          </span>
          <span>
            <SquaresFour />
            Browse four categories
          </span>
          <span>
            <ChatCircleDots weight="fill" />
            Keep previous GPT links
          </span>
        </section>

        <ToolCatalog tools={toolCatalogEntries} />

        <section className="how-section">
          <span className="eyebrow">How this library works</span>
          <div className="how-grid">
            <article>
              <span>01</span>
              <h3>Search by the work</h3>
              <p>Use a keyword such as QR, PowerPoint, macOS, brand, or 3D to narrow the catalog.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Choose a category</h3>
              <p>Move between full desktop apps, web tools, Custom GPTs, and Codex plugins.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Use the preferred version</h3>
              <p>Open the current Custom GPT by default, or expand its card to reach an older version.</p>
            </article>
          </div>
        </section>
      </main>
      <footer className="home-footer">
        <strong>Team App Library</strong>
        <span>Draft internal catalog · Tool availability and approval remain context-dependent.</span>
      </footer>
    </div>
  );
}
