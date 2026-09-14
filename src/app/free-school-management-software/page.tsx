import type { Metadata } from 'next';
import { FreeSchoolSoftwareView } from '../../views/FreeSchoolSoftwareView';
import { SITE_CONFIG } from '../../config/siteConfig';

export const metadata: Metadata = {
  title: 'Free School Management Software (Worth ₹30,000) | School ERP & Enquiry',
  description: 'Free School Management Software ERP (Valued at ₹30,000) for schools, colleges & institutes. Student admissions, daily attendance, fees receipts, report cards & WhatsApp parent alerts. Submit your school enquiry.',
  keywords: [
    'free school management software',
    'school ERP free',
    'school management system',
    'free school software India',
    'school attendance software',
    'school fee management software',
    'school report card software',
    'free education ERP',
    'school admission management',
  ],
  alternates: {
    canonical: `${SITE_CONFIG.siteUrl}/free-school-management-software`,
  },
  openGraph: {
    title: 'Free School Management Software (Worth ₹30,000) | Complete School ERP',
    description: 'Claim your Free School Management Software (Worth ₹30,000). Complete ERP for student records, automated fee receipts, attendance, and parent WhatsApp notifications.',
    url: `${SITE_CONFIG.siteUrl}/free-school-management-software`,
    siteName: SITE_CONFIG.brandName,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free School Management Software (Worth ₹30,000) | School ERP',
    description: 'Claim free school management software. Automated admissions, fees, daily attendance & WhatsApp parent alerts.',
  },
};

export default function Page() {
  return <FreeSchoolSoftwareView />;
}
