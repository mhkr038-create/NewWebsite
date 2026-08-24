import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Palette, 
  Code2, 
  Workflow, 
  Bot, 
  CheckCircle2, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp, 
  Zap, 
  Clock 
} from 'lucide-react';
import { SERVICES_REGISTRY, type ServiceItem } from '../data/services';
import { useInquiry } from '../context/InquiryContext';

export const ServicesPage: React.FC = () => {
  const { openQuickModal } = useInquiry();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const iconMap: Record<string, any> = {
    Palette,
    Code2,
    Workflow,
    Bot,
    LayoutTemplate: Palette,
  };

  const faqs = [
    {
      q: 'How does the digitalsimplesolution demo customization work?',
      a: 'You simply select any website demo from our gallery that matches your preferred layout and industry flow. Our engineering team replaces all sample text, media, branding assets, colors, and integrates your custom booking links, CRM, and payment processors. We launch the complete site on your custom domain in 5–7 business days.',
    },
    {
      q: 'Do I own the full source code and domain?',
      a: 'Yes, 100%. Unlike proprietary SaaS website builders that lock you into monthly recurring platform fees forever, with digitalsimplesolution you receive complete ownership of your React / Next.js codebase, assets, and DNS configuration.',
    },
    {
      q: 'Can you build custom features not shown in the live demos?',
      a: 'Absolutely. We offer bespoke full-stack engineering, including member portals, custom AI prompt workflows, multi-step appointment funnels, and enterprise ERP / webhook integrations.',
    },
    {
      q: 'What kind of support is included post-launch?',
      a: 'Every website package includes 30 days of comprehensive post-launch warranty, covering bug fixes, minor content tweaks, and DNS assistance. We also offer optional monthly maintenance and performance optimization retainers.',
    },
    {
      q: 'How do payments work for customization projects?',
      a: 'We work on a transparent 50% start deposit and 50% upon final launch approval after you test your site in our staging environment.',
    },
  ];

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
          <Zap className="w-3.5 h-3.5 text-cyan-400" />
          <span>End-to-End Digital Engineering</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight font-heading leading-tight">
          Professional Services & <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400">
            Custom Web Solutions.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
          From rapid turnkey demo customizations to complex full-stack web applications and autonomous AI workflows, explore our fixed-price service tiers.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {SERVICES_REGISTRY.map((service: ServiceItem) => {
          const Icon = iconMap[service.iconName] || Palette;

          return (
            <div
              key={service.id}
              className="bg-slate-900/80 border border-slate-800 hover:border-indigo-500/40 rounded-3xl p-8 flex flex-col justify-between space-y-6 transition-all shadow-2xl hover:shadow-indigo-950/40 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-bold text-emerald-400 font-mono">
                    {service.startingPrice}
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors font-heading">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {service.shortDesc}
                  </p>
                </div>

                {/* Deliverables */}
                <div className="space-y-2 pt-3 border-t border-slate-800">
                  <span className="text-[11px] font-mono uppercase text-slate-400 font-semibold block">
                    Deliverables & Inclusions:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {service.deliverables.map((item: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Timeline: {service.timeline}</span>
                </div>

                <button
                  onClick={() => openQuickModal()}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-600/30 transition-all flex items-center gap-1.5"
                >
                  <span>Book Service</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* FAQ Accordion Section */}
      <div className="max-w-3xl mx-auto space-y-6 pt-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono uppercase text-cyan-400 font-semibold">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl font-bold text-white font-heading">
            Got Questions? We Have Answers.
          </h2>
        </div>

        <div className="space-y-3 pt-4">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 text-sm font-bold text-white hover:text-indigo-300 transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-indigo-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Direct Contact Banner */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-indigo-950/80 to-slate-900 border border-indigo-500/30 text-center space-y-4 max-w-4xl mx-auto shadow-2xl">
        <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading">
          Need a Custom Architecture Quote?
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
          Schedule a direct 15-minute scoping conversation with our engineering team to review your technical requirements.
        </p>
        <div className="pt-2">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-indigo-600/30 transition-all"
          >
            <span>Start Free Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

    </div>
  );
};
