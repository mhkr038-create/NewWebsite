import type { Metadata } from 'next';
import { AboutPage } from '../../views/AboutPage';
import { SITE_CONFIG } from '../../config/siteConfig';

export const metadata: Metadata = {
  title: 'About Our Digital Growth Agency',
  description: `Learn more about ${SITE_CONFIG.brandName}, your digital growth partner helping businesses get visibility, leads, and sales through websites, ads, content, and automation.`,
  openGraph: {
    title: `About Us | ${SITE_CONFIG.brandName}`,
    description: SITE_CONFIG.supportingMessage,
  },
};

export default function Page() {
  return <AboutPage />;
}
