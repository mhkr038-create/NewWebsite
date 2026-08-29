'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Sparkles, Mail, Phone } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SITE_CONFIG } from '../../config/siteConfig';
import { adminStore } from '../../services/adminStore';

const SERVICE_OPTIONS = [
  'AI Automation',
  'AI Chatbot',
  'AI Consulting',
  'Digital Marketing',
  'Lead Generation',
  'Website Development',
  'Business Automation',
  'Other',
];

interface ContactFormProps {
  initialService?: string;
  onSuccess?: () => void;
  className?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ initialService, onSuccess, className = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    serviceRequired: initialService || 'AI Automation',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in all required fields (Name, Email, and Message).');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    // Save to admin store
    adminStore.addInquiry({
      name: formData.name,
      email: formData.email,
      phone: formData.phone || 'Not Provided',
      serviceOrDemo: formData.serviceRequired,
      message: `${formData.businessName ? `[Company: ${formData.businessName}] ` : ''}${formData.message}`,
      source: 'Contact Form',
    });

    // Simulate secure transmission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      try {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (err) {
        console.error(err);
      }
      if (onSuccess) onSuccess();
    }, 700);
  };


  if (isSubmitted) {
    return (
      <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/90 border border-indigo-500/30 text-center space-y-5 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-300">
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40 shadow-lg shadow-emerald-500/10">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-white font-heading">
            Message Successfully Received!
          </h3>
          <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
            Thank you, <strong className="text-white">{formData.name}</strong>. Our senior solutions architect has received your inquiry regarding <span className="text-cyan-400 font-semibold">{formData.serviceRequired}</span> and will respond to <strong className="text-indigo-400">{formData.email}</strong> in under 2 hours.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
                name: '',
                email: '',
                phone: '',
                businessName: '',
                serviceRequired: 'AI Automation',
                message: '',
              });
            }}
            className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold border border-slate-700 transition-colors"
          >
            Send Another Message
          </button>
          <a
            href={`mailto:${SITE_CONFIG.contact.email}`}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-600/30 transition-colors flex items-center gap-2"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Direct Email Support</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 text-left ${className}`}>
      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Your Name <span className="text-rose-400">*</span>
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Alex Rivera"
            className="w-full px-4 py-2.5 bg-slate-950/90 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Work Email <span className="text-rose-400">*</span>
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="alex@company.com"
            className="w-full px-4 py-2.5 bg-slate-950/90 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Phone / WhatsApp Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1 (555) 000-0000"
            className="w-full px-4 py-2.5 bg-slate-950/90 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Business / Brand Name
          </label>
          <input
            type="text"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            placeholder="e.g. Apex Global Solutions"
            className="w-full px-4 py-2.5 bg-slate-950/90 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
          Service Required <span className="text-rose-400">*</span>
        </label>
        <select
          name="serviceRequired"
          value={formData.serviceRequired}
          onChange={handleChange}
          className="w-full px-4 py-2.5 bg-slate-950/90 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
        >
          {SERVICE_OPTIONS.map((srv) => (
            <option key={srv} value={srv}>
              {srv}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
          Message & Project Details <span className="text-rose-400">*</span>
        </label>
        <textarea
          rows={4}
          name="message"
          required
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about your current challenges, timeline, and how you'd like AI, automation, or marketing to help..."
          className="w-full px-4 py-2.5 bg-slate-950/90 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Transmitting Inquiry...</span>
            </span>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </>
          )}
        </button>
      </div>

      <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          Guaranteed SLA: Under 2 Hours
        </span>
        <div className="flex items-center gap-4">
          <a
            href={`mailto:${SITE_CONFIG.contact.email}`}
            className="hover:text-cyan-400 transition-colors flex items-center gap-1"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email Us</span>
          </a>
          <a
            href={`tel:${SITE_CONFIG.contact.phone}`}
            className="hover:text-indigo-400 transition-colors flex items-center gap-1"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call Us</span>
          </a>
        </div>
      </div>
    </form>
  );
};
