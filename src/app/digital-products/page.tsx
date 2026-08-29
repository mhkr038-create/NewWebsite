import type { Metadata } from 'next';
import { DigitalProductsPage } from '../../views/DigitalProductsPage';
import { GROWTH_SERVICES } from '../../data/growthServices';

const s = GROWTH_SERVICES.find((srv) => srv.id === 'digital-products')!;

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
  return <DigitalProductsPage />;
}
