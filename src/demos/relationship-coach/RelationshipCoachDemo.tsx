import React, { useState } from 'react';
import { 
  Heart, 
  Sparkles, 
  Calendar, 
  CheckCircle2, 
  ArrowRight, 
  X
} from 'lucide-react';
import { DemoFrameWrapper } from '../DemoFrameWrapper';
import { DEMO_REGISTRY } from '../../data/demos';

const demoData = DEMO_REGISTRY.find(d => d.id === 'relationship-coach')!;

export const RelationshipCoachDemo: React.FC = () => {
  const [assessmentStep, setAssessmentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<{ goal?: string; friction?: string; style?: string }>({});
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const programs = [
    {
      title: '1-on-1 Emotional Clarity & Relationship Deep Dive',
      duration: '12 Weeks • Private Mentorship',
      tagline: 'For individuals seeking healing, boundaries, and emotional self-mastery.',
      includes: [
        'Weekly 60-minute private coaching video sessions',
        'Direct WhatsApp voice note access between calls',
        'Custom somatic boundary & nervous system workbook',
        'Attachment style repatterning blueprints',
      ],
      investment: '$2,400 (or $850/mo)',
      badge: 'Most Popular for Singles',
    },
    {
      title: '8-Week Couples Intimacy & Communication Intensive',
      duration: '8 Weeks • Joint Partner Coaching',
      tagline: 'Rebuild trust, eliminate defensive cycles, and fall back in love.',
      includes: [
        'Weekly 75-minute joint breakthrough sessions',
        'Conflict de-escalation emergency cheat sheet',
        'Physical intimacy & deep connection rekindling exercises',
        'Lifetime access to the Couples Harmony Portal',
      ],
      investment: '$3,200 (or $1,150/mo)',
      badge: 'Highest Transformation Rate',
    },
    {
      title: 'The Conscious Heart Group Mastermind',
      duration: '6 Months • Small Intimate Cohort',
      tagline: 'A warm sanctuary of like-minded seekers elevating love and conscious relating.',
      includes: [
        'Bi-weekly group coaching & hot seat deep dives',
        'Guest masterclasses with somatic psychologists',
        'Private community support & accountability pod',
        'Exclusive weekend virtual retreat experience',
      ],
      investment: '$1,800',
      badge: 'Cohort Enrolling Now',
    },
  ];

  return (
    <DemoFrameWrapper demo={demoData}>
      <div className="bg-[#120e11] text-slate-100 font-sans min-h-screen selection:bg-rose-500 selection:text-white">
        
        {/* Coach Header */}
        <header className="bg-[#1a1317]/95 border-b border-rose-900/30 sticky top-12 z-30 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-500 via-orange-400 to-amber-300 p-0.5 shadow-md shadow-rose-500/20">
                <div className="w-full h-full bg-[#120e11] rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-rose-400 fill-rose-400/30" />
                </div>
              </div>
              <div>
                <span className="font-bold text-lg text-white font-heading tracking-tight flex items-center gap-1.5">
                  Sarah <span className="text-rose-400">Lin</span> Coaching
                </span>
                <span className="text-[10px] text-rose-300/80 block font-mono">
                  Master Relationship & Life Transformation
                </span>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-7 text-xs font-semibold uppercase tracking-wider text-slate-300">
              <a href="#assessment" className="hover:text-rose-400 transition-colors">Free Assessment</a>
              <a href="#who-i-help" className="hover:text-rose-400 transition-colors">Who I Help</a>
              <a href="#programs" className="hover:text-rose-400 transition-colors">Programs</a>
              <a href="#about" className="hover:text-rose-400 transition-colors">About Sarah</a>
              <a href="#stories" className="hover:text-rose-400 transition-colors">Breakthroughs</a>
            </nav>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setBookingSuccess(false);
                  setBookingModalOpen(true);
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-400 hover:to-orange-400 text-white font-bold text-xs shadow-lg shadow-rose-500/25 transition-all flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Book Free Discovery Call</span>
              </button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative pt-20 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[#24171e] via-[#120e11] to-[#120e11]">
          <div className="absolute top-10 right-1/3 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-950/80 border border-rose-800/50 text-rose-300 text-xs font-semibold">
                <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                <span>Over 1,200+ Individuals & Couples Guided Since 2017</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12] font-heading">
                Reignite Connection. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-orange-300 to-amber-300">
                  Break Cycles. Heal Deeper.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
                A warm, judgment-free space to untangle relationship anxiety, rebuild sacred trust with your partner, and cultivate profound emotional peace.
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-rose-950">
                <div className="p-3.5 rounded-2xl bg-[#1e151b] border border-rose-900/40">
                  <span className="text-2xl font-bold text-rose-400 font-heading">96%</span>
                  <p className="text-xs text-slate-400 mt-0.5">Client Breakthroughs</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#1e151b] border border-rose-900/40">
                  <span className="text-2xl font-bold text-rose-400 font-heading">150k+</span>
                  <p className="text-xs text-slate-400 mt-0.5">Podcast Listeners</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#1e151b] border border-rose-900/40">
                  <span className="text-2xl font-bold text-rose-400 font-heading">8 Weeks</span>
                  <p className="text-xs text-slate-400 mt-0.5">Avg Shift Horizon</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={() => {
                    setBookingSuccess(false);
                    setBookingModalOpen(true);
                  }}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-400 hover:to-orange-400 text-white font-bold text-xs uppercase tracking-wider shadow-xl shadow-rose-500/30 flex items-center gap-2 transition-all hover:scale-105"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book 30-Min Discovery Call</span>
                </button>
                <a
                  href="#assessment"
                  className="px-6 py-3.5 rounded-xl bg-[#1e151b] hover:bg-[#281c24] text-rose-300 font-semibold text-xs uppercase tracking-wider border border-rose-800/50 flex items-center gap-2 transition-colors"
                >
                  <span>Take Free Assessment</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right Card: Coach Visual Spotlight */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-rose-800/40 shadow-2xl shadow-rose-950/50 bg-[#1e151b]">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
                  alt="Coach Sarah Lin"
                  className="w-full h-96 sm:h-[420px] object-cover"
                />
                <div className="p-6 bg-[#1a1317] border-t border-rose-900/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-lg text-white">Sarah Lin, MA, PCC</h3>
                    <span className="px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-semibold">
                      Certified Master Coach
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Host of the acclaimed podcast <span className="text-rose-300 italic">"Conscious Intimacy"</span> & Somatic Attachment Specialist.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Free Relationship Health Quiz Section */}
        <section id="assessment" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="bg-[#1b1419] border border-rose-800/50 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
            <div className="text-center space-y-2">
              <span className="text-xs font-mono uppercase text-rose-400 tracking-wider font-semibold">
                Interactive Self-Discovery
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading">
                Free 2-Minute Relationship Health Assessment
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
                Answer 3 quick questions to receive personalized clarity on your attachment style and core relationship dynamic.
              </p>
            </div>

            {assessmentStep === 0 && (
              <div className="space-y-4 max-w-xl mx-auto pt-4">
                <h4 className="text-sm font-semibold text-white">Step 1: What is your primary emotional focus right now?</h4>
                <div className="grid grid-cols-1 gap-2.5">
                  {[
                    'Reconnecting deeply with my romantic partner & ending constant friction',
                    'Healing from past heartbreak and overcoming fear of intimacy',
                    'Setting boundaries without feeling guilty or anxious',
                    'Preparing myself for a conscious, healthy long-term partnership',
                  ].map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setAnswers({ ...answers, goal: option });
                        setAssessmentStep(1);
                      }}
                      className="p-3.5 rounded-xl bg-[#251b22] hover:bg-rose-950/80 text-left text-xs sm:text-sm text-slate-200 border border-rose-900/40 hover:border-rose-500/50 transition-all flex items-center justify-between group"
                    >
                      <span>{option}</span>
                      <ArrowRight className="w-4 h-4 text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {assessmentStep === 1 && (
              <div className="space-y-4 max-w-xl mx-auto pt-4">
                <h4 className="text-sm font-semibold text-white">Step 2: When conflict happens, what is your most common reaction?</h4>
                <div className="grid grid-cols-1 gap-2.5">
                  {[
                    'I shut down, withdraw, or need quiet space (Avoidant tendency)',
                    'I feel intense anxiety, overthink, and seek immediate reassurance (Anxious tendency)',
                    'I feel frustrated, argue my point passionately, but feel exhausted after',
                    'I avoid bringing up my true needs to keep peace at all costs',
                  ].map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setAnswers({ ...answers, friction: option });
                        setAssessmentStep(2);
                      }}
                      className="p-3.5 rounded-xl bg-[#251b22] hover:bg-rose-950/80 text-left text-xs sm:text-sm text-slate-200 border border-rose-900/40 hover:border-rose-500/50 transition-all flex items-center justify-between group"
                    >
                      <span>{option}</span>
                      <ArrowRight className="w-4 h-4 text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {assessmentStep === 2 && (
              <div className="space-y-4 max-w-xl mx-auto pt-4 text-center">
                <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto border border-rose-500/40">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-white">Assessment Complete!</h4>
                <div className="p-4 rounded-2xl bg-[#251b22] border border-rose-800/40 text-left space-y-2 text-xs">
                  <p className="text-rose-300 font-semibold">Your Core Dynamic:</p>
                  <p className="text-slate-300">
                    Your patterns indicate an emotional longing for deep connection coupled with habitual nervous-system reactivity during moments of vulnerability.
                  </p>
                  <p className="text-slate-400 pt-1">
                    <span className="font-semibold text-white">Recommended Next Step:</span> Book a free 30-minute discovery call with Sarah to map out an emotional recalibration plan.
                  </p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => {
                      setBookingSuccess(false);
                      setBookingModalOpen(true);
                    }}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-orange-500 text-white text-xs font-bold shadow-lg shadow-rose-500/30"
                  >
                    Discuss Results on Free Discovery Call
                  </button>
                  <button
                    onClick={() => setAssessmentStep(0)}
                    className="px-4 py-3 rounded-xl bg-slate-900 text-slate-400 text-xs hover:text-white"
                  >
                    Retake Quiz
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Who I Help */}
        <section id="who-i-help" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-mono uppercase text-rose-400 tracking-wider font-semibold">
              Tailored Guidance
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Who This Coaching Is Built For
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Couples in Repetitive Conflict',
                desc: 'You love each other deeply, but keep getting stuck in the same exhausting arguments over tone, domestic load, and intimacy.',
                outcome: 'Establish respectful dialogue & rekindle affectionate warmth in 30 days.',
              },
              {
                title: 'Singles Healing Past Heartbreak',
                desc: 'You are ready to break the cycle of emotionally unavailable partners and build unwavering self-worth from the inside out.',
                outcome: 'Clarify non-negotiables & attract conscious, emotionally secure love.',
              },
              {
                title: 'High-Achievers & Leaders',
                desc: 'You thrive in career and business, but struggle with personal vulnerability, boundaries, or feeling emotionally lonely.',
                outcome: 'Integrate emotional softness without losing your ambition or power.',
              },
            ].map((item, idx) => (
              <div key={idx} className="p-8 rounded-3xl bg-[#1a1317] border border-rose-900/40 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold">
                  0{idx + 1}
                </div>
                <h4 className="text-lg font-bold text-white">{item.title}</h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{item.desc}</p>
                <div className="pt-3 border-t border-rose-950 text-xs text-rose-400 font-semibold">
                  <span>Transformation: </span>
                  <span className="text-slate-300 font-normal">{item.outcome}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Signature Programs */}
        <section id="programs" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#171015] border-y border-rose-950">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
              <span className="text-xs font-mono uppercase text-rose-400 tracking-wider font-semibold">
                Transformational Frameworks
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Signature Coaching Programs
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {programs.map((prog, idx) => (
                <div
                  key={idx}
                  className="bg-[#1e151b] border border-rose-900/40 hover:border-rose-500/50 rounded-3xl p-8 flex flex-col justify-between space-y-6 transition-all hover:shadow-2xl hover:shadow-rose-950/40"
                >
                  <div className="space-y-4">
                    <span className="text-[11px] font-semibold text-rose-400 uppercase tracking-wider px-3 py-1 rounded-full bg-rose-950/60 border border-rose-800/40 inline-block">
                      {prog.badge}
                    </span>

                    <h3 className="text-xl font-bold text-white leading-snug">
                      {prog.title}
                    </h3>
                    <p className="text-xs text-rose-300 font-mono">{prog.duration}</p>
                    <p className="text-xs text-slate-300 leading-relaxed">{prog.tagline}</p>

                    <div className="space-y-2.5 pt-4 border-t border-rose-900/40">
                      <p className="text-xs font-semibold text-white">What is Included:</p>
                      {prog.includes.map((inc, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                          <span>{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-rose-900/40 space-y-4">
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs text-slate-400">Investment:</span>
                      <span className="text-lg font-bold text-white font-heading">{prog.investment}</span>
                    </div>

                    <button
                      onClick={() => {
                        setBookingSuccess(false);
                        setBookingModalOpen(true);
                      }}
                      className="w-full py-3 bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-400 hover:to-orange-400 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-rose-500/20 transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>Apply for Program</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Discovery Call Booking Modal */}
        {bookingModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-[#1b1419] border border-rose-800/60 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl">
              <button
                onClick={() => setBookingModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>

              {!bookingSuccess ? (
                <div>
                  <span className="text-[11px] font-mono text-rose-400 uppercase tracking-wider font-semibold">
                    100% Free & Confidential
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">Book 30-Min Discovery Session</h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Connect directly with Sarah Lin to explore whether our coaching containers are the right fit for your journey.
                  </p>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setBookingSuccess(true);
                    }}
                    className="mt-5 space-y-3.5"
                  >
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Your Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Jessica Hayes"
                        className="w-full px-3.5 py-2 text-xs bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-rose-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                        <input
                          type="email"
                          required
                          placeholder="jessica@example.com"
                          className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-rose-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Phone / WhatsApp</label>
                        <input
                          type="tel"
                          required
                          placeholder="(555) 321-9876"
                          className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-rose-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Program of Interest</label>
                      <select className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-rose-500">
                        <option>1-on-1 Emotional Clarity & Relationship Deep Dive</option>
                        <option>8-Week Couples Intimacy & Communication Intensive</option>
                        <option>The Conscious Heart Group Mastermind</option>
                        <option>Not sure yet — need Sarah's guidance</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-2 py-3 bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-400 hover:to-orange-400 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-rose-500/25 transition-all"
                    >
                      Confirm Free Discovery Session
                    </button>
                  </form>
                </div>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto border border-rose-500/40">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Discovery Call Booked!</h3>
                    <p className="text-xs text-slate-300 mt-1 max-w-sm mx-auto">
                      A private calendar link with preparation prompts has been sent to your email. We look forward to holding space for you.
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
