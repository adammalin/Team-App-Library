import type { Metadata } from "next";
import Link from "next/link";
import { Browser, PlugsConnected } from "@phosphor-icons/react/dist/ssr";
import { SiteHeader } from "../../components/SiteHeader";
import { orgChartStudio } from "../../orgchart-studio-data";

export const metadata: Metadata = {
  title: "OrgChart Studio browser app | Team App Library",
  description: "Use the latest OrgChart Studio in your browser. Open and save libraries, review AI changes, explore history, and enable its optional Codex companion plugin.",
};

export default function OrgChartBrowserPage() {
  return <div className="resource-page orgchart-workflow-page">
    <SiteHeader compact />
    <main className="resource-main">
      <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>Web apps</span><span>/</span><strong>OrgChart Studio</strong></nav>
      <section className="resource-hero">
        <div>
          <span className="eyebrow">Recommended · No app installation</span>
          <h1>Your org charts, in the browser.</h1>
          <p>Use the latest OrgChart Studio to update organizations, people and roles, review AI changes, explore historical checkpoints, and import or export your work. Start in Simple mode; switch to Advanced when you need detailed controls.</p>
          <div className="resource-actions">
            <a className="resource-action resource-action--primary" href={orgChartStudio.browserUrl} target="_blank" rel="noreferrer">Open OrgChart Studio</a>
            <Link className="resource-action" href="/apps/orgchart-studio">Desktop alternative</Link>
          </div>
        </div>
        <aside className="resource-hero__summary" aria-label="Browser app summary">
          <Browser weight="duotone" aria-hidden="true" />
          <span>Live web app · Updated {orgChartStudio.verifiedOn}</span>
          <strong>Start with the browser</strong>
          <ul><li>No OrgChart Studio account required</li><li>Simple and Advanced modes</li><li>Libraries remain under your control</li><li>Optional AI companion</li></ul>
        </aside>
      </section>

      <aside className="note orgchart-companion-notice" aria-labelledby="companion-title">
        <PlugsConnected aria-hidden="true" />
        <div>
          <h2 id="companion-title">This app has a companion plugin</h2>
          <p><strong>{orgChartStudio.pluginName} · v{orgChartStudio.pluginVersion}</strong> helps Codex open the browser app, prepare source-linked updates, review changes, preserve history, and help you save, import and export. The app also works without the plugin.</p>
          <div className="resource-actions">
            <a className="resource-action resource-action--primary" href={orgChartStudio.pluginDirectoryUrl} target="_blank" rel="noreferrer">Get the companion plugin</a>
            <Link className="resource-action" href={orgChartStudio.pluginGuidePath}>Plugin guide &amp; access</Link>
          </div>
          <p>Sign in to your ORNL workspace to enable the plugin. Plugin access does not include another user’s chart database.</p>
        </div>
      </aside>

      <div className="resource-layout">
        <nav className="resource-nav" aria-label="On this page"><strong>On this page</strong><a href="#start">Open your library</a><a href="#update">Update and review</a><a href="#save">Save and export</a><a href="#desktop">Desktop option</a></nav>
        <article className="resource-content">
          <section id="start" className="resource-section"><div>
            <span className="eyebrow">Get started</span><h2>Open your library, then find an organization.</h2>
            <p>Open the app and choose Open library for a full <code>.orgchart-workspace</code> file. To add charts from a backup to an existing library, use Backup &amp; restore → Merge backup. Keep your original file until you have verified the restored content.</p>
            <p>Search across organizations, names and roles. Use the flat list or organization tree to browse. Tips &amp; tour has separate Simple and Advanced walkthroughs.</p>
          </div></section>
          <section id="update" className="resource-section"><div>
            <span className="eyebrow">Update and review</span><h2>Keep a checkpoint before each update.</h2>
            <p>Use Monthly updates and History / Timeline to preserve the previous state and inspect who held a role at a given date. Review proposed AI changes in the app before applying them. Undo and redo are available for supported edits.</p>
            <p>The companion uses the page’s available agent tools and respects Pause, chart scope and retained-source access. Its official ORNL source is <a href="https://ornl.sharepoint.com/sites/orgchart" target="_blank" rel="noreferrer">the ORNL org-chart SharePoint site</a>; access requires your ORNL permissions. Structural validation, source comparison and the Current designation are separate checks.</p>
          </div></section>
          <section id="save" className="resource-section"><div>
            <span className="eyebrow">Keep your work</span><h2>Save your library file after changes.</h2>
            <p>Browser recovery protects local work, but you still need an independent saved library file. Use Prepare library download, download the prepared file, and confirm after checking it exists. A prepared download alone is not a completed save. Full working files preserve chart data, retained sources, history and resumable agent work.</p>
            <p>Where your browser supports linking a file, you can save directly to a chosen file. Otherwise download a new copy. Put it in your local OneDrive or Dropbox folder if desired; your sync client handles uploading. Studio does not confirm cloud synchronization.</p>
            <p>Files are unencrypted by default; you can enable encryption and supply a passphrase. Keep encrypted-file passphrases safe. Use Publish &amp; export for diagram outputs such as SVG, PNG, PDF, PowerPoint or CSV; those outputs do not replace the full library file.</p>
          </div></section>
          <section id="desktop" className="resource-section"><div>
            <span className="eyebrow">Optional desktop app</span><h2>Need a native Mac or Windows workflow?</h2>
            <p>The companion can also install and launch the desktop app when requested. Desktop uses a separate local MCP connection and its available features depend on the installed build. Public desktop installer pins have not changed with the browser update. Preserve a newer working installation and back up before updating.</p>
            <p><Link href="/apps/orgchart-studio/install">Desktop installation guide</Link> · <Link href={orgChartStudio.pluginGuidePath}>Companion setup and supported workflows</Link></p>
          </div></section>
        </article>
      </div>
    </main>
  </div>;
}
