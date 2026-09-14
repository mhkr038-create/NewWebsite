'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  GraduationCap, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Users, 
  Calendar, 
  CreditCard, 
  MessageSquare, 
  FileSpreadsheet, 
  Bus, 
  BookOpen, 
  Clock, 
  Building2, 
  Phone, 
  MapPin, 
  Mail, 
  Send, 
  Award,
  Zap,
  Flame,
  ChevronDown,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { adminStore } from '../services/adminStore';
import { SITE_CONFIG } from '../config/siteConfig';

const STUDENT_COUNT_OPTIONS = [
  'Under 250 Students',
  '250 – 500 Students',
  '500 – 1,000 Students',
  '1,000 – 2,500 Students',
  '2,500+ Students (Multi-Branch)',
];

const BOARD_OPTIONS = [
  'CBSE Affiliated',
  'ICSE / ISC Board',
  'State Board',
  'IB / Cambridge International',
  'Pre-School / Kindergarten',
  'College / Degree Institute',
  'Other / Independent Academy',
];

const CURRENT_SYSTEM_OPTIONS = [
  'Manual Paper Registers & Logbooks',
  'Excel / Google Spreadsheets',
  'Old Desktop Software (Tally/Offline ERP)',
  'None / New Institution Starting Up',
];

const MODULE_OPTIONS = [
  'Student Admission & ID Cards',
  'Digital Fee Collection & Auto-Receipts',
  'Daily Attendance App (Web & Mobile)',
  'WhatsApp & SMS Parent Notifications',
  'Exams, Grading & Report Cards',
  'Timetable & Period Substitution',
  'School Bus & Transport Tracking',
  'Library & Book Management',
];

export const FreeSchoolSoftwareView: React.FC = () => {
  // Form State
  const [schoolName, setSchoolName] = useState('');
  const [studentCount, setStudentCount] = useState(STUDENT_COUNT_OPTIONS[1]);
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [principalName, setPrincipalName] = useState('');
  const [schoolEmail, setSchoolEmail] = useState('');
  const [board, setBoard] = useState(BOARD_OPTIONS[0]);
  const [currentSystem, setCurrentSystem] = useState(CURRENT_SYSTEM_OPTIONS[0]);
  const [selectedModules, setSelectedModules] = useState<string[]>([
    'Student Admission & ID Cards',
    'Digital Fee Collection & Auto-Receipts',
    'Daily Attendance App (Web & Mobile)',
    'WhatsApp & SMS Parent Notifications',
  ]);
  const [otherNotes, setOtherNotes] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedId, setSubmittedId] = useState('');

  const toggleModule = (mod: string) => {
    if (selectedModules.includes(mod)) {
      setSelectedModules(selectedModules.filter(m => m !== mod));
    } else {
      setSelectedModules([...selectedModules, mod]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!schoolName || !phone || !address) return;

    setIsSubmitting(true);

    const compiledOtherInfo = [
      `Principal / Contact: ${principalName || 'Not specified'}`,
      `Affiliation: ${board}`,
      `Current System: ${currentSystem}`,
      `Key Modules Required: ${selectedModules.join(', ')}`,
      otherNotes ? `Specific Requirements: ${otherNotes}` : '',
    ].filter(Boolean).join(' | ');

    try {
      const newInquiry = adminStore.addInquiry({
        name: principalName || `${schoolName} (Representative)`,
        email: schoolEmail || 'school.enquiry@digital.local',
        phone,
        serviceOrDemo: 'Free School Management Software',
        source: 'School Software Enquiry',
        budget: '₹30,000 Value (Free Offer)',
        schoolName,
        studentCount,
        address,
        boardOrAffiliation: board,
        otherSchoolInfo: compiledOtherInfo,
        message: `School Software Enquiry for ${schoolName} (${studentCount}). Address: ${address}. Current system: ${currentSystem}. Modules needed: ${selectedModules.join(', ')}. Additional Notes: ${otherNotes || 'None'}`,
        estimatedValue: 30000,
      });

      setSubmittedId(newInquiry.id);
      setIsSubmitted(true);

      // Trigger Celebration Confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'],
        });
      } catch {
        // fallback if canvas not loaded
      }
    } catch (err) {
      console.error('Submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const erpModules = [
    {
      title: 'Student & Staff Master ERP',
      desc: 'Centralized bio-data, dynamic roll numbers, document uploads, and automated student ID cards generation.',
      icon: Users,
      badge: 'Core ERP',
    },
    {
      title: 'Digital Fees & Automated Receipts',
      desc: 'Create fee categories, generate printable invoices, calculate pending dues, and track payment transactions.',
      icon: CreditCard,
      badge: 'Zero Commissions',
    },
    {
      title: 'Daily Attendance (Web & App)',
      desc: 'Instant 1-tap roll call for teachers. Automatically flag chronic absentees and generate monthly attendance logs.',
      icon: Clock,
      badge: 'Instant Sync',
    },
    {
      title: 'WhatsApp & SMS Parent Alerts',
      desc: 'Broadcast emergency notices, holiday declarations, fee overdue alerts, and exam marks directly to parents via WhatsApp.',
      icon: MessageSquare,
      badge: 'High Engagement',
    },
    {
      title: 'Exams, Marks & Report Cards',
      desc: 'Customizable grading rubrics compliant with CBSE, ICSE, and State Boards. Export beautifully formatted PDF report cards.',
      icon: Award,
      badge: 'CBSE / ICSE Ready',
    },
    {
      title: 'Timetable & Class Schedules',
      desc: 'Effortless automated schedule generator with instant teacher substitution alerts to keep class periods uninterrupted.',
      icon: Calendar,
      badge: 'Smart Allocation',
    },
    {
      title: 'Transport & Bus Tracking',
      desc: 'Manage school bus routes, driver emergency contacts, vehicle allocation, and student pick-up points.',
      icon: Bus,
      badge: 'Safety First',
    },
    {
      title: 'Library Book Circulation',
      desc: 'Barcode-enabled cataloging, issue and return logs, late fine tracking, and real-time book availability search.',
      icon: BookOpen,
      badge: 'Organized',
    },
  ];

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Is the Free School Management Software really 100% free?',
      a: 'Yes. The complete core ERP software license (valued at ₹30,000) is provided at ₹0 software fee for the first 25 registered educational institutions with zero recurring per-student software charges.',
    },
    {
      q: 'What education boards are supported by the software?',
      a: 'It fully supports CBSE Affiliated schools, ICSE / ISC Boards, State Education Boards, IB / Cambridge International curricula, pre-schools, coaching academies, and degree colleges with customizable rubrics.',
    },
    {
      q: 'Can we import our existing student data from Excel or spreadsheets?',
      a: 'Yes! Our onboarding team provides an easy 1-click Excel/CSV import template to bulk upload all your student bios, class sections, parent contact numbers, and past fee dues in minutes without manual re-typing.',
    },
    {
      q: 'How does the automated WhatsApp notification system work?',
      a: 'The ERP connects directly with the WhatsApp Business Cloud API to send automated fee payment receipts, absentee alerts, homework updates, and emergency holiday broadcasts directly to parents.',
    },
    {
      q: 'How long does complete school setup and onboarding take?',
      a: 'Onboarding takes 24 to 48 hours. Once you submit the enquiry form, our engineering team provisions your cloud database, sets up your administrative logins, and conducts a live staff walkthrough.',
    },
    {
      q: 'Is our student bio-data and fee collection secure?',
      a: 'Absolutely. Your school database is secured with enterprise 256-bit SSL encryption, automated daily offsite cloud backups, and granular role-based permissions for accountants, teachers, and admins.',
    },
  ];

  return (
    <div className="w-full bg-[#050711] text-slate-100 font-sans min-h-screen selection:bg-amber-500 selection:text-slate-950">
      
      {/* Top Value Spotlight Bar */}
      <section className="pt-32 pb-12 sm:pt-36 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden">
        {/* Glow Blobs */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center max-w-3xl mx-auto space-y-6 relative z-10">
          
          {/* Main Free Badge with Blinking Flash, Limited Period & Limited Numbers */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 bg-red-600 text-white px-3 py-1 rounded-full text-[11px] font-mono font-extrabold uppercase tracking-wider animate-blink-flash shadow-lg shadow-red-500/30">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-200 opacity-90" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-300" />
              </span>
              <span>⚡ FLASH OFFER</span>
            </span>

            <span className="inline-flex items-center gap-1.5 bg-amber-950/90 text-amber-200 border border-amber-500/50 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider shadow-md">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>⏳ LIMITED PERIOD OFFER</span>
            </span>

            <span className="inline-flex items-center gap-1.5 bg-red-950/90 text-red-200 border border-red-800/80 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider shadow-md">
              <Flame className="w-3.5 h-3.5 text-red-400" />
              <span>🔥 LIMITED NUMBERS: FIRST 25 SCHOOLS ONLY</span>
            </span>

            <span className="inline-flex items-center gap-1.5 text-amber-300 bg-slate-900/90 border border-slate-700 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>WORTH ₹30,000 — 100% FREE SETUP</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15] font-heading">
            Free School Management Software <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-500">
              Modern ERP for Educational Institutions
            </span>
          </h1>

          <p className="text-sm sm:text-lg text-slate-300 leading-relaxed font-light max-w-2xl mx-auto">
            Say goodbye to clumsy paper registers, lost fee receipts, and uncoordinated parent messages. Get our complete, cloud-hosted School ERP (valued at <strong className="text-amber-300 font-semibold">₹30,000</strong>) with <strong className="text-emerald-400 font-semibold">zero software license fee</strong>.
          </p>

          {/* Live Scarcity & Capacity Tracker */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-red-950/30 to-slate-900 border border-amber-500/40 shadow-xl max-w-2xl mx-auto text-left space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                  Limited Numbers Allocation Status:
                </span>
              </div>
              <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-950/80 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                7 Free Onboarding Slots Remaining
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono text-slate-300">
                <span>Institutions Enrolled: <strong className="text-amber-300">18 / 25 Schools</strong></span>
                <span className="text-red-400 font-bold">72% Claimed</span>
              </div>
              <div className="w-full bg-slate-800/90 h-3 rounded-full overflow-hidden p-0.5 border border-slate-700">
                <div className="bg-gradient-to-r from-amber-500 via-yellow-400 to-red-500 h-full rounded-full w-[72%] transition-all duration-1000 shadow-sm shadow-amber-400/50" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px] text-slate-400">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span><strong>Limited Period:</strong> Window closes once 25 slots are allocated.</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-red-400 shrink-0" />
                <span><strong>Limited Numbers:</strong> 1 free instance per verified institution.</span>
              </div>
            </div>
          </div>

          {/* Quick Value Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 max-w-2xl mx-auto">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-xl sm:text-2xl font-bold font-mono text-emerald-400">₹0 Fee</span>
              <p className="text-[11px] text-slate-400 mt-0.5">Worth ₹30,000</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-xl sm:text-2xl font-bold font-mono text-amber-400">Unlimited</span>
              <p className="text-[11px] text-slate-400 mt-0.5">Students & Staff</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-xl sm:text-2xl font-bold font-mono text-cyan-400">WhatsApp</span>
              <p className="text-[11px] text-slate-400 mt-0.5">Parent Alerts</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-xl sm:text-2xl font-bold font-mono text-purple-400">48 Hours</span>
              <p className="text-[11px] text-slate-400 mt-0.5">Live Activation</p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href="#enquiry-form"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold text-sm uppercase tracking-wider shadow-xl shadow-amber-500/25 transition-all hover:scale-105 flex items-center gap-2 cursor-pointer"
            >
              <span>Claim Free Software & Submit Enquiry</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href={`https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
                'Hi Digital Simple Solution, I would like to inquire about the Free School Management Software (Worth ₹30,000) for our school.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 text-sm font-semibold flex items-center gap-2 transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Inquire via WhatsApp</span>
            </a>
          </div>

          {/* Centerpiece Showcase Image */}
          <div className="pt-8 max-w-4xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden border-2 border-amber-500/40 shadow-2xl shadow-amber-500/20 bg-slate-950 group">
              <img
                src="/images/free-school-management-software.jpg"
                alt="Free School Management Software - Complete Solution for a Smarter School"
                className="w-full h-auto object-cover transform group-hover:scale-[1.01] transition-transform duration-500"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent p-4 sm:p-6 flex items-center justify-between pointer-events-none">
                <span className="text-xs font-mono text-amber-300 font-semibold bg-slate-950/90 px-3 py-1 rounded-full border border-amber-500/30">
                  ✨ Real-time Student, Teacher & Fee Dashboard
                </span>
                <span className="text-[11px] font-mono text-emerald-400 font-bold bg-slate-950/90 px-3 py-1 rounded-full border border-emerald-500/30">
                  Worth ₹30,000 • 100% Free Core ERP
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Modules Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-mono uppercase text-amber-400 tracking-widest font-semibold">
            All-In-One Institution Infrastructure
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-white font-heading">
            8 Powerful ERP Modules Built Into Your Free School Portal
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Engineered for CBSE, ICSE, State Boards, and private educational institutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {erpModules.map((mod, idx) => {
            const IconComp = mod.icon;
            return (
              <div
                key={idx}
                className="bg-[#0b1022] border border-slate-800 hover:border-amber-500/40 rounded-2xl p-6 transition-all hover:shadow-xl hover:shadow-amber-950/20 group text-left space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    {mod.badge}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors font-heading">
                  {mod.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {mod.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Value Comparison Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="p-8 rounded-3xl bg-gradient-to-b from-[#0e1630] to-[#080d1d] border border-amber-500/30 shadow-2xl relative overflow-hidden">
          <div className="text-center space-y-2 mb-8">
            <span className="text-xs font-mono uppercase text-amber-400 tracking-wider font-semibold">
              Transparent Institutional Economics
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading">
              Why Are We Offering a ₹30,000 Software for Free?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
              We empower schools with modern digital systems. We provide the complete core software free of cost so your school saves capital for classrooms, computers, and student development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-left">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-red-500/20 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="font-bold text-red-400 uppercase tracking-wider font-mono">Traditional Software Vendors</span>
                <span className="text-red-400 font-mono font-bold">₹30,000 – ₹60,000/yr</span>
              </div>
              <ul className="space-y-2 text-slate-400">
                <li className="flex items-center gap-2">
                  <span className="text-red-400">✕</span> Annual recurring per-student software licenses
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-400">✕</span> Heavy upfront server installation charges
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-400">✕</span> Outdated, slow desktop interfaces that freeze
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-400">✕</span> Unresponsive support when admissions are live
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-950/30 to-slate-950 border border-amber-500/40 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-amber-500/20">
                <span className="font-bold text-amber-300 uppercase tracking-wider font-mono">Digital Simple Solution ERP</span>
                <span className="text-emerald-400 font-mono font-bold">₹0 (100% Free)</span>
              </div>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Full core ERP software worth ₹30,000 for ₹0
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Modern cloud interface accessible on mobile & PC
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Fast 48-hour onboarding with staff training
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Dedicated priority WhatsApp support team
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions (FAQ) Section - High SEO Impact */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-slate-800/80">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <span className="text-xs font-mono uppercase text-amber-400 tracking-widest font-semibold flex items-center justify-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span>Got Questions? We Have Answers</span>
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-white font-heading">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Everything you need to know about our Free ₹30,000 School ERP license, modules, data security, and setup.
          </p>
        </div>

        <div className="space-y-3 text-left">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-slate-900/90 border-amber-500/50 shadow-lg shadow-amber-950/20'
                    : 'bg-[#0b1022] border-slate-800 hover:border-slate-700'
                }`}
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-semibold text-white font-heading">
                    {faq.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? 'bg-amber-400 text-slate-950 rotate-180'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 mt-1">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive School Enquiry Form Section */}
      <section id="enquiry-form" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="bg-[#0b1022] border border-amber-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl relative text-left">
          
          <div className="border-b border-slate-800 pb-6 mb-8">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold flex items-center gap-1.5">
                <Building2 className="w-4 h-4" />
                School Registration & Setup Request
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono border border-emerald-500/30 font-semibold">
                Worth ₹30,000 • 100% Free
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading">
              Submit School Software Enquiry
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Provide your school information below. Our education technical team will review your requirements, prepare your demo database, and contact you within 24 hours.
            </p>

            {/* Urgency & Capacity Callout Banner */}
            <div className="mt-5 p-4 rounded-2xl bg-gradient-to-r from-red-950/60 via-amber-950/40 to-slate-900 border border-red-500/40 flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-xl bg-red-600/20 text-red-400 border border-red-500/40 shrink-0">
                  <Flame className="w-5 h-5 text-red-400 animate-pulse" />
                </span>
                <div>
                  <p className="text-xs font-bold text-white flex items-center gap-2 flex-wrap">
                    <span>⚡ Limited Period & Limited Numbers Offer</span>
                    <span className="px-2 py-0.5 bg-red-600 text-white text-[9px] font-extrabold rounded-full font-mono uppercase tracking-wider animate-blink-flash">
                      7 SLOTS REMAINING
                    </span>
                  </p>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    Free cloud setup & license (Worth ₹30,000) is strictly capped at the <strong>first 25 educational institutions</strong>. Lock in your institute's allocation now before enrollment closes.
                  </p>
                </div>
              </div>
              <div className="text-right font-mono shrink-0">
                <span className="text-xs text-amber-300 font-bold">18 / 25 Claimed</span>
                <div className="w-28 bg-slate-800 h-2 rounded-full overflow-hidden mt-1 border border-slate-700">
                  <div className="bg-gradient-to-r from-amber-500 to-red-500 h-full w-[72%]" />
                </div>
              </div>
            </div>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Row 1: School Name & Student Count */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-5">
                <div className="sm:col-span-7">
                  <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                    School Name <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      value={schoolName}
                      onChange={(e) => setSchoolName(e.target.value)}
                      placeholder="e.g. St. Xavier's International Academy"
                      className="w-full pl-10 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                </div>

                <div className="sm:col-span-5">
                  <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                    How Many Students? <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <Users className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <select
                      value={studentCount}
                      onChange={(e) => setStudentCount(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 transition-colors"
                    >
                      {STUDENT_COUNT_OPTIONS.map((opt, i) => (
                        <option key={i} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Row 2: Phone & Address */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-5">
                <div className="sm:col-span-5">
                  <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                    Phone / WhatsApp Number <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full pl-10 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">We will send confirmation & login details via WhatsApp.</p>
                </div>

                <div className="sm:col-span-7">
                  <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                    School Address (City, State, PIN) <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g. 14 Sector Road, Near Civil Lines, Jaipur, Rajasthan - 302001"
                      className="w-full pl-10 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Row 3: Principal Name & School Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2 border-t border-slate-800/80">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Principal / Contact Person Name
                  </label>
                  <input
                    type="text"
                    value={principalName}
                    onChange={(e) => setPrincipalName(e.target.value)}
                    placeholder="e.g. Dr. Rajeshwari Sharma (Principal)"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    School Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      value={schoolEmail}
                      onChange={(e) => setSchoolEmail(e.target.value)}
                      placeholder="e.g. principal@schoolname.edu.in"
                      className="w-full pl-10 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Row 4: Board & Current System */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Affiliation / Board
                  </label>
                  <select
                    value={board}
                    onChange={(e) => setBoard(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 transition-colors"
                  >
                    {BOARD_OPTIONS.map((opt, i) => (
                      <option key={i} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Current Management Method
                  </label>
                  <select
                    value={currentSystem}
                    onChange={(e) => setCurrentSystem(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 transition-colors"
                  >
                    {CURRENT_SYSTEM_OPTIONS.map((opt, i) => (
                      <option key={i} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 5: Modules Checklist */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Select Modules Needed for Your Institution
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {MODULE_OPTIONS.map((mod, i) => {
                    const isChecked = selectedModules.includes(mod);
                    return (
                      <button
                        type="button"
                        key={i}
                        onClick={() => toggleModule(mod)}
                        className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                          isChecked
                            ? 'bg-amber-950/40 border-amber-500/50 text-amber-200'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center text-[10px] font-bold ${
                            isChecked
                              ? 'bg-amber-400 text-slate-950'
                              : 'border border-slate-600'
                          }`}
                        >
                          {isChecked && '✓'}
                        </div>
                        <span className="text-xs font-medium">{mod}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 6: Other School Related Information */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Other School Related Information & Special Requirements
                </label>
                <textarea
                  rows={3}
                  value={otherNotes}
                  onChange={(e) => setOtherNotes(e.target.value)}
                  placeholder="e.g. We have 2 branches, need separate accountant logins, and want SMS templates approved for emergency weather holidays."
                  className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors leading-relaxed"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold text-sm uppercase tracking-widest shadow-xl shadow-amber-500/25 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {isSubmitting
                      ? 'Submitting School Enquiry...'
                      : 'Submit School Enquiry (Claim ₹30,000 Free Software)'}
                  </span>
                </button>
                <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500 mt-3 font-mono">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    100% Free Core Software
                  </span>
                  <span>•</span>
                  <span>Zero Credit Card Required</span>
                  <span>•</span>
                  <span>Direct WhatsApp Assistance</span>
                </div>
              </div>

            </form>
          ) : (
            /* Submission Success State */
            <div className="text-center py-10 space-y-6 animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold">
                  School Enquiry Registered Successfully
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading">
                  Thank You, {principalName || schoolName}!
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  Your Free School Management Software setup request has been routed directly to our education onboarding engineers.
                </p>
              </div>

              {/* Confirmation Details Card */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-left max-w-md mx-auto space-y-2 text-xs font-mono">
                <div className="flex justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-slate-500">Enquiry Ref:</span>
                  <span className="text-amber-400 font-bold">{submittedId}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 py-1.5">
                  <span className="text-slate-500">School:</span>
                  <span className="text-white truncate max-w-[200px]">{schoolName}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 py-1.5">
                  <span className="text-slate-500">Capacity:</span>
                  <span className="text-cyan-300">{studentCount}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 py-1.5">
                  <span className="text-slate-500">Software Value:</span>
                  <span className="text-emerald-400 font-bold">₹30,000 (100% Free)</span>
                </div>
                <div className="flex justify-between pt-1.5">
                  <span className="text-slate-500">Contact:</span>
                  <span className="text-slate-300">{phone}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={`https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
                    `Hello! I just submitted the Free School Management Software enquiry for "${schoolName}" (Ref: ${submittedId}). Could you please share the demo portal link?`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Instant WhatsApp Activation</span>
                </a>

                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setSchoolName('');
                    setPhone('');
                    setAddress('');
                    setOtherNotes('');
                  }}
                  className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-medium border border-slate-800"
                >
                  Submit Another School
                </button>
              </div>

            </div>
          )}

        </div>
      </section>

      {/* Internal Backlinks & Cross-Indexation Hub for Googlebot */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-900 text-left">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <span className="text-xs font-mono uppercase text-cyan-400 tracking-wider font-semibold">
            Comprehensive Growth Infrastructure
          </span>
          <h3 className="text-xl sm:text-3xl font-bold text-white font-heading">
            Related Educational Systems & Growth Solutions
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            Explore our connected ecosystem of admission marketing, parent automations, and live institution demos.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            href="/demo/education-academy"
            className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 hover:border-cyan-500/40 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-cyan-400 uppercase bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/30">
                  Live Demo
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
              </div>
              <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                Education Academy Website Demo
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Interactive preview of our high-speed Next.js academy portal with course catalogs and student inquiry capture.
              </p>
            </div>
            <span className="text-[11px] text-cyan-400 font-semibold mt-3 inline-block">Launch Demo Portal →</span>
          </Link>

          <Link
            href="/solutions/education"
            className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 hover:border-indigo-500/40 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-indigo-400 uppercase bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-800/30">
                  Industry Solution
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
              </div>
              <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                Education Industry Growth Suite
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Complete student acquisition systems for CBSE schools, coaching institutes, and colleges in India.
              </p>
            </div>
            <span className="text-[11px] text-indigo-400 font-semibold mt-3 inline-block">Explore Solutions →</span>
          </Link>

          <Link
            href="/whatsapp-automation"
            className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 hover:border-emerald-500/40 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-emerald-400 uppercase bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                  Automation
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
              </div>
              <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                WhatsApp Parent Communication API
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Automated 24/7 inquiry response, fee receipts, and broadcast notices directly to parents' WhatsApp.
              </p>
            </div>
            <span className="text-[11px] text-emerald-400 font-semibold mt-3 inline-block">Discover Workflows →</span>
          </Link>

          <Link
            href="/landing-pages"
            className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 hover:border-amber-500/40 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-amber-400 uppercase bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/30">
                  Admissions
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
              </div>
              <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                High-Converting School Landing Pages
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Designed to maximize student admission inquiries from Meta Ads, Google Ads, and organic search.
              </p>
            </div>
            <span className="text-[11px] text-amber-400 font-semibold mt-3 inline-block">View Landing Page Suite →</span>
          </Link>

          <Link
            href="/blog/how-whatsapp-automation-improves-lead-follow-up"
            className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 hover:border-purple-500/40 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-purple-400 uppercase bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/30">
                  Case Study
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
              </div>
              <h4 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                Instant Inquiry Response & Parent Conversion
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Why sub-60-second WhatsApp responses increase parent enrollment conversions by up to 300%.
              </p>
            </div>
            <span className="text-[11px] text-purple-400 font-semibold mt-3 inline-block">Read Article →</span>
          </Link>

          <Link
            href="/schedule-meeting"
            className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950/40 to-slate-950 border border-indigo-500/30 hover:border-cyan-400/50 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-cyan-300 uppercase bg-indigo-900/60 px-2 py-0.5 rounded border border-indigo-700/40">
                  Consultation
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
              </div>
              <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                Book Digital Strategy Session
              </h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Meet with our engineering team to plan your institute's digital modernization roadmap.
              </p>
            </div>
            <span className="text-[11px] text-cyan-400 font-semibold mt-3 inline-block">Schedule 1-on-1 Call →</span>
          </Link>
        </div>
      </section>

    </div>
  );
};
