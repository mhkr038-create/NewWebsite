'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';
import { useInquiry } from '../context/InquiryContext';
import { SITE_CONFIG } from '../config/siteConfig';

export function HomeContent() {
  const { openQuickModal } = useInquiry();

  return (
    <div className="w-full bg-black text-white flex flex-col justify-center min-h-[calc(100vh-80px)] pt-28 pb-20 sm:pt-36 sm:pb-24 px-6 sm:px-10 lg:px-16 font-sans">
      {/* Main Hero Content */}
      <main className="w-full max-w-5xl mx-auto my-auto flex flex-col items-start text-left">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">
            Digital Studio & Systems
          </span>
          <span className="text-neutral-700">•</span>
          <span className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Available for projects
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.15] mb-6">
          We design websites and systems that grow your business.
        </h1>

        <p className="text-base sm:text-lg text-neutral-400 max-w-2xl font-light leading-relaxed mb-10">
          High-converting landing pages, targeted Google & Meta ads, and automated WhatsApp workflows. Fast, straightforward, and built for results.
        </p>

        {/* 3 Simple Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full pt-8 pb-10 border-t border-neutral-900 text-sm">
          <div>
            <h2 className="font-mono text-white text-xs uppercase tracking-wider mb-2">
              01 / Websites
            </h2>
            <p className="text-neutral-400 text-xs leading-relaxed font-light">
              High-speed Next.js landing pages tuned for conversions and mobile devices.
            </p>
          </div>

          <div>
            <h2 className="font-mono text-white text-xs uppercase tracking-wider mb-2">
              02 / Paid Ads
            </h2>
            <p className="text-neutral-400 text-xs leading-relaxed font-light">
              Targeted Meta & Google ad campaigns engineered for measurable ROAS.
            </p>
          </div>

          <div>
            <h2 className="font-mono text-white text-xs uppercase tracking-wider mb-2">
              03 / Automation
            </h2>
            <p className="text-neutral-400 text-xs leading-relaxed font-light">
              WhatsApp Cloud API workflows for instant, 24/7 lead capture and booking.
            </p>
          </div>
        </div>

        {/* Highlight Banner: Free School Management Software */}
        <div className="w-full my-8 p-6 rounded-2xl bg-gradient-to-r from-amber-950/40 via-yellow-950/25 to-slate-900 border border-amber-500/40 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 relative z-10">
            <div className="space-y-1.5 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-mono font-extrabold uppercase tracking-wider">
                  SPECIAL OFFER • WORTH ₹30,000
                </span>
                <span className="text-xs text-emerald-400 font-mono font-semibold">100% Free Core ERP</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-heading">
                Free School Management Software
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                Modern ERP for schools & educational institutes. Automate student admissions, daily attendance, fee receipts, report cards, and WhatsApp parent alerts at zero software license cost.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
              <Link
                href="/free-school-management-software#enquiry-form"
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all hover:scale-105 cursor-pointer"
              >
                <span>Submit School Enquiry</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/free-school-management-software"
                className="px-4 py-3 rounded-xl bg-slate-950/80 hover:bg-slate-900 text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center justify-center transition-colors"
              >
                <span>Explore Features</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/intake-form"
            className="px-6 py-3 rounded-full text-xs font-mono uppercase tracking-wider bg-white text-black font-semibold hover:bg-neutral-200 transition-colors cursor-pointer inline-flex items-center gap-2 shadow-lg"
          >
            <span>Submit Request</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={() => openQuickModal()}
            className="px-6 py-3 rounded-full text-xs font-mono uppercase tracking-wider text-neutral-300 hover:text-white border border-neutral-800 hover:border-neutral-600 transition-colors cursor-pointer"
          >
            Quick Inquire
          </button>

          <a
            href={`https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=Hi%20DigitalSimpleSolution,%20I'd%20like%20to%20discuss%20a%20project.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-mono uppercase tracking-wider text-neutral-300 hover:text-white border border-neutral-800 hover:border-neutral-600 transition-colors"
          >
            <span>Chat on WhatsApp</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          <Link
            href="/admin"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-mono uppercase tracking-wider text-neutral-300 hover:text-cyan-400 border border-neutral-800 hover:border-cyan-500/50 transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Admin Portal</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
