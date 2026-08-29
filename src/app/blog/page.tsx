import type { Metadata } from 'next';
import { BlogPage } from '../../views/BlogPage';
import { SITE_CONFIG } from '../../config/siteConfig';

export const metadata: Metadata = {
  title: 'Digital Growth & Marketing Blog | Playbooks & Guides',
  description: 'Actionable strategies on high-converting landing pages, Meta vs Google Ads, WhatsApp automation, digital products, and search SEO.',
  keywords: ['digital marketing blog', 'landing page cro', 'meta ads vs google ads', 'whatsapp automation guide', 'seo topic cluster'],
  openGraph: {
    title: `Digital Growth & Marketing Blog | ${SITE_CONFIG.brandName}`,
    description: 'Actionable strategies on high-converting landing pages, Meta vs Google Ads, WhatsApp automation, digital products, and search SEO.',
  },
};

export default function Page() {
  return <BlogPage />;
}
