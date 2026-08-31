import type { Metadata } from "next";
import Link from "next/link";
import {
  CheckCircle,
  DownloadSimple,
  FilePpt,
  HardDrives,
  Package,
  ShieldCheck,
  Warning,
} from "@phosphor-icons/react/dist/ssr";
import { CodeBlock } from "../../components/CodeBlock";
import { SiteHeader } from "../../components/SiteHeader";
import {
  cleanUpDeckPrompt,
  createDeckPrompt,
  installPrompt,
  presentationPlugin,
} from "../../presentation-plugin-data";

const description =
  "Download and install the ORNL Presentation Designer plugin for Codex, then use guided prompts to create or safely clean up editable ORNL PowerPoint drafts.";

export const metadata: Metadata = {
  title: "ORNL Presentation Designer | Team App Library",
  description,
  openGraph: {
    title: "ORNL Presentation Designer | Team App Library",
    description,
    images: [],
  },
  twitter: {
    title: "ORNL Presentation Designer | Team App Library",
    description,
    images: [],
  },
};

const siteBasePath = process.env.NEXT_PUBLIC_SITE_BASE_PATH ?? "";
const pluginDownload = `${siteBasePath}/assets/downloads/${presentationPlugin.downloadFile}`;

function Callout({
  tone = "info",
  title,
  children,
}: {
  tone?: "info" | "warning" | "success";
  title: string;
  children: React.ReactNode;
}) {
  const Icon = tone === "warning" ? Warning : tone === "success" ? CheckCircle : ShieldCheck;
  return (
    <aside className={`note note--${tone}`}>
      <Icon weight={tone === "success" ? "fill" : "regular"} aria-hidden="true" />
      <div>
        <strong>{title}</strong>
        <div className="resource-callout-copy">{children}</div>
      </div>
    </aside>
  );
}

export default function OrnlPresentationDesignerPage() {
  return (
    <div className="resource-page">
      <SiteHeader compact />
      <main className="resource-main">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span>Codex resources</span>
          <span>/</span>
          <strong>ORNL Presentation Designer</strong>
        </nav>

        <section className="resource-hero">
          <div>
            <span className="eyebrow">Codex Agent Plugin · PowerPoint</span>
            <h1>Make stronger ORNL presentations without giving up editability or control.</h1>
            <p>
              One downloadable plugin gives Codex two separate, purpose-built workflows: create
              a new ORNL presentation from approved sources, or carefully clean up an existing
              PowerPoint while protecting its content and native structure.
            </p>
            <div className="resource-actions">
              <a className="resource-action resource-action--primary" href="#install">
                <Package aria-hidden="true" />
                Install with Codex
              </a>
              <a className="resource-action" href={pluginDownload} download>
                <DownloadSimple aria-hidden="true" />
                Manual ZIP download · {presentationPlugin.downloadSize}
              </a>
            </div>
          </div>
          <aside className="resource-hero__summary" aria-label="Plugin summary">
            <Package weight="duotone" aria-hidden="true" />
            <span>Version {presentationPlugin.version}</span>
            <strong>One plugin. Two presentation skills.</strong>
            <ul>
              <li>Create new ORNL decks</li>
              <li>Clean up existing decks</li>
              <li>Keep PowerPoint content editable</li>
              <li>Require human review before release</li>
            </ul>
          </aside>
        </section>

        <div className="resource-layout">
          <aside className="resource-nav">
            <strong>On this page</strong>
            <a href="#start">Before you begin</a>
            <a href="#install">Install the plugin</a>
            <a href="#choose">Choose a workflow</a>
            <a href="#create">Create a new deck</a>
            <a href="#cleanup">Clean up a deck</a>
            <a href="#review">Review and safety</a>
            <a href="#download">Download details</a>
          </aside>

          <article className="resource-content">
            <section id="start" className="resource-section">
              <span className="section-index">01</span>
              <div>
                <span className="eyebrow">Before you begin</span>
                <h2>Use approved material and plan for a final human review.</h2>
                <div className="resource-requirements">
                  <article>
                    <HardDrives aria-hidden="true" />
                    <h3>What you need</h3>
                    <ul>
                      <li>A current Codex desktop app or Codex CLI</li>
                      <li>One-time access to the Team Apps download link</li>
                      <li>Approved source files or an existing PPTX</li>
                      <li>Microsoft PowerPoint when available for final native QA</li>
                    </ul>
                  </article>
                  <article>
                    <ShieldCheck aria-hidden="true" />
                    <h3>What stays under your control</h3>
                    <ul>
                      <li>Source files remain unchanged</li>
                      <li>Drafts save only to the local path you name</li>
                      <li>No publishing, emailing, or sharing is authorized</li>
                      <li>App connections are optional, not required for the core workflow</li>
                    </ul>
                  </article>
                </div>
                <Callout tone="warning" title="Check the information boundary first">
                  <p>
                    Use only information approved for the current AI environment. Do not process
                    classified, CUI, export-controlled, proprietary, embargoed, personal, or
                    otherwise sensitive material unless both the environment and organizational
                    rules explicitly authorize it.
                  </p>
                </Callout>
              </div>
            </section>

            <section id="install" className="resource-section">
              <span className="section-index">02</span>
              <div>
                <span className="eyebrow">One-time setup</span>
                <h2>Paste one prompt. Codex handles the download and installation.</h2>
                <ol className="numbered-list resource-steps">
                  <li>Open a Codex task and copy the complete installation prompt below.</li>
                  <li>Paste it without editing—the verified download link and checksum are included.</li>
                  <li>Codex downloads the ZIP, verifies it, and installs the complete plugin.</li>
                  <li>Codex confirms both skills, their references and assets, and the installed version.</li>
                  <li>After installation succeeds, open a fresh Codex task for presentation work.</li>
                </ol>
                <CodeBlock code={installPrompt} label="Copy the complete installation prompt" />
                <p className="resource-tip">
                  If local IT blocks the download, Codex will stop and return the same direct link
                  for a manual download. Restart the desktop app only if the plugin is missing from
                  a new task or the Plugins Directory.
                </p>
              </div>
            </section>

            <section id="choose" className="resource-section">
              <span className="section-index">03</span>
              <div>
                <span className="eyebrow">Choose the right workflow</span>
                <h2>Creation and cleanup are intentionally separate skills.</h2>
                <div className="workflow-choice-grid">
                  <a href="#create">
                    <FilePpt weight="duotone" aria-hidden="true" />
                    <span>New presentation</span>
                    <strong>Start from approved sources</strong>
                    <p>
                      Use for a new deck, a source-to-deck build, or an explicitly authorized
                      narrative or template rebuild.
                    </p>
                    <code>$create-ornl-presentations</code>
                  </a>
                  <a href="#cleanup">
                    <FilePpt weight="duotone" aria-hidden="true" />
                    <span>Existing presentation</span>
                    <strong>Improve the deck without changing its meaning</strong>
                    <p>
                      Use when an existing PPTX should be cleaner, more consistent, easier to
                      read, or more professional.
                    </p>
                    <code>$clean-up-ornl-presentations</code>
                  </a>
                </div>
                <Callout title="Do not combine the workflows by default">
                  <p>
                    Use one skill for each request. A cleanup should become a structural rebuild
                    only when the audit finds that rescue is necessary and the requester
                    explicitly authorizes it.
                  </p>
                </Callout>
              </div>
            </section>

            <section id="create" className="resource-section resource-section--prompt">
              <span className="section-index">04</span>
              <div>
                <span className="eyebrow">Prompt A · New deck</span>
                <h2>Create a new editable ORNL presentation.</h2>
                <p className="resource-intro">
                  Replace every bracketed field that applies, delete unused bracketed lines, and
                  paste the complete prompt into a fresh task after installing the plugin.
                </p>
                <CodeBlock code={createDeckPrompt} label="Copy the new-presentation prompt" />
              </div>
            </section>

            <section id="cleanup" className="resource-section resource-section--prompt">
              <span className="section-index">05</span>
              <div>
                <span className="eyebrow">Prompt B · Existing deck</span>
                <h2>Clean up a PowerPoint with a preservation-first process.</h2>
                <p className="resource-intro">
                  Name any content or template changes explicitly. If none are authorized, enter
                  <strong> NONE</strong> and <strong>NO</strong> so the preservation boundary is
                  unambiguous.
                </p>
                <CodeBlock code={cleanUpDeckPrompt} label="Copy the cleanup prompt" />
                <Callout tone="warning" title="A cleanup can correctly return HOLD">
                  <p>
                    PowerPoint files can contain classification labels, custom XML, comments,
                    notes, themes, hyperlinks, media relationships, animations, and timing that
                    some editing pipelines cannot safely preserve. If the no-edit canary changes
                    protected structure, the skill stops and returns a precise report plus a
                    manual PowerPoint edit specification. That is a safety result—not an
                    installation failure.
                  </p>
                </Callout>
              </div>
            </section>

            <section id="review" className="resource-section">
              <span className="section-index">06</span>
              <div>
                <span className="eyebrow">Review and handoff</span>
                <h2>Treat every output as a draft pending ORNL review.</h2>
                <ul className="check-list resource-review-list">
                  <li>
                    <CheckCircle weight="fill" aria-hidden="true" />
                    Confirm wording, numbers, citations, source permissions, and technical meaning.
                  </li>
                  <li>
                    <CheckCircle weight="fill" aria-hidden="true" />
                    Open the exact final PPTX in Microsoft PowerPoint when available.
                  </li>
                  <li>
                    <CheckCircle weight="fill" aria-hidden="true" />
                    Check slide titles, alt text, reading order, contrast, clipping, overflow, and
                    native editability.
                  </li>
                  <li>
                    <CheckCircle weight="fill" aria-hidden="true" />
                    Obtain the appropriate ORNL content, accessibility, classification, and brand
                    approvals before distribution.
                  </li>
                </ul>
                <Callout tone="success" title="Core work is self-contained">
                  <p>
                    The plugin packages its ORNL template, brand references, layout catalog,
                    design guidance, validation resources, and both skills. Web research, external
                    images, cloud storage, and connected apps are optional and should be used only
                    when the request requires them and local IT policy permits them.
                  </p>
                </Callout>
              </div>
            </section>

            <section id="download" className="resource-section">
              <span className="section-index">07</span>
              <div>
                <span className="eyebrow">Download details</span>
                <h2>One verified ZIP contains the complete plugin.</h2>
                <div className="download-panel">
                  <Package weight="duotone" aria-hidden="true" />
                  <div>
                    <strong>{presentationPlugin.downloadFile}</strong>
                    <span>Version {presentationPlugin.version} · {presentationPlugin.downloadSize}</span>
                  </div>
                  <a href={pluginDownload} download>
                    <DownloadSimple aria-hidden="true" />
                    Download
                  </a>
                </div>
                <div className="checksum-block">
                  <strong>SHA-256</strong>
                  <code>{presentationPlugin.sha256}</code>
                </div>
                <p className="resource-intro">
                  The archive includes the official 16:9 ORNL PowerPoint template, packaged brand
                  guides, reference previews, assertion-evidence examples, validation tools, and
                  both presentation skills. The installation prompt above verifies the same
                  checksum before Codex installs it.
                </p>
              </div>
            </section>
          </article>
        </div>
      </main>
      <footer className="home-footer">
        <strong>ORNL Presentation Designer</strong>
        <span>Draft internal resource · Review and approval remain required before release.</span>
      </footer>
    </div>
  );
}
