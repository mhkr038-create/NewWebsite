export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface GrowthService {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
  badge: string;
  ctaText: string;
  route: string;
  examples?: string[];
  features: string[];
  benefits: string[];
  process: {
    step: string;
    title: string;
    description: string;
  }[];
  faqs: ServiceFaq[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export const GROWTH_SERVICES: GrowthService[] = [
  {
    id: 'digital-products',
    slug: 'digital-products',
    title: 'Digital Products',
    tagline: 'Monetize your expertise with automated, scalable digital assets.',
    description: 'We help create and launch digital products that can generate scalable online revenue.',
    icon: 'Package',
    badge: 'Scalable Revenue',
    ctaText: 'Explore Digital Products',
    route: '/digital-products',
    examples: [
      'Digital guides & executive playbooks',
      'Notion & Figma productivity templates',
      'Developer, agency & business toolkits',
      'Online interactive resources & calculators',
      'Digital downloads, presets & audio/video assets',
    ],
    features: [
      'Digital product architecture & curriculum design',
      'High-converting checkout & frictionless delivery systems',
      'Automated email onboarding & resource delivery sequences',
      'Strategic order bumps, upsells, and cross-sell funnels',
      'Customer lifetime value & cohort revenue analytics',
    ],
    benefits: [
      'Zero inventory and near-zero marginal cost per sale',
      'True 24/7 automated income without trading hours for money',
      'Positions you as an industry authority in your specialized niche',
      'Builds a high-intent buyer email list for higher-ticket offerings',
    ],
    process: [
      {
        step: '01',
        title: 'Product Concept & Market Validation',
        description: 'We identify your highest-value knowledge, analyze competitor gaps, and validate buyer willingness to pay.',
      },
      {
        step: '02',
        title: 'Asset Creation & Packaging',
        description: 'We design premium, professional templates, guides, workbooks, and resource kits ready for customer consumption.',
      },
      {
        step: '03',
        title: 'Funnel & Checkout Engineering',
        description: 'We connect secure payment gateways (Stripe/Razorpay), automated digital file delivery, and lead magnets.',
      },
      {
        step: '04',
        title: 'Launch & Traffic Scaling',
        description: 'We deploy paid ads, organic content, and email sequences to drive consistent customer acquisition.',
      },
    ],
    faqs: [
      {
        question: 'What kind of digital products can you help me build?',
        answer: 'We help build actionable guides, PDF playbooks, Notion templates, Figma UI kits, Excel/Google Sheets financial models, mini video workshops, and downloadable swipe files.',
      },
      {
        question: 'How do customers receive the files after purchase?',
        answer: 'Customers are redirected to an instant secure download page and simultaneously receive an automated welcome email with permanent access links and receipt.',
      },
      {
        question: 'Which payment processors do you support?',
        answer: 'We integrate with Stripe, Razorpay, Lemon Squeezy, Gumroad, and custom webhook-driven payment gateways with multi-currency support.',
      },
    ],
    seo: {
      title: 'Digital Product Creation & Launch Agency | Scalable Online Revenue',
      description: 'Create and launch high-converting digital products, templates, guides, and toolkits. Generate scalable automated revenue with digitalsimplesolution.',
      keywords: ['digital products', 'digital templates', 'launch digital downloads', 'online revenue system', 'digital product agency'],
    },
  },
  {
    id: 'landing-pages',
    slug: 'landing-pages',
    title: 'Landing Pages',
    tagline: 'Precision-engineered landing pages built to turn clicks into paying customers.',
    description: 'High-converting landing pages designed to turn visitors into leads and customers.',
    icon: 'Layout',
    badge: 'Conversion Engine',
    ctaText: 'Build My Landing Page',
    route: '/landing-pages',
    examples: [
      'Lead capture & opt-in squeeze pages',
      'Direct-response paid advertising landing pages',
      'Webinar & event registration funnels',
      'Consultation & meeting booking flows',
      'Product launch & waitlist teaser pages',
    ],
    features: [
      'Conversion-focused copywriting & UX architecture',
      '100% Mobile-first responsive performance',
      'Sub-second loading times for higher Google Quality Scores',
      'Frictionless lead capture forms, quizzes, and calculators',
      'Google Tag Manager, GA4, and Meta Pixel tracking integration',
    ],
    benefits: [
      'Increases paid ad conversion rates by 2x–4x over generic websites',
      'Reduces Cost Per Acquisition (CPA) on Google and Meta Ads',
      'Delivers a seamless, clutter-free mobile user experience',
      'Provides crystal-clear tracking of every button click and form submit',
    ],
    process: [
      {
        step: '01',
        title: 'Customer Psychology & Offer Strategy',
        description: 'We deconstruct your core value proposition, address buyer objections, and structure a high-converting message hierarchy.',
      },
      {
        step: '02',
        title: 'Persuasive Copywriting & Wireframing',
        description: 'We craft compelling headlines, benefit-driven bullet points, trust badges, and clear call-to-actions.',
      },
      {
        step: '03',
        title: 'High-Performance UI & Code Build',
        description: 'We code custom, lightweight React and Tailwind pages optimized for speed and sub-second rendering.',
      },
      {
        step: '04',
        title: 'Tracking Setup & A/B Optimization',
        description: 'We implement analytics tags, heatmaps, CRM webhooks, and split test variants to maximize conversion rate.',
      },
    ],
    faqs: [
      {
        question: 'Why do I need a dedicated landing page instead of my home page?',
        answer: 'Standard homepages have multiple links, menus, and distractions that lower conversion rates. A dedicated landing page has a single conversion goal, matching the exact intent of your ad campaign.',
      },
      {
        question: 'How fast can my landing page be designed and launched?',
        answer: 'Our typical turnaround time for a complete, high-converting landing page with copy, responsive UI, forms, and tracking is 4 to 7 business days.',
      },
      {
        question: 'Can the leads sync directly to my CRM and email software?',
        answer: 'Yes! We configure instant webhook pipelines connecting leads to HubSpot, Zoho, ActiveCampaign, Google Sheets, or WhatsApp notifications.',
      },
    ],
    seo: {
      title: 'High-Converting Landing Page Design & Development Agency',
      description: 'Build fast, mobile-responsive, conversion-focused landing pages that turn ad clicks into qualified leads and sales. Built by digitalsimplesolution.',
      keywords: ['landing page design', 'high converting landing pages', 'lead generation landing pages', 'responsive funnel design', 'cro agency'],
    },
  },
  {
    id: 'meta-ads',
    slug: 'meta-ads',
    title: 'Meta Ads',
    tagline: 'Targeted Facebook & Instagram advertising engineered for measurable ROAS.',
    description: 'Reach your ideal customers through strategic Facebook and Instagram advertising campaigns.',
    icon: 'Share2',
    badge: 'Social Acquisition',
    ctaText: 'Grow with Meta Ads',
    route: '/meta-ads',
    examples: [
      'Direct lead generation form ads with instant CRM sync',
      'Video hook & UGC story/reels conversion campaigns',
      'Dynamic retargeting for website visitors & cart abandoners',
      'Brand awareness & engagement campaigns',
      'Local store & clinic booking acquisition funnels',
    ],
    features: [
      'Comprehensive campaign architecture & funnel setup',
      'Hyper-specific custom and lookalike audience targeting',
      'High-converting ad creative recommendations & copywriting',
      'Automated lead generation pipelines & instant notifications',
      'Daily performance tracking, bid optimization & budget scaling',
    ],
    benefits: [
      'Puts your offer in front of millions of qualified buyers on Instagram & Facebook',
      'Scales lead flow predictably with continuous data-driven iterations',
      'Retargets warm prospects who visited your site but did not convert',
      'Delivers transparent weekly reports focused on Cost Per Lead and ROAS',
    ],
    process: [
      {
        step: '01',
        title: 'Audience Research & Competitor Spying',
        description: 'We analyze your target demographics, customer pain points, and top-performing competitor creative angles.',
      },
      {
        step: '02',
        title: 'Creative Strategy & Copywriting',
        description: 'We script scroll-stopping hooks, high-contrast visuals, carousel concepts, and persuasive ad copy.',
      },
      {
        step: '03',
        title: 'Campaign Architecture & Pixel Setup',
        description: 'We structure top-of-funnel (TOF), middle-of-funnel (MOF), and bottom-of-funnel (BOF) campaigns with Conversions API.',
      },
      {
        step: '04',
        title: 'Daily Optimization & Budget Scaling',
        description: 'We prune underperforming ad sets, double down on winning creatives, and scale budgets efficiently.',
      },
    ],
    faqs: [
      {
        question: 'What is the recommended monthly ad budget for Meta Ads?',
        answer: 'We recommend starting with at least ₹25,000–₹50,000/month in ad spend to gather sufficient conversion data and identify winning audiences quickly.',
      },
      {
        question: 'Do you create the ad graphics and copywriting?',
        answer: 'Yes! We handle the end-to-end creative direction, copywriting, image concepts, headline variations, and CTA formatting.',
      },
      {
        question: 'How do you track conversions with recent iOS privacy updates?',
        answer: 'We install both the Meta Pixel and server-side Conversions API (CAPI) for 100% accurate attribution and event recovery.',
      },
    ],
    seo: {
      title: 'Meta Ads Agency | Facebook & Instagram Paid Advertising Management',
      description: 'Scale your business with profitable Facebook & Instagram ads. Strategic audience targeting, scroll-stopping creatives, and high-ROAS campaign management.',
      keywords: ['meta ads agency', 'facebook advertising', 'instagram lead generation', 'paid social marketing', 'meta ads management'],
    },
  },
  {
    id: 'google-ads',
    slug: 'google-ads',
    title: 'Google Ads',
    tagline: 'Capture high-intent buyers at the exact moment they search for your solution.',
    description: 'Capture high-intent customers searching for your products and services.',
    icon: 'Search',
    badge: 'Intent Marketing',
    ctaText: 'Start Google Ads',
    route: '/google-ads',
    examples: [
      'High-intent Google Search text ads',
      'Performance Max (PMax) multi-channel campaigns',
      'Google Local Service ads & map pack visibility',
      'Display retargeting banner networks',
      'High-converting call-only campaigns for mobile searchers',
    ],
    features: [
      'In-depth commercial & transactional keyword research',
      'High-converting Google Search campaign structure (SKAG/STAG)',
      'Server-side Google Tag Manager & conversion tracking',
      'Dedicated landing page alignment for high Quality Scores',
      'Negative keyword management & automated smart bidding',
    ],
    benefits: [
      'Reaches customers with immediate commercial intent who are ready to buy',
      'Higher conversion rates because users are actively searching for your service',
      'Lower cost per lead through continuous Quality Score optimization',
      'Clear, transparent attribution showing exact keywords driving revenue',
    ],
    process: [
      {
        step: '01',
        title: 'Keyword Intent Mapping',
        description: 'We identify transactional search queries with high buying intent while filtering out wasteful informational terms.',
      },
      {
        step: '02',
        title: 'Ad Copy & Extension Architecture',
        description: 'We write compelling headlines, descriptions, sitelinks, callout extensions, and structured snippets.',
      },
      {
        step: '03',
        title: 'Landing Page & Tag Setup',
        description: 'We ensure page copy matches search queries for maximum Google Quality Score and lower click costs.',
      },
      {
        step: '04',
        title: 'Bid Strategy & Negative Keyword Scrubbing',
        description: 'We continuously prune search terms, adjust target CPA/ROAS bids, and eliminate budget waste.',
      },
    ],
    faqs: [
      {
        question: 'What is the difference between Meta Ads and Google Ads?',
        answer: 'Google Ads captures active intent (people searching for a solution right now), whereas Meta Ads generates demand by interrupting people browsing their social feeds with compelling offers.',
      },
      {
        question: 'How quickly can we see results from Google Ads?',
        answer: 'Google Search ads can start driving targeted clicks and qualified inquiries within 24 to 48 hours of campaign launch.',
      },
      {
        question: 'How do you prevent wasting ad spend on irrelevant searches?',
        answer: 'We implement comprehensive negative keyword lists, use exact and phrase match types, and monitor the Search Terms report daily.',
      },
    ],
    seo: {
      title: 'Google Ads Management Agency | PPC Search & Performance Max Campaigns',
      description: 'Capture high-intent customers on Google Search and Performance Max. Optimize your PPC ad spend with digitalsimplesolution.',
      keywords: ['google ads agency', 'ppc management', 'google search ads', 'performance max campaigns', 'google advertising expert'],
    },
  },
  {
    id: 'blog-content-seo',
    slug: 'blog',
    title: 'Blog Articles & SEO Content',
    tagline: 'Build compounding organic search traffic and establish unmatched industry authority.',
    description: 'Create valuable content that improves search visibility and attracts long-term organic traffic.',
    icon: 'FileText',
    badge: 'Organic Authority',
    ctaText: 'Grow with Content',
    route: '/blog',
    examples: [
      'In-depth ultimate guides & how-to tutorials',
      'Comparison & "vs" decision-stage articles',
      'Topic cluster pillar pages & supporting articles',
      'Industry thought leadership & case breakdown posts',
      'SEO-optimized local business service guides',
    ],
    features: [
      'Comprehensive keyword research & competitor gap analysis',
      'Expertly researched, original, and SEO-optimized blog articles',
      'Strategic 3-month to 12-month editorial content calendar',
      'On-page SEO, schema markup, and internal link graph',
      'Topic cluster architecture for both Google and AI search engines',
    ],
    benefits: [
      'Generates free, compounding organic traffic that grows over time',
      'Pre-educates your prospective clients so sales conversations close faster',
      'Positions your brand as the trusted thought leader in your field',
      'Builds high-authority backlinks and domain strength naturally',
    ],
    process: [
      {
        step: '01',
        title: 'Keyword Opportunity & Topic Cluster Audit',
        description: 'We identify high-volume, low-competition keywords and structure topic clusters around your core offerings.',
      },
      {
        step: '02',
        title: 'Editorial Calendar & Outline Creation',
        description: 'We outline comprehensive articles with optimized H2/H3 hierarchies, search intent, and user questions.',
      },
      {
        step: '03',
        title: 'Deep Research & High-Value Writing',
        description: 'We craft authoritative, engaging content enriched with custom diagrams, actionable examples, and clear CTAs.',
      },
      {
        step: '04',
        title: 'Technical Optimization & Internal Linking',
        description: 'We format meta tags, image alt text, structured data schemas, and internal links pointing to your service pages.',
      },
    ],
    faqs: [
      {
        question: 'How long does it take for SEO blog articles to rank?',
        answer: 'New articles typically begin indexing within days and climb to Page 1 rankings within 60 to 120 days as topical authority compounds.',
      },
      {
        question: 'Are your articles written for real human readers or search engines?',
        answer: 'Both. We write engaging, insight-packed articles that human decision-makers love to read, structured with semantic tags that search engines reward.',
      },
      {
        question: 'Can you handle publishing and formatting on our CMS?',
        answer: 'Yes! We format and publish directly on your CMS (WordPress, Webflow, Next.js, Ghost) with featured images and custom schemas.',
      },
    ],
    seo: {
      title: 'SEO Content Writing & Blog Strategy Agency | Organic Traffic Growth',
      description: 'Attract long-term organic traffic with high-intent SEO blog articles, keyword research, and topic cluster strategies.',
      keywords: ['seo content writing', 'blog strategy agency', 'organic traffic growth', 'topic cluster seo', 'content marketing agency'],
    },
  },
  {
    id: 'whatsapp-automation',
    slug: 'whatsapp-automation',
    title: 'WhatsApp Automation',
    tagline: 'Engage leads in seconds, automate follow-ups, and close more deals on WhatsApp.',
    description: 'Automate customer conversations, lead follow-ups, and business communication through WhatsApp.',
    icon: 'MessageSquare',
    badge: 'Instant Conversion',
    ctaText: 'Automate WhatsApp',
    route: '/whatsapp-automation',
    examples: [
      'Instant lead qualification & quiz chatbots',
      'Automated consultation & appointment reminders',
      'Lead magnet download delivery & feedback loops',
      'Abandoned cart & checkout recovery sequences',
      'VIP customer support & FAQ triage bots',
    ],
    features: [
      'Instant 24/7 automated replies with custom decision trees',
      'Multi-step lead qualification and contact triage',
      'Automated multi-day customer follow-up sequences',
      'Calendar booking & appointment reminder notifications',
      'Direct sales payment link generation & CRM synchronization',
    ],
    benefits: [
      '98% open rates and 45%+ response rates compared to standard email',
      'Responds to ad leads in under 30 seconds before they go cold',
      'Eliminates manual messaging and saves 25+ team hours every week',
      'Guides prospects smoothly from initial inquiry to booked consultation',
    ],
    process: [
      {
        step: '01',
        title: 'Conversation Flow & Funnel Mapping',
        description: 'We map out every customer touchpoint, qualification question, and automated reply trigger.',
      },
      {
        step: '02',
        title: 'WhatsApp Business Cloud API Setup',
        description: 'We configure verified WhatsApp Business accounts, green tick prerequisites, and message templates.',
      },
      {
        step: '03',
        title: 'Bot Logic & Webhook Integrations',
        description: 'We build interactive chatbots connected to your CRM, Google Calendar, and website lead forms.',
      },
      {
        step: '04',
        title: 'Testing & Human Handoff Protocol',
        description: 'We test all conversation paths and configure seamless live-agent escalation when high-value leads request human chat.',
      },
    ],
    faqs: [
      {
        question: 'Do I need the official WhatsApp Business API for this?',
        answer: 'Yes, we set you up with the official WhatsApp Business Cloud API to ensure high-speed deliverability, zero account bans, and team inbox collaboration.',
      },
      {
        question: 'Can a human team member take over the chat at any time?',
        answer: 'Absolutely. Whenever a customer asks for a human or meets specific high-value criteria, the system pauses automation and alerts your team.',
      },
      {
        question: 'Can WhatsApp automation trigger when someone fills a form on my website?',
        answer: 'Yes! Within 5 seconds of form submission or ad click, the prospect receives a personalized WhatsApp message with instant next steps.',
      },
    ],
    seo: {
      title: 'WhatsApp Automation & Chatbot Agency | Instant Lead Follow-Up',
      description: 'Automate lead qualification, appointment reminders, and customer follow-ups on WhatsApp with 98% open rates.',
      keywords: ['whatsapp automation', 'whatsapp chatbot agency', 'whatsapp lead nurturing', 'whatsapp business api', 'automated customer follow up'],
    },
  },
];
