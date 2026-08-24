import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Mail, ArrowRight, Sparkles, Zap, ShieldCheck } from 'lucide-react';

interface CTASectionProps {
  className?: string;
  headline?: string;
  description?: string;
}

export const CTASection: React.FC<CTASectionProps> = ({
  className = '',
  headline = 'Ready to Grow Smarter?',
  description = "Let's explore how AI, automation, and digital marketing can help your business save time, attract more customers, and grow.",
}) => {
  return (
    <section className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="bg-gradient-to-r from-indigo-950/90 via-slate-900 to-cyan-950/90 rounded-3xl p-8 sm:p-14 text-center space-y-6 shadow-2xl relative overflow-hidden border border-indigo-500/30">
        
        {/* Glow accent */}
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl mx-auto space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/80 border border-indigo-500/30 text-indigo-300 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Transform Your Operations Today</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-heading leading-tight tracking-tight">
            {headline}
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2 relative z-10">
          <a
            href="#schedule-meeting"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 transition-all hover:scale-105 active:scale-98 flex items-center justify-center gap-2 group"
          >
            <Calendar className="w-4 h-4 text-cyan-200" />
            <span>Schedule a Meeting</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          <Link
            to="/contact"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-950/90 hover:bg-slate-800 text-slate-200 font-semibold text-sm border border-slate-700 transition-colors flex items-center justify-center gap-2"
          >
            <Mail className="w-4 h-4 text-indigo-400" />
            <span>Contact Us</span>
          </Link>
        </div>

        {/* Value Micro Badges */}
        <div className="pt-4 flex flex-wrap justify-center items-center gap-6 text-xs text-slate-400 relative z-10">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Zero Risk Consultation
          </span>
          <span className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-cyan-400" />
            Direct Solution Architect Meeting
          </span>
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            Fixed Pricing & Guaranteed SLA
          </span>
        </div>

      </div>
    </section>
  );
};
