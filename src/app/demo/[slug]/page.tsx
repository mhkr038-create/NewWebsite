import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DemoDispatcher } from '../../../demos/DemoDispatcher';
import { DEMO_REGISTRY } from '../../../data/demos';
import { SITE_CONFIG } from '../../../config/siteConfig';

export async function generateStaticParams() {
  return DEMO_REGISTRY.map((demo) => ({
    slug: demo.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const demo = DEMO_REGISTRY.find((d) => d.slug === slug);
  if (!demo) {
    return {
      title: 'Demo Not Found',
    };
  }

  return {
    title: `${demo.name} - Interactive Live Demo | ${SITE_CONFIG.brandName}`,
    description: demo.description,
    openGraph: {
      title: `${demo.name} Live Demo`,
      description: demo.description,
      images: [
        {
          url: demo.previewImage,
        },
      ],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const demo = DEMO_REGISTRY.find((d) => d.slug === slug);

  if (!demo) {
    notFound();
  }

  return <DemoDispatcher slug={slug} />;
}
