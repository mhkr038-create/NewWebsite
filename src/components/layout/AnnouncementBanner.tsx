'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, X, GraduationCap } from 'lucide-react';

export const AnnouncementBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative z-50 bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 text-slate-950 px-4 py-2 text-xs font-medium shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        
        <div className="flex-1 flex items-center justify-center gap-2 text-center flex-wrap">
          <span className="inline-flex items-center gap-1.5 bg-slate-950 text-amber-300 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3 h-3 text-amber-400" />
            FREE OFFER • WORTH ₹30,000
          </span>
          <span className="font-semibold text-white sm:text-slate-950">
            Free School Management Software ERP for Schools, Colleges & Academies!
          </span>
          <Link
            href="/free-school-management-software#enquiry-form"
            className="inline-flex items-center gap-1 underline underline-offset-2 font-bold text-white hover:text-amber-100 transition-colors cursor-pointer"
          >
            <span>Submit School Enquiry</span>
            <ArrowRight className="w-3.5 h-3.5" />
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
