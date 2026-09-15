import type { Metadata } from 'next';
import { FreeSchoolSoftwareView } from '../../views/FreeSchoolSoftwareView';
import { SITE_CONFIG } from '../../config/siteConfig';

export const metadata: Metadata = {
  title: 'Free School Software - 100% Free School Management Software & ERP',
  description: 'Looking for free school software? Claim 100% Free School Software & Management ERP (Worth ₹30,000) for schools, colleges & institutes. Student admissions, attendance, fees, report cards & WhatsApp alerts. Zero license fee.',
  keywords: [
    'free school software',
    'free school software India',
    'best free school software',
    'school software free',
    'free school management software',
    'free school ERP software',
    'free school management system',
    'free school attendance software',
    'free school fee software',
    'free school report card software',
    'free education software',
    'free school administration software',
    'school ERP free download',
    'free school software for small schools',
    'free cloud school ERP',
  ],
  alternates: {
    canonical: `${SITE_CONFIG.siteUrl}/free-school-management-software`,
  },
  openGraph: {
    title: 'Free School Software - 100% Free School Management Software & ERP',
    description: 'Looking for free school software? Get 100% Free School Software ERP (Worth ₹30,000). Automated admissions, fees receipts, daily attendance & WhatsApp parent notifications.',
    url: `${SITE_CONFIG.siteUrl}/free-school-management-software`,
    siteName: SITE_CONFIG.brandName,
    type: 'website',
    images: [
      {
        url: '/images/free-school-management-software.jpg',
        width: 1200,
        height: 800,
        alt: 'Free School Software - Cloud School Management ERP',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free School Software - 100% Free School Management Software & ERP',
    description: 'Claim 100% Free School Software. Complete cloud ERP for admissions, fees, daily attendance & WhatsApp alerts.',
    images: ['/images/free-school-management-software.jpg'],
  },
};

export default function Page() {
  const schoolSoftwareSchema = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Free School Software - Smart School Management System ERP',
      operatingSystem: 'Web Browser, Android, iOS, Windows, macOS',
      applicationCategory: 'EducationalApplication',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'INR',
        priceValidUntil: '2027-12-31',
        description: '100% Free School Software license worth ₹30,000 for registered educational institutions.',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '142',
      },
      description:
        'Complete Free School Software and School Management ERP worth ₹30,000 for managing student admissions, digital fee receipts, attendance, CBSE/ICSE report cards, and WhatsApp parent alerts.',
      featureList: [
        'Free School Software Core ERP License',
        'Student & Staff Master Directory',
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
          name: 'What is the best free school software?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Digital Simple Solution provides one of the best free school software platforms in India. It includes student admission management, automated fee receipts, web and mobile attendance, CBSE/ICSE report cards, and WhatsApp parent alerts with zero software license fees (valued at ₹30,000).',
          },
        },
        {
          '@type': 'Question',
          name: 'Is this free school software really 100% free with no monthly subscription?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. The complete core ERP software license (valued at ₹30,000) is provided at ₹0 software fee for registered educational institutions with zero recurring per-student software charges.',
          },
        },
        {
          '@type': 'Question',
          name: 'What education boards are supported by the free school software?',
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
            text: 'Yes! Our onboarding team provides an easy 1-click Excel/CSV import template to bulk upload all your student bios, class sections, parent contact numbers, and past fee dues in minutes without manual data entry.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does the WhatsApp automated parent notification system work in the free school software?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The free school software connects directly with the WhatsApp Business Cloud API to send automated fee payment receipts, absentee alerts, homework updates, and emergency holiday broadcasts directly to parents.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can small schools, pre-schools, and academies use this free school software?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. The software is designed to scale effortlessly from small pre-schools with 50 students up to multi-branch institutions with 5,000+ students.',
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
