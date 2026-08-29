import type { Metadata } from 'next';
import { ScheduleMeetingPage } from '../../views/ScheduleMeetingPage';
import { SITE_CONFIG } from '../../config/siteConfig';

export const metadata: Metadata = {
  title: 'Book a Strategy Consultation',
  description: `Schedule a 30-minute 1-on-1 strategy call with ${SITE_CONFIG.brandName}. We map out high-leverage landing pages, ads, and WhatsApp automation for your business.`,
  openGraph: {
    title: `Book a Consultation | ${SITE_CONFIG.brandName}`,
    description: `Schedule a 30-minute 1-on-1 strategy call with ${SITE_CONFIG.brandName}.`,
  },
};

export default function Page() {
  return <ScheduleMeetingPage />;
}
