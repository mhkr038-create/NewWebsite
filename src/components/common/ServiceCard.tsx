import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Bot, 
  MessageSquareText, 
  Sparkles, 
  Cpu, 
  Compass, 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  Clock 
} from 'lucide-react';
import type { AiServiceItem } from '../../data/aiServices';
import { useInquiry } from '../../context/InquiryContext';

const ICON_MAP: Record<string, any> = {
  Bot,
  MessageSquareText,
  Sparkles,
  Cpu,
  Compass,
  Zap,
};

interface ServiceCardProps {
  service: AiServiceItem;
  className?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, className = '' }) => {
  const { openQuickModal } = useInquiry();
  const Icon = ICON_MAP[service.icon] || Bot;

  return (
    <div
      className={`bg-slate-900/80 border border-slate-800 hover:border-indigo-500/40 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-950/40 relative group ${className}`}
    >
      {service.popular && (
        <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 text-slate-950 font-bold text-[10px] font-mono uppercase tracking-wider shadow-lg shadow-indigo-500/30">
          Most Requested
        </div>
      )}

      <div className="space-y-4 text-left">
        {/* Top Icon & Tag */}
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Icon className="w-6 h-6 text-cyan-400" />
          </div>
          <span className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-slate-950 text-indigo-300 border border-slate-800">
            {service.tag}
          </span>
        </div>

        {/* Title & Short Description */}
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors font-heading">
            {service.title}
          </h3>
          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
            {service.shortDesc}
          </p>
        </div>

        {/* Key Benefits List */}
        <div className="space-y-2 pt-3 border-t border-slate-800/80">
          <span className="text-[11px] font-mono uppercase text-slate-400 font-semibold block">
            Key Business Benefits:
          </span>
          <div className="space-y-1.5">
            {service.keyBenefits.slice(0, 3).map((benefit, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Details & CTAs */}
      <div className="pt-4 border-t border-slate-800/80 space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>Turnaround: {service.timeline}</span>
          </div>
          <span className="font-bold text-white text-sm">
            From {service.startingPrice}
          </span>
        </div>

        {/* Learn More & Get Started buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <Link
            to="/ai-services"
            className="py-2.5 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-800 transition-colors flex items-center justify-center gap-1"
          >
            <span>Learn More</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
          <button
            onClick={() => openQuickModal(service.id)}
            className="py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition-colors flex items-center justify-center gap-1"
          >
            <span>Get Started</span>
            <Zap className="w-3 h-3 text-cyan-200" />
          </button>
        </div>
      </div>
    </div>
  );
};
