export type DemoCategory =
  | 'health'
  | 'wealth'
  | 'education'
  | 'coaching'
  | 'business'
  | 'personal-brand'
  | 'digital';

export interface DemoItem {
  id: string;
  name: string;
  slug: string;
  category: DemoCategory;
  categoryLabel: string;
  description: string;
  shortTagline: string;
  previewImage: string;
  route: string;
  tags: string[];
  featured?: boolean;
  colorTheme: {
    primary: string;
    accent: string;
    badge: string;
    gradient: string;
  };
  stats: { label: string; value: string }[];
  features: string[];
  idealFor: string[];
  rating: number;
  reviewsCount: number;
}

export const DEMO_REGISTRY: DemoItem[] = [
  {
    id: 'health-clinic',
    name: 'Modern Health Clinic & Wellness',
    slug: 'health-clinic',
    category: 'health',
    categoryLabel: 'Health & Wellness',
    description: 'A calming, patient-first healthcare and medical practice website with interactive doctor schedules, telemedicine booking, and clinical service showcase.',
    shortTagline: 'Calm, trustworthy healthcare & wellness portal',
    previewImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
    route: '/demo/health-clinic',
    tags: ['Health Clinic', 'Telehealth', 'Doctors', 'Medical', 'Wellness', 'Online Booking'],
    featured: true,
    colorTheme: {
      primary: '#0d9488',
      accent: '#14b8a6',
      badge: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
      gradient: 'from-teal-600 to-emerald-600',
    },
    stats: [
      { label: 'Patient Trust Score', value: '99.4%' },
      { label: 'Avg Booking Speed', value: '45 sec' },
      { label: 'Specialists Included', value: '18+' },
    ],
    features: [
      'Interactive Doctor Appointment Booking Wizard',
      'Specialist Profiles with Credential Badges',
      'Clinical Services & Department Explorer',
      'Emergency Contact & Telehealth Triage Card',
      'Patient Reviews with Filterable Conditions',
    ],
    idealFor: ['Private Clinics', 'Medical Groups', 'Wellness Centers', 'Physiotherapy & Dental'],
    rating: 4.9,
    reviewsCount: 38,
  },
  {
    id: 'wealth-advisor',
    name: 'Aura Capital Wealth Advisors',
    slug: 'wealth-advisor',
    category: 'wealth',
    categoryLabel: 'Wealth & Finance',
    description: 'A sophisticated, high-net-worth wealth management platform featuring portfolio philosophies, compound growth calculators, and private fiduciary consultation booking.',
    shortTagline: 'Luxe wealth management & private client advisory',
    previewImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    route: '/demo/wealth-advisor',
    tags: ['Financial Advisor', 'Wealth Management', 'Family Office', 'Investment', 'Fiduciary'],
    featured: true,
    colorTheme: {
      primary: '#0f172a',
      accent: '#eab308',
      badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      gradient: 'from-amber-500 to-yellow-600',
    },
    stats: [
      { label: 'AUM Supported', value: '$850M+' },
      { label: 'Fiduciary Standard', value: '100%' },
      { label: 'Avg Client Growth', value: '+14.2% YoY' },
    ],
    features: [
      'Interactive 30-Year Compounding Wealth Calculator',
      'Institutional Investment Philosophy Breakdown',
      'Private Family Office & Estate Planning Portfolios',
      'CFP® / CFA® Credential Showcases',
      'Confidential Strategy Session Consultation Form',
    ],
    idealFor: ['Wealth Managers', 'Independent RIAs', 'Tax Consultants', 'Family Offices'],
    rating: 5.0,
    reviewsCount: 42,
  },
  {
    id: 'education-academy',
    name: 'SkillForge Online Academy',
    slug: 'education-academy',
    category: 'education',
    categoryLabel: 'Education & Courses',
    description: 'A high-converting online learning academy and course platform with interactive syllabus viewer, live cohort countdowns, and student career outcomes.',
    shortTagline: 'Modern cohort learning & course certification platform',
    previewImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
    route: '/demo/education-academy',
    tags: ['Online Academy', 'Course Creator', 'EdTech', 'Cohorts', 'Certification'],
    featured: true,
    colorTheme: {
      primary: '#6366f1',
      accent: '#a855f7',
      badge: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
      gradient: 'from-indigo-600 to-violet-600',
    },
    stats: [
      { label: 'Active Students', value: '24,000+' },
      { label: 'Course Completion', value: '94%' },
      { label: 'Salary Uplift Avg', value: '+42%' },
    ],
    features: [
      'Filterable Course Catalog by Level & Category',
      'Interactive Course Syllabus Modal Preview',
      'Student Alumni Placement Wall (Google, Meta, Stripe)',
      'Live Cohort Enrollment Timer & Early-Bird Discount',
      'Instructor Verified Credentials & Video Teasers',
    ],
    idealFor: ['Course Creators', 'Coding Bootcamps', 'Executive Training', 'Tutors & Institutes'],
    rating: 4.9,
    reviewsCount: 56,
  },
  {
    id: 'relationship-coach',
    name: 'Harmony Coaching & Life Transformation',
    slug: 'relationship-coach',
    category: 'coaching',
    categoryLabel: 'Relationship & Coaching',
    description: 'A heartfelt, deeply empathetic coaching website for relationship mentors and life coaches with free assessment quiz, client breakthroughs, and discovery call bookings.',
    shortTagline: 'Empathetic guidance for modern relationships & life clarity',
    previewImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80',
    route: '/demo/relationship-coach',
    tags: ['Relationship Coach', 'Life Coaching', 'Discovery Call', 'Couples Therapy', 'Mindset'],
    featured: true,
    colorTheme: {
      primary: '#ea580c',
      accent: '#f43f5e',
      badge: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
      gradient: 'from-rose-500 to-orange-500',
    },
    stats: [
      { label: 'Couples & Clients Reconnected', value: '1,200+' },
      { label: 'Client Breakthrough Rate', value: '96%' },
      { label: 'Podcast Listeners', value: '150k+' },
    ],
    features: [
      'Free 2-Minute Relationship Health Assessment',
      'Signature 1-on-1 and Couples Intensive Programs',
      'Real Client Transformation Journey Stories',
      'Interactive Discovery Call Booking Calendar',
      'Podcast Episodes & Recommended Guides',
    ],
    idealFor: ['Relationship Coaches', 'Life Mentors', 'Couples Counselors', 'Executive Mindset Coaches'],
    rating: 4.9,
    reviewsCount: 29,
  },
  {
    id: 'ai-agency',
    name: 'NexusAI Automation Agency',
    slug: 'ai-agency',
    category: 'digital',
    categoryLabel: 'AI & Automation',
    description: 'A futuristic dark-mode agency website featuring live prompt demo simulation, autonomous agent workflows, interactive ROI savings calculator, and case studies.',
    shortTagline: 'Autonomous AI agents & enterprise workflow automation',
    previewImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    route: '/demo/ai-agency',
    tags: ['AI Automation', 'LLM Agents', 'Workflows', 'Custom AI', 'Agency'],
    featured: true,
    colorTheme: {
      primary: '#06b6d4',
      accent: '#8b5cf6',
      badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
      gradient: 'from-cyan-500 to-blue-600',
    },
    stats: [
      { label: 'Hours Saved Monthly', value: '120k+' },
      { label: 'Client ROI Average', value: '8.4x' },
      { label: 'Autonomous Agents Built', value: '450+' },
    ],
    features: [
      'Interactive AI Agent Prompt Execution Sandbox',
      'Automated Workflow ROI & Cost Savings Calculator',
      'Live Enterprise Case Studies with Metric Graphs',
      '4-Step Rapid Integration Blueprint',
      'VIP Architecture Consultation Scheduler',
    ],
    idealFor: ['AI Agencies', 'Automation Consultants', 'SaaS Founders', 'B2B Tech Services'],
    rating: 5.0,
    reviewsCount: 64,
  },
  {
    id: 'personal-brand',
    name: 'Marcus Vance — Speaker & Tech Strategist',
    slug: 'personal-brand',
    category: 'personal-brand',
    categoryLabel: 'Personal Brand',
    description: 'An ultra-clean, high-impact personal brand and speaker portfolio with keynote reels, press mentions, media kit downloads, and direct speaking event booking.',
    shortTagline: 'High-impact personal brand, keynotes & advisory',
    previewImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80',
    route: '/demo/personal-brand',
    tags: ['Personal Brand', 'Keynote Speaker', 'Author', 'Advisor', 'Consultant'],
    featured: false,
    colorTheme: {
      primary: '#f97316',
      accent: '#fbbf24',
      badge: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
      gradient: 'from-orange-500 to-amber-500',
    },
    stats: [
      { label: 'Keynotes Delivered', value: '120+' },
      { label: 'Newsletter Readers', value: '85k+' },
      { label: 'Global Stage Attendees', value: '250k+' },
    ],
    features: [
      'Interactive Keynote Topic Explorer & Speaker Reel',
      'Press Kit & High-Resolution Headshot Download Hub',
      'Curated Essays & Best-Selling Book Highlights',
      'Advisory Roster with Board Member Testimonials',
      'Speaking Engagement Booking Request Form',
    ],
    idealFor: ['Keynote Speakers', 'Executive Consultants', 'Content Creators', 'Authors & Thought Leaders'],
    rating: 4.9,
    reviewsCount: 22,
  },
  {
    id: 'digital-agency',
    name: 'Vortex Growth Digital Agency',
    slug: 'digital-agency',
    category: 'business',
    categoryLabel: 'Digital Business',
    description: 'A vibrant, metrics-driven growth marketing agency website with interactive free audit generator, live revenue multipliers, and service tier comparison.',
    shortTagline: 'Performance growth marketing for scale-ups',
    previewImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    route: '/demo/digital-agency',
    tags: ['Digital Agency', 'Performance Ads', 'Growth Marketing', 'SEO', 'Conversion Rate'],
    featured: false,
    colorTheme: {
      primary: '#3b82f6',
      accent: '#ec4899',
      badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      gradient: 'from-blue-600 to-pink-600',
    },
    stats: [
      { label: 'Client Revenue Generated', value: '$45M+' },
      { label: 'Avg ROAS Across Campaigns', value: '4.8x' },
      { label: 'Growth Sprints Run', value: '280+' },
    ],
    features: [
      'Instant Free Website Growth Audit Simulator',
      'Performance Marketing & Paid Ads Breakdown',
      'Interactive Case Studies with Verified Metrics',
      'Transparent Monthly Retainer & Sprint Packages',
      'Direct Strategy Call Scheduler',
    ],
    idealFor: ['Marketing Agencies', 'Creative Studios', 'SEO Agencies', 'Growth Consultancies'],
    rating: 4.8,
    reviewsCount: 31,
  },
  {
    id: 'fitness-coach',
    name: 'Apex Athletic Performance & Nutrition',
    slug: 'fitness-coach',
    category: 'health',
    categoryLabel: 'Health & Fitness',
    description: 'An energetic, bold athletic coaching website with before-and-after transformation slider, custom macro & calorie calculator, and 7-day challenge signup.',
    shortTagline: 'Transformative fitness, custom nutrition & online training',
    previewImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
    route: '/demo/fitness-coach',
    tags: ['Fitness Coach', 'Personal Trainer', 'Nutrition', 'Workout Plans', 'Transformation'],
    featured: false,
    colorTheme: {
      primary: '#84cc16',
      accent: '#22c55e',
      badge: 'bg-lime-500/10 text-lime-400 border-lime-500/20',
      gradient: 'from-lime-500 to-emerald-500',
    },
    stats: [
      { label: 'Bodies Transformed', value: '3,400+' },
      { label: 'Lbs Fat Lost Combined', value: '48k+' },
      { label: 'Workout App Rating', value: '4.9 ★' },
    ],
    features: [
      'Interactive Before/After Client Transformation Slider',
      'Instant Calorie & Daily Macro Target Calculator',
      '1-on-1 Custom Coaching vs App Access Breakdown',
      'Client Video Testimonials & Meal Plan Showcase',
      'Free 7-Day Performance Challenge Signup Form',
    ],
    idealFor: ['Personal Trainers', 'Fitness Influencers', 'CrossFit Gyms', 'Nutritionists'],
    rating: 4.9,
    reviewsCount: 45,
  },
];

export const DEMO_CATEGORIES = [
  { id: 'all', label: 'All Demos' },
  { id: 'health', label: 'Health & Wellness' },
  { id: 'wealth', label: 'Wealth & Finance' },
  { id: 'education', label: 'Education' },
  { id: 'coaching', label: 'Coaching' },
  { id: 'business', label: 'Business' },
  { id: 'personal-brand', label: 'Personal Brand' },
  { id: 'digital', label: 'Digital & AI' },
] as const;
