import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  apps,
  appsBySlug,
  isSectionId,
  sectionLabels,
  sectionOrder,
} from "../../../app-data";
import { AppDocs } from "../../../components/AppDocs";

export function generateStaticParams() {
  return apps.flatMap((app) =>
    sectionOrder
      .filter((section) => section !== "overview")
      .map((section) => ({ slug: app.slug, section })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; section: string }>;
}): Promise<Metadata> {
  const { slug, section } = await params;
  const app = appsBySlug[slug];
  if (!app || !isSectionId(section)) return {};
  return {
    title: sectionLabels[section] + " " + app.name + " | Team App Library",
    description: app.description,
  };
}

export default async function AppSectionPage({
  params,
}: {
  params: Promise<{ slug: string; section: string }>;
}) {
  const { slug, section } = await params;
  const app = appsBySlug[slug];
  if (!app || !isSectionId(section) || section === "overview") notFound();
  return <AppDocs app={app} section={section} />;
}
