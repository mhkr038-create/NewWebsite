import type { Metadata } from 'next';
import { MetaAdsPage } from '../../views/MetaAdsPage';
import { GROWTH_SERVICES } from '../../data/growthServices';

const s = GROWTH_SERVICES.find((srv) => srv.id === 'meta-ads')!;

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
  return <MetaAdsPage />;
}
