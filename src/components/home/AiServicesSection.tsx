import React from 'react';
import Link from 'next/link';
import { Bot, ArrowRight } from 'lucide-react';
import { AI_SERVICES_DATA } from '../../data/aiServices';
import { ServiceCard } from '../common/ServiceCard';
import { AiDemoWidget } from '../ai/AiDemoWidget';

export const AiServicesSection: React.FC = () => {
  return (
    <section id="ai-services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
            <Bot className="w-3.5 h-3.5 text-cyan-400" />
            <span>Intelligent Autonomous Systems</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading tracking-tight">
            AI Services Engineered for Growth
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
            From autonomous customer support chatbots to intelligent content pipelines, deploy production-ready AI solutions that generate measurable ROI.
          </p>
        </div>

        <Link
          href="/solutions"
          className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-xs border border-slate-700 flex items-center gap-2 transition-colors self-start md:self-auto shrink-0"
        >
          <span>View All AI Capabilities</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>


      {/* Interactive AI Agent Simulator Preview */}
      <div className="space-y-3 text-left">
        <span className="text-xs font-mono uppercase text-cyan-400 font-semibold tracking-wider">
          Live Sandbox Preview
        </span>
        <AiDemoWidget />
      </div>

      {/* 5 AI Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {AI_SERVICES_DATA.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>

    </section>
  );
};
