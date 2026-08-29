export interface CaseStudyItem {
  id: string;
  title: string;
  category: string;
  industry: string;
  challenge: string;
  solution: string;
  result: string;
  servicesUsed: string[];
  tags: string[];
}

export const CASE_STUDIES_DATA: CaseStudyItem[] = [
  {
    id: 'local-business-lead-gen',
    title: 'Local Business Lead Generation',
    category: 'Paid Search & Local SEO',
    industry: 'Local Professional Services',
    challenge: 'High cost-per-click on broad keywords with low inquiry intent, resulting in wasted ad budget and slow lead response times.',
    solution: 'Built a dedicated high-speed mobile landing page paired with hyper-targeted Google Search campaigns and automated SMS/WhatsApp alerts for new inquiries.',
    result: 'Established a predictable pipeline of local consultation inquiries with sub-60-second follow-up response times.',
    servicesUsed: ['Google Ads', 'Landing Pages', 'WhatsApp Automation'],
    tags: ['Local Service', 'Lead Generation', 'Fast Response'],
  },
  {
    id: 'ecommerce-product-campaign',
    title: 'E-commerce Product Campaign',
    category: 'Meta Ads & Creative Testing',
    industry: 'Direct-to-Consumer (DTC) Retail',
    challenge: 'Difficulty scaling beyond existing customer base due to ad creative fatigue and high customer acquisition costs on social channels.',
    solution: 'Engineered a multi-angle Meta Ads testing framework (video hooks, carousel problem-solving angles) with dynamic retargeting and automated checkout recovery.',
    result: 'Reduced customer acquisition friction and unlocked a sustainable creative testing system for ongoing product launches.',
    servicesUsed: ['Meta Ads', 'Landing Pages', 'Digital Products'],
    tags: ['DTC Retail', 'Meta Ads', 'Creative Funnel'],
  },
  {
    id: 'coach-landing-page-funnel',
    title: 'Coach Landing Page Funnel',
    category: 'Conversion Rate Optimization',
    industry: 'Executive & Career Coaching',
    challenge: 'Visitors landing on a complex multi-page website without clear booking pathways, causing 80%+ drop-off before reaching the consultation calendar.',
    solution: 'Replaced the fragmented site with a streamlined, single-focus landing page featuring client video testimonials, structured FAQ objections, and a 2-step qualification booking form.',
    result: 'Doubled the appointment completion rate and pre-qualified prospects before discovery calls took place.',
    servicesUsed: ['Landing Pages', 'Digital Products', 'WhatsApp Automation'],
    tags: ['High-Ticket Coaching', 'Conversion Funnel', 'Booking Flow'],
  },
  {
    id: 'whatsapp-lead-automation',
    title: 'WhatsApp Lead Automation',
    category: 'Conversational Automation',
    industry: 'Real Estate & Property Development',
    challenge: 'Inquiries arriving from ad campaigns during off-hours going unanswered for hours, causing leads to contact competing agencies.',
    solution: 'Deployed an official WhatsApp Business API chatbot that immediately engages new ad leads, asks 3 pre-qualification questions, and schedules site visits automatically.',
    result: 'Achieved 24/7 instant contact with prospective buyers and eliminated 30+ hours of repetitive manual follow-up work.',
    servicesUsed: ['WhatsApp Automation', 'Meta Ads'],
    tags: ['Instant Response', 'Chatbot Qualification', '24/7 Follow-Up'],
  },
  {
    id: 'seo-content-growth',
    title: 'SEO Content Growth',
    category: 'Organic Search & Content Strategy',
    industry: 'B2B Software & Consulting',
    challenge: 'Heavy reliance on expensive paid outbound channels with zero organic search visibility for high-intent industry search queries.',
    solution: 'Created an in-depth topic cluster content architecture targeting commercial-intent search terms, paired with comprehensive guides and internal service linking.',
    result: 'Built an evergreen organic discovery engine capturing qualified decision-makers actively searching for industry solutions.',
    servicesUsed: ['Blog Articles & SEO Content', 'Digital Products'],
    tags: ['Topic Clusters', 'Commercial SEO', 'Compounding Traffic'],
  },
];
