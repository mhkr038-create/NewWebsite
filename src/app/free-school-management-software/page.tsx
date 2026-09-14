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
    images: [
      {
        url: '/images/free-school-management-software.jpg',
        width: 1200,
        height: 800,
        alt: 'Free School Management Software - Smart School ERP',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free School Management Software (Worth ₹30,000) | School ERP',
    description: 'Claim free school management software. Automated admissions, fees, daily attendance & WhatsApp parent alerts.',
    images: ['/images/free-school-management-software.jpg'],
  },
};

export default function Page() {
  const schoolSoftwareSchema = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Smart School Management Software ERP',
      operatingSystem: 'Web, Cloud, Windows, macOS, Android, iOS',
      applicationCategory: 'EducationalApplication',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'INR',
        priceValidUntil: '2027-12-31',
        description: '100% Free Core ERP Software worth ₹30,000 for registered educational institutions.',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '142',
      },
      description:
        'Complete Free School ERP software worth ₹30,000 for managing student admissions, digital fee receipts, attendance, CBSE/ICSE report cards, and WhatsApp parent alerts.',
      featureList: [
        'Student & Staff Master ERP',
        'Digital Fees & Automated Invoicing',
        'Daily Attendance Web & Mobile App',
        'WhatsApp & SMS Parent Alerts',
        'CBSE / ICSE Report Cards & Grading',
        'Timetable & Teacher Substitution',
        'Transport & School Bus Tracking',
        'Library Circulation & Cataloging',
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Is the Free School Management Software really 100% free?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. The complete core ERP software license (valued at ₹30,000) is provided at ₹0 software fee for the first 25 registered educational institutions with zero recurring per-student software charges.',
          },
        },
        {
          '@type': 'Question',
          name: 'What education boards are supported by the software?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'It fully supports CBSE Affiliated schools, ICSE / ISC Boards, State Education Boards, IB / Cambridge International curricula, pre-schools, coaching academies, and degree colleges.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can we import our existing student data from Excel or spreadsheets?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! Our onboarding team provides an easy 1-click Excel/CSV import template to bulk upload all your student bios, class sections, parent contact numbers, and past fee dues in minutes.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does the WhatsApp automated parent notification system work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The ERP connects directly with the WhatsApp Business Cloud API to send automated fee payment receipts, absentee alerts, homework updates, and emergency holiday broadcasts directly to parents.',
          },
        },
        {
          '@type': 'Question',
          name: 'How long does complete school setup and onboarding take?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Onboarding takes 24 to 48 hours. Once you submit the enquiry form, our engineering team provisions your cloud database, sets up your administrative logins, and conducts a live staff walkthrough.',
          },
        },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schoolSoftwareSchema) }}
      />
      <FreeSchoolSoftwareView />
    </>
  );
}
