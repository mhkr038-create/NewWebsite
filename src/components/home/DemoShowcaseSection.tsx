import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, LayoutTemplate } from 'lucide-react';
import { DEMO_REGISTRY } from '../../data/demos';
import { DemoCard } from '../common/DemoCard';

export const DemoShowcaseSection: React.FC = () => {
  const featuredDemos = DEMO_REGISTRY.slice(0, 6);

  return (
    <section id="demo-showcase" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
            <LayoutTemplate className="w-3.5 h-3.5 text-cyan-400" />
            <span>Interactive Website Concepts</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading tracking-tight">
            See What We Can Build for You
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
            Test live, fully functioning website prototypes before writing a line of code. We customize and launch any concept for your brand in days.
          </p>
        </div>

        <Link
          to="/demos"
          className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-xs border border-slate-700 flex items-center gap-2 transition-colors self-start md:self-auto shrink-0"
        >
          <span>View All 8+ Live Demos</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Demos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredDemos.map((demo) => (
          <DemoCard key={demo.id} demo={demo} />
        ))}
      </div>

    </section>
  );
};
