'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calendar, Clock, CheckCircle2, User, Mail, Phone, Building, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { adminStore } from '../../services/adminStore';

const TIME_SLOTS = [
  '09:00 AM - 09:30 AM',
  '10:00 AM - 10:30 AM',
  '11:30 AM - 12:00 PM',
  '02:00 PM - 02:30 PM',
  '03:30 PM - 04:00 PM',
  '05:00 PM - 05:30 PM',
];

const SERVICES_LIST = [
  'AI Services & Custom AI Agents',
  'AI Automation & Workflow Pipelines',
  'Digital Marketing & Lead Generation',
  'Website & Conversion Funnel Development',
  'Content Automation Engine',
  'Comprehensive Digital Strategy & Consulting',
];

interface MeetingFormProps {
  onScheduled?: () => void;
  className?: string;
}

export const MeetingForm: React.FC<MeetingFormProps> = ({ onScheduled, className = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    serviceInterestedIn: SERVICES_LIST[0],
    preferredDate: '',
    preferredTime: TIME_SLOTS[1],
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  // Set default min date to tomorrow
  const today = new Date();
  today.setDate(today.getDate() + 1);
  const minDate = today.toISOString().split('T')[0];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Save to admin store
    adminStore.addAppointment({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      businessName: formData.businessName,
      serviceInterestedIn: formData.serviceInterestedIn,
      preferredDate: formData.preferredDate,
      preferredTime: formData.preferredTime,
      message: formData.message,
      source: 'Website Meeting Scheduler',
    });

    // Simulate calendar appointment reservation
    setTimeout(() => {
      setIsSubmitting(false);
      setIsBooked(true);
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
        });
      } catch (err) {
        console.error(err);
      }
      if (onScheduled) onScheduled();
    }, 700);
  };


  if (isBooked) {
    return (
      <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/95 border border-indigo-500/40 text-center space-y-6 shadow-2xl backdrop-blur-2xl animate-in zoom-in-95 duration-300">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-indigo-600 to-cyan-400 p-[2px] mx-auto shadow-xl shadow-indigo-500/20">
          <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-cyan-400" />
          </div>
        </div>

        <div className="space-y-3">
          <span className="px-3 py-1 rounded-full text-xs font-mono uppercase bg-indigo-950 text-indigo-300 border border-indigo-800/40">
            Consultation Confirmed
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
            Meeting Reserved for {formData.name}!
          </h3>
          <p className="text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
            We have locked in your 30-minute strategic consultation on <strong className="text-cyan-400">{formData.preferredDate || 'your selected date'}</strong> at <strong className="text-cyan-400">{formData.preferredTime}</strong>.
          </p>
        </div>

        {/* Meeting Details Card */}
        <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 text-left max-w-md mx-auto space-y-2 text-xs text-slate-300">
          <div className="flex justify-between py-1 border-b border-slate-900">
            <span className="text-slate-500">Service:</span>
            <span className="font-semibold text-white">{formData.serviceInterestedIn}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-900">
            <span className="text-slate-500">Company:</span>
            <span className="font-semibold text-white">{formData.businessName || 'Direct Founder'}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-slate-500">Calendar Invite:</span>
            <span className="font-semibold text-indigo-400">Sent to {formData.email}</span>
          </div>
        </div>

        <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => {
              setIsBooked(false);
              setFormData({
                name: '',
                email: '',
                phone: '',
                businessName: '',
                serviceInterestedIn: SERVICES_LIST[0],
                preferredDate: '',
                preferredTime: TIME_SLOTS[1],
                message: '',
              });
            }}
            className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold border border-slate-700 transition-colors"
          >
            Book Another Slot
          </button>
          <Link
            href="/#services"
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-600/30 transition-colors flex items-center gap-2"
          >
            <span>Explore Services in the Meantime</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-2xl ${className}`}>
      
      {/* Header Info inside form card */}
      <div className="text-left pb-6 mb-6 border-b border-slate-800/80">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-800/40 text-indigo-300 text-xs font-medium mb-3">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>30-Minute Free Strategy Consultation</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
          Let's Talk About Your Business
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 mt-1.5 leading-relaxed">
          Schedule a consultation to discuss your business goals and discover how AI, automation, and digital marketing can help.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        {/* Name & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-indigo-400" />
              <span>Your Name *</span>
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Maya Chen"
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <span>Work Email *</span>
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="maya@company.com"
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>
        </div>

        {/* Phone & Business Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>Phone Number *</span>
            </label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (555) 234-5678"
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-amber-400" />
              <span>Business / Brand Name *</span>
            </label>
            <input
              type="text"
              name="businessName"
              required
              value={formData.businessName}
              onChange={handleChange}
              placeholder="e.g. Solaria Growth Labs"
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>
        </div>

        {/* Service Interested In */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Service Interested In *
          </label>
          <select
            name="serviceInterestedIn"
            value={formData.serviceInterestedIn}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          >
            {SERVICES_LIST.map((srv) => (
              <option key={srv} value={srv}>
                {srv}
              </option>
            ))}
          </select>
        </div>

        {/* Date and Time Pickers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-indigo-400" />
              <span>Preferred Date *</span>
            </label>
            <input
              type="date"
              name="preferredDate"
              required
              min={minDate}
              value={formData.preferredDate}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all [color-scheme:dark]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>Preferred Time Slot *</span>
            </label>
            <select
              name="preferredTime"
              value={formData.preferredTime}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            >
              {TIME_SLOTS.map((slot) => (
                <option key={slot} value={slot}>
                  {slot} (Your Timezone)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Brief Overview of What You'd Like to Discuss
          </label>
          <textarea
            rows={3}
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="e.g. We are looking to automate lead intake, launch a new high-converting web platform, and test AI customer support..."
            className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Reserving Consultation Slot...</span>
              </span>
            ) : (
              <>
                <Calendar className="w-4 h-4 text-cyan-200" />
                <span>Schedule My Meeting</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {/* Guarantee & Alternative CTA */}
        <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-1.5 text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>100% Free • No Obligation • Instant Calendar Sync</span>
          </div>
          <div>
            <Link
              href="/contact"
              className="text-cyan-400 hover:text-cyan-300 font-semibold underline underline-offset-2 transition-colors"
            >
              Prefer email? Send us a message.
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};
