import type { Metadata } from 'next';
import { GoogleAdsPage } from '../../views/GoogleAdsPage';
import { GROWTH_SERVICES } from '../../data/growthServices';

const s = GROWTH_SERVICES.find((srv) => srv.id === 'google-ads')!;

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
  return <GoogleAdsPage />;
}
