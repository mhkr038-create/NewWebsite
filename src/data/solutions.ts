export interface IndustrySolution {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  iconName: string;
  gradient: string;
  accentColor: string;
  description: string;
  challenges: string[];
  aiSolutions: string[];
  marketingStrategy: string[];
  niches: string[];
  features: string[];
  matchingDemoSlug?: string;
  matchingDemoName?: string;
  stats: { label: string; value: string };
  recommendedServices: string[];
}

export const SOLUTIONS_DATA: IndustrySolution[] = [
  {
    id: 'health-wellness',
    slug: 'health',
    title: 'Health & Wellness',
    subtitle: 'Calming, trustworthy, and patient-converting digital portals.',
    iconName: 'HeartPulse',
    gradient: 'from-teal-500/20 via-emerald-500/10 to-transparent',
    accentColor: 'text-teal-400',
    description: 'Provide patients and clients with a reassuring, serene digital sanctuary. Build immediate credibility, showcase specialized treatments, and enable effortless 24/7 online appointment booking.',
    challenges: [
      'High no-show rates and phone line congestion during peak clinic hours',
      'Patients struggle to understand complex treatment options online',
      'Fragmented intake paperwork and manual scheduling overhead',
    ],
    aiSolutions: [
      '24/7 AI Receptionist for automated appointment bookings and FAQs',
      'Automated SMS & WhatsApp appointment reminder sequences',
      'Digital patient pre-intake triage and symptom questionnaire',
    ],
    marketingStrategy: [
      'Local SEO and Google Maps optimization for regional medical search',
      'Educational wellness content funnels & patient success stories',
      'Targeted local ads with instant online booking call-to-actions',
    ],
    niches: [
      'Private Health & Medical Clinics',
      'Wellness Centers & Holistic Spas',
      'Fitness Coaches & Physiotherapists',
      'Dental & Cosmetic Practices',
    ],
    features: [
      'One-click patient booking with calendar confirmation',
      'Practitioner bio cards with verified medical credentials',
      'Patient intake pre-screening forms',
      'HIPAA / GDPR compliant privacy and security layout',
    ],
    matchingDemoSlug: 'health-clinic',
    matchingDemoName: 'Modern Health Clinic & Wellness',
    stats: { label: 'Avg Booking Increase', value: '+68%' },
    recommendedServices: ['AI Chatbots', 'AI Automation', 'SEO & Digital Visibility', 'Website & Landing Pages'],
  },
  {
    id: 'finance-consulting',
    slug: 'finance',
    title: 'Finance & Consulting',
    subtitle: 'High-net-worth aesthetic, fiduciary trust, and financial clarity.',
    iconName: 'TrendingUp',
    gradient: 'from-amber-500/20 via-yellow-500/10 to-transparent',
    accentColor: 'text-amber-400',
    description: 'Establish unmatched institutional prestige. Attract high-net-worth individuals, demonstrate rigorous investment methodologies, and provide interactive retirement and wealth planning tools.',
    challenges: [
      'High-net-worth clients demand immediate credibility and trust indicators',
      'Difficulty explaining complex advisory packages without overwhelming visitors',
      'Low conversion on generic contact forms from ultra-busy executives',
    ],
    aiSolutions: [
      'AI Lead Qualification assistant that filters high-net-worth inquiries',
      'Automated custom proposal drafting and meeting brief generation',
      'Intelligent document and compliance parsing workflows',
    ],
    marketingStrategy: [
      'LinkedIn Thought Leadership and executive ghostwriting',
      'High-intent search ads targeting wealth management & advisory queries',
      'Premium gated whitepapers and retirement planning guides',
    ],
    niches: [
      'Independent Financial Advisors (RIAs)',
      'Wealth & Asset Management Firms',
      'Corporate & M&A Business Consultants',
      'Tax Strategists & Family Offices',
    ],
    features: [
      'Interactive compounding growth calculators',
      'Institutional asset allocation diagrams',
      'Fiduciary pledge & compliance disclosures',
      'Confidential high-net-worth inquiry portals',
    ],
    matchingDemoSlug: 'wealth-advisor',
    matchingDemoName: 'Aura Capital Wealth Advisors',
    stats: { label: 'Qualified Inquiries', value: '+84%' },
    recommendedServices: ['AI Strategy & Consulting', 'Content Strategy', 'Lead Generation', 'Website Development'],
  },
  {
    id: 'education-academies',
    slug: 'education',
    title: 'Education',
    subtitle: 'Engaging, modern learning hubs that turn curious minds into enrolled students.',
    iconName: 'GraduationCap',
    gradient: 'from-indigo-500/20 via-violet-500/10 to-transparent',
    accentColor: 'text-indigo-400',
    description: 'Showcase your curriculum with crisp video teasers, cohort timelines, interactive lesson previews, and unmistakable graduate career transformation metrics.',
    challenges: [
      'High drop-off rates on course enrollment landing pages',
      'Repetitive student queries regarding syllabus, prerequisites, and payment plans',
      'Low course completion rates without personalized onboarding automation',
    ],
    aiSolutions: [
      'AI Student Advisor bot answering course curriculum questions 24/7',
      'Automated onboarding drip sequences and cohort orientation workflows',
      'AI Quiz generators for student assessment and skill level matching',
    ],
    marketingStrategy: [
      'High-converting YouTube & Meta video ads showcasing student transformations',
      'Free mini-course lead magnet funnels with automated email nurturing',
      'SEO-optimized industry skill guides and certification checklists',
    ],
    niches: [
      'Coaching Institutes & Bootcamps',
      'Online Course Creators & Academies',
      'Private Tutors & Mentorship Guilds',
      'Corporate Training Organizations',
    ],
    features: [
      'Interactive course catalog with syllabus preview modal',
      'Live cohort countdown timer and early bird discounts',
      'Student project showcases & hiring partner logos',
      'Automated checkout with multi-currency support',
    ],
    matchingDemoSlug: 'education-academy',
    matchingDemoName: 'SkillForge Online Academy',
    stats: { label: 'Enrollment Conversion', value: '+52%' },
    recommendedServices: ['AI Content Systems', 'Lead Generation', 'Email Marketing', 'Website & Landing Pages'],
  },
  {
    id: 'coaches-personal-brands',
    slug: 'coaching',
    title: 'Coaches & Personal Brands',
    subtitle: 'Deeply resonant, emotionally connected platforms for transformational guides.',
    iconName: 'Sparkles',
    gradient: 'from-rose-500/20 via-orange-500/10 to-transparent',
    accentColor: 'text-rose-400',
    description: 'Connect deeply with people looking for guidance, healing, and clarity. Present your personal story, signature methodology, and make booking discovery calls warm and frictionless.',
    challenges: [
      'Trading time for money with endless unqualified discovery calls',
      'Difficulty expressing signature transformational value on generic template sites',
      'Inconsistent client intake and follow-up processes',
    ],
    aiSolutions: [
      'AI Pre-Discovery screening bot that evaluates client readiness and budget',
      'Automated client onboarding and intake questionnaire processing',
      'AI-assisted voice-to-text coaching summaries and action item generation',
    ],
    marketingStrategy: [
      'Story-driven organic social media content engines across Instagram and LinkedIn',
      'High-converting 2-minute diagnostic self-assessment quiz funnels',
      'Automated email nurture sequences sharing client breakthroughs and podcasts',
    ],
    niches: [
      'Relationship & Couples Mentors',
      'Executive & Mindset Coaches',
      'Fitness & Nutrition Coaches',
      'Keynote Speakers & Authors',
    ],
    features: [
      'Interactive self-assessment & quiz funnels',
      'Signature program breakdown & pricing tiers',
      'Authentic video & audio client breakthroughs',
      'Direct Calendly / calendar discovery call embed',
    ],
    matchingDemoSlug: 'relationship-coach',
    matchingDemoName: 'Harmony Coaching & Transformation',
    stats: { label: 'Discovery Calls Booked', value: '3.4x' },
    recommendedServices: ['AI Automation', 'Social Media Marketing', 'Email Marketing', 'Website & Landing Pages'],
  },
  {
    id: 'local-businesses',
    slug: 'local-business',
    title: 'Local Businesses',
    subtitle: 'Dominate your local market and convert nearby searchers into loyal customers.',
    iconName: 'MapPin',
    gradient: 'from-cyan-500/20 via-blue-500/10 to-transparent',
    accentColor: 'text-cyan-400',
    description: 'Empower local contractors, home services, legal practices, and boutique agencies with automated lead response and local search dominance.',
    challenges: [
      'Missing phone calls when working on-site, leading to lost customer jobs',
      'Outdated websites that fail to convert mobile searchers',
      'Competitors ranking higher on Google Maps & local directories',
    ],
    aiSolutions: [
      'Instant AI missed-call auto-text response and quote estimator',
      'Automated review request engine to skyrocket Google 5-star ratings',
      'AI Chatbot for instant booking of service visits and inspections',
    ],
    marketingStrategy: [
      'Local 3-Pack Google Maps optimization and citation building',
      'Hyper-local Google Local Service Ads (LSA) and Pay-Per-Click',
      'Neighborhood retargeting and seasonal maintenance promotion campaigns',
    ],
    niches: [
      'Home Services & Contractors',
      'Legal & Accounting Practices',
      'Automotive & Detailing Centers',
      'Boutique Retail & Hospitality',
    ],
    features: [
      'Instant Quote Estimator calculator',
      'Google Maps & One-Click Directions integration',
      'Click-to-Call & WhatsApp floating fast buttons',
      'Verified customer review showcase wall',
    ],
    matchingDemoSlug: 'digital-agency',
    matchingDemoName: 'Vortex Growth Digital Agency',
    stats: { label: 'Local Inquiries', value: '+92%' },
    recommendedServices: ['SEO & Digital Visibility', 'AI Automation', 'Lead Generation', 'Website Development'],
  },
  {
    id: 'startups',
    slug: 'startups',
    title: 'Startups',
    subtitle: 'High-velocity growth infrastructure built to impress investors and acquire users.',
    iconName: 'Rocket',
    gradient: 'from-purple-500/20 via-indigo-500/10 to-transparent',
    accentColor: 'text-purple-400',
    description: 'Launch fast and scale hard with modern developer-grade web applications, interactive product demos, automated onboarding, and analytics dashboards.',
    challenges: [
      'Need to launch in days, not months, to validate product-market fit',
      'Communicating complex technical value propositions to non-technical buyers',
      'Building automated sales pipelines with lean founding teams',
    ],
    aiSolutions: [
      'Autonomous AI SDR agents that prospect and personalize outbound outreach',
      'Interactive sandbox product demo widgets that show value without sales calls',
      'Automated analytics anomaly alerts and user activation tracking',
    ],
    marketingStrategy: [
      'Product-led growth (PLG) viral loops and interactive tool marketing',
      'High-velocity programmatic SEO and developer documentation engines',
      'Founder-led branding and launch campaigns on Product Hunt and Twitter/X',
    ],
    niches: [
      'B2B SaaS & Tech Startups',
      'AI & Web3 Companies',
      'Fintech & Developer Tool Founders',
      'Venture-Backed Scale-ups',
    ],
    features: [
      'Interactive feature simulator & ROI calculator',
      'Self-serve pricing tier switchers (monthly / annual)',
      'Product changelog & API documentation integration',
      'Custom webhook sync to Stripe and Segment',
    ],
    matchingDemoSlug: 'ai-agency',
    matchingDemoName: 'NexusAI Automation Agency',
    stats: { label: 'Time-to-Market', value: '5 Days' },
    recommendedServices: ['AI Business Solutions', 'AI Automation', 'Website & Landing Pages', 'Lead Generation'],
  },
  {
    id: 'creators',
    slug: 'creators',
    title: 'Creators',
    subtitle: 'Monetize your audience and build an owned digital ecosystem that scales.',
    iconName: 'UserCheck',
    gradient: 'from-orange-500/20 via-amber-500/10 to-transparent',
    accentColor: 'text-orange-400',
    description: 'Transform social followers into direct email subscribers, paying sponsors, and digital product buyers on your own custom domain.',
    challenges: [
      'Platform risk and algorithm changes threatening audience reach',
      'Manual sponsorship outreach and media kit updates taking hours',
      'Low conversion rates when linking out to fragmented third-party bio tools',
    ],
    aiSolutions: [
      'AI Content Repurposing pipeline (1 video → 5 tweets, 1 newsletter, 2 blog posts)',
      'Automated sponsorship inquiry rate card & intake filter',
      'AI newsletter draft generator customized to your personal writing style',
    ],
    marketingStrategy: [
      'High-converting newsletter landing pages with instant freebie deliveries',
      'Digital product checkout funnels (eBooks, templates, presets)',
      'Direct sponsor showcase and interactive sponsorship availability calendar',
    ],
    niches: [
      'YouTubers & Podcasters',
      'Newsletter Writers & Substack Authors',
      'Designers & Template Creators',
      'Keynote Speakers & Industry Influencers',
    ],
    features: [
      'Direct media kit and sponsor deck download hub',
      'Podcast / YouTube episode player embed library',
      '1-Click digital asset checkout with Stripe',
      'Custom email list opt-in micro-forms',
    ],
    matchingDemoSlug: 'personal-brand',
    matchingDemoName: 'Marcus Vance — Speaker & Strategist',
    stats: { label: 'Email List Growth', value: '+140%' },
    recommendedServices: ['AI Content Systems', 'Email Marketing', 'Website & Landing Pages', 'Social Media Marketing'],
  },
  {
    id: 'ecommerce',
    slug: 'ecommerce',
    title: 'E-commerce Businesses',
    subtitle: 'High-converting online storefronts and automated buyer recovery funnels.',
    iconName: 'ShoppingBag',
    gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    accentColor: 'text-emerald-400',
    description: 'Maximize your average order value (AOV) and customer lifetime value with lightning-fast landing pages, intelligent upselling, and automated retention.',
    challenges: [
      'High cart abandonment rates on sluggish third-party storefronts',
      'Skyrocketing paid advertising customer acquisition costs (CAC)',
      'Manual customer support answering repetitive shipping and return questions',
    ],
    aiSolutions: [
      'AI Shopping Assistant for personalized product recommendations',
      'Automated abandoned cart SMS & email recovery sequences with dynamic discounts',
      '24/7 AI Order Tracking & Returns support assistant',
    ],
    marketingStrategy: [
      'High-converting product landing pages with interactive before/after showcases',
      'Targeted Meta & TikTok ad campaigns with user-generated content (UGC)',
      'VIP customer loyalty and post-purchase win-back email automations',
    ],
    niches: [
      'Direct-to-Consumer (DTC) Brands',
      'Digital Downloads & Software Stores',
      'Apparel & Lifestyle Brands',
      'Subscription Box Companies',
    ],
    features: [
      'Lightning-fast checkout optimized for mobile conversion',
      'Interactive product customizers and bundle builders',
      'Real-time customer review & photo galleries',
      'Automated shipping tracking & CRM integration',
    ],
    matchingDemoSlug: 'fitness-coach',
    matchingDemoName: 'Apex Athletic Performance',
    stats: { label: 'Cart Recovery Rate', value: '28.4%' },
    recommendedServices: ['AI Chatbots', 'Email Marketing', 'Lead Generation', 'Website & Landing Pages'],
  },
];
