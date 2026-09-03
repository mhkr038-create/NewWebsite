'use client';

import React, { useState } from 'react';
import { ArrowUpRight, Check, Copy } from 'lucide-react';
import { useInquiry } from '../context/InquiryContext';
import { SITE_CONFIG } from '../config/siteConfig';

export default function HomePage() {
  const { openQuickModal } = useInquiry();
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(SITE_CONFIG.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen lg:h-screen w-full bg-black text-white flex flex-col justify-between p-6 sm:p-10 lg:p-16 select-none font-sans">
      {/* 1. Header */}
      <header className="flex items-center justify-between w-full max-w-5xl mx-auto">
        <span className="font-mono text-sm sm:text-base tracking-tight font-semibold">
          {SITE_CONFIG.brandName}
        </span>

        <div className="flex items-center gap-5 sm:gap-8 text-xs font-mono text-neutral-400">
          <span className="hidden sm:inline-flex items-center gap-2 text-neutral-500">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            Available for projects
          </span>

          <button
            onClick={() => openQuickModal()}
            className="text-white hover:text-neutral-400 underline underline-offset-4 cursor-pointer transition-colors"
          >
            Inquire
          </button>
        </div>
      </header>

      {/* 2. Main Hero Content */}
      <main className="w-full max-w-5xl mx-auto my-auto py-8 sm:py-12 flex flex-col items-start text-left">
        <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-4">
          Digital Studio & Systems
        </span>

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
          <button
            onClick={() => openQuickModal()}
            className="px-6 py-3 rounded-full text-xs font-mono uppercase tracking-wider bg-white text-black font-semibold hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            Start a Project
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
        </div>
      </main>

      {/* 3. Minimal Footer */}
      <footer className="w-full max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-neutral-900 text-xs font-mono text-neutral-500">
        <div className="flex flex-wrap items-center gap-6">
          <button
            onClick={copyEmail}
            className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <span>{SITE_CONFIG.contact.email}</span>
            {copied ? <Check className="w-3 h-3 text-white" /> : <Copy className="w-3 h-3 text-neutral-600" />}
          </button>

          <a
            href={`tel:${SITE_CONFIG.contact.phone}`}
            className="hover:text-white transition-colors"
          >
            {SITE_CONFIG.contact.displayPhone}
          </a>
        </div>

        <div className="flex items-center gap-4">
          <span>{SITE_CONFIG.contact.responseSla}</span>
          <span>•</span>
          <span>© {new Date().getFullYear()} {SITE_CONFIG.brandName}</span>
        </div>
      </footer>
    </div>
  );
}

