import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Zap, 
  Compass, 
  CheckCircle2, 
  Star, 
  ExternalLink,
  ChevronRight,
  Eye,
  Check
} from 'lucide-react';
import { DEMO_REGISTRY } from '../data/demos';
import { SOLUTIONS_DATA } from '../data/solutions';
import { TESTIMONIALS_DATA } from '../data/testimonials';
import { useInquiry } from '../context/InquiryContext';

export const HomePage: React.FC = () => {
  const { openQuickModal } = useInquiry();
  const [activePreviewDemo, setActivePreviewDemo] = useState(DEMO_REGISTRY[0]);

  return (
    <div className="space-y-24 sm:space-y-32 pb-24 overflow-x-hidden">
      
      {/* 1. Hero Section */}
      <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Glow ambient gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/15 to-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto text-center relative z-10 space-y-8">
          
          {/* Top announcement badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 border border-indigo-500/30 text-indigo-300 text-xs font-semibold backdrop-blur-xl shadow-lg shadow-indigo-950/40 animate-in fade-in slide-in-from-top-4 duration-500">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span>DigitalFlowHub — Ready-Made Digital Experiences</span>
            <span className="text-slate-500">|</span>
            <span className="text-cyan-400 font-mono">8 Live Demos Ready</span>
          </div>

          {/* Main Headline */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08] font-heading">
              See Your Digital Future <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400">
                Before You Build It.
              </span>
            </h1>

            <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
              Explore professionally designed website concepts for different industries. From health and wellness to finance, education, coaching, and digital businesses, discover a design you like and make it your own.
            </p>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/demos"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 transition-all hover:scale-105 active:scale-98 flex items-center justify-center gap-2 group"
            >
              <Compass className="w-4 h-4 text-cyan-200 group-hover:rotate-45 transition-transform" />
              <span>Explore Website Demos</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-semibold text-sm border border-slate-700/80 shadow-lg hover:border-slate-600 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Get a Custom Website</span>
            </Link>
          </div>

          {/* Value Prop Micro Badges */}
          <div className="pt-4 flex flex-wrap justify-center items-center gap-6 text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Fully Interactive Live Demos
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Turnaround in 5–7 Days
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              100% Owned Source Code & Domain
            </span>
          </div>

          {/* Interactive Live Demo Preview Showcase Widget */}
          <div className="pt-12 max-w-6xl mx-auto">
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-3 sm:p-5 shadow-2xl shadow-indigo-950/40 backdrop-blur-2xl">
              
              {/* Top Showcase Toolbar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-4 px-3 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-xs font-mono text-slate-400 ml-2 hidden sm:inline">
                    Live Demo Interactive Showcase
                  </span>
                </div>

                {/* Switcher pills */}
                <div className="flex flex-wrap justify-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
                  {DEMO_REGISTRY.slice(0, 5).map((demo) => (
                    <button
                      key={demo.id}
                      onClick={() => setActivePreviewDemo(demo)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                        activePreviewDemo.id === demo.id
                          ? 'bg-indigo-600 text-white font-bold shadow-sm'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {demo.categoryLabel.split(' ')[0]}
                    </button>
                  ))}
                </div>

                <Link
                  to={activePreviewDemo.route}
                  className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-mono"
                >
                  <span>Open Full Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Showcase Body Preview */}
              <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center p-3 sm:p-4 rounded-2xl bg-slate-950/90 border border-slate-800/80">
                <div className="lg:col-span-7 relative group rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
                  <img
                    src={activePreviewDemo.previewImage}
                    alt={activePreviewDemo.name}
                    className="w-full h-72 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent flex items-end p-6">
                    <div className="space-y-1">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase bg-indigo-600 text-white font-bold">
                        {activePreviewDemo.categoryLabel}
                      </span>
                      <h4 className="text-xl font-bold text-white">{activePreviewDemo.name}</h4>
                    </div>
                  </div>
                </div>

                {/* Right Details Panel */}
                <div className="lg:col-span-5 text-left space-y-4 px-2">
                  <div>
                    <span className="text-xs font-mono uppercase text-indigo-400 font-semibold tracking-wider">
                      Concept Highlights
                    </span>
                    <h3 className="text-2xl font-bold text-white mt-1 font-heading">
                      {activePreviewDemo.name}
                    </h3>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      {activePreviewDemo.description}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-800">
                    <p className="text-xs font-semibold text-slate-200">Included Ready-Made Features:</p>
                    {activePreviewDemo.features.slice(0, 3).map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 flex flex-wrap items-center gap-3">
                    <Link
                      to={activePreviewDemo.route}
                      className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/30 flex items-center gap-1.5 transition-all"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Launch Live Demo</span>
                    </Link>
                    <button
                      onClick={() => openQuickModal(activePreviewDemo.id)}
                      className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold border border-slate-700 transition-colors"
                    >
                      Customize This
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 2. Key Value Proposition & Core Concept */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-indigo-950/60 via-slate-900 to-cyan-950/60 border border-slate-800 rounded-3xl p-8 sm:p-14 relative overflow-hidden shadow-2xl">
          <div className="max-w-3xl space-y-6">
            <span className="text-xs font-mono uppercase text-cyan-400 tracking-widest font-semibold">
              The DigitalFlowHub Advantage
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight font-heading">
              Why Guess From Wireframes When You Can{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
                Experience It Live?
              </span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Traditional web agencies make you wait 8–12 weeks while billing thousands of dollars for abstract wireframes. At DigitalFlowHub, you test live, fully functioning websites before spending a single dollar.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1">
                <span className="text-lg font-bold text-white flex items-center gap-2">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  Choose a Concept
                </span>
                <p className="text-xs text-slate-400">
                  Select a live template engineered for your specific industry's conversion dynamics.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1">
                <span className="text-lg font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  Customize For Your Brand
                </span>
                <p className="text-xs text-slate-400">
                  We integrate your logos, brand typography, custom copy, payment gateway, and CRM.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Industry Solutions Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-mono uppercase text-indigo-400 tracking-wider font-semibold">
            Tailored Industry Frameworks
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-heading">
            Websites Engineered For Your Industry
          </h2>
          <p className="text-sm text-slate-400">
            Every category is built with bespoke conversion psychology, tailored UI components, and real industry data.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SOLUTIONS_DATA.map((sol) => (
            <div
              key={sol.id}
              className="bg-slate-900/70 border border-slate-800 hover:border-indigo-500/40 rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-950/30 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors font-heading">
                    {sol.title}
                  </h3>
                  <span className={`text-xs font-mono font-bold ${sol.accentColor}`}>
                    {sol.stats.value}
                  </span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">{sol.description}</p>

                {/* Example Niches List */}
                <div className="space-y-1.5 pt-2 border-t border-slate-800">
                  <span className="text-[11px] font-mono uppercase text-slate-400 block font-semibold">
                    Ideal For:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {sol.niches.slice(0, 3).map((niche, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md text-[11px] bg-slate-950 text-slate-300 border border-slate-800"
                      >
                        {niche}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between">
                <Link
                  to={`/demo/${sol.matchingDemoSlug}`}
                  className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5 group/btn"
                >
                  <span>View Live Demo</span>
                  <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to={`/solutions#${sol.id}`}
                  className="text-[11px] text-slate-500 hover:text-slate-400 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/solutions"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
          >
            <span>Explore All Industry Solutions</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 4. Featured Demos Gallery Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-mono uppercase text-cyan-400 tracking-wider font-semibold">
              Live Demo Ecosystem
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-heading mt-1">
              Explore Featured Website Demos
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Click any demo to test the complete standalone website experience.
            </p>
          </div>

          <Link
            to="/demos"
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-xs border border-slate-700 flex items-center gap-2 transition-colors self-start md:self-auto"
          >
            <span>View All 8+ Demos</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DEMO_REGISTRY.slice(0, 4).map((demo) => (
            <div
              key={demo.id}
              className="bg-slate-900/80 border border-slate-800 hover:border-indigo-500/40 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-950/40 flex flex-col group"
            >
              <div className="relative h-48 w-full overflow-hidden bg-slate-800">
                <img
                  src={demo.previewImage}
                  alt={demo.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-950/85 backdrop-blur-md text-indigo-300 text-[10px] font-mono uppercase font-bold border border-indigo-800/40">
                  {demo.categoryLabel}
                </div>
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-slate-950/85 backdrop-blur-md text-amber-400 text-xs font-bold flex items-center gap-1 border border-slate-700">
                  <Star className="w-3 h-3 fill-amber-400" />
                  <span>{demo.rating}</span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <h4 className="font-bold text-base text-white group-hover:text-cyan-300 transition-colors">
                    {demo.name}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {demo.description}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-800/80">
                  <div className="flex flex-wrap gap-1">
                    {demo.tags.slice(0, 2).map((t, idx) => (
                      <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                        {t}
                      </span>
                    ))}
                  </div>

                  <Link
                    to={demo.route}
                    className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl shadow-md shadow-indigo-600/20 flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Live Demo</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. How It Works Step-by-Step */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-slate-950 py-20 rounded-3xl border border-slate-900">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-mono uppercase text-indigo-400 tracking-wider font-semibold">
            Simple 4-Step Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-heading">
            How DigitalFlowHub Works
          </h2>
          <p className="text-sm text-slate-400">
            From discovering your ideal demo to launching on your own domain in under a week.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {[
            {
              step: '01',
              title: 'Explore Live Demos',
              desc: 'Browse our extensive gallery of production-ready website templates and test live interactive features in your browser.',
            },
            {
              step: '02',
              title: 'Choose Your Concept',
              desc: 'Select the design and layout that best fits your business model, target clientele, and aesthetic preferences.',
            },
            {
              step: '03',
              title: 'We Customize It',
              desc: 'Our engineering team replaces placeholder data with your branding, photos, copywriting, and CRM/payment integrations.',
            },
            {
              step: '04',
              title: 'Launch in Days',
              desc: 'We deploy your completed, blazing-fast website to your custom domain with full SSL and zero monthly lock-in fees.',
            },
          ].map((s, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3 relative">
              <span className="text-2xl font-mono font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                {s.step}
              </span>
              <h4 className="text-lg font-bold text-white font-heading">{s.title}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Comparison Table (DigitalFlowHub vs Agency vs DIY) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-mono uppercase text-indigo-400 tracking-wider font-semibold">
            Clear Comparison
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-heading">
            Why Founders Choose DigitalFlowHub
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/80 text-xs font-mono uppercase text-slate-400">
                <th className="p-4 sm:p-6">Feature / Capability</th>
                <th className="p-4 sm:p-6 text-indigo-400 font-bold bg-indigo-950/40 border-x border-indigo-500/20">DigitalFlowHub</th>
                <th className="p-4 sm:p-6 text-slate-400">Traditional Agency</th>
                <th className="p-4 sm:p-6 text-slate-400">Generic DIY Builders</th>
              </tr>
            </thead>
            <tbody className="text-xs sm:text-sm divide-y divide-slate-800">
              <tr>
                <td className="p-4 sm:p-6 font-semibold text-white">Preview Before Paying</td>
                <td className="p-4 sm:p-6 font-bold text-emerald-400 bg-indigo-950/20 border-x border-indigo-500/20 flex items-center gap-1.5">
                  <Check className="w-4 h-4" /> Yes (100% Live Interactive Demos)
                </td>
                <td className="p-4 sm:p-6 text-slate-400">No (Only PDF mockups after deposit)</td>
                <td className="p-4 sm:p-6 text-slate-400">Partial (Generic templates)</td>
              </tr>
              <tr>
                <td className="p-4 sm:p-6 font-semibold text-white">Delivery Turnaround</td>
                <td className="p-4 sm:p-6 font-bold text-indigo-300 bg-indigo-950/20 border-x border-indigo-500/20">
                  5 to 7 Business Days
                </td>
                <td className="p-4 sm:p-6 text-slate-400">8 to 14 Weeks</td>
                <td className="p-4 sm:p-6 text-slate-400">Days to Months of your own labor</td>
              </tr>
              <tr>
                <td className="p-4 sm:p-6 font-semibold text-white">Source Code Ownership</td>
                <td className="p-4 sm:p-6 font-bold text-emerald-400 bg-indigo-950/20 border-x border-indigo-500/20">
                  100% Full Ownership
                </td>
                <td className="p-4 sm:p-6 text-slate-400">Often proprietary agency locks</td>
                <td className="p-4 sm:p-6 text-slate-400">Locked to monthly SaaS platform</td>
              </tr>
              <tr>
                <td className="p-4 sm:p-6 font-semibold text-white">Custom Integrations (AI, CRM, Stripe)</td>
                <td className="p-4 sm:p-6 font-bold text-emerald-400 bg-indigo-950/20 border-x border-indigo-500/20">
                  Handled End-to-End by Us
                </td>
                <td className="p-4 sm:p-6 text-slate-400">Expensive custom add-on fees</td>
                <td className="p-4 sm:p-6 text-slate-400">DIY plugin nightmare</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. Client Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-mono uppercase text-indigo-400 tracking-wider font-semibold">
            Client Success Stories
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-heading">
            Trusted by Modern Founders & Leaders
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TESTIMONIALS_DATA.map((t) => (
            <div
              key={t.id}
              className="p-8 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-4 hover:border-indigo-500/30 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="px-3 py-1 rounded-full text-[11px] font-mono bg-indigo-950 text-indigo-300 border border-indigo-800/40">
                  {t.results}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                "{t.quote}"
              </p>

              <div className="pt-4 border-t border-slate-800 flex items-center gap-3.5">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border border-slate-700"
                />
                <div>
                  <h5 className="font-bold text-sm text-white">{t.name}</h5>
                  <p className="text-xs text-slate-400">{t.role} • {t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Bottom High-Converting CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 rounded-3xl p-8 sm:p-14 text-center space-y-6 shadow-2xl relative overflow-hidden border border-indigo-500/30">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-300 font-semibold">
              Ready to Upgrade Your Digital Presence?
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-heading leading-tight">
              Pick a Concept Today. <br />
              Launch on Your Domain Next Week.
            </h2>
            <p className="text-sm text-indigo-200">
              Zero upfront risk. Browse our live website demos, test the user experience, and let our team tailor it to your exact specifications.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2">
            <Link
              to="/demos"
              className="px-8 py-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-sm shadow-xl shadow-black/40 transition-all hover:scale-105 flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-indigo-600" />
              <span>Explore Demo Gallery</span>
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 rounded-2xl bg-indigo-950 hover:bg-indigo-900 text-white font-semibold text-sm border border-indigo-700 transition-colors"
            >
              Request Custom Quote
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
