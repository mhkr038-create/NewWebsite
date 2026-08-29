import React from 'react';
import { Workflow, ArrowRight } from 'lucide-react';
import { ProcessSteps } from '../common/ProcessSteps';
import Link from 'next/link';

export const HowItWorksSection: React.FC = () => {
  return (
    <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 scroll-mt-28">
      {/* Section Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-indigo-500/30 text-indigo-300 text-xs font-mono">
          <Workflow className="w-3.5 h-3.5 text-cyan-400" />
          <span>Simple 4-Step Process</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-heading tracking-tight">
          How We Work to <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400">
            Scale Your Digital Growth
          </span>
        </h2>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
          From deep initial discovery to live campaign launch and compounding scale, our 4-step roadmap delivers predictable results without guesswork.
        </p>
      </div>

      {/* 4-Step Visual Timeline */}
      <ProcessSteps />

      {/* Action Footer */}
      <div className="mt-12 text-center">
        <Link
          href="/schedule-meeting"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-indigo-500/30 text-xs font-bold text-slate-200 hover:text-white transition-all shadow-md"
        >
          <span>Step 1 Starts with a Free Discovery Session</span>
          <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
        </Link>
      </div>
    </section>
  );
};

