export interface SiteConfig {
  siteUrl: string;
  brandName: string;
  brandTagline: string;
  headline: string;
  subheadline: string;
  mainMessage: string;
  supportingMessage: string;

  contact: {
    email: string;
    phone: string;
    displayPhone: string;
    whatsappNumber: string;
    address: string;
    responseSla: string;
  };
  social: {
    linkedin: string;
    instagram: string;
    youtube: string;
    facebook: string;
    x: string;
  };
  navLinks: {
    name: string;
    path: string;
    hasDropdown?: boolean;
  }[];
}

export const SITE_CONFIG: SiteConfig = {
  siteUrl: 'https://digitalsimplesolution.com',
  brandName: 'digitalsimplesolution',
  brandTagline: 'Build Your Digital Presence. Generate More Leads. Automate Your Growth.',

  headline: 'Grow Your Business with Digital Marketing & Automation',
  subheadline: 'We help businesses attract customers, generate leads, and automate growth using landing pages, paid advertising, content marketing, digital products, and WhatsApp automation.',
  mainMessage: 'Build Your Digital Presence. Generate More Leads. Automate Your Growth.',
  supportingMessage: 'We help businesses create high-converting landing pages, run effective Meta and Google Ads, build digital products, create SEO-focused content, and automate customer conversations with WhatsApp.',
  contact: {
    email: 'mhkr038@gmail.com',
    phone: '+918500699708',
    displayPhone: '+91 85006 99708',
    whatsappNumber: '918500699708',
    address: 'Global Digital Agency & Engineering Hub',
    responseSla: 'Under 2 Hours (Business Days)',
  },
  social: {
    linkedin: 'https://linkedin.com',
    instagram: 'https://instagram.com',
    youtube: 'https://youtube.com',
    facebook: 'https://facebook.com',
    x: 'https://twitter.com',
  },
  navLinks: [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/#services', hasDropdown: true },
    { name: 'How It Works', path: '/#how-it-works' },
    { name: 'Ecosystem', path: '/#ecosystem' },
    { name: 'Case Studies', path: '/#case-studies' },
    { name: 'Blog', path: '/blog' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ],
};
