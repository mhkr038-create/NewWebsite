import React from 'react';
import type { Metadata } from 'next';
import { AutomationPage } from '../../views/AutomationPage';
import { SITE_CONFIG } from '../../config/siteConfig';

export const metadata: Metadata = {
  title: `Business Automation & Workflow Pipelines | ${SITE_CONFIG.brandName}`,
  description: 'Automate repetitive workflows, multi-channel CRM synchronization, and instant WhatsApp customer follow-up to eliminate manual friction.',
  keywords: [
    'business automation',
    'workflow pipelines',
    'AI automation for business',
    'CRM synchronization',
    'automated workflows',
    'lead capture automation',
    'operational efficiency',
  ],
  alternates: {
    canonical: `${SITE_CONFIG.siteUrl}/automation`,
  },
  openGraph: {
    title: `Business Automation & Workflow Pipelines | ${SITE_CONFIG.brandName}`,
    description: 'Automate repetitive workflows, multi-channel CRM synchronization, and instant WhatsApp customer follow-up.',
    url: `${SITE_CONFIG.siteUrl}/automation`,
    siteName: SITE_CONFIG.brandName,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Business Automation & Workflow Pipelines | ${SITE_CONFIG.brandName}`,
    description: 'Automate repetitive workflows, multi-channel CRM synchronization, and instant WhatsApp customer follow-up.',
  },
};

export default function AutomationRoute() {
  return <AutomationPage />;
}
