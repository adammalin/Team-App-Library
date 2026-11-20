import type { Metadata } from "next";
import Link from "next/link";
import { PlugsConnected } from "@phosphor-icons/react/dist/ssr";
import { SiteHeader } from "../../components/SiteHeader";
import { CodeBlock } from "../../components/CodeBlock";
import { orgChartStudio, orgChartOpenPrompt, orgChartDesktopPrompt, orgChartMonthlyPrompt, orgChartNewerFeatures } from "../../orgchart-studio-data";

export const metadata: Metadata = {
  title: "ORNL - OrgChart Studio plugin | Team App Library",
  description: "Use the browser-first Codex companion for OrgChart Studio: source-linked updates, AI review, monthly history, saving, imports and exports, plus optional Mac and Windows setup.",
};

const asset = (path: string) => (process.env.NEXT_PUBLIC_SITE_BASE_PATH ?? "") + path;

export default function OrgChartStudioPluginPage() {
  return <div className="resource-page orgchart-workflow-page">
    <SiteHeader compact />
    <main className="resource-main">
      <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>Codex plugins</span><span>/</span><strong>{orgChartStudio.pluginName}</strong></nav>
      <section className="resource-hero">
        <div>
          <span className="eyebrow">Codex companion · Browser first</span>
          <h1>Work on org charts with Codex.</h1>
          <p>The companion opens the latest browser app, prepares source-linked chart changes for review, preserves monthly history, and helps you save, import and export. Mac and Windows desktop setup remains available when you request it.</p>
          <div className="resource-actions">
            <a className="resource-action resource-action--primary" href={orgChartStudio.pluginDirectoryUrl} target="_blank" rel="noreferrer">Get the companion plugin</a>
            <a className="resource-action" href={orgChartStudio.browserUrl} target="_blank" rel="noreferrer">Open browser app</a>
            <Link className="resource-action" href={orgChartStudio.browserGuidePath}>Browser guide</Link>
          </div>
        </div>
        <aside className="resource-hero__summary" aria-label="Plugin summary">
          <PlugsConnected weight="duotone" aria-hidden="true" />
          <span>Plugin v{orgChartStudio.pluginVersion} · Updated {orgChartStudio.pluginUpdatedOn}</span>
          <strong>{orgChartStudio.pluginAccess}</strong>
          <ul><li>Browser is the default</li><li>Optional Mac and Windows desktop</li><li>Scoped tools and visible change review</li><li>10 workflows for charts, history and exports</li></ul>
        </aside>
      </section>
      <div className="resource-layout">
        <nav className="resource-nav" aria-label="On this page"><strong>On this page</strong><a href="#access">Plugin access</a><a href="#start">Open the browser app</a><a href="#versions">App versions</a><a href="#work">Chart workflows</a><a href="#monthly">Monthly updates</a><a href="#guides">Desktop alternative</a></nav>
        <article className="resource-content">
          <section id="access" className="resource-section"><div>
            <span className="eyebrow">Access</span><h2>Available to anyone in ORNL with the link.</h2>
            <p>Sign in to your ORNL workspace, then open the plugin link to install or enable it. It is unlisted, so use the direct link. Sharing verified {orgChartStudio.sharingVerifiedOn}.</p>
            <p>After enabling the shared companion, open a fresh Codex chat and select it. A separate older local pilot does not automatically update to this shared version. Plugin access does not include anyone else’s chart database; open your own library in the app.</p>
          </div></section>
          <section id="start" className="resource-section"><div>
            <span className="eyebrow">Browser first</span><h2>Let Codex open the browser app.</h2>
            <CodeBlock code={orgChartOpenPrompt} label="Open the latest browser app" />
            <p>No desktop app installation is needed. Codex checks the page’s available agent tools and the active library before making changes. Use Browser AI control to inspect connection status, reconnect tools, pause access or choose chart scope. If the host cannot expose page tools, the companion can help through normal app controls and explain the limitation.</p>
            <p><Link href={orgChartStudio.browserGuidePath}>Read the browser guide</Link> for opening libraries, saving downloads, the Simple and Advanced tutorials, and history.</p>
          </div></section>
          <section id="versions" className="resource-section"><div>
            <span className="eyebrow">Verified {orgChartStudio.verifiedOn}</span><h2>The latest workflow is on the web.</h2>
            <ul>
              <li><strong>Live browser app:</strong> current published build {orgChartStudio.browserBuild}, with the agent-workflow improvements and Simple / Advanced modes.</li>
              <li><strong>Plugin v{orgChartStudio.pluginVersion}:</strong> browser-first routing with optional desktop install and launch helpers.</li>
              <li><strong>Public manual install v{orgChartStudio.publicAppVersion}:</strong> desktop commands and the dated PDF follow public main.</li>
              <li><strong>Verified plugin install v{orgChartStudio.verifiedInstallVersion}:</strong> the desktop fresh-install pin is unchanged. Newer candidate source is not a public release or an installer update.</li>
            </ul>
            <p>Use the tools actually exposed by the running version. Preserve a newer working desktop copy; opening an app is not a reason to reinstall or downgrade it. Save a full library file before intentional updates.</p>
          </div></section>
          <section id="work" className="resource-section"><div>
            <span className="eyebrow">Chart workflows</span><h2>Update, review and keep your work.</h2>
            <ul>{orgChartNewerFeatures.map(feature => <li key={feature}>{feature}</li>)}</ul>
            <p>The companion helps with field-level edits, exact reviewed change sets, resumable validation batches, source imports, diagram exports and full working-library saves. Review the Before and After values in Studio before applying a prepared set. A structural check alone does not verify the source content.</p>
            <p>The official source of truth is <a href="https://ornl.sharepoint.com/sites/orgchart" target="_blank" rel="noreferrer">the ORNL org-chart SharePoint site</a> and its current linked original charts. Use your ORNL access to compare actual current sources; a cached file does not prove currentness. Preserve the official slide arrangement and Matrix Support separately from reporting lines. AI comparison, human review and Current designation are separate.</p>
            <p>Agent tools honor Pause, chart scope and retained-source access. Chart content read by AI enters that conversation. In the browser, preparing a download is not a completed save: download the full working file and verify it. OneDrive or Dropbox synchronization is handled by your own sync client.</p>
          </div></section>
          <section id="monthly" className="resource-section"><div>
            <span className="eyebrow">Monthly updates</span><h2>Keep the previous state before changes.</h2>
            <p>Start with the approved change list, preserve a historical checkpoint, compare against the current source, review changes, then save the full working library. Use History / Timeline to revisit earlier states.</p>
            <CodeBlock code={orgChartMonthlyPrompt} label="Monthly change list and historical checkpoint" />
          </div></section>
          <section id="guides" className="resource-section"><div>
            <span className="eyebrow">Optional desktop alternative</span><h2>Install or launch on Mac and Windows.</h2>
            <CodeBlock code={orgChartDesktopPrompt} label="Explicitly request the desktop app" />
            <p>Native installation and launch require Codex with local execution on that Mac or Windows computer. The companion reuses a working installation, checks the local service and discovers its MCP tools. A Dock or taskbar icon is not required.</p>
            <p><Link href="/apps/orgchart-studio/install">Desktop install commands</Link> · <Link href="/apps/orgchart-studio/update">Update or repair</Link> · <Link href="/apps/orgchart-studio/run">Launch again</Link> · <Link href="/apps/orgchart-studio/ai-integration">Desktop MCP connection</Link></p>
            <p><a href={asset(orgChartStudio.guidePath)} target="_blank" rel="noreferrer">Mac &amp; Windows desktop quick-start PDF · November 17, 2026</a>. The dated PDF covers desktop setup. Copy the complete commands from the web instructions or download the <a href={asset("/assets/downloads/orgchart-studio-install-macos.txt")}>Mac command</a> and <a href={asset("/assets/downloads/orgchart-studio-install-windows.txt")}>Windows command</a>. Manual commands follow public main; the plugin retains its verified desktop source pin.</p>
          </div></section>
        </article>
      </div>
    </main>
  </div>;
}
