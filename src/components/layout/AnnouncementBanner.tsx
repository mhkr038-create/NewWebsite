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
        
        {/* Mobile View */}
        <div className="flex sm:hidden flex-1 items-center justify-between gap-2 text-left">
          <div className="flex items-center gap-2 min-w-0">
            <span className="inline-flex items-center gap-1.5 bg-zinc-900 text-zinc-300 border border-zinc-800 px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>ERP Free Tier</span>
            </span>
            <span className="text-zinc-300 text-[11px] truncate">
              School Management Software <span className="text-zinc-500">(Zero License Fee)</span>
            </span>
          </div>
          <Link
            href="/free-school-management-software#enquiry-form"
            className="inline-flex items-center gap-1 font-semibold text-black bg-white hover:bg-zinc-200 px-2.5 py-0.5 rounded-full text-[10px] transition-colors shrink-0"
          >
            <span>Claim</span>
            <ArrowRight className="w-3 h-3 text-black" />
          </Link>
        </div>

        {/* Desktop View */}
        <div className="hidden sm:flex flex-1 items-center justify-center gap-2.5 text-center flex-wrap">
          <span className="inline-flex items-center gap-1.5 bg-zinc-900 text-zinc-300 border border-zinc-800 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Enterprise ERP Free Tier</span>
          </span>

          <span className="inline-flex items-center gap-1 bg-zinc-900/60 text-zinc-400 border border-zinc-800 px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider">
            <Clock className="w-3 h-3 text-zinc-400" />
            <span>Limited Deployment Slots</span>
          </span>

          <span className="text-zinc-300 font-normal">
            Complete Cloud School ERP &amp; Management Suite
          </span>

          <Link
            href="/free-school-management-software#enquiry-form"
            className="inline-flex items-center gap-1 font-semibold text-black bg-white hover:bg-zinc-200 px-3 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider transition-colors cursor-pointer"
          >
            <span>Claim License</span>
            <ArrowRight className="w-3 h-3 text-black" />
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
