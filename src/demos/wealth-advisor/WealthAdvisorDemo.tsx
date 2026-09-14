import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  ShieldCheck, 
  PieChart, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  Calendar, 
  X,
  Building,
  Scale
} from 'lucide-react';
import { DemoFrameWrapper } from '../DemoFrameWrapper';
import { DEMO_REGISTRY } from '../../data/demos';

const demoData = DEMO_REGISTRY.find(d => d.id === 'wealth-advisor')!;

export const WealthAdvisorDemo: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [consultSubmitted, setConsultSubmitted] = useState(false);

  // Wealth Calculator State
  const [initialCapital, setInitialCapital] = useState<number>(2500000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(50000);
  const [investmentYears, setInvestmentYears] = useState<number>(15);
  const [expectedReturn, setExpectedReturn] = useState<number>(8.5);

  const calculatedWealth = useMemo(() => {
    const r = expectedReturn / 100 / 12;
    const n = investmentYears * 12;
    let futureValue = initialCapital * Math.pow(1 + r, n);
    for (let i = 1; i <= n; i++) {
      futureValue += monthlyContribution * Math.pow(1 + r, n - i);
    }
    const totalDeposited = initialCapital + (monthlyContribution * n);
    const totalGrowth = futureValue - totalDeposited;

    return {
      futureValue: Math.round(futureValue),
      totalDeposited: Math.round(totalDeposited),
      totalGrowth: Math.round(totalGrowth),
    };
  }, [initialCapital, monthlyContribution, investmentYears, expectedReturn]);

  const services = [
    {
      title: 'Fiduciary Wealth & Portfolio Management',
      desc: 'Custom-tailored equity and fixed-income portfolios constructed with institutional-grade risk management and zero hidden broker commissions.',
      icon: PieChart,
      highlight: '100% Fee-Only Fiduciary',
    },
    {
      title: 'Strategic Tax Optimization & Alpha',
      desc: 'Active tax-loss harvesting, asset location strategies, and charitable gift structuring designed to maximize after-tax compound returns.',
      icon: TrendingUp,
      highlight: 'Advanced Tax Alpha',
    },
    {
      title: 'Multi-Generational Estate & Trust',
      desc: 'Comprehensive dynasty trust architecture, asset protection, and wealth preservation across family generations.',
      icon: Scale,
      highlight: 'Dynasty Protection',
    },
    {
      title: 'Private Equity & Alternative Assets',
      desc: 'Curated access to institutional direct investments, venture allocations, private credit, and prime commercial real estate.',
      icon: Building,
      highlight: 'Qualified Purchasers',
    },
  ];

  return (
    <DemoFrameWrapper demo={demoData}>
      <div className="bg-[#0b0f19] text-slate-100 font-sans min-h-screen selection:bg-amber-500 selection:text-slate-950">
        
        {/* Wealth Header */}
        <header className="bg-[#070a12]/95 border-b border-amber-500/20 sticky top-12 z-30 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-600 p-0.5 shadow-lg shadow-amber-500/20">
                <div className="w-full h-full bg-[#070a12] rounded-[6px] flex items-center justify-center">
                  <span className="font-serif font-bold text-lg text-amber-400">A</span>
                </div>
              </div>
              <div>
                <span className="font-serif font-bold text-lg tracking-wider text-white uppercase">
                  Aura <span className="text-amber-400">Capital</span>
                </span>
                <span className="text-[10px] text-amber-300/80 block tracking-widest uppercase font-mono">
                  Private Wealth Advisory
                </span>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-widest text-slate-300">
              <a href="#services" className="hover:text-amber-400 transition-colors">Wealth Solutions</a>
              <a href="#philosophy" className="hover:text-amber-400 transition-colors">Philosophy</a>
              <a href="#calculator" className="hover:text-amber-400 transition-colors">Wealth Calculator</a>
              <a href="#about" className="hover:text-amber-400 transition-colors">The Advisory</a>
            </nav>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setConsultSubmitted(false);
                  setModalOpen(true);
                }}
                className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all hover:scale-105"
              >
                Private Consultation
              </button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative pt-20 pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[#070a12] via-[#0b0f19] to-[#070a12] border-b border-amber-500/10">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/40 border border-amber-500/30 text-amber-300 text-xs font-mono uppercase tracking-widest">
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>Strict Fiduciary Standard • Fee-Only Advisory</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.1]">
                Preserving Capital. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-500">
                  Engineering Generational Alpha.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed max-w-xl">
                Bespoke wealth management, institutional risk architecture, and tax-efficient strategies designed for founders, executives, and high-net-worth families.
              </p>

              {/* AUM & Credentials Proof */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800/80">
                <div className="p-4 rounded-xl bg-slate-900/60 border border-amber-500/20">
                  <span className="text-2xl sm:text-3xl font-serif font-bold text-amber-400">₹7,000 Cr+</span>
                  <p className="text-[11px] text-slate-400 uppercase tracking-wider mt-1">AUM Advised</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/60 border border-amber-500/20">
                  <span className="text-2xl sm:text-3xl font-serif font-bold text-amber-400">100%</span>
                  <p className="text-[11px] text-slate-400 uppercase tracking-wider mt-1">Fiduciary Duty</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/60 border border-amber-500/20">
                  <span className="text-2xl sm:text-3xl font-serif font-bold text-amber-400">22+ Yrs</span>
                  <p className="text-[11px] text-slate-400 uppercase tracking-wider mt-1">Market Cycles</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={() => {
                    setConsultSubmitted(false);
                    setModalOpen(true);
                  }}
                  className="px-6 py-3.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-widest shadow-xl shadow-amber-500/20 flex items-center gap-2 transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Request Private Wealth Review</span>
                </button>
                <a
                  href="#calculator"
                  className="px-6 py-3.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-amber-300 font-semibold text-xs uppercase tracking-wider border border-amber-500/30 flex items-center gap-2 transition-colors"
                >
                  <span>Launch Wealth Calculator</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right Card: Institutional Portfolio Snapshot */}
            <div className="lg:col-span-5">
              <div className="bg-slate-950/90 border border-amber-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-amber-400 tracking-widest">Asset Allocation Model</span>
                    <h3 className="text-lg font-serif font-bold text-white">Global Endowment Core</h3>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 text-[11px] font-mono border border-amber-500/30">
                    Target Return: 8.5–10%
                  </span>
                </div>

                <div className="mt-6 space-y-4">
                  {[
                    { label: 'Global Systematic Equities', pct: '45%', color: 'bg-amber-400' },
                    { label: 'Private Credit & Direct Lending', pct: '20%', color: 'bg-yellow-500' },
                    { label: 'Alternative Alpha & Real Assets', pct: '18%', color: 'bg-emerald-400' },
                    { label: 'Hedging & High Quality Duration', pct: '12%', color: 'bg-cyan-400' },
                    { label: 'Strategic Liquidity Reserve', pct: '5%', color: 'bg-slate-400' },
                  ].map((alloc, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex justify-between text-xs text-slate-300">
                        <span className="font-medium">{alloc.label}</span>
                        <span className="font-mono font-bold text-amber-300">{alloc.pct}</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className={`h-full ${alloc.color}`} style={{ width: alloc.pct }} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span>Custodian: Charles Schwab & Fidelity</span>
                  <span className="text-amber-400 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    SIPC Protected
                  </span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-mono uppercase text-amber-400 tracking-widest font-semibold">
              Disciplined Wealth Solutions
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
              Institutional Expertise for Private Clients
            </h2>
            <p className="text-sm text-slate-400">
              We align our incentives solely with your financial growth. No commissions, no proprietary products.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((srv, idx) => {
              const IconComp = srv.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#0f1422] border border-slate-800 hover:border-amber-500/40 rounded-2xl p-8 transition-all hover:shadow-2xl hover:shadow-amber-950/20 group"
                >
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono uppercase tracking-widest px-3 py-1 rounded bg-slate-900 text-amber-300 border border-slate-800">
                      {srv.highlight}
                    </span>
                  </div>

                  <h3 className="text-xl font-serif font-bold text-white group-hover:text-amber-300 transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
                    {srv.desc}
                  </p>

                  <div className="mt-6 pt-5 border-t border-slate-800 flex items-center justify-between">
                    <button
                      onClick={() => setModalOpen(true)}
                      className="text-xs font-bold uppercase tracking-wider text-amber-400 hover:text-amber-300 flex items-center gap-1.5"
                    >
                      <span>Inquire About Strategy</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[11px] font-mono text-slate-500">₹50L+ Min Portfolio</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Interactive Wealth Calculator */}
        <section id="calculator" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#070a12] border-y border-amber-500/15">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
              <span className="text-xs font-mono uppercase text-amber-400 tracking-widest font-semibold">
                Interactive Compounding Simulator
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
                Visualize Your Wealth Trajectory
              </h2>
              <p className="text-sm text-slate-400">
                Experience the compounding power of disciplined asset allocation and systematic rebalancing.
              </p>
            </div>

            <div className="bg-[#0f1422] border border-amber-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Controls Column */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-2">
                    <span className="text-slate-300">Initial Portfolio Capital:</span>
                    <span className="text-amber-400 font-mono text-sm font-bold">
                      ₹{initialCapital.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="500000"
                    max="50000000"
                    step="100000"
                    value={initialCapital}
                    onChange={(e) => setInitialCapital(Number(e.target.value))}
                    className="w-full accent-amber-400 bg-slate-800 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                    <span>₹5,00,000</span>
                    <span>₹5,00,00,000</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-2">
                    <span className="text-slate-300">Monthly Contribution:</span>
                    <span className="text-amber-400 font-mono text-sm font-bold">
                      ₹{monthlyContribution.toLocaleString('en-IN')}/mo
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10000"
                    max="500000"
                    step="5000"
                    value={monthlyContribution}
                    onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                    className="w-full accent-amber-400 bg-slate-800 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                    <span>₹10,000/mo</span>
                    <span>₹5,00,000/mo</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-2">
                      <span className="text-slate-300">Timeline:</span>
                      <span className="text-amber-400 font-mono font-bold">{investmentYears} Years</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="30"
                      step="1"
                      value={investmentYears}
                      onChange={(e) => setInvestmentYears(Number(e.target.value))}
                      className="w-full accent-amber-400 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-2">
                      <span className="text-slate-300">Expected Annual Return:</span>
                      <span className="text-amber-400 font-mono font-bold">{expectedReturn}%</span>
                    </div>
                    <input
                      type="range"
                      min="4.0"
                      max="14.0"
                      step="0.5"
                      value={expectedReturn}
                      onChange={(e) => setExpectedReturn(Number(e.target.value))}
                      className="w-full accent-amber-400 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Output Display Column */}
              <div className="lg:col-span-6 bg-[#070a12] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
                <div className="text-center space-y-1 pb-6 border-b border-slate-800">
                  <span className="text-xs font-mono uppercase text-slate-400 tracking-widest">
                    Projected Portfolio Value in {investmentYears} Years
                  </span>
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-amber-400 tracking-tight mt-1">
                    ₹{calculatedWealth.futureValue.toLocaleString('en-IN')}
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                    <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Principal Contributed</span>
                    <span className="text-lg font-mono font-bold text-white mt-1 block">
                      ₹{calculatedWealth.totalDeposited.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-amber-500/20">
                    <span className="text-[11px] text-amber-400 uppercase tracking-wider block">Compound Alpha Growth</span>
                    <span className="text-lg font-mono font-bold text-emerald-400 mt-1 block">
                      +₹{calculatedWealth.totalGrowth.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setModalOpen(true)}
                  className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold text-xs uppercase tracking-widest rounded-xl shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <span>Build This Custom Strategy For My Portfolio</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        </section>

        {/* Advisor Profile Section */}
        <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
                  alt="Julian Sterling"
                  className="w-full h-96 sm:h-[480px] object-cover object-top"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#070a12] via-[#070a12]/80 to-transparent p-6">
                  <h4 className="font-serif text-xl font-bold text-white">Julian Sterling, CFP®, CFA®</h4>
                  <p className="text-xs text-amber-400 font-mono uppercase tracking-widest mt-0.5">
                    Managing Partner & Chief Investment Officer
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-mono uppercase text-amber-400 tracking-widest font-semibold">
                Senior Leadership
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white leading-tight">
                Two Decades of Navigating Global Financial Markets.
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Prior to founding Aura Capital, Julian managed institutional equity mandates for premier Wall Street investment houses. Today, he advises a select syndicate of 45 high-net-worth families with uncompromising fiduciary devotion.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  'Certified Financial Planner (CFP®) and Chartered Financial Analyst (CFA®)',
                  'Direct partner access — no junior account managers',
                  'Quarterly macro briefings and direct private equity deal flow',
                  'Independent fee-only structure aligned 100% with client performance',
                ].map((pt, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-300">{pt}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex items-center gap-6">
                <div className="border-l-2 border-amber-400 pl-4">
                  <span className="text-xs text-slate-400 uppercase tracking-widest font-mono">Barron's Top Advisor</span>
                  <p className="text-sm font-serif font-bold text-white">Ranked 2023, 2024 & 2025</p>
                </div>
                <div className="border-l-2 border-amber-400 pl-4">
                  <span className="text-xs text-slate-400 uppercase tracking-widest font-mono">Client Retention</span>
                  <p className="text-sm font-serif font-bold text-white">99.1% Over 10 Years</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Consultation Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-[#0f1422] border border-amber-500/40 rounded-2xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl">
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>

              {!consultSubmitted ? (
                <div>
                  <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-semibold">
                    Confidential & Non-Binding
                  </span>
                  <h3 className="text-xl font-serif font-bold text-white mt-1">
                    Request Private Strategy Review
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Review your current portfolio allocation and tax liabilities directly with Julian Sterling.
                  </p>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setConsultSubmitted(true);
                    }}
                    className="mt-5 space-y-4"
                  >
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Full Legal Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Richard Vance"
                        className="w-full px-3.5 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Email</label>
                        <input
                          type="email"
                          required
                          placeholder="richard@vancecapital.com"
                          className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Phone</label>
                        <input
                          type="tel"
                          required
                          placeholder="(555) 019-2831"
                          className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Estimated Investable Assets</label>
                      <select className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:border-amber-400">
                        <option>₹50 Lakhs – ₹1.5 Crores</option>
                        <option>₹1.5 Crores – ₹5 Crores</option>
                        <option>₹5 Crores – ₹20 Crores</option>
                        <option>₹20 Crores+ (Family Office)</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-2 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-widest rounded-lg shadow-lg shadow-amber-500/20 transition-all"
                    >
                      Submit Confidential Request
                    </button>
                  </form>
                </div>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/40">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-bold text-white">Inquiry Received</h3>
                    <p className="text-xs text-slate-300 mt-1 max-w-sm mx-auto">
                      Julian Sterling's executive desk will contact you within 24 hours under strict NDA protocol.
                    </p>
                  </div>
                  <button
                    onClick={() => setModalOpen(false)}
                    className="px-6 py-2 bg-slate-900 hover:bg-slate-800 text-amber-400 font-mono text-xs uppercase tracking-wider rounded-lg border border-slate-700"
                  >
                    Close
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
