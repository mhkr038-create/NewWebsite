import React from 'react';
import type { Metadata } from 'next';
import { HomeContent } from './HomeContent';
import { SITE_CONFIG } from '../config/siteConfig';

export const metadata: Metadata = {
  title: {
    absolute: 'Digital Simple Solution | Digital Marketing & AI Agency',
  },
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
    title: 'Digital Simple Solution | Digital Marketing & AI Agency',
    description: 'Scale your business with cutting-edge AI agency solutions, programmatic SEO, and custom digital marketing workflows that drive organic growth.',
    url: `${SITE_CONFIG.siteUrl}`,
    siteName: 'Digital Simple Solution',
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Digital Simple Solution - Digital Marketing & AI Automation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital Simple Solution | Digital Marketing & AI Agency',
    description: 'Scale your business with cutting-edge AI agency solutions, programmatic SEO, and custom digital marketing workflows.',
    images: ['/twitter-image'],
  },
};

export default function HomePage() {
  return <HomeContent />;
}
