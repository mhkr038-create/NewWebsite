import type { Metadata } from 'next';
import { TermsConditionsPage } from '../../views/TermsConditionsPage';
import { SITE_CONFIG } from '../../config/siteConfig';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: `Terms and Conditions of Service for ${SITE_CONFIG.brandName}.`,
};

export default function Page() {
  return <TermsConditionsPage />;
}
