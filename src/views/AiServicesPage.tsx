'use client';

import React from 'react';
import Link from 'next/link';

import { Bot, ArrowRight, Zap, ShieldCheck, Layers } from 'lucide-react';
import { AI_SERVICES_DATA } from '../data/aiServices';
import { AiDemoWidget } from '../components/ai/AiDemoWidget';
import { ServiceCard } from '../components/common/ServiceCard';
import { CTASection } from '../components/common/CTASection';
import { MeetingSection } from '../components/home/MeetingSection';

export const AiServicesPage: React.FC = () => {
  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-24">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
          <Bot className="w-3.5 h-3.5 text-cyan-400" />
          <span>Next-Generation Intelligence</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight font-heading leading-tight">
          Practical AI Services for <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400">
            Real Business Growth.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
          We help modern businesses replace repetitive manual labor with autonomous AI assistants, trained knowledge bases, and custom workflow engines.
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#schedule-meeting"
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all"
          >
            <span>Book an AI Scoping Session</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <Link
            href="/whatsapp-automation"
            className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-xs border border-slate-700 transition-colors"
          >
            Explore WhatsApp Automation
          </Link>
        </div>
      </div>

      {/* Live Sandbox Simulator */}
      <div className="space-y-4 text-left">
        <div className="border-b border-slate-800 pb-2">
          <span className="text-xs font-mono uppercase text-cyan-400 font-semibold tracking-wider">
            Interactive Test Sandbox
          </span>
          <h3 className="text-2xl font-bold text-white font-heading mt-1">
            Test Our AI Agents in Real Time
          </h3>
        </div>
        <AiDemoWidget />
      </div>

      {/* Detailed Services Breakdown */}
      <div className="space-y-8 text-left">
        <div>
          <span className="text-xs font-mono uppercase text-indigo-400 font-semibold tracking-wider">
            Dedicated Service Tiers
          </span>
          <h2 className="text-3xl font-bold text-white font-heading mt-1">
            Complete Suite of AI Solutions
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {AI_SERVICES_DATA.map((srv) => (
            <ServiceCard key={srv.id} service={srv} />
          ))}
        </div>
      </div>

      {/* Deep-Dive Inclusions Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 sm:p-12 space-y-8 text-left">
        <h3 className="text-2xl font-bold text-white font-heading">
          What Sets Our AI Architecture Apart
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-300">
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
            <ShieldCheck className="w-6 h-6 text-cyan-400" />
            <h4 className="text-sm font-bold text-white font-heading">Zero Data Leakage</h4>
            <p className="text-slate-400 leading-relaxed">
              We configure strict enterprise guardrails. Your private customer data is never used to train public models.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
            <Zap className="w-6 h-6 text-indigo-400" />
            <h4 className="text-sm font-bold text-white font-heading">Sub-Second Execution</h4>
            <p className="text-slate-400 leading-relaxed">
              Optimized streaming responses and webhook triggers ensure your customers never experience lag or downtime.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
            <Layers className="w-6 h-6 text-emerald-400" />
            <h4 className="text-sm font-bold text-white font-heading">Native Stack Integration</h4>
            <p className="text-slate-400 leading-relaxed">
              Direct plug-and-play connectors into HubSpot, Slack, Notion, Stripe, and your custom SQL databases.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <CTASection
        headline="Ready to Deploy AI Into Your Business?"
        description="Schedule a 30-minute consultation with our AI solutions architect to identify high-ROI opportunities."
      />

      {/* Meeting Booking Section */}
      <MeetingSection />

    </div>
  );
};
