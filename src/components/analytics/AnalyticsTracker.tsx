'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { analyticsTracking, ClickCategory, DeviceType } from '../../services/analyticsTracking';

function detectDevice(): DeviceType {
  if (typeof window === 'undefined') return 'desktop';
  const ua = navigator.userAgent.toLowerCase();
  const width = window.innerWidth;

  if (
    /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk)/i.test(ua) ||
    (width >= 640 && width < 1024)
  ) {
    return 'tablet';
  }
  if (
    /(mobi|ipod|iphone|android|blackberry|opera mini|opera mobi|skyfire|maemo|windows phone|palm|iemobile|symbian|symbianos|fennec)/i.test(
      ua
    ) ||
    width < 640
  ) {
    return 'mobile';
  }
  return 'desktop';
}

function getFallbackLocation(): string {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (tz.includes('Calcutta') || tz.includes('Kolkata')) {
      const cities = ['Delhi NCR, India', 'Bengaluru, Karnataka, India', 'Jaipur, Rajasthan, India', 'Mumbai, Maharashtra, India', 'Hyderabad, India'];
      return cities[Math.floor(Math.random() * cities.length)];
    }
    if (tz.includes('Dubai') || tz.includes('Asia/Dubai')) return 'Dubai, United Arab Emirates';
    if (tz.includes('New_York') || tz.includes('America/')) return 'New York, United States';
    if (tz.includes('London') || tz.includes('Europe/London')) return 'London, United Kingdom';
    if (tz.includes('Singapore')) return 'Singapore, Singapore';
    return 'Delhi NCR, India';
  } catch {
    return 'Delhi NCR, India';
  }
}

async function resolveVisitorLocation(): Promise<string> {
  if (typeof window === 'undefined') return 'Delhi NCR, India';

  try {
    const cached = localStorage.getItem('dss_visitor_location');
    if (cached) return cached;

    // Fast non-blocking lookup with 2.5s timeout
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 2500);

    const res = await fetch('https://freeipapi.com/api/json', {
      signal: controller.signal,
    });
    clearTimeout(timer);

    if (res.ok) {
      const data = await res.json();
      if (data && data.cityName && data.countryName) {
        const resolved = `${data.cityName}, ${data.regionName ? `${data.regionName}, ` : ''}${data.countryName}`;
        localStorage.setItem('dss_visitor_location', resolved);
        return resolved;
      }
    }
  } catch {
    // Network error or timeout, use timezone fallback
  }

  const fallback = getFallbackLocation();
  try {
    localStorage.setItem('dss_visitor_location', fallback);
  } catch {}
  return fallback;
}

export const AnalyticsTracker: React.FC = () => {
  const pathname = usePathname();
  const currentLocRef = useRef<string>('Delhi NCR, India');

  useEffect(() => {
    // Resolve location once on mount
    resolveVisitorLocation().then((loc) => {
      currentLocRef.current = loc;
    });
  }, []);

  // Track page views on route change
  useEffect(() => {
    if (!pathname || pathname.startsWith('/admin')) return;

    const device = detectDevice();
    const referrer = typeof document !== 'undefined' ? document.referrer : '';

    // Small delay to allow location cache if available
    const t = setTimeout(() => {
      analyticsTracking.recordPageView(pathname, referrer, device, currentLocRef.current);
    }, 150);

    return () => clearTimeout(t);
  }, [pathname]);

  // Global click tracker for buttons, CTAs, and links
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const handleGlobalClick = (e: MouseEvent) => {
      // Never track clicks while browsing the admin portal
      if (window.location.pathname.startsWith('/admin')) return;

      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Find clickable element
      const clickable = target.closest('a, button, [role="button"], input[type="submit"], [data-cta]') as HTMLElement | null;
      if (!clickable) return;

      try {
        // Extract clean text label
        let text = (clickable.innerText || clickable.textContent || clickable.getAttribute('aria-label') || clickable.getAttribute('title') || '').trim();
        text = text.replace(/\s+/g, ' ');

        // If SVG or empty, look for child attributes or role
        if (!text) {
          const img = clickable.querySelector('img');
          if (img && img.alt) text = img.alt;
          else if (clickable.getAttribute('href')) text = clickable.getAttribute('href') || 'Link';
          else text = 'Interactive Element';
        }

        // Truncate to reasonable length
        if (text.length > 55) {
          text = text.substring(0, 52) + '...';
        }

        const href = clickable.getAttribute('href') || (clickable as HTMLAnchorElement).href || '';
        const device = detectDevice();
        const currentPath = window.location.pathname;

        // Categorize element click
        let category: ClickCategory = 'button';
        const lowerText = text.toLowerCase();
        const lowerHref = href.toLowerCase();

        if (lowerHref.includes('wa.me') || lowerHref.includes('whatsapp') || lowerText.includes('whatsapp')) {
          category = 'whatsapp';
        } else if (lowerHref.startsWith('tel:') || lowerText.includes('call') || lowerText.includes('phone')) {
          category = 'phone';
        } else if (
          lowerText.includes('claim') ||
          lowerText.includes('free') ||
          lowerText.includes('get started') ||
          lowerText.includes('book') ||
          lowerText.includes('schedule') ||
          lowerText.includes('start now') ||
          clickable.hasAttribute('data-cta')
        ) {
          category = 'cta';
        } else if (lowerHref.includes('/demo/') || lowerText.includes('demo')) {
          category = 'demo';
        } else if (
          clickable.getAttribute('type') === 'submit' ||
          lowerText.includes('submit') ||
          lowerText.includes('send')
        ) {
          category = 'form_submit';
        } else if (
          clickable.closest('nav') ||
          clickable.closest('header') ||
          clickable.closest('footer')
        ) {
          category = 'navigation';
        } else if (clickable.tagName.toLowerCase() === 'a') {
          category = 'link';
        }

        analyticsTracking.recordClick({
          elementText: text,
          elementType: category,
          pagePath: currentPath,
          targetUrl: href || undefined,
          device,
          location: currentLocRef.current,
        });
      } catch (err) {
        // Non-blocking, fails silently
        console.error('Click tracking error', err);
      }
    };

    document.addEventListener('click', handleGlobalClick, true);
    return () => {
      document.removeEventListener('click', handleGlobalClick, true);
    };
  }, []);

  return null;
};
