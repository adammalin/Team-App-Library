import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CalendarBlank,
  ChartBar,
  Database,
  FilePdf,
} from "@phosphor-icons/react/dist/ssr";
import { apiCostStudies, formatUsd } from "../api-cost-studies-data";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "API Cost Studies | Team App Library",
  description:
    "Dated, repeatable cost and capacity studies for team AI tools, Custom GPTs, and model-assisted workflows.",
};

export default function ApiCostStudiesPage() {
  const datapointCount = apiCostStudies.reduce(
    (total, study) => total + study.datapoints.length,
    0,
  );

  return (
    <div className="cost-studies-page">
      <SiteHeader compact />
      <main>
        <section className="cost-studies-hero">
          <div>
            <span className="eyebrow">Measured workflow evidence</span>
            <h1>API Cost Studies</h1>
            <p>
              Compare the cost, credit consumption, monthly capacity, and observed result quality
              of the AI workflows the team actually uses. Every entry keeps its date, tool
              version, model setting, budget assumption, and downloadable evidence together.
            </p>
          </div>
          <aside aria-label="Cost study archive summary">
            <ChartBar weight="duotone" aria-hidden="true" />
            <strong>{apiCostStudies.length}</strong>
            <span>{apiCostStudies.length === 1 ? "dated study" : "dated studies"}</span>
            <strong>{datapointCount}</strong>
            <span>model datapoints</span>
          </aside>
        </section>

        <section className="cost-study-principles" aria-label="Study standards">
          <article>
            <CalendarBlank aria-hidden="true" />
            <strong>Date every observation</strong>
            <span>Pricing and model behavior can change.</span>
          </article>
          <article>
            <Database aria-hidden="true" />
            <strong>Store deltas, not balances</strong>
            <span>Public entries omit cumulative account screenshots.</span>
          </article>
          <article>
            <FilePdf aria-hidden="true" />
            <strong>Keep the evidence downloadable</strong>
            <span>Comparison and per-setting reports stay with each study.</span>
          </article>
        </section>

        <section className="cost-study-index" aria-labelledby="cost-study-index-title">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Study archive</span>
              <h2 id="cost-study-index-title">Compare tools over time.</h2>
            </div>
            <p>
              Repeat a study later with the same task and add a new dated entry—the older baseline
              remains available for comparison.
            </p>
          </div>

          <div className="cost-study-card-grid">
            {apiCostStudies.map((study) => (
              <article className="cost-study-card" key={study.studyId}>
                <div className="cost-study-card__meta">
                  <span>{study.dateLabel}</span>
                  <span>{study.status}</span>
                </div>
                <div className="cost-study-card__body">
                  <span className="eyebrow">
                    {study.workflow.type} · v{study.workflow.version}
                  </span>
                  <h3>{study.title}</h3>
                  <p>{study.workflow.task}</p>
                  <dl>
                    <div>
                      <dt>Model settings</dt>
                      <dd>{study.summary.datapointCount}</dd>
                    </div>
                    <div>
                      <dt>Measured range</dt>
                      <dd>
                        {formatUsd(study.summary.lowestCostPerRunUsd)}–
                        {formatUsd(study.summary.highestCostPerRunUsd)}
                      </dd>
                    </div>
                    <div>
                      <dt>Monthly assumption</dt>
                      <dd>{study.measurement.monthlyCreditLimitPerUser} credits</dd>
                    </div>
                    <div>
                      <dt>Capacity range</dt>
                      <dd>
                        {study.summary.lowestMonthlyCapacity}–{study.summary.highestMonthlyCapacity} runs
                      </dd>
                    </div>
                  </dl>
                </div>
                <div className="cost-study-card__finding">
                  <strong>Primary finding</strong>
                  <p>{study.findings[1].title}</p>
                </div>
                <Link className="cost-study-card__action" href={`/cost-studies/${study.slug}`}>
                  Open the complete study
                  <ArrowRight aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
      <footer className="home-footer">
        <strong>Team App Library · API Cost Studies</strong>
        <span>Draft internal evidence · Recheck dated assumptions before operational use.</span>
      </footer>
    </div>
  );
}
