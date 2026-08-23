export interface SolutionCategory {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  gradient: string;
  accentColor: string;
  description: string;
  niches: string[];
  features: string[];
  matchingDemoSlug: string;
  stats: { label: string; value: string };
}

export const SOLUTIONS_DATA: SolutionCategory[] = [
  {
    id: 'health-wellness',
    title: 'Health & Wellness',
    subtitle: 'Calming, trustworthy, and patient-converting digital portals.',
    iconName: 'HeartPulse',
    gradient: 'from-teal-500/20 via-emerald-500/10 to-transparent',
    accentColor: 'text-teal-400',
    description: 'Provide patients and clients with a reassuring, serene digital sanctuary. Build immediate credibility, showcase specialized treatments, and enable effortless 24/7 online appointment booking.',
    niches: [
      'Health & Medical Clinics',
      'Wellness & Mindset Coaches',
      'Fitness & Performance Studios',
      'Nutrition Consultants & Dietitians',
      'Dental, Physio & Holistic Practices',
    ],
    features: [
      'One-click patient booking with calendar confirmation',
      'Practitioner bio cards with verified medical credentials',
      'Patient intake pre-screening forms',
      'HIPAA / GDPR compliant privacy and security layout',
    ],
    matchingDemoSlug: 'health-clinic',
    stats: { label: 'Avg Booking Increase', value: '+68%' },
  },
  {
    id: 'wealth-finance',
    title: 'Wealth & Finance',
    subtitle: 'High-net-worth aesthetic, fiduciary trust, and financial clarity.',
    iconName: 'TrendingUp',
    gradient: 'from-amber-500/20 via-yellow-500/10 to-transparent',
    accentColor: 'text-amber-400',
    description: 'Establish unmatched institutional prestige. Attract high-net-worth individuals, demonstrate rigorous investment methodologies, and provide interactive retirement planning tools.',
    niches: [
      'Independent Financial Advisors (RIAs)',
      'Wealth & Asset Management Firms',
      'Investment & Crypto Mentors',
      'Corporate & M&A Business Consultants',
      'Family Offices & Tax Strategists',
    ],
    features: [
      'Interactive compounding growth calculators',
      'Institutional asset allocation diagrams',
      'Fiduciary pledge & compliance disclosures',
      'Confidential high-net-worth inquiry portals',
    ],
    matchingDemoSlug: 'wealth-advisor',
    stats: { label: 'Qualified Inquiries', value: '+84%' },
  },
  {
    id: 'education',
    title: 'Education & Academies',
    subtitle: 'Engaging, modern learning hubs that turn curious minds into enrolled students.',
    iconName: 'GraduationCap',
    gradient: 'from-indigo-500/20 via-violet-500/10 to-transparent',
    accentColor: 'text-indigo-400',
    description: 'Showcase your curriculum with crisp video teasers, cohort timelines, interactive lesson previews, and unmistakable graduate career transformation metrics.',
    niches: [
      'Coaching Institutes & Bootcamps',
      'Online Course Creators & Academies',
      'Private Tutors & Mentorship Guilds',
      'Corporate Training Organizations',
      'Language & Skill Certification Centers',
    ],
    features: [
      'Interactive course catalog with syllabus preview modal',
      'Live cohort countdown timer and early bird discounts',
      'Student project showcases & hiring partner logos',
      'Automated checkout with multi-currency support',
    ],
    matchingDemoSlug: 'education-academy',
    stats: { label: 'Enrollment Conversion', value: '+52%' },
  },
  {
    id: 'relationship-coaching',
    title: 'Relationship & Coaching',
    subtitle: 'Deeply resonant, emotionally connected platforms for transformational guides.',
    iconName: 'Sparkles',
    gradient: 'from-rose-500/20 via-orange-500/10 to-transparent',
    accentColor: 'text-rose-400',
    description: 'Connect deeply with people looking for guidance, healing, and clarity. Present your personal story, signature methodology, and make booking discovery calls warm and inviting.',
    niches: [
      'Relationship & Couples Coaches',
      'Transformational Life Coaches',
      'Executive & Leadership Mentors',
      'Personal Development Guides',
      'Mindfulness & Somatic Practitioners',
    ],
    features: [
      'Interactive self-assessment & quiz funnels',
      'Signature program breakdown & pricing tiers',
      'Authentic video & audio client breakthroughs',
      'Direct Calendly / Acuity discovery call embed',
    ],
    matchingDemoSlug: 'relationship-coach',
    stats: { label: 'Discovery Calls Booked', value: '3.4x' },
  },
  {
    id: 'business',
    title: 'Business & Digital Agencies',
    subtitle: 'High-energy, conversion-obsessed websites that close high-ticket contracts.',
    iconName: 'Building2',
    gradient: 'from-blue-500/20 via-cyan-500/10 to-transparent',
    accentColor: 'text-blue-400',
    description: 'Cut through the noise with bold typography, verified case study revenue metrics, interactive service estimators, and high-converting audit request tools.',
    niches: [
      'Local Service Businesses',
      'High-Growth Tech Startups',
      'Digital & Creative Agencies',
      'B2B Professional Services',
      'Consulting & Engineering Firms',
    ],
    features: [
      'Interactive website audit request generator',
      'Detailed case study ROI metric breakdowns',
      'Transparent service packages & retainers',
      'Instant proposal request & file upload forms',
    ],
    matchingDemoSlug: 'digital-agency',
    stats: { label: 'Average Deal Size', value: '+75%' },
  },
  {
    id: 'personal-brand',
    title: 'Personal Brand & Creators',
    subtitle: 'Authority-building digital headquarters for speakers, creators, and experts.',
    iconName: 'UserCheck',
    gradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
    accentColor: 'text-orange-400',
    description: 'Own your audience. Showcase your keynote speaking reels, press features, published books, podcast episodes, and monetize with direct brand advisory bookings.',
    niches: [
      'Keynote Speakers & Emcees',
      'Executive Advisors & Board Consultants',
      'Freelancers & High-End Specialists',
      'Content Creators & Newsletter Authors',
      'Bestselling Authors & Thought Leaders',
    ],
    features: [
      'Keynote topic matrix & speaker reel player',
      'Press & media kit instant download hub',
      'Curated articles & podcast episode library',
      'VIP speaking inquiry and rate card request',
    ],
    matchingDemoSlug: 'personal-brand',
    stats: { label: 'Speaker Inquiries', value: '+120%' },
  },
];
