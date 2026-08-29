import React from 'react';
import Link from 'next/link';
import { Bot, Zap, TrendingUp, Compass, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

const VALUE_CARDS = [
  {
    id: 'ai-powered-solutions',
    title: 'Digital Products & Tools',
    description: 'Monetize your expertise with custom templates, software, calculators, and digital asset portals.',
    icon: Bot,
    gradient: 'from-indigo-600 to-cyan-500',
    borderGlow: 'hover:border-indigo-500/50',
    link: '/digital-products',
    points: [
      'Instant checkout integration',
      'Automated license key & asset delivery',
      'Scalable recurring subscription models',
    ],
  },
  {
    id: 'business-automation',
    title: 'WhatsApp Automation',
    description: 'Automate repetitive conversation tasks and convert leads within 30 seconds 24/7.',
    icon: Zap,
    gradient: 'from-purple-600 to-indigo-500',
    borderGlow: 'hover:border-purple-500/50',
    link: '/whatsapp-automation',
    points: [
      'Zero-touch lead intake & CRM sync',
      'Automated appointment qualification',
      'Multi-day smart re-engagement drips',
    ],
  },
  {
    id: 'digital-marketing',
    title: 'Meta & Google Ads',
    description: 'Reach high-intent buyers with laser targeting, scroll-stopping creatives, and high-ROAS bidding.',
    icon: TrendingUp,
    gradient: 'from-cyan-600 to-blue-500',
    borderGlow: 'hover:border-cyan-500/50',
    link: '/meta-ads',
    points: [
      'Targeted high-intent paid acquisition',
      'High-converting ad copy & video hooks',
      'Conversions API & server-side tracking',
    ],
  },
  {
    id: 'digital-growth-strategy',
    title: 'Landing Pages & CRO',
    description: 'Sub-second fast, mobile-first landing pages engineered for maximum lead conversion velocity.',
    icon: Compass,
    gradient: 'from-emerald-600 to-teal-500',
    borderGlow: 'hover:border-emerald-500/50',
    link: '/landing-pages',
    points: [
      '1:1 Attention ratio funnels',
      'Direct CRM & WhatsApp lead routing',
      'Continuous conversion rate optimization',
    ],
  },
];

export const TrustValueSection: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Core Capabilities</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading tracking-tight">
          Everything You Need to Grow Digitally
        </h2>
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
          We combine cutting-edge landing page architecture, targeted advertising, digital products, and WhatsApp automation into a single growth partner.
        </p>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {VALUE_CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              className={`bg-slate-900/80 border border-slate-800 ${card.borderGlow} rounded-3xl p-6 sm:p-7 flex flex-col justify-between space-y-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-indigo-950/40 group text-left relative overflow-hidden`}
            >
              {/* Subtle top glow */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform" />

              <div className="space-y-4 relative z-10">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${card.gradient} p-[1.5px] shadow-lg shadow-indigo-500/20`}>
                  <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors font-heading">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {/* Key feature bullet points */}
                <div className="space-y-1.5 pt-3 border-t border-slate-800/80">
                  {card.points.map((pt, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Link CTA */}
              <div className="pt-4 border-t border-slate-800/80 relative z-10">
                <Link
                  href={card.link}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-cyan-300 transition-colors group/btn"
                >
                  <span>Explore Capabilities</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

