import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { apps, appsBySlug } from "../../app-data";
import { AppDocs } from "../../components/AppDocs";

export function generateStaticParams() {
  return apps.map((app) => ({ slug: app.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const app = appsBySlug[slug];
  if (!app) return {};
  return {
    title: app.name + " | Team App Library",
    description: app.description,
  };
}

export default async function AppOverviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const app = appsBySlug[slug];
  if (!app) notFound();
  return <AppDocs app={app} section="overview" />;
}
