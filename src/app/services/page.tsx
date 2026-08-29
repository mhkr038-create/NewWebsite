import React from 'react';
import type { Metadata } from 'next';
import { ServicesPage } from '../../views/ServicesPage';
import { SITE_CONFIG } from '../../config/siteConfig';

export const metadata: Metadata = {
  title: `Digital & AI Services | ${SITE_CONFIG.brandName}`,
  description: 'Explore our complete suite of AI website development, performance digital marketing, and intelligent workflow automation services.',
};

export default function ServicesRoute() {
  return <ServicesPage />;
}
