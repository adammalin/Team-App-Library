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
const guideDownload = `${siteBasePath}/assets/guides/${ercpProposalFiguresPlugin.guideFile}`;
const previewImage = `${siteBasePath}/assets/screenshots/ercp-proposal-figures-1.2.0-beta.5-preview.png`;

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
              or ECRP proposal, locks its science and sponsor-impact logic, compares proposal-native
              structures, creates two label-free brand-neutral raster candidates, inspects the actual
              images, and returns the strongest Figure 1 collaboration draft for scientist and
              graphic-designer review.
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
              <a className="resource-action" href={guideDownload} download>
                <FileText aria-hidden="true" />
                Download PDF guide
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
              <li>Uses recognizable proposal-specific visual elements</li>
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
            <a href="#guide">PDF guide</a>
            <a href="#download">Plugin download</a>
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
                    The package passed deterministic checks and all 18 fresh A/B comparison images
                    passed the raster-format gates. Compared with beta.4, beta.5 recovered the intended
                    DUNE transformation in 3/3 images instead of 1/3 and eliminated the repeated Lear
                    glyph failure from 3/3 images to 0/3. Neither version substituted generic future
                    imagery for the scientific payoff. Image generation remains variable, so a scientist
                    and graphic designer must verify and finish every result.
                  </p>
                </Callout>
                <Callout tone="success" title="Version 1.2.0-beta.5 visual-action and scientific-payoff update">
                  <p>
                    Every run now freezes a source-backed before state, scientific action, changed after
                    state, scientific payoff, and relationship topology before generation. Compact prompts
                    require the action and payoff to be visible instead of merely arranging the correct
                    objects, and QA rejects false sequence and generic future-benefit substitution. The
                    polished flat editorial style is preserved: modest diagrammatic depth is an advisory
                    redraw note, while strong perspective, extrusion, dimensional lighting, glow,
                    reflections, and cast shadows remain failures.
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
                  <li>Freeze one proposal-native before/action/after scientific claim and its correct relationship topology—not a methods inventory or Roadmap.</li>
                  <li>Turn the proposal’s important nouns into recognizable visual carriers and use color consistently.</li>
                  <li>Select a legacy layout family only after the proposal-native topology is fixed, then attach only the certified flat-style target for generation.</li>
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
                    alt="Label-free beta.5 scientific illustration showing detector signals transformed into a reconstructed event"
                  />
                  <figcaption>
                    Unedited beta.5 output from a cleared DUNE qualification benchmark. It shows
                    detector signals passing through a computational capability into a reconstructed
                    event. The image remains a collaboration draft requiring scientist and designer review.
                  </figcaption>
                </figure>
                <h3>Where it fits in proposal development</h3>
                <p className="resource-intro">
                  Use the plugin after the proposal has a substantive scientific story but before final
                  visual design. It turns source material into a reviewable visual hypothesis so the
                  proposal team can correct the science, emphasis, and funding logic first. A graphic
                  designer then redraws or polishes that agreed concept, adds controlled labels and
                  accessibility, and prepares the final proposal figure.
                </p>
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
                            <td>Source lock, before/action/after visual claim, relationship topology, science verification, and visual-role mapping.</td>
                          </tr>
                          <tr>
                            <th scope="row">Eight legacy layouts + one flat-style target</th>
                            <td>Planning-only scientific layout families plus the sole certified generation reference—not scientific content or branding.</td>
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
                      <li>The system, gap, capability, decisive relationship, endpoint, and DOE payoff remain recognizable</li>
                      <li>Color distinguishes proposal elements consistently while the output stays brand-neutral</li>
                      <li>Polished flat editorial hierarchy remains clear enough for a designer redraw</li>
                      <li>Modest nonfrontal views, shallow diagrammatic faces, flat offsets, and contained tonal variation are advisory; strong perspective, extrusion, realistic lighting, glow, reflections, and cast shadows remain failures</li>
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
                <Callout title="Brand-neutral by design">
                  <p>
                    Version 1.2.0-beta.5 uses Vision, Gap, Objectives, Approach, and Impact as
                    internal wireframe roles without forcing five literal regions or a fixed final-art
                    palette. The proposal and selected reference guide a cohesive palette, while no
                    logo, brand typography, branded geometry, or organization-recognition palette
                    is applied.
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
                    Version 1.2.0-beta.5 creates Figure 1 collaboration drafts only. It does not create a
                    proposal Roadmap, edit the source proposal, produce vector artwork, or deliver a
                    submission-ready final figure.
                  </p>
                </Callout>
              </div>
            </section>

            <section id="guide" className="resource-section">
              <span className="section-index">07</span>
              <div>
                <span className="eyebrow">Printable guide</span>
                <h2>Keep the complete install and usage workflow at hand.</h2>
                <p className="resource-intro">
                  The PDF guide includes the current version and checksum, the complete installation
                  prompt, the complete Figure 1 prompt, workflow expectations, quality gates,
                  troubleshooting, and the scientist-and-designer handoff checklist.
                </p>
                <div className="download-panel">
                  <FileText weight="duotone" aria-hidden="true" />
                  <div>
                    <strong>{ercpProposalFiguresPlugin.guideFile}</strong>
                    <span>Install and use guide · PDF · Version {ercpProposalFiguresPlugin.version}</span>
                  </div>
                  <a href={guideDownload} download>
                    <DownloadSimple aria-hidden="true" />
                    Download guide
                  </a>
                </div>
              </div>
            </section>

            <section id="download" className="resource-section">
              <span className="section-index">08</span>
              <div>
                <span className="eyebrow">Plugin download</span>
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
                  Figure 1 skill, eight legacy layout images, one certified flat-style target,
                  fictional qualification fixtures,
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
