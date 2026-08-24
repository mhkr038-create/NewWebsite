export interface AiServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  icon: string;
  tag: string;
  keyBenefits: string[];
  features: string[];
  deliverables: string[];
  startingPrice: string;
  timeline: string;
  popular?: boolean;
}

export const AI_SERVICES_DATA: AiServiceItem[] = [
  {
    id: 'ai-automation',
    title: 'AI Automation',
    shortDesc: 'Automate repetitive business tasks and workflows using AI and automation tools.',
    fullDesc: 'Eliminate manual bottlenecks with autonomous AI pipelines that handle data processing, document extraction, automated customer follow-ups, and cross-platform task routing 24/7.',
    icon: 'Bot',
    tag: 'Highest ROI',
    keyBenefits: [
      'Save 25–40 hours per team member every month',
      'Zero human error in repetitive data entry and routing',
      'Instant trigger-to-action execution across webhooks and APIs',
      'Integrates with Make, n8n, Zapier, HubSpot, and Slack',
    ],
    features: [
      'Multi-step workflow triggers & condition logic',
      'Automated invoice & document intelligence extraction',
      'CRM synchronization & contact lifecycle automation',
      'Real-time automated status alerts & dashboard updates',
    ],
    deliverables: [
      'Complete workflow architecture mapping',
      'Configured cloud automation webhooks & error retries',
      'API connectors for your existing software stack',
      'Operations runbook and 30-day monitoring warranty',
    ],
    startingPrice: '$1,490',
    timeline: '3–5 Days',
    popular: true,
  },
  {
    id: 'ai-chatbots',
    title: 'AI Chatbots',
    shortDesc: 'Create intelligent chatbots for customer support, lead generation, and business communication.',
    fullDesc: 'Deploy human-grade conversational AI assistants trained on your proprietary business documentation, products, pricing, and FAQs to capture qualified leads and resolve support tickets instantly.',
    icon: 'MessageSquareText',
    tag: '24/7 Lead Capture',
    keyBenefits: [
      'Instant response time (0 seconds) 24 hours a day, 7 days a week',
      'Automatically qualifies prospective leads before booking meetings',
      'Answers complex multi-turn inquiries with strict brand guardrails',
      'Reduces customer support ticket volume by up to 70%',
    ],
    features: [
      'Custom knowledge base ingestion (PDFs, docs, URLs)',
      'Direct CRM & Calendly appointment booking integration',
      'Multilingual chat capabilities in 50+ languages',
      'Fallback escalation to live human agents',
    ],
    deliverables: [
      'Trained AI model with custom system prompt & guardrails',
      'Embeddable branded website widget with dark/light themes',
      'Lead capture webhook directly to your inbox/CRM',
      'Admin analytics dashboard for conversation reviews',
    ],
    startingPrice: '$1,290',
    timeline: '4–6 Days',
    popular: true,
  },
  {
    id: 'ai-content-systems',
    title: 'AI Content Systems',
    shortDesc: 'Build systems for generating and managing content efficiently.',
    fullDesc: 'Streamline your marketing output with automated content generation engines that produce brand-aligned articles, social media posts, email newsletters, and ad copy at massive scale.',
    icon: 'Sparkles',
    tag: '10x Content Output',
    keyBenefits: [
      'Scale organic reach without hiring massive editorial teams',
      'Maintain consistent brand tone and voice across all channels',
      'Automated repurposing from 1 long-form idea to 10+ assets',
      'Integrated SEO keyword optimization and readability scoring',
    ],
    features: [
      'Tone-of-voice and brand guidelines training prompt matrix',
      'Automated batch blog post and social caption generation',
      'AI image generation prompts & dynamic asset rendering',
      'Scheduled CMS publishing integrations (WordPress, Webflow, Ghost)',
    ],
    deliverables: [
      'Custom AI Content Generation workspace / dashboard',
      'Reusable prompt template library for your marketing team',
      'Repurposing pipelines (Video/Podcast to text to social)',
      'Step-by-step editorial review and approval workflow',
    ],
    startingPrice: '$1,190',
    timeline: '3–5 Days',
  },
  {
    id: 'ai-business-solutions',
    title: 'AI Business Solutions',
    shortDesc: 'Identify opportunities where AI can save time, reduce costs, and improve productivity.',
    fullDesc: 'Bespoke AI system engineering designed around your unique operational bottlenecks—from intelligent predictive lead scoring and inventory analysis to automated proposal generators.',
    icon: 'Cpu',
    tag: 'Bespoke Enterprise',
    keyBenefits: [
      'Solve domain-specific problems standard software cannot fix',
      'Massive operational cost reductions and faster turnaround',
      'Custom API endpoints and private local LLM deployments',
      'Data privacy with enterprise compliance & encryption',
    ],
    features: [
      'Proprietary data ingestion and vector search databases',
      'Automated quote and custom proposal drafting engine',
      'Predictive customer churn & sales velocity modeling',
      'Role-based access control and strict data privacy',
    ],
    deliverables: [
      'Full technical architecture design document',
      'Custom backend microservices & secure API wrappers',
      'Admin interface with permission management',
      'Comprehensive team training and SLA support',
    ],
    startingPrice: '$2,490',
    timeline: '7–14 Days',
  },
  {
    id: 'ai-strategy-consulting',
    title: 'AI Strategy & Consulting',
    shortDesc: 'Help businesses understand how AI can be practically implemented in their operations.',
    fullDesc: 'A pragmatic, high-impact consulting framework that audits your business workflows, spots high-leverage AI opportunities, and provides a clear technical roadmap with verified ROI projections.',
    icon: 'Compass',
    tag: 'Strategic Roadmap',
    keyBenefits: [
      'Avoid wasting money on hype-driven AI tools that do not work',
      'Clear prioritised matrix of highest-ROI automation quick wins',
      'Executive alignment on AI governance, tools, and budget',
      'Actionable step-by-step implementation blueprint',
    ],
    features: [
      'Full operational workflow audit & bottleneck discovery',
      'Tool evaluation (OpenAI, Anthropic, Mistral, LangChain, n8n)',
      'Cost-benefit analysis and software licensing breakdown',
      'Vendor selection & custom build vs. buy recommendations',
    ],
    deliverables: [
      '30-Page Custom AI Implementation Roadmap',
      'Prioritized ROI calculation & timeline matrix',
      'Live 2-hour executive workshop & strategy presentation',
      'Direct Slack access to senior AI architect for 30 days',
    ],
    startingPrice: '$890',
    timeline: '2–3 Days',
  },
];
