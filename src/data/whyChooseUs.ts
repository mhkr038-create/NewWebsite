export interface WhyChooseUsItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  badge: string;
  metric: string;
}

export const WHY_CHOOSE_US_DATA: WhyChooseUsItem[] = [
  {
    id: 'ai-focused',
    title: 'AI-Focused Approach',
    description: 'We do not treat AI as a buzzword; we implement practical, custom-trained intelligence systems that solve real operational bottlenecks.',
    icon: 'Brain',
    badge: 'Intelligence',
    metric: '10x Efficiency',
  },
  {
    id: 'automation-first',
    title: 'Automation-First Thinking',
    description: 'If a workflow can be automated without human error, it should be. We help your business run smoothly on autopilot 24/7.',
    icon: 'Zap',
    badge: 'Productivity',
    metric: '30+ hrs/wk Saved',
  },
  {
    id: 'business-focused',
    title: 'Business-Focused Solutions',
    description: 'Every design, bot, and funnel we build is tied directly to measurable commercial goals: revenue, lead volume, and customer retention.',
    icon: 'Target',
    badge: 'Revenue First',
    metric: '4.8x Avg ROAS',
  },
  {
    id: 'modern-digital-strategy',
    title: 'Modern Digital Strategy',
    description: 'We blend high-converting aesthetic design, sub-second web performance, SEO architecture, and paid customer acquisition.',
    icon: 'Compass',
    badge: 'Full-Stack',
    metric: '100% Owned Code',
  },
  {
    id: 'customized-solutions',
    title: 'Customized Solutions',
    description: 'No cookie-cutter generic templates. We tailor every color palette, workflow integration, copy nuance, and database schema to your brand.',
    icon: 'SlidersHorizontal',
    badge: 'Tailor-Made',
    metric: 'Zero SaaS Lock-in',
  },
  {
    id: 'long-term-growth',
    title: 'Long-Term Growth Mindset',
    description: 'We act as your dedicated digital growth partner, iterating, optimizing, and supporting your systems as your operations scale.',
    icon: 'TrendingUp',
    badge: 'Partnership',
    metric: '98% Client SLA',
  },
];
