import React from 'react';
import Link from 'next/link';
import { 
  HeartPulse, 
  TrendingUp, 
  GraduationCap, 
  Sparkles, 
  MapPin, 
  Rocket, 
  UserCheck, 
  ShoppingBag, 
  ArrowRight, 
  Eye 
} from 'lucide-react';
import type { IndustrySolution } from '../../data/solutions';

const ICON_MAP: Record<string, React.ElementType> = {
  HeartPulse,
  TrendingUp,
  GraduationCap,
  Sparkles,
  MapPin,
  Rocket,
  UserCheck,
  ShoppingBag,
};

interface SolutionCardProps {
  solution: IndustrySolution;
  className?: string;
}

export const SolutionCard: React.FC<SolutionCardProps> = ({ solution, className = '' }) => {
  const Icon = ICON_MAP[solution.iconName] || Sparkles;

  return (
    <div
      className={`bg-slate-900/75 border border-slate-800 hover:border-indigo-500/40 rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-indigo-950/40 relative overflow-hidden group ${className}`}
    >
      {/* Subtle background glow */}
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${solution.gradient} rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-500`} />

      <div className="space-y-4 text-left relative z-10">
        {/* Header Icon + Metric badge */}
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center group-hover:border-indigo-500/50 group-hover:scale-105 transition-all">
            <Icon className={`w-6 h-6 ${solution.accentColor}`} />
          </div>
          <div className="text-right">
            <span className={`text-xs font-mono font-extrabold ${solution.accentColor} block`}>
              {solution.stats.value}
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              {solution.stats.label}
            </span>
          </div>
        </div>

        {/* Title & Subtitle */}
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors font-heading">
            {solution.title}
          </h3>
          <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
            {solution.description}
          </p>
        </div>

        {/* Niches List */}
        <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
          <span className="text-[11px] font-mono uppercase text-slate-400 block font-semibold">
            Ideal Niches:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {solution.niches.slice(0, 3).map((niche, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-md text-[11px] bg-slate-950 text-slate-300 border border-slate-800/80"
              >
                {niche}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Actions: Explore Solutions & Live Demo */}
      <div className="pt-5 mt-5 border-t border-slate-800/80 flex items-center justify-between relative z-10">
        <Link
          href={`/solutions/${solution.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-cyan-300 transition-colors group/link"
        >
          <span>Explore Solutions</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
        </Link>

        {solution.matchingDemoSlug && (
          <Link
            href={`/demo/${solution.matchingDemoSlug}`}
            className="text-[11px] font-medium text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
            title="View Live Interactive Demo"
          >
            <Eye className="w-3 h-3 text-cyan-400" />
            <span>Live Demo</span>
          </Link>
        )}
      </div>
    </div>
  );
};

