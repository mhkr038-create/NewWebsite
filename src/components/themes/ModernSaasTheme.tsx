'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowUpRight, 
  Sparkles, 
  CheckCircle2, 
  Zap, 
  Calculator, 
  TrendingUp, 
  ShieldCheck, 
  MessageSquare, 
  Star,
  Users,
  Clock,
  ChevronRight,
  Layers,
  ArrowRight
} from 'lucide-react';
import { useInquiry } from '../../context/InquiryContext';
import { SITE_CONFIG } from '../../config/siteConfig';

export function ModernSaasTheme() {
  const { openQuickModal } = useInquiry();
  const [adSpend, setAdSpend] = useState<number>(50000);
  const [leadConversionRate, setLeadConversionRate] = useState<number>(15);

  // ROI Calculator Calculations
  const estimatedLeads = Math.round((adSpend / 40) * (leadConversionRate / 100));
  const estimatedRevenue = estimatedLeads * 12500;
  const estimatedROAS = (estimatedRevenue / adSpend).toFixed(1);

  return (
    <div className="w-full bg-[#0a0d14] text-slate-100 min-h-screen pt-32 pb-24 px-4 sm:px-8 lg:px-12 font-sans overflow-x-hidden relative">
      {/* Background radial gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[500px] bg-gradient-to-b from-indigo-600/15 via-cyan-600/10 to-transparent blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-20 relative z-10">
        
        {/* Hero Section */}
        <section className="text-center max-w-4xl mx-auto space-y-6 pt-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-700/40 text-indigo-300 text-xs font-mono uppercase tracking-wider shadow-lg shadow-indigo-950/50">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Modern SaaS &amp; Growth Operating System</span>
          </div>

          <h1 className="text-3xl sm:text-6xl font-extrabold tracking-tight font-heading leading-[1.1] text-white">
            Scale revenue with <span className="bg-gradient-to-r from-indigo-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">algorithmic marketing</span> &amp; enterprise platforms.
          </h1>

          <p className="text-sm sm:text-lg text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
            We build lightning-fast web infrastructure, automated WhatsApp conversion funnels, and data-backed Meta &amp; Google ad engines engineered for quantifiable ROAS.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/intake-form"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-semibold text-xs font-mono uppercase tracking-wider transition-all shadow-lg shadow-indigo-600/30 flex items-center gap-2 hover:scale-[1.02]"
            >
              <span>Start Growth Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <button
              onClick={() => openQuickModal()}
              className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
            >
              Quick Consultation
            </button>
            <Link
              href="/schedule-meeting"
              className="px-5 py-3.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-slate-400 hover:text-white border border-slate-800 text-xs font-mono uppercase tracking-wider transition-colors"
            >
              Book 15-Min Call
            </Link>
          </div>
        </section>

        {/* Live Interactive ROI Calculator Widget */}
        <section className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
              <Calculator className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
                Interactive Growth &amp; Revenue Projection Simulator
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Adjust the sliders below to calculate projected pipeline value based on our benchmark client performance.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Controls */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-300">Monthly Paid Ad Spend</span>
                  <span className="text-indigo-400 font-bold">₹{adSpend.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="20000"
                  max="500000"
                  step="10000"
                  value={adSpend}
                  onChange={(e) => setAdSpend(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>₹20K (Early Stage)</span>
                  <span>₹250K (Growth)</span>
                  <span>₹500K (Enterprise)</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-300">Expected Lead Conversion Rate</span>
                  <span className="text-cyan-400 font-bold">{leadConversionRate}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="40"
                  step="1"
                  value={leadConversionRate}
                  onChange={(e) => setLeadConversionRate(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>5% (Industry Avg)</span>
                  <span>15% (DSS Benchmark)</span>
                  <span>40% (Optimized)</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">Est. High-Intent Leads</span>
                  <span className="text-lg font-bold text-white font-mono">{estimatedLeads} / mo</span>
                </div>
                <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">Projected ROAS</span>
                  <span className="text-lg font-bold text-emerald-400 font-mono">{estimatedROAS}x</span>
                </div>
                <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">Avg Lead Cost</span>
                  <span className="text-lg font-bold text-cyan-400 font-mono">₹{Math.round(adSpend / Math.max(1, estimatedLeads))}</span>
                </div>
              </div>
            </div>

            {/* Projected Output Card */}
            <div className="lg:col-span-5 bg-gradient-to-br from-indigo-950/70 via-slate-950 to-slate-900 p-6 rounded-2xl border border-indigo-800/40 text-center space-y-4 shadow-xl">
              <span className="text-xs font-mono uppercase text-indigo-300 tracking-wider">
                Estimated Monthly Pipeline
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
                ₹{estimatedRevenue.toLocaleString()}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Projected gross pipeline return calculated from automated WhatsApp engagement and optimized Meta audience targeting.
              </p>
              <button
                onClick={() => openQuickModal()}
                className="w-full py-3 rounded-xl bg-white hover:bg-slate-200 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Claim Growth Blueprint
              </button>
            </div>
          </div>
        </section>

        {/* Feature Grid: 4 Core Capabilities */}
        <section className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading">
              Engineered for Enterprise Acceleration
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Four unified systems delivering continuous customer acquisition and operational automation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                title: 'High-Performance Next.js',
                desc: 'Sub-second page speeds with server components and edge rendering for elite conversion rates.',
                badge: 'Engineering',
                link: '/landing-pages'
              },
              {
                title: 'Algorithmic Paid Ads',
                desc: 'Deep funnel Meta & Google campaign structures built around real customer acquisition cost (CAC).',
                badge: 'Acquisition',
                link: '/meta-ads'
              },
              {
                title: 'WhatsApp Cloud API',
                desc: 'Automated 24/7 lead qualification, booking calendar triggers, and automated payment receipts.',
                badge: 'Automation',
                link: '/whatsapp-automation'
              },
              {
                title: 'SchoolMIS Cloud ERP',
                desc: 'Complete student admission, daily attendance, fee ledger, and report card suite with ₹0 license fees.',
                badge: 'Flagship ERP',
                link: '/free-school-management-software'
              }
            ].map((f, i) => (
              <Link
                key={i}
                href={f.link}
                className="group p-6 rounded-2xl bg-slate-900/50 hover:bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 bg-indigo-950/70 border border-indigo-800/40 px-2 py-0.5 rounded-full inline-block mb-3">
                    {f.badge}
                  </span>
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {f.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {f.desc}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs text-indigo-400 font-semibold pt-2">
                  <span>Learn more</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Client Reviews / Social Proof */}
        <section className="bg-slate-950/80 border border-slate-800/80 rounded-3xl p-8 sm:p-12 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <h2 className="text-2xl font-bold text-white font-heading">Client Success &amp; Verified Reviews</h2>
              <p className="text-xs sm:text-sm text-slate-400">Validated ratings from founders, educators, and enterprise teams.</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="text-xs font-mono font-bold text-white">4.9 / 5.0 (98+ Reviews)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "The automated WhatsApp booking workflow alone doubled our patient consultations in the first 30 days.",
                author: "Dr. Arvind Rao",
                role: "Director, Apex Multi-Specialty Clinic",
              },
              {
                quote: "SchoolMIS ERP automated our student fee collection and parent attendance alerts at zero software license fees.",
                author: "Principal S. Sharma",
                role: "Rainbow English Medium School",
              },
              {
                quote: "Digital Simple Solution engineered our Next.js landing page with an astonishing 8.4% conversion rate on paid ads.",
                author: "Kavitha M.",
                role: "Founder, Zenith EdTech",
              }
            ].map((r, i) => (
              <div key={i} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3">
                <p className="text-xs text-slate-300 italic leading-relaxed">
                  &ldquo;{r.quote}&rdquo;
                </p>
                <div>
                  <div className="text-xs font-bold text-white">{r.author}</div>
                  <div className="text-[10px] text-slate-400">{r.role}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
