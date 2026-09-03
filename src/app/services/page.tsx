import React from 'react';
import type { Metadata } from 'next';
import { ServicesPage } from '../../views/ServicesPage';
import { SITE_CONFIG } from '../../config/siteConfig';

export const metadata: Metadata = {
  title: `Digital & AI Services Suite | ${SITE_CONFIG.brandName}`,
  description: 'Explore our complete suite of AI website development, performance digital marketing, and intelligent workflow automation services.',
  keywords: [
    'AI marketing agency',
    'digital marketing solutions',
    'AI automation for business',
    'landing page development',
    'meta ads management',
    'google ads agency',
    'whatsapp marketing automation',
  ],
  alternates: {
    canonical: `${SITE_CONFIG.siteUrl}/services`,
  },
  openGraph: {
    title: `Digital & AI Services Suite | ${SITE_CONFIG.brandName}`,
    description: 'Explore our complete suite of AI website development, performance digital marketing, and intelligent workflow automation services.',
    url: `${SITE_CONFIG.siteUrl}/services`,
    siteName: SITE_CONFIG.brandName,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Digital & AI Services Suite | ${SITE_CONFIG.brandName}`,
    description: 'Explore our complete suite of AI website development, performance digital marketing, and intelligent workflow automation services.',
  },
};

export default function ServicesRoute() {
  return <ServicesPage />;
}
