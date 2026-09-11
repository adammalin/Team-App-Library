import ornlBrandAgentStudyJson from "../public/assets/cost-studies/2026-09-11-ornl-brand-agent-v2-3-2/study-data.json";

export type CostStudyDatapoint = {
  id: string;
  label: string;
  model: string;
  mode: string;
  thinkingEffort: string;
  creditsPerRun: number;
  displayedEstimatedCostPerRunUsd: number;
  shareOfMonthlyLimitPercent: number;
  maximumRunsPerMonth: number;
  runsWithHalfBudgetReserved: number;
  elapsedSeconds: number | null;
  returnedOutputCount: number;
  qaStatus: string;
  qaPassingOutputs: number | null;
  resultNote: string;
  reportFile: string;
};

export type CostStudyDownload = {
  label: string;
  kind: string;
  file: string;
  size: string;
  sha256: string;
};

export type CostStudySourceFile = {
  label: string;
  kind: string;
  file: string;
  size: string;
  sha256: string;
};

export type ApiCostStudy = {
  schemaVersion: string;
  studyId: string;
  slug: string;
  title: string;
  date: string;
  dateLabel: string;
  status: string;
  assetDirectory: string;
  workflow: {
    type: string;
    name: string;
    version: string;
    url: string;
    task: string;
    prompt: string;
  };
  sourceFiles: CostStudySourceFile[];
  measurement: {
    billingSystem: string;
    priceType: string;
    pricingObservedOn: string;
    currency: string;
    observedUsdPerCredit: number;
    monthlyCreditLimitPerUser: number;
    capacityRule: string;
    costRule: string;
    creditRule: string;
    caveat: string;
  };
  summary: {
    datapointCount: number;
    lowestCostPerRunUsd: number;
    highestCostPerRunUsd: number;
    priceRangeMultiple: number;
    highestMonthlyCapacity: number;
    lowestMonthlyCapacity: number;
    capacityReductionPercent: number;
    scoredSettings: number;
    passingSettings: number;
    unscoredSettings: number;
  };
  findings: Array<{
    title: string;
    body: string;
  }>;
  recommendation: string;
  datapoints: CostStudyDatapoint[];
  methodology: string[];
  limitations: string[];
  downloads: CostStudyDownload[];
};

const siteBasePath = process.env.NEXT_PUBLIC_SITE_BASE_PATH ?? "";
export const apiCostStudies = [ornlBrandAgentStudyJson as ApiCostStudy].sort((a, b) =>
  b.date.localeCompare(a.date),
);

export function getApiCostStudy(slug: string) {
  return apiCostStudies.find((study) => study.slug === slug);
}

export function getCostStudyAssetPath(study: ApiCostStudy, file: string) {
  return `${siteBasePath}${study.assetDirectory}/${file}`;
}

export function formatUsd(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
}

export function formatElapsedTime(seconds: number | null) {
  if (seconds === null) return "Not captured";
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return minutes > 0 ? `${minutes}m ${remainder}s` : `${remainder}s`;
}
