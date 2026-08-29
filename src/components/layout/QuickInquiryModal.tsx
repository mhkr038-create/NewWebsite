'use client';

import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  Send, 
  ShieldCheck, 
  Clock 
} from 'lucide-react';
import { useInquiry } from '../../context/InquiryContext';
import { DEMO_REGISTRY } from '../../data/demos';
import { adminStore } from '../../services/adminStore';
import confetti from 'canvas-confetti';

export const QuickInquiryModal: React.FC = () => {
  const { isQuickModalOpen, closeQuickModal, selectedDemoId, setSelectedDemoId } = useInquiry();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [budget, setBudget] = useState('$1,500 – $3,500');
  const [timeline, setTimeline] = useState('Within 1–2 Weeks');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isQuickModalOpen) return null;

  const currentDemo = DEMO_REGISTRY.find(d => d.id === selectedDemoId) || DEMO_REGISTRY[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Save to admin store
    adminStore.addInquiry({
      name: fullName,
      email: email,
      phone: phone || 'Not Provided',
      serviceOrDemo: `${currentDemo.name} (${currentDemo.categoryLabel})`,
      message: `${businessName ? `[Business: ${businessName}] ` : ''}${notes || 'Quick Launch Request'} [Timeline: ${timeline}]`,
      source: 'Quick Modal',
      budget: budget,
    });


    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (err) {
        console.log(err);
      }
    }, 700);
  };


  const handleClose = () => {
    setIsSuccess(false);
    closeQuickModal();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 relative shadow-2xl my-8">
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono font-semibold uppercase mb-1">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Customize & Launch</span>
            </div>

            <h3 className="text-2xl font-bold text-white font-heading">
              Request Your Custom Website
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Tell us about your brand. We will customize this exact concept with your logo, copy, and backend integrations.
            </p>

            {/* Selected Demo Card */}
            <div className="my-4 p-3 rounded-2xl bg-slate-950/80 border border-indigo-500/30 flex items-center gap-3.5">
              <img
                src={currentDemo.previewImage}
                alt={currentDemo.name}
                className="w-14 h-14 rounded-xl object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider block">
                  Selected Concept:
                </span>
                <h4 className="text-sm font-bold text-white truncate">{currentDemo.name}</h4>
                <p className="text-[11px] text-slate-400 truncate">{currentDemo.categoryLabel}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Jordan Davis"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jordan@company.com"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(555) 012-3456"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Business / Brand Name</label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Davis Wellness Group"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Concept</label>
                  <select
                    value={selectedDemoId}
                    onChange={(e) => setSelectedDemoId(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500 text-[11px]"
                  >
                    {DEMO_REGISTRY.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Budget</label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500 text-[11px]"
                  >
                    <option>$1,000 – $2,000</option>
                    <option>$2,000 – $4,000</option>
                    <option>$4,000 – $8,000</option>
                    <option>$8,000+ Enterprise</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Timeline</label>
                  <select
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500 text-[11px]"
                  >
                    <option>Within 1–2 Weeks</option>
                    <option>Within 1 Month</option>
                    <option>Flexible</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Specific Customization Notes (Optional)</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Share color preferences, features, or integrations (e.g. Stripe, Calendly, CRM)..."
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Sending Request...' : 'Send Customization Request'}</span>
              </button>

              <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400 pt-2">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  100% Confidential
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  Fast Response &lt; 4 Hours
                </span>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white font-heading">
                Inquiry Received!
              </h3>
              <p className="text-xs text-slate-300 mt-1 max-w-sm mx-auto leading-relaxed">
                Thank you, <span className="text-white font-semibold">{fullName}</span>! Our lead designer is reviewing your request for the <span className="text-indigo-400 font-semibold">{currentDemo.name}</span> concept.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-left max-w-md mx-auto space-y-2">
              <span className="text-[10px] font-mono uppercase text-indigo-400 font-semibold block">
                Next Steps Timeline:
              </span>
              <div className="flex items-start gap-2 text-slate-300">
                <div className="w-4 h-4 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-[10px] shrink-0 mt-0.5">1</div>
                <span>Design Scope & Fixed-Price Proposal sent to {email} within 4 hours.</span>
              </div>
              <div className="flex items-start gap-2 text-slate-300">
                <div className="w-4 h-4 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-[10px] shrink-0 mt-0.5">2</div>
                <span>Optional 15-minute alignment call to finalize your assets.</span>
              </div>
              <div className="flex items-start gap-2 text-slate-300">
                <div className="w-4 h-4 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-[10px] shrink-0 mt-0.5">3</div>
                <span>Full website delivered and launched on your domain in 5–7 days.</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-600/30"
            >
              Continue Exploring digitalsimplesolution
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
