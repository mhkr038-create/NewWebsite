import type { Metadata } from 'next';
import { LandingPagesPage } from '../../views/LandingPagesPage';
import { GROWTH_SERVICES } from '../../data/growthServices';

const s = GROWTH_SERVICES.find((srv) => srv.id === 'landing-pages')!;

export const metadata: Metadata = {
  title: s.seo.title,
  description: s.seo.description,
  keywords: s.seo.keywords,
  openGraph: {
    title: s.seo.title,
    description: s.seo.description,
  },
};

export default function Page() {
  return <LandingPagesPage />;
}
