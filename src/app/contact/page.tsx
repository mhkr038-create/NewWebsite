import type { Metadata } from 'next';
import { ContactPage } from '../../views/ContactPage';
import { SITE_CONFIG } from '../../config/siteConfig';

export const metadata: Metadata = {
  title: 'Contact Us | Start Your Digital Growth Project',
  description: `Get in touch with ${SITE_CONFIG.brandName}. Fast responses for landing pages, Meta/Google Ads, WhatsApp automation, and digital products.`,
  openGraph: {
    title: `Contact Us | ${SITE_CONFIG.brandName}`,
    description: `Get in touch with ${SITE_CONFIG.brandName}. Fast responses for landing pages, Meta/Google Ads, WhatsApp automation, and digital products.`,
  },
};

export default function Page() {
  return <ContactPage />;
}
