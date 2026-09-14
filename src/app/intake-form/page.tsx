import React from 'react';
import type { Metadata } from 'next';
import { IntakeFormView } from '../../views/IntakeFormView';
import { SITE_CONFIG } from '../../config/siteConfig';

export const metadata: Metadata = {
  title: 'Submit Project Request',
  description: 'Submit your project request, contact information, and business goals to get an instant tailored digital growth proposal.',
  keywords: [
    'submit request',
    'project request form',
    'client intake form',
    'digital marketing consultation',
    'website requirement submission',
    'whatsapp automation inquiry',
  ],
  alternates: {
    canonical: `${SITE_CONFIG.siteUrl}/intake-form`,
  },
  openGraph: {
    title: 'Submit Project Request',
    description: 'Submit your project request, contact information, and business goals to get an instant tailored digital growth proposal.',
    url: `${SITE_CONFIG.siteUrl}/intake-form`,
    siteName: 'Digital Simple Solution',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Client Intake & Project Requirements Form',
    description: 'Submit your project requirements, contact information, and business goals.',
  },
};

export default function IntakeFormPage() {
  return <IntakeFormView />;
}
