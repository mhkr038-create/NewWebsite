import React from 'react';
import { Mail, Phone, Calendar, Clock, ShieldCheck, MessageSquare } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import { ContactForm } from '../components/forms/ContactForm';
import { MeetingSection } from '../components/home/MeetingSection';

export const ContactPage: React.FC = () => {
  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-24 text-left">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
          <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
          <span>Direct Agency Communication</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight font-heading leading-tight">
          Let's Build <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400">
            Something Smarter.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
          Whether you want to automate repetitive workflows, launch an AI chatbot, generate more qualified leads, or build a high-converting website, our team is ready.
        </p>

        {/* 3 Quick Action CTAs */}
        <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#schedule-meeting"
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all"
          >
            <Calendar className="w-4 h-4 text-cyan-200" />
            <span>Schedule a Meeting</span>
          </a>
          <a
            href={`mailto:${SITE_CONFIG.contact.email}`}
            className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-xs border border-slate-700 flex items-center gap-2 transition-colors"
          >
            <Mail className="w-4 h-4 text-cyan-400" />
            <span>Email Us</span>
          </a>
          <a
            href={`tel:${SITE_CONFIG.contact.phone}`}
            className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-xs border border-slate-700 flex items-center gap-2 transition-colors"
          >
            <Phone className="w-4 h-4 text-indigo-400" />
            <span>Call Us</span>
          </a>
        </div>
      </div>

      {/* Main Form & Contact Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Direct Contact Details & Information Cards */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-xl backdrop-blur-xl">
            <h3 className="text-2xl font-bold text-white font-heading">
              Direct Contact Information
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Reach out directly to our engineering and consulting team for inquiries, quotes, or custom solutions.
            </p>

            <div className="space-y-4 pt-2 border-t border-slate-800 text-xs">
              
              {/* Email (Clickable mailto) */}
              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/80">
                <div className="w-9 h-9 rounded-xl bg-cyan-950/70 border border-cyan-500/30 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block font-mono uppercase">Official Email</span>
                  <a
                    href={`mailto:${SITE_CONFIG.contact.email}`}
                    className="font-bold text-sm text-white hover:text-cyan-400 transition-colors underline underline-offset-2 break-all"
                  >
                    {SITE_CONFIG.contact.email}
                  </a>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Click to send direct email</span>
                </div>
              </div>

              {/* Phone (Clickable tel) */}
              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/80">
                <div className="w-9 h-9 rounded-xl bg-indigo-950/70 border border-indigo-500/30 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-indigo-400" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block font-mono uppercase">Direct Phone / WhatsApp</span>
                  <a
                    href={`tel:${SITE_CONFIG.contact.phone}`}
                    className="font-bold text-sm text-white hover:text-indigo-400 transition-colors"
                  >
                    {SITE_CONFIG.contact.displayPhone}
                  </a>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Click to call on mobile</span>
                </div>
              </div>

              {/* SLA */}
              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/80">
                <div className="w-9 h-9 rounded-xl bg-emerald-950/70 border border-emerald-500/30 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block font-mono uppercase">Response Time SLA</span>
                  <span className="font-bold text-sm text-white">Under 2 Hours (Guaranteed)</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Mon – Sat, 08:00 AM – 08:00 PM</span>
                </div>
              </div>

            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-950 border border-indigo-500/30 space-y-3">
            <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>DigitalFlowHub Transparency Guarantee</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every project comes with clear fixed deliverables, 100% full source code ownership, zero monthly agency vendor locks, and a 30-day post-launch warranty.
            </p>
          </div>

        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7">
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-2xl">
            <div className="border-b border-slate-800 pb-4 mb-6">
              <h3 className="text-2xl font-bold text-white font-heading">
                Send Us a Message
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Fill out the details below and we will get back to you with a tailored action plan.
              </p>
            </div>
            <ContactForm />
          </div>
        </div>

      </div>

      {/* Meeting Section */}
      <MeetingSection />

    </div>
  );
};
