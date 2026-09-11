import Link from "next/link";
import { ArrowLeft, ChartBar, SquaresFour } from "@phosphor-icons/react/dist/ssr";

export function SiteHeader({
  compact = false,
  backHref = "/",
  backLabel = "All tools",
}: {
  compact?: boolean;
  backHref?: string;
  backLabel?: string;
}) {
  return (
    <header className="site-header">
      <Link className="site-mark" href="/">
        <span className="site-mark__tile" aria-hidden="true">
          <SquaresFour weight="regular" />
        </span>
        <span>
          <strong>Team App Library</strong>
          <small>Apps, GPTs, plugins, and web tools</small>
        </span>
      </Link>
      {compact ? (
        <Link className="header-action" href={backHref}>
          <ArrowLeft />
          {backLabel}
        </Link>
      ) : (
        <div className="site-header__actions">
          <Link className="header-action" href="/cost-studies">
            <ChartBar aria-hidden="true" />
            API cost studies
          </Link>
          <span className="header-status">
            <i aria-hidden="true" />
            Searchable team tool catalog
          </span>
        </div>
      )}
    </header>
  );
}
