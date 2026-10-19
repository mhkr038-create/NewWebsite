'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, X, GraduationCap, Clock, Flame } from 'lucide-react';

export const AnnouncementBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative z-50 bg-zinc-950 border-b border-zinc-800/80 text-zinc-300 px-3 py-1.5 sm:px-4 sm:py-2 text-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-3">
        
        {/* Mobile View (375px Safe) */}
        <div className="flex sm:hidden flex-1 items-center justify-between gap-2 text-left min-w-0">
          <Link
            href="/free-school-management-software#enquiry-form"
            className="flex items-center gap-1.5 min-w-0 text-[11px] font-mono text-zinc-300 hover:text-white truncate"
          >
            <span className="w-1.5 h-1.5 bg-emerald-400 shrink-0" />
            <span className="text-emerald-400 font-semibold shrink-0">[ERP FREE]</span>
            <span className="truncate">School Software (₹0 Fee)</span>
            <ArrowRight className="w-3 h-3 text-zinc-400 shrink-0" />
          </Link>
        </div>

        {/* Desktop View */}
        <div className="hidden sm:flex flex-1 items-center justify-center gap-2.5 text-center flex-wrap">
          <span className="inline-flex items-center gap-1.5 bg-zinc-900 text-zinc-300 border border-zinc-800 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider">
            <span className="w-1.5 h-1.5 bg-emerald-400 animate-pulse" />
            <span>Enterprise ERP Free Tier</span>
          </span>

          <span className="inline-flex items-center gap-1 bg-zinc-900/60 text-zinc-400 border border-zinc-800 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider">
            <Clock className="w-3 h-3 text-zinc-400" />
            <span>Limited Deployment Slots</span>
          </span>

          <span className="text-zinc-300 font-normal">
            Complete Cloud School ERP &amp; Management Suite
          </span>

          <Link
            href="/free-school-management-software#enquiry-form"
            className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-zinc-200 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 px-3 py-0.5 transition-colors cursor-pointer"
          >
            <span>Claim License</span>
            <ArrowRight className="w-3 h-3 text-zinc-400" />
          </Link>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="text-zinc-500 hover:text-zinc-300 p-1 rounded-md transition-colors"
          aria-label="Dismiss banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>

      </div>
    </div>
  );
};
