import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles, 
  Eye, 
  Calendar, 
  Bot, 
  TrendingUp, 
  Layers 
} from 'lucide-react';
import { SOLUTIONS_DATA } from '../data/solutions';
import { DEMO_REGISTRY } from '../data/demos';
import { CTASection } from '../components/common/CTASection';
import { MeetingSection } from '../components/home/MeetingSection';
import { useInquiry } from '../context/InquiryContext';

export const IndustryDetailPage: React.FC = () => {
  const { industrySlug } = useParams<{ industrySlug: string }>();
  const { openQuickModal } = useInquiry();

  const solution = SOLUTIONS_DATA.find(
    (s) => s.slug.toLowerCase() === (industrySlug || '').toLowerCase()
  );

  // If not found, redirect to main solutions directory
  if (!solution) {
    return <Navigate to="/solutions" replace />;
  }

  // Find matching demo if available
  const matchingDemo = DEMO_REGISTRY.find((d) => d.slug === solution.matchingDemoSlug);

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-24 text-left">
      
      {/* Back Link */}
      <div>
        <Link
          to="/solutions"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold border border-slate-800 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Industry Solutions</span>
        </Link>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-950/70 via-slate-900 to-cyan-950/70 border border-slate-800 rounded-3xl p-8 sm:p-14 relative overflow-hidden shadow-2xl space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <span>Tailored Architecture for {solution.title}</span>
        </div>

        <div className="max-w-3xl space-y-4">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight font-heading leading-tight">
            Digital Solutions & Automation for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400">
              {solution.title}.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            {solution.description}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <a
            href="#schedule-meeting"
            className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all"
          >
            <Calendar className="w-4 h-4" />
            <span>Schedule {solution.title} Consultation</span>
          </a>

          {solution.matchingDemoSlug && (
            <Link
              to={`/demo/${solution.matchingDemoSlug}`}
              className="px-6 py-3.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 font-semibold text-xs border border-slate-700 flex items-center gap-2 transition-colors"
            >
              <Eye className="w-4 h-4 text-cyan-400" />
              <span>Launch Live {solution.title} Website Demo</span>
            </Link>
          )}
        </div>

        {/* Stats Pill */}
        <div className="pt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs font-mono text-cyan-300">
          <span className="font-bold text-lg text-white">{solution.stats.value}</span>
          <span className="text-slate-400">• {solution.stats.label}</span>
        </div>
      </div>

      {/* 3 Pillars Grid: Challenges, AI Systems, Growth Strategy */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Card 1: Common Bottlenecks */}
        <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-xl">
          <h3 className="text-lg font-bold text-rose-400 font-heading">
            Common Bottlenecks in {solution.title}
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            These operational friction points prevent businesses in this sector from scaling efficiently:
          </p>
          <ul className="space-y-2 pt-2 border-t border-slate-800 text-xs text-slate-300">
            {solution.challenges.map((c, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Card 2: AI & Automation Fix */}
        <div className="p-8 rounded-3xl bg-slate-900/80 border border-indigo-500/30 space-y-4 shadow-xl">
          <h3 className="text-lg font-bold text-cyan-400 font-heading flex items-center gap-2">
            <Bot className="w-5 h-5 text-cyan-400" />
            <span>Our AI & Automation Fix</span>
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Autonomous intelligence pipelines deployed directly into your daily operational workflow:
          </p>
          <ul className="space-y-2 pt-2 border-t border-slate-800 text-xs text-slate-300">
            {solution.aiSolutions.map((a, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Card 3: Targeted Marketing Engine */}
        <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-xl">
          <h3 className="text-lg font-bold text-indigo-400 font-heading flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-400" />
            <span>Targeted Marketing Strategy</span>
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Data-driven acquisition frameworks to capture the highest-intent clients in this niche:
          </p>
          <ul className="space-y-2 pt-2 border-t border-slate-800 text-xs text-slate-300">
            {solution.marketingStrategy.map((m, i) => (
              <li key={i} className="flex items-start gap-2">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Sample Website Concept & Live Demo Showcase */}
      {matchingDemo && (
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-8 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono uppercase text-cyan-400 font-semibold tracking-wider">
                Sample Production Prototype
              </span>
              <h2 className="text-3xl font-bold text-white font-heading mt-1">
                {matchingDemo.name}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                {matchingDemo.description}
              </p>
            </div>

            <Link
              to={matchingDemo.route}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-2 self-start md:self-auto shrink-0 transition-all"
            >
              <Eye className="w-4 h-4" />
              <span>Launch Live Interactive Demo</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl relative group">
              <img
                src={matchingDemo.previewImage}
                alt={matchingDemo.name}
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent flex items-end p-6">
                <span className="px-3 py-1 rounded-md bg-indigo-600 text-white text-xs font-bold font-mono">
                  {matchingDemo.categoryLabel}
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <h4 className="text-base font-bold text-white font-heading">
                Included Features for {solution.title}:
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                {matchingDemo.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-slate-800 flex items-center gap-3">
                <button
                  onClick={() => openQuickModal(matchingDemo.id)}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/30 transition-all"
                >
                  Customize This Website
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <CTASection
        headline={`Ready to Dominate the ${solution.title} Market?`}
        description={`Schedule a strategy session to explore how our AI, automation, and website solutions will transform your ${solution.title.toLowerCase()} business.`}
      />

      {/* Meeting Section */}
      <MeetingSection />

    </div>
  );
};
