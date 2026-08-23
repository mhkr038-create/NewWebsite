import React, { useState } from 'react';
import { 
  HeartPulse, 
  Calendar, 
  Clock, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Award, 
  Users, 
  Stethoscope, 
  Star, 
  CheckCircle2, 
  ArrowRight, 
  ChevronRight, 
  Video, 
  Activity, 
  X 
} from 'lucide-react';
import { DemoFrameWrapper } from '../DemoFrameWrapper';
import { DEMO_REGISTRY } from '../../data/demos';

const demoData = DEMO_REGISTRY.find(d => d.id === 'health-clinic')!;

export const HealthClinicDemo: React.FC = () => {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<string>('Dr. Sarah Jenkins');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [selectedDept, setSelectedDept] = useState('all');

  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formDate, setFormDate] = useState('2026-08-28');
  const [formTime, setFormTime] = useState('10:00 AM');

  const doctors = [
    {
      name: 'Dr. Sarah Jenkins, MD',
      role: 'Chief of Cardiology',
      dept: 'cardiology',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80',
      experience: '16+ Years Experience',
      education: 'Harvard Medical School',
      rating: 4.9,
      reviews: 142,
    },
    {
      name: 'Dr. Michael Chen, MD',
      role: 'Head of Family Medicine',
      dept: 'primary',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
      experience: '12+ Years Experience',
      education: 'Johns Hopkins Medicine',
      rating: 5.0,
      reviews: 98,
    },
    {
      name: 'Dr. Amanda Brooks, MD',
      role: 'Lead Pediatric Specialist',
      dept: 'pediatrics',
      image: 'https://images.unsplash.com/photo-1594824813515-385a818c3924?auto=format&fit=crop&w=600&q=80',
      experience: '14+ Years Experience',
      education: 'Stanford University',
      rating: 4.9,
      reviews: 167,
    },
    {
      name: 'Dr. Robert Torres, PT, DPT',
      role: 'Director of Physical Therapy',
      dept: 'wellness',
      image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80',
      experience: '10+ Years Experience',
      education: 'Columbia University',
      rating: 4.8,
      reviews: 114,
    },
  ];

  const services = [
    {
      title: 'Comprehensive Primary Care',
      category: 'primary',
      desc: 'Preventative screenings, annual wellness checkups, and routine adult health management with compassionate physicians.',
      icon: Stethoscope,
      badge: 'Most Visited',
    },
    {
      title: 'Advanced Cardiology Suite',
      category: 'cardiology',
      desc: 'State-of-the-art non-invasive cardiac imaging, ECG, lipid profiling, and specialized hypertension therapy.',
      icon: HeartPulse,
      badge: 'Center of Excellence',
    },
    {
      title: 'Pediatric & Adolescent Health',
      category: 'pediatrics',
      desc: 'Gentle, friendly medical care from newborn milestones through teenage wellness and immunization programs.',
      icon: Activity,
      badge: 'Family Focused',
    },
    {
      title: 'Physical Therapy & Rehab',
      category: 'wellness',
      desc: 'Post-operative recovery, sports injury rehabilitation, ergonomic posture correction, and mobility restoration.',
      icon: Users,
      badge: 'Rapid Recovery',
    },
    {
      title: 'Telehealth Virtual Visits',
      category: 'wellness',
      desc: 'Secure HIPAA-compliant video consultations with your primary doctor from the comfort and privacy of your home.',
      icon: Video,
      badge: 'Same-Day Available',
    },
    {
      title: 'Diagnostic Lab & Imaging',
      category: 'primary',
      desc: 'Same-day blood chemistry results, high-resolution digital X-rays, ultrasound, and preventative allergy panels.',
      icon: Award,
      badge: 'Fast Results',
    },
  ];

  const filteredDoctors = selectedDept === 'all' 
    ? doctors 
    : doctors.filter(d => d.dept === selectedDept);

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingConfirmed(true);
  };

  return (
    <DemoFrameWrapper demo={demoData}>
      <div className="bg-slate-900 text-slate-100 font-sans min-h-screen">
        
        {/* Clinic Header */}
        <header className="bg-slate-950/90 border-b border-teal-900/40 sticky top-12 z-30 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 p-0.5 shadow-md shadow-teal-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <HeartPulse className="w-5 h-5 text-teal-400" />
                </div>
              </div>
              <div>
                <span className="font-bold text-lg text-white font-heading tracking-tight flex items-center gap-1.5">
                  Lumina<span className="text-teal-400">Health</span> Clinic
                </span>
                <span className="text-[10px] text-teal-300 block font-mono">Modern Medical & Wellness Center</span>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300 font-medium">
              <a href="#services" className="hover:text-teal-400 transition-colors">Medical Services</a>
              <a href="#doctors" className="hover:text-teal-400 transition-colors">Our Doctors</a>
              <a href="#why-us" className="hover:text-teal-400 transition-colors">Why Lumina</a>
              <a href="#testimonials" className="hover:text-teal-400 transition-colors">Patient Reviews</a>
            </nav>

            <div className="flex items-center gap-3">
              <a href="tel:+18005550199" className="hidden sm:flex items-center gap-1.5 text-xs text-teal-300 font-semibold bg-teal-950/60 px-3 py-1.5 rounded-lg border border-teal-800/50">
                <Phone className="w-3.5 h-3.5" />
                <span>(800) 555-0199</span>
              </a>
              <button
                onClick={() => {
                  setBookingConfirmed(false);
                  setBookingModalOpen(true);
                }}
                className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-teal-500/20 transition-all flex items-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Appointment</span>
              </button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative pt-16 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/80 border border-teal-700/50 text-teal-300 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                <span>Joint Commission Accredited • Board-Certified Care</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
                Patient-First Healthcare <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-300 to-cyan-300">
                  Designed for Your Peace of Mind.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
                Experience comprehensive, modern medical care with same-day appointments, world-class physicians, and integrated digital health records.
              </p>

              <div className="grid grid-cols-3 gap-4 pt-2 border-t border-slate-800">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-2xl font-bold text-teal-400 font-heading">99.4%</span>
                  <p className="text-xs text-slate-400 mt-0.5">Patient Satisfaction</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-2xl font-bold text-teal-400 font-heading">15 Min</span>
                  <p className="text-xs text-slate-400 mt-0.5">Max Wait Guarantee</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-2xl font-bold text-teal-400 font-heading">24/7</span>
                  <p className="text-xs text-slate-400 mt-0.5">Telehealth On-Call</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={() => {
                    setBookingConfirmed(false);
                    setBookingModalOpen(true);
                  }}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-400 hover:from-teal-400 hover:to-emerald-300 text-slate-950 font-bold text-sm shadow-xl shadow-teal-500/25 flex items-center gap-2 transition-all hover:scale-105"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Online in 45 Seconds</span>
                </button>
                <a
                  href="#services"
                  className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 flex items-center gap-2 transition-colors"
                >
                  <span>Explore Treatments</span>
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-slate-950/90 border border-teal-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-teal-950/50 backdrop-blur-xl relative">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div>
                    <h3 className="text-lg font-bold text-white font-heading">Instant Appointment</h3>
                    <p className="text-xs text-slate-400">Select specialist & instant confirmation</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/30 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Open Today
                  </span>
                </div>

                <form onSubmit={handleBookSubmit} className="mt-5 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Department / Service</label>
                    <select className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-teal-500">
                      <option>General Primary Care & Wellness</option>
                      <option>Cardiology & Vascular Health</option>
                      <option>Pediatrics & Family Medicine</option>
                      <option>Physical Therapy & Rehab</option>
                      <option>Telehealth Virtual Consultation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Select Physician</label>
                    <select 
                      value={selectedDoctor}
                      onChange={(e) => setSelectedDoctor(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-teal-500"
                    >
                      {doctors.map(d => (
                        <option key={d.name} value={d.name}>{d.name} ({d.role})</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">Preferred Date</label>
                      <input 
                        type="date" 
                        value={formDate}
                        onChange={(e) => setFormDate(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-teal-500" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">Preferred Time</label>
                      <select 
                        value={formTime}
                        onChange={(e) => setFormTime(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-teal-500"
                      >
                        <option>09:00 AM</option>
                        <option>10:30 AM</option>
                        <option>01:15 PM</option>
                        <option>03:45 PM</option>
                        <option>05:00 PM</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm rounded-xl shadow-lg shadow-teal-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Check Availability & Confirm</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <p className="text-[11px] text-slate-500 text-center flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                    Zero cancellation fees • Most insurance plans accepted
                  </p>
                </form>
              </div>
            </div>

          </div>
        </section>

        {/* Clinical Services Section */}
        <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-mono font-semibold uppercase text-teal-400 tracking-wider">
              Comprehensive Care
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Specialized Medical & Wellness Services
            </h2>
            <p className="text-sm text-slate-400">
              State-of-the-art diagnostic technology combined with compassionate physician care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((srv, idx) => {
              const IconComp = srv.icon;
              return (
                <div
                  key={idx}
                  className="bg-slate-950/80 border border-slate-800/80 hover:border-teal-500/40 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-teal-950/80 border border-teal-800/50 flex items-center justify-center group-hover:bg-teal-500 group-hover:text-slate-950 transition-colors">
                      <IconComp className="w-6 h-6 text-teal-400 group-hover:text-slate-950 transition-colors" />
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-900 text-teal-300 border border-slate-800">
                      {srv.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-teal-300 transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {srv.desc}
                  </p>

                  <div className="mt-5 pt-4 border-t border-slate-900 flex items-center justify-between">
                    <button
                      onClick={() => {
                        setBookingConfirmed(false);
                        setBookingModalOpen(true);
                      }}
                      className="text-xs font-semibold text-teal-400 hover:text-teal-300 flex items-center gap-1"
                    >
                      <span>Book Department</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[11px] text-slate-500">In-person & Virtual</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Doctors Section */}
        <section id="doctors" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950 border-y border-slate-900">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="space-y-3">
                <span className="text-xs font-mono font-semibold uppercase text-teal-400 tracking-wider">
                  Our Specialists
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-white">
                  Meet Board-Certified Physicians
                </h2>
                <p className="text-sm text-slate-400 max-w-xl">
                  Our doctors bring training from top medical institutions and over a decade of patient-focused clinical practice.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
                <button
                  onClick={() => setSelectedDept('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${selectedDept === 'all' ? 'bg-teal-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
                >
                  All Specialists
                </button>
                <button
                  onClick={() => setSelectedDept('cardiology')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${selectedDept === 'cardiology' ? 'bg-teal-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
                >
                  Cardiology
                </button>
                <button
                  onClick={() => setSelectedDept('primary')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${selectedDept === 'primary' ? 'bg-teal-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
                >
                  Primary Care
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredDoctors.map((doc, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden hover:border-teal-500/40 transition-all hover:shadow-xl group"
                >
                  <div className="relative h-60 w-full overflow-hidden bg-slate-800">
                    <img
                      src={doc.image}
                      alt={doc.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-slate-950/80 backdrop-blur-md text-teal-300 text-[11px] font-bold flex items-center gap-1 border border-teal-800/40">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span>{doc.rating}</span>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div>
                      <h4 className="font-bold text-base text-white group-hover:text-teal-300 transition-colors">
                        {doc.name}
                      </h4>
                      <p className="text-xs font-medium text-teal-400">{doc.role}</p>
                    </div>

                    <div className="text-[11px] text-slate-400 space-y-1 pt-1 border-t border-slate-800">
                      <div className="flex items-center justify-between">
                        <span>Alma Mater:</span>
                        <span className="text-slate-200 font-medium">{doc.education}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Experience:</span>
                        <span className="text-slate-200 font-medium">{doc.experience}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedDoctor(doc.name);
                        setBookingConfirmed(false);
                        setBookingModalOpen(true);
                      }}
                      className="w-full py-2 bg-slate-800 hover:bg-teal-500 hover:text-slate-950 text-slate-200 font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book with {doc.name.split(' ')[1]}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section id="why-us" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-mono font-semibold uppercase text-teal-400 tracking-wider">
                The Lumina Standard
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                Modern Clinical Precision With Genuine Warmth.
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                We designed Lumina Health to eliminate the cold, rushed atmosphere of conventional clinics. From calm waiting lounges to unhurried 30-minute doctor consultations, we put your wellness first.
              </p>

              <div className="space-y-3.5">
                {[
                  'Zero crowded waiting rooms — guaranteed appointment check-in time',
                  'Direct messaging with your personal doctor between visits',
                  'Same-day on-site pharmacy & digital prescription sync',
                  'Holistic wellness programs with personalized nutrition guidance',
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs sm:text-sm text-slate-300">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80"
                  alt="Modern clinic interior"
                  className="w-full h-96 object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950 border-t border-slate-900">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
              <span className="text-xs font-mono font-semibold uppercase text-teal-400 tracking-wider">
                Patient Testimonials
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Stories of Restored Health & Trust
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: 'Rebecca Thorne',
                  cond: 'Cardiology Patient',
                  quote: 'Dr. Jenkins took the time to listen to my symptoms when three other doctors brushed them off. Her diagnosis and personalized treatment plan completely restored my quality of life.',
                  rating: 5,
                },
                {
                  name: 'David & Lisa Miller',
                  cond: 'Family Pediatrics',
                  quote: 'Having two young toddlers, visiting the doctor used to be stressful. The Lumina pediatric wing is so welcoming that our kids actually look forward to their wellness visits!',
                  rating: 5,
                },
                {
                  name: 'Marcus Sterling',
                  cond: 'Executive Wellness Check',
                  quote: 'The same-day diagnostic lab and frictionless online scheduling is incredible for a busy schedule. I received full metabolic test results within 3 hours.',
                  rating: 5,
                },
              ].map((t, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-300 italic leading-relaxed">"{t.quote}"</p>
                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <div>
                      <h5 className="text-xs font-bold text-white">{t.name}</h5>
                      <span className="text-[11px] text-teal-400">{t.cond}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">Verified Patient</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact & Hours */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h5 className="text-sm font-bold text-white">Clinic Location</h5>
                <p className="text-xs text-slate-400 mt-1">450 Wellness Boulevard, Suite 300<br />Metropolis Medical District, NY 10021</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h5 className="text-sm font-bold text-white">Operating Hours</h5>
                <p className="text-xs text-slate-400 mt-1">Mon – Fri: 7:30 AM – 7:30 PM<br />Sat – Sun: 9:00 AM – 4:00 PM</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h5 className="text-sm font-bold text-white">Immediate Assistance</h5>
                <p className="text-xs text-slate-400 mt-1">Emergency On-Call: (800) 555-0199<br />General Inquiries: desk@luminahealth.com</p>
              </div>
            </div>
          </div>
        </section>

        {/* Booking Modal */}
        {bookingModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-slate-950 border border-teal-500/40 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl">
              <button
                onClick={() => setBookingModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>

              {!bookingConfirmed ? (
                <div>
                  <div className="flex items-center gap-2 text-teal-400 text-xs font-mono font-semibold uppercase mb-1">
                    <Calendar className="w-4 h-4" />
                    <span>Schedule Appointment</span>
                  </div>
                  <h3 className="text-xl font-bold text-white font-heading">Complete Your Booking</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Booking with <span className="text-teal-300 font-semibold">{selectedDoctor}</span>
                  </p>

                  <form onSubmit={handleBookSubmit} className="mt-5 space-y-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Patient Full Name</label>
                      <input
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="e.g. Eleanor Vance"
                        className="w-full px-3.5 py-2 text-xs bg-slate-900 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-teal-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                        <input
                          type="email"
                          required
                          value={formEmail}
                          onChange={(e) => setFormEmail(e.target.value)}
                          placeholder="eleanor@example.com"
                          className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number</label>
                        <input
                          type="tel"
                          required
                          value={formPhone}
                          onChange={(e) => setFormPhone(e.target.value)}
                          placeholder="(555) 000-1234"
                          className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Date</label>
                        <input
                          type="date"
                          value={formDate}
                          onChange={(e) => setFormDate(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Time</label>
                        <select
                          value={formTime}
                          onChange={(e) => setFormTime(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-teal-500"
                        >
                          <option>09:00 AM</option>
                          <option>10:30 AM</option>
                          <option>01:15 PM</option>
                          <option>03:45 PM</option>
                          <option>05:00 PM</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-2 py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-teal-500/25 transition-all"
                    >
                      Confirm Appointment
                    </button>
                  </form>
                </div>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Appointment Reserved!</h3>
                    <p className="text-xs text-slate-300 mt-1 max-w-sm mx-auto">
                      A calendar invite and SMS reminder have been scheduled for <span className="text-teal-300 font-semibold">{formDate} at {formTime}</span> with {selectedDoctor}.
                    </p>
                  </div>
                  <button
                    onClick={() => setBookingModalOpen(false)}
                    className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </DemoFrameWrapper>
  );
};
