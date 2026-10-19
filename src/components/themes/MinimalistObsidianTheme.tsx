'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { useInquiry } from '../../context/InquiryContext';
import { SITE_CONFIG } from '../../config/siteConfig';

export function MinimalistObsidianTheme() {
  const { openQuickModal } = useInquiry();

  return (
    <div className="w-full bg-[#070709] text-zinc-100 flex flex-col justify-start min-h-screen pt-28 sm:pt-36 pb-24 px-4 sm:px-8 lg:px-12 font-sans overflow-x-hidden selection:bg-white selection:text-black">
      
      {/* Studio Blueprint Container */}
      <main className="w-full max-w-6xl mx-auto flex flex-col text-left space-y-20 sm:space-y-28">
        
        {/* =========================================================================
            STAGE 01: ARCHITECTURAL HERO & SPEC SHEET
            ========================================================================= */}
        <section className="w-full border-b border-zinc-800 pb-16 sm:pb-20">
          
          {/* Technical Metadata Rail */}
          <div className="w-full border-b border-zinc-850 pb-3 mb-8 sm:mb-12 flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-widest text-zinc-400">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 bg-emerald-400" />
              <span className="text-zinc-200 font-bold tracking-wider">
                {SITE_CONFIG.brandName} // ARCHITECTURE &amp; AUTOMATION
              </span>
            </div>
            <div className="flex items-center gap-3 text-zinc-400 text-[10px] sm:text-[11px]">
              <span>LOC: INDIA // GLOBAL</span>
              <span className="text-zinc-700">|</span>
              <span>SYS_REF: V3.2-PROD</span>
              <span className="text-zinc-700">|</span>
              <span className="text-emerald-400 font-medium">Q4 ACTIVE</span>
            </div>
          </div>

          {/* Asymmetric Studio Grid */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* Left 8 Cols: Monumental Typographic Statement */}
            <div className="lg:col-span-8 space-y-6">
              <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-widest block">
                [ 00 // CORE THESIS ]
              </span>
              
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-black tracking-tight leading-[0.94] text-white font-heading uppercase">
                ENGINEERED <br />
                <span className="text-zinc-500 hover:text-zinc-400 transition-colors">FOR REVENUE.</span> <br />
                BUILT TO SCALE.
              </h1>
              
              <p className="text-base sm:text-lg text-zinc-300 font-light max-w-2xl leading-relaxed">
                We eliminate slow websites, leaked advertising budgets, and manual lead decay. Purpose-built Next.js software platforms, conversion landing pages, and autonomous 24/7 WhatsApp AI systems.
              </p>

              {/* Tactile Architectural Action Group */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-4">
                <Link
                  href="/intake-form"
                  className="group relative inline-flex items-center justify-between gap-6 px-7 py-4 bg-white text-black font-mono text-xs uppercase tracking-widest font-bold hover:bg-zinc-200 transition-all border border-white"
                >
                  <span>Initiate Project</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>

                <button
                  onClick={() => openQuickModal()}
                  className="group relative inline-flex items-center justify-between gap-6 px-7 py-4 bg-zinc-950 text-zinc-300 font-mono text-xs uppercase tracking-widest border border-zinc-800 hover:border-zinc-500 hover:text-white transition-all cursor-pointer"
                >
                  <span>Quick Inquire [30s]</span>
                  <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
                </button>

                <Link
                  href="/demos"
                  className="inline-flex items-center justify-center gap-2 px-5 py-4 font-mono text-xs uppercase tracking-widest text-zinc-400 hover:text-white transition-colors border-b border-transparent hover:border-zinc-400"
                >
                  <span>Live Work Archive [8]</span>
                  <span className="text-zinc-400">↗</span>
                </Link>
              </div>

              {/* Direct Trust Metadata */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-6 font-mono text-[11px] text-zinc-400 border-t border-zinc-850">
                <span className="flex items-center gap-1.5 text-zinc-300">
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> &lt;48-Hour Rapid Deployments
                </span>
                <span className="flex items-center gap-1.5 text-zinc-300">
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> 99.98% Cloud SLA
                </span>
                <span className="flex items-center gap-1.5 text-zinc-300">
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> ₹0 License School ERP
                </span>
              </div>
            </div>

            {/* Right 4 Cols: Live Architectural Spec Sheet */}
            <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-zinc-850 pt-8 lg:pt-0 lg:pl-10 space-y-6">
              <div className="border border-zinc-800 bg-zinc-950 p-5">
                <div className="flex items-center justify-between border-b border-zinc-850 pb-3 mb-4 font-mono text-[11px] uppercase tracking-wider text-zinc-400">
                  <span>SPECIFICATION</span>
                  <span className="text-zinc-300 font-semibold">PRODUCTION STANDARDS</span>
                </div>
                
                <div className="space-y-3 font-mono text-xs">
                  <div className="flex justify-between py-1 border-b border-zinc-900">
                    <span className="text-zinc-400">FRAMEWORK</span>
                    <span className="text-white font-medium">NEXT.JS 15 (APP ROUTER)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-zinc-900">
                    <span className="text-zinc-400">CORE WEB VITALS</span>
                    <span className="text-white font-medium">95+ GREEN BENCHMARK</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-zinc-900">
                    <span className="text-zinc-400">MOBILE SPEED</span>
                    <span className="text-white font-medium">&lt; 1.2S FCP GUARANTEE</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-zinc-900">
                    <span className="text-zinc-400">AUTOMATION</span>
                    <span className="text-white font-medium">WHATSAPP CLOUD API</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-zinc-900">
                    <span className="text-zinc-400">EDTECH ERP</span>
                    <span className="text-emerald-400 font-bold">₹0 RECURRING LICENSE</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-zinc-400">DEPLOYMENT SLA</span>
                    <span className="text-white font-medium">&lt; 48 HOURS TURNAROUND</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-zinc-950 border border-zinc-850 font-mono text-[11px] text-zinc-400 space-y-2">
                <div className="flex items-center gap-2 text-zinc-300 font-semibold">
                  <span className="text-emerald-400">■</span> RIGOROUS CRAFT
                </div>
                <p className="font-sans text-xs text-zinc-400 leading-relaxed font-light">
                  No drag-and-drop page builders. Every platform is custom coded with strict semantic HTML, JSON-LD Schema markup, and conversion psychology.
                </p>
              </div>
            </div>

          </div>
        </section>


        {/* =========================================================================
            STAGE 02: THE STUDIO LEDGER (TECHNICAL BENCHMARKS)
            ========================================================================= */}
        <section className="w-full border-b border-zinc-800 pb-16 sm:pb-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 divide-x-0 lg:divide-x divide-zinc-800 border-y border-zinc-800">
            
            <div className="p-6 sm:p-8 space-y-2 text-left">
              <span className="font-mono text-[10px] sm:text-[11px] text-zinc-400 uppercase tracking-widest block">
                [ 01 // RELIABILITY ]
              </span>
              <div className="font-mono text-3xl sm:text-5xl font-black text-white tracking-tight">99.98%</div>
              <div className="text-xs font-mono uppercase text-zinc-400 tracking-wider">Cloud Uptime SLA</div>
              <p className="text-xs text-zinc-400 font-light pt-1">
                Zero single-point-of-failure cloud architectures with automatic failover.
              </p>
            </div>

            <div className="p-6 sm:p-8 space-y-2 text-left">
              <span className="font-mono text-[10px] sm:text-[11px] text-zinc-400 uppercase tracking-widest block">
                [ 02 // ERP INITIATIVE ]
              </span>
              <div className="font-mono text-3xl sm:text-5xl font-black text-white tracking-tight">₹0.00</div>
              <div className="text-xs font-mono uppercase text-zinc-400 tracking-wider">Software License Cost</div>
              <p className="text-xs text-zinc-400 font-light pt-1">
                Enterprise School ERP suite (valued ₹30,000) provided at ₹0 software fee.
              </p>
            </div>

            <div className="p-6 sm:p-8 space-y-2 text-left">
              <span className="font-mono text-[10px] sm:text-[11px] text-zinc-400 uppercase tracking-widest block">
                [ 03 // VELOCITY ]
              </span>
              <div className="font-mono text-3xl sm:text-5xl font-black text-white tracking-tight">&lt; 48H</div>
              <div className="text-xs font-mono uppercase text-zinc-400 tracking-wider">Deployment Window</div>
              <p className="text-xs text-zinc-400 font-light pt-1">
                From requirements freeze and data import to live production launch.
              </p>
            </div>

            <div className="p-6 sm:p-8 space-y-2 text-left">
              <span className="font-mono text-[10px] sm:text-[11px] text-zinc-400 uppercase tracking-widest block">
                [ 04 // RUNTIME ]
              </span>
              <div className="font-mono text-3xl sm:text-5xl font-black text-white tracking-tight">24/7/365</div>
              <div className="text-xs font-mono uppercase text-zinc-400 tracking-wider">Autonomous Workflows</div>
              <p className="text-xs text-zinc-400 font-light pt-1">
                Continuous lead qualification, WhatsApp appointment booking, and CRM sync.
              </p>
            </div>

          </div>
        </section>


        {/* =========================================================================
            STAGE 03: CAPABILITIES MATRIX (SYSTEMATIC DISCIPLINES)
            ========================================================================= */}
        <section className="w-full space-y-8 border-b border-zinc-800 pb-16 sm:pb-20">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest block mb-2">
                [ 02 // CAPABILITIES MATRIX ]
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white font-heading uppercase tracking-tight">
                Systematic Disciplines
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-md font-mono uppercase tracking-wider">
              Web engineering, high-ROAS paid media, and conversational automation united under one rigorous technical architecture.
            </p>
          </div>

          {/* Tabular Registry Rows */}
          <div className="border-t border-zinc-800 divide-y divide-zinc-800">
            
            {/* Row 01 */}
            <div className="group py-8 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start hover:bg-zinc-950/70 transition-colors px-2 sm:px-4">
              <div className="lg:col-span-2 font-mono text-sm text-zinc-400 group-hover:text-white transition-colors">
                01 // PLATFORMS
              </div>
              <div className="lg:col-span-4 space-y-2 text-left">
                <h3 className="text-xl sm:text-2xl font-bold text-white font-heading uppercase group-hover:text-zinc-100">
                  High-Performance Web &amp; Landing Platforms
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed font-light">
                  Built on Next.js 15 App Router with server-side rendering, instant cache revalidation, and a strict 1:1 attention ratio that converts cold traffic into paying clients.
                </p>
              </div>
              <div className="lg:col-span-4 flex flex-wrap gap-2 items-center font-mono text-[11px] text-zinc-400">
                <span className="border border-zinc-800 bg-zinc-900/60 px-2.5 py-1 text-zinc-300">NEXT.JS 15</span>
                <span className="border border-zinc-800 bg-zinc-900/60 px-2.5 py-1 text-zinc-300">CORE WEB VITALS 95+</span>
                <span className="border border-zinc-800 bg-zinc-900/60 px-2.5 py-1 text-zinc-300">SUB-SECOND LATENCY</span>
                <span className="border border-zinc-800 bg-zinc-900/60 px-2.5 py-1 text-zinc-300">CONVERSION PSYCHOLOGY</span>
              </div>
              <div className="lg:col-span-2 flex justify-start lg:justify-end items-center">
                <Link
                  href="/landing-pages"
                  className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-zinc-400 hover:text-white border-b border-transparent hover:border-white pb-0.5 transition-all"
                >
                  <span>Explore Specs</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Row 02 */}
            <div className="group py-8 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start hover:bg-zinc-950/70 transition-colors px-2 sm:px-4">
              <div className="lg:col-span-2 font-mono text-sm text-zinc-400 group-hover:text-white transition-colors">
                02 // ACQUISITION
              </div>
              <div className="lg:col-span-4 space-y-2 text-left">
                <h3 className="text-xl sm:text-2xl font-bold text-white font-heading uppercase group-hover:text-zinc-100">
                  Algorithmic Paid Media &amp; Attribution
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed font-light">
                  Multi-channel acquisition funnels combining high-intent Google Search capture with Meta visual demand generation, tracked via Server-Side Conversions API for verified ROAS.
                </p>
              </div>
              <div className="lg:col-span-4 flex flex-wrap gap-2 items-center font-mono text-[11px] text-zinc-400">
                <span className="border border-zinc-800 bg-zinc-900/60 px-2.5 py-1 text-zinc-300">META ADS (CAPI)</span>
                <span className="border border-zinc-800 bg-zinc-900/60 px-2.5 py-1 text-zinc-300">GOOGLE SEARCH INTENT</span>
                <span className="border border-zinc-800 bg-zinc-900/60 px-2.5 py-1 text-zinc-300">ROAS ATTRIBUTION</span>
                <span className="border border-zinc-800 bg-zinc-900/60 px-2.5 py-1 text-zinc-300">CREATIVE SPRINTING</span>
              </div>
              <div className="lg:col-span-2 flex justify-start lg:justify-end items-center">
                <Link
                  href="/meta-ads"
                  className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-zinc-400 hover:text-white border-b border-transparent hover:border-white pb-0.5 transition-all"
                >
                  <span>Explore Specs</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Row 03 */}
            <div className="group py-8 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start hover:bg-zinc-950/70 transition-colors px-2 sm:px-4">
              <div className="lg:col-span-2 font-mono text-sm text-zinc-400 group-hover:text-white transition-colors">
                03 // AUTOMATION
              </div>
              <div className="lg:col-span-4 space-y-2 text-left">
                <h3 className="text-xl sm:text-2xl font-bold text-white font-heading uppercase group-hover:text-zinc-100">
                  Autonomous WhatsApp &amp; Workflow AI
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed font-light">
                  Direct integration with the official WhatsApp Cloud API. Webhook triggers respond in under 30 seconds, automatically qualify prospect budgets, book appointments, and update CRM records.
                </p>
              </div>
              <div className="lg:col-span-4 flex flex-wrap gap-2 items-center font-mono text-[11px] text-zinc-400">
                <span className="border border-zinc-800 bg-zinc-900/60 px-2.5 py-1 text-zinc-300">WHATSAPP CLOUD API</span>
                <span className="border border-zinc-800 bg-zinc-900/60 px-2.5 py-1 text-zinc-300">&lt;30S QUALIFICATION</span>
                <span className="border border-zinc-800 bg-zinc-900/60 px-2.5 py-1 text-zinc-300">CALENDAR AUTO-BOOK</span>
                <span className="border border-zinc-800 bg-zinc-900/60 px-2.5 py-1 text-zinc-300">MULTI-DAY NURTURE</span>
              </div>
              <div className="lg:col-span-2 flex justify-start lg:justify-end items-center">
                <Link
                  href="/whatsapp-automation"
                  className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-zinc-400 hover:text-white border-b border-transparent hover:border-white pb-0.5 transition-all"
                >
                  <span>Explore Specs</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>
        </section>


        {/* =========================================================================
            STAGE 04: ARCHITECTURAL BLUEPRINT — SCHOOLMIS ERP
            ========================================================================= */}
        <section className="w-full space-y-8 border-b border-zinc-800 pb-16 sm:pb-20">
          
          <div className="border border-zinc-800 bg-zinc-950 p-6 sm:p-10 lg:p-12 relative">
            {/* Technical CAD Corner Crosshairs */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-zinc-500 -translate-x-[1px] -translate-y-[1px]" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-zinc-500 translate-x-[1px] -translate-y-[1px]" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-zinc-500 -translate-x-[1px] translate-y-[1px]" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-zinc-500 translate-x-[1px] translate-y-[1px]" />

            {/* Blueprint Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-850 pb-5 mb-8 font-mono text-[11px] uppercase tracking-wider text-zinc-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-400" />
                <span className="text-white font-bold">EDTECH INITIATIVE // ACCESSION #2026-SCHOOLMIS</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="border border-zinc-800 px-2 py-0.5 text-zinc-300">VALUE: ₹30,000 PER LICENSE</span>
                <span className="bg-white text-black font-bold px-2.5 py-0.5">SUBSIDIZED: 100% FREE</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              <div className="lg:col-span-7 space-y-6 text-left">
                <h3 className="text-2xl sm:text-4xl font-black text-white font-heading uppercase tracking-tight">
                  SchoolMIS Cloud Management ERP
                </h3>
                
                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-light">
                  Zero-license-fee cloud administration software built specifically for Indian schools, colleges, and academies. Replaces paper registers and vulnerable single-PC desktop setups with unified, encrypted cloud access.
                </p>

                {/* Technical Module Specs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs text-zinc-300 pt-2 border-t border-zinc-850">
                  <div className="flex items-start gap-2">
                    <span className="text-zinc-500 font-bold">[01]</span>
                    <span>Student &amp; Staff Master Records + ID Cards</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-zinc-500 font-bold">[02]</span>
                    <span>Digital Fee Invoicing + Instant WhatsApp Receipts</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-zinc-500 font-bold">[03]</span>
                    <span>Daily Attendance Tracking + Parent SMS/WhatsApp</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-zinc-500 font-bold">[04]</span>
                    <span>256-Bit SSL Cloud Storage + Automated Backups</span>
                  </div>
                </div>

                {/* Allocation Counter */}
                <div className="p-4 bg-zinc-900/60 border border-zinc-800 font-mono text-xs space-y-2">
                  <div className="flex justify-between text-zinc-300">
                    <span>INSTITUTION SETUP ALLOCATION:</span>
                    <span className="font-bold text-white">18 OF 25 CLAIMED</span>
                  </div>
                  <div className="w-full bg-zinc-950 h-2 border border-zinc-800">
                    <div className="bg-white h-full w-[72%]" />
                  </div>
                  <div className="text-[10px] text-zinc-400">
                    Only 7 onboarding slots remaining for current academic cycle.
                  </div>
                </div>

                {/* Tactile Actions */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                  <Link
                    href="/free-school-management-software#enquiry-form"
                    className="inline-flex items-center justify-between gap-4 px-6 py-4 bg-white text-black font-mono text-xs uppercase tracking-widest font-bold hover:bg-zinc-200 transition-all border border-white"
                  >
                    <span>Claim School License</span>
                    <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                  </Link>
                  <Link
                    href="/free-school-management-software"
                    className="inline-flex items-center justify-between gap-4 px-6 py-4 bg-zinc-950 text-zinc-300 font-mono text-xs uppercase tracking-widest border border-zinc-800 hover:border-zinc-500 hover:text-white transition-all"
                  >
                    <span>View Architecture Specs</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* CAD Style Viewport */}
              <div className="lg:col-span-5 border border-zinc-800 bg-zinc-900/30 p-2 relative">
                <div className="font-mono text-[9px] uppercase tracking-wider text-zinc-400 flex justify-between p-1 border-b border-zinc-800 mb-2">
                  <span>FIG 1.0 // CLOUD CONTROL TERMINAL</span>
                  <span>1920x1080 OPTIMIZED</span>
                </div>
                <Image
                  src="/images/free-school-management-software.webp"
                  alt="SchoolMIS Cloud Management ERP Interface"
                  width={600}
                  height={338}
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="w-full h-auto object-cover border border-zinc-800"
                  loading="lazy"
                />
              </div>

            </div>
          </div>
        </section>


        {/* =========================================================================
            STAGE 05: COMMISSIONING TERMINAL (DIRECT ENGAGEMENT)
            ========================================================================= */}
        <section className="w-full pt-4">
          <div className="w-full border border-zinc-800 bg-zinc-950 p-8 sm:p-12 lg:p-16 text-left">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              <div className="lg:col-span-7 space-y-4">
                <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest block">
                  [ 04 // COMMISSION // DIRECT PROTOCOL ]
                </span>
                <h2 className="text-3xl sm:text-5xl font-black text-white font-heading uppercase tracking-tight">
                  Ready to Deploy High-Velocity Infrastructure?
                </h2>
                <p className="text-sm sm:text-base text-zinc-400 font-light leading-relaxed max-w-xl">
                  Whether you require a custom web platform, a dedicated WhatsApp qualification engine, or an enterprise school ERP setup — our engineers review and respond within 15 minutes.
                </p>
              </div>

              <div className="lg:col-span-5 flex flex-col gap-4">
                <Link
                  href="/intake-form"
                  className="group inline-flex items-center justify-between px-8 py-5 bg-white text-black font-mono text-xs uppercase tracking-widest font-bold hover:bg-zinc-200 transition-all border border-white"
                >
                  <span>Submit Engineering Brief</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>

                <a
                  href={`https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=Hi%20DigitalSimpleSolution,%20I'd%20like%20to%20discuss%20a%20project.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-between px-8 py-5 bg-zinc-950 text-zinc-200 font-mono text-xs uppercase tracking-widest border border-zinc-800 hover:border-zinc-500 hover:text-white transition-all"
                >
                  <span>Direct WhatsApp Line</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <div className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider flex items-center justify-between px-1 pt-1">
                  <span>RESPONSE SLA: &lt; 15 MINUTES</span>
                  <span>SECURE 256-BIT DISPATCH</span>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
