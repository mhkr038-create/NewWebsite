import type { Metadata } from 'next';
import { DemosPage } from '../../views/DemosPage';
import { SITE_CONFIG } from '../../config/siteConfig';

export const metadata: Metadata = {
  title: 'Interactive Website Demos & Concepts',
  description: 'Explore live, interactive concepts designed for clinics, real estate, restaurants, gyms, and professional services.',
  openGraph: {
    title: `Interactive Website Demos | ${SITE_CONFIG.brandName}`,
    description: 'Explore live, interactive concepts designed for clinics, real estate, restaurants, gyms, and professional services.',
  },
};

export default function Page() {
  return <DemosPage />;
}
