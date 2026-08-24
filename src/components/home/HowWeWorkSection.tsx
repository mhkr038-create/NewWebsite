import React from 'react';
import { Compass, CheckCircle2 } from 'lucide-react';

const STEPS = [
  {
    step: '01',
    title: 'Discover',
    tagline: 'Understand your business',
    desc: 'Understand your business, goals, challenges, and opportunities through a deep-dive scoping session.',
    highlights: ['Audit current workflows', 'Identify revenue bottlenecks', 'Establish success metrics'],
  },
  {
    step: '02',
    title: 'Strategy',
    tagline: 'Practical AI & marketing blueprint',
    desc: 'Create a practical AI, automation, or digital marketing strategy tailored to your exact industry dynamics.',
    highlights: ['Tool selection & architecture', 'ROI calculation model', 'Clear sprint milestones'],
  },
  {
    step: '03',
    title: 'Build',
    tagline: 'Rapid agile implementation',
    desc: 'Design and implement the required digital solution with sub-second performance and clean architecture.',
    highlights: ['Bespoke UI/UX design', 'AI agent & prompt training', 'Webhook & CRM integrations'],
  },
  {
    step: '04',
    title: 'Grow',
    tagline: 'Continuous optimization',
    desc: 'Optimize, automate, and improve the system as your business grows with ongoing analytics and SLA support.',
    highlights: ['A/B conversion tests', 'Live operational monitoring', 'Quarterly roadmap reviews'],
  },
];

export const HowWeWorkSection: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-slate-950/80 border border-slate-900 rounded-3xl p-8 sm:p-14 space-y-12 text-left relative overflow-hidden">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>Proven 4-Step Methodology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading tracking-tight">
            How We Work
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            A frictionless, results-driven process that takes you from initial discovery to an automated growth engine in days.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {STEPS.map((s, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-indigo-500/40 transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-mono font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400">
                    {s.step}
                  </span>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                    Phase {idx + 1}
                  </span>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors font-heading">
                    {s.title}
                  </h4>
                  <span className="text-[11px] font-mono text-indigo-400 block mt-0.5">
                    {s.tagline}
                  </span>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>

              <div className="space-y-1.5 pt-3 border-t border-slate-800/80">
                {s.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-400">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
