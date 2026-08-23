import React from 'react';
import { Link } from 'react-router-dom';
import { 
  HeartPulse, 
  TrendingUp, 
  GraduationCap, 
  Sparkles, 
  Building2, 
  UserCheck, 
  ArrowRight, 
  CheckCircle2, 
  Eye, 
  Compass, 
  ShieldCheck
} from 'lucide-react';
import { SOLUTIONS_DATA } from '../data/solutions';
import { useInquiry } from '../context/InquiryContext';

export const SolutionsPage: React.FC = () => {
  const { openQuickModal } = useInquiry();

  const iconMap: Record<string, any> = {
    HeartPulse,
    TrendingUp,
    GraduationCap,
    Sparkles,
    Building2,
    UserCheck,
  };

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
          <Compass className="w-3.5 h-3.5 text-cyan-400" />
          <span>Tailored Industry Architecture</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight font-heading leading-tight">
          Industry Solutions Built for <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400">
            Conversion & Authority.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
          Explore our specialized digital ecosystems engineered specifically for the distinct business models, client expectations, and trust dynamics of your sector.
        </p>
      </div>

      {/* Solutions Detailed Grid */}
      <div className="space-y-12">
        {SOLUTIONS_DATA.map((sol, index) => {
          const IconComponent = iconMap[sol.iconName] || Sparkles;
          const isEven = index % 2 === 0;

          return (
            <div
              key={sol.id}
              id={sol.id}
              className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden group hover:border-indigo-500/30 transition-all"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Text Content */}
                <div className={`lg:col-span-7 space-y-5 text-left ${isEven ? 'order-1' : 'order-1 lg:order-2'}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading">
                        {sol.title}
                      </h3>
                      <p className="text-xs text-indigo-300 font-mono">{sol.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {sol.description}
                  </p>

                  {/* Included Niches */}
                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-mono uppercase text-slate-400 font-semibold block">
                      Target Niches & Applications:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {sol.niches.map((niche, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-lg text-xs bg-slate-950 text-slate-200 border border-slate-800"
                        >
                          {niche}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Features */}
                  <div className="space-y-2 pt-3 border-t border-slate-800">
                    <span className="text-xs font-semibold text-white block">
                      Standard Included Architecture:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {sol.features.map((feat, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action CTAs */}
                  <div className="pt-4 flex flex-wrap items-center gap-4">
                    <Link
                      to={`/demo/${sol.matchingDemoSlug}`}
                      className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all hover:scale-105"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Live Demo</span>
                    </Link>

                    <button
                      onClick={() => openQuickModal(sol.matchingDemoSlug)}
                      className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-colors"
                    >
                      Customize for My Brand
                    </button>
                  </div>
                </div>

                {/* Visual Card Snapshot */}
                <div className={`lg:col-span-5 ${isEven ? 'order-2' : 'order-2 lg:order-1'}`}>
                  <div className="p-6 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-4 shadow-xl">
                    <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                      <span className="text-xs font-mono text-slate-400">Industry Performance Benchmark</span>
                      <span className="text-xs font-bold text-emerald-400 font-mono">
                        {sol.stats.label}: {sol.stats.value}
                      </span>
                    </div>

                    <div className="space-y-3 text-xs text-slate-300">
                      <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                        <span>Speed-to-Launch</span>
                        <strong className="text-white font-mono">5–7 Business Days</strong>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                        <span>Mobile Viewport UX</span>
                        <strong className="text-cyan-400 font-mono">100% Adaptive</strong>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                        <span>Custom Integrations</span>
                        <strong className="text-indigo-300 font-mono">Stripe, CRM & Booking</strong>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-800/40 text-[11px] text-indigo-300 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>Includes full source code ownership & 30 days of launch warranty.</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Consultation Banner */}
      <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-4 max-w-4xl mx-auto shadow-2xl">
        <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading">
          Don't See Your Exact Industry Listed?
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
          We build custom digital experiences across dozens of specialized verticals. Contact our architects for a bespoke concept review.
        </p>
        <div className="pt-2">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-indigo-600/30 transition-all"
          >
            <span>Request Custom Industry Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

    </div>
  );
};
