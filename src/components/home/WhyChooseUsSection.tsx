import React from 'react';
import { 
  Brain, 
  Zap, 
  Target, 
  Compass, 
  SlidersHorizontal, 
  TrendingUp, 
  CheckCircle2, 
  ShieldCheck 
} from 'lucide-react';
import { WHY_CHOOSE_US_DATA } from '../../data/whyChooseUs';

const ICON_MAP: Record<string, any> = {
  Brain,
  Zap,
  Target,
  Compass,
  SlidersHorizontal,
  TrendingUp,
};

export const WhyChooseUsSection: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-gradient-to-r from-indigo-950/40 via-slate-900 to-cyan-950/40 border border-slate-800 rounded-3xl p-8 sm:p-14 space-y-12 text-left relative overflow-hidden shadow-2xl">
        
        {/* Glow */}
        <div className="absolute top-0 right-1/3 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Why Founders Partner With Us</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading tracking-tight">
            Why Choose DigitalFlowHub
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            We are not an old-school agency that bills endless hourly retainers. We are an agile, AI-native growth and engineering studio.
          </p>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {WHY_CHOOSE_US_DATA.map((item) => {
            const Icon = ICON_MAP[item.icon] || Zap;

            return (
              <div
                key={item.id}
                className="bg-slate-950/80 border border-slate-800/90 hover:border-indigo-500/40 rounded-2xl p-6 flex flex-col justify-between space-y-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:border-indigo-500/50 group-hover:scale-105 transition-all">
                      <Icon className="w-5 h-5 text-cyan-400" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-indigo-300 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-800/40">
                      {item.metric}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors font-heading">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-900 flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Enterprise Precision</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
