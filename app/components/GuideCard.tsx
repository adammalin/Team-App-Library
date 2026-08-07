import Image from "next/image";
import { ArrowSquareOut, DownloadSimple, FilePdf } from "@phosphor-icons/react/dist/ssr";
import type { AppEntry } from "../app-data";

export function GuideCard({ app }: { app: AppEntry }) {
  return (
    <aside className="guide-card" aria-labelledby="guide-card-title">
      <div className="guide-card__preview">
        <Image
          src={app.guide.preview}
          alt=""
          width={695}
          height={900}
          sizes="(max-width: 760px) 100vw, 260px"
        />
      </div>
      <div className="guide-card__content">
        <span className="eyebrow">
          <FilePdf />
          Printable guide
        </span>
        <h2 id="guide-card-title">{app.guide.label}</h2>
        <p>{app.guide.note}</p>
        <div className="guide-card__actions">
          <a href={app.guide.href} target="_blank" rel="noreferrer">
            <ArrowSquareOut />
            Open PDF
          </a>
          <a href={app.guide.href} download>
            <DownloadSimple />
            Download
          </a>
        </div>
        {app.additionalGuides?.map((guide) => (
          <a
            className="secondary-guide"
            href={guide.href}
            target="_blank"
            rel="noreferrer"
            key={guide.href}
          >
            <FilePdf />
            <span>
              <strong>{guide.label}</strong>
              <small>{guide.note}</small>
            </span>
          </a>
        ))}
      </div>
    </aside>
  );
}
