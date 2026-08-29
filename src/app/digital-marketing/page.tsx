import React from 'react';
import type { Metadata } from 'next';
import { DigitalMarketingPage } from '../../views/DigitalMarketingPage';
import { SITE_CONFIG } from '../../config/siteConfig';

export const metadata: Metadata = {
  title: `Performance Digital Marketing & Lead Generation | ${SITE_CONFIG.brandName}`,
  description: 'Scalable paid social advertising, high-intent Google search PPC, and automated conversion funnels.',
};

export default function DigitalMarketingRoute() {
  return <DigitalMarketingPage />;
}
