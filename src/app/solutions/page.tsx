import type { Metadata } from 'next';
import { SolutionsPage } from '../../views/SolutionsPage';
import { SITE_CONFIG } from '../../config/siteConfig';

export const metadata: Metadata = {
  title: 'Industry Solutions & Growth Blueprints',
  description: 'Specialized digital growth systems, AI workflows, and conversion funnels engineered for clinics, real estate, restaurants, gyms, and professional service businesses.',
  openGraph: {
    title: `Industry Solutions | ${SITE_CONFIG.brandName}`,
    description: 'Specialized digital growth systems, AI workflows, and conversion funnels engineered for diverse industries.',
  },
};

export default function Page() {
  return <SolutionsPage />;
}
