export interface ProductItem {
  id: string;
  title: string;
  category: 'templates' | 'guides' | 'prompts' | 'automation' | 'marketing' | 'resources';
  categoryLabel: string;
  description: string;
  price: number;
  originalPrice: number;
  badge?: string;
  rating: number;
  reviewsCount: number;
  image: string;
  features: string[];
  formats: string[];
  fileSize: string;
}

export const PRODUCTS_REGISTRY: ProductItem[] = [
  {
    id: 'prod-full-stack-agency-kit',
    title: 'Ultimate Agency & Client Growth OS',
    category: 'templates',
    categoryLabel: 'Website Templates',
    description: 'Complete production-ready React + Tailwind digital agency template system with 12 conversion-optimized pages, project estimators, and CRM lead capture hooks.',
    price: 79,
    originalPrice: 149,
    badge: 'Bestseller',
    rating: 4.9,
    reviewsCount: 128,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    features: [
      'Full TypeScript + React 19 source code',
      '12 Clean Figma component files included',
      'Pre-built inquiry forms & Stripe checkout hooks',
      'Dark/Light mode native support',
      'Lifetime free updates & documentation',
    ],
    formats: ['React / Vite', 'Figma', 'Tailwind CSS'],
    fileSize: '48 MB ZIP',
  },
  {
    id: 'prod-ai-prompt-empire',
    title: 'The 2,500+ AI Prompt Master Vault for Agencies',
    category: 'prompts',
    categoryLabel: 'AI Prompt Packs',
    description: 'Battle-tested system prompts and chained workflow recipes for copywriting, client proposals, SEO content clusters, code architecture, and AI sales outreach.',
    price: 39,
    originalPrice: 79,
    badge: 'Popular',
    rating: 5.0,
    reviewsCount: 215,
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    features: [
      '2,500+ Curated, high-precision system prompts',
      'Claude 3.7 & GPT-4o optimized chained workflows',
      'Custom instruction templates for 14 industries',
      'Notion Database + CSV searchable database',
      'Bonus: 50 automated prompt chaining scripts',
    ],
    formats: ['Notion DB', 'JSON', 'Markdown', 'PDF Guide'],
    fileSize: '18 MB',
  },
  {
    id: 'prod-n8n-make-automation-vault',
    title: 'Autonomous Client Acquisition & CRM Automations',
    category: 'automation',
    categoryLabel: 'Automation Templates',
    description: 'Plug-and-play n8n and Make.com blueprint workflows for auto-qualifying leads, instant proposal generation, calendar syncing, and automated invoice delivery.',
    price: 59,
    originalPrice: 119,
    badge: 'High ROI',
    rating: 4.8,
    reviewsCount: 94,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    features: [
      '15 Ready-to-import JSON workflow blueprints',
      'Webhook receivers for Typeform, Stripe & HubSpot',
      'Automated client onboarding sequence',
      'Error handling and Slack alert pipelines',
      'Step-by-step video setup walkthroughs',
    ],
    formats: ['Make.com Blueprints', 'n8n JSON', 'Zapier Templates'],
    fileSize: '32 MB ZIP',
  },
  {
    id: 'prod-digital-biz-playbook',
    title: 'Zero to $10k/mo Digital Solutions Playbook',
    category: 'guides',
    categoryLabel: 'Digital Business Guides',
    description: 'The exact step-by-step blueprint for packaging demo websites, landing high-ticket clients, pricing your customization retainers, and scaling delivery with AI.',
    price: 29,
    originalPrice: 59,
    badge: 'Founder Favorite',
    rating: 4.9,
    reviewsCount: 180,
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80',
    features: [
      '180-Page comprehensive PDF master guide',
      'Cold email & LinkedIn DM outreach templates',
      'Contract & Statement of Work legal templates',
      'Client onboarding questionnaire kit',
      'Interactive pricing calculator spreadsheet',
    ],
    formats: ['PDF Ebook', 'Spreadsheets', 'Docs'],
    fileSize: '24 MB',
  },
  {
    id: 'prod-high-converting-marketing-pack',
    title: 'High-Converting Ad Creatives & Copy Frameworks',
    category: 'marketing',
    categoryLabel: 'Marketing Templates',
    description: 'Over 150+ high-performing ad swipe templates, hook formulas, landing page wireframes, and email sales sequences designed to convert traffic into qualified demos.',
    price: 45,
    originalPrice: 89,
    badge: 'New Release',
    rating: 4.7,
    reviewsCount: 63,
    image: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&w=800&q=80',
    features: [
      '150+ Canva editable ad creative templates',
      '50+ High-conversion hook formulas',
      '7-Part evergreen email nurture sequence',
      'Social proof & testimonial display frameworks',
      'A/B testing scorecard spreadsheet',
    ],
    formats: ['Canva Templates', 'Figma', 'Google Docs'],
    fileSize: '15 MB',
  },
  {
    id: 'prod-medical-wellness-theme-bundle',
    title: 'Healthcare & Wellness Clinic Multi-Layout Suite',
    category: 'templates',
    categoryLabel: 'Website Templates',
    description: 'Clean medical clinic, dental care, physiotherapy, and wellness spa website kit with built-in appointment scheduler UI, patient intake forms, and HIPAA-friendly UI design.',
    price: 69,
    originalPrice: 129,
    badge: 'Specialized',
    rating: 4.9,
    reviewsCount: 78,
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
    features: [
      '5 Niche variations (Clinic, Dental, Therapy, Chiro, Spa)',
      'Mobile-first appointment booking flow',
      'Doctor & Staff directory grid components',
      'Interactive service pricing table with toggles',
      'WCAG 2.1 AA accessible color palettes',
    ],
    formats: ['React / Vite', 'Tailwind CSS', 'Figma'],
    fileSize: '42 MB ZIP',
  },
];

export const PRODUCT_CATEGORIES = [
  { id: 'all', label: 'All Products' },
  { id: 'templates', label: 'Website Templates' },
  { id: 'guides', label: 'Business Guides' },
  { id: 'prompts', label: 'AI Prompt Packs' },
  { id: 'automation', label: 'Automation Blueprints' },
  { id: 'marketing', label: 'Marketing Packs' },
] as const;
