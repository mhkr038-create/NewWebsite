'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  ArrowLeft, 
  Monitor, 
  Tablet, 
  Smartphone, 
  CheckCircle2, 
  ArrowRight, 
  Info, 
  X, 
  Share2, 
  ShieldCheck 
} from 'lucide-react';
import type { DemoItem } from '../data/demos';

interface DemoFrameWrapperProps {
  demo: DemoItem;
  children: React.ReactNode;
}

type ViewportMode = 'desktop' | 'tablet' | 'mobile';

export const DemoFrameWrapper: React.FC<DemoFrameWrapperProps> = ({ demo, children }) => {
  const [viewport, setViewport] = useState<ViewportMode>('desktop');
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col antialiased">
      
      {/* Top Bar: Created by Our Digital Agency */}
      <div className="sticky top-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/90 shadow-2xl px-3 sm:px-6 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Left: Back to Main Website & Agency Tag */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold border border-slate-800 transition-colors"
              title="Return to Main Website"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Back to Main Website</span>
              <span className="sm:hidden">Main Site</span>
            </Link>

            <div className="h-4 w-[1px] bg-slate-800 hidden md:block" />

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-medium text-slate-300">
                <span className="text-indigo-400 font-semibold font-heading">Created by Our Digital Agency:</span>{' '}
                <span className="text-slate-100 font-semibold hidden md:inline">{demo.name}</span>
              </span>
            </div>
          </div>

          {/* Center: Viewport Switcher Controls (Desktop / Tablet / Mobile) */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800/80">
            <button
              onClick={() => setViewport('desktop')}
              className={`p-1.5 px-2.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                viewport === 'desktop'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Full Desktop View"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Desktop</span>
            </button>
            <button
              onClick={() => setViewport('tablet')}
              className={`p-1.5 px-2.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                viewport === 'tablet'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Tablet Viewport (768px)"
            >
              <Tablet className="w-3.5 h-3.5" />
              <span>Tablet</span>
            </button>
            <button
              onClick={() => setViewport('mobile')}
              className={`p-1.5 px-2.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                viewport === 'mobile'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Mobile Viewport (390px)"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile</span>
            </button>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setShowInfoModal(true)}
              className="p-1.5 sm:px-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs border border-slate-800 transition-colors flex items-center gap-1.5"
              title="View Demo Specs & Features"
            >
              <Info className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Concept Specs</span>
            </button>

            <Link
              href={`/contact?demo=${demo.slug}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>Get a Website Like This</span>
              <ArrowRight className="w-3.5 h-3.5 hidden sm:inline" />
            </Link>
          </div>

        </div>
      </div>

      {/* Frame Container */}
      <div className="flex-1 flex items-center justify-center p-0 lg:p-4 bg-slate-950/60 overflow-hidden">
        <div
          className={`h-full w-full transition-all duration-300 flex flex-col bg-slate-950 ${
            viewport === 'desktop'
              ? 'max-w-full rounded-none'
              : viewport === 'tablet'
              ? 'max-w-[768px] my-4 rounded-3xl border-4 border-slate-800 shadow-2xl overflow-hidden'
              : 'max-w-[390px] my-4 rounded-[40px] border-4 border-slate-800 shadow-2xl overflow-hidden'
          }`}
        >
          {/* Virtual Browser Top for non-desktop */}
          {viewport !== 'desktop' && (
            <div className="bg-slate-900 px-4 py-2 flex items-center justify-between border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <div className="text-[10px] font-mono text-slate-400 truncate max-w-[200px] bg-slate-950 px-2.5 py-0.5 rounded border border-slate-800">
                demo.digitalsimplesolution.online/{demo.slug}
              </div>
              <div className="w-6" />
            </div>
          )}

          {/* Actual Demo Page Content Render */}
          <div className="flex-1 overflow-y-auto w-full">
            {children}
          </div>
        </div>
      </div>

      {/* Floating Bottom Action for Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800/90 p-3 px-4 shadow-2xl flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-xs font-semibold text-white truncate max-w-[140px]">
            {demo.name}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-2 rounded-xl bg-slate-900 text-slate-300 hover:text-white border border-slate-800 text-xs flex items-center gap-1"
            title="Share this demo link"
          >
            {copiedLink ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
          </button>

          <Link
            href={`/contact?demo=${demo.slug}`}
            className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs whitespace-nowrap shadow-md shadow-indigo-600/30 flex items-center gap-1.5 transition-all"
          >
            <span>Get a Website Like This</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Demo Details Modal */}
      {showInfoModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 relative shadow-2xl text-left">
            <button
              onClick={() => setShowInfoModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-mono text-indigo-400 uppercase tracking-wider font-semibold">
                  {demo.categoryLabel} Prototype Blueprint
                </span>
                <h3 className="text-xl font-bold text-white mt-1">{demo.name}</h3>
                <p className="text-xs text-slate-400 mt-1">{demo.description}</p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800">
                <h4 className="text-xs font-semibold text-slate-300">Included Ready-Made Modules:</h4>
                <ul className="space-y-1.5">
                  {demo.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 border-t border-slate-800">
                <h4 className="text-xs font-semibold text-slate-300 mb-2">Ideal Industry Niches:</h4>
                <div className="flex flex-wrap gap-1.5">
                  {demo.idealFor.map((niche, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-md text-[11px] bg-slate-800 text-slate-300 border border-slate-700">
                      {niche}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  onClick={() => setShowInfoModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium bg-slate-800 text-slate-300 hover:text-white"
                >
                  Close
                </button>
                <Link
                  href={`/contact?demo=${demo.slug}`}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 flex items-center gap-1.5"
                >
                  <span>Get a Website Like This</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
