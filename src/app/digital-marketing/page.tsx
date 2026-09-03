import React from 'react';
import type { Metadata } from 'next';
import { DigitalMarketingPage } from '../../views/DigitalMarketingPage';
import { SITE_CONFIG } from '../../config/siteConfig';

export const metadata: Metadata = {
  title: `Performance Digital Marketing & Lead Generation | ${SITE_CONFIG.brandName}`,
  description: 'Scalable paid social advertising, high-intent Google search PPC, and automated conversion funnels that maximize marketing ROI.',
  keywords: [
    'performance digital marketing',
    'lead generation agency',
    'meta ads management',
    'google search ads',
    'conversion rate optimization',
    'digital marketing solutions',
    'growth marketing agency',
  ],
  alternates: {
    canonical: `${SITE_CONFIG.siteUrl}/digital-marketing`,
  },
  openGraph: {
    title: `Performance Digital Marketing & Lead Generation | ${SITE_CONFIG.brandName}`,
    description: 'Scalable paid social advertising, high-intent Google search PPC, and automated conversion funnels.',
    url: `${SITE_CONFIG.siteUrl}/digital-marketing`,
    siteName: SITE_CONFIG.brandName,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Performance Digital Marketing & Lead Generation | ${SITE_CONFIG.brandName}`,
    description: 'Scalable paid social advertising, high-intent Google search PPC, and automated conversion funnels.',
  },
};

export default function DigitalMarketingRoute() {
  return <DigitalMarketingPage />;
}
