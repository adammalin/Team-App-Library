import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  Cube,
  DownloadSimple,
  FilePpt,
  HardDrives,
  ImageSquare,
  Package,
  TerminalWindow,
} from "@phosphor-icons/react/dist/ssr";
import { apps } from "./app-data";
import { AppIcon } from "./components/AppIcon";
import { presentationPlugin } from "./presentation-plugin-data";
import { ercpProposalFiguresPlugin } from "./ercp-proposal-figures-data";
import { threeDModelingAgentPlugin } from "./three-d-modeling-agent-data";
import { SiteHeader } from "./components/SiteHeader";

export const metadata: Metadata = {
  title: "Team App Library",
  description:
    "Install and learn the team's local desktop apps and Codex resources.",
};

export default function Home() {
  return (
    <div className="home-page">
      <SiteHeader />
      <main>
        <section className="home-hero">
          <div className="home-hero__copy">
            <span className="eyebrow">Local tools · Codex resources · One clear starting point</span>
            <h1>
              Choose a tool.
              <br />
              Get to work.
            </h1>
            <p>
              Setup and usage guides for the team&apos;s desktop tools and Codex resources—
              including downloads, checked prompts, printable docs, and review guidance.
            </p>
            <a className="primary-action" href="#tools">
              Browse the tools
              <ArrowRight />
            </a>
          </div>
          <div className="home-hero__rail" aria-label="Library summary">
            <span>03</span>
            <strong>Local desktop apps</strong>
            <hr />
            <span>03</span>
            <strong>Codex resources</strong>
            <hr />
            <span>01</span>
            <strong>Shared help center</strong>
          </div>
        </section>

        <section className="assurance-strip" aria-label="Distribution approach">
          <span>
            <TerminalWindow />
            Script-based setup
          </span>
          <span>
            <HardDrives />
            User-folder install
          </span>
          <span>
            <CheckCircle weight="fill" />
            App and plugin guidance
          </span>
        </section>

        <section id="tools" className="catalog-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Available now</span>
              <h2>Desktop app catalog</h2>
            </div>
            <p>Select an app to open its complete documentation set.</p>
          </div>
          <div className="app-grid">
            {apps.map((app, index) => (
              <article className="app-card" key={app.slug}>
                <div className="app-card__index">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <AppIcon app={app} />
                <div className="app-card__body">
                  <span className="eyebrow">{app.kicker}</span>
                  <h3>{app.name}</h3>
                  <p>{app.description}</p>
                  <div className="app-card__meta">
                    <span>{app.platformSummary}</span>
                    <span>v{app.version}</span>
                  </div>
                </div>
                <div className="app-card__actions">
                  <Link href={"/apps/" + app.slug}>
                    Open app guide
                    <ArrowRight />
                  </Link>
                  <a href={app.guide.href} target="_blank" rel="noreferrer">
                    <DownloadSimple />
                    PDF
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="resource-catalog" aria-labelledby="codex-resources-title">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Codex resources</span>
              <h2 id="codex-resources-title">Extend Codex with purpose-built workflows.</h2>
            </div>
            <p>Browse Agent Plugins, specialist skills, checked prompts, and future Codex resources.</p>
          </div>
          <div className="resource-grid">
            <article className="resource-card">
              <div className="resource-card__mark" aria-hidden="true">
                <FilePpt weight="duotone" />
              </div>
              <div className="resource-card__body">
                <span className="eyebrow">
                  Agent Plugin · PowerPoint · v{presentationPlugin.version}
                </span>
                <h3>ORNL Presentation Designer</h3>
                <p>
                  Create a new editable ORNL deck from approved sources or clean up an existing
                  PowerPoint with a confident-redesign workflow, visible before/after quality gate,
                  and a tested native PowerPoint fallback for protected files.
                </p>
                <div className="resource-card__skills">
                  <span>Create new presentations</span>
                  <span>Confidently redesign existing decks</span>
                  <span>ORNL template and brand references included</span>
                </div>
              </div>
              <div className="resource-card__actions">
                <Link href="/resources/ornl-presentation-designer">
                  Open complete guide
                  <ArrowRight />
                </Link>
                <Link href="/resources/ornl-presentation-designer#download">
                  <Package />
                  Download details
                </Link>
              </div>
            </article>

            <article className="resource-card">
              <div className="resource-card__mark" aria-hidden="true">
                <ImageSquare weight="duotone" />
              </div>
              <div className="resource-card__body">
                <span className="eyebrow">
                  Beta · Agent Plugin · Scientific Figure 1 · v{ercpProposalFiguresPlugin.version}
                </span>
                <h3>DOE Proposal Figure 1</h3>
                <p>
                  Turn a substantive ERCP or ECRP proposal into one source-grounded, completely
                  label-free raster Figure 1 collaboration draft, with proposal, science, visual,
                  OCR, and handoff quality gates built into the workflow.
                </p>
                <div className="resource-card__skills">
                  <span>Reads the attached proposal in full</span>
                  <span>Creates label-free PNG collaboration drafts</span>
                  <span>Packages style references and repeatable QA</span>
                </div>
              </div>
              <div className="resource-card__actions">
                <Link href="/resources/ercp-proposal-figures">
                  Open beta guide
                  <ArrowRight />
                </Link>
                <Link href="/resources/ercp-proposal-figures#download">
                  <Package />
                  Download details
                </Link>
              </div>
            </article>

            <article className="resource-card">
              <div className="resource-card__mark" aria-hidden="true">
                <Cube weight="duotone" />
              </div>
              <div className="resource-card__body">
                <span className="eyebrow">
                  Beta · Agent Plugin · 3D production · v{threeDModelingAgentPlugin.version}
                </span>
                <h3>3D Modeling Agent</h3>
                <p>
                  Plan, build, audit, validate, and package editable 3D assets with a route-aware
                  workflow for procedural DCC, CAD, generative, reconstruction, experimental, and
                  hybrid production.
                </p>
                <div className="resource-card__skills">
                  <span>Chooses the representation by required truth</span>
                  <span>Preserves authoritative sources and native editability</span>
                  <span>Validates geometry, appearance, motion, and delivery</span>
                </div>
              </div>
              <div className="resource-card__actions">
                <Link href="/resources/3d-modeling-agent">
                  Open beta guide
                  <ArrowRight />
                </Link>
                <Link href="/resources/3d-modeling-agent#download">
                  <Package />
                  Download details
                </Link>
              </div>
            </article>
          </div>
        </section>

        <section className="how-section">
          <span className="eyebrow">How this library works</span>
          <div className="how-grid">
            <article>
              <span>01</span>
              <h3>Pick the right tool</h3>
              <p>Start with the app or Codex resource that matches the work you need to do.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Follow the checked setup</h3>
              <p>Keep the download, installation steps, and everyday instructions together.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Learn in context</h3>
              <p>Use the interface images, prompts, and review notes when you need the full workflow.</p>
            </article>
          </div>
        </section>
      </main>
      <footer className="home-footer">
        <strong>Team App Library</strong>
        <span>
          Draft internal documentation · No installers, accounts, or publication implied.
        </span>
      </footer>
    </div>
  );
}
