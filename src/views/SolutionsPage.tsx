import React from 'react';
import Link from 'next/link';
import { Layers, ArrowRight, Sparkles, CheckCircle2, Eye } from 'lucide-react';
import { SOLUTIONS_DATA } from '../data/solutions';
import { SolutionCard } from '../components/common/SolutionCard';
import { CTASection } from '../components/common/CTASection';
import { MeetingSection } from '../components/home/MeetingSection';

export const SolutionsPage: React.FC = () => {
  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-24">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <span>Industry Solutions Directory</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight font-heading leading-tight">
          Intelligent Digital Frameworks for <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400">
            Every Business Sector.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
          Explore specialized AI workflows, customer acquisition funnels, and live website concepts designed around the specific conversion psychology of your industry.
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#schedule-meeting"
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all"
          >
            <span>Discuss Your Industry Strategy</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <Link
            href="/demos"
            className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-xs border border-slate-700 transition-colors"
          >
            Explore Live Demos
          </Link>
        </div>
      </div>

      {/* Solutions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SOLUTIONS_DATA.map((sol) => (
          <SolutionCard key={sol.slug} solution={sol} />
        ))}
      </div>

      {/* In-Depth Sector Deep-Dives */}
      <div className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading">
            Sector Architecture Breakdowns
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Click into any industry blueprint to explore pain points, AI agents, conversion funnels, and live concepts.
          </p>
        </div>

        <div className="space-y-6">
          {SOLUTIONS_DATA.map((sol) => (
            <div
              key={sol.slug}
              className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 text-left hover:border-indigo-500/40 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                <div>
                  <span className="text-xs font-mono uppercase text-indigo-400 font-semibold">
                    {sol.subtitle}
                  </span>
                  <h3 className="text-2xl font-bold text-white font-heading mt-0.5">
                    {sol.title}
                  </h3>
                </div>


                <div className="flex items-center gap-2">
                  <Link
                    href={`/solutions/${sol.slug}`}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-md flex items-center gap-1.5 transition-all"
                  >
                    <span>Full Industry Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  {sol.matchingDemoSlug && (
                    <Link
                      href={`/demo/${sol.matchingDemoSlug}`}
                      className="px-4 py-2 bg-slate-950 hover:bg-slate-800 text-slate-200 text-xs font-semibold rounded-xl border border-slate-800 flex items-center gap-1.5 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Live Demo</span>
                    </Link>
                  )}
                </div>
              </div>

              {/* 3 Columns: Challenges, AI Solutions, Marketing */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-2">
                  <h4 className="font-bold text-rose-300 uppercase tracking-wider text-[11px] font-mono">
                    Common Industry Pain Points
                  </h4>
                  <ul className="space-y-1.5 text-slate-400">
                    {sol.challenges.map((c, i) => (
                      <li key={i}>• {c}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-2">
                  <h4 className="font-bold text-cyan-300 uppercase tracking-wider text-[11px] font-mono">
                    Intelligent AI Solutions
                  </h4>
                  <ul className="space-y-1.5 text-slate-300">
                    {sol.aiSolutions.map((a, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-2">
                  <h4 className="font-bold text-indigo-300 uppercase tracking-wider text-[11px] font-mono">
                    Recommended Marketing
                  </h4>
                  <ul className="space-y-1.5 text-slate-300">
                    {sol.marketingStrategy.map((m, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <CTASection
        headline="Need a Bespoke Solution for Your Industry?"
        description="Schedule a 1-on-1 strategy call with our digital solution architects to tailor an automated system for your exact business model."
      />

      {/* Meeting Section */}
      <MeetingSection />

    </div>
  );
};
