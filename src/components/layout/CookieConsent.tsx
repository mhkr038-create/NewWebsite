'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cookie, X, ShieldCheck, Check } from 'lucide-react';

const COOKIE_CONSENT_KEY = 'dss_cookie_consent';
const DURATION_SECONDS = 30;

export const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(DURATION_SECONDS);

  useEffect(() => {
    // Check if user has already made a persistent decision
    try {
      const saved = localStorage.getItem(COOKIE_CONSENT_KEY);
      const sessionDismissed = sessionStorage.getItem(COOKIE_CONSENT_KEY);

      if (!saved && !sessionDismissed) {
        // Small delay for smooth entry animation
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 800);
        return () => clearTimeout(timer);
      }
    } catch {
      // In case localStorage is blocked/restricted
      setIsVisible(true);
    }
  }, []);

  // 30-second countdown timer to auto-disable the notification
  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleAutoDisable();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isVisible]);

  const handleAutoDisable = () => {
    setIsVisible(false);
    try {
      sessionStorage.setItem(COOKIE_CONSENT_KEY, 'auto_disabled');
    } catch {}
  };

  const handleAcceptAll = () => {
    setIsVisible(false);
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    } catch {}
  };

  const handleNecessaryOnly = () => {
    setIsVisible(false);
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, 'necessary_only');
    } catch {}
  };

  const handleDismiss = () => {
    setIsVisible(false);
    try {
      sessionStorage.setItem(COOKIE_CONSENT_KEY, 'dismissed');
    } catch {}
  };

  if (!isVisible) return null;

  const progressPercentage = (secondsRemaining / DURATION_SECONDS) * 100;

  return (
    <aside
      aria-label="Cookie Consent Notification"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 max-w-[440px] w-[calc(100%-2rem)] animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="relative rounded-2xl bg-slate-950/95 backdrop-blur-xl border border-cyan-500/30 p-5 shadow-2xl shadow-cyan-950/70 overflow-hidden">
        {/* Subtle Top-Right Glow Accent */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Header with Icon, Title, and Close Button */}
        <div className="flex items-start justify-between gap-3 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
              <Cookie className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-heading">
                We Respect Your Privacy & Cookies
              </h4>
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-cyan-400/90 mt-0.5">
                <ShieldCheck className="w-3 h-3" />
                <span>Auto-closing in {secondsRemaining}s</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleDismiss}
            aria-label="Close cookie banner"
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Message Content */}
        <div className="mt-3 text-xs text-slate-300 leading-relaxed relative z-10">
          <p>
            We use essential and analytics cookies to optimize performance, analyze legit site telemetry, and personalize automation tools. Learn more in our{' '}
            <Link
              href="/privacy-policy"
              className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex items-center gap-2 relative z-10">
          <button
            onClick={handleAcceptAll}
            className="flex-1 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-cyan-500/20 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Accept All</span>
          </button>

          <button
            onClick={handleNecessaryOnly}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white text-xs font-semibold transition-all cursor-pointer"
          >
            <span>Necessary Only</span>
          </button>
        </div>

        {/* 30-Second Auto-Disable Progress Line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-900 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-cyan-400 transition-all duration-1000 ease-linear"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </aside>
  );
};
