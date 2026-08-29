'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Search, 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  KeyRound, 
  Sliders, 
  Filter, 
  TrendingUp 
} from 'lucide-react';
import { GROWTH_SERVICES } from '../data/growthServices';
import { FAQAccordion } from '../components/common/FAQAccordion';
import { CTASection } from '../components/common/CTASection';
import { useInquiry } from '../context/InquiryContext';

export const GoogleAdsPage: React.FC = () => {
  const service = GROWTH_SERVICES.find((s) => s.id === 'google-ads')!;
  const { openQuickModal } = useInquiry();
  const otherServices = GROWTH_SERVICES.filter((s) => s.id !== 'google-ads');

  return (
    <div className="space-y-20 sm:space-y-28 pb-24 overflow-x-hidden pt-28 sm:pt-36">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-indigo-500/30 text-indigo-300 text-xs font-mono">
            <Search className="w-3.5 h-3.5 text-cyan-400" />
            <span>High-Intent Search Engine Advertising</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.1] font-heading">
            Capture High-Intent Buyers with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400">
              High-ROI Google Ads
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {service.description} Appear at the exact second qualified prospects search for your solution. Optimized for high quality scores and low cost-per-acquisition.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => openQuickModal('google-ads')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 transition-all hover:scale-105 active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4 text-cyan-200" />
              <span>Launch Google Ads Campaign</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <Link
              href="/schedule-meeting"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-sm border border-slate-700/80 transition-colors flex items-center justify-center gap-2"
            >
              <span>Schedule Strategy Call</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 4 Core Pillars of Our Google Ads */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
              <KeyRound className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Exact Intent Match</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Target commercial and transactional keyword intent so you only bid on prospects ready to buy today.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-600/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
              <Filter className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Negative Keyword Shield</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Proactive negative lists that block irrelevant search terms, job seekers, and informational queries.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center">
              <Sliders className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Quality Score Maxing</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Tight keyword-to-ad copy-to-landing page congruence that lowers your actual CPC by up to 50%.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Smart Bidding & Scaling</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              tCPA and tROAS automated bidding routines that automatically allocate budget to top-performing queries.
            </p>
          </div>
        </div>
      </section>

      {/* Campaign Formats We Run */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 sm:p-12 space-y-8 text-left backdrop-blur-xl">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase text-cyan-400 font-semibold">Architectures</span>
            <h2 className="text-2xl sm:text-4xl font-bold text-white font-heading">
              Google Ads Campaign Types We Manage
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {service.examples?.map((ex, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3.5 hover:border-indigo-500/40 transition-colors"
              >
                <div className="w-8 h-8 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{ex}</h3>
                  <p className="text-xs text-slate-400 mt-1">Full conversion tracking and enhanced offline conversion sync.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4-Step Process */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-mono uppercase text-cyan-400 font-semibold">PPC Roadmap</span>
          <h2 className="text-2xl sm:text-4xl font-bold text-white font-heading">
            How We Build & Optimize Your Google Ads
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {service.process.map((step) => (
            <div
              key={step.step}
              className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="text-2xl font-mono font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                  {step.step}
                </span>
                <h3 className="text-base font-bold text-white font-heading">{step.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FAQAccordion faqs={service.faqs} title="Frequently Asked Questions about Google Ads" />
      </section>

      {/* Internal Cross-Linking: Related Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase text-indigo-400 font-semibold">Funnel Multipliers</span>
            <h3 className="text-xl font-bold text-white font-heading">
              Maximize Google Ad Conversions with These Connected Services
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherServices.slice(0, 3).map((os) => (
              <Link
                key={os.id}
                href={os.route}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-indigo-500/50 flex items-center justify-between group transition-all"
              >
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">{os.title}</h4>
                  <span className="text-[11px] text-slate-400">{os.tagline}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CTASection
        headline="Ready to Dominate Google Search for Your Core Services?"
        description="Stop losing high-intent buyers to competitors. Let's build a profitable Google search campaign."
        primaryCtaText="Launch Google Campaign"
        secondaryCtaText="Explore All Services"
      />
    </div>
  );
};
