import React from 'react';
import type { Metadata } from 'next';
import { HomeContent } from './HomeContent';
import { SITE_CONFIG } from '../config/siteConfig';

export const metadata: Metadata = {
  title: `${SITE_CONFIG.brandName} | AI Automation & Digital Marketing Agency`,
  description: 'Scale your business with cutting-edge AI agency solutions, programmatic SEO, and custom digital marketing workflows that drive organic growth.',
  keywords: [
    'AI marketing agency',
    'digital marketing solutions',
    'AI automation for business',
    'landing page creation',
    'whatsapp automation agency',
    'meta ads management',
    'google ads management',
    'programmatic SEO',
    'custom digital marketing workflows',
  ],
  alternates: {
    canonical: `${SITE_CONFIG.siteUrl}`,
  },
  openGraph: {
    title: `${SITE_CONFIG.brandName} | AI Automation & Digital Marketing Agency`,
    description: 'Scale your business with cutting-edge AI agency solutions, programmatic SEO, and custom digital marketing workflows that drive organic growth.',
    url: `${SITE_CONFIG.siteUrl}`,
    siteName: SITE_CONFIG.brandName,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_CONFIG.brandName} | AI Automation & Digital Marketing Agency`,
    description: 'Transform your marketing workflows using custom-built AI solutions and high-converting systems.',
  },
};

export default function HomePage() {
  return <HomeContent />;
}
