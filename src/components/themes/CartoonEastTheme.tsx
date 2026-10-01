'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Folder, 
  FileText, 
  MessageCircle, 
  Download, 
  X, 
  ExternalLink, 
  ChevronLeft, 
  ChevronRight,
  ArrowUpRight,
  Layers,
  Sparkles,
  MonitorPlay
} from 'lucide-react';

interface ProjectItem {
  id: string;
  title: string;
  type: 'folder' | 'file';
  category: string;
  client: string;
  year: string;
  description: string;
  metrics?: string;
  image: string;
  tags: string[];
  link?: string;
}

const PROJECTS: ProjectItem[] = [
  {
    id: 'redmi-note-12',
    title: 'Redmi Note 12',
    type: 'folder',
    category: 'Brand Campaign & 3D Visual Direction',
    client: 'Xiaomi / Redmi',
    year: '2023-2024',
    description: 'Lead visual design and 3D device campaign for the launch of the Redmi Note 12 5G series across digital, outdoor billboards, and social retail assets.',
    metrics: 'Over 50M+ digital impressions & record-breaking launch day sales.',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200&auto=format&fit=crop&q=80',
    tags: ['3D CGI', 'Visual Direction', 'Launch Campaign', 'Outdoor Media']
  },
  {
    id: 'drivex-diwali',
    title: 'DriveX Diwali',
    type: 'folder',
    category: 'Festive Marketing & Brand Identity',
    client: 'DriveX Mobility',
    year: '2023',
    description: 'Comprehensive festive brand design and performance creative rollout resulting in massive engagement and multi-channel footfall during the Diwali season.',
    metrics: '420% increase in campaign ROAS and national brand visibility.',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1200&auto=format&fit=crop&q=80',
    tags: ['Brand Identity', 'Festive Campaign', 'Performance Creatives', 'Motion Graphics']
  },
  {
    id: 'marketplace-creatives',
    title: 'Marketplace Creatives',
    type: 'folder',
    category: 'High-Converting E-Commerce Assets',
    client: 'E-Commerce Marketplace',
    year: '2023-2024',
    description: 'Performance-driven advertising systems, catalog visuals, and high-impact banners designed for high conversion across Meta, Google, and Amazon.',
    metrics: 'Tested over 250+ variants with continuous positive conversion lift.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&auto=format&fit=crop&q=80',
    tags: ['E-Commerce Ads', 'CRO', 'Product Catalog', 'Social Ads']
  },
  {
    id: 'banner-refresh',
    title: 'Banner Refresh',
    type: 'folder',
    category: 'UI/UX & Digital Display Systems',
    client: 'Global Consumer Tech',
    year: '2024',
    description: 'A ground-up redesign of responsive display banners, interactive marketing modules, and landing page touchpoints built for speed and engagement.',
    metrics: 'Standardized design system adopted across 8 regional teams.',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&auto=format&fit=crop&q=80',
    tags: ['Design System', 'Digital Display', 'Responsive Web', 'Typography']
  },
  {
    id: 'schoolmis-erp',
    title: 'SchoolMIS Desktop ERP',
    type: 'folder',
    category: 'Desktop Software & Cloud License Engine',
    client: 'Education Institutions & Schools',
    year: '2024-2026',
    description: 'Modern offline-first School Management ERP for Windows paired with a cloud-connected licensing and auto-update architecture and Gmail OTP password recovery.',
    metrics: 'Deployed in active schools with 100% offline uptime & instant updates.',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&auto=format&fit=crop&q=80',
    tags: ['Desktop ERP', 'Electron', 'License Server', 'Security & OTP'],
    link: '/free-school-management-software'
  },
  {
    id: 'artworks',
    title: 'Artworks',
    type: 'file',
    category: 'Visual Explorations & Creative Direction',
    client: 'Studio Personal Work',
    year: '2020-2026',
    description: 'A curated selection of personal visual art, 3D abstract compositions, typography experiments, and generative visual studies.',
    metrics: 'Featured across international design communities & Behance curate.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
    tags: ['Abstract 3D', 'Editorial Typography', 'Generative Art', 'Key Visuals']
  }
];

const CARD_VIDEOS = [
  {
    id: 'memeboss',
    video: 'https://hnjbexpbcrnysfepjwst.supabase.co/storage/v1/object/public/portfolio-assets/public/Videos/Me/MemeBoss_optimized.mp4',
    title: 'Design In Motion',
    subtitle: 'Behind the Scenes & Ideation'
  },
  {
    id: 'kalimba',
    video: 'https://hnjbexpbcrnysfepjwst.supabase.co/storage/v1/object/public/portfolio-assets/public/Videos/Me/kalimba_optimized.mp4',
    title: 'Rhythm & Precision',
    subtitle: 'Acoustic Harmonies'
  },
  {
    id: 'farzi',
    video: 'https://hnjbexpbcrnysfepjwst.supabase.co/storage/v1/object/public/portfolio-assets/public/Videos/Me/Farzi_optimized.mp4',
    title: 'Creative Pulse',
    subtitle: 'Life Outside Keyframes'
  }
];

export function CartoonEastTheme() {
  const [activeSection, setActiveSection] = useState<'home' | 'works' | 'timeline' | 'about' | 'contact'>('home');
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [cardOrder, setCardOrder] = useState<number[]>([0, 1, 2]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStartX, setDragStartX] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);

  // Monitor active section via IntersectionObserver
  useEffect(() => {
    const sectionIds: Array<'home' | 'works' | 'timeline' | 'about' | 'contact'> = [
      'home',
      'works',
      'timeline',
      'about',
      'contact'
    ];

    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { threshold: 0.45 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  const scrollToSection = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNextCard = () => {
    setCardOrder((prev) => {
      const next = [...prev];
      const top = next.shift();
      if (top !== undefined) next.push(top);
      return next;
    });
  };

  const handlePrevCard = () => {
    setCardOrder((prev) => {
      const next = [...prev];
      const last = next.pop();
      if (last !== undefined) next.unshift(last);
      return next;
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    const diff = e.clientX - dragStartX;
    if (diff > 50) handlePrevCard();
    else if (diff < -50) handleNextCard();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setDragStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    const diff = e.changedTouches[0].clientX - dragStartX;
    if (diff > 50) handlePrevCard();
    else if (diff < -50) handleNextCard();
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth font-quicksand bg-[#f5f5f5] text-[#1c1c1c] selection:bg-[#1c1c1c] selection:text-white"
      style={{ scrollBehavior: 'smooth' }}
    >
      {/* ── 1. FIXED BACKGROUND VIDEO LAYERS (Seamless Crossfade) ────── */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        {/* Section 1 Layer (Home) */}
        <div 
          className="fixed inset-0 w-full h-full bg-[#f5f5f5] transition-opacity duration-1000 ease-in-out"
          style={{ opacity: activeSection === 'home' ? 1 : 0, zIndex: activeSection === 'home' ? 5 : 1 }}
        >
          {/* Desktop Video */}
          <video
            autoPlay
            muted
            playsInline
            loop
            className="hidden lg:block absolute lg:inset-0 lg:w-full lg:h-full object-cover lg:object-center"
          >
            <source 
              src="https://hnjbexpbcrnysfepjwst.supabase.co/storage/v1/object/public/portfolio-assets/public/Video/1_optimized.mp4" 
              type="video/mp4" 
            />
          </video>
          {/* Mobile Video */}
          <video
            autoPlay
            muted
            playsInline
            loop
            className="block lg:hidden absolute bottom-0 w-full h-[50vh] object-cover object-[center_top]"
          >
            <source 
              src="https://hnjbexpbcrnysfepjwst.supabase.co/storage/v1/object/public/portfolio-assets/public/Video/M/M1_optimized.mp4" 
              type="video/mp4" 
            />
          </video>
        </div>

        {/* Section 2 Layer (Works) */}
        <div 
          className="fixed inset-0 w-full h-full bg-[#f5f5f5] transition-opacity duration-1000 ease-in-out"
          style={{ opacity: activeSection === 'works' ? 1 : 0, zIndex: activeSection === 'works' ? 5 : 1 }}
        >
          {/* Desktop Video */}
          <video
            autoPlay
            muted
            playsInline
            loop
            className="hidden lg:block absolute lg:inset-0 lg:w-full lg:h-full object-cover lg:object-center"
          >
            <source 
              src="https://hnjbexpbcrnysfepjwst.supabase.co/storage/v1/object/public/portfolio-assets/public/Video/2_optimized.mp4" 
              type="video/mp4" 
            />
          </video>
          {/* Mobile Video */}
          <video
            autoPlay
            muted
            playsInline
            loop
            className="block lg:hidden absolute bottom-0 w-full h-[50vh] object-cover object-[center_top]"
          >
            <source 
              src="https://hnjbexpbcrnysfepjwst.supabase.co/storage/v1/object/public/portfolio-assets/public/Video/M/M2_optimized.mp4" 
              type="video/mp4" 
            />
          </video>
        </div>

        {/* Section 3, 4, 5 Base Layers */}
        <div 
          className="fixed inset-0 w-full h-full bg-[#f5f5f5] transition-opacity duration-1000 ease-in-out"
          style={{ 
            opacity: ['timeline', 'about', 'contact'].includes(activeSection) ? 1 : 0, 
            zIndex: ['timeline', 'about', 'contact'].includes(activeSection) ? 5 : 1 
          }}
        />
      </div>

      {/* ── 2. AWWWARDS FLOATING SIDE RIBBON ───────────────────────── */}
      <div 
        id="awwwards" 
        className="fixed z-50 top-1/2 -translate-y-1/2 right-0 hidden sm:block pointer-events-auto"
      >
        <a 
          href="https://www.awwwards.com/sites/cartooneast-portfolio" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block hover:opacity-90 transition-opacity"
          title="Awwwards Site of the Day / Honorable Mention"
        >
          <svg width="53.08" height="171.358">
            <path fill="#5ABDB2" d="M0 0h53.08v171.358H0z" />
            <g fill="#fff">
              <path d="M20.048 153.585v-2.002l6.752-3.757h-6.752v-1.9h10.23v2.002l-6.752 3.757h6.752v1.9zM29.899 142.382a3.317 3.317 0 0 1-1.359 1.293c-.575.297-1.223.446-1.944.446-.721 0-1.369-.149-1.944-.446a3.317 3.317 0 0 1-1.359-1.293c-.331-.564-.497-1.232-.497-2.003 0-.769.166-1.437.497-2.002a3.332 3.332 0 0 1 1.359-1.294c.575-.297 1.224-.445 1.944-.445.722 0 1.369.148 1.944.445a3.326 3.326 0 0 1 1.359 1.294c.33.565.496 1.233.496 2.002.001.77-.166 1.438-.496 2.003m-1.703-3.348c-.435-.331-.967-.497-1.601-.497s-1.167.166-1.601.497c-.434.332-.65.78-.65 1.345s.217 1.014.65 1.346c.434.33.967.496 1.601.496s1.166-.166 1.601-.496c.434-.332.649-.78.649-1.346.001-.565-.215-1.013-.649-1.345M22.912 134.996v-1.812h1.185c-.43-.283-.752-.593-.973-.929-.219-.336-.329-.732-.329-1.19 0-.479.127-.902.38-1.272.254-.37.635-.633 1.141-.79-.478-.262-.851-.591-1.118-.985a2.221 2.221 0 0 1-.402-1.265c0-.682.2-1.218.599-1.607.4-.391.957-.585 1.668-.585h5.218v1.812H25.37c-.682 0-1.023.303-1.023.907 0 .467.264.85.789 1.146.527.299 1.286.446 2.28.446h2.865v1.813H25.37c-.682 0-1.023.303-1.023.906 0 .468.275.851.826 1.147.551.298 1.352.446 2.404.446h2.704v1.812h-7.369zM21.626 122.457c-.225.224-.502.336-.833.336s-.608-.112-.833-.336a1.128 1.128 0 0 1-.336-.833c0-.331.111-.609.336-.833.225-.225.502-.336.833-.336s.608.111.833.336c.225.224.337.502.337.833 0 .332-.112.608-.337.833m1.286-1.739h7.366v1.813h-7.366v-1.813zM22.912 118.668v-1.812h1.185a3.348 3.348 0 0 1-.951-1.009 2.434 2.434 0 0 1-.351-1.272c0-.681.19-1.229.57-1.644.38-.414.931-.621 1.651-.621h5.263v1.812h-4.722c-.418 0-.727.096-.92.285-.195.19-.293.447-.293.769 0 .302.116.58.351.833.233.254.577.458 1.03.613.453.156.992.234 1.615.234h2.938v1.812h-7.366zM29.833 109.129a3.33 3.33 0 0 1-1.432 1.169 4.535 4.535 0 0 1-1.805.373 4.537 4.537 0 0 1-1.807-.373c-.579-.248-1.057-.638-1.432-1.169s-.563-1.196-.563-1.995c0-.771.183-1.413.549-1.93a3.28 3.28 0 0 1 1.382-1.141 4.221 4.221 0 0 1 1.709-.364h.746v5.071c.447-.02.838-.183 1.168-.49.332-.307.498-.724.498-1.248 0-.41-.093-.754-.277-1.031-.186-.278-.473-.529-.863-.753l.542-1.462c.69.303 1.224.724 1.592 1.265.371.541.556 1.235.556 2.083 0 .799-.188 1.464-.563 1.995m-4.085-3.574c-.41.088-.746.261-1.009.52-.262.258-.395.61-.395 1.06 0 .428.137.784.409 1.067.272.282.604.458.994.525v-3.172zM29.833 100.878c-.375.531-.852.921-1.432 1.169a4.552 4.552 0 0 1-3.612 0c-.579-.248-1.057-.638-1.432-1.169s-.563-1.196-.563-1.995c0-.77.183-1.412.549-1.93a3.278 3.278 0 0 1 1.382-1.14 4.222 4.222 0 0 1 1.709-.365h.746v5.072a1.794 1.794 0 0 0 1.168-.49c.332-.307.498-.724.498-1.249 0-.41-.093-.753-.277-1.031-.186-.277-.473-.528-.863-.753l.542-1.462c.69.302 1.224.724 1.592 1.265.371.541.556 1.234.556 2.083 0 .799-.188 1.464-.563 1.995m-4.085-3.573c-.41.088-.746.261-1.009.519-.262.258-.395.611-.395 1.06 0 .429.137.784.409 1.067.272.282.604.458.994.526v-3.172zM35.481 16.926l-4.782 14.969h-3.266l-2.584-9.682-2.584 9.682h-3.268l-4.781-14.969h3.713l2.673 10.276 2.524-10.276h3.445l2.524 10.276 2.674-10.276zM37.979 27.083c1.426 0 2.495 1.068 2.495 2.495 0 1.425-1.069 2.495-2.495 2.495-1.425 0-2.495-1.07-2.495-2.495-.001-1.427 1.07-2.495 2.495-2.495" />
            </g>
          </svg>
        </a>
      </div>

      {/* ── 3. FLOATING MINIMALIST HEADER ──────────────────────────── */}
      <header className="fixed top-0 left-0 w-full z-[9999] px-6 py-6 lg:px-12 lg:py-12 mix-blend-difference font-quicksand text-white pointer-events-auto">
        <div className="flex justify-between items-center w-full">
          <div>
            <button 
              onClick={() => scrollToSection('home')}
              className="text-left font-bold tracking-tight text-lg md:text-xl cursor-pointer hover:opacity-80 transition-opacity"
            >
              Cartooneast <span className="opacity-60 text-xs font-normal ml-1">/ DSS</span>
            </button>
          </div>

          <div>
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="focus:outline-none cursor-pointer p-1 group"
              aria-label="Toggle navigation menu"
            >
              <svg 
                strokeWidth="2.5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 32 32" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className={`transition-transform ease-in-out w-8 h-8 duration-500 ${menuOpen ? 'rotate-90' : ''}`}
              >
                <path 
                  className="transition-all ease-in-out duration-500"
                  style={{ strokeDasharray: menuOpen ? '63 63' : '12 63' }}
                  d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
                />
                <path d="M7 16 27 16" className={`transition-opacity duration-300 ${menuOpen ? 'opacity-0' : 'opacity-100'}`} />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* ── FULLSCREEN NAVIGATION OVERLAY ──────────────────────────── */}
      {menuOpen && (
        <div className="fixed inset-0 z-[9998] bg-[#0c0c0c]/95 backdrop-blur-xl text-white flex flex-col justify-between p-8 sm:p-12 lg:p-16 animate-in fade-in duration-300 font-quicksand">
          <div className="flex justify-between items-center">
            <span className="text-xs uppercase tracking-widest text-neutral-400 font-mono">
              Directory // Navigation
            </span>
            <button
              onClick={() => setMenuOpen(false)}
              className="text-neutral-400 hover:text-white p-2 text-sm cursor-pointer"
            >
              Close ✕
            </button>
          </div>

          <nav className="my-auto max-w-3xl space-y-4 sm:space-y-6">
            {[
              { num: '01', name: 'Home', id: 'home' },
              { num: '02', name: 'Works', id: 'works' },
              { num: '03', name: 'Journey & Colabs', id: 'timeline' },
              { num: '04', name: 'About', id: 'about' },
              { num: '05', name: 'Contact', id: 'contact' }
            ].map((item) => (
              <div key={item.id} className="group">
                <button
                  onClick={() => scrollToSection(item.id)}
                  className="flex items-baseline gap-4 text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight hover:translate-x-3 transition-transform cursor-pointer text-left w-full text-white/90 hover:text-white"
                >
                  <span className="text-xs sm:text-sm font-mono text-neutral-500 font-normal">
                    {item.num}
                  </span>
                  <span>{item.name}</span>
                </button>
              </div>
            ))}

            {/* Extra App & Service Links */}
            <div className="pt-6 sm:pt-8 border-t border-white/10 flex flex-wrap gap-4 text-xs font-mono uppercase tracking-wider text-neutral-400">
              <Link href="/free-school-management-software" className="hover:text-cyan-400 transition-colors">
                🏫 Free School MIS
              </Link>
              <span>•</span>
              <Link href="/solutions" className="hover:text-cyan-400 transition-colors">
                ⚡ Solutions & AI
              </Link>
              <span>•</span>
              <Link href="/admin" className="hover:text-cyan-400 transition-colors">
                🔐 Admin Portal
              </Link>
              <span>•</span>
              <a href="https://wa.me/918500699708" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
                💬 WhatsApp Direct
              </a>
            </div>
          </nav>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs text-neutral-500 font-mono gap-2">
            <span>Digital Simple Solution • Anurag Bandyopadhyay Design</span>
            <span>Bangalore, India • Available for Global Projects</span>
          </div>
        </div>
      )}

      {/* ── 4. SECTION 1: #HOME (Hero) ──────────────────────────────── */}
      <section id="home" className="snap-start min-h-screen h-screen flex flex-col justify-center relative bg-transparent z-10">
        <div className="absolute top-0 lg:relative w-full h-[50vh] lg:h-full flex flex-col justify-center px-6 md:px-12 pr-6 md:pr-16 lg:pr-24 pt-10 lg:pt-0">
          <div className="w-full mx-auto text-[#1c1c1c] space-y-2 text-center lg:translate-y-[-10%] lg:text-right lg:ml-auto lg:mr-0 lg:max-w-4xl">
            <p className="text-xl md:text-3xl font-medium opacity-100 font-quicksand">Hi,</p>
            <h1 className="text-5xl sm:text-6xl md:text-7.5xl lg:text-[5rem] font-bold tracking-tight font-quicksand">
              I design.
            </h1>
            <h1 className="text-5xl sm:text-6xl md:text-8.5xl lg:text-[5rem] font-bold tracking-tight leading-[0.85] font-quicksand">
              Brands grow.<br/> 
              <span className="block mt-2 md:mt-4">Simple.</span>
            </h1>
          </div>

          <div className="hidden md:flex absolute bottom-4 lg:bottom-16 left-0 right-0 lg:left-auto px-6 lg:px-0 flex-col items-center lg:items-end text-[#1c1c1c] lg:-translate-x-[23%] w-full lg:w-auto z-10">
            <div className="inline-flex flex-col w-max">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-tight text-center lg:text-right">
                <a 
                  href="https://www.linkedin.com/in/anurag-bandyopadhyay-a4430713a/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-inherit no-underline hover:opacity-80 transition-opacity"
                >
                  Anurag Bandyopadhyay
                </a>
              </h1>
              <div className="flex justify-between w-full lg:justify-end lg:w-auto lg:gap-16 text-base md:text-lg lg:text-xl font-medium opacity-80 leading-none mt-2 lg:mt-1">
                <p>Senior Visual Designer</p>
                <p>(6 years)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. SECTION 2: #WORKS (Interactive Folders Directory) ────── */}
      <section id="works" className="snap-start min-h-screen h-screen flex flex-col justify-center relative bg-transparent z-10">
        <div className="absolute top-0 lg:relative container mx-auto px-6 md:px-12 w-full h-[50vh] lg:h-full flex flex-col justify-center pt-10 lg:pt-0">
          <div className="w-full flex justify-center lg:justify-end">
            <div className="flex flex-col items-start gap-8 w-full lg:max-w-[50%] lg:translate-x-48">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#1c1c1c] text-left lg:whitespace-nowrap">
                Works
              </h2>

              <div className="w-full lg:pl-4 mt-2 md:mt-6">
                <div className="flex flex-col gap-2 md:gap-4 w-full">
                  {PROJECTS.map((proj) => (
                    <div key={proj.id} className="w-full">
                      <div 
                        onClick={() => setSelectedProject(proj)}
                        className="flex items-center gap-3 md:gap-4 py-2 cursor-pointer text-[#1c1c1c] hover:opacity-70 transition-all group"
                      >
                        <div className="shrink-0 text-current transition-transform group-hover:scale-110">
                          {proj.type === 'folder' ? (
                            <Folder className="w-6 h-6 md:w-8 md:h-8 stroke-[1.5]" />
                          ) : (
                            <FileText className="w-6 h-6 md:w-8 md:h-8 stroke-[1.5]" />
                          )}
                        </div>
                        <span className="font-medium tracking-tight text-xl md:text-3xl select-none">
                          {proj.title}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. SECTION 3: #TIMELINE (The Design Journey & Colabs) ───── */}
      <section id="timeline" className="snap-start min-h-screen h-screen flex flex-col justify-center relative bg-transparent z-10">
        <div className="absolute top-0 lg:relative container mx-auto px-6 md:px-12 w-full h-[50vh] lg:h-full flex items-center justify-center lg:justify-end pt-10 lg:pt-0">
          <div className="flex flex-col items-center gap-6 md:gap-10 w-full lg:max-w-[50%]">
            <div className="flex flex-col items-center gap-4 md:gap-6 w-full">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#1c1c1c] text-center">
                The Design Journey
              </h2>
              <div className="w-full flex justify-center">
                <div className="w-[65%] md:w-[50%] lg:w-[70%]">
                  <img 
                    src="https://hnjbexpbcrnysfepjwst.supabase.co/storage/v1/object/public/portfolio-assets/public/Sections/timeline.optimized.png" 
                    alt="The Design Journey Roadmap" 
                    className="w-full h-auto object-contain select-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 md:gap-4 lg:gap-6 w-full">
              <h2 className="text-xs md:text-sm lg:text-2xl font-bold tracking-tight text-[#1c1c1c] text-center">
                Some Notable Colabs
              </h2>
              <div className="w-full flex justify-center">
                <div className="w-[55%] md:w-[48%] lg:w-[90%]">
                  <img 
                    src="https://hnjbexpbcrnysfepjwst.supabase.co/storage/v1/object/public/portfolio-assets/public/Sections/collaborations.optimized.png" 
                    alt="Notable Collaborations & Brands" 
                    className="w-full h-auto object-contain select-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. SECTION 4: #ABOUT (Interactive 3D Video Card Stack) ─── */}
      <section id="about" className="snap-start min-h-screen h-screen flex flex-col justify-center relative bg-transparent z-10">
        <div className="absolute top-0 lg:relative container mx-auto px-6 md:px-12 w-full h-[50vh] lg:h-full flex flex-col justify-center pt-10 lg:pt-0">
          <div className="w-full max-w-2xl xl:max-w-3xl mx-auto md:ml-auto md:mr-0 flex flex-col gap-3 lg:gap-8 pt-6 lg:pt-0">
            <div className="w-full text-center overflow-visible lg:translate-x-0 lg:-translate-x-[5%] mb-2 lg:mb-0 px-2 lg:px-0">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#1c1c1c] leading-tight drop-shadow-sm lg:whitespace-nowrap">
                This Is Where It Gets Personal.
              </h2>
            </div>

            <div className="w-full flex items-center justify-center lg:justify-end lg:pr-12 pointer-events-auto mt-8 lg:mt-20 mb-10">
              <div 
                className="relative flex items-center justify-center w-full max-w-lg min-h-[320px] lg:min-h-[450px] my-6 lg:my-0 select-none cursor-grab active:cursor-grabbing"
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                {cardOrder.map((cardIndex, stackPos) => {
                  const item = CARD_VIDEOS[cardIndex];
                  const zIndex = 50 - stackPos * 10;
                  const scale = 1 - stackPos * 0.05;
                  const translateY = stackPos * 14;
                  const rotate = stackPos === 0 ? 0 : stackPos === 1 ? -4 : 4;
                  const opacity = stackPos > 2 ? 0 : 1 - stackPos * 0.15;

                  return (
                    <div
                      key={item.id}
                      className="absolute origin-bottom-center overflow-hidden rounded-2xl shadow-2xl bg-white border border-black/10 transition-all duration-300 w-[52%] sm:w-[300px] aspect-[5/7]"
                      style={{
                        zIndex,
                        transform: `translateY(${translateY}px) scale(${scale}) rotate(${rotate}deg)`,
                        opacity
                      }}
                    >
                      <video
                        src={item.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover pointer-events-none"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                        <span className="font-bold text-sm">{item.title}</span>
                        <span className="text-[11px] opacity-80">{item.subtitle}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Card control arrows */}
            <div className="flex justify-center lg:justify-end lg:pr-24 gap-3 z-20">
              <button
                onClick={handlePrevCard}
                className="p-2.5 rounded-full bg-white/80 hover:bg-white shadow-md border border-black/10 text-black cursor-pointer transition-transform hover:scale-110"
                title="Previous card"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextCard}
                className="p-2.5 rounded-full bg-white/80 hover:bg-white shadow-md border border-black/10 text-black cursor-pointer transition-transform hover:scale-110"
                title="Next card"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. SECTION 5: #CONTACT (Dock & Download Pill) ─────────── */}
      <section id="contact" className="snap-start min-h-screen h-screen flex flex-col justify-center relative bg-transparent z-10">
        <div className="absolute top-0 min-[1025px]:relative container mx-auto px-6 md:px-12 w-full h-[65vh] sm:h-[55vh] md:h-[50vh] min-[1025px]:h-full flex flex-col justify-start md:justify-center pt-24 sm:pt-20 md:pt-10 min-[1025px]:pt-0">
          <div className="max-w-4xl mx-auto min-[1025px]:ml-auto min-[1025px]:mr-0 text-center min-[1025px]:text-right space-y-6 lg:space-y-12 text-[#1c1c1c]">
            <div className="space-y-2">
              <h2 className="text-[1.8rem] md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                You&apos;ve Reached The End.
              </h2>
              <p className="text-lg md:text-3xl font-medium opacity-80">
                Or The Beginning.
              </p>
            </div>

            <div className="space-y-6 md:space-y-8">
              <div>
                <p className="text-lg font-medium opacity-40 mb-1 md:mb-2">Mail me</p>
                <a 
                  href="mailto:info@digitalsimplesolution.online" 
                  className="text-2xl md:text-4xl font-bold hover:underline"
                >
                  info@digitalsimplesolution.online
                </a>
              </div>

              <div>
                <p className="text-lg font-medium opacity-40 mb-1 md:mb-2">Meet me in</p>
                <p className="text-2xl md:text-4xl font-bold">Bangalore</p>
              </div>

              <div>
                <p className="text-lg font-medium opacity-40 mb-2">or stalk my profiles</p>
                <div className="flex justify-center min-[1025px]:justify-end relative z-10 w-full mt-4 min-[1025px]:mt-0 min-[1025px]:-mr-4">
                  <div className="flex w-full items-center justify-center min-[1025px]:justify-end bg-transparent">
                    {/* macOS Style Dock */}
                    <div className="flex h-20 items-end gap-4 rounded-2xl bg-black/5 px-4 pb-4 shadow-sm border border-black/5">
                      <a 
                        href="https://www.linkedin.com/in/anurag-bandyopadhyay-a4430713a/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="aspect-square rounded-full bg-black text-white grid place-items-center cursor-pointer shadow-sm hover:scale-125 transition-transform duration-200" 
                        style={{ width: '48px' }}
                        title="LinkedIn"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                          <rect width="4" height="12" x="2" y="9"></rect>
                          <circle cx="4" cy="4" r="2"></circle>
                        </svg>
                      </a>

                      <a 
                        href="https://www.instagram.com/lucidgrapher/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="aspect-square rounded-full bg-black text-white grid place-items-center cursor-pointer shadow-sm hover:scale-125 transition-transform duration-200" 
                        style={{ width: '48px' }}
                        title="Instagram"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                        </svg>
                      </a>

                      <a 
                        href="https://www.behance.net/anurag19" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="aspect-square rounded-full bg-black text-white grid place-items-center cursor-pointer shadow-sm hover:scale-125 transition-transform duration-200" 
                        style={{ width: '48px' }}
                        title="Behance Portfolio"
                      >
                        <MonitorPlay className="w-5 h-5" />
                      </a>

                      <a 
                        href="https://wa.me/918500699708" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="aspect-square rounded-full bg-black text-white grid place-items-center cursor-pointer shadow-sm hover:scale-125 transition-transform duration-200" 
                        style={{ width: '48px' }}
                        title="WhatsApp Direct"
                      >
                        <MessageCircle className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Download Button */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 lg:bottom-12 lg:left-auto lg:translate-x-0 lg:right-12 z-[100]">
          <div className="flex justify-center items-center">
            <Link
              href="/intake-form"
              className="relative flex items-center border-[1.5px] rounded-full overflow-hidden transition-all shadow-xl bg-white cursor-pointer border-black/10 hover:border-black/30 group pr-6"
              style={{ height: '56px' }}
            >
              <div className="h-14 w-14 rounded-full bg-black flex justify-center items-center relative shadow-lg z-10 shrink-0 group-hover:scale-105 transition-transform">
                <Download className="w-6 h-6 text-white z-20 group-hover:translate-y-0.5 transition-transform" />
              </div>
              <span className="ml-4 text-black font-semibold text-base whitespace-nowrap select-none z-10 tracking-tight">
                Download Resume / Profile
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 9. PROJECT CASE STUDY MODAL ────────────────────────────── */}
      {selectedProject && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#18181b] border border-white/10 text-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6 animate-in zoom-in-95">
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
                  <span>{selectedProject.client}</span>
                  <span>•</span>
                  <span>{selectedProject.year}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  {selectedProject.title}
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  {selectedProject.category}
                </p>
              </div>

              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden aspect-video border border-white/10 bg-neutral-900">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-mono uppercase text-neutral-400 tracking-wider mb-1.5">
                  Project Brief
                </h4>
                <p className="text-neutral-300 text-sm leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              {selectedProject.metrics && (
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-xs font-mono text-emerald-400 font-semibold block mb-1">
                    ⚡ Key Impact & Results
                  </span>
                  <span className="text-neutral-200 text-xs">
                    {selectedProject.metrics}
                  </span>
                </div>
              )}

              <div>
                <h4 className="text-xs font-mono uppercase text-neutral-400 tracking-wider mb-2">
                  Specialties & Deliverables
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-white/10 text-neutral-200 border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-white/10">
              {selectedProject.link ? (
                <Link
                  href={selectedProject.link}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-semibold text-xs font-mono uppercase tracking-wider hover:bg-neutral-200 transition-colors"
                >
                  <span>Explore Software</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              ) : (
                <a
                  href="https://wa.me/918500699708?text=Hello!%20I'm%20interested%20in%20learning%20more%20about%20your%20project:%20"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-semibold text-xs font-mono uppercase tracking-wider hover:bg-neutral-200 transition-colors"
                >
                  <span>Inquire About Project</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              <button
                onClick={() => setSelectedProject(null)}
                className="text-xs font-mono text-neutral-400 hover:text-white cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
