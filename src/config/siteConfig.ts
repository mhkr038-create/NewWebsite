export interface SiteConfig {
  brandName: string;
  brandTagline: string;
  headline: string;
  subheadline: string;
  contact: {
    email: string;
    phone: string;
    displayPhone: string;
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
  brandName: 'digitalsimplesolution',
  brandTagline: 'Grow Smarter with AI, Automation & Digital Marketing',
  headline: 'Transform Your Business with AI & Digital Growth',
  subheadline: 'We help businesses save time, automate repetitive work, attract more customers, and grow their digital presence with intelligent solutions.',
  contact: {
    email: 'mhkr038@gmail.com',
    phone: '+918500699708',
    displayPhone: '+91 85006 99708',
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
    { name: 'AI Services', path: '/ai-services' },
    { name: 'Digital Marketing', path: '/digital-marketing' },
    { name: 'Automation', path: '/automation' },
    { name: 'Solutions', path: '/solutions' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ],
};
