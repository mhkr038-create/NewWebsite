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
