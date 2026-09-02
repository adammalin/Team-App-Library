import type { Metadata } from "next";
import Link from "next/link";
import {
  CheckCircle,
  Cube,
  DownloadSimple,
  FileText,
  HardDrives,
  Package,
  Palette,
  ShieldCheck,
  Warning,
} from "@phosphor-icons/react/dist/ssr";
import { CodeBlock } from "../../components/CodeBlock";
import { SiteHeader } from "../../components/SiteHeader";
import {
  threeDAuditPrompt,
  threeDInstallPrompt,
  threeDModelingAgentPlugin,
  threeDStartPrompt,
} from "../../three-d-modeling-agent-data";

const description =
  "Install the 3D Modeling Agent Plugin for Codex and plan, build, audit, validate, and package editable 3D assets with representation-aware workflows.";

export const metadata: Metadata = {
  title: "3D Modeling Agent | Team App Library",
  description,
  openGraph: {
    title: "3D Modeling Agent | Team App Library",
    description,
    images: [],
  },
  twitter: {
    title: "3D Modeling Agent | Team App Library",
    description,
    images: [],
  },
};

const siteBasePath = process.env.NEXT_PUBLIC_SITE_BASE_PATH ?? "";
const pluginDownload = `${siteBasePath}/assets/downloads/${threeDModelingAgentPlugin.downloadFile}`;

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

export default function ThreeDModelingAgentPage() {
  return (
    <div className="resource-page">
      <SiteHeader compact />
      <main className="resource-main">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span>Codex resources</span>
          <span>/</span>
          <strong>3D Modeling Agent</strong>
        </nav>

        <section className="resource-hero">
          <div>
            <span className="eyebrow">Beta · Codex Agent Plugin · 3D production</span>
            <h1>Build 3D assets as editable systems—not one-off renders.</h1>
            <p>
              This route-aware Codex workflow turns a brief, image, drawing, measurement set,
              scan, or existing scene into an explicit asset contract. It then selects the right
              representation, preserves authoritative sources, guides construction, validates the
              real deliverable, and repairs the smallest source that can fix a defect.
            </p>
            <div className="resource-actions">
              <a className="resource-action resource-action--primary" href="#install">
                <Package aria-hidden="true" />
                Install with Codex
              </a>
              <a className="resource-action" href={pluginDownload} download>
                <DownloadSimple aria-hidden="true" />
                Manual ZIP download · {threeDModelingAgentPlugin.downloadSize}
              </a>
            </div>
          </div>
          <aside className="resource-hero__summary" aria-label="Plugin summary">
            <Cube weight="duotone" aria-hidden="true" />
            <span>
              {threeDModelingAgentPlugin.status} · Version {threeDModelingAgentPlugin.version}
            </span>
            <strong>One skill. Six representation-aware routes.</strong>
            <ul>
              <li>Procedural DCC and parametric CAD</li>
              <li>Generative and measured reconstruction</li>
              <li>Scientific and dimensional source locks</li>
              <li>Editable-source and delivery validation</li>
            </ul>
          </aside>
        </section>

        <div className="resource-layout">
          <aside className="resource-nav">
            <strong>On this page</strong>
            <a href="#start">Before you begin</a>
            <a href="#install">Install the plugin</a>
            <a href="#routes">Choose a route</a>
            <a href="#build">Build an asset</a>
            <a href="#audit">Audit an asset</a>
            <a href="#quality">Quality and limits</a>
            <a href="#download">Download details</a>
          </aside>

          <article className="resource-content">
            <section id="start" className="resource-section">
              <span className="section-index">01</span>
              <div>
                <span className="eyebrow">Before you begin</span>
                <h2>Bring the evidence and intended use—not a preselected modeling trick.</h2>
                <div className="resource-requirements">
                  <article>
                    <HardDrives aria-hidden="true" />
                    <h3>What you need</h3>
                    <ul>
                      <li>A current Codex desktop app or Codex CLI</li>
                      <li>A brief plus any approved images, drawings, data, scans, or scenes</li>
                      <li>The intended use, accuracy, editability, DCC, and delivery formats</li>
                      <li>An available Blender, Cinema 4D, CAD, or other backend when execution is requested</li>
                    </ul>
                  </article>
                  <article>
                    <Cube aria-hidden="true" />
                    <h3>What the workflow produces</h3>
                    <ul>
                      <li>An inspectable <code>asset.spec.json</code> and documented assumptions</li>
                      <li>Named semantic components and an editable native source scene</li>
                      <li>Requested interchange or runtime derivatives</li>
                      <li>Validation evidence with honest PASS, warning, HOLD, or FAIL status</li>
                    </ul>
                  </article>
                </div>
                <Callout title="The plugin controls the production method">
                  <p>
                    It is not a text-to-mesh model and it does not bundle Blender, Cinema 4D, a
                    CAD kernel, or a renderer. It coordinates whichever approved 3D tools are
                    available and keeps representation, authority, QA, and handoff consistent.
                  </p>
                </Callout>
                <Callout tone="warning" title="Use authoritative data for authoritative claims">
                  <p>
                    A reference image can support visual approximation, but it cannot establish
                    hidden engineering dimensions or scientific truth. Dimensionally constrained
                    and scientifically authoritative work requires approved source data and human
                    domain review.
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
                  <li>Codex verifies, tests, installs, and enables the complete personal plugin.</li>
                  <li>After installation succeeds, open a fresh Codex task for 3D work.</li>
                </ol>
                <CodeBlock code={threeDInstallPrompt} label="Copy the complete installation prompt" />
                <p className="resource-tip">
                  If local IT blocks the download, Codex will stop and return the same direct link
                  for a manual download. Restart the desktop app only if the plugin is missing from
                  a new task or the Plugins Directory.
                </p>
              </div>
            </section>

            <section id="routes" className="resource-section">
              <span className="section-index">03</span>
              <div>
                <span className="eyebrow">Representation first</span>
                <h2>The required truth determines the route.</h2>
                <div className="plugin-inventory">
                  <div className="plugin-inventory__content">
                    <div className="plugin-inventory__table-wrap">
                      <table>
                    <thead>
                      <tr>
                        <th scope="col">Route</th>
                        <th scope="col">Best fit</th>
                        <th scope="col">Source of truth</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">Deterministic procedural</th>
                        <td>Editable, repeatable, modular, mechanical, architectural, or scientific assets</td>
                        <td>Validated specification, generator, and semantic components</td>
                      </tr>
                      <tr>
                        <th scope="row">Parametric CAD</th>
                        <td>Dimensions, tolerances, construction history, fabrication, or B-rep delivery</td>
                        <td>Measurements, constraints, CAD program, and kernel result</td>
                      </tr>
                      <tr>
                        <th scope="row">Generative visual</th>
                        <td>Organic, decorative, irregular, or rapid concept assets judged mainly by appearance</td>
                        <td>Approved references plus the reviewed and cleaned working asset</td>
                      </tr>
                      <tr>
                        <th scope="row">Measured reconstruction</th>
                        <td>Real objects or scenes supported by calibrated photos, video, depth, or scans</td>
                        <td>Observations, calibration, scale reference, and reconstruction settings</td>
                      </tr>
                      <tr>
                        <th scope="row">Direct 3D experimental</th>
                        <td>Explicit experiments with small meshes or native 3D token generation</td>
                        <td>Experimental output plus independent validation</td>
                      </tr>
                      <tr>
                        <th scope="row">Hybrid</th>
                        <td>Assets whose visual, mechanical, scientific, or runtime portions need different truth models</td>
                        <td>Separate recorded authority for each portion</td>
                      </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <details className="plugin-inventory">
                  <summary>What’s included in the plugin?</summary>
                  <div className="plugin-inventory__content">
                    <p>
                      The download packages the production-control skill and its reusable planning,
                      validation, and workspace resources. Specific 3D backends remain separate so
                      the workflow can select the right tool instead of forcing every asset through one.
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
                            <th scope="row">Operating protocol</th>
                            <td>Artifact contract, source authority, source locks, staged construction, protection, and handoff rules.</td>
                          </tr>
                          <tr>
                            <th scope="row">Route playbooks</th>
                            <td>Decision guidance for DCC, CAD, generative, reconstruction, direct 3D, and hybrid production.</td>
                          </tr>
                          <tr>
                            <th scope="row">Asset specification</th>
                            <td>A JSON Schema and example for requirements, components, coordinates, deliverables, provenance, and review state.</td>
                          </tr>
                          <tr>
                            <th scope="row">Validation matrix</th>
                            <td>Universal and route-specific checks, evidence records, canonical views, and status rules.</td>
                          </tr>
                          <tr>
                            <th scope="row">Deterministic scripts</th>
                            <td>Safe workspace initialization, dependency-free specification checks, overwrite protection, and a seven-case self-test.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </details>
              </div>
            </section>

            <section id="build" className="resource-section resource-section--prompt">
              <span className="section-index">04</span>
              <div>
                <span className="eyebrow">Start a build</span>
                <h2>Attach the brief and references, then paste this prompt.</h2>
                <p className="resource-intro">
                  The prompt keeps supplied documents and images in their proper role as evidence,
                  preserves original scenes, and asks Codex to use the highest useful editable abstraction.
                </p>
                <CodeBlock code={threeDStartPrompt} label="Copy the 3D asset build prompt" />
              </div>
            </section>

            <section id="audit" className="resource-section resource-section--prompt">
              <span className="section-index">05</span>
              <div>
                <span className="eyebrow">Inspect before repair</span>
                <h2>Audit an existing 3D scene without changing it.</h2>
                <p className="resource-intro">
                  Use this read-only prompt to identify the source of truth, objective defects,
                  compatibility risks, and the smallest reliable repair before authorizing edits.
                </p>
                <CodeBlock code={threeDAuditPrompt} label="Copy the read-only 3D audit prompt" />
              </div>
            </section>

            <section id="quality" className="resource-section">
              <span className="section-index">06</span>
              <div>
                <span className="eyebrow">Quality and limits</span>
                <h2>A beautiful render is evidence—but it is not the whole asset.</h2>
                <div className="resource-requirements">
                  <article>
                    <FileText aria-hidden="true" />
                    <h3>Structural evidence</h3>
                    <ul>
                      <li>Correct units, axes, origin, hierarchy, names, and dependencies</li>
                      <li>Topology, manifold, normals, density, and component-count checks</li>
                      <li>Motion, articulation, clearance, collision, or simulation tests when relevant</li>
                      <li>Export, re-import, and target-application compatibility</li>
                    </ul>
                  </article>
                  <article>
                    <Palette aria-hidden="true" />
                    <h3>Visual and source evidence</h3>
                    <ul>
                      <li>Canonical orthographic and three-quarter renders</li>
                      <li>Silhouette, proportions, material roles, lighting, and critical close-ups</li>
                      <li>Dimensional or scientific comparison with authoritative data</li>
                      <li>Documented assumptions, provenance, warnings, and human approvals</li>
                    </ul>
                  </article>
                </div>
                <ul className="check-list resource-review-list">
                  <li>
                    <CheckCircle weight="fill" aria-hidden="true" />
                    Preserve editable native scenes as working sources; treat exports as derivatives unless the contract says otherwise.
                  </li>
                  <li>
                    <CheckCircle weight="fill" aria-hidden="true" />
                    Keep visual, mechanical, collision, scientific, and runtime geometry separate when their truth differs.
                  </li>
                  <li>
                    <CheckCircle weight="fill" aria-hidden="true" />
                    Put major experiments in separate variants and verify that protected originals remain unchanged.
                  </li>
                  <li>
                    <CheckCircle weight="fill" aria-hidden="true" />
                    Require human domain review before fabrication, scientific publication, safety-critical use, or external release.
                  </li>
                </ul>
                <Callout tone="warning" title="Current beta boundary">
                  <p>
                    Version {threeDModelingAgentPlugin.version} provides a tested production-control
                    framework, schemas, and deterministic validation scripts. It has not been
                    qualified against every DCC, renderer, CAD kernel, reconstruction system, or
                    generative 3D backend. Backend availability and licensing must be verified at use time.
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
                    <strong>{threeDModelingAgentPlugin.downloadFile}</strong>
                    <span>
                      {threeDModelingAgentPlugin.status} · Version {threeDModelingAgentPlugin.version} · {threeDModelingAgentPlugin.downloadSize}
                    </span>
                  </div>
                  <a href={pluginDownload} download>
                    <DownloadSimple aria-hidden="true" />
                    Download
                  </a>
                </div>
                <div className="checksum-block">
                  <strong>SHA-256</strong>
                  <code>{threeDModelingAgentPlugin.sha256}</code>
                </div>
                <p className="resource-intro">
                  The archive includes an Agent Plugins 1.0 manifest, the Codex manifest, the
                  complete <code>$3d-modeling-agent</code> skill, route and validation references,
                  an asset-spec JSON Schema and example, workspace initialization, specification
                  validation, and deterministic self-tests.
                </p>
              </div>
            </section>
          </article>
        </div>
      </main>
      <footer className="home-footer">
        <strong>3D Modeling Agent · Beta</strong>
        <span>Production-control resource · Domain and release review remain required.</span>
      </footer>
    </div>
  );
}
