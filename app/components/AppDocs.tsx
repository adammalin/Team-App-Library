import Image from "next/image";
import Link from "next/link";
import {
  AppleLogo,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  DownloadSimple,
  GithubLogo,
  HardDrives,
  Info,
  Monitor,
  ShieldCheck,
  Warning,
  WindowsLogo,
} from "@phosphor-icons/react/dist/ssr";
import {
  sectionLabels,
  sectionOrder,
  type AppEntry,
  type PlatformId,
  type SectionId,
} from "../app-data";
import { AppIcon } from "./AppIcon";
import { CodeBlock } from "./CodeBlock";
import { GuideCard } from "./GuideCard";
import { SiteHeader } from "./SiteHeader";

const pageAnchors: Record<SectionId, { id: string; label: string }[]> = {
  overview: [
    { id: "about", label: "About this app" },
    { id: "highlights", label: "What it does" },
    { id: "guide", label: "Printable guide" },
  ],
  install: [
    { id: "before", label: "Before you begin" },
    { id: "commands", label: "Install commands" },
    { id: "expect", label: "What setup does" },
  ],
  update: [
    { id: "before", label: "Before updating" },
    { id: "commands", label: "Update commands" },
    { id: "safety", label: "Update safety" },
  ],
  run: [
    { id: "launch", label: "Launch the app" },
    { id: "rerun", label: "Rerun or repair" },
  ],
  uninstall: [
    { id: "remove", label: "Remove the app" },
    { id: "data", label: "What stays behind" },
  ],
  usage: [
    { id: "workflow", label: "Working sequence" },
    { id: "screens", label: "Interface" },
    { id: "privacy", label: "Local data boundary" },
  ],
};

function PlatformIcon({ platform }: { platform: PlatformId }) {
  return platform === "mac" ? <AppleLogo weight="fill" /> : <WindowsLogo weight="fill" />;
}

function PlatformBadge({ platform }: { platform: PlatformId }) {
  return (
    <span className="platform-badge">
      <PlatformIcon platform={platform} />
      {platform === "mac" ? "macOS" : "Windows"}
    </span>
  );
}

function DocsSidebar({ app, section }: { app: AppEntry; section: SectionId }) {
  return (
    <aside className="docs-sidebar">
      <div className="docs-sidebar__product">
        <AppIcon app={app} size="small" />
        <span>
          <strong>{app.shortName}</strong>
          <small>Version {app.version}</small>
        </span>
      </div>
      <nav aria-label={app.name + " documentation"}>
        <span className="nav-label">Documentation</span>
        {sectionOrder.map((item) => (
          <Link
            className={item === section ? "is-active" : ""}
            href={
              item === "overview"
                ? "/apps/" + app.slug
                : "/apps/" + app.slug + "/" + item
            }
            aria-current={item === section ? "page" : undefined}
            key={item}
          >
            <span>{sectionLabels[item]}</span>
            <ArrowRight aria-hidden="true" />
          </Link>
        ))}
      </nav>
      <div className="docs-sidebar__resources">
        <span className="nav-label">Resources</span>
        <a href={app.guide.href} target="_blank" rel="noreferrer">
          <DownloadSimple />
          PDF guide
        </a>
        <a href={app.repository} target="_blank" rel="noreferrer">
          <GithubLogo />
          Source repository
        </a>
      </div>
    </aside>
  );
}

function OnThisPage({ section }: { section: SectionId }) {
  return (
    <aside className="on-this-page">
      <strong>On this page</strong>
      {pageAnchors[section].map((item) => (
        <a href={"#" + item.id} key={item.id}>
          {item.label}
        </a>
      ))}
    </aside>
  );
}

function Note({
  tone = "info",
  title,
  children,
}: {
  tone?: "info" | "warning" | "success";
  title: string;
  children: React.ReactNode;
}) {
  const Icon = tone === "warning" ? Warning : tone === "success" ? CheckCircle : Info;
  return (
    <div className={"note note--" + tone}>
      <Icon weight={tone === "success" ? "fill" : "regular"} />
      <div>
        <strong>{title}</strong>
        <p>{children}</p>
      </div>
    </div>
  );
}

function PlatformRequirements({ app }: { app: AppEntry }) {
  return (
    <div className="requirements-grid">
      {app.platforms.map((platform) => {
        const details = app.platformsInfo[platform];
        if (!details) return null;
        return (
          <section className="requirements-card" key={platform}>
            <h3>
              <PlatformIcon platform={platform} />
              {details.label}
            </h3>
            <ul>
              {details.requirements.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}

function PlatformCommands({
  app,
  kind,
}: {
  app: AppEntry;
  kind: "install" | "update" | "run";
}) {
  return (
    <div className="platform-stack">
      {app.platforms.map((platform) => {
        const details = app.platformsInfo[platform];
        const command = details?.[kind];
        if (!details || !command) return null;
        return (
          <section className="platform-section" key={platform}>
            <h2>
              <PlatformIcon platform={platform} />
              {details.label}
            </h2>
            <CodeBlock
              code={command}
              label={
                kind === "install"
                  ? "First install"
                  : kind === "update"
                    ? "Update or repair"
                    : "Launch"
              }
            />
            {kind === "run" && details.runNote ? (
              <p className="supporting-copy">{details.runNote}</p>
            ) : null}
          </section>
        );
      })}
    </div>
  );
}

function Overview({ app }: { app: AppEntry }) {
  return (
    <>
      <section id="about" className="lead-section">
        <span className="eyebrow">Local desktop workflow</span>
        <h1>{app.description}</h1>
        <p>{app.quickStart}</p>
        <div className="inline-badges" aria-label="Supported platforms">
          {app.platforms.map((platform) => (
            <PlatformBadge platform={platform} key={platform} />
          ))}
          <span className="version-badge">v{app.version}</span>
        </div>
      </section>

      <section id="highlights" className="content-section">
        <span className="section-index">01</span>
        <div>
          <span className="eyebrow">What it does</span>
          <h2>Built for a local, reviewable workflow.</h2>
          <ul className="check-list">
            {app.highlights.map((highlight) => (
              <li key={highlight}>
                <CheckCircle weight="fill" />
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {app.sourceNote ? (
        <Note title="Source note">{app.sourceNote}</Note>
      ) : null}

      <section id="guide">
        <GuideCard app={app} />
      </section>
    </>
  );
}

function Install({ app }: { app: AppEntry }) {
  return (
    <>
      <section id="before" className="lead-section">
        <span className="eyebrow">First-time setup</span>
        <h1>Install from source without a signed installer.</h1>
        <p>
          The checked-in scripts prepare a private runtime, install exact dependencies,
          build the Electron app, and start it as your normal user.
        </p>
      </section>
      <section className="content-block">
        <h2>Before you begin</h2>
        <PlatformRequirements app={app} />
      </section>
      {app.availabilityNote ? (
        <Note tone="warning" title="Platform availability">
          {app.availabilityNote}
        </Note>
      ) : null}
      <section id="commands" className="content-block">
        <span className="eyebrow">Copy the complete block</span>
        <PlatformCommands app={app} kind="install" />
      </section>
      <section id="expect" className="content-block">
        <h2>What to expect</h2>
        <div className="three-up">
          <article>
            <HardDrives />
            <h3>Private app folder</h3>
            <p>The application, runtime, and dependencies stay in your user folder.</p>
          </article>
          <article>
            <ShieldCheck />
            <h3>Verified setup</h3>
            <p>The scripts use pinned or exact inputs and run the app&apos;s own checks.</p>
          </article>
          <article>
            <Monitor />
            <h3>Electron desktop window</h3>
            <p>No DMG, PKG, MSI, EXE, or system-wide Node installation is required.</p>
          </article>
        </div>
      </section>
    </>
  );
}

function Update({ app }: { app: AppEntry }) {
  const backupFirst = app.slug === "orgchart-studio";
  const cleanCheckout = app.slug === "usa-map-studio";
  return (
    <>
      <section id="before" className="lead-section">
        <span className="eyebrow">Keep the source copy current</span>
        <h1>Close the app, protect your work, and rerun setup.</h1>
        <p>
          For these tools, the setup path doubles as the update and repair path.
        </p>
      </section>
      <section className="content-block">
        <h2>Before updating</h2>
        <ol className="numbered-list">
          {backupFirst ? <li>Create and verify a current OrgChart Studio backup.</li> : null}
          <li>Save any open project or finish the active review step.</li>
          <li>Quit the Electron app completely.</li>
          <li>Run the platform command below from a normal user account.</li>
        </ol>
      </section>
      <section id="commands" className="content-block">
        <PlatformCommands app={app} kind="update" />
      </section>
      <section id="safety">
        <Note tone="success" title="Update safety">
          {cleanCheckout
            ? "USA Map Studio safely fast-forwards a clean main checkout before it rebuilds. If the folder has local changes or is on another branch, the script skips the source update instead of overwriting them."
            : "The bootstrap recognizes the existing application folder, updates application source in place, preserves designated runtime or working folders, then rebuilds and tests the current copy."}
        </Note>
      </section>
    </>
  );
}

function Run({ app }: { app: AppEntry }) {
  return (
    <>
      <section id="launch" className="lead-section">
        <span className="eyebrow">Everyday launch</span>
        <h1>Open the same local Electron app again.</h1>
        <p>
          Run the checked-in start script. It uses the runtime and build prepared during setup.
        </p>
      </section>
      <section className="content-block">
        <PlatformCommands app={app} kind="run" />
      </section>
      <section id="rerun">
        <Note title="If the app no longer starts">
          Rerun the update command. The setup workflow verifies or repairs the private runtime,
          dependencies, build output, and desktop launch path.
        </Note>
      </section>
    </>
  );
}

function Uninstall({ app }: { app: AppEntry }) {
  return (
    <>
      <section id="remove" className="lead-section">
        <span className="eyebrow">Remove the source-based copy</span>
        <h1>Uninstall the app without deleting work by accident.</h1>
        <p>
          Removing the application folder deletes its private runtime and dependencies. Project
          files, exports, backups, and application data may live elsewhere.
        </p>
      </section>
      <Note tone="warning" title="Check your data first">
        Do not remove a working-data or backup folder just because you are removing the app.
        Verify saved projects and recovery copies before any data deletion.
      </Note>
      <div className="platform-stack">
        {app.platforms.map((platform) => {
          const details = app.platformsInfo[platform];
          if (!details) return null;
          return (
            <section className="platform-section uninstall-section" key={platform}>
              <h2>
                <PlatformIcon platform={platform} />
                {details.label}
              </h2>
              <ol className="numbered-list">
                {details.uninstall.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </section>
          );
        })}
      </div>
      <section id="data" className="data-notes">
        <h2>What stays behind</h2>
        {app.platforms.map((platform) => {
          const details = app.platformsInfo[platform];
          if (!details) return null;
          return (
            <article key={platform}>
              <PlatformBadge platform={platform} />
              <p>{details.dataNote}</p>
            </article>
          );
        })}
      </section>
    </>
  );
}

function Usage({ app }: { app: AppEntry }) {
  return (
    <>
      <section id="workflow" className="lead-section">
        <span className="eyebrow">Working sequence</span>
        <h1>Use the interface with the full workflow in view.</h1>
        <p>
          These steps summarize the checked-in guide and application documentation.
        </p>
      </section>
      <ol className="workflow-list">
        {app.usageSteps.map((step, index) => (
          <li key={step.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h2>{step.title}</h2>
              <p>{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
      <section id="screens" className="screenshot-section">
        <span className="eyebrow">Interface</span>
        <h2>What the app looks like</h2>
        <div className="screenshot-grid">
          {app.screenshots.map((shot) => (
            <figure key={shot.src}>
              <Image
                src={shot.src}
                alt={shot.alt}
                width={1800}
                height={shot.src.includes("badge-blur") ? 1013 : 1137}
                sizes="(max-width: 1100px) 100vw, 900px"
              />
              <figcaption>{shot.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>
      <section id="privacy">
        <Note tone="success" title="Local data boundary">
          {app.privacy}
        </Note>
      </section>
      <GuideCard app={app} />
    </>
  );
}

function SectionContent({ app, section }: { app: AppEntry; section: SectionId }) {
  if (section === "install") return <Install app={app} />;
  if (section === "update") return <Update app={app} />;
  if (section === "run") return <Run app={app} />;
  if (section === "uninstall") return <Uninstall app={app} />;
  if (section === "usage") return <Usage app={app} />;
  return <Overview app={app} />;
}

function SectionPager({ app, section }: { app: AppEntry; section: SectionId }) {
  const index = sectionOrder.indexOf(section);
  const previous = index > 0 ? sectionOrder[index - 1] : null;
  const next = index < sectionOrder.length - 1 ? sectionOrder[index + 1] : null;
  const hrefFor = (item: SectionId) =>
    item === "overview" ? "/apps/" + app.slug : "/apps/" + app.slug + "/" + item;

  return (
    <nav className="section-pager" aria-label="Documentation pages">
      {previous ? (
        <Link href={hrefFor(previous)}>
          <ArrowLeft />
          <span>
            <small>Previous</small>
            <strong>{sectionLabels[previous]}</strong>
          </span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={hrefFor(next)}>
          <span>
            <small>Next</small>
            <strong>{sectionLabels[next]}</strong>
          </span>
          <ArrowRight />
        </Link>
      ) : null}
    </nav>
  );
}

export function AppDocs({ app, section }: { app: AppEntry; section: SectionId }) {
  return (
    <div className="docs-page">
      <SiteHeader compact />
      <div className="docs-layout">
        <DocsSidebar app={app} section={section} />
        <main className="docs-main">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Apps</Link>
            <span>/</span>
            <Link href={"/apps/" + app.slug}>{app.shortName}</Link>
            <span>/</span>
            <strong>{sectionLabels[section]}</strong>
          </nav>
          <div className="product-heading">
            <AppIcon app={app} size="small" />
            <div>
              <span>{app.kicker}</span>
              <strong>{app.name}</strong>
            </div>
          </div>
          <SectionContent app={app} section={section} />
          <SectionPager app={app} section={section} />
          <footer className="docs-footer">
            Draft internal documentation · Verify app-owner and communications approval before
            team-wide release.
          </footer>
        </main>
        <OnThisPage section={section} />
      </div>
    </div>
  );
}
