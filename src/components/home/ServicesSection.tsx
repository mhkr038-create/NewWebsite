import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { GROWTH_SERVICES } from '../../data/growthServices';
import { ServiceCard } from '../common/ServiceCard';

export const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 scroll-mt-28">
      {/* Section Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-indigo-500/30 text-indigo-300 text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Complete Growth Portfolio</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-heading tracking-tight">
          Services Engineered for <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400">
            Scalable Lead Generation & Revenue
          </span>
        </h2>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
          We don't just provide individual disconnected services. We build and connect the core digital assets your business needs to attract, capture, and convert qualified buyers.
        </p>
      </div>

      {/* 6-Card Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {GROWTH_SERVICES.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>

      {/* Bottom Ecosystem CTA Link */}
      <div className="mt-12 text-center">
        <div className="inline-flex flex-col sm:flex-row items-center gap-3 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400">
          <span>Need a combination of ads, landing pages, and WhatsApp automation?</span>
          <a
            href="#ecosystem"
            className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 transition-colors"
          >
            <span>See How They Connect in Our Growth Ecosystem</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
