'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  User, 
  Phone, 
  Calendar, 
  FileText, 
  Mail, 
  MapPin, 
  Building, 
  DollarSign, 
  Clock, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  MessageCircle, 
  ExternalLink,
  Layers,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SITE_CONFIG } from '../config/siteConfig';
import { adminStore } from '../services/adminStore';

const REQUIREMENT_OPTIONS = [
  'Website Design & High-Converting Landing Pages',
  'Meta (Facebook/Instagram) & Google Ads Management',
  'WhatsApp Automated Sales & Lead Funnels',
  'Custom AI Agents, Chatbots & LLM Workflows',
  'Digital Products & Online Store Systems',
  'Full Digital Growth & Automation Package',
  'Other Custom Business Requirement',
];

const BUDGET_OPTIONS = [
  'Under $1,000 / Under ₹25,000',
  '$1,000 – $3,000 / ₹25,000 – ₹75,000',
  '$3,000 – $7,000 / ₹75,000 – ₹2,00,000',
  '$7,000+ / ₹2,00,000+ (Enterprise Scale)',
];

const TIMELINE_OPTIONS = [
  'Urgent (Within 1–2 Weeks)',
  'Within 1 Month',
  'Flexible / Planning Phase',
];

export const IntakeFormView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'native' | 'googleForm'>('native');

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [requirement, setRequirement] = useState(REQUIREMENT_OPTIONS[0]);
  const [requirementDetails, setRequirementDetails] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [budget, setBudget] = useState(BUDGET_OPTIONS[1]);
  const [timeline, setTimeline] = useState(TIMELINE_OPTIONS[0]);

  // Google Form custom URL state
  const [customGoogleFormUrl, setCustomGoogleFormUrl] = useState(
    SITE_CONFIG.googleFormUrl || ''
  );
  const [inputUrl, setInputUrl] = useState(SITE_CONFIG.googleFormUrl || '');

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !phone.trim() || !age.trim() || !requirement.trim()) {
      setErrorMessage('Please fill in all mandatory fields: Full Name, Phone Number, Age, and Requirement.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    // Construct unified message
    const fullMessage = [
      businessName ? `[Business: ${businessName}]` : '',
      city ? `[Location: ${city}]` : '',
      `[Age: ${age}]`,
      `[Requirement Category: ${requirement}]`,
      requirementDetails ? `Details: ${requirementDetails}` : '',
      `[Budget: ${budget} | Timeline: ${timeline}]`
    ].filter(Boolean).join('\n');

    // Save to Admin Store
    adminStore.addInquiry({
      name: fullName,
      email: email || 'Not Provided',
      phone: phone,
      serviceOrDemo: requirement,
      message: fullMessage,
      source: 'Submit Request',
      age: age,
      requirement: requirement,
      city: city || 'Not Specified',
      businessName: businessName || 'Not Specified',
      budget: budget,
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (err) {
        console.error(err);
      }
    }, 600);
  };

  const handleWhatsAppDirect = () => {
    const waText = encodeURIComponent(
      `Hi ${SITE_CONFIG.brandName}! Here are my project details:\n\n` +
      `*Name:* ${fullName || 'Client'}\n` +
      `*Phone:* ${phone || 'N/A'}\n` +
      `*Age:* ${age || 'N/A'}\n` +
      `*Requirement:* ${requirement}\n` +
      (requirementDetails ? `*Details:* ${requirementDetails}\n` : '') +
      (city ? `*City:* ${city}\n` : '') +
      (businessName ? `*Business:* ${businessName}\n` : '') +
      `*Budget:* ${budget}\n` +
      `*Timeline:* ${timeline}`
    );

    window.open(`https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${waText}`, '_blank');
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFullName('');
    setPhone('');
    setAge('');
    setRequirementDetails('');
    setEmail('');
    setCity('');
    setBusinessName('');
  };

  return (
    <div className="w-full min-h-screen bg-black text-white pt-32 pb-24 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Top Breadcrumb & Status */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 text-xs font-mono">
          <div className="flex items-center gap-2 text-neutral-400">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Submit Request</span>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Submit Request
          </span>
        </div>

        {/* Section Header */}
        <div className="mb-10 text-left">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold mb-2 block">
            Project Request &amp; Requirements
          </span>
          <h1 className="text-3xl sm:text-5xl font-normal tracking-tight text-white mb-4 leading-tight">
            Submit Your Project Request
          </h1>
          <p className="text-sm sm:text-base text-neutral-400 max-w-2xl leading-relaxed font-light">
            Share your contact details, age, and specific requirement below. Our team reviews submissions within 2 hours to provide a tailored blueprint and budget estimate.
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex items-center gap-2 p-1.5 bg-neutral-950 border border-neutral-800 rounded-2xl mb-8 max-w-md">
          <button
            type="button"
            onClick={() => setActiveTab('native')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'native'
                ? 'bg-white text-black font-bold shadow-lg'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Web Form</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('googleForm')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'googleForm'
                ? 'bg-white text-black font-bold shadow-lg'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Google Form Embed</span>
          </button>
        </div>

        {/* TAB 1: NATIVE HIGH-CONVERSION INTAKE FORM */}
        {activeTab === 'native' && (
          <div className="bg-neutral-950 border border-neutral-800/90 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6 text-left relative z-10">
                {errorMessage && (
                  <div className="p-4 rounded-xl bg-red-950/60 border border-red-800 text-red-300 text-xs flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Section 1: Personal Details */}
                <div className="border-b border-neutral-800/80 pb-6">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-4 flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-cyan-400" />
                    <span>1. Basic Personal Information</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                        Full Name <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Rahul Sharma"
                          className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-xl text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                        />
                      </div>
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1.5 flex items-center justify-between">
                        <span>Phone Number (WhatsApp) <span className="text-red-400">*</span></span>
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-xl text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                        />
                      </div>
                    </div>

                    {/* Age */}
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1.5 flex items-center justify-between">
                        <span>Age <span className="text-red-400">*</span></span>
                        <span className="text-[10px] text-neutral-500 font-mono">Years</span>
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          required
                          min="16"
                          max="99"
                          value={age}
                          onChange={(e) => setAge(e.target.value)}
                          placeholder="e.g. 28"
                          className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-xl text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-mono"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 2: Requirement Details */}
                <div className="border-b border-neutral-800/80 pb-6">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-4 flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-cyan-400" />
                    <span>2. Your Requirement</span>
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                        Select Primary Service / Requirement <span className="text-red-400">*</span>
                      </label>
                      <select
                        value={requirement}
                        onChange={(e) => setRequirement(e.target.value)}
                        className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all cursor-pointer"
                      >
                        {REQUIREMENT_OPTIONS.map((opt) => (
                          <option key={opt} value={opt} className="bg-neutral-900 text-white">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                        Describe Your Requirement &amp; Business Goals
                      </label>
                      <textarea
                        rows={3}
                        value={requirementDetails}
                        onChange={(e) => setRequirementDetails(e.target.value)}
                        placeholder="Tell us what you are looking to build or achieve (e.g. 'I want a modern landing page for my clinic and automated WhatsApp replies to book consultations')..."
                        className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-xl text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all leading-relaxed"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 3: Additional Details */}
                <div className="border-b border-neutral-800/80 pb-6">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-4 flex items-center gap-2">
                    <Building className="w-3.5 h-3.5 text-cyan-400" />
                    <span>3. Additional Details (Optional)</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    {/* Email */}
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                        Work / Personal Email
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="rahul@example.com"
                        className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-xl text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-500 transition-all"
                      />
                    </div>

                    {/* City */}
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                        City / Location
                      </label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="e.g. Bangalore, Hyderabad, Mumbai"
                        className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-xl text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-500 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Business Name */}
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                        Business / Brand Name
                      </label>
                      <input
                        type="text"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder="e.g. Apex Consulting"
                        className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-xl text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-500 transition-all"
                      />
                    </div>

                    {/* Budget */}
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                        Estimated Budget
                      </label>
                      <select
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500 transition-all cursor-pointer"
                      >
                        {BUDGET_OPTIONS.map((opt) => (
                          <option key={opt} value={opt} className="bg-neutral-900 text-white">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Timeline */}
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                        Expected Timeline
                      </label>
                      <select
                        value={timeline}
                        onChange={(e) => setTimeline(e.target.value)}
                        className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500 transition-all cursor-pointer"
                      >
                        {TIMELINE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt} className="bg-neutral-900 text-white">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-black font-semibold text-xs font-mono uppercase tracking-wider hover:bg-neutral-200 transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xl disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Submitting...' : 'Submit Request'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppDirect}
                    className="w-full sm:w-auto px-6 py-4 rounded-xl bg-emerald-950/80 hover:bg-emerald-900/90 text-emerald-300 border border-emerald-800/80 font-semibold text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span>Submit via WhatsApp</span>
                  </button>
                </div>

                <div className="flex items-center gap-2 text-neutral-500 text-xs pt-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Your information is strictly confidential. Response guaranteed within 2 hours.</span>
                </div>
              </form>
            ) : (
              /* Success State */
              <div className="py-12 px-4 text-center max-w-md mx-auto space-y-5">
                <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <h3 className="text-2xl font-normal text-white">
                  Request Received Successfully!
                </h3>

                <p className="text-sm text-neutral-400 leading-relaxed font-light">
                  Thank you, <span className="text-white font-medium">{fullName}</span>. We have logged your request for <span className="text-cyan-400 font-medium">{requirement}</span>. Our growth team is reviewing your details and will get in touch via WhatsApp / Phone (<span className="text-white font-mono">{phone}</span>).
                </p>

                <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={handleWhatsAppDirect}
                    className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Chat Now on WhatsApp</span>
                  </button>

                  <button
                    onClick={handleReset}
                    className="px-6 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <span>Submit Another Request</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: GOOGLE FORM EMBED CONTAINER */}
        {activeTab === 'googleForm' && (
          <div className="bg-neutral-950 border border-neutral-800/90 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
              <div>
                <h3 className="text-lg font-normal text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  <span>Google Form Embed Container</span>
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Embed any live Google Form to collect submissions directly to your Google Sheets.
                </p>
              </div>

              {customGoogleFormUrl && (
                <a
                  href={customGoogleFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:underline"
                >
                  <span>Open in Google Forms</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            {/* URL Setter Input (allows testing or live configuration) */}
            <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2 text-left">
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400">
                Google Form Embed URL
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="url"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  placeholder="https://docs.google.com/forms/d/e/.../viewform?embedded=true"
                  className="flex-1 px-4 py-2.5 bg-black border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-500 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setCustomGoogleFormUrl(inputUrl)}
                  className="px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-xs font-mono uppercase tracking-wider hover:bg-neutral-200 transition-colors cursor-pointer"
                >
                  Load Form
                </button>
              </div>
              <p className="text-[11px] text-neutral-500">
                Tip: Paste the embed link from your Google Form (Click Send → Embed HTML `&lt;iframe src="..."&gt;`).
              </p>
            </div>

            {/* Embedded Iframe or Guidance Container */}
            {customGoogleFormUrl ? (
              <div className="w-full overflow-hidden rounded-2xl border border-neutral-800 bg-white/5 min-h-[680px]">
                <iframe
                  src={customGoogleFormUrl}
                  width="100%"
                  height="720"
                  frameBorder="0"
                  marginHeight={0}
                  marginWidth={0}
                  className="w-full rounded-2xl bg-white"
                  title="Google Form Intake"
                >
                  Loading Google Form…
                </iframe>
              </div>
            ) : (
              <div className="p-10 border border-dashed border-neutral-800 rounded-2xl text-center space-y-4">
                <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto text-cyan-400">
                  <Layers className="w-6 h-6" />
                </div>
                <h4 className="text-base font-normal text-white">
                  No Google Form URL Configured Yet
                </h4>
                <p className="text-xs text-neutral-400 max-w-md mx-auto leading-relaxed">
                  You can paste your Google Form link in the input box above, or configure <code className="text-cyan-400 bg-neutral-900 px-1.5 py-0.5 rounded">googleFormUrl</code> in <code className="text-neutral-300">siteConfig.ts</code> to embed it automatically.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('native')}
                    className="px-6 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-mono uppercase tracking-wider border border-neutral-800 transition-colors cursor-pointer"
                  >
                    ← Switch back to Interactive Web Form
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
