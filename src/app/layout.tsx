import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { AdminAuthProvider } from '../context/AdminAuthContext';
import { InquiryProvider } from '../context/InquiryContext';
import { SiteChrome } from '../components/layout/SiteChrome';
import { SITE_CONFIG } from '../config/siteConfig';


export const metadata: Metadata = {
  metadataBase: new URL('https://digitalsimplesolution.com'),
  title: {
    default: 'Digital Simple Solution | Web & AI Automation',
    template: '%s | Digital Simple Solution',
  },
  description: SITE_CONFIG.subheadline,
  keywords: [
    'digital marketing agency',
    'landing page creation',
    'meta ads agency',
    'google ads management',
    'whatsapp automation',
    'digital products',
    'seo content agency',
    'conversion rate optimization',
  ],
  authors: [{ name: SITE_CONFIG.brandName, url: 'https://digitalsimplesolution.com' }],
  creator: SITE_CONFIG.brandName,
  publisher: SITE_CONFIG.brandName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://digitalsimplesolution.com',
    siteName: 'Digital Simple Solution',
    title: 'Digital Simple Solution | Web & AI Automation',
    description: SITE_CONFIG.subheadline,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Digital Simple Solution - Digital Marketing & AI Automation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital Simple Solution | Web & AI Automation',
    description: SITE_CONFIG.subheadline,
    images: ['/twitter-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: SITE_CONFIG.brandName,
    description: SITE_CONFIG.subheadline,
    url: 'https://digitalsimplesolution.com',
    telephone: SITE_CONFIG.contact.phone,
    email: SITE_CONFIG.contact.email,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
      streetAddress: SITE_CONFIG.contact.address,
    },
    openingHours: 'Mo-Sa 09:00-19:00',
    priceRange: '$$',
  };

  return (
    <html lang="en" className="dark">
      <head>
        {/* Google Fonts Preconnect & Stylesheets */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800&family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />

        {/* Global Structured Data JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-black text-white selection:bg-white selection:text-black antialiased">
        {/* Next.js Script: Google Tag Manager (Non-blocking afterInteractive) */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-DEMO-DSS');
            `,
          }}
        />

        {/* Next.js Script: Meta Pixel (Non-blocking afterInteractive) */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1234567890123456');
              fbq('track', 'PageView');
            `,
          }}
        />

        {/* Next.js Script: Google Analytics 4 (Non-blocking afterInteractive) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-DEMO123456"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-DEMO123456', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />

        <AdminAuthProvider>
          <InquiryProvider>
            <SiteChrome>{children}</SiteChrome>
          </InquiryProvider>
        </AdminAuthProvider>
      </body>
    </html>
  );
}


