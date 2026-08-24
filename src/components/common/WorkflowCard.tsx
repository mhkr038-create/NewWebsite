import React from 'react';
import { 
  Globe, 
  Database, 
  Mail, 
  Workflow, 
  CalendarCheck, 
  Lightbulb, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Send, 
  MessageSquare, 
  Bot, 
  Zap, 
  Filter, 
  CheckSquare, 
  ArrowRight 
} from 'lucide-react';
import type { WorkflowItem } from '../../data/workflows';

const ICON_MAP: Record<string, any> = {
  Globe,
  Database,
  Mail,
  Workflow,
  CalendarCheck,
  Lightbulb,
  Sparkles,
  CheckCircle2,
  Clock,
  Send,
  MessageSquare,
  Bot,
  Zap,
  Filter,
  CheckSquare,
};

interface WorkflowCardProps {
  workflow: WorkflowItem;
  className?: string;
}

export const WorkflowCard: React.FC<WorkflowCardProps> = ({ workflow, className = '' }) => {
  return (
    <div
      className={`bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur-xl relative overflow-hidden text-left group hover:border-indigo-500/40 transition-all duration-300 ${className}`}
    >
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-indigo-950 text-indigo-300 border border-indigo-800/40">
              {workflow.badge}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-950/60 text-emerald-400 border border-emerald-800/40 font-bold">
              {workflow.timeSaved}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white mt-1.5 font-heading">
            {workflow.title}
          </h3>
        </div>
        <p className="text-xs text-slate-400 max-w-sm">
          {workflow.description}
        </p>
      </div>

      {/* Visual Flow Nodes & Arrows */}
      <div className="py-2">
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 relative">
          {workflow.steps.map((step, idx) => {
            const StepIcon = ICON_MAP[step.icon] || Zap;
            const isLast = idx === workflow.steps.length - 1;

            return (
              <div key={step.id} className="relative flex flex-col items-center group/node">
                {/* Node Box */}
                <div className="w-full p-3.5 rounded-2xl bg-slate-950/90 border border-slate-800/90 hover:border-indigo-500/50 transition-all flex flex-col items-center text-center space-y-2 relative z-10 shadow-lg">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700/60 flex items-center justify-center group-hover/node:scale-110 transition-transform">
                    <StepIcon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">
                      {step.label}
                    </span>
                    {step.sublabel && (
                      <span className="text-[10px] text-slate-400 block mt-0.5 leading-tight">
                        {step.sublabel}
                      </span>
                    )}
                  </div>
                </div>

                {/* Arrow connector between steps (desktop) */}
                {!isLast && (
                  <div className="hidden sm:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-slate-900 border border-slate-700 items-center justify-center shadow-md">
                    <ArrowRight className="w-3 h-3 text-indigo-400" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Outcome Banner */}
      <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-indigo-500/20 flex items-center gap-2.5 text-xs text-slate-300">
        <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
        <div>
          <span className="font-semibold text-white">Automated Outcome: </span>
          <span>{workflow.outcome}</span>
        </div>
      </div>
    </div>
  );
};
