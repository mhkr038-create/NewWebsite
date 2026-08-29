import React from 'react';
import Link from 'next/link';
import { 
  Share2, 
  FileText, 
  Target, 
  Search, 
  MailCheck, 
  Layout, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp 
} from 'lucide-react';
import { MARKETING_SERVICES_DATA, type MarketingServiceItem } from '../../data/marketingServices';
import { useInquiry } from '../../context/InquiryContext';

const ICON_MAP: Record<string, any> = {
  Share2,
  FileText,
  Target,
  Search,
  MailCheck,
  Layout,
};

export const DigitalMarketingSection: React.FC = () => {
  const { openQuickModal } = useInquiry();

  return (
    <section id="digital-marketing" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
            <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
            <span>High-Converting Customer Acquisition</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading tracking-tight">
            Digital Marketing That Converts
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
            Attract qualified prospects, dominate organic search rankings, and convert casual visitors into high-ticket clients with data-driven marketing systems.
          </p>
        </div>

        <Link
          href="/meta-ads"
          className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-xs border border-slate-700 flex items-center gap-2 transition-colors self-start md:self-auto shrink-0"
        >
          <span>Explore Ad & SEO Strategies</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>


      {/* 6 Marketing Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MARKETING_SERVICES_DATA.map((srv: MarketingServiceItem) => {
          const Icon = ICON_MAP[srv.icon] || TrendingUp;

          return (
            <div
              key={srv.id}
              className="bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-950/30 text-left group"
            >
              <div className="space-y-4">
                {/* Header Icon + Metric */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-950/70 border border-cyan-500/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-slate-950 text-emerald-400 border border-slate-800">
                    {srv.metric}
                  </span>
                </div>

                {/* Title & Short Description */}
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors font-heading">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {srv.shortDesc}
                  </p>
                </div>

                {/* Benefits */}
                <div className="space-y-1.5 pt-3 border-t border-slate-800/80">
                  {srv.benefits.slice(0, 3).map((b, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Clear CTA Button */}
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

    </section>
  );
};
