import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowLeft } from 'lucide-react';
import { MeetingForm } from '../components/forms/MeetingForm';

export const ScheduleMeetingPage: React.FC = () => {
  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-16 text-left">
      
      {/* Back to Home */}
      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold border border-slate-800 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
          <Calendar className="w-3.5 h-3.5 text-cyan-400" />
          <span>Direct Strategic Scoping Session</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight font-heading leading-tight">
          Schedule a Strategy <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400">
            Consultation.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
          Book a 30-minute 1-on-1 session with our senior digital solutions architect. We will review your current systems and map out high-leverage AI, automation, and marketing quick-wins.
        </p>
      </div>

      {/* Embedded Meeting Form Card */}
      <div>
        <MeetingForm />
      </div>

      {/* What to Expect in the Meeting */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-8 space-y-6">
        <h3 className="text-xl font-bold text-white font-heading">
          What We Cover in Your 30-Minute Consultation:
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-300">
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-2">
            <span className="text-indigo-400 font-mono font-bold text-sm">01. Workflow Audit</span>
            <p className="text-slate-400 leading-relaxed">
              We analyze where your team is losing manual hours and identify exact automation bottlenecks.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-2">
            <span className="text-cyan-400 font-mono font-bold text-sm">02. AI Architecture Plan</span>
            <p className="text-slate-400 leading-relaxed">
              We present a practical AI blueprint: trained chatbot agents, content systems, or CRM pipeline webhooks.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-2">
            <span className="text-emerald-400 font-mono font-bold text-sm">03. Fixed Scope & Pricing</span>
            <p className="text-slate-400 leading-relaxed">
              You receive a transparent timeline and fixed quote with zero unexpected agency retainer fees.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
