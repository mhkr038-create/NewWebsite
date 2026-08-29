'use client';

import React, { useState } from 'react';
import { 
  TrendingUp, 
  Layout, 
  Target, 
  MessageSquare, 
  Workflow, 
  Award, 
  Layers, 
  Sparkles,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { ECOSYSTEM_NODES } from '../../data/ecosystem';
import Link from 'next/link';

const ICON_MAP: Record<string, React.ElementType> = {
  TrendingUp,
  Layout,
  Target,
  MessageSquare,
  Workflow,
  Award,
};

export const EcosystemSection: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<string>(ECOSYSTEM_NODES[0].id);

  const activeData = ECOSYSTEM_NODES.find((n) => n.id === selectedNode) || ECOSYSTEM_NODES[0];

  return (
    <section id="ecosystem" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 scroll-mt-28">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-indigo-500/30 text-indigo-300 text-xs font-mono">
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <span>Connected Growth Infrastructure</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-heading tracking-tight">
          The Digital Growth <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400">
            Ecosystem
          </span>
        </h2>

        <p className="text-base sm:text-lg text-cyan-300 font-medium italic">
          "Don't just generate traffic. Build a complete system that converts visitors into customers."
        </p>

        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Most marketing campaigns fail because they only focus on one isolated piece. We synchronize your paid ads, landing pages, lead capture, and WhatsApp automation into an automated conversion machine.
        </p>
      </div>

      {/* Visual Interconnected Ecosystem Diagram */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-10 relative overflow-hidden backdrop-blur-2xl shadow-2xl">
        
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top interactive step buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 relative z-10">
          {ECOSYSTEM_NODES.map((node, idx) => {
            const Icon = ICON_MAP[node.icon] || Sparkles;
            const isSelected = selectedNode === node.id;
            return (
              <button
                key={node.id}
                onClick={() => setSelectedNode(node.id)}
                className={`p-3.5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between space-y-3 cursor-pointer ${
                  isSelected
                    ? 'bg-slate-950 border-indigo-400/80 shadow-lg shadow-indigo-950/60 scale-[1.02]'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-950'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-slate-500">
                    0{idx + 1}
                  </span>
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center bg-gradient-to-tr ${node.accentColor} text-slate-950`}>
                    <Icon className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-white font-heading truncate">
                    {node.title.split('/')[0]}
                  </h4>
                  <span className="text-[10px] text-slate-400 truncate block">
                    {node.subtitle}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Flow Connectors: Vertical / Horizontal Stream visualization */}
        <div className="mt-8 pt-8 border-t border-slate-800/80 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Visual Funnel Nodes Flow */}
          <div className="lg:col-span-7 space-y-3 text-left">
            <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-mono font-bold text-xs">
                  01
                </div>
                <div>
                  <span className="text-xs font-bold text-white">Google Ads / Meta Ads / Blog SEO</span>
                  <p className="text-[11px] text-slate-400">High-intent search & targeted demand generation</p>
                </div>
              </div>
              <span className="text-[11px] font-mono text-cyan-400">Traffic Source</span>
            </div>

            <div className="flex justify-center -my-1 text-slate-600">
              <span className="text-xs font-bold">↓</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-cyan-600/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-mono font-bold text-xs">
                  02
                </div>
                <div>
                  <span className="text-xs font-bold text-white">High-Converting Landing Page</span>
                  <p className="text-[11px] text-slate-400">Sub-second load speed, zero distractions & 1:1 attention ratio</p>
                </div>
              </div>
              <span className="text-[11px] font-mono text-cyan-400">Destination</span>
            </div>

            <div className="flex justify-center -my-1 text-slate-600">
              <span className="text-xs font-bold">↓</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center font-mono font-bold text-xs">
                  03
                </div>
                <div>
                  <span className="text-xs font-bold text-white">Lead Capture & Qualification</span>
                  <p className="text-[11px] text-slate-400">Frictionless 2-step forms, guides & interactive calculators</p>
                </div>
              </div>
              <span className="text-[11px] font-mono text-purple-400">Capture</span>
            </div>

            <div className="flex justify-center -my-1 text-slate-600">
              <span className="text-xs font-bold">↓</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-mono font-bold text-xs">
                  04
                </div>
                <div>
                  <span className="text-xs font-bold text-white">WhatsApp Automation & Chatbots</span>
                  <p className="text-[11px] text-slate-400">Sub-60s instant replies, qualification questions & instant alerts</p>
                </div>
              </div>
              <span className="text-[11px] font-mono text-emerald-400">Automation</span>
            </div>

            <div className="flex justify-center -my-1 text-slate-600">
              <span className="text-xs font-bold">↓</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-600/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-mono font-bold text-xs">
                  05
                </div>
                <div>
                  <span className="text-xs font-bold text-white">Follow-up & Nurturing Cadence</span>
                  <p className="text-[11px] text-slate-400">Multi-day automated proof, reminders & calendar scheduling</p>
                </div>
              </div>
              <span className="text-[11px] font-mono text-amber-400">Nurture</span>
            </div>

            <div className="flex justify-center -my-1 text-slate-600">
              <span className="text-xs font-bold">↓</span>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-600/40 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-400/40 flex items-center justify-center font-mono font-bold text-xs">
                  06
                </div>
                <div>
                  <span className="text-xs font-bold text-emerald-300">Customer Conversion & Sales</span>
                  <p className="text-[11px] text-slate-300">Closed deals, booked consultations & automated recurring revenue</p>
                </div>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 font-bold">Conversion</span>
            </div>

          </div>

          {/* Right Column: Selected Node Deep Dive Card */}
          <div className="lg:col-span-5 bg-slate-950 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 space-y-5 text-left shadow-xl shadow-indigo-950/40">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-[10px] font-mono font-semibold bg-indigo-950 text-indigo-300 border border-indigo-800">
                Ecosystem Module Detail
              </span>
              <span className="text-xs font-mono text-cyan-400 font-bold">
                {activeData.subtitle}
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white font-heading">
                {activeData.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeData.description}
              </p>
            </div>

            <div className="space-y-2.5 pt-4 border-t border-slate-900">
              <span className="text-[11px] font-mono uppercase text-slate-400 font-semibold block">
                Why this step is critical:
              </span>
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Eliminates single point of marketing failure</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Reduces overall cost per acquisition across all ad spend</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Runs 24/7 on autopilot without requiring extra team headcount</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-900">
              <Link
                href="/schedule-meeting"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all"
              >
                <span>Deploy This Ecosystem For Your Brand</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
