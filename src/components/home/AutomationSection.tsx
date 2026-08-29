import React from 'react';
import Link from 'next/link';
import { Zap, ArrowRight } from 'lucide-react';
import { WORKFLOWS_DATA } from '../../data/workflows';
import { WorkflowCard } from '../common/WorkflowCard';

export const AutomationSection: React.FC = () => {
  return (
    <section id="automation" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>Workflow Automation Architecture</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white font-heading tracking-tight leading-tight">
          Stop Doing Everything <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-300 to-cyan-400">
            Manually.
          </span>
        </h2>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          We help businesses automate repetitive tasks so they can focus on customers, growth, and important work.
        </p>
      </div>

      {/* 3 Visual Workflow Cards */}
      <div className="space-y-8">
        {WORKFLOWS_DATA.map((wf) => (
          <WorkflowCard key={wf.id} workflow={wf} />
        ))}
      </div>

      {/* Bottom Sub-CTA */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-indigo-950/70 via-slate-900 to-purple-950/70 border border-indigo-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl text-left">
        <div className="space-y-2">
          <h4 className="text-xl sm:text-2xl font-bold text-white font-heading">
            Need a Custom Multi-Step Pipeline?
          </h4>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            We build custom webhook connectors between HubSpot, Stripe, Slack, Notion, Airtable, and custom SQL databases.
          </p>
        </div>

        <Link
          href="/whatsapp-automation"
          className="px-6 py-3.5 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-2 whitespace-nowrap transition-all hover:scale-105"
        >
          <span>Explore WhatsApp Automation</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>


    </section>
  );
};
