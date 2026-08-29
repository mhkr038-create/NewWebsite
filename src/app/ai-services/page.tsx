import React from 'react';
import type { Metadata } from 'next';
import { AiServicesPage } from '../../views/AiServicesPage';
import { SITE_CONFIG } from '../../config/siteConfig';

export const metadata: Metadata = {
  title: `Custom AI Agents & AI Solutions | ${SITE_CONFIG.brandName}`,
  description: 'Deploy intelligent conversational AI chatbots, automated triage agents, and custom LLM workflows.',
};

export default function AiServicesRoute() {
  return <AiServicesPage />;
}
