import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, ArrowRight } from 'lucide-react';
import { SOLUTIONS_DATA } from '../../data/solutions';
import { SolutionCard } from '../common/SolutionCard';

export const SolutionsSection: React.FC = () => {
  return (
    <section id="solutions" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>Tailored Industry Frameworks</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading tracking-tight">
            Solutions by Business Type
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
            Every industry has unique conversion psychology and operational bottlenecks. Explore our specialized AI, automation, and digital architectures built for your niche.
          </p>
        </div>

        <Link
          to="/solutions"
          className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-xs border border-slate-700 flex items-center gap-2 transition-colors self-start md:self-auto shrink-0"
        >
          <span>View All 8 Industry Portals</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* 8 Industry Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {SOLUTIONS_DATA.map((sol) => (
          <SolutionCard key={sol.id} solution={sol} />
        ))}
      </div>

    </section>
  );
};
