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
    <div className="w-full bg-[#09090b] text-zinc-100 flex flex-col justify-center min-h-[calc(100vh-80px)] pt-32 pb-20 sm:pt-36 sm:pb-24 px-4 sm:px-10 lg:px-16 font-sans overflow-x-hidden relative">
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-5xl h-96 bg-zinc-800/10 blur-[140px] pointer-events-none rounded-full" />

      {/* Main Container */}
      <main className="w-full max-w-6xl mx-auto my-auto flex flex-col items-start text-left relative z-10">
        
        {/* Main Hero with 3D Perspective Corridor */}
        <ImageStreamHero
          images={HERO_STREAM_IMAGES}
          className="w-full rounded-3xl border border-zinc-800/80 bg-zinc-950/80 shadow-2xl mb-8 overflow-hidden backdrop-blur-sm"
          speed={20}
          cards={9}
          axis={52}
        >
          <div className="relative z-10 flex min-h-[460px] sm:min-h-[500px] flex-col justify-between p-6 sm:p-12 bg-gradient-to-b from-black/85 via-black/50 to-black/90">
            <div>
              <div className="flex items-center gap-2 sm:gap-3 mb-5 flex-wrap">
                <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-300 bg-zinc-900/90 border border-zinc-800 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                  <Sparkles className="w-3 h-3 text-zinc-400" />
                  Digital Studio &amp; Systems
                </span>
                <span className="text-zinc-700 hidden sm:inline">•</span>
                <span className="inline-flex items-center gap-2 text-[11px] font-mono text-zinc-400 bg-zinc-900/60 border border-zinc-800/80 px-3 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Available for new deployments
                </span>
              </div>

              {/* Big Statement */}
              <h1 className="text-2xl sm:text-5xl md:text-6xl font-light tracking-tight leading-[1.15] sm:leading-[1.1] mb-6 font-heading max-w-3xl text-white">
                We engineer high-converting <span className="text-zinc-100 font-normal">digital platforms</span>, landing pages &amp; <span className="text-zinc-300 font-light">automated systems</span>.
              </h1>
              
              <p className="text-sm sm:text-base text-zinc-400 font-light max-w-2xl leading-relaxed mb-6">
                Purpose-built software architecture, modern web development, and algorithmic acquisition workflows tailored for enterprise scaling.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/intake-form"
                className="px-6 py-3 rounded-full text-xs font-mono uppercase tracking-wider bg-white text-black font-semibold hover:bg-zinc-200 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer inline-flex items-center gap-2 shadow-sm"
              >
                <span>Submit Request</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={() => openQuickModal()}
                className="px-6 py-3 rounded-full text-xs font-mono uppercase tracking-wider text-zinc-200 hover:text-white bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-750 transition-colors cursor-pointer backdrop-blur-sm"
              >
                Quick Inquire
              </button>
              <Link
                href="/demo-hero"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-zinc-200 border border-zinc-800 hover:border-zinc-700 bg-zinc-950/40 transition-colors"
              >
                <span>3D Corridor Demo</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </ImageStreamHero>

        {/* 3 Core Pillars */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 pt-6 pb-8 border-t border-zinc-850">
          <Link 
            href="/landing-pages" 
            className="group/pillar block p-5 rounded-2xl border border-zinc-850/60 bg-zinc-950/30 hover:bg-zinc-900/40 hover:border-zinc-750 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Laptop className="w-4 h-4 text-zinc-400 group-hover/pillar:text-white transition-colors" />
                <h2 className="font-mono text-zinc-400 text-xs uppercase tracking-widest group-hover/pillar:text-white transition-colors">
                  01 / Engineering
                </h2>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 opacity-0 group-hover/pillar:opacity-100 group-hover/pillar:text-white transition-all transform group-hover/pillar:translate-x-0.5 group-hover/pillar:-translate-y-0.5" />
            </div>
            <p className="text-zinc-400 group-hover/pillar:text-zinc-300 text-xs leading-relaxed font-light transition-colors">
              High-performance Next.js web applications, client portals, and secure e-commerce architectures engineered for speed.
            </p>
          </Link>

          <Link 
            href="/meta-ads" 
            className="group/pillar block p-5 rounded-2xl border border-zinc-850/60 bg-zinc-950/30 hover:bg-zinc-900/40 hover:border-zinc-750 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <LineChart className="w-4 h-4 text-zinc-400 group-hover/pillar:text-white transition-colors" />
                <h2 className="font-mono text-zinc-400 text-xs uppercase tracking-widest group-hover/pillar:text-white transition-colors">
                  02 / Acquisition
                </h2>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 opacity-0 group-hover/pillar:opacity-100 group-hover/pillar:text-white transition-all transform group-hover/pillar:translate-x-0.5 group-hover/pillar:-translate-y-0.5" />
            </div>
            <p className="text-zinc-400 group-hover/pillar:text-zinc-300 text-xs leading-relaxed font-light transition-colors">
              Targeted Meta &amp; Google ad campaigns engineered for measurable ROAS, attribution accuracy, and customer acquisition.
            </p>
          </Link>

          <Link 
            href="/whatsapp-automation" 
            className="group/pillar block p-5 rounded-2xl border border-zinc-850/60 bg-zinc-950/30 hover:bg-zinc-900/40 hover:border-zinc-750 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-zinc-400 group-hover/pillar:text-white transition-colors" />
                <h2 className="font-mono text-zinc-400 text-xs uppercase tracking-widest group-hover/pillar:text-white transition-colors">
                  03 / Automation
                </h2>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 opacity-0 group-hover/pillar:opacity-100 group-hover/pillar:text-white transition-all transform group-hover/pillar:translate-x-0.5 group-hover/pillar:-translate-y-0.5" />
            </div>
            <p className="text-zinc-400 group-hover/pillar:text-zinc-300 text-xs leading-relaxed font-light transition-colors">
              WhatsApp Cloud API workflows for instant, 24/7 autonomous lead capture, CRM synchronization, and booking sequences.
            </p>
          </Link>
        </div>

        {/* Minimalist Metrics Strip */}
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 py-6 px-6 mb-8 rounded-2xl border border-zinc-850/80 bg-zinc-950/40">
          <div>
            <div className="font-mono text-2xl font-normal text-white">99.9%</div>
            <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mt-0.5">System Reliability</div>
          </div>
          <div>
            <div className="font-mono text-2xl font-normal text-white">₹0</div>
            <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mt-0.5">ERP License Cost</div>
          </div>
          <div>
            <div className="font-mono text-2xl font-normal text-white">&lt; 48h</div>
            <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mt-0.5">Deployment Window</div>
          </div>
          <div>
            <div className="font-mono text-2xl font-normal text-white">24/7</div>
            <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mt-0.5">Automated Workflows</div>
          </div>
        </div>

        {/* Highlight Feature Card: SchoolMIS ERP (Minimalist Redesign) */}
        <div className="w-full my-4 sm:my-6 p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-zinc-850 hover:border-zinc-750 transition-all shadow-xl relative overflow-hidden group">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4 text-left">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-750 text-zinc-200 text-[10px] font-mono uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Enterprise School ERP</span>
                </span>
                <span className="inline-flex items-center gap-1 bg-zinc-900/60 text-zinc-400 border border-zinc-800 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider">
                  <Clock className="w-3 h-3 text-zinc-400" />
                  <span>Limited Institution Slots</span>
                </span>
                <span className="px-3 py-1 rounded-full bg-white text-black text-[10px] font-mono font-bold uppercase tracking-wider">
                  Zero License Fee
                </span>
              </div>

              <h3 className="text-xl sm:text-3xl font-light text-white font-heading tracking-tight">
                SchoolMIS — Complete Cloud School Management ERP
              </h3>

              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light max-w-xl">
                Comprehensive educational management software for schools, colleges, and academies. Automate student enrollments, daily attendance tracking, fee invoicing with receipts, report cards, and automated WhatsApp parent alerts at zero software license cost.
              </p>

              {/* Progress counter */}
              <div className="space-y-2 pt-1 max-w-md">
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

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/free-school-management-software#enquiry-form"
                  className="px-5 py-3 rounded-xl bg-white hover:bg-zinc-200 text-black font-semibold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
                >
                  <span>Claim Free School License</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/free-school-management-software"
                  className="px-5 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-850 text-zinc-300 hover:text-white border border-zinc-800 text-xs font-mono uppercase tracking-wider flex items-center justify-center transition-colors"
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

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-4">
          <Link
            href="/intake-form"
            className="px-6 py-3 rounded-full text-xs font-mono uppercase tracking-wider bg-white text-black font-semibold hover:bg-zinc-200 transition-all cursor-pointer inline-flex items-center gap-2 shadow-sm"
          >
            <span>Submit Request</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={() => openQuickModal()}
            className="px-6 py-3 rounded-full text-xs font-mono uppercase tracking-wider text-zinc-300 hover:text-white bg-zinc-900/60 hover:bg-zinc-850 border border-zinc-800 transition-colors cursor-pointer"
          >
            Quick Inquire
          </button>

          <a
            href={`https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=Hi%20DigitalSimpleSolution,%20I'd%20like%20to%20discuss%20a%20project.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-mono uppercase tracking-wider text-zinc-300 hover:text-white bg-zinc-900/60 hover:bg-zinc-850 border border-zinc-800 transition-colors"
          >
            <span>Chat on WhatsApp</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          <Link
            href="/admin"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-white bg-zinc-950 border border-zinc-850 hover:border-zinc-700 transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white" />
            <span>Admin Portal</span>
          </Link>
        </div>

      </main>
    </div>
  );
}
