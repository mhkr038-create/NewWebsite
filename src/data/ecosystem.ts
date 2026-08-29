export interface HowItWorksStep {
  stepNumber: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
  deliverables: string[];
}

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    stepNumber: '01',
    title: 'Understand Your Business',
    tagline: 'Deep Discovery & Audit',
    description: 'We analyze your target market, buyer personas, existing marketing channels, and conversion bottlenecks to identify your greatest growth leverage.',
    icon: 'Search',
    deliverables: [
      'Competitor & audience analysis',
      'Conversion leak & bottleneck audit',
      'Offer positioning assessment',
    ],
  },
  {
    stepNumber: '02',
    title: 'Create a Growth Strategy',
    tagline: 'Custom Architecture & Plan',
    description: 'We engineer a tailored roadmap combining high-converting landing pages, targeted paid advertising channels, SEO content, and WhatsApp automation flows.',
    icon: 'Compass',
    deliverables: [
      'Customer journey & funnel blueprint',
      'Ad creative & channel strategy',
      'Automated conversation scripts',
    ],
  },
  {
    stepNumber: '03',
    title: 'Launch Marketing & Automation',
    tagline: 'Rapid Execution & Deployment',
    description: 'We design, code, and deploy your custom landing pages, set up tracking pixels, launch targeted Google and Meta ad campaigns, and activate WhatsApp bots.',
    icon: 'Rocket',
    deliverables: [
      'Sub-second React landing pages',
      'Live ad campaigns on Meta & Google',
      '24/7 WhatsApp API chatbots',
    ],
  },
  {
    stepNumber: '04',
    title: 'Track, Optimize & Scale',
    tagline: 'Continuous ROI Compounding',
    description: 'We continuously monitor CPA, ROAS, and conversion rates, pruning underperforming ads, A/B testing page variations, and scaling winning channels.',
    icon: 'TrendingUp',
    deliverables: [
      'Transparent weekly performance data',
      'Continuous A/B split testing',
      'Budget scaling on winning assets',
    ],
  },
];

export interface EcosystemNode {
  id: string;
  title: string;
  subtitle: string;
  category: 'traffic' | 'destination' | 'capture' | 'automation' | 'nurture' | 'conversion';
  icon: string;
  description: string;
  accentColor: string;
}

export const ECOSYSTEM_NODES: EcosystemNode[] = [
  {
    id: 'traffic-sources',
    title: 'Google Ads / Meta Ads / Blog SEO',
    subtitle: 'High-Intent & Targeted Traffic',
    category: 'traffic',
    icon: 'TrendingUp',
    description: 'Attract ready-to-buy searchers and engage high-value prospects with targeted paid ads and organic content.',
    accentColor: 'from-indigo-500 to-cyan-500',
  },
  {
    id: 'landing-page',
    title: 'High-Converting Landing Page',
    subtitle: 'Zero Distraction UX',
    category: 'destination',
    icon: 'Layout',
    description: 'Deliver sub-second speed, persuasive message match, and 1:1 conversion focus to maximize click-to-lead rates.',
    accentColor: 'from-cyan-500 to-teal-500',
  },
  {
    id: 'lead-capture',
    title: 'Lead Capture & Qualification',
    subtitle: 'Frictionless Forms & Magnets',
    category: 'capture',
    icon: 'Target',
    description: 'Capture verified contact information through high-value guides, interactive quizzes, and appointment schedulers.',
    accentColor: 'from-purple-500 to-indigo-500',
  },
  {
    id: 'whatsapp-automation',
    title: 'WhatsApp Automation & Chatbots',
    subtitle: 'Instant Sub-60s Response',
    category: 'automation',
    icon: 'MessageSquare',
    description: 'Engage leads immediately via official WhatsApp API, answer questions 24/7, and pre-qualify buyer criteria.',
    accentColor: 'from-emerald-500 to-cyan-500',
  },
  {
    id: 'nurturing',
    title: 'Follow-up & Nurturing Engine',
    subtitle: 'Automated Multi-Touch Cadence',
    category: 'nurture',
    icon: 'Workflow',
    description: 'Send scheduled case studies, consultation reminders, and objection-handling messages automatically.',
    accentColor: 'from-amber-500 to-rose-500',
  },
  {
    id: 'conversion',
    title: 'Customer Conversion & Sales',
    subtitle: 'Predictable Revenue Generation',
    category: 'conversion',
    icon: 'Award',
    description: 'Turn warm prospects into paying clients, booked meetings, and recurring digital product revenue.',
    accentColor: 'from-emerald-400 to-teal-400',
  },
];

export interface WhyChooseBenefit {
  id: string;
  title: string;
  description: string;
  icon: string;
  badge: string;
}

export const WHY_CHOOSE_BENEFITS: WhyChooseBenefit[] = [
  {
    id: 'conversion-focused',
    title: 'Conversion-Focused Strategy',
    description: 'Every headline, layout, ad hook, and button is engineered with buyer psychology to turn traffic into measurable revenue.',
    icon: 'Target',
    badge: 'Conversion First',
  },
  {
    id: 'modern-digital-solutions',
    title: 'Modern Digital Solutions',
    description: 'We build high-performance web systems using cutting-edge technology that loads instantly and ranks on modern search engines.',
    icon: 'Sparkles',
    badge: 'State of the Art',
  },
  {
    id: 'automation-driven',
    title: 'Automation-Driven Approach',
    description: 'We eliminate manual response delays with 24/7 WhatsApp API bots, webhook syncs, and automated nurturing workflows.',
    icon: 'Zap',
    badge: 'Zero Delay',
  },
  {
    id: 'data-informed',
    title: 'Data-Informed Optimization',
    description: 'We do not rely on guesswork; our decisions are guided by real-time conversion metrics, A/B test results, and ROAS data.',
    icon: 'BarChart3',
    badge: 'Data Driven',
  },
  {
    id: 'scalable-systems',
    title: 'Scalable Marketing Systems',
    description: 'We build complete growth ecosystems designed to handle increasing lead volume smoothly without increasing team overhead.',
    icon: 'Layers',
    badge: 'Built to Scale',
  },
  {
    id: 'clear-communication',
    title: 'Clear & Transparent Communication',
    description: 'No jargon or vanity metrics. You get honest, clear reporting on what matters: leads, customer acquisition cost, and revenue.',
    icon: 'ShieldCheck',
    badge: '100% Transparent',
  },
];
