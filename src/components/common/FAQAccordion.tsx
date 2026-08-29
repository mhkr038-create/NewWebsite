'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import type { ServiceFaq } from '../../data/growthServices';

interface FAQAccordionProps {
  faqs: ServiceFaq[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({
  faqs,
  title = 'Frequently Asked Questions',
  subtitle = 'Everything you need to know about our process, deliverables, and timelines.',
  className = '',
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {title && (
        <div className="text-center space-y-2 max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-800/40 text-indigo-300 text-xs font-mono">
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span>Got Questions?</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      )}

      <div className="max-w-3xl mx-auto space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden text-left ${
                isOpen
                  ? 'bg-slate-900/90 border-indigo-500/40 shadow-lg shadow-indigo-950/30'
                  : 'bg-slate-900/50 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left transition-colors"
                aria-expanded={isOpen}
              >
                <span className="text-sm sm:text-base font-semibold text-white font-heading">
                  {faq.question}
                </span>
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 bg-indigo-600/30 text-cyan-300' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/50">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
