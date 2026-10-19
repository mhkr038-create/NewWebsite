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
    <div className="w-full bg-[#070709] text-zinc-100 flex flex-col justify-start min-h-screen pt-20 sm:pt-36 pb-20 sm:pb-24 px-4 sm:px-8 lg:px-12 font-sans overflow-x-hidden selection:bg-white selection:text-black">
      
      {/* Studio Blueprint Container */}
      <main className="w-full max-w-6xl mx-auto flex flex-col text-left space-y-16 sm:space-y-28">
        
        {/* =========================================================================
            STAGE 01: ARCHITECTURAL HERO & SPEC SHEET (MOBILE FIRST)
            ========================================================================= */}
        <section className="w-full border-b border-zinc-800 pb-12 sm:pb-20">
          
          {/* Technical Metadata Rail - 375px Safe */}
          <div className="w-full border-b border-zinc-850 pb-2.5 mb-6 sm:mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-[11px] uppercase tracking-wider text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-400 shrink-0" />
              <span className="text-zinc-200 font-bold truncate">
                {SITE_CONFIG.brandName} // ARCHITECTURE
              </span>
            </div>
            <div className="flex items-center gap-2 text-zinc-400 text-[10px] sm:text-[11px] overflow-hidden">
              <span>INDIA // GLOBAL</span>
              <span className="text-zinc-700">|</span>
              <span>V3.2-PROD</span>
              <span className="text-zinc-700">|</span>
              <span className="text-emerald-400 font-medium">Q4 ACTIVE</span>
            </div>
          </div>

          {/* Asymmetric Studio Grid (Single Column on Mobile) */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            
            {/* Left 8 Cols: Monumental Typographic Statement & 4-Pillar Architecture */}
            <div className="lg:col-span-8 space-y-4 sm:space-y-6">
              <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider block">
                [ 01 // ARCHITECTURE &amp; AUTOMATION ]
              </span>
              
              <h1 className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-[4.75rem] font-black tracking-tight leading-[1.08] text-white font-heading uppercase break-words">
                HIGH-PERFORMANCE <br />
                <span className="text-zinc-500 hover:text-zinc-400 transition-colors">WEB SYSTEMS.</span> <br />
                ZERO-LICENSE ERPS.
              </h1>
              
              <p className="text-xs sm:text-base md:text-lg text-zinc-300 font-normal max-w-2xl leading-relaxed">
                We engineer bespoke Next.js 15 platforms, high-converting acquisition funnels, and autonomous 24/7 WhatsApp AI pipelines. Built from scratch with sub-second speeds, zero bloated page-builders, and zero recurring software licenses.
              </p>

              {/* [ 02 // WHO IT IS FOR ] - Explicit Audience Registry (Single Column Stack) */}
              <div className="border border-zinc-800 bg-zinc-950/80 p-3 sm:p-4 font-mono text-xs space-y-2">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-emerald-400 font-bold border-b border-zinc-850 pb-1.5">
                  <span>[ 02 // WHO IT IS FOR ]</span>
                  <span className="text-zinc-500 font-normal hidden sm:inline">QUALIFIED AUDIENCE</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 font-sans text-xs">
                  <div className="border-l border-zinc-800 pl-2.5 space-y-0.5">
                    <span className="font-mono text-white text-[11px] block font-semibold uppercase">Founders &amp; Brands</span>
                    <span className="text-zinc-400 font-normal text-[11px] leading-snug block">Outgrowing slow WordPress sites that leak ad spend &amp; bounce visitors.</span>
                  </div>
                  <div className="border-l border-zinc-800 pl-2.5 space-y-0.5">
                    <span className="font-mono text-white text-[11px] block font-semibold uppercase">Schools &amp; Institutes</span>
                    <span className="text-zinc-400 font-normal text-[11px] leading-snug block">Eliminating ₹30k–₹1.5L/yr fees with our ₹0-license SchoolMIS.</span>
                  </div>
                  <div className="border-l border-zinc-800 pl-2.5 space-y-0.5">
                    <span className="font-mono text-white text-[11px] block font-semibold uppercase">Growth &amp; Sales</span>
                    <span className="text-zinc-400 font-normal text-[11px] leading-snug block">Qualifying inbound leads in &lt;15 seconds via WhatsApp AI.</span>
                  </div>
                </div>
              </div>

              {/* [ 03 // WHY IT MATTERS ] - Quantifiable Impact */}
              <div className="space-y-1.5 pt-1 font-mono text-[11px] text-zinc-300">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider block font-bold">
                  [ 03 // WHY IT MATTERS ]:
                </span>
                <div className="flex flex-col gap-1.5">
                  <span className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>&lt;1.2s Load Speeds (2x Mobile Conversion)</span>
                  </span>
                  <span className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>₹0 Recurring Software Fees (Save ₹30k–₹1.5L/yr)</span>
                  </span>
                  <span className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>&lt;15s Automated WhatsApp AI Lead Qualification</span>
                  </span>
                </div>
              </div>

              {/* [ 04 // ONE CLEAR CTA ] - Mobile-First Dominant Action */}
              <div className="pt-2 space-y-2.5">
                <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-wider font-bold block">
                  [ 04 // WHAT TO DO NEXT ]
                </span>

                {/* Primary CTA - Full-Width on Mobile, Min 52px Touch Target */}
                <Link
                  href="/intake-form"
                  className="w-full sm:w-auto min-h-[52px] px-5 sm:px-8 py-3.5 sm:py-4 bg-white hover:bg-zinc-200 text-black font-mono text-xs sm:text-sm uppercase tracking-wider font-extrabold flex items-center justify-between sm:justify-center gap-3 transition-all border border-white shadow-lg active:scale-[0.98]"
                >
                  <span>Initiate Project Scope</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                </Link>

                {/* Single Secondary Helper Text Link */}
                <div className="flex flex-wrap items-center gap-2 pt-0.5 font-mono text-[11px] text-zinc-400">
                  <span>Need immediate callback?</span>
                  <button
                    onClick={() => openQuickModal()}
                    className="text-zinc-200 hover:text-white underline underline-offset-4 decoration-zinc-700 hover:decoration-white transition-colors cursor-pointer"
                  >
                    Request a 30s Callback →
                  </button>
                </div>
              </div>
            </div>

            {/* Right 4 Cols: Live Architectural Spec Sheet & Core Rubric */}
            <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-zinc-850 pt-8 lg:pt-0 lg:pl-10 space-y-5">
              <div className="border border-zinc-800 bg-zinc-950 p-4 sm:p-5">
                <div className="flex items-center justify-between border-b border-zinc-850 pb-3 mb-4 font-mono text-[11px] uppercase tracking-wider text-zinc-400">
                  <span>EXECUTIVE SUMMARY</span>
                  <span className="text-emerald-400 font-semibold">PRODUCTION SPEC</span>
                </div>
                
                <div className="space-y-4 font-mono text-xs">
                  <div>
                    <div className="text-[10px] text-zinc-500 uppercase tracking-widest">[ 01 // WHAT IT IS ]</div>
                    <div className="text-white font-medium text-xs mt-0.5">High-Speed Next.js Platforms &amp; ₹0-License Cloud ERPs</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-500 uppercase tracking-widest">[ 02 // WHO IT IS FOR ]</div>
                    <div className="text-zinc-300 font-medium text-xs mt-0.5">Founders, Commercial Enterprises &amp; Educational Institutes</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-500 uppercase tracking-widest">[ 03 // WHY IT MATTERS ]</div>
                    <div className="text-zinc-300 font-medium text-xs mt-0.5">&lt;1.2s Load Speed • ₹0 Software Fees • &lt;15s WhatsApp AI</div>
                  </div>
                  <div className="pt-2 border-t border-zinc-900">
                    <div className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold">[ 04 // WHAT TO DO NEXT ]</div>
                    <div className="text-white font-semibold text-xs mt-0.5">Submit Project Scope (12h Quote) or 30s Callback</div>
                  </div>
                </div>
              </div>

              <div className="border border-zinc-850 bg-zinc-950 p-5 space-y-3 font-mono text-xs">
                <div className="text-[11px] uppercase tracking-wider text-zinc-400 pb-2 border-b border-zinc-900 flex justify-between">
                  <span>PRODUCTION BENCHMARKS</span>
                  <span className="text-zinc-200">VERIFIED</span>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-900">
                  <span className="text-zinc-400">MOBILE SPEED</span>
                  <span className="text-white font-medium">&lt; 1.2S FCP GUARANTEE</span>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-900">
                  <span className="text-zinc-400">CORE WEB VITALS</span>
                  <span className="text-white font-medium">95+ GREEN BENCHMARK</span>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-900">
                  <span className="text-zinc-400">EDTECH ERP</span>
                  <span className="text-emerald-400 font-bold">₹0 RECURRING LICENSE</span>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-900">
                  <span className="text-zinc-400">AUTOMATION</span>
                  <span className="text-white font-medium">&lt; 15S WHATSAPP RESPONSE</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-zinc-400">TURNAROUND</span>
                  <span className="text-white font-medium">&lt; 48 HOURS DISPATCH</span>
                </div>
              </div>
            </div>

          </div>
        </section>


        {/* =========================================================================
            STAGE 02: THE STUDIO LEDGER (SINGLE COLUMN ON MOBILE)
            ========================================================================= */}
        <section className="w-full border-b border-zinc-800 pb-12 sm:pb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-zinc-800 border-y border-zinc-800">
            
            <div className="p-5 sm:p-8 space-y-2 text-left">
              <span className="font-mono text-[10px] sm:text-[11px] text-zinc-400 uppercase tracking-wider block">
                [ 01 // RELIABILITY ]
              </span>
              <div className="font-mono text-3xl sm:text-5xl font-black text-white tracking-tight">99.98%</div>
              <div className="text-xs font-mono uppercase text-zinc-400 tracking-wider">Cloud Uptime SLA</div>
              <p className="text-xs text-zinc-400 font-normal pt-1">
                Zero single-point-of-failure cloud architectures with automatic failover.
              </p>
            </div>

            <div className="p-5 sm:p-8 space-y-2 text-left">
              <span className="font-mono text-[10px] sm:text-[11px] text-zinc-400 uppercase tracking-wider block">
                [ 02 // ERP INITIATIVE ]
              </span>
              <div className="font-mono text-3xl sm:text-5xl font-black text-white tracking-tight">₹0.00</div>
              <div className="text-xs font-mono uppercase text-zinc-400 tracking-wider">Software License Cost</div>
              <p className="text-xs text-zinc-400 font-normal pt-1">
                Enterprise School ERP suite (valued ₹30,000) provided at ₹0 software fee.
              </p>
            </div>

            <div className="p-5 sm:p-8 space-y-2 text-left">
              <span className="font-mono text-[10px] sm:text-[11px] text-zinc-400 uppercase tracking-wider block">
                [ 03 // VELOCITY ]
              </span>
              <div className="font-mono text-3xl sm:text-5xl font-black text-white tracking-tight">&lt; 48H</div>
              <div className="text-xs font-mono uppercase text-zinc-400 tracking-wider">Deployment Window</div>
              <p className="text-xs text-zinc-400 font-normal pt-1">
                From requirements freeze and data import to live production launch.
              </p>
            </div>

            <div className="p-5 sm:p-8 space-y-2 text-left">
              <span className="font-mono text-[10px] sm:text-[11px] text-zinc-400 uppercase tracking-wider block">
                [ 04 // RUNTIME ]
              </span>
              <div className="font-mono text-3xl sm:text-5xl font-black text-white tracking-tight">24/7/365</div>
              <div className="text-xs font-mono uppercase text-zinc-400 tracking-wider">Autonomous Workflows</div>
              <p className="text-xs text-zinc-400 font-normal pt-1">
                Continuous lead qualification, WhatsApp appointment booking, and CRM sync.
              </p>
            </div>

          </div>
        </section>


        {/* =========================================================================
            STAGE 03: CAPABILITIES MATRIX (SYSTEMATIC DISCIPLINES)
            ========================================================================= */}
        <section className="w-full space-y-6 sm:space-y-8 border-b border-zinc-800 pb-12 sm:pb-20">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4">
            <div>
              <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider block mb-1.5 sm:mb-2">
                [ 02 // CAPABILITIES MATRIX ]
              </span>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white font-heading uppercase tracking-tight">
                Systematic Disciplines
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-md font-mono uppercase tracking-wider">
              Web engineering, high-ROAS paid media, and conversational automation united under one rigorous technical architecture.
            </p>
          </div>

          {/* Tabular Registry Rows - Mobile First Single Column */}
          <div className="border-t border-zinc-800 divide-y divide-zinc-800">
            
            {/* Row 01 */}
            <div className="group py-6 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start hover:bg-zinc-950/70 transition-colors px-1 sm:px-4">
              <div className="lg:col-span-2 font-mono text-xs sm:text-sm text-zinc-400 group-hover:text-white transition-colors">
                01 // PLATFORMS
              </div>
              <div className="lg:col-span-5 space-y-2 text-left">
                <h3 className="text-lg sm:text-2xl font-bold text-white font-heading uppercase group-hover:text-zinc-100">
                  High-Performance Web &amp; Landing Platforms
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                  Built on Next.js 15 App Router with server-side rendering, instant cache revalidation, and a strict 1:1 attention ratio that converts cold traffic into paying clients.
                </p>
              </div>
              <div className="lg:col-span-3 flex flex-wrap gap-1.5 items-center font-mono text-[10px] sm:text-[11px] text-zinc-400">
                <span className="border border-zinc-800 bg-zinc-900/60 px-2 py-0.5 text-zinc-300">NEXT.JS 15</span>
                <span className="border border-zinc-800 bg-zinc-900/60 px-2 py-0.5 text-zinc-300">VITALS 95+</span>
                <span className="border border-zinc-800 bg-zinc-900/60 px-2 py-0.5 text-zinc-300">&lt; 1.2S FCP</span>
              </div>
              <div className="lg:col-span-2 flex justify-start lg:justify-end items-center pt-2 lg:pt-0 w-full sm:w-auto">
                <Link
                  href="/landing-pages"
                  className="w-full sm:w-auto min-h-[46px] inline-flex items-center justify-between sm:justify-center gap-3 font-mono text-xs uppercase tracking-wider text-white sm:text-zinc-400 hover:text-white bg-zinc-900 sm:bg-transparent px-4 py-3 sm:px-0 sm:py-0 border border-zinc-800 sm:border-0 sm:border-b sm:border-transparent hover:border-white transition-all active:scale-[0.98]"
                >
                  <span>Explore Specs</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Row 02 */}
            <div className="group py-6 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start hover:bg-zinc-950/70 transition-colors px-1 sm:px-4">
              <div className="lg:col-span-2 font-mono text-xs sm:text-sm text-zinc-400 group-hover:text-white transition-colors">
                02 // ACQUISITION
              </div>
              <div className="lg:col-span-5 space-y-2 text-left">
                <h3 className="text-lg sm:text-2xl font-bold text-white font-heading uppercase group-hover:text-zinc-100">
                  Algorithmic Paid Media &amp; Attribution
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                  Multi-channel acquisition funnels combining high-intent Google Search capture with Meta visual demand generation, tracked via Server-Side Conversions API for verified ROAS.
                </p>
              </div>
              <div className="lg:col-span-3 flex flex-wrap gap-1.5 items-center font-mono text-[10px] sm:text-[11px] text-zinc-400">
                <span className="border border-zinc-800 bg-zinc-900/60 px-2 py-0.5 text-zinc-300">META CAPI</span>
                <span className="border border-zinc-800 bg-zinc-900/60 px-2 py-0.5 text-zinc-300">GOOGLE SEARCH</span>
                <span className="border border-zinc-800 bg-zinc-900/60 px-2 py-0.5 text-zinc-300">ROAS TRACKING</span>
              </div>
              <div className="lg:col-span-2 flex justify-start lg:justify-end items-center pt-2 lg:pt-0 w-full sm:w-auto">
                <Link
                  href="/meta-ads"
                  className="w-full sm:w-auto min-h-[46px] inline-flex items-center justify-between sm:justify-center gap-3 font-mono text-xs uppercase tracking-wider text-white sm:text-zinc-400 hover:text-white bg-zinc-900 sm:bg-transparent px-4 py-3 sm:px-0 sm:py-0 border border-zinc-800 sm:border-0 sm:border-b sm:border-transparent hover:border-white transition-all active:scale-[0.98]"
                >
                  <span>Explore Specs</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Row 03 */}
            <div className="group py-6 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start hover:bg-zinc-950/70 transition-colors px-1 sm:px-4">
              <div className="lg:col-span-2 font-mono text-xs sm:text-sm text-zinc-400 group-hover:text-white transition-colors">
                03 // AUTOMATION
              </div>
              <div className="lg:col-span-5 space-y-2 text-left">
                <h3 className="text-lg sm:text-2xl font-bold text-white font-heading uppercase group-hover:text-zinc-100">
                  Autonomous WhatsApp &amp; Workflow AI
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                  Direct integration with the official WhatsApp Cloud API. Webhook triggers respond in under 30 seconds, automatically qualify prospect budgets, book appointments, and update CRM records.
                </p>
              </div>
              <div className="lg:col-span-3 flex flex-wrap gap-1.5 items-center font-mono text-[10px] sm:text-[11px] text-zinc-400">
                <span className="border border-zinc-800 bg-zinc-900/60 px-2 py-0.5 text-zinc-300">WHATSAPP API</span>
                <span className="border border-zinc-800 bg-zinc-900/60 px-2 py-0.5 text-zinc-300">&lt;30S DISPATCH</span>
                <span className="border border-zinc-800 bg-zinc-900/60 px-2 py-0.5 text-zinc-300">CRM SYNC</span>
              </div>
              <div className="lg:col-span-2 flex justify-start lg:justify-end items-center pt-2 lg:pt-0 w-full sm:w-auto">
                <Link
                  href="/whatsapp-automation"
                  className="w-full sm:w-auto min-h-[46px] inline-flex items-center justify-between sm:justify-center gap-3 font-mono text-xs uppercase tracking-wider text-white sm:text-zinc-400 hover:text-white bg-zinc-900 sm:bg-transparent px-4 py-3 sm:px-0 sm:py-0 border border-zinc-800 sm:border-0 sm:border-b sm:border-transparent hover:border-white transition-all active:scale-[0.98]"
                >
                  <span>Explore Specs</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </section>


        {/* =========================================================================
            STAGE 04: ARCHITECTURAL BLUEPRINT — SCHOOLMIS ERP (MOBILE FIRST)
            ========================================================================= */}
        <section className="w-full space-y-6 sm:space-y-8 border-b border-zinc-800 pb-12 sm:pb-20">
          
          <div className="border border-zinc-800 bg-zinc-950 p-5 sm:p-10 lg:p-12 relative">
            {/* Technical CAD Corner Crosshairs */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-zinc-500 -translate-x-[1px] -translate-y-[1px]" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-zinc-500 translate-x-[1px] -translate-y-[1px]" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-zinc-500 -translate-x-[1px] translate-y-[1px]" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-zinc-500 translate-x-[1px] translate-y-[1px]" />

            {/* Blueprint Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-850 pb-4 mb-6 font-mono text-[11px] uppercase tracking-wider text-zinc-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-400 shrink-0" />
                <span className="text-white font-bold truncate">EDTECH INITIATIVE // SCHOOLMIS</span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="border border-zinc-800 px-2 py-0.5 text-zinc-300">WORTH ₹30K</span>
                <span className="bg-white text-black font-bold px-2 py-0.5">100% FREE TIER</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
              
              <div className="lg:col-span-7 space-y-5 text-left">
                <h3 className="text-xl sm:text-3xl lg:text-4xl font-black text-white font-heading uppercase tracking-tight">
                  SchoolMIS Cloud Management ERP
                </h3>
                
                <p className="text-xs sm:text-sm md:text-base text-zinc-300 leading-relaxed font-normal">
                  Zero-license-fee cloud administration software built specifically for Indian schools, colleges, and academies. Replaces paper registers and vulnerable single-PC desktop setups with unified, encrypted cloud access.
                </p>

                {/* Technical Module Specs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-mono text-xs text-zinc-300 pt-2 border-t border-zinc-850">
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
                    <span>Daily Attendance Tracking + Parent Alerts</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-zinc-500 font-bold">[04]</span>
                    <span>256-Bit SSL Cloud Storage + Daily Backups</span>
                  </div>
                </div>

                {/* Allocation Counter */}
                <div className="p-3.5 bg-zinc-900/60 border border-zinc-800 font-mono text-xs space-y-2">
                  <div className="flex justify-between text-zinc-300">
                    <span>SETUP ALLOCATION:</span>
                    <span className="font-bold text-white">18 OF 25 CLAIMED</span>
                  </div>
                  <div className="w-full bg-zinc-950 h-2 border border-zinc-800">
                    <div className="bg-white h-full w-[72%]" />
                  </div>
                  <div className="text-[10px] text-zinc-400">
                    Only 7 onboarding slots remaining for current academic cycle.
                  </div>
                </div>

                {/* Tactile Actions - Mobile First (One Dominant Action) */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                  <Link
                    href="/free-school-management-software#enquiry-form"
                    className="w-full sm:w-auto min-h-[52px] inline-flex items-center justify-between sm:justify-center gap-4 px-7 py-4 bg-white text-black font-mono text-xs sm:text-sm uppercase tracking-wider font-extrabold hover:bg-zinc-200 transition-all border border-white active:scale-[0.98] shadow-lg"
                  >
                    <span>Claim School License [₹0 Fee]</span>
                    <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                  </Link>
                  <Link
                    href="/free-school-management-software"
                    className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-between sm:justify-center gap-4 px-6 py-3.5 bg-zinc-950 text-zinc-300 font-mono text-xs uppercase tracking-wider border border-zinc-800 hover:border-zinc-500 hover:text-white transition-all active:scale-[0.98]"
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
                  <span>OPTIMIZED</span>
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
        <section className="w-full pt-2">
          <div className="w-full border border-zinc-800 bg-zinc-950 p-5 sm:p-12 lg:p-16 text-left">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              
              <div className="lg:col-span-7 space-y-3.5">
                <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider block">
                  [ 04 // COMMISSION // DIRECT PROTOCOL ]
                </span>
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white font-heading uppercase tracking-tight">
                  Ready to Deploy High-Velocity Infrastructure?
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-zinc-400 font-normal leading-relaxed max-w-xl">
                  Whether you require a custom web platform, a dedicated WhatsApp qualification engine, or an enterprise school ERP setup — our engineers review and respond within 15 minutes.
                </p>
              </div>

              <div className="lg:col-span-5 flex flex-col gap-3 w-full">
                <Link
                  href="/intake-form"
                  className="group w-full min-h-[52px] inline-flex items-center justify-between px-7 py-4 bg-white text-black font-mono text-xs sm:text-sm uppercase tracking-wider font-extrabold hover:bg-zinc-200 transition-all border border-white active:scale-[0.98]"
                >
                  <span>Submit Engineering Brief</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>

                <a
                  href={`https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=Hi%20DigitalSimpleSolution,%20I'd%20like%20to%20discuss%20a%20project.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full min-h-[52px] inline-flex items-center justify-between px-7 py-4 bg-zinc-950 text-zinc-200 font-mono text-xs uppercase tracking-wider border border-zinc-800 hover:border-zinc-500 hover:text-white transition-all active:scale-[0.98]"
                >
                  <span>Direct WhatsApp Line [24/7]</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <div className="font-mono text-[10px] sm:text-[11px] text-zinc-400 uppercase tracking-wider flex items-center justify-between px-1 pt-1">
                  <span>RESPONSE: &lt; 15 MIN SLA</span>
                  <span>256-BIT ENCRYPTION</span>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
