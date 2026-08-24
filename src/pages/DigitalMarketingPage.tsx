import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Target, Search, Share2, MailCheck, Layout, ArrowRight, CheckCircle2 } from 'lucide-react';
import { MARKETING_SERVICES_DATA, type MarketingServiceItem } from '../data/marketingServices';
import { CTASection } from '../components/common/CTASection';
import { MeetingSection } from '../components/home/MeetingSection';
import { useInquiry } from '../context/InquiryContext';

const ICON_MAP: Record<string, any> = {
  Share2,
  FileText: TrendingUp,
  Target,
  Search,
  MailCheck,
  Layout,
};

export const DigitalMarketingPage: React.FC = () => {
  const { openQuickModal } = useInquiry();

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-24">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
          <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
          <span>Full-Funnel Growth Acquisition</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight font-heading leading-tight">
          Strategic Digital Marketing <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400">
            Engineered for High-Ticket ROI.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
          We combine SEO dominance, targeted customer acquisition funnels, and automated retention sequences to turn your website into a predictable revenue asset.
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#schedule-meeting"
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all"
          >
            <span>Request Growth Audit & Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <Link
            to="/solutions"
            className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-xs border border-slate-700 transition-colors"
          >
            See Solutions by Industry
          </Link>
        </div>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Avg ROAS Achieved', value: '4.8x', sub: 'Across B2B & Services' },
          { label: 'Organic Traffic Lift', value: '+280%', sub: 'Within 90 Days' },
          { label: 'Avg Landing Page Conv.', value: '6.2%', sub: 'Vs 2.1% Industry Avg' },
          { label: 'Email Revenue Yield', value: '44 : 1', sub: 'Proven ROI Multiple' },
        ].map((m, i) => (
          <div key={i} className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 text-center space-y-1">
            <span className="text-2xl sm:text-3xl font-mono font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              {m.value}
            </span>
            <span className="text-xs font-bold text-white block">{m.label}</span>
            <span className="text-[10px] text-slate-400">{m.sub}</span>
          </div>
        ))}
      </div>

      {/* 6 Marketing Services Grid */}
      <div className="space-y-8 text-left">
        <div>
          <span className="text-xs font-mono uppercase text-cyan-400 font-semibold tracking-wider">
            Marketing Capabilities
          </span>
          <h2 className="text-3xl font-bold text-white font-heading mt-1">
            Our Digital Marketing Services
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MARKETING_SERVICES_DATA.map((srv: MarketingServiceItem) => {
            const Icon = ICON_MAP[srv.icon] || TrendingUp;

            return (
              <div
                key={srv.id}
                className="bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-950/30 text-left group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-950/70 border border-cyan-500/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-slate-950 text-emerald-400 border border-slate-800">
                      {srv.metric}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors font-heading">
                      {srv.title}
                    </h3>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      {srv.fullDesc}
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-3 border-t border-slate-800/80">
                    <span className="text-[11px] font-mono uppercase text-slate-400 block font-semibold">
                      Key Deliverables:
                    </span>
                    {srv.benefits.map((b, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800/80">
                  <button
                    onClick={() => openQuickModal(srv.id)}
                    className="w-full py-3 px-4 rounded-xl bg-slate-950 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-cyan-600 text-slate-200 hover:text-white font-bold text-xs border border-slate-800 hover:border-transparent transition-all shadow-md flex items-center justify-center gap-2 group/btn"
                  >
                    <span>{srv.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-cyan-400 group-hover/btn:text-white group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA Section */}
      <CTASection
        headline="Ready to Accelerate Your Customer Acquisition?"
        description="Let's build a customized marketing and conversion roadmap to 3x your qualified inbound inquiries."
      />

      {/* Meeting Section */}
      <MeetingSection />

    </div>
  );
};
