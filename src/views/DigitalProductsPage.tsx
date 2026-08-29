'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Package, 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  Sparkles, 
  Layers 
} from 'lucide-react';
import { GROWTH_SERVICES } from '../data/growthServices';
import { FAQAccordion } from '../components/common/FAQAccordion';
import { CTASection } from '../components/common/CTASection';
import { useInquiry } from '../context/InquiryContext';

export const DigitalProductsPage: React.FC = () => {
  const service = GROWTH_SERVICES.find((s) => s.id === 'digital-products')!;
  const { openQuickModal } = useInquiry();
  const otherServices = GROWTH_SERVICES.filter((s) => s.id !== 'digital-products');

  return (
    <div className="space-y-20 sm:space-y-28 pb-24 overflow-x-hidden pt-28 sm:pt-36">

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-indigo-500/30 text-indigo-300 text-xs font-mono">
            <Package className="w-3.5 h-3.5 text-cyan-400" />
            <span>Scalable Revenue Infrastructure</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.1] font-heading">
            Build & Launch <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400">
              Profitable Digital Products
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {service.description} Turn your proprietary knowledge, templates, and frameworks into 24/7 automated income streams.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => openQuickModal('digital-products')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 transition-all hover:scale-105 active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4 text-cyan-200" />
              <span>Launch Your Digital Product</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <Link
              href="/schedule-meeting"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-sm border border-slate-700/80 transition-colors flex items-center justify-center gap-2"
            >
              <span>Book Strategy Call</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Examples of What We Build */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 sm:p-12 space-y-8 text-left backdrop-blur-xl">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase text-cyan-400 font-semibold">Formats & Asset Types</span>
            <h2 className="text-2xl sm:text-4xl font-bold text-white font-heading">
              Digital Products We Help You Create & Monetize
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
                  <p className="text-xs text-slate-400 mt-1">Packaged with checkout, automated delivery & license keys.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Breakdown */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 space-y-6">
            <h2 className="text-2xl font-bold text-white font-heading flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <span>Core Business Benefits</span>
            </h2>
            <div className="space-y-3">
              {service.benefits.map((b, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-300">{b}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 space-y-6">
            <h2 className="text-2xl font-bold text-white font-heading flex items-center gap-2.5">
              <Layers className="w-5 h-5 text-indigo-400" />
              <span>Included Capabilities</span>
            </h2>
            <div className="space-y-3">
              {service.features.map((f, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-300">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4-Step Process */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-mono uppercase text-cyan-400 font-semibold">Step-by-Step Delivery</span>
          <h2 className="text-2xl sm:text-4xl font-bold text-white font-heading">
            How We Take Your Digital Product to Market
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
        <FAQAccordion faqs={service.faqs} title="Frequently Asked Questions about Digital Products" />
      </section>

      {/* Internal Cross-Linking: Related Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase text-indigo-400 font-semibold">Ecosystem Connections</span>
            <h3 className="text-xl font-bold text-white font-heading">
              Complementary Services to Scale Your Digital Product
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
        headline="Ready to Launch Your Digital Product?"
        description="Let's build, package, and automate the sales funnel for your next high-margin digital asset."
        primaryCtaText="Book a Consultation"
        secondaryCtaText="Explore All Services"
      />
    </div>
  );
};
