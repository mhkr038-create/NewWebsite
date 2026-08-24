export interface MarketingServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  icon: string;
  tag: string;
  metric: string;
  benefits: string[];
  features: string[];
  ctaText: string;
}

export const MARKETING_SERVICES_DATA: MarketingServiceItem[] = [
  {
    id: 'social-media-marketing',
    title: 'Social Media Marketing',
    shortDesc: 'Build brand awareness and engage your target audience.',
    fullDesc: 'Data-driven paid social campaigns and organic distribution strategies across LinkedIn, Meta, Instagram, and X that capture buyer attention and build deep brand authority.',
    icon: 'Share2',
    tag: 'Brand Authority',
    metric: '+320% Social Engagement',
    benefits: [
      'High-converting visual creatives and video hooks',
      'Hyper-targeted audience segmenting and retargeting pixels',
      'Consistent daily brand presence across tier-1 platforms',
      'Comprehensive monthly reporting on ROAS and cost-per-lead',
    ],
    features: [
      'Custom campaign architecture & audience research',
      'A/B creative testing (headlines, video hooks, CTAs)',
      'Comment monitoring and community management',
      'Direct attribution tracking through custom UTMs',
    ],
    ctaText: "Let's Grow Your Business",
  },
  {
    id: 'content-strategy',
    title: 'Content Strategy',
    shortDesc: 'Create valuable content that attracts and educates potential customers.',
    fullDesc: 'A cohesive content engine that positions you as the definitive authority in your industry, answering key buyer questions and moving prospects seamlessly from curiosity to conversion.',
    icon: 'FileText',
    tag: 'Authority Engine',
    metric: '4.5x Organic Inquiries',
    benefits: [
      'Topic clusters engineered around high-intent buyer queries',
      'Multi-format repurposing (articles, carousels, video scripts)',
      'Educates prospects so sales calls close 2x faster',
      'Long-term compounding traffic asset that never expires',
    ],
    features: [
      'Quarterly editorial calendar & competitive gap analysis',
      'Thought leadership ghostwriting & executive insights',
      'Case study & customer victory storytelling',
      'Lead magnet guide & checklist creation',
    ],
    ctaText: "Let's Grow Your Business",
  },
  {
    id: 'lead-generation',
    title: 'Lead Generation',
    shortDesc: 'Build systems to attract and capture qualified leads.',
    fullDesc: 'End-to-end inbound and outbound lead generation systems that fill your pipeline with pre-qualified decision-makers ready to invest in your solutions.',
    icon: 'Target',
    tag: 'High Velocity',
    metric: '3.8x More Qualified Leads',
    benefits: [
      'Multi-channel acquisition (Paid search, Meta, LinkedIn, cold email)',
      'Automated qualification forms to filter out tire-kickers',
      'Instant SMS and email alert triggers when high-value leads submit',
      'Predictable monthly lead volume and transparent cost metrics',
    ],
    features: [
      'Multi-step dynamic lead capture quizzes & calculators',
      'High-converting lead magnet distribution funnels',
      'B2B targeted outbound pipeline with verified email deliverability',
      'CRM integration with instant lead routing and auto-tagging',
    ],
    ctaText: "Let's Grow Your Business",
  },
  {
    id: 'seo-digital-visibility',
    title: 'SEO & Digital Visibility',
    shortDesc: 'Improve your online visibility and help customers discover your business.',
    fullDesc: 'Technical, on-page, and high-intent semantic SEO that ranks your website on Page 1 of Google and AI search engines (Perplexity, ChatGPT Search) for commercial keywords.',
    icon: 'Search',
    tag: 'Page 1 Rankings',
    metric: '+280% Organic Search Traffic',
    benefits: [
      'Capture ready-to-buy customers actively searching for your service',
      'Technical speed optimization for perfect Google Core Web Vitals',
      'Optimized for both classic Google Search and Modern AI Answers',
      'Local map pack domination for geographic service businesses',
    ],
    features: [
      'In-depth competitor keyword opportunity mapping',
      'Technical site audit (structured data, schema, mobile responsiveness)',
      'High-authority backlink building & digital PR outreach',
      'Google Search Console and rank tracking dashboard',
    ],
    ctaText: "Let's Grow Your Business",
  },
  {
    id: 'email-marketing',
    title: 'Email Marketing',
    shortDesc: 'Create automated email campaigns and customer follow-up systems.',
    fullDesc: 'Automated email sequences that nurture leads, onboard new clients, re-engage cold contacts, and maximize customer lifetime value on autopilot.',
    icon: 'MailCheck',
    tag: 'Automated Revenue',
    metric: '44:1 Proven Avg ROI',
    benefits: [
      'Never let a warm lead slip through the cracks again',
      'Behavior-triggered sequences (viewed pricing, abandoned form, etc.)',
      'High inbox deliverability with DKIM, SPF, and DMARC setups',
      'Engaging weekly newsletters that build lasting brand loyalty',
    ],
    features: [
      'Automated Welcome & Lead Magnet delivery sequences',
      'Post-consultation follow-up & objection-handling workflows',
      'Customer win-back & referral generation triggers',
      'Advanced segmentation based on user industry and budget',
    ],
    ctaText: "Let's Grow Your Business",
  },
  {
    id: 'website-landing-pages',
    title: 'Website & Landing Pages',
    shortDesc: 'Design high-converting websites and landing pages for businesses.',
    fullDesc: 'Bespoke, high-converting digital flagships and dedicated campaign landing pages engineered with speed, persuasive copywriting, and conversion rate psychology.',
    icon: 'Layout',
    tag: 'Conversion Machine',
    metric: '6.2% Avg Conversion Rate',
    benefits: [
      'Sub-second load times built on modern React and Tailwind CSS',
      'Mobile-first responsive UX designed to convert on any screen',
      'Frictionless booking flows and 1-click CTA micro-interactions',
      '100% full source code ownership with zero SaaS platform lock-in',
    ],
    features: [
      'Interactive widgets (calculators, schedulers, video modals)',
      'Clear visual hierarchy and high-contrast conversion CTA blocks',
      'Comprehensive Google Analytics 4 & conversion pixel tracking',
      'Rapid delivery in 5–7 business days',
    ],
    ctaText: "Let's Grow Your Business",
  },
];
