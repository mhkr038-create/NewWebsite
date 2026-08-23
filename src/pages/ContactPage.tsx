import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  Clock, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  MessageSquare
} from 'lucide-react';
import { DEMO_REGISTRY } from '../data/demos';
import confetti from 'canvas-confetti';

export const ContactPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const demoParam = searchParams.get('demo');

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [selectedDemo, setSelectedDemo] = useState(demoParam || 'health-clinic');
  const [budget, setBudget] = useState('$2,000 – $4,000');
  const [timeline, setTimeline] = useState('Within 1–2 Weeks');
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (demoParam) {
      setSelectedDemo(demoParam);
    }
  }, [demoParam]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      try {
        confetti({
          particleCount: 90,
          spread: 75,
          origin: { y: 0.6 },
        });
      } catch (err) {
        console.log(err);
      }
    }, 900);
  };

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
          <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
          <span>Direct Communication & Inquiries</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight font-heading leading-tight">
          Let's Build Your <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400">
            Digital Future Together.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
          Whether you want to customize an existing live demo concept or develop a bespoke digital product from scratch, our architecture team is ready.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Direct Info */}
        <div className="lg:col-span-5 space-y-8 text-left">
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-xl">
            <h3 className="text-xl font-bold text-white font-heading">
              DigitalFlowHub Headquarters
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              We operate globally with dedicated engineering and design hubs in New York, London, and San Francisco.
            </p>

            <div className="space-y-4 pt-2 border-t border-slate-800 text-xs">
              <div className="flex items-start gap-3 text-slate-300">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block">General & Customization Inquiries:</span>
                  <a href="mailto:hello@digitalflowhub.com" className="font-semibold text-white hover:text-cyan-400 transition-colors">
                    hello@digitalflowhub.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 text-slate-300">
                <Phone className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block">Direct Advisory Desk:</span>
                  <span className="font-semibold text-white">+1 (800) 419-3569</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-slate-300">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block">Guaranteed Response SLA:</span>
                  <span className="font-semibold text-white">Under 4 Hours (Business Days)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-950 border border-indigo-500/20 space-y-3">
            <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>DigitalFlowHub Guarantee</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every customization proposal includes fixed pricing, clear deliverables, 30 days of complimentary launch support, and 100% full source code ownership.
            </p>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7">
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
            
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs text-left">
                <div className="border-b border-slate-800 pb-3 mb-2">
                  <h3 className="text-xl font-bold text-white font-heading">
                    Request Customization or Quote
                  </h3>
                  <p className="text-slate-400 text-xs mt-0.5">
                    Fill out the parameters below and we will prepare a personalized scope.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Elena Rostova"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1.5">Work Email *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="elena@company.com"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1.5">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(555) 234-5678"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1.5">Brand / Business Name</label>
                    <input
                      type="text"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="e.g. Apex Studio"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1.5">Preferred Demo</label>
                    <select
                      value={selectedDemo}
                      onChange={(e) => setSelectedDemo(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500 text-[11px]"
                    >
                      {DEMO_REGISTRY.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.name}
                        </option>
                      ))}
                      <option value="custom">Custom Build</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1.5">Budget Range</label>
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500 text-[11px]"
                    >
                      <option>$1k – $2k</option>
                      <option>$2k – $4k</option>
                      <option>$4k – $8k</option>
                      <option>$8k+ Enterprise</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1.5">Target Timeline</label>
                    <select
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500 text-[11px]"
                    >
                      <option>Within 1–2 Weeks</option>
                      <option>Within 1 Month</option>
                      <option>Flexible / Planning</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1.5">Project Scope & Requirements</label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your brand, domain, target launch date, and any specific integrations you require (Stripe, Calendly, CRM, AI chatbot, etc.)..."
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 mt-3 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Submitting Scope...' : 'Submit Customization Request'}</span>
                </button>
              </form>
            ) : (
              <div className="text-center py-10 space-y-5">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white font-heading">
                    Inquiry Successfully Received!
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-white">{fullName}</strong>. Our senior solution architect is reviewing your submission and will email your fixed-price implementation proposal to <strong className="text-indigo-400">{email}</strong> within 4 hours.
                  </p>
                </div>

                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold"
                >
                  Submit Another Inquiry
                </button>
              </div>
            )}

          </div>
        </div>

      </div>

    </div>
  );
};
