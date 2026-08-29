import React from 'react';
import Link from 'next/link';
import { 
  Package, 
  Layout, 
  Share2, 
  Search, 
  FileText, 
  MessageSquare, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  Bot
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  Package,
  Layout,
  Share2,
  Search,
  FileText,
  MessageSquare,
  Bot,
};

export interface AnyServiceItem {
  id: string;
  title: string;
  description?: string;
  shortDesc?: string;
  fullDesc?: string;
  icon: string;
  badge?: string;
  tag?: string;
  tagline?: string;
  examples?: string[];
  features?: string[];
  keyBenefits?: string[];
  route?: string;
  ctaText?: string;
  startingPrice?: string;
  deliveryTime?: string;
}

interface ServiceCardProps {
  service: AnyServiceItem;
  className?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, className = '' }) => {
  const Icon = ICON_MAP[service.icon] || Sparkles;
  const route = service.route || '/#services';
  const ctaText = service.ctaText || 'Learn More';
  const badge = service.badge || service.tag || 'Featured Service';
  const desc = service.description || service.shortDesc || service.fullDesc || '';
  const features = service.features || service.keyBenefits || [];

  return (
    <div
      className={`bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-indigo-950/40 relative group overflow-hidden ${className}`}
    >
      {/* Soft hover glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 group-hover:bg-indigo-500/15 rounded-full blur-2xl transition-all pointer-events-none" />

      <div className="space-y-5 text-left relative z-10">
        {/* Top Header: Icon & Badge */}
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center group-hover:scale-110 group-hover:border-cyan-400/50 transition-all duration-300">
            <Icon className="w-6 h-6 text-cyan-400" />
          </div>
          <span className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-slate-950 text-indigo-300 border border-slate-800 group-hover:border-indigo-500/30 transition-colors">
            {badge}
          </span>
        </div>

        {/* Title & Description */}
        <div className="space-y-2">
          <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors font-heading">
            {service.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            {desc}
          </p>
        </div>

        {/* Examples / Features list */}
        {service.examples && service.examples.length > 0 && (
          <div className="space-y-2 pt-3 border-t border-slate-800/80">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold block">
              What We Build:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {service.examples.slice(0, 4).map((ex, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-slate-950 text-[11px] text-slate-300 border border-slate-800/80"
                >
                  {ex}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Features Checklist */}
        {features.length > 0 && (
          <div className="space-y-2 pt-3 border-t border-slate-800/80">
            <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-semibold block">
              Key Capabilities:
            </span>
            <div className="space-y-1.5">
              {features.slice(0, 4).map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action Button: Primary Service CTA */}
      <div className="pt-4 border-t border-slate-800/80 relative z-10">
        <Link
          href={route}
          className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white text-xs font-bold shadow-lg shadow-indigo-950/50 flex items-center justify-center gap-2 group/btn transition-all duration-200"
        >
          <span>{ctaText}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};


