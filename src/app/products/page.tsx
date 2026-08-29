import React from 'react';
import type { Metadata } from 'next';
import { DigitalProductsPage } from '../../views/DigitalProductsPage';
import { SITE_CONFIG } from '../../config/siteConfig';

export const metadata: Metadata = {
  title: `Ready-to-Use Digital Products & Templates | ${SITE_CONFIG.brandName}`,
  description: 'Download verified digital products, landing page templates, AI prompt frameworks, and growth playbooks.',
};

export default function ProductsRoute() {
  return <DigitalProductsPage />;
}
