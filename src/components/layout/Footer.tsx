import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Globe, 
  Mail 
} from 'lucide-react';
import { DEMO_REGISTRY } from '../../data/demos';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-12 relative overflow-hidden">
      {/* Glow ambient background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gradient-to-b from-indigo-900/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-900">
          {/* Col 1: Brand & Slogan */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3 group inline-flex">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1.5px] shadow-lg shadow-indigo-500/25">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tight text-white font-heading">
                  Digital<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400">Flow</span>Hub
                </span>
                <span className="text-[10px] text-slate-400 tracking-wider font-mono uppercase -mt-1 font-medium">
                  See It Before You Build It
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              DigitalFlowHub is a modern website solutions and digital experience studio. Explore ready-made industry concepts, experience live interactive demos, and customize a high-converting website for your brand in days.
            </p>

            {/* Value badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-indigo-950/60 text-indigo-300 border border-indigo-800/40">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                100% Bespoke Customization
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-cyan-950/60 text-cyan-300 border border-cyan-800/40">
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                5–7 Day Fast Turnaround
              </span>
            </div>
          </div>

          {/* Col 2: Navigation & Solutions */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-300 font-semibold mb-4">
              Explore Platform
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/solutions" className="hover:text-cyan-400 transition-colors">Industry Solutions</Link>
              </li>
              <li>
                <Link to="/demos" className="hover:text-cyan-400 transition-colors">Demo Gallery</Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-cyan-400 transition-colors">Digital Products</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-cyan-400 transition-colors">Services & Pricing</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-cyan-400 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-cyan-400 transition-colors">Contact / Custom Quote</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Live Website Demos */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-300 font-semibold mb-4">
              Live Website Demos
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              {DEMO_REGISTRY.map((demo) => (
                <li key={demo.id}>
                  <Link
                    to={demo.route}
                    className="hover:text-indigo-300 transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-indigo-400 transition-colors" />
                    <span>{demo.name.split('—')[0].split('&')[0]}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Newsletter & Inquiries */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-300 font-semibold mb-4">
              Stay Ahead
            </h4>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Get notified when we release new industry website templates and digital solutions.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-3.5 py-2 text-xs bg-slate-900 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-md shadow-indigo-600/20"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </form>
            {subscribed && (
              <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Subscribed! Check your inbox soon.</span>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-slate-900 space-y-1.5 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>hello@digitalflowhub.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                <span>Available for Worldwide Customization</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} DigitalFlowHub. All rights reserved. Professional Website Solutions & Demo Ecosystem.</p>
          <div className="flex items-center gap-6">
            <Link to="/contact" className="hover:text-slate-400 transition-colors">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-slate-400 transition-colors">Terms of Service</Link>
            <Link to="/contact" className="hover:text-slate-400 transition-colors">Admin Inquiries</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
