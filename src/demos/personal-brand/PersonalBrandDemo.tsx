import React, { useState } from 'react';
import { 
  Mic, 
  Download, 
  Calendar, 
  ArrowRight, 
  CheckCircle2, 
  X,
  Play
} from 'lucide-react';
import { DemoFrameWrapper } from '../DemoFrameWrapper';
import { DEMO_REGISTRY } from '../../data/demos';

const demoData = DEMO_REGISTRY.find(d => d.id === 'personal-brand')!;

export const PersonalBrandDemo: React.FC = () => {
  const [speakingModalOpen, setSpeakingModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeReel, setActiveReel] = useState(false);

  const keynotes = [
    {
      title: 'The Algorithmic Enterprise: Leading in the Era of Autonomous AI',
      audience: 'Global 2000 Executives & Tech Summits',
      duration: '45–60 Minutes + Q&A',
      desc: 'How non-technical leaders must rethink organizational structure, capital allocation, and human talent when AI agents can execute 80% of routine workflows.',
      takeaways: ['The 3 Levers of Agentic Readiness', 'Human Capital vs Compute Allocation', 'Ethical Guardrails and Enterprise Moats'],
    },
    {
      title: 'Unfair Advantage: Building High-Velocity Product Moats',
      audience: 'Venture Capital Summits & Founder Masterminds',
      duration: '40–50 Minutes',
      desc: 'Why conventional software moats have evaporated and how top modern startups construct distribution loops that compound faster than competitors.',
      takeaways: ['Speed as a Defensive Moat', 'Algorithmic Distribution Flywheels', 'Community-Led Scale'],
    },
    {
      title: 'The Sovereign Creator: Monetizing High-Trust Personal Brands',
      audience: 'Creative Entrepreneurs & Media Conferences',
      duration: '45 Minutes',
      desc: 'Frameworks for converting attention into owned digital assets, recurring enterprise advisory contracts, and high-margin product ecosystems.',
      takeaways: ['Audience Ownership vs Platform Rent', 'Productized High-Ticket Consulting', 'Content-to-Deal Pipeline'],
    },
  ];

  return (
    <DemoFrameWrapper demo={demoData}>
      <div className="bg-[#09090b] text-slate-100 font-sans min-h-screen selection:bg-orange-500 selection:text-black">
        
        {/* Header */}
        <header className="bg-[#09090b]/90 border-b border-orange-500/20 sticky top-12 z-30 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center font-bold text-black text-sm">
                MV
              </div>
              <div>
                <span className="font-extrabold text-lg text-white tracking-tight">
                  Marcus Vance
                </span>
                <span className="text-[10px] text-orange-400 block font-mono">
                  Speaker • Tech Strategist • Author
                </span>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-7 text-xs font-semibold uppercase tracking-wider text-slate-300">
              <a href="#keynotes" className="hover:text-orange-400 transition-colors">Keynotes</a>
              <a href="#books" className="hover:text-orange-400 transition-colors">Books & Essays</a>
              <a href="#advisory" className="hover:text-orange-400 transition-colors">Advisory Board</a>
              <a href="#media-kit" className="hover:text-orange-400 transition-colors">Media Kit</a>
            </nav>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setSubmitted(false);
                  setSpeakingModalOpen(true);
                }}
                className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-orange-500/20"
              >
                Book For Keynote
              </button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative pt-20 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[#18110b] via-[#09090b] to-[#09090b]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-950/80 border border-orange-700/50 text-orange-300 text-xs font-mono">
                <Mic className="w-3.5 h-3.5 text-orange-400" />
                <span>Keynote Speaker • Bestselling Author • Tech Investor</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
                Decoding the Future of <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-400">
                  Technology, Capital & Human Agency.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
                Marcus Vance keynotes for Fortune 500 summits, advises top tech founders, and writes on the collision of artificial intelligence and global market dynamics.
              </p>

              {/* Speaker Reel CTA & Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800">
                <div className="p-3 rounded-2xl bg-slate-900/80 border border-orange-500/20">
                  <span className="text-2xl font-bold text-orange-400 font-heading">120+</span>
                  <p className="text-xs text-slate-400 mt-0.5">Keynotes Delivered</p>
                </div>
                <div className="p-3 rounded-2xl bg-slate-900/80 border border-orange-500/20">
                  <span className="text-2xl font-bold text-orange-400 font-heading">85k+</span>
                  <p className="text-xs text-slate-400 mt-0.5">Newsletter Readers</p>
                </div>
                <div className="p-3 rounded-2xl bg-slate-900/80 border border-orange-500/20">
                  <span className="text-2xl font-bold text-orange-400 font-heading">250k+</span>
                  <p className="text-xs text-slate-400 mt-0.5">Global Stage Attendees</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setSpeakingModalOpen(true);
                  }}
                  className="px-6 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-bold text-xs uppercase tracking-wider shadow-lg shadow-orange-500/25 flex items-center gap-2 transition-all hover:scale-105"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Check Speaking Availability</span>
                </button>
                <button
                  onClick={() => setActiveReel(true)}
                  className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-orange-300 font-semibold text-xs uppercase tracking-wider border border-orange-500/30 flex items-center gap-2 transition-colors"
                >
                  <Play className="w-4 h-4 text-orange-400 fill-orange-400" />
                  <span>Watch 2026 Speaker Reel</span>
                </button>
              </div>
            </div>

            {/* Right Card: Portrait */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-orange-500/30 shadow-2xl bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
                  alt="Marcus Vance"
                  className="w-full h-96 sm:h-[460px] object-cover"
                />
                <div className="p-6 bg-slate-950/90 border-t border-slate-800 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-orange-400 tracking-wider">Represented by</span>
                  <p className="text-xs text-slate-300 font-medium">Worldwide Talent & Speakers Guild (NY / London)</p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Featured In Logos */}
        <section className="py-8 bg-black border-y border-slate-900">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <span className="text-[11px] font-mono uppercase tracking-widest text-slate-500 mb-4 block">
              Featured In & Quoted By
            </span>
            <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 text-sm font-semibold text-slate-400 opacity-75">
              <span className="hover:text-white transition-colors">FORBES TECH</span>
              <span className="hover:text-white transition-colors">WIRED SUMMIT</span>
              <span className="hover:text-white transition-colors">TEDx GLOBAL</span>
              <span className="hover:text-white transition-colors">BLOOMBERG TV</span>
              <span className="hover:text-white transition-colors">WALL STREET JOURNAL</span>
            </div>
          </div>
        </section>

        {/* Keynote Topics Section */}
        <section id="keynotes" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-mono uppercase text-orange-400 tracking-wider font-semibold">
              Stage Programs
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-heading">
              Signature Keynote Topics
            </h2>
            <p className="text-sm text-slate-400">
              High-impact, meticulously researched presentations delivered with electrifying stage presence.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {keynotes.map((kn, idx) => (
              <div
                key={idx}
                className="bg-slate-900/70 border border-slate-800 hover:border-orange-500/40 rounded-3xl p-8 flex flex-col justify-between space-y-6 transition-all hover:shadow-xl group"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs text-orange-400 font-mono">
                    <span>TOPIC {idx + 1}</span>
                    <span>{kn.duration}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-orange-300 transition-colors leading-snug">
                    {kn.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">Audience: {kn.audience}</p>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{kn.desc}</p>

                  <div className="space-y-2 pt-3 border-t border-slate-800">
                    <p className="text-xs font-semibold text-white">Audience Takeaways:</p>
                    {kn.takeaways.map((t, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setSpeakingModalOpen(true);
                    }}
                    className="w-full py-2.5 bg-slate-800 hover:bg-orange-500 hover:text-black text-slate-200 font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Request Topic Outline</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Media Kit Download Bar */}
        <section id="media-kit" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="bg-slate-900/90 border border-orange-500/30 rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="space-y-2 text-left">
              <span className="text-xs font-mono uppercase text-orange-400 font-semibold">Event Organizer Hub</span>
              <h3 className="text-2xl font-bold text-white">Download Marcus's 2026 Media Kit</h3>
              <p className="text-xs text-slate-400 max-w-lg">
                Includes high-resolution stage headshots, official speaker bios (50, 100, and 250 words), AV technical rider, and introduction scripts.
              </p>
            </div>
            <button
              onClick={() => alert('Media Kit ZIP package download initiated (Mock).')}
              className="px-6 py-3.5 bg-orange-500 hover:bg-orange-400 text-black font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-orange-500/25 flex items-center gap-2 shrink-0 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download Press Kit (.ZIP)</span>
            </button>
          </div>
        </section>

        {/* Video Reel Modal Mock */}
        {activeReel && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 relative shadow-2xl space-y-4">
              <button
                onClick={() => setActiveReel(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="text-lg font-bold text-white">Marcus Vance — 2026 Keynote Highlight Reel</h3>
              <div className="w-full h-80 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center text-center p-6 space-y-3">
                <Play className="w-12 h-12 text-orange-400" />
                <p className="text-xs text-slate-300">Live Stage Footage: London Tech Week, Singapore AI Summit & San Francisco Founder Forum.</p>
                <span className="text-[11px] font-mono text-slate-500">[Demo Video Player Simulation]</span>
              </div>
            </div>
          </div>
        )}

        {/* Speaking Inquiry Modal */}
        {speakingModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-orange-500/40 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl">
              <button
                onClick={() => setSpeakingModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>

              {!submitted ? (
                <div>
                  <span className="text-[11px] font-mono text-orange-400 uppercase tracking-wider font-semibold">
                    Speaker Bureau & Event Inquiries
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">Book Marcus For Your Event</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Please provide event details and dates. Our speaker management team responds within 24 hours.
                  </p>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSubmitted(true);
                    }}
                    className="mt-5 space-y-3.5 text-xs"
                  >
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">Organizer Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rachel Adams"
                        className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-600 focus:outline-none focus:border-orange-400"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1">Organization / Summit</label>
                        <input
                          type="text"
                          required
                          placeholder="Global Tech Summit"
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-600 focus:outline-none focus:border-orange-400"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1">Email</label>
                        <input
                          type="email"
                          required
                          placeholder="rachel@summit.com"
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-600 focus:outline-none focus:border-orange-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1">Event Date</label>
                        <input
                          type="date"
                          required
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-orange-400"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1">Location / Format</label>
                        <select className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-orange-400">
                          <option>In-Person Keynote (USA)</option>
                          <option>In-Person Keynote (International)</option>
                          <option>Virtual Global Keynote</option>
                          <option>Executive Board Advisory</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-2 py-3 bg-orange-500 hover:bg-orange-400 text-black font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-orange-500/25 transition-all"
                    >
                      Submit Speaker Inquiry
                    </button>
                  </form>
                </div>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center mx-auto border border-orange-500/40">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Inquiry Received!</h3>
                    <p className="text-xs text-slate-300 mt-1 max-w-sm mx-auto">
                      Marcus Vance's speaker management team has received your event inquiry and will review calendar availability today.
                    </p>
                  </div>
                  <button
                    onClick={() => setSpeakingModalOpen(false)}
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
