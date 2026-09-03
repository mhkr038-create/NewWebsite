import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Bot,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Zap,
  Cpu,
  Workflow,
  TrendingUp,
  ShieldCheck,
  Layers,
  Clock,
  Database,
  BarChart3,
} from 'lucide-react';
import { SITE_CONFIG } from '../../../config/siteConfig';
import { AI_SERVICES_DATA } from '../../../data/aiServices';
import { AiDemoWidget } from '../../../components/ai/AiDemoWidget';
import { CTASection } from '../../../components/common/CTASection';
import { MeetingSection } from '../../../components/home/MeetingSection';

export const metadata: Metadata = {
  title: 'AI Automation & Digital Marketing Agency',
  description: 'Scale your business with cutting-edge AI agency solutions, programmatic SEO, and custom digital marketing workflows that drive organic growth.',
  keywords: ['AI marketing agency', 'digital marketing solutions', 'AI automation for business'],
  openGraph: {
    title: 'AI Automation & Digital Marketing Agency',
    description: 'Transform your marketing workflows using custom-built AI solutions.',
    url: `${SITE_CONFIG.siteUrl}/services/ai-automation`,
    siteName: SITE_CONFIG.brandName,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `AI Automation & Digital Marketing Agency | ${SITE_CONFIG.brandName}`,
    description: 'Transform your marketing workflows using custom-built AI solutions.',
  },
  alternates: {
    canonical: `${SITE_CONFIG.siteUrl}/services/ai-automation`,
  },
};

export default function Page() {
  const automationService = AI_SERVICES_DATA.find((s) => s.id === 'ai-automation') || AI_SERVICES_DATA[0];

  return (
    <main className="pt-28 pb-20 sm:pt-36 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-24">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs font-mono uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>Next.js Metadata API & Programmatic SEO Active</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-normal tracking-tight text-white leading-[1.15]">
          AI Automation for High-Growth Brands
        </h1>

        <p className="text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto font-light leading-relaxed">
          Scale your business with cutting-edge AI agency solutions, programmatic SEO, and custom digital marketing workflows that drive organic growth and capture high-intent leads automatically.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#schedule-meeting"
            className="px-6 py-3.5 rounded-xl bg-white hover:bg-neutral-200 text-black font-semibold text-sm shadow-xl flex items-center gap-2 transition-all"
          >
            <span>Book Strategy Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <Link
            href="/whatsapp-automation"
            className="px-6 py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-medium text-sm border border-neutral-800 transition-colors"
          >
            WhatsApp Automation
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-500 font-mono">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            24/7 Autonomous Execution
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Sub-Second CRM Synchronization
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Zero-Maintenance Architecture
          </span>
        </div>
      </section>

      {/* 3 Core Value Pillars */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800/80 hover:border-neutral-700 transition-all space-y-3">
          <div className="w-10 h-10 rounded-xl bg-neutral-900 flex items-center justify-center border border-neutral-800 text-emerald-400">
            <Workflow className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-medium text-white">Intelligent Workflow Routing</h2>
          <p className="text-sm text-neutral-400 leading-relaxed">
            Eliminate manual handoffs. Our AI pipelines qualify leads, parse documents, and trigger custom webhooks across HubSpot, Make, and WhatsApp instantly.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800/80 hover:border-neutral-700 transition-all space-y-3">
          <div className="w-10 h-10 rounded-xl bg-neutral-900 flex items-center justify-center border border-neutral-800 text-cyan-400">
            <TrendingUp className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-medium text-white">Programmatic Organic Growth</h2>
          <p className="text-sm text-neutral-400 leading-relaxed">
            Harness Next.js Metadata API and structured schemas to dominate targeted high-intent search terms with automated, production-grade landing pages.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800/80 hover:border-neutral-700 transition-all space-y-3">
          <div className="w-10 h-10 rounded-xl bg-neutral-900 flex items-center justify-center border border-neutral-800 text-purple-400">
            <Cpu className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-medium text-white">Autonomous Support & Sales</h2>
          <p className="text-sm text-neutral-400 leading-relaxed">
            Deploy conversational bots trained on your exact business knowledge base that answer complex buyer questions and book appointments 24/7.
          </p>
        </div>
      </section>

      {/* Interactive Sandbox Simulator */}
      <section className="space-y-4">
        <div className="border-b border-neutral-800 pb-3">
          <span className="text-xs font-mono uppercase text-emerald-400 font-medium tracking-wider">
            Live Interactive Simulator
          </span>
          <h2 className="text-2xl font-normal text-white mt-1">
            Experience Our AI Workflows in Action
          </h2>
          <p className="text-sm text-neutral-400">
            Select a live preset below to see how our autonomous bots triage requests, sync data, and generate instant revenue outcomes.
          </p>
        </div>

        <AiDemoWidget />
      </section>

      {/* Feature & Deliverables Grid */}
      <section className="p-8 sm:p-12 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-8">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">
            Full Deliverables & Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-normal text-white">
            What We Build & Integrate
          </h2>
          <p className="text-sm text-neutral-400">
            Every deployment is tailor-built for your stack, enterprise-secured, and engineered for high conversion rates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
              Core Capabilities
            </h3>
            <ul className="space-y-2.5">
              {automationService.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-neutral-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
              Engineering Deliverables
            </h3>
            <ul className="space-y-2.5">
              {automationService.deliverables.map((deliv, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-neutral-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{deliv}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Meeting Booking Section */}
      <section id="schedule-meeting">
        <MeetingSection />
      </section>

      {/* CTA Footer */}
      <CTASection
        headline="Ready to automate your operations and scale faster?"
        description="Schedule a 20-minute architecture discovery call. We'll map your top 3 automation opportunities and estimate ROI upfront."
        primaryCtaText="Book Discovery Call"
        secondaryCtaText="Explore All Services"
      />
    </main>
  );
}
