import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Lock } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

export const PrivacyPolicyPage: React.FC = () => {
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
            <Lock className="w-3.5 h-3.5 text-cyan-400" />
            <span>Legal & Data Privacy</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-heading tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs font-mono text-slate-400">Last Updated: August 2026</p>
        </div>

        <div className="space-y-6 text-sm text-slate-300 leading-relaxed bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-10 backdrop-blur-xl">
          <section className="space-y-2">
            <h2 className="text-xl font-bold text-white font-heading">1. Introduction</h2>
            <p>
              Welcome to {SITE_CONFIG.brandName} ("we", "our", or "us"). We are committed to protecting your personal information and your right to privacy. This policy outlines how we collect, use, store, and safeguard your data when you interact with our website, landing pages, digital products, paid campaigns, and WhatsApp automation systems.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-white font-heading">2. Information We Collect</h2>
            <p>
              We collect information that you voluntarily provide when filling out forms, booking consultations, downloading digital resources, or contacting us via WhatsApp. This may include:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-300">
              <li>Full name and business name</li>
              <li>Email address and telephone / WhatsApp number</li>
              <li>Company website URL and current marketing goals</li>
              <li>Information gathered through cookies, Google Tag Manager, and Meta Pixel analytics</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-white font-heading">3. How We Use Your Information</h2>
            <p>We use the collected information for the following legitimate business purposes:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-300">
              <li>To provide, operate, and maintain our digital growth services</li>
              <li>To respond to your inquiries and schedule discovery consultations</li>
              <li>To send automated WhatsApp follow-ups, confirmations, and resource delivery links</li>
              <li>To measure campaign performance, improve website UX, and prevent fraudulent activity</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-white font-heading">4. Data Security & Storage</h2>
            <p>
              We implement industry-standard encryption protocols (TLS/SSL) to safeguard your personal data. We never sell, rent, or trade your personal information to third parties for independent commercial gain.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-white font-heading">5. Contact Us Regarding Privacy</h2>
            <p>
              If you have any questions or wish to request data correction or deletion, please reach out to us directly at:
            </p>
            <p className="font-mono text-cyan-400">Email: {SITE_CONFIG.contact.email}</p>
          </section>
        </div>
      </div>
    </div>
  );
};
