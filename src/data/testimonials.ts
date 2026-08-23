export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  rating: number;
  industry: string;
  results: string;
  demoCustomized: string;
}

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 't-1',
    name: 'Dr. Evelyn Martinez',
    role: 'Founder & Medical Director',
    company: 'Evergreen Health & Longevity',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=80',
    quote: 'Being able to see and interact with the Health Clinic demo before making a decision gave our board complete confidence. DigitalFlowHub launched our customized portal in just 6 days, and our patient online booking skyrocketed by 84%.',
    rating: 5,
    industry: 'Healthcare & Wellness',
    results: '+84% Online Appointments',
    demoCustomized: 'Modern Health Clinic Demo',
  },
  {
    id: 't-2',
    name: 'Julian Sterling, CFP®',
    role: 'Managing Partner',
    company: 'Sterling Crest Private Wealth',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    quote: 'Traditional digital agencies quoted us 3 months and $25,000 without even showing us a design. With DigitalFlowHub, we picked the Wealth Advisor concept, customized the fiduciary calculator, and were live the following week. Our clients love the luxury feel.',
    rating: 5,
    industry: 'Wealth & Finance',
    results: '$14M New Inflows in 60 Days',
    demoCustomized: 'Aura Capital Wealth Demo',
  },
  {
    id: 't-3',
    name: 'Elena Rostova',
    role: 'Course Creator & Keynote Speaker',
    company: 'NextGen Design Academy',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    quote: 'The Education Academy demo was 95% of what I had envisioned in my mind for years. The team swapped our branding, connected our Stripe checkout, and our next cohort sold out 3 days ahead of schedule.',
    rating: 5,
    industry: 'Education & EdTech',
    results: 'Sold Out Cohort in 72 Hrs',
    demoCustomized: 'SkillForge Online Academy Demo',
  },
  {
    id: 't-4',
    name: 'Darius Vance',
    role: 'Founder & AI Architect',
    company: 'Synapse Flow AI',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    quote: 'The dark futuristic aesthetic of the AI Agency demo instantly communicated our deep technical capability. Clients constantly remark on how sleek and interactive our site is.',
    rating: 5,
    industry: 'AI & Automation',
    results: '4.2x Client Conversion',
    demoCustomized: 'NexusAI Automation Demo',
  },
];
