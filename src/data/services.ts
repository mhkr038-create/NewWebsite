export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  tag: string;
  benefits: string[];
  deliverables: string[];
  timeline: string;
  startingPrice: string;
  popular?: boolean;
}

export const SERVICES_REGISTRY: ServiceItem[] = [
  {
    id: 'custom-dev',
    title: 'Custom Website Development',
    shortDesc: 'Choose an existing demo and customize it from the ground up for your specific brand identity, domain, and unique business workflow.',
    fullDesc: 'We take the proven high-converting structure of any digitalsimplesolution demo and turn it into a bespoke, pixel-perfect production website tailored entirely to your brand colors, assets, copy, and backend integrations.',
    iconName: 'LayoutTemplate',
    tag: 'Flagship Service',
    benefits: [
      'Zero guesswork — see the exact UX before building',
      'Lightning-fast delivery (usually 5 to 7 days)',
      '100% responsive across mobile, tablet, and widescreen',
      'SEO-optimized architecture with perfect Lighthouse scores',
    ],
    deliverables: [
      'Complete React / Next.js production codebase',
      'Custom branding, logo adaptation & high-res media',
      'Interactive contact / booking / lead capture system',
      'Domain setup, DNS configuration & SSL deployment',
      '30 days of post-launch warranty & technical support',
    ],
    timeline: '5-7 Business Days',
    startingPrice: '₹45,000',
    popular: true,
  },
  {
    id: 'website-customization',
    title: 'Website Customization & Rebranding',
    shortDesc: 'Modify design, colors, content, sections, interactive modules, and branding elements on an existing digital architecture.',
    fullDesc: 'Need specific modifications to one of our demos or your existing web assets? Our engineering team swaps layouts, redesigns sections, adds dynamic calculators, rewires booking flows, and refreshes your entire visual identity.',
    iconName: 'Wand2',
    tag: 'Flexible Retainer',
    benefits: [
      'Tailored section additions and layout restyling',
      'Custom typography and custom color palettes',
      'Integration with your existing CRM, Mailchimp, or Calendly',
      'Performance audit and load speed acceleration',
    ],
    deliverables: [
      'Figma prototype review before implementation',
      'Restyled component modules and responsive tweaks',
      'Third-party script & webhook integration',
      'Cross-browser and cross-device testing report',
    ],
    timeline: '3-5 Business Days',
    startingPrice: '₹25,000',
  },
  {
    id: 'digital-biz-solutions',
    title: 'Digital Business Solutions',
    shortDesc: 'End-to-end digital infrastructure for businesses and personal brands, including conversion funnels, client portals, and checkout flows.',
    fullDesc: 'Transform your website from a digital brochure into an automated revenue-generating asset. We design client onboarding portals, digital product stores, membership paywalls, and high-converting landing page funnels.',
    iconName: 'Zap',
    tag: 'Growth Accelerator',
    benefits: [
      'Monetize your expertise with automated checkouts',
      'Seamless lead qualification and booking journeys',
      'Scalable cloud hosting and zero maintenance headaches',
      'Actionable Google Analytics 4 & conversion tracking',
    ],
    deliverables: [
      'Digital product checkout & payment gateway setup (Razorpay/Stripe)',
      'Automated email notification sequences',
      'Lead magnet download funnels & landing pages',
      'Client onboarding intake dashboards',
    ],
    timeline: '7-10 Business Days',
    startingPrice: '₹65,000',
  },
  {
    id: 'ai-automation-solutions',
    title: 'AI and Automation Solutions',
    shortDesc: 'Integrate custom AI chatbots, autonomous customer service agents, automated CRM pipelines, and intelligent workflows.',
    fullDesc: 'Supercharge your new website with state-of-the-art AI capabilities. We build custom-trained AI chatbots that answer customer questions 24/7, book appointments automatically, sync leads with your CRM, and draft proposals without manual intervention.',
    iconName: 'Bot',
    tag: 'Next-Gen AI',
    benefits: [
      'Save 30+ hours weekly on repetitive manual tasks',
      'Instant 24/7 customer response with zero human delay',
      'Custom trained on your unique business knowledge base',
      'Connects seamlessly to Slack, Notion, Gmail, and HubSpot',
    ],
    deliverables: [
      'Trained AI knowledge base assistant widget',
      'Automated lead qualification & triage webhook pipelines',
      'n8n / Make.com / Zapier automation architecture',
      'Admin monitoring dashboard & conversation transcript review',
    ],
    timeline: '5-8 Business Days',
    startingPrice: '₹55,000',
  },
];
