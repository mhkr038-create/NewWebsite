import React from 'react';
import { Search, Compass, Rocket, TrendingUp, CheckCircle2 } from 'lucide-react';
import { HOW_IT_WORKS_STEPS } from '../../data/ecosystem';

const ICON_MAP: Record<string, React.ElementType> = {
  Search,
  Compass,
  Rocket,
  TrendingUp,
};

export const ProcessSteps: React.FC = () => {
  return (
    <div className="relative">
      {/* Desktop connecting gradient line */}
      <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-0.5 bg-gradient-to-r from-indigo-500/20 via-cyan-500/40 to-indigo-500/20 -translate-y-12 z-0" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {HOW_IT_WORKS_STEPS.map((item) => {
          const Icon = ICON_MAP[item.icon] || Rocket;
          return (
            <div
              key={item.stepNumber}
              className="bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 rounded-3xl p-6 flex flex-col justify-between space-y-4 text-left transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-indigo-950/40 group relative backdrop-blur-xl"
            >
              {/* Step indicator and Icon */}
              <div className="flex items-center justify-between">
                <span className="text-2xl sm:text-3xl font-mono font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                  {item.stepNumber}
                </span>
                <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 text-indigo-400 group-hover:text-cyan-300 group-hover:border-indigo-500/40 flex items-center justify-center transition-all duration-300">
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              {/* Title & Tagline */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-semibold block">
                  {item.tagline}
                </span>
                <h4 className="text-lg font-bold text-white group-hover:text-cyan-200 transition-colors font-heading">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Deliverable bullets */}
              <div className="pt-3 border-t border-slate-800/80 space-y-1.5">
                {item.deliverables.map((del, dIdx) => (
                  <div key={dIdx} className="flex items-center gap-2 text-[11px] text-slate-400">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span>{del}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
