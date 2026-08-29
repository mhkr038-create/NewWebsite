'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Layout, 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  Smartphone, 
  Gauge, 
  Target, 
  BarChart3 
} from 'lucide-react';
import { GROWTH_SERVICES } from '../data/growthServices';
import { FAQAccordion } from '../components/common/FAQAccordion';
import { CTASection } from '../components/common/CTASection';
import { useInquiry } from '../context/InquiryContext';

export const LandingPagesPage: React.FC = () => {
  const service = GROWTH_SERVICES.find((s) => s.id === 'landing-pages')!;
  const { openQuickModal } = useInquiry();
  const otherServices = GROWTH_SERVICES.filter((s) => s.id !== 'landing-pages');

  return (
    <div className="space-y-20 sm:space-y-28 pb-24 overflow-x-hidden pt-28 sm:pt-36">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-indigo-500/30 text-indigo-300 text-xs font-mono">
            <Layout className="w-3.5 h-3.5 text-cyan-400" />
            <span>High-Converting Architecture</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.1] font-heading">
            Turn Paid & Search Traffic into <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400">
              High-Value Customers
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {service.description} We engineer laser-focused landing pages designed around direct response copywriting and conversion rate psychology.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => openQuickModal('landing-pages')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 transition-all hover:scale-105 active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4 text-cyan-200" />
              <span>Build Your High-Converting Page</span>
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

      {/* 4 Core Pillars of Our Landing Pages */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-cyan-400 border border-indigo-500/30 flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">1:1 Attention Ratio</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Zero distracting menus or external exit leaks. Every element directs the visitor to your primary conversion goal.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-600/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
              <Gauge className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Sub-Second Load Speed</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Built on React & Tailwind for instantaneous rendering. Maximizes Google Quality Score and lowers ad costs.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center">
              <Smartphone className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Mobile-First Layouts</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Over 75% of ad traffic is mobile. We optimize button ergonomics, readable font hierarchy, and instant tap actions.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Full Analytics Sync</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Server-side tracking, Meta CAPI, Google Tag Manager, and instant webhook syncing directly into your CRM.
            </p>
          </div>
        </div>
      </section>

      {/* Landing Page Types & Examples */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 sm:p-12 space-y-8 text-left backdrop-blur-xl">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase text-cyan-400 font-semibold">Funnel Types</span>
            <h2 className="text-2xl sm:text-4xl font-bold text-white font-heading">
              Landing Page Types We Build
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
                  <p className="text-xs text-slate-400 mt-1">High conversion velocity with direct CRM & WhatsApp routing.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4-Step Process */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-mono uppercase text-cyan-400 font-semibold">Our Proven Process</span>
          <h2 className="text-2xl sm:text-4xl font-bold text-white font-heading">
            From Offer Psychology to High-Converting Code
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
        <FAQAccordion faqs={service.faqs} title="Frequently Asked Questions about Landing Pages" />
      </section>

      {/* Internal Cross-Linking: Related Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase text-indigo-400 font-semibold">Connected Acquisition</span>
            <h3 className="text-xl font-bold text-white font-heading">
              Combine Your Landing Page with Targeted Traffic & Automation
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
        headline="Ready for a Landing Page that Actually Converts?"
        description="Stop sending expensive ad traffic to high-bounce homepages. Let's engineer a high-velocity landing page."
        primaryCtaText="Book a Consultation"
        secondaryCtaText="Explore All Services"
      />
    </div>
  );
};
