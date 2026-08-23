import React, { useState } from 'react';
import { 
  TrendingUp, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  Globe, 
  Search, 
  X 
} from 'lucide-react';
import { DemoFrameWrapper } from '../DemoFrameWrapper';
import { DEMO_REGISTRY } from '../../data/demos';

const demoData = DEMO_REGISTRY.find(d => d.id === 'digital-agency')!;

export const DigitalAgencyDemo: React.FC = () => {
  const [auditUrl, setAuditUrl] = useState('');
  const [auditBudget, setAuditBudget] = useState('$5k – $15k/mo');
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditResult, setAuditResult] = useState<any | null>(null);

  const [auditModalOpen, setAuditModalOpen] = useState(false);
  const [auditBooked, setAuditBooked] = useState(false);

  const handleRunAudit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!auditUrl) return;
    setIsAuditing(true);
    setAuditResult(null);

    setTimeout(() => {
      setIsAuditing(false);
      setAuditResult({
        domain: auditUrl,
        score: '84/100',
        missedRevenue: '$14,200/mo',
        levers: [
          'High mobile drop-off on checkout page (-34% friction point)',
          'Sub-optimal Meta ad creative hooks (avg watch time < 2.1s)',
          'Zero post-purchase SMS or automated email retention sequence',
        ],
      });
    }, 1200);
  };

  const caseStudies = [
    {
      brand: 'AeroCloud SaaS',
      metric: '+340% Pipeline Velocity',
      summary: 'Scaled paid demo acquisitions from $380 CAC down to $112 CAC while doubling closed-won pipeline in 90 days.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
      tags: ['Paid Search', 'CRO Funnel', 'B2B SaaS'],
    },
    {
      brand: 'Nordic Clean Living',
      metric: '5.2x Blended ROAS',
      summary: 'Re-engineered DTC TikTok and Meta ad creative studio, driving $2.4M in Q4 Black Friday GMV.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
      tags: ['Creative Studio', 'Meta Ads', 'DTC E-Commerce'],
    },
    {
      brand: 'HyperScale Fintech',
      metric: '$8.2M Net New AUM',
      summary: 'Built high-intent organic search clusters and conversion landing pages ranking #1 for 42 high-value keywords.',
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=600&q=80',
      tags: ['Programmatic SEO', 'Landing Pages'],
    },
  ];

  return (
    <DemoFrameWrapper demo={demoData}>
      <div className="bg-[#050814] text-slate-100 font-sans min-h-screen selection:bg-blue-500 selection:text-white">
        
        {/* Header */}
        <header className="bg-[#080d22]/90 border-b border-blue-500/20 sticky top-12 z-30 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-pink-500 p-0.5 shadow-md shadow-blue-500/30">
                <div className="w-full h-full bg-[#050814] rounded-[10px] flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-blue-400" />
                </div>
              </div>
              <div>
                <span className="font-extrabold text-lg text-white font-heading tracking-tight flex items-center gap-1">
                  Vortex<span className="text-blue-400">Growth</span>
                </span>
                <span className="text-[10px] text-blue-300/80 block font-mono">
                  Performance & CRO Engine
                </span>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-7 text-xs font-semibold uppercase tracking-wider text-slate-300">
              <a href="#audit" className="hover:text-blue-400 transition-colors">Instant Audit</a>
              <a href="#services" className="hover:text-blue-400 transition-colors">Services</a>
              <a href="#cases" className="hover:text-blue-400 transition-colors">Case Studies</a>
              <a href="#pricing" className="hover:text-blue-400 transition-colors">Sprints & Pricing</a>
            </nav>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setAuditBooked(false);
                  setAuditModalOpen(true);
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all flex items-center gap-1.5"
              >
                <span>Book Growth Audit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative pt-20 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[#0e1738] via-[#050814] to-[#050814]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-700/50 text-blue-300 text-xs font-semibold">
                <Zap className="w-3.5 h-3.5 text-blue-400" />
                <span>Performance Marketing • Full-Funnel CRO • Creative Studio</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] font-heading">
                We Engineer Predictable <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-pink-400">
                  Revenue Growth for Scale-Ups.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
                No vanity metrics. We combine high-velocity paid acquisition, algorithmic creative production, and relentless conversion optimization to maximize your net profitability.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800">
                <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-blue-500/20">
                  <span className="text-2xl font-bold text-blue-400 font-heading">$45M+</span>
                  <p className="text-xs text-slate-400 mt-0.5">Revenue Generated</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-blue-500/20">
                  <span className="text-2xl font-bold text-blue-400 font-heading">4.8x</span>
                  <p className="text-xs text-slate-400 mt-0.5">Average Client ROAS</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-blue-500/20">
                  <span className="text-2xl font-bold text-blue-400 font-heading">280+</span>
                  <p className="text-xs text-slate-400 mt-0.5">Growth Sprints Run</p>
                </div>
              </div>
            </div>

            {/* Right Card: Instant Growth Audit Form */}
            <div id="audit" className="lg:col-span-5">
              <div className="bg-[#0b1028] border border-blue-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div>
                    <h3 className="text-lg font-bold text-white font-heading">Instant Website Audit</h3>
                    <p className="text-xs text-slate-400">Detect missed revenue leaks in 5 seconds</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-mono">
                    Free Tool
                  </span>
                </div>

                <form onSubmit={handleRunAudit} className="mt-5 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Website URL</label>
                    <div className="relative">
                      <Globe className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        required
                        value={auditUrl}
                        onChange={(e) => setAuditUrl(e.target.value)}
                        placeholder="yourbrand.com"
                        className="w-full pl-10 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Monthly Ad Budget</label>
                    <select
                      value={auditBudget}
                      onChange={(e) => setAuditBudget(e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                    >
                      <option>$2k – $5k/mo</option>
                      <option>$5k – $15k/mo</option>
                      <option>$15k – $50k/mo</option>
                      <option>$50k+/mo</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={isAuditing}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
                  >
                    <Search className="w-4 h-4" />
                    <span>{isAuditing ? 'Analyzing Funnel...' : 'Scan Funnel & Revenue Leaks'}</span>
                  </button>
                </form>

                {/* Audit Result Display */}
                {auditResult && (
                  <div className="mt-5 p-4 rounded-2xl bg-slate-950 border border-blue-500/40 space-y-3 animate-in fade-in duration-300 text-xs">
                    <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                      <span className="text-slate-400">Funnel Health: <strong className="text-emerald-400">{auditResult.score}</strong></span>
                      <span className="text-pink-400 font-bold font-mono">Leaking ~{auditResult.missedRevenue}</span>
                    </div>
                    <div className="space-y-1.5">
                      <p className="font-semibold text-slate-200">Top Growth Unlocks:</p>
                      {auditResult.levers.map((lever: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-1.5 text-slate-300 text-[11px]">
                          <span className="text-blue-400 font-bold">•</span>
                          <span>{lever}</span>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => setAuditModalOpen(true)}
                      className="w-full mt-2 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg text-xs font-semibold border border-blue-500/40 text-center block"
                    >
                      Book 1-on-1 Deep Dive Strategy Review
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>
        </section>

        {/* Case Studies */}
        <section id="cases" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-mono uppercase text-blue-400 tracking-wider font-semibold">
              Proven Results
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-heading">
              Case Studies in Revenue Expansion
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((cs, idx) => (
              <div
                key={idx}
                className="bg-[#0b1028] border border-slate-800 hover:border-blue-500/40 rounded-3xl overflow-hidden transition-all hover:shadow-xl group"
              >
                <div className="h-48 w-full overflow-hidden bg-slate-800">
                  <img
                    src={cs.image}
                    alt={cs.brand}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <span className="text-xs font-bold text-blue-400">{cs.brand}</span>
                  <h4 className="text-2xl font-bold text-white font-heading">{cs.metric}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{cs.summary}</p>
                  <div className="pt-3 border-t border-slate-800 flex flex-wrap gap-1.5">
                    {cs.tags.map((t, i) => (
                      <span key={i} className="px-2 py-0.5 rounded text-[10px] bg-slate-950 text-slate-400 border border-slate-800">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Consultation Modal */}
        {auditModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-[#0b1028] border border-blue-500/40 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl">
              <button
                onClick={() => setAuditModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>

              {!auditBooked ? (
                <div>
                  <span className="text-[11px] font-mono text-blue-400 uppercase tracking-wider font-semibold">
                    1-on-1 Growth Session
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">Schedule Strategy Review</h3>
                  <p className="text-xs text-slate-300 mt-1">
                    We will walk through your funnel teardown and provide actionable revenue multipliers.
                  </p>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setAuditBooked(true);
                    }}
                    className="mt-5 space-y-3.5 text-xs"
                  >
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Jordan Price"
                        className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-blue-400"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1">Work Email</label>
                        <input
                          type="email"
                          required
                          placeholder="jordan@company.com"
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-blue-400"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1">Phone</label>
                        <input
                          type="tel"
                          required
                          placeholder="(555) 000-8899"
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-blue-400"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full mt-2 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-600/30 transition-all"
                    >
                      Confirm Growth Review
                    </button>
                  </form>
                </div>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto border border-blue-500/40">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Strategy Call Confirmed!</h3>
                  <p className="text-xs text-slate-300 max-w-sm mx-auto">
                    We have reserved your slot. A calendar invite has been sent to your email.
                  </p>
                  <button
                    onClick={() => setAuditModalOpen(false)}
                    className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </DemoFrameWrapper>
  );
};
