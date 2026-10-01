'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Clock, Sparkles } from 'lucide-react';
import { ThemeConfig } from '../../types/theme';

interface CustomCodeRendererProps {
  theme: ThemeConfig;
}

export function CustomCodeRenderer({ theme }: CustomCodeRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Inject External Libraries (Scripts & CSS)
    const injectedElements: HTMLElement[] = [];

    if (Array.isArray(theme.libraries) && theme.libraries.length > 0) {
      theme.libraries.forEach((libUrl) => {
        const url = libUrl.trim();
        if (!url) return;

        if (url.endsWith('.css') || url.includes('/css') || url.includes('fonts.googleapis.com')) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = url;
          document.head.appendChild(link);
          injectedElements.push(link);
        } else {
          const script = document.createElement('script');
          script.src = url;
          script.async = true;
          document.body.appendChild(script);
          injectedElements.push(script);
        }
      });
    }

    // 2. Execute Custom JS safely if provided
    let timeoutId: NodeJS.Timeout | null = null;
    if (theme.customJs && theme.customJs.trim()) {
      timeoutId = setTimeout(() => {
        try {
          // Provide container element as context
          const runScript = new Function('container', theme.customJs!);
          if (containerRef.current) {
            runScript(containerRef.current);
          }
        } catch (err) {
          console.error('Error executing custom theme JS:', err);
        }
      }, 200);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      injectedElements.forEach((el) => {
        if (el.parentNode) {
          el.parentNode.removeChild(el);
        }
      });
    };
  }, [theme]);

  return (
    <div className="w-full min-h-screen text-slate-100 font-sans relative">
      {/* Custom Scoped CSS */}
      {theme.customCss && (
        <style dangerouslySetInnerHTML={{ __html: theme.customCss }} />
      )}

      {/* Custom HTML/Tailwind Container */}
      <div 
        ref={containerRef}
        className="w-full"
        dangerouslySetInnerHTML={{ __html: theme.customHtml || '<div className="p-12 text-center text-slate-400">Custom theme content is empty. Add code in Admin > Themes.</div>' }}
      />

      {/* If Display Mode is 'hero_replace', append the core Pillars and SchoolMIS banner */}
      {theme.displayMode === 'hero_replace' && (
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-16 space-y-12">
          {/* SchoolMIS Highlight Banner */}
          <div className="w-full p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-zinc-850 shadow-xl relative overflow-hidden group">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 space-y-3 text-left">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-750 text-zinc-200 text-[10px] font-mono uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Enterprise School ERP</span>
                  </span>
                  <span className="inline-flex items-center gap-1 bg-zinc-900/60 text-zinc-400 border border-zinc-800 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider">
                    <Clock className="w-3 h-3 text-zinc-400" />
                    <span>Limited Slots</span>
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white text-black text-[10px] font-mono font-bold uppercase tracking-wider">
                    Zero License Fee
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-light text-white font-heading">
                  SchoolMIS — Complete Cloud School Management ERP
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                  Automate student admissions, daily attendance, fee receipts, and WhatsApp alerts at zero software license cost.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    href="/free-school-management-software#enquiry-form"
                    className="px-5 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-semibold text-xs font-mono uppercase tracking-wider flex items-center gap-2"
                  >
                    <span>Claim Free License</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/free-school-management-software"
                    className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 text-xs font-mono uppercase tracking-wider"
                  >
                    <span>Explore ERP</span>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-4">
                <Link href="/free-school-management-software" className="block rounded-2xl overflow-hidden border border-zinc-800">
                  <img
                    src="/images/free-school-management-software.jpg"
                    alt="SchoolMIS Cloud Management ERP"
                    className="w-full h-auto object-cover"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
