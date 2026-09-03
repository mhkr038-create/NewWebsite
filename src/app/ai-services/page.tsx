import React from 'react';
import type { Metadata } from 'next';
import { AiServicesPage } from '../../views/AiServicesPage';
import { SITE_CONFIG } from '../../config/siteConfig';

export const metadata: Metadata = {
  title: `AI Automation & Digital Marketing Agency | ${SITE_CONFIG.brandName}`,
  description:
    'Scale your business with cutting-edge AI agency solutions, programmatic SEO, and custom digital marketing workflows that drive organic growth.',
  keywords: [
    'AI marketing agency',
    'digital marketing solutions',
    'AI automation for business',
    'custom AI agents',
    'workflow automation pipelines',
    'programmatic SEO',
    'conversational AI chatbots',
  ],
  openGraph: {
    title: `AI Automation & Digital Marketing Agency | ${SITE_CONFIG.brandName}`,
    description: 'Transform your marketing workflows using custom-built AI solutions.',
    url: `${SITE_CONFIG.siteUrl}/ai-services`,
    siteName: SITE_CONFIG.brandName,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `AI Automation & Digital Marketing Agency | ${SITE_CONFIG.brandName}`,
    description: 'Transform your marketing workflows using custom-built AI solutions.',
  },
  alternates: {
    canonical: `${SITE_CONFIG.siteUrl}/ai-services`,
  },
};

export default function AiServicesRoute() {
  return <AiServicesPage />;
}
