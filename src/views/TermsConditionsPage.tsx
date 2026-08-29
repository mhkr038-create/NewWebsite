import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

export const TermsConditionsPage: React.FC = () => {
  return (
    <div className="space-y-12 pb-24 overflow-x-hidden pt-28 sm:pt-36">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-8">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>


        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-indigo-500/30 text-indigo-300 text-xs font-mono">
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            <span>Service Agreement & Legal Terms</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-heading tracking-tight">
            Terms & Conditions
          </h1>
          <p className="text-xs font-mono text-slate-400">Last Updated: August 2026</p>
        </div>

        <div className="space-y-6 text-sm text-slate-300 leading-relaxed bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-10 backdrop-blur-xl">
          <section className="space-y-2">
            <h2 className="text-xl font-bold text-white font-heading">1. Acceptance of Terms</h2>
            <p>
              By accessing, browsing, or utilizing the services provided by {SITE_CONFIG.brandName}, you agree to be bound by these Terms and Conditions and all applicable laws and regulations.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-white font-heading">2. Scope of Services</h2>
            <p>
              {SITE_CONFIG.brandName} provides digital growth consulting, landing page design, Meta Ads management, Google Ads management, digital product engineering, SEO content creation, and WhatsApp API automation. Each client engagement is defined by an agreed scope of work and project specification.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-white font-heading">3. Intellectual Property & Code Ownership</h2>
            <p>
              Unless otherwise specified in a custom agreement, upon full payment for custom design and development work, the client receives 100% full ownership of their custom website codebase, design files, and copywriting assets.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-white font-heading">4. Ad Spend & Third-Party Platforms</h2>
            <p>
              Advertising spend on platforms such as Meta (Facebook/Instagram) and Google Ads is billed directly by the respective platforms to the client's payment methods. {SITE_CONFIG.brandName} manages and optimizes these campaigns according to performance best practices.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-white font-heading">5. Governing Law & Contact</h2>
            <p>
              These terms shall be governed and construed in accordance with the laws of India. For any inquiries regarding these terms, please contact:
            </p>
            <p className="font-mono text-cyan-400">Email: {SITE_CONFIG.contact.email}</p>
          </section>
        </div>
      </div>
    </div>
  );
};
