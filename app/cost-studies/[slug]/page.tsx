import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowSquareOut,
  CalendarBlank,
  ChartBar,
  CheckCircle,
  Coins,
  DownloadSimple,
  FileCode,
  FilePdf,
  FileText,
  Gauge,
  Warning,
} from "@phosphor-icons/react/dist/ssr";
import {
  apiCostStudies,
  formatElapsedTime,
  formatUsd,
  getApiCostStudy,
  getCostStudyAssetPath,
} from "../../api-cost-studies-data";
import { SiteHeader } from "../../components/SiteHeader";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return apiCostStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getApiCostStudy(slug);

  if (!study) return {};

  return {
    title: `${study.title} | API Cost Studies`,
    description: `${study.dateLabel} comparison of ${study.summary.datapointCount} model settings for ${study.workflow.name} V${study.workflow.version}.`,
  };
}

function QaBadge({ passingOutputs }: { passingOutputs: number | null }) {
  if (passingOutputs === null) {
    return <span className="qa-badge qa-badge--unscored">Unscored</span>;
  }
  if (passingOutputs > 0) {
    return <span className="qa-badge qa-badge--pass">Passed</span>;
  }
  return <span className="qa-badge qa-badge--fail">0 pass</span>;
}

export default async function ApiCostStudyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const study = getApiCostStudy(slug);

  if (!study) notFound();

  const maxCost = Math.max(
    ...study.datapoints.map((datapoint) => datapoint.displayedEstimatedCostPerRunUsd),
  );
  const comparisonDownload = study.downloads[0];

  return (
    <div className="cost-study-detail-page">
      <SiteHeader compact backHref="/cost-studies" backLabel="All cost studies" />
      <main className="cost-study-detail-main">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/cost-studies">API Cost Studies</Link>
          <span>/</span>
          <strong>{study.workflow.name} V{study.workflow.version}</strong>
        </nav>

        <section className="cost-study-detail-hero">
          <div>
            <span className="eyebrow">{study.status} · {study.dateLabel}</span>
            <h1>{study.title}</h1>
            <p>{study.workflow.task}</p>
            <div className="cost-study-detail-actions">
              <a href={study.workflow.url} target="_blank" rel="noreferrer">
                Open {study.workflow.name} V{study.workflow.version}
                <ArrowSquareOut aria-hidden="true" />
              </a>
              <a
                href={getCostStudyAssetPath(study, comparisonDownload.file)}
                download
              >
                Download comparison PDF
                <DownloadSimple aria-hidden="true" />
              </a>
            </div>
          </div>
          <aside className="cost-study-hero-facts" aria-label="Study summary">
            <div>
              <CalendarBlank aria-hidden="true" />
              <span>Observation date</span>
              <strong>{study.date}</strong>
            </div>
            <div>
              <Coins aria-hidden="true" />
              <span>Monthly limit assumed</span>
              <strong>{study.measurement.monthlyCreditLimitPerUser} credits</strong>
            </div>
            <div>
              <ChartBar aria-hidden="true" />
              <span>Model settings</span>
              <strong>{study.summary.datapointCount}</strong>
            </div>
            <div>
              <Gauge aria-hidden="true" />
              <span>Price spread</span>
              <strong>{study.summary.priceRangeMultiple}×</strong>
            </div>
          </aside>
        </section>

        <section className="cost-study-disclosure" aria-label="Pricing basis">
          <Warning aria-hidden="true" />
          <div>
            <strong>Measured Workspace cost—not a token API invoice</strong>
            <p>{study.measurement.caveat}</p>
            <span>
              Observed {formatUsd(study.measurement.observedUsdPerCredit)} per credit · Pricing
              observed {study.measurement.pricingObservedOn}
            </span>
          </div>
        </section>

        <div className="cost-study-detail-layout">
          <aside className="resource-nav">
            <strong>On this page</strong>
            <a href="#findings">Main findings</a>
            <a href="#cost">Cost and capacity</a>
            <a href="#quality">Result quality</a>
            <a href="#method">Method and limits</a>
            <a href="#downloads">Downloads</a>
          </aside>

          <article className="cost-study-detail-content">
            <section id="findings" className="cost-study-section">
              <span className="section-index">01</span>
              <div>
                <span className="eyebrow">Leadership summary</span>
                <h2>Main findings</h2>
                <div className="finding-grid">
                  {study.findings.map((finding, index) => (
                    <article key={finding.title}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <h3>{finding.title}</h3>
                      <p>{finding.body}</p>
                    </article>
                  ))}
                </div>
                <div className="study-recommendation">
                  <CheckCircle weight="fill" aria-hidden="true" />
                  <div>
                    <strong>Recommended next step</strong>
                    <p>{study.recommendation}</p>
                  </div>
                </div>
              </div>
            </section>

            <section id="cost" className="cost-study-section">
              <span className="section-index">02</span>
              <div>
                <span className="eyebrow">Lowest to highest</span>
                <h2>Measured price and monthly capacity</h2>
                <p className="cost-study-intro">
                  Each bar shows the displayed estimated cost of the complete observed request.
                  Monthly runs are the whole number that fit within the assumed 500-credit limit.
                </p>
                <div className="cost-chart" role="img" aria-label="Model settings plotted from lowest to highest measured cost per run">
                  {study.datapoints.map((datapoint) => {
                    const barWidth =
                      (datapoint.displayedEstimatedCostPerRunUsd / maxCost) * 100;
                    return (
                      <div className="cost-chart__row" key={datapoint.id}>
                        <div className="cost-chart__label">
                          <strong>{datapoint.label}</strong>
                          <span>{datapoint.model}</span>
                        </div>
                        <div className="cost-chart__plot">
                          <span
                            className="cost-chart__bar"
                            style={{ "--bar-width": `${barWidth}%` } as CSSProperties}
                          >
                            {formatUsd(datapoint.displayedEstimatedCostPerRunUsd)}
                          </span>
                        </div>
                        <div className="cost-chart__capacity">
                          <strong>{datapoint.maximumRunsPerMonth}</strong>
                          <span>runs/month</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="cost-study-table-wrap">
                  <table className="cost-study-table">
                    <caption>Exact model settings, observed prices, and monthly capacity</caption>
                    <thead>
                      <tr>
                        <th scope="col">Setting</th>
                        <th scope="col">Exact model</th>
                        <th scope="col">Mode / thinking</th>
                        <th scope="col">Credits / run</th>
                        <th scope="col">Displayed cost / run</th>
                        <th scope="col">Share of 500</th>
                        <th scope="col">Max runs / month</th>
                      </tr>
                    </thead>
                    <tbody>
                      {study.datapoints.map((datapoint) => (
                        <tr key={datapoint.id}>
                          <th scope="row">{datapoint.label}</th>
                          <td>{datapoint.model}</td>
                          <td>{datapoint.mode} · {datapoint.thinkingEffort}</td>
                          <td>{datapoint.creditsPerRun}</td>
                          <td>{formatUsd(datapoint.displayedEstimatedCostPerRunUsd)}</td>
                          <td>{datapoint.shareOfMonthlyLimitPercent}%</td>
                          <td>{datapoint.maximumRunsPerMonth}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            <section id="quality" className="cost-study-section">
              <span className="section-index">03</span>
              <div>
                <span className="eyebrow">Observed outcomes</span>
                <h2>Cost did not predict a passing result.</h2>
                <div className="quality-list">
                  {study.datapoints.map((datapoint) => (
                    <article key={datapoint.id}>
                      <div className="quality-list__title">
                        <div>
                          <strong>{datapoint.label}</strong>
                          <span>
                            {datapoint.returnedOutputCount} returned {datapoint.returnedOutputCount === 1 ? "output" : "outputs"} · {formatElapsedTime(datapoint.elapsedSeconds)} · {datapoint.qaStatus}
                          </span>
                        </div>
                        <QaBadge passingOutputs={datapoint.qaPassingOutputs} />
                      </div>
                      <p>{datapoint.resultNote}</p>
                      <a href={getCostStudyAssetPath(study, datapoint.reportFile)} download>
                        Download setting PDF
                        <DownloadSimple aria-hidden="true" />
                      </a>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <section id="method" className="cost-study-section">
              <span className="section-index">04</span>
              <div>
                <span className="eyebrow">Repeatable record</span>
                <h2>Method and interpretation limits</h2>
                <div className="method-grid">
                  <article>
                    <h3>Method</h3>
                    <ol>
                      {study.methodology.map((item) => <li key={item}>{item}</li>)}
                    </ol>
                  </article>
                  <article>
                    <h3>Limitations</h3>
                    <ul>
                      {study.limitations.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </article>
                </div>
                <dl className="study-definition-list">
                  <div>
                    <dt>Fixed source</dt>
                    <dd>{study.sourceFiles[0].label} ({study.sourceFiles[0].file}).</dd>
                  </div>
                  <div>
                    <dt>Measurement system</dt>
                    <dd>{study.measurement.billingSystem}.</dd>
                  </div>
                  <div>
                    <dt>Price basis</dt>
                    <dd>{study.measurement.priceType}, observed {study.measurement.pricingObservedOn}.</dd>
                  </div>
                  <div>
                    <dt>Starting prompt</dt>
                    <dd>“{study.workflow.prompt}”</dd>
                  </div>
                  <div>
                    <dt>Cost calculation</dt>
                    <dd>{study.measurement.costRule}.</dd>
                  </div>
                  <div>
                    <dt>Credit calculation</dt>
                    <dd>{study.measurement.creditRule}.</dd>
                  </div>
                  <div>
                    <dt>Capacity calculation</dt>
                    <dd>{study.measurement.capacityRule}.</dd>
                  </div>
                </dl>
              </div>
            </section>

            <section id="downloads" className="cost-study-section">
                <span className="section-index">05</span>
              <div>
                <span className="eyebrow">Evidence package</span>
                <h2>Download the fixed inputs, reports, and structured data</h2>
                <p className="cost-study-intro">
                  The exact project brief and starting prompt are preserved for matched reruns.
                  The public archive contains calculated deltas and report evidence, but excludes
                  private cumulative-usage screenshots.
                </p>
                <div className="study-download-list">
                  {study.sourceFiles.map((sourceFile) => (
                    <article key={sourceFile.file}>
                      <FileText aria-hidden="true" />
                      <div>
                        <span>{sourceFile.kind} · Markdown · {sourceFile.size}</span>
                        <strong>{sourceFile.label}</strong>
                        <code>SHA-256 {sourceFile.sha256}</code>
                      </div>
                      <a href={getCostStudyAssetPath(study, sourceFile.file)} download>
                        Download project brief
                        <DownloadSimple aria-hidden="true" />
                      </a>
                    </article>
                  ))}
                  {study.downloads.map((download) => (
                    <article key={download.file}>
                      <FilePdf aria-hidden="true" />
                      <div>
                        <span>{download.kind} · {download.size}</span>
                        <strong>{download.label}</strong>
                        <code>SHA-256 {download.sha256}</code>
                      </div>
                      <a href={getCostStudyAssetPath(study, download.file)} download>
                        Download PDF
                        <DownloadSimple aria-hidden="true" />
                      </a>
                    </article>
                  ))}
                  <article>
                    <FileCode aria-hidden="true" />
                    <div>
                      <span>Machine-readable record · JSON</span>
                      <strong>Complete study data</strong>
                      <code>Schema {study.schemaVersion} · Study ID {study.studyId}</code>
                    </div>
                    <a href={getCostStudyAssetPath(study, "study-data.json")} download>
                      Download JSON
                      <DownloadSimple aria-hidden="true" />
                    </a>
                  </article>
                </div>
              </div>
            </section>
          </article>
        </div>
      </main>
      <footer className="home-footer">
        <strong>Team App Library · API Cost Studies</strong>
        <span>Draft internal evidence · One-run baseline, not a durable price guarantee.</span>
      </footer>
    </div>
  );
}
