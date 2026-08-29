import type { Metadata } from 'next';
import { PrivacyPolicyPage } from '../../views/PrivacyPolicyPage';
import { SITE_CONFIG } from '../../config/siteConfig';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `Privacy Policy and data protection terms for ${SITE_CONFIG.brandName}.`,
};

export default function Page() {
  return <PrivacyPolicyPage />;
}
