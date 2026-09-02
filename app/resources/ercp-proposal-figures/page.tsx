import type { Metadata } from "next";
import Link from "next/link";
import {
  CheckCircle,
  DownloadSimple,
  FileText,
  HardDrives,
  ImageSquare,
  Package,
  Palette,
  ShieldCheck,
  Warning,
} from "@phosphor-icons/react/dist/ssr";
import { CodeBlock } from "../../components/CodeBlock";
import { SiteHeader } from "../../components/SiteHeader";
import {
  ercpInstallPrompt,
  ercpProposalFiguresPlugin,
  ercpStartPrompt,
} from "../../ercp-proposal-figures-data";

const description =
  "Install the beta DOE Proposal Figure 1 Agent Plugin for Codex and create source-grounded, label-free raster collaboration drafts from substantive ERCP or ECRP proposals.";

export const metadata: Metadata = {
  title: "DOE Proposal Figure 1 | Team App Library",
  description,
  openGraph: {
    title: "DOE Proposal Figure 1 | Team App Library",
    description,
    images: [],
  },
  twitter: {
    title: "DOE Proposal Figure 1 | Team App Library",
    description,
    images: [],
  },
};

const siteBasePath = process.env.NEXT_PUBLIC_SITE_BASE_PATH ?? "";
const pluginDownload = `${siteBasePath}/assets/downloads/${ercpProposalFiguresPlugin.downloadFile}`;
const previewImage = `${siteBasePath}/assets/screenshots/ercp-proposal-figures-beta-preview.png`;

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

export default function ErcpProposalFiguresPage() {
  return (
    <div className="resource-page">
      <SiteHeader compact />
      <main className="resource-main">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span>Codex resources</span>
          <span>/</span>
          <strong>DOE Proposal Figure 1</strong>
        </nav>

        <section className="resource-hero">
          <div>
            <span className="eyebrow">Beta · Codex Agent Plugin · Scientific Figure 1</span>
            <h1>Turn a proposal draft into a clearer “Why fund this?” visual argument.</h1>
            <p>
              This source-grounded Codex workflow reads a substantive DOE Office of Science ERCP
              or ECRP proposal, locks its science and sponsor-impact logic, creates two label-free
              raster candidates, inspects the actual images, and returns the strongest Figure 1
              collaboration draft for scientist and graphic-designer review.
            </p>
            <div className="resource-actions">
              <a className="resource-action resource-action--primary" href="#install">
                <Package aria-hidden="true" />
                Install with Codex
              </a>
              <a className="resource-action" href={pluginDownload} download>
                <DownloadSimple aria-hidden="true" />
                Manual ZIP download · {ercpProposalFiguresPlugin.downloadSize}
              </a>
            </div>
          </div>
          <aside className="resource-hero__summary" aria-label="Plugin summary">
            <ImageSquare weight="duotone" aria-hidden="true" />
            <span>{ercpProposalFiguresPlugin.status} · Version {ercpProposalFiguresPlugin.version}</span>
            <strong>One plugin. One evidence-gated Figure 1 workflow.</strong>
            <ul>
              <li>Reads the attached proposal in full</li>
              <li>Generates label-free raster PNG drafts</li>
              <li>Checks source, science, composition, and labels</li>
              <li>Archives prompts, candidates, and QA evidence</li>
            </ul>
          </aside>
        </section>

        <div className="resource-layout">
          <aside className="resource-nav">
            <strong>On this page</strong>
            <a href="#start">Before you begin</a>
            <a href="#install">Install the plugin</a>
            <a href="#workflow">How it works</a>
            <a href="#create">Create a Figure 1</a>
            <a href="#quality">Quality gates</a>
            <a href="#review">Review and limits</a>
            <a href="#download">Download details</a>
          </aside>

          <article className="resource-content">
            <section id="start" className="resource-section">
              <span className="section-index">01</span>
              <div>
                <span className="eyebrow">Before you begin</span>
                <h2>Bring the proposal; the plugin carries the repeatable workflow.</h2>
                <div className="resource-requirements">
                  <article>
                    <HardDrives aria-hidden="true" />
                    <h3>What you need</h3>
                    <ul>
                      <li>A current Codex desktop app or Codex CLI</li>
                      <li>Image generation available in the Codex environment</li>
                      <li>One substantive proposal in DOCX, PDF, Markdown, or text form</li>
                      <li>An optional existing Figure 1, Roadmap, sketch, or style reference</li>
                    </ul>
                  </article>
                  <article>
                    <ImageSquare aria-hidden="true" />
                    <h3>What it returns</h3>
                    <ul>
                      <li>One opaque 1536 × 1024 PNG collaboration draft</li>
                      <li>No labels, captions, paragraphs, legend, or embedded text</li>
                      <li>Color-role and remaining science-review notes in chat</li>
                      <li>A local evidence archive with prompts, candidates, and QA records</li>
                    </ul>
                  </article>
                </div>
                <Callout tone="warning" title="Use only material approved for the selected AI environment">
                  <p>
                    Do not process classified, CUI, export-controlled, proprietary, embargoed,
                    personal, or otherwise sensitive material unless both the environment and
                    organizational rules explicitly authorize it. The user remains responsible
                    for the information boundary before upload.
                  </p>
                </Callout>
                <Callout title="This is a beta collaboration tool">
                  <p>
                    The package passed deterministic checks and a live fictional-proposal
                    qualification, but image generation remains variable. A scientist and graphic
                    designer must verify and finish every result.
                  </p>
                </Callout>
              </div>
            </section>

            <section id="install" className="resource-section">
              <span className="section-index">02</span>
              <div>
                <span className="eyebrow">One-time setup</span>
                <h2>Paste one checked prompt to install the complete plugin.</h2>
                <ol className="numbered-list resource-steps">
                  <li>Open a Codex task and copy the complete installation prompt below.</li>
                  <li>Paste it without editing—the exact public URL and checksum are included.</li>
                  <li>Codex downloads, verifies, tests, installs, and enables the complete plugin.</li>
                  <li>After installation succeeds, open a fresh Codex task for proposal work.</li>
                </ol>
                <CodeBlock code={ercpInstallPrompt} label="Copy the complete installation prompt" />
                <p className="resource-tip">
                  If local IT blocks the download, Codex will stop and return the same direct link
                  for a manual download. Restart the desktop app only if the plugin is missing from
                  a new task or the Plugins Directory.
                </p>
              </div>
            </section>

            <section id="workflow" className="resource-section">
              <span className="section-index">03</span>
              <div>
                <span className="eyebrow">Inside the workflow</span>
                <h2>The proposal supplies the science; packaged gates control the translation.</h2>
                <ol className="numbered-list resource-steps">
                  <li>Read the proposal itself and freeze a source lock with exact supporting excerpts.</li>
                  <li>Reduce the case to one proposal-native funding argument—not a methods inventory or Roadmap.</li>
                  <li>Assign visible carriers for Vision, Gap, Objectives, Approach, and Impact.</li>
                  <li>Select a bundled visual family only after the proposal-native topology is fixed.</li>
                  <li>Generate two internal label-free PNG candidates and inspect the returned rasters.</li>
                  <li>Permit at most one focused repair, then return only the strongest usable draft.</li>
                </ol>
                <figure className="figure-preview">
                  {/* The preview is already a fixed, optimized release asset. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={previewImage}
                    width="1536"
                    height="1024"
                    alt="Label-free flat scientific illustration produced from the fictional FluxWeave proposal during beta qualification"
                  />
                  <figcaption>
                    Beta qualification example made from a fictional proposal. The visual uses no
                    client science, labels, legend, or submission copy.
                  </figcaption>
                </figure>
                <details className="plugin-inventory">
                  <summary>What’s included in the plugin?</summary>
                  <div className="plugin-inventory__content">
                    <p>
                      The download is self-contained: the skill installs with the visual references,
                      fictional test fixtures, analysis contracts, evaluation rubric, and validation
                      scripts needed to repeat the workflow.
                    </p>
                    <div className="plugin-inventory__table-wrap">
                      <table>
                        <thead>
                          <tr>
                            <th scope="col">Included</th>
                            <th scope="col">What it provides</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">Proposal-analysis contracts</th>
                            <td>Source lock, funding argument, science verification, and visual-role mapping.</td>
                          </tr>
                          <tr>
                            <th scope="row">Four style references</th>
                            <td>Approved flat scientific visual families used for style—not scientific content.</td>
                          </tr>
                          <tr>
                            <th scope="row">Image-execution rules</th>
                            <td>Raster-only generation, a closed no-text inventory, candidate comparison, and focused repair.</td>
                          </tr>
                          <tr>
                            <th scope="row">Frozen evaluation protocol</th>
                            <td>Source, science, sponsor-impact, composition, OCR, raster, and handoff checks.</td>
                          </tr>
                          <tr>
                            <th scope="row">Fictional fixtures and scripts</th>
                            <td>Repeatable qualification material, run initialization, prompt validation, raster inspection, and evidence archiving.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </details>
              </div>
            </section>

            <section id="create" className="resource-section resource-section--prompt">
              <span className="section-index">04</span>
              <div>
                <span className="eyebrow">Start a Figure 1</span>
                <h2>Attach the proposal, then paste this prompt.</h2>
                <p className="resource-intro">
                  The proposal is the authority for the science. A companion visual can establish
                  look and feel, but it cannot overwrite the proposal’s concepts or claims.
                </p>
                <CodeBlock code={ercpStartPrompt} label="Copy the Figure 1 prompt" />
              </div>
            </section>

            <section id="quality" className="resource-section">
              <span className="section-index">05</span>
              <div>
                <span className="eyebrow">Quality gates</span>
                <h2>The final draft must pass more than a style check.</h2>
                <div className="resource-requirements">
                  <article>
                    <FileText aria-hidden="true" />
                    <h3>Source and science</h3>
                    <ul>
                      <li>Every scientific carrier traces to the proposal</li>
                      <li>No generic substitute story overrides the source</li>
                      <li>The visual relationship supports the stated mechanism and endpoint</li>
                      <li>The DOE payoff is proposal-supported rather than invented</li>
                    </ul>
                  </article>
                  <article>
                    <Palette aria-hidden="true" />
                    <h3>Image and persuasion</h3>
                    <ul>
                      <li>Actual-raster inspection finds no meaningful text or label-like marks</li>
                      <li>One dominant reading path and one primary visual claim are visible</li>
                      <li>Vision, Gap, Objectives, Approach, and Impact remain distinguishable</li>
                      <li>The result is a PNG draft that a graphic designer can interpret and redraw</li>
                    </ul>
                  </article>
                </div>
                <Callout tone="success" title="Explanations stay out of the image">
                  <p>
                    Color roles, scientific caveats, and review notes appear in the Codex chat.
                    They are never embedded as labels, captions, paragraphs, legends, or title text
                    inside the generated figure.
                  </p>
                </Callout>
              </div>
            </section>

            <section id="review" className="resource-section">
              <span className="section-index">06</span>
              <div>
                <span className="eyebrow">Review and handoff</span>
                <h2>Treat every output as an interpretation—not the final scientific figure.</h2>
                <ul className="check-list resource-review-list">
                  <li>
                    <CheckCircle weight="fill" aria-hidden="true" />
                    The proposal author confirms that every depicted system, mechanism, relationship,
                    endpoint, and sponsor impact is scientifically faithful.
                  </li>
                  <li>
                    <CheckCircle weight="fill" aria-hidden="true" />
                    A graphic designer redraws or polishes the concept for final publication quality,
                    accessibility, and proposal placement.
                  </li>
                  <li>
                    <CheckCircle weight="fill" aria-hidden="true" />
                    Any labels, legend, or final explanatory copy are added later through controlled
                    design—not by the image model.
                  </li>
                  <li>
                    <CheckCircle weight="fill" aria-hidden="true" />
                    The team obtains appropriate content, science, accessibility, classification,
                    and brand reviews before submission or distribution.
                  </li>
                </ul>
                <Callout tone="warning" title="Current beta boundary">
                  <p>
                    Version 1.0.0 creates Figure 1 collaboration drafts only. It does not create a
                    proposal Roadmap, edit the source proposal, produce vector artwork, or deliver a
                    submission-ready final figure.
                  </p>
                </Callout>
              </div>
            </section>

            <section id="download" className="resource-section">
              <span className="section-index">07</span>
              <div>
                <span className="eyebrow">Download details</span>
                <h2>One verified ZIP contains the complete beta plugin.</h2>
                <div className="download-panel">
                  <Package weight="duotone" aria-hidden="true" />
                  <div>
                    <strong>{ercpProposalFiguresPlugin.downloadFile}</strong>
                    <span>
                      {ercpProposalFiguresPlugin.status} · Version {ercpProposalFiguresPlugin.version} · {ercpProposalFiguresPlugin.downloadSize}
                    </span>
                  </div>
                  <a href={pluginDownload} download>
                    <DownloadSimple aria-hidden="true" />
                    Download
                  </a>
                </div>
                <div className="checksum-block">
                  <strong>SHA-256</strong>
                  <code>{ercpProposalFiguresPlugin.sha256}</code>
                </div>
                <p className="resource-intro">
                  The archive includes both Agent Plugins 1.0 and Codex manifests, the complete
                  Figure 1 skill, four style-reference images, fictional qualification fixtures,
                  analysis and evaluation references, and deterministic validation scripts.
                </p>
              </div>
            </section>
          </article>
        </div>
      </main>
      <footer className="home-footer">
        <strong>DOE Proposal Figure 1 · Beta</strong>
        <span>Collaboration draft resource · Scientist and graphic-designer review required.</span>
      </footer>
    </div>
  );
}
