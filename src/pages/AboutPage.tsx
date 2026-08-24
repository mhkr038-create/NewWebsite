import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ShieldCheck, 
  Bot, 
  Zap, 
  TrendingUp, 
  ArrowRight 
} from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import { CTASection } from '../components/common/CTASection';
import { MeetingSection } from '../components/home/MeetingSection';

export const AboutPage: React.FC = () => {
  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-24">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Our Vision & Growth Mission</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight font-heading leading-tight">
          Pioneering the Future of <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400">
            AI & Digital Growth.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
          {SITE_CONFIG.brandName} is a modern digital agency built to help businesses save time, automate repetitive work, attract more qualified customers, and grow their revenue with intelligent solutions.
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#schedule-meeting"
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all"
          >
            <span>Schedule a Free Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <Link
            to="/ai-services"
            className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-xs border border-slate-700 transition-colors"
          >
            Explore AI Capabilities
          </Link>
        </div>
      </div>

      {/* Agency Positioning & Mission */}
      <div className="bg-gradient-to-r from-indigo-950/60 via-slate-900 to-cyan-950/60 border border-slate-800 rounded-3xl p-8 sm:p-14 shadow-2xl space-y-8 text-left">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-mono uppercase text-cyan-400 font-semibold tracking-wider">
            Our Core Thesis
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-heading">
            Innovation. Automation. Growth. Trust.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Traditional agencies still rely on slow manual handoffs, bloated retainer fees, and abstract wireframe promises. We believe modern businesses deserve an agile partner that implements cutting-edge AI pipelines, sub-second web experiences, and high-converting marketing funnels.
          </p>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            From deploying 24/7 AI customer support bots and automating back-office document parsing to engineering high-velocity paid acquisition funnels, our mission is simple: <strong>empower you to grow smarter, not harder.</strong>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800/80">
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
            <span className="text-2xl font-bold text-cyan-400 font-mono">0s</span>
            <h4 className="text-sm font-bold text-white">AI Lead Response</h4>
            <p className="text-xs text-slate-400">Instant qualification and calendar booking 24/7.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
            <span className="text-2xl font-bold text-purple-400 font-mono">35+ hrs</span>
            <h4 className="text-sm font-bold text-white">Weekly Time Saved</h4>
            <p className="text-xs text-slate-400">Eliminating repetitive manual workflows across teams.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
            <span className="text-2xl font-bold text-emerald-400 font-mono">4.8x</span>
            <h4 className="text-sm font-bold text-white">Average ROAS</h4>
            <p className="text-xs text-slate-400">Performance-driven paid ads & inbound funnels.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
            <span className="text-2xl font-bold text-amber-400 font-mono">100%</span>
            <h4 className="text-sm font-bold text-white">Source Code Owned</h4>
            <p className="text-xs text-slate-400">Zero vendor lock-in or recurring builder fees.</p>
          </div>
        </div>
      </div>

      {/* 4 Guiding Pillars */}
      <div className="space-y-8 text-left">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono uppercase text-indigo-400 font-semibold">
            Our Guiding Pillars
          </span>
          <h2 className="text-3xl font-bold text-white font-heading">
            Engineered For High-Growth Outcomes
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Bot,
              title: 'AI-Native Innovation',
              desc: 'Practical, production-grade artificial intelligence that improves everyday operational efficiency.',
            },
            {
              icon: Zap,
              title: 'Workflow Automation',
              desc: 'Connecting your CRM, email, calendar, and payment systems into an autonomous growth engine.',
            },
            {
              icon: TrendingUp,
              title: 'Revenue-First Marketing',
              desc: 'Every campaign and page layout is engineered around conversion rates, customer lifetime value, and ROAS.',
            },
            {
              icon: ShieldCheck,
              title: 'Radical Trust & Ownership',
              desc: 'Transparent fixed pricing, clear deliverables, 100% owned source code, and dedicated SLA warranty.',
            },
          ].map((pillar, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-3 hover:border-indigo-500/40 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
                <pillar.icon className="w-5 h-5 text-cyan-400" />
              </div>
              <h4 className="text-base font-bold text-white font-heading">{pillar.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack Banner */}
      <div className="p-8 sm:p-12 rounded-3xl bg-slate-950 border border-slate-800 text-center space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase text-slate-500 tracking-wider">
            Built on Industry Standard Technologies
          </span>
          <h3 className="text-2xl font-bold text-white font-heading">Modern Enterprise Architecture</h3>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-xs font-mono text-slate-400 font-semibold">
          <span className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200">React 19 & TypeScript</span>
          <span className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200">Tailwind CSS</span>
          <span className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200">OpenAI & Anthropic APIs</span>
          <span className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200">Make & n8n Automation</span>
          <span className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200">Stripe Payments API</span>
          <span className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200">HubSpot & Google Analytics 4</span>
        </div>
      </div>

      {/* CTA Section */}
      <CTASection
        headline="Ready to Partner with Our Agency?"
        description="Let's build a modern, high-converting digital presence and automate your workflows."
      />

      {/* Meeting Section */}
      <MeetingSection />

    </div>
  );
};
