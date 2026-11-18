import type { Metadata } from "next";
import Link from "next/link";
import { ArrowSquareOut, PlugsConnected } from "@phosphor-icons/react/dist/ssr";
import { SiteHeader } from "../../components/SiteHeader";
import { CodeBlock } from "../../components/CodeBlock";
import { orgChartStudio, orgChartOpenPrompt, orgChartMonthlyPrompt, orgChartNewerFeatures } from "../../orgchart-studio-data";

export const metadata: Metadata = {
  title: "ORNL - OrgChart Studio plugin | Team App Library",
  description: "Use Codex to install, launch and work with OrgChart Studio. Current plugin access, app versions, source review, monthly history, exports and backups.",
};

const asset = (path: string) => (process.env.NEXT_PUBLIC_SITE_BASE_PATH ?? "") + path;

export default function OrgChartStudioPluginPage() {
  return <div className="resource-page">
    <SiteHeader compact />
    <main className="resource-main">
      <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>Codex plugins</span><span>/</span><strong>{orgChartStudio.pluginName}</strong></nav>
      <section className="resource-hero">
        <div>
          <span className="eyebrow">Codex Plugin · Local desktop app</span>
          <h1>Install, open and work with OrgChart Studio.</h1>
          <p>Ask Codex to find your existing app or install it when missing, launch it on Mac or Windows, and help with chart updates, source reviews, history, imports, exports and backups. You review proposed content before applying it.</p>
          <div className="resource-actions">
            <a className="resource-action resource-action--primary" href={orgChartStudio.pluginDirectoryUrl} target="_blank" rel="noreferrer"><ArrowSquareOut aria-hidden="true" />Open plugin · ORNL workspace</a>
            <a className="resource-action" href="#start">Quick start</a>
            <Link className="resource-action" href="/apps/orgchart-studio/install">Manual installation</Link>
          </div>
        </div>
        <aside className="resource-hero__summary" aria-label="Plugin summary">
          <PlugsConnected weight="duotone" aria-hidden="true" />
          <span>Plugin v{orgChartStudio.pluginVersion} · Updated {orgChartStudio.pluginUpdatedOn}</span>
          <strong>{orgChartStudio.pluginAccess}</strong>
          <ul><li>Mac and Windows install-and-launch helpers</li><li>Reuses an existing working app</li><li>Scoped MCP tools and normal app controls</li><li>10 workflows for charts, history and exports</li></ul>
        </aside>
      </section>
      <div className="resource-layout">
        <aside className="resource-nav"><strong>On this page</strong><a href="#access">Plugin access</a><a href="#start">Install or launch</a><a href="#versions">App versions</a><a href="#work">Chart workflows</a><a href="#monthly">Monthly updates</a><a href="#guides">Guides and commands</a></aside>
        <article className="resource-content">
          <section id="access" className="resource-section"><span className="section-index">01</span><div>
            <span className="eyebrow">Access</span><h2>Available to anyone in ORNL with the link.</h2>
            <p>Link access is set to “Anyone in ORNL with the link.” Sign in to your ORNL workspace, then open the plugin link to install or enable it. It is unlisted, so use the direct link rather than relying on a directory search. Sharing verified {orgChartStudio.sharingVerifiedOn}.</p>
            <p>After enabling ORNL - OrgChart Studio, open a fresh Codex desktop chat and select it. Plugin access does not grant access to another person’s chart database; chart data stays local. Installing the plugin does not itself install the app.</p>
          </div></section>
          <section id="start" className="resource-section"><span className="section-index">02</span><div>
            <span className="eyebrow">Install or launch</span><h2>Let Codex open the app for you.</h2>
            <CodeBlock code={orgChartOpenPrompt} label="Open Studio; install only if missing" />
            <p>The plugin checks the native system and existing installation, reuses a healthy app, or runs its verified install-and-launch helper when setup is needed and authorized. It checks the app window and local service separately from MCP tool discovery. A Dock or taskbar icon is not required.</p>
            <p>This requires Codex running locally on the Mac or Windows desktop. A cloud chat cannot launch software on your computer. A first MCP registration may require reopening the AI host once; a missing tool is not a reason to reinstall an existing app.</p>
          </div></section>
          <section id="versions" className="resource-section"><span className="section-index">03</span><div>
            <span className="eyebrow">Verified {orgChartStudio.verifiedOn}</span><h2>Choose the installation that matches your app.</h2>
            <ul>
              <li><strong>Plugin v{orgChartStudio.pluginVersion}:</strong> the current companion instructions and install-and-launch helpers.</li>
              <li><strong>Public manual install v{orgChartStudio.publicAppVersion}:</strong> the one-command web/PDF route follows the application’s public main branch.</li>
              <li><strong>Verified plugin install v{orgChartStudio.verifiedInstallVersion}:</strong> fresh installs use the plugin’s tested source revision and checksums.</li>
              <li><strong>Newer local app v{orgChartStudio.localAppVersion}:</strong> available in existing local test copies; it is not installed by the public manual commands and is not a public release.</li>
            </ul>
            <p>For an open request, preserve the existing app version. Before an intentional update or repair, save a full backup and inspect the source version. Do not run the older public installer over a newer local or development copy just to launch it.</p>
          </div></section>
          <section id="work" className="resource-section"><span className="section-index">04</span><div>
            <span className="eyebrow">Chart workflows</span><h2>Use the tools your installed app supports.</h2>
            <p>The companion covers finding organizations and people, updating content, importing sources, reviewing hierarchy and layout, saving versions, exploring history, running monthly updates, exporting diagrams and backing up the library.</p>
            <p>Newer local v{orgChartStudio.localAppVersion} builds add:</p><ul>{orgChartNewerFeatures.map(feature=><li key={feature}>{feature}</li>)}</ul>
            <p>Use current approved sources for each requested comparison. Preserve chart identity, source notes, history and the official slide arrangement. Treat support roles separately from reporting lines. AI comparison, human review and Current designation are distinct.</p>
            <p>MCP calls honor pause, selected-chart scope and retained-source access. Content replacements are proposals for human review. Exports, full backups and decisions use the app’s normal controls where MCP has no matching tool. Chart data read by AI enters that conversation.</p>
          </div></section>
          <section id="monthly" className="resource-section"><span className="section-index">05</span><div>
            <span className="eyebrow">Monthly updates</span><h2>Keep the previous state before changes.</h2>
            <p>Use this prompt with an approved change list and an app version that supports monthly history. Review source evidence and proposed changes before choosing Apply or Current.</p>
            <CodeBlock code={orgChartMonthlyPrompt} label="Monthly change list and historical checkpoint" />
          </div></section>
          <section id="guides" className="resource-section"><span className="section-index">06</span><div>
            <span className="eyebrow">Guides and commands</span><h2>One-command manual setup for both systems.</h2>
            <p><a href={asset(orgChartStudio.guidePath)} target="_blank" rel="noreferrer">Open the Mac &amp; Windows quick-start PDF · November 17, 2026</a></p>
            <p><Link href="/apps/orgchart-studio/install">Install commands</Link> · <Link href="/apps/orgchart-studio/update">Update or repair</Link> · <Link href="/apps/orgchart-studio/run">Launch again</Link> · <Link href="/apps/orgchart-studio/ai-integration">MCP connection</Link></p>
            <p>Copy commands from the web page for a single complete line, or download the <a href={asset("/assets/downloads/orgchart-studio-install-macos.txt")}>Mac command</a> and <a href={asset("/assets/downloads/orgchart-studio-install-windows.txt")}>Windows command</a>. The PDF preserves the same copyable command text. Manual commands follow public main; the plugin keeps its verified source pin.</p>
          </div></section>
        </article>
      </div>
    </main>
  </div>;
}
