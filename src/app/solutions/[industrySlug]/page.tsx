import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { IndustryDetailPage } from '../../../views/IndustryDetailPage';
import { SOLUTIONS_DATA } from '../../../data/solutions';
import { SITE_CONFIG } from '../../../config/siteConfig';

export async function generateStaticParams() {
  return SOLUTIONS_DATA.map((sol) => ({
    industrySlug: sol.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ industrySlug: string }>;
}): Promise<Metadata> {
  const { industrySlug } = await params;
  const sol = SOLUTIONS_DATA.find((s) => s.slug === industrySlug);
  if (!sol) {
    return {
      title: 'Industry Solution Not Found',
    };
  }

  return {
    title: `${sol.title} Digital Growth Solutions & Automation | ${SITE_CONFIG.brandName}`,
    description: sol.description,
    openGraph: {
      title: `${sol.title} Growth Blueprint | ${SITE_CONFIG.brandName}`,
      description: sol.description,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ industrySlug: string }>;
}) {
  const { industrySlug } = await params;
  const sol = SOLUTIONS_DATA.find((s) => s.slug === industrySlug);
  if (!sol) {
    notFound();
  }

  return <IndustryDetailPage slug={industrySlug} />;
}
