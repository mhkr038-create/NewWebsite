'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, ShieldCheck, Clock, Sparkles, Laptop, LineChart, Cpu } from 'lucide-react';
import { useInquiry } from '../../context/InquiryContext';
import { SITE_CONFIG } from '../../config/siteConfig';
import { ImageStreamHero } from '@/components/ui/image-stream-hero';

const HERO_STREAM_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=70',
    alt: 'Digital Platforms & Architecture',
  },
  {
    src: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=400&auto=format&fit=crop&q=70',
    alt: 'Modern Web Engineering',
  },
  {
    src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&auto=format&fit=crop&q=70',
    alt: 'AI Automations & Workflows',
  },
  {
    src: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=400&auto=format&fit=crop&q=70',
    alt: 'Brand Identity & Systems',
  },
  {
    src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&auto=format&fit=crop&q=70',
    alt: 'Enterprise UI Systems',
  },
  {
    src: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&auto=format&fit=crop&q=70',
    alt: 'High-Converting Funnels',
  },
  {
    src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&auto=format&fit=crop&q=70',
    alt: 'Cloud Infrastructure',
  },
  {
    src: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&auto=format&fit=crop&q=70',
    alt: 'High-Performance Computing',
  },
  {
    src: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&auto=format&fit=crop&q=70',
    alt: 'Data-Driven Growth',
  },
];

export function MinimalistObsidianTheme() {
  const { openQuickModal } = useInquiry();

  return (
    <div className="w-full bg-[#09090b] text-zinc-100 flex flex-col justify-center min-h-[calc(100vh-80px)] pt-36 pb-20 sm:pt-44 sm:pb-28 px-4 sm:px-8 lg:px-12 font-sans overflow-x-hidden relative">
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-5xl h-96 bg-zinc-800/10 blur-[140px] pointer-events-none rounded-full" />

      {/* Main Container with Structured Macro Rhythm */}
      <main className="w-full max-w-6xl mx-auto flex flex-col items-start text-left relative z-10 space-y-16 sm:space-y-24">
        
        {/* Main Hero Stage */}
        <ImageStreamHero
          images={HERO_STREAM_IMAGES}
          className="w-full rounded-3xl border border-zinc-800/90 bg-zinc-950/90 shadow-2xl overflow-hidden backdrop-blur-md"
          speed={20}
          cards={9}
          axis={52}
        >
          <div className="relative z-10 flex min-h-[500px] sm:min-h-[540px] flex-col justify-between p-6 sm:p-12 lg:p-14 bg-gradient-to-b from-black/90 via-black/60 to-black/95">
            <div>
              {/* Single Dominant Eyebrow Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-[11px] font-mono uppercase tracking-wider text-zinc-300 mb-6 shadow-sm backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-semibold text-white">Digital Engineering Studio</span>
                <span className="text-zinc-600 hidden sm:inline">•</span>
                <span className="text-zinc-400 font-normal hidden sm:inline">Q4 Deployments Active</span>
              </div>

              {/* Dominant Headline (H1): High Contrast, Bold, Commanding Presence */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] sm:leading-[1.08] mb-6 font-heading max-w-4xl text-white">
                We engineer high-converting{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
                  digital platforms
                </span>{' '}
                &amp;{' '}
                <span className="text-zinc-200">
                  automated workflows
                </span>
                .
              </h1>
              
              {/* Clear Subheadline Value Promise */}
              <p className="text-base sm:text-lg text-zinc-300 font-normal max-w-2xl leading-relaxed mb-8">
                Sub-second speed Next.js architectures, high-ROAS acquisition funnels, and autonomous 24/7 WhatsApp AI automation tailored to scale enterprise revenue.
              </p>
            </div>

            {/* Clear Action Hierarchy: 1 Dominant Primary, 1 Subordinate Secondary, 1 Tertiary */}
            <div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                {/* Primary Focal CTA */}
                <Link
                  href="/intake-form"
                  className="px-8 py-4 rounded-full text-xs sm:text-sm font-mono uppercase tracking-wider bg-white hover:bg-zinc-200 text-black font-bold transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer inline-flex items-center justify-center gap-2 shadow-xl shadow-white/10"
                >
                  <span>Start Your Project</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                </Link>

                {/* Subordinate Secondary Action */}
                <button
                  onClick={() => openQuickModal()}
                  className="px-7 py-4 rounded-full text-xs sm:text-sm font-mono uppercase tracking-wider text-zinc-200 hover:text-white bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/80 hover:border-zinc-500 transition-all cursor-pointer backdrop-blur-md inline-flex items-center justify-center gap-2"
                >
                  <span>Quick Inquire (30s)</span>
                </button>

                {/* Tertiary Link */}
                <Link
                  href="/demos"
                  className="inline-flex items-center justify-center gap-1.5 px-5 py-4 text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-zinc-200 transition-colors"
                >
                  <span>View Live Demos</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Immediate Trust & Friction-Removal Strip */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-8 text-[11px] font-mono text-zinc-400 border-t border-zinc-850 mt-8">
                <span className="flex items-center gap-1.5 text-zinc-300">
                  <span className="text-emerald-400 font-bold">✓</span> 48-Hour Rapid Delivery
                </span>
                <span className="flex items-center gap-1.5 text-zinc-300">
                  <span className="text-emerald-400 font-bold">✓</span> 99.9% Uptime SLA
                </span>
                <span className="flex items-center gap-1.5 text-zinc-300">
                  <span className="text-emerald-400 font-bold">✓</span> ₹0 License School ERP
                </span>
              </div>
            </div>
          </div>
        </ImageStreamHero>

        {/* 3 Core Pillars */}
        {/* 3 Core Pillars Section with Clear Visual Framing */}
        <section className="w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 block mb-2">
                01 / Core Capabilities
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading tracking-tight">
                Engineered for Measurable Impact
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-md font-light leading-relaxed">
              We eliminate disconnected agency handoffs. Web engineering, high-intent traffic acquisition, and autonomous workflows unified in one architecture.
            </p>
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pillar 1 */}
            <Link
              href="/landing-pages"
              className="group/pillar block p-6 sm:p-7 rounded-2xl border border-zinc-800 bg-zinc-950/40 hover:bg-zinc-900/50 hover:border-zinc-700 transition-all duration-300 relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover/pillar:border-zinc-600 transition-colors">
                    <Laptop className="w-4 h-4 text-zinc-300 group-hover/pillar:text-white" />
                  </div>
                  <span className="font-mono text-zinc-400 text-[11px] uppercase tracking-wider">
                    01 / Platforms
                  </span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover/pillar:text-white transition-all transform group-hover/pillar:translate-x-0.5 group-hover/pillar:-translate-y-0.5" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-2 font-heading group-hover/pillar:text-zinc-100">
                High-Speed Web Engineering
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-4">
                Next.js web platforms, client portals, and landing pages authored for sub-second mobile speed and maximum conversion velocity.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-zinc-850">
                <span className="text-[10px] font-mono text-zinc-400 bg-zinc-900/80 px-2 py-0.5 rounded border border-zinc-800">Next.js 15</span>
                <span className="text-[10px] font-mono text-zinc-400 bg-zinc-900/80 px-2 py-0.5 rounded border border-zinc-800">CRO Funnels</span>
                <span className="text-[10px] font-mono text-zinc-400 bg-zinc-900/80 px-2 py-0.5 rounded border border-zinc-800">Sub-Second Speed</span>
              </div>
            </Link>

            {/* Pillar 2 */}
            <Link
              href="/meta-ads"
              className="group/pillar block p-6 sm:p-7 rounded-2xl border border-zinc-800 bg-zinc-950/40 hover:bg-zinc-900/50 hover:border-zinc-700 transition-all duration-300 relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover/pillar:border-zinc-600 transition-colors">
                    <LineChart className="w-4 h-4 text-zinc-300 group-hover/pillar:text-white" />
                  </div>
                  <span className="font-mono text-zinc-400 text-[11px] uppercase tracking-wider">
                    02 / Acquisition
                  </span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover/pillar:text-white transition-all transform group-hover/pillar:translate-x-0.5 group-hover/pillar:-translate-y-0.5" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-2 font-heading group-hover/pillar:text-zinc-100">
                High-ROAS Paid Advertising
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-4">
                Targeted Meta &amp; Google ad campaigns engineered for measurable return on ad spend, accurate conversion attribution, and pipeline growth.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-zinc-850">
                <span className="text-[10px] font-mono text-zinc-400 bg-zinc-900/80 px-2 py-0.5 rounded border border-zinc-800">Meta Ads</span>
                <span className="text-[10px] font-mono text-zinc-400 bg-zinc-900/80 px-2 py-0.5 rounded border border-zinc-800">Google Ads</span>
                <span className="text-[10px] font-mono text-zinc-400 bg-zinc-900/80 px-2 py-0.5 rounded border border-zinc-800">Attribution</span>
              </div>
            </Link>

            {/* Pillar 3 */}
            <Link
              href="/whatsapp-automation"
              className="group/pillar block p-6 sm:p-7 rounded-2xl border border-zinc-800 bg-zinc-950/40 hover:bg-zinc-900/50 hover:border-zinc-700 transition-all duration-300 relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover/pillar:border-zinc-600 transition-colors">
                    <Cpu className="w-4 h-4 text-zinc-300 group-hover/pillar:text-white" />
                  </div>
                  <span className="font-mono text-zinc-400 text-[11px] uppercase tracking-wider">
                    03 / Automation
                  </span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover/pillar:text-white transition-all transform group-hover/pillar:translate-x-0.5 group-hover/pillar:-translate-y-0.5" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-2 font-heading group-hover/pillar:text-zinc-100">
                Autonomous WhatsApp &amp; AI
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-4">
                Official WhatsApp Cloud API sequences for instant &lt;30-second lead qualification, automated booking, and CRM synchronization on autopilot.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-zinc-850">
                <span className="text-[10px] font-mono text-zinc-400 bg-zinc-900/80 px-2 py-0.5 rounded border border-zinc-800">WhatsApp API</span>
                <span className="text-[10px] font-mono text-zinc-400 bg-zinc-900/80 px-2 py-0.5 rounded border border-zinc-800">Lead Scoring</span>
                <span className="text-[10px] font-mono text-zinc-400 bg-zinc-900/80 px-2 py-0.5 rounded border border-zinc-800">24/7 Chatbots</span>
              </div>
            </Link>
          </div>
        </section>

        {/* Minimalist Metrics Strip: High Numerical Scale & Precision Alignment */}
        <section className="w-full">
          <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-6 p-6 sm:p-8 rounded-3xl border border-zinc-800 bg-zinc-950/60 backdrop-blur-sm">
            <div className="space-y-1">
              <div className="font-mono text-3xl sm:text-4xl font-extrabold text-white tracking-tight">99.9%</div>
              <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider font-medium">System Reliability</div>
              <p className="text-[11px] text-zinc-400 font-light">Engineered on redundant cloud stacks</p>
            </div>
            <div className="space-y-1">
              <div className="font-mono text-3xl sm:text-4xl font-extrabold text-white tracking-tight">₹0</div>
              <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider font-medium">ERP License Cost</div>
              <p className="text-[11px] text-zinc-400 font-light">Worth ₹30,000 for verified schools</p>
            </div>
            <div className="space-y-1">
              <div className="font-mono text-3xl sm:text-4xl font-extrabold text-white tracking-tight">&lt; 48h</div>
              <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider font-medium">Deployment Window</div>
              <p className="text-[11px] text-zinc-400 font-light">From onboarding to production live</p>
            </div>
            <div className="space-y-1">
              <div className="font-mono text-3xl sm:text-4xl font-extrabold text-white tracking-tight">24/7</div>
              <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider font-medium">Automated Workflows</div>
              <p className="text-[11px] text-zinc-400 font-light">Zero manual intervention required</p>
            </div>
          </div>
        </section>

        {/* Highlight Feature Card: SchoolMIS ERP (Clear Product Highlight) */}
        <section className="w-full">
          <div className="w-full p-6 sm:p-10 rounded-3xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition-all shadow-xl relative overflow-hidden group">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-7 space-y-5 text-left">
                {/* Badges */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-750 text-zinc-200 text-[10px] font-mono uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Flagship EdTech Initiative</span>
                  </span>
                  <span className="inline-flex items-center gap-1 bg-zinc-900/60 text-zinc-400 border border-zinc-800 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider">
                    <Clock className="w-3 h-3 text-zinc-400" />
                    <span>Limited Institution Slots</span>
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white text-black text-[10px] font-mono font-bold uppercase tracking-wider">
                    Zero License Fee (Worth ₹30,000)
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading tracking-tight">
                  SchoolMIS — Complete Cloud School Management ERP
                </h3>

                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light max-w-xl">
                  Comprehensive educational software automating student enrollments, fee invoicing with instant digital receipts, attendance tracking, and automated WhatsApp parent alerts at zero recurring license fee.
                </p>

                {/* Core Benefits */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-zinc-300 font-mono pt-1">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>Student &amp; Staff Master Records</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>Automated WhatsApp Fee Receipts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>Daily Attendance with Parent Alerts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>Zero Cloud Server Setup Overhead</span>
                  </div>
                </div>

                {/* Progress counter */}
                <div className="space-y-2 pt-2 max-w-md">
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="text-zinc-300 font-medium">
                      18 of 25 Institution Setups Claimed
                    </span>
                    <span className="text-zinc-400">7 Slots Remaining</span>
                  </div>
                  <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden border border-zinc-800">
                    <div className="bg-gradient-to-r from-zinc-500 to-white h-full rounded-full w-[72%] transition-all duration-1000" />
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    href="/free-school-management-software#enquiry-form"
                    className="px-6 py-3.5 rounded-full bg-white hover:bg-zinc-200 text-black font-bold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                  >
                    <span>Claim Free School License</span>
                    <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                  </Link>
                  <Link
                    href="/free-school-management-software"
                    className="px-6 py-3.5 rounded-full bg-zinc-900 hover:bg-zinc-850 text-zinc-300 hover:text-white border border-zinc-800 text-xs font-mono uppercase tracking-wider flex items-center justify-center transition-colors"
                  >
                    <span>Explore ERP Architecture</span>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5">
                <Link 
                  href="/free-school-management-software" 
                  className="block relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/40 p-1.5 shadow-2xl group/img hover:border-zinc-600 transition-all"
                >
                  <Image
                    src="/images/free-school-management-software.webp"
                    alt="SchoolMIS Cloud Management ERP Interface"
                    width={600}
                    height={338}
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="w-full h-auto object-cover rounded-xl transition-transform duration-500 group-hover/img:scale-[1.01]"
                    loading="lazy"
                  />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Closing Conversion Stage: Clean, Focused, Uncluttered */}
        <section className="w-full">
          <div className="w-full p-8 sm:p-12 rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900/60 to-zinc-950 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-xl space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                Start Your Next Project
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight">
                Ready to modernize your digital infrastructure?
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed font-light">
                Whether you need a high-converting web platform, automated WhatsApp workflows, or school management software — let's build it.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
              <Link
                href="/intake-form"
                className="px-7 py-3.5 rounded-full text-xs sm:text-sm font-mono uppercase tracking-wider bg-white hover:bg-zinc-200 text-black font-bold text-center inline-flex items-center justify-center gap-2 shadow-lg shadow-white/10"
              >
                <span>Submit Request</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <a
                href={`https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=Hi%20DigitalSimpleSolution,%20I'd%20like%20to%20discuss%20a%20project.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-full text-xs sm:text-sm font-mono uppercase tracking-wider text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-center inline-flex items-center justify-center gap-2 transition-colors"
              >
                <span>Chat on WhatsApp</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
