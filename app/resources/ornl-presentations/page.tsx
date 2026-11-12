import type { Metadata } from "next";
import Link from "next/link";
import { ArrowSquareOut, PresentationChart } from "@phosphor-icons/react/dist/ssr";
import { CodeBlock } from "../../components/CodeBlock";
import { SiteHeader } from "../../components/SiteHeader";
import {
  ornlPresentationsPlugin,
  presentationsCreatePrompt,
  presentationsRedesignPrompt,
} from "../../ornl-presentations-data";

export const metadata: Metadata = {
  title: "ORNL – Presentations | Team App Library",
  description:
    "Install the workspace ORNL – Presentations plugin and create, redesign, or repair editable ORNL PowerPoint slides.",
};

export default function OrnlPresentationsPage() {
  return (
    <div className="resource-page">
      <SiteHeader compact />
      <main className="resource-main">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span>Codex plugins</span>
          <span>/</span>
          <strong>{ornlPresentationsPlugin.name}</strong>
        </nav>

        <section className="resource-hero">
          <div>
            <span className="eyebrow">Codex Plugin · PowerPoint</span>
            <h1>Create and improve editable ORNL presentations.</h1>
            <p>
              Turn notes and source documents into new slides, substantially redesign an
              existing deck, or make focused text and layout repairs. Keep approved content,
              scientific meaning, the ORNL template, and editable PowerPoint elements at
              the center of the work.
            </p>
            <div className="resource-actions">
              <a
                className="resource-action resource-action--primary"
                href={ornlPresentationsPlugin.pluginDirectoryUrl}
                target="_blank"
                rel="noreferrer"
              >
                <ArrowSquareOut aria-hidden="true" />
                Open ORNL – Presentations plugin
              </a>
              <a className="resource-action" href="#start">Quick start</a>
            </div>
          </div>
          <aside className="resource-hero__summary" aria-label="Plugin summary">
            <PresentationChart weight="duotone" aria-hidden="true" />
            <span>Version {ornlPresentationsPlugin.version} · Listed November 12, 2026</span>
            <strong>New slides, deck redesign, and focused repairs.</strong>
            <ul>
              <li>Editable PowerPoint drafts</li>
              <li>ORNL template and custom colors</li>
              <li>Source-to-final slide review</li>
              <li>Workspace access through the plugin directory</li>
            </ul>
          </aside>
        </section>

        <div className="resource-layout">
          <aside className="resource-nav">
            <strong>On this page</strong>
            <a href="#install">Install and open</a>
            <a href="#start">Create a deck</a>
            <a href="#redesign">Redesign a deck</a>
            <a href="#repair">Make focused repairs</a>
          </aside>

          <article className="resource-content">
            <section id="install" className="resource-section">
              <span className="section-index">01</span>
              <div>
                <span className="eyebrow">Install and open</span>
                <h2>Add the workspace plugin in Codex.</h2>
                <ol>
                  <li>Open the plugin link above while signed in to the workspace where it is shared.</li>
                  <li>Install or enable ORNL – Presentations in the plugin directory.</li>
                  <li>Start a new Codex chat, select the plugin, and attach your source files.</li>
                </ol>
                <p>
                  If access is unavailable, check that you selected the correct workspace or
                  ask the plugin owner for access. Each person needs their own presentation
                  tools and file access; installing the plugin does not install PowerPoint.
                </p>
              </div>
            </section>

            <section id="start" className="resource-section">
              <span className="section-index">02</span>
              <div>
                <span className="eyebrow">Create a deck</span>
                <h2>Bring the sources, audience, and purpose.</h2>
                <p>Attach approved copy, notes, figures, and any required template. Replace the bracketed details before sending.</p>
                <CodeBlock code={presentationsCreatePrompt} label="Create an editable deck" />
              </div>
            </section>

            <section id="redesign" className="resource-section">
              <span className="section-index">03</span>
              <div>
                <span className="eyebrow">Redesign a deck</span>
                <h2>Attach the PowerPoint you want to improve.</h2>
                <p>Explain the audience, presentation length, and any content or design decisions that must be preserved.</p>
                <CodeBlock code={presentationsRedesignPrompt} label="Redesign an existing deck" />
              </div>
            </section>

            <section id="repair" className="resource-section">
              <span className="section-index">04</span>
              <div>
                <span className="eyebrow">Focused repairs</span>
                <h2>Name the slides and the change.</h2>
                <p>
                  For a narrow correction, specify the affected slides, font size, alignment,
                  wrapping, or spacing. Ask for <code>$edit-ornl-slide-typography</code> for
                  typography changes or <code>$review-and-repair-ornl-layout</code> for layout
                  repairs, and have Codex preserve the rest of the deck.
                </p>
                <p>
                  Review the saved PowerPoint before delivery. Content, scientific,
                  accessibility, and institutional approvals remain with the appropriate reviewers.
                </p>
              </div>
            </section>
          </article>
        </div>
      </main>
    </div>
  );
}
