import React from 'react';
import { Briefcase, ArrowRight, Building2 } from 'lucide-react';
import { CASE_STUDIES_DATA } from '../../data/caseStudies';
import Link from 'next/link';

export const CaseStudiesSection: React.FC = () => {
  return (
    <section id="case-studies" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 scroll-mt-28">
      {/* Section Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-indigo-500/30 text-indigo-300 text-xs font-mono">
          <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
          <span>Execution Frameworks & Case Examples</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-heading tracking-tight">
          Proven Solutions for <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400">
            Real Growth Challenges
          </span>
        </h2>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
          Explore how we combine advertising, landing pages, and automation to solve operational bottlenecks across diverse business models.
        </p>
      </div>

      {/* 5 Case Studies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CASE_STUDIES_DATA.map((cs) => {
          return (
            <div
              key={cs.id}
              className="bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 rounded-3xl p-6 sm:p-7 flex flex-col justify-between space-y-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-indigo-950/40 relative group text-left backdrop-blur-xl"
            >
              <div className="space-y-4">
                {/* Industry & Category */}
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-cyan-300 text-[11px] font-mono font-semibold">
                    <Building2 className="w-3 h-3 text-cyan-400" />
                    {cs.industry}
                  </span>
                  <span className="text-[10px] font-mono text-indigo-300 uppercase tracking-wider">
                    {cs.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors font-heading">
                  {cs.title}
                </h3>

                {/* Challenge & Solution & Result Breakdown */}
                <div className="space-y-3 pt-2 text-xs text-slate-300">
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1">
                    <span className="text-[10px] font-mono uppercase text-rose-400 font-bold block">
                      The Challenge
                    </span>
                    <p className="text-slate-400 leading-relaxed">{cs.challenge}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1">
                    <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold block">
                      Engineered Solution
                    </span>
                    <p className="text-slate-300 leading-relaxed">{cs.solution}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-800/40 space-y-1">
                    <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block">
                      System Result
                    </span>
                    <p className="text-emerald-200/90 leading-relaxed font-medium">{cs.result}</p>
                  </div>
                </div>

                {/* Services Used Tags */}
                <div className="pt-2 flex flex-wrap gap-1.5">
                  {cs.servicesUsed.map((srv, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2 py-0.5 rounded-md bg-slate-950 text-[10px] font-mono text-slate-400 border border-slate-800"
                    >
                      {srv}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Action */}
              <div className="pt-4 border-t border-slate-800/80">
                <Link
                  href="/schedule-meeting"
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-950 hover:bg-indigo-950/60 text-slate-300 hover:text-white border border-slate-800 hover:border-indigo-500/40 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all group/btn"
                >
                  <span>Build This System for Your Business</span>
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-400 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Demos Link */}
      <div className="mt-12 text-center">
        <Link
          href="/demos"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600/20 via-slate-900 to-cyan-600/20 hover:from-indigo-600/30 hover:to-cyan-600/30 border border-indigo-500/40 text-xs font-bold text-white shadow-lg transition-all"
        >
          <span>Explore 8 Interactive Live Website Demos & Architecture</span>
          <ArrowRight className="w-4 h-4 text-cyan-300" />
        </Link>
      </div>
    </section>
  );
};

