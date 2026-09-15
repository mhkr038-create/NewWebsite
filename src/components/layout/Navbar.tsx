'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Sparkles, 
  Menu, 
  X, 
  ArrowRight, 
  Calendar, 
  Zap, 
  ChevronDown,
  Package,
  Layout,
  Share2,
  Search,
  FileText,
  MessageSquare,
  ShieldCheck
} from 'lucide-react';
import { useInquiry } from '../../context/InquiryContext';
import { GROWTH_SERVICES } from '../../data/growthServices';
import { SOLUTIONS_DATA } from '../../data/solutions';
import { SITE_CONFIG } from '../../config/siteConfig';
import { AnnouncementBanner } from './AnnouncementBanner';

const SERVICE_ICONS: Record<string, React.ElementType> = {
  Package,
  Layout,
  Share2,
  Search,
  FileText,
  MessageSquare,
};

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { openQuickModal } = useInquiry();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    setSolutionsDropdownOpen(false);
  }, [pathname]);

  interface NavLinkItem {
    name: string;
    shortName?: string;
    path: string;
    hasDropdown?: 'services' | 'solutions';
    isFlash?: boolean;
    hideOnDesktop?: boolean;
  }

  const navLinks: NavLinkItem[] = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services', hasDropdown: 'services' },
    { name: 'Solutions', path: '/solutions', hasDropdown: 'solutions' },
    { name: 'Free School ERP', shortName: 'School ERP', path: '/free-school-management-software', isFlash: true },
    { name: 'Demos', path: '/demos' },
    { name: 'Products', path: '/digital-products' },
    { name: 'Submit Request', path: '/intake-form', hideOnDesktop: true },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path.startsWith('/#')) {
      return pathname === '/';
    }
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  const handleNavClick = (path: string, e: React.MouseEvent) => {
    if (path.startsWith('/#')) {
      const targetId = path.replace('/#', '');
      if (pathname === '/') {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl shadow-indigo-950/20 py-2 sm:py-2.5'
          : 'bg-slate-950/90 backdrop-blur-lg border-b border-slate-800/50 shadow-lg shadow-black/40 py-2 sm:py-2.5'
      }`}
    >
      <AnnouncementBanner />
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mt-1.5 sm:mt-2">
        <div className="flex items-center justify-between gap-3 xl:gap-6 w-full">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1.5px] shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-300 shrink-0">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col text-left shrink-0">
              <span className="font-extrabold text-sm sm:text-base xl:text-lg tracking-tight text-white flex items-center gap-1 font-heading whitespace-nowrap">
                {SITE_CONFIG.brandName}
              </span>
              <span className="text-[9px] sm:text-[10px] text-cyan-400 tracking-wider font-mono uppercase -mt-0.5 font-semibold whitespace-nowrap">
                Digital Growth & Automation
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 bg-slate-900/90 px-2 py-1 xl:px-2.5 xl:py-1.5 rounded-full border border-slate-800/90 backdrop-blur-md shadow-xl shadow-black/50 shrink-0">
            {navLinks.filter((l) => !l.hideOnDesktop).map((link) => (
              <div
                key={link.path}
                className="relative"
                onMouseEnter={() => {
                  if (link.hasDropdown === 'services') setServicesDropdownOpen(true);
                  if (link.hasDropdown === 'solutions') setSolutionsDropdownOpen(true);
                }}
                onMouseLeave={() => {
                  if (link.hasDropdown === 'services') setServicesDropdownOpen(false);
                  if (link.hasDropdown === 'solutions') setSolutionsDropdownOpen(false);
                }}
              >
                <Link
                  href={link.path}
                  onClick={(e) => handleNavClick(link.path, e)}
                  className={`px-2.5 py-1.5 xl:px-3 xl:py-1.5 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1 xl:gap-1.5 whitespace-nowrap ${
                    link.isFlash
                      ? 'bg-gradient-to-r from-amber-500/20 via-red-500/20 to-amber-500/20 text-amber-300 border border-amber-500/50 hover:border-amber-400 font-bold shadow-md shadow-amber-500/10'
                      : isActive(link.path)
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                  }`}
                >
                  {link.isFlash && (
                    <span className="relative flex h-2 w-2 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-90" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
                    </span>
                  )}
                  <span>{link.shortName || link.name}</span>
                  {link.isFlash && (
                    <span className="px-1.5 py-0.2 bg-red-600 text-white text-[9px] font-extrabold rounded-full font-mono uppercase tracking-wider animate-blink-flash flex items-center gap-0.5 shadow-sm shrink-0">
                      <Zap className="w-2.5 h-2.5 fill-yellow-300 text-yellow-300" />
                      FREE
                    </span>
                  )}
                  {link.hasDropdown && (
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        (link.hasDropdown === 'services' && servicesDropdownOpen) ||
                        (link.hasDropdown === 'solutions' && solutionsDropdownOpen)
                          ? 'rotate-180 text-cyan-300'
                          : 'text-slate-400'
                      }`}
                    />
                  )}
                </Link>

                {/* Services Dropdown Menu */}
                {link.hasDropdown === 'services' && servicesDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-84 bg-slate-950/98 backdrop-blur-2xl border border-slate-800 rounded-2xl p-3 shadow-2xl shadow-black/90 grid grid-cols-1 gap-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-3 py-1.5 text-[10px] font-mono uppercase text-slate-400 tracking-wider border-b border-slate-800/80 mb-1 flex justify-between items-center">
                      <span>Our 6 Core Services</span>
                      <span className="text-cyan-400 font-semibold">Growth Portfolio</span>
                    </div>

                    {GROWTH_SERVICES.map((srv) => {
                      const Icon = SERVICE_ICONS[srv.icon] || Sparkles;
                      return (
                        <Link
                          key={srv.id}
                          href={srv.route}
                          className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-900 transition-colors group/item text-left"
                        >
                          <div className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center shrink-0 group-hover/item:scale-105 group-hover/item:border-cyan-400/40">
                            <Icon className="w-4 h-4 text-cyan-400" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs font-semibold text-slate-200 group-hover/item:text-cyan-300 transition-colors">
                              {srv.title}
                            </span>
                            <span className="text-[10px] text-slate-400 truncate max-w-[210px]">
                              {srv.tagline}
                            </span>
                          </div>
                        </Link>
                      );
                    })}

                    <Link
                      href="/services"
                      className="mt-1 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-indigo-400 hover:text-indigo-300 font-semibold px-2 py-1"
                    >
                      <span>Explore all services</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}

                {/* Solutions Dropdown Menu */}
                {link.hasDropdown === 'solutions' && solutionsDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-80 bg-slate-950/98 backdrop-blur-2xl border border-slate-800 rounded-2xl p-3 shadow-2xl shadow-black/90 grid grid-cols-1 gap-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-3 py-1.5 text-[10px] font-mono uppercase text-slate-400 tracking-wider border-b border-slate-800/80 mb-1 flex justify-between items-center">
                      <span>Industry Solutions</span>
                      <span className="text-cyan-400 font-semibold">8 Sectors</span>
                    </div>
                    {SOLUTIONS_DATA.slice(0, 6).map((sol) => (
                      <Link
                        key={sol.id}
                        href={`/solutions/${sol.slug}`}
                        className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-900 transition-colors group/item text-left"
                      >
                        <div className="w-2 h-2 rounded-full bg-indigo-500 group-hover/item:scale-125 transition-transform" />
                        <div className="flex flex-col">
                          <span className="text-xs font-semibold text-slate-200 group-hover/item:text-cyan-300 transition-colors">
                            {sol.title}
                          </span>
                          <span className="text-[10px] text-slate-400 truncate max-w-[220px]">
                            {sol.subtitle}
                          </span>
                        </div>
                      </Link>
                    ))}
                    <Link
                      href="/solutions"
                      className="mt-1 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-indigo-400 hover:text-indigo-300 font-semibold px-2 py-1"
                    >
                      <span>Explore all 8 Industries</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-1.5 xl:gap-2 shrink-0">
            {/* Admin Portal link */}
            <Link
              href="/admin"
              title="Admin Portal"
              className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-cyan-400 border border-slate-800 hover:border-slate-700 transition-all flex items-center justify-center cursor-pointer group shrink-0"
            >
              <ShieldCheck className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="sr-only">Admin Portal</span>
            </Link>

            {/* CTA 1: Get Started (visible on wide screens >= 1440px to preserve space on laptop widths) */}
            <button
              onClick={() => openQuickModal()}
              className="hidden 2xl:flex px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-700/80 shadow-md transition-all hover:border-slate-600 items-center gap-1.5 cursor-pointer shrink-0"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Get Started</span>
            </button>

            {/* CTA 2: Schedule a Meeting (Always visible on desktop) */}
            <Link
              href="/schedule-meeting"
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs font-bold rounded-xl group bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shrink-0"
            >
              <span className="px-3 py-1.5 xl:px-3.5 xl:py-2 transition-all ease-in duration-75 bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-[10px] flex items-center gap-1.5 text-white">
                <Calendar className="w-3.5 h-3.5 text-cyan-200" />
                <span className="whitespace-nowrap">Book Consultation</span>
              </span>
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white cursor-pointer"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/98 border-b border-slate-800 px-4 pt-3 pb-8 space-y-3 animate-in fade-in duration-200 text-left max-h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain shadow-2xl">
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleNavClick(link.path, e);
                }}
                className={`px-3.5 py-2.5 rounded-xl text-sm font-medium flex items-center justify-between transition-colors ${
                  link.isFlash
                    ? 'bg-amber-500/15 text-amber-300 border border-amber-500/40 font-bold'
                    : isActive(link.path)
                    ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                    : 'text-slate-300 hover:bg-slate-900 active:bg-slate-800'
                }`}
              >
                <span className="flex items-center gap-2 min-w-0">
                  {link.isFlash && (
                    <span className="relative flex h-2 w-2 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-90" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
                    </span>
                  )}
                  <span className="truncate">{link.name}</span>
                  {link.isFlash && (
                    <span className="px-2 py-0.5 bg-red-600 text-white text-[9px] font-extrabold rounded-full font-mono uppercase tracking-wider animate-blink-flash flex items-center gap-0.5 shadow-sm shrink-0">
                      <Zap className="w-2.5 h-2.5 fill-yellow-300 text-yellow-300" />
                      LIMITED SLOTS (₹30K FREE)
                    </span>
                  )}
                </span>
                {isActive(link.path) && <div className="w-2 h-2 rounded-full bg-indigo-400 shrink-0" />}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openQuickModal();
              }}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-200 text-center rounded-xl font-semibold text-xs border border-slate-700 flex items-center justify-center gap-2 cursor-pointer active:scale-98 transition-transform"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Get Started</span>
            </button>
            <Link
              href="/schedule-meeting"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white text-center rounded-xl font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 active:scale-98 transition-transform"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Consultation</span>
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2 text-slate-400 hover:text-slate-200 text-center rounded-xl font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Admin Management Dashboard</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
