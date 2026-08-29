'use client';

import React from 'react';
import Link from 'next/link';
import { 
  MessageSquare, 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  Clock, 
  Bot, 
  MessageCircle, 
  Workflow 
} from 'lucide-react';
import { GROWTH_SERVICES } from '../data/growthServices';
import { FAQAccordion } from '../components/common/FAQAccordion';
import { CTASection } from '../components/common/CTASection';
import { useInquiry } from '../context/InquiryContext';

export const WhatsAppAutomationPage: React.FC = () => {
  const service = GROWTH_SERVICES.find((s) => s.id === 'whatsapp-automation')!;
  const { openQuickModal } = useInquiry();
  const otherServices = GROWTH_SERVICES.filter((s) => s.id !== 'whatsapp-automation');

  return (
    <div className="space-y-20 sm:space-y-28 pb-24 overflow-x-hidden pt-28 sm:pt-36">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-indigo-500/30 text-indigo-300 text-xs font-mono">
            <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
            <span>24/7 Conversational Automation</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.1] font-heading">
            Turn Ad Clicks & Inquiries into <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              Instant Booked Appointments
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {service.description} Engage leads in under 30 seconds, qualify their intent through structured chatbot logic, and route warm buyers directly to your calendar or sales rep.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => openQuickModal('whatsapp-automation')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-bold text-sm shadow-xl shadow-emerald-600/30 transition-all hover:scale-105 active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4 text-cyan-200" />
              <span>Automate Your WhatsApp</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <Link
              href="/schedule-meeting"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-sm border border-slate-700/80 transition-colors flex items-center justify-center gap-2"
            >
              <span>Schedule Strategy Call</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 4 Core Pillars of Our WhatsApp Automation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">&lt; 30s Response Time</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Leads are 7x more likely to convert if answered in the first minute. Eliminate lead decay instantly.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-600/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Interactive Qualification</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Smart interactive buttons collect budget, timeline, and exact requirements before human handoff.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center">
              <Workflow className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Automated Nurture Drips</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Timed follow-ups with case studies, testimonials, and meeting reminders to re-engage cold prospects.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
              <MessageCircle className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Seamless Human Handoff</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Instant alerts sent to your sales team's personal WhatsApp or CRM with the full conversation summary.
            </p>
          </div>
        </div>
      </section>

      {/* Blueprints We Deploy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 sm:p-12 space-y-8 text-left backdrop-blur-xl">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase text-emerald-400 font-semibold">Ready-Made Blueprints</span>
            <h2 className="text-2xl sm:text-4xl font-bold text-white font-heading">
              WhatsApp Workflows We Build for Your Business
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {service.examples?.map((ex, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3.5 hover:border-emerald-500/40 transition-colors"
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{ex}</h3>
                  <p className="text-xs text-slate-400 mt-1">Official WhatsApp Cloud API verified with zero ban risk.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4-Step Process */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-mono uppercase text-emerald-400 font-semibold">Implementation Steps</span>
          <h2 className="text-2xl sm:text-4xl font-bold text-white font-heading">
            How We Deploy Your WhatsApp Growth Bot
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {service.process.map((step) => (
            <div
              key={step.step}
              className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="text-2xl font-mono font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                  {step.step}
                </span>
                <h3 className="text-base font-bold text-white font-heading">{step.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FAQAccordion faqs={service.faqs} title="Frequently Asked Questions about WhatsApp Automation" />
      </section>

      {/* Internal Cross-Linking: Related Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase text-indigo-400 font-semibold">Growth Ecosystem</span>
            <h3 className="text-xl font-bold text-white font-heading">
              Fuel Your WhatsApp Bot with High-Converting Traffic & Landing Pages
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherServices.slice(0, 3).map((os) => (
              <Link
                key={os.id}
                href={os.route}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-indigo-500/50 flex items-center justify-between group transition-all"
              >
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">{os.title}</h4>
                  <span className="text-[11px] text-slate-400">{os.tagline}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CTASection
        headline="Ready to Automate Your Customer Conversations?"
        description="Never let another qualified prospect slip through the cracks. Let's deploy your WhatsApp automation system."
        primaryCtaText="Automate WhatsApp Today"
        secondaryCtaText="Explore All Services"
      />
    </div>
  );
};
