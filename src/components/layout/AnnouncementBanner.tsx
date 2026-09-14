'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, X, GraduationCap, Clock, Flame } from 'lucide-react';

export const AnnouncementBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative z-50 bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 text-slate-950 px-3 py-1.5 sm:px-4 sm:py-2 text-xs font-medium shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-3">
        
        {/* Mobile View: Sleek, compact 1-line layout (prevents 140px banner blowout) */}
        <div className="flex sm:hidden flex-1 items-center justify-between gap-2 text-left">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="inline-flex items-center gap-1 bg-red-600 text-white px-1.5 py-0.5 rounded-full text-[9px] font-mono font-extrabold uppercase tracking-wider animate-blink-flash shrink-0">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-200 opacity-90"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-yellow-300"></span>
              </span>
              <span>⚡ FLASH</span>
            </span>
            <span className="font-bold text-slate-950 text-[11px] truncate">
              Free School ERP <strong className="font-mono text-[10px] text-amber-950">(Worth ₹30K)</strong>
            </span>
          </div>
          <Link
            href="/free-school-management-software#enquiry-form"
            className="inline-flex items-center gap-0.5 font-extrabold text-white bg-slate-950 hover:bg-slate-900 px-2.5 py-1 rounded-full text-[10px] shadow-sm transition-all shrink-0"
          >
            <span>Claim</span>
            <ArrowRight className="w-3 h-3 text-amber-400" />
          </Link>
        </div>

        {/* Desktop View: Full Rich Badges */}
        <div className="hidden sm:flex flex-1 items-center justify-center gap-2 text-center flex-wrap">
          {/* Blinking Beacon & Flash Badge */}
          <span className="inline-flex items-center gap-1.5 bg-red-600 text-white px-2.5 py-0.5 rounded-full text-[10px] font-mono font-extrabold uppercase tracking-wider shadow-sm animate-blink-flash">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-200 opacity-90"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-300"></span>
            </span>
            <span>⚡ FLASH OFFER</span>
          </span>

          {/* Limited Period & Limited Numbers Badges */}
          <span className="inline-flex items-center gap-1 bg-amber-950 text-amber-200 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider">
            <Clock className="w-3 h-3 text-amber-400" />
            <span>LIMITED PERIOD</span>
          </span>

          <span className="inline-flex items-center gap-1 bg-red-950 text-red-200 border border-red-800/60 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider">
            <Flame className="w-3 h-3 text-red-400" />
            <span>LIMITED NUMBERS: FIRST 25 SCHOOLS</span>
          </span>

          <span className="inline-flex items-center gap-1 bg-slate-950 text-amber-300 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3 h-3 text-amber-400" />
            WORTH ₹30,000 FREE
          </span>

          <span className="font-bold text-white sm:text-slate-950">
            Free School Management Software ERP!
          </span>
          <Link
            href="/free-school-management-software#enquiry-form"
            className="inline-flex items-center gap-1 font-extrabold text-white bg-slate-950 hover:bg-slate-900 px-3 py-1 rounded-full text-[11px] shadow-sm transition-all cursor-pointer hover:scale-105"
          >
            <span>Claim Free License</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
          </Link>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="text-slate-950/70 hover:text-slate-950 p-1 rounded-md transition-colors"
          aria-label="Dismiss banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>

      </div>
    </div>
  );
};
