import Link from "next/link";
import { ArrowLeft, SquaresFour } from "@phosphor-icons/react/dist/ssr";

export function SiteHeader({ compact = false }: { compact?: boolean }) {
  return (
    <header className="site-header">
      <Link className="site-mark" href="/">
        <span className="site-mark__tile" aria-hidden="true">
          <SquaresFour weight="regular" />
        </span>
        <span>
          <strong>Team App Library</strong>
          <small>Source-based Electron tools</small>
        </span>
      </Link>
      {compact ? (
        <Link className="header-action" href="/">
          <ArrowLeft />
          All apps
        </Link>
      ) : (
        <span className="header-status">
          <i aria-hidden="true" />
          Local install guides
        </span>
      )}
    </header>
  );
}
