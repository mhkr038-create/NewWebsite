import React from 'react';
import type { Metadata } from 'next';
import { AutomationPage } from '../../views/AutomationPage';
import { SITE_CONFIG } from '../../config/siteConfig';

export const metadata: Metadata = {
  title: `Business Automation & Workflow Pipelines | ${SITE_CONFIG.brandName}`,
  description: 'Automate repetitive workflows, multi-channel CRM synchronization, and instant WhatsApp customer follow-up.',
};

export default function AutomationRoute() {
  return <AutomationPage />;
}
