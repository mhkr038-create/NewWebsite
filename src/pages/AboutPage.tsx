import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ShieldCheck, 
  Compass, 
  Target, 
  HeartHandshake, 
  Code2
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Our Vision & Philosophy</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight font-heading leading-tight">
          Redefining How Modern Brands <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400">
            Build On The Web.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
          We founded DigitalFlowHub to dismantle the outdated agency model: no more endless pitch decks, no more wireframe guesswork, and no more multi-month delays.
        </p>
      </div>

      {/* The Core Philosophy */}
      <div className="bg-gradient-to-r from-indigo-950/60 via-slate-900 to-cyan-950/60 border border-slate-800 rounded-3xl p-8 sm:p-14 shadow-2xl space-y-8">
        <div className="max-w-3xl space-y-4 text-left">
          <span className="text-xs font-mono uppercase text-cyan-400 font-semibold tracking-wider">
            Our Core Thesis
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-heading">
            "See It Before You Build It."
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            When buying a home, you tour the property. When buying a car, you take a test drive. Why should commissioning your business's most important digital asset be an act of blind faith in a static PDF wireframe?
          </p>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            At DigitalFlowHub, we build and publish full-scale, functioning live websites for specific industries first. You interact with the UX, click through the booking flows, test the calculators, and evaluate the conversion psychology. If you love the concept, we personalize it with your brand assets and launch it on your domain in days.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-800/80">
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
            <span className="text-2xl font-bold text-cyan-400 font-mono">0%</span>
            <h4 className="text-sm font-bold text-white">Wireframe Guesswork</h4>
            <p className="text-xs text-slate-400">You test the actual interactive product before committing.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
            <span className="text-2xl font-bold text-indigo-400 font-mono">5–7 Days</span>
            <h4 className="text-sm font-bold text-white">Average Turnaround</h4>
            <p className="text-xs text-slate-400">From concept selection to live domain deployment.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
            <span className="text-2xl font-bold text-emerald-400 font-mono">100%</span>
            <h4 className="text-sm font-bold text-white">Code Ownership</h4>
            <p className="text-xs text-slate-400">Zero vendor lock-in or proprietary monthly builder fees.</p>
          </div>
        </div>
      </div>

      {/* 4 Brand Pillars */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono uppercase text-indigo-400 font-semibold">
            Our Guiding Pillars
          </span>
          <h2 className="text-3xl font-bold text-white font-heading">
            Engineered For High-Growth Outcomes
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Target,
              title: 'Conversion-First UX',
              desc: 'Every layout is designed around consumer psychology, direct appointment bookings, and lead capture hooks.',
            },
            {
              icon: Code2,
              title: 'Clean Modern Stack',
              desc: 'Built with React 19, TypeScript, and modern Tailwind CSS for blazing page speeds and 99+ Google Lighthouse scores.',
            },
            {
              icon: ShieldCheck,
              title: 'Radical Transparency',
              desc: 'Fixed-price scopes with clear timelines and deliverables. No hidden hourly fees or surprise charges.',
            },
            {
              icon: HeartHandshake,
              title: 'Dedicated Partnership',
              desc: 'Every client works directly with senior engineers and designers, ensuring your brand vision is executed flawlessly.',
            },
          ].map((pillar, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-3 hover:border-indigo-500/40 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
                <pillar.icon className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white font-heading">{pillar.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack Banner */}
      <div className="p-8 sm:p-12 rounded-3xl bg-slate-950 border border-slate-800 text-center space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase text-slate-500 tracking-wider">
            Built on Industry Standard Technologies
          </span>
          <h3 className="text-2xl font-bold text-white">Modern Enterprise Architecture</h3>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 text-xs font-mono text-slate-400 font-semibold">
          <span className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200">React 19 & TypeScript</span>
          <span className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200">Tailwind CSS v4</span>
          <span className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200">Stripe Payments API</span>
          <span className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200">Calendly & Cal.com</span>
          <span className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200">Headless CMS & CRM</span>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center space-y-4 pt-6">
        <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading">
          Ready to Explore Your Brand's Next Digital Experience?
        </h3>
        <div className="flex justify-center gap-4 pt-2">
          <Link
            to="/demos"
            className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all"
          >
            <Compass className="w-4 h-4" />
            <span>Browse All Website Demos</span>
          </Link>
        </div>
      </div>

    </div>
  );
};
