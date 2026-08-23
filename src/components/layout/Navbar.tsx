import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Sparkles, 
  Compass, 
  Menu, 
  X, 
  ArrowRight, 
  ChevronDown 
} from 'lucide-react';
import { DEMO_REGISTRY } from '../../data/demos';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demosDropdownOpen, setDemosDropdownOpen] = useState(false);

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
    setDemosDropdownOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Solutions', path: '/solutions' },
    { name: 'Demo Gallery', path: '/demos', hasDropdown: true },
    { name: 'Digital Products', path: '/products' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl shadow-indigo-950/20 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1.5px] shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1 font-heading">
                Digital<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400">Flow</span>Hub
              </span>
              <span className="text-[10px] text-slate-400 tracking-wider font-mono uppercase -mt-1 font-medium">
                See It Before You Build It
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/60 backdrop-blur-md">
            {navLinks.map((link) => (
              <div
                key={link.path}
                className="relative"
                onMouseEnter={() => link.hasDropdown && setDemosDropdownOpen(true)}
                onMouseLeave={() => link.hasDropdown && setDemosDropdownOpen(false)}
              >
                <Link
                  to={link.path}
                  className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1 ${
                    isActive(link.path)
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                  }`}
                >
                  {link.name}
                  {link.hasDropdown && (
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${demosDropdownOpen ? 'rotate-180 text-indigo-300' : 'text-slate-400'}`} />
                  )}
                </Link>

                {/* Dropdown Menu for Demos */}
                {link.hasDropdown && demosDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-80 bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-2xl p-3 shadow-2xl shadow-black/60 grid grid-cols-1 gap-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-3 py-1.5 text-[11px] font-mono uppercase text-slate-400 tracking-wider border-b border-slate-800/60 mb-1 flex justify-between items-center">
                      <span>Featured Live Demos</span>
                      <span className="text-indigo-400 font-semibold">8 Ready</span>
                    </div>
                    {DEMO_REGISTRY.slice(0, 5).map((demo) => (
                      <Link
                        key={demo.id}
                        to={demo.route}
                        className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-800/80 transition-colors group/item"
                      >
                        <div className="w-2 h-2 rounded-full bg-indigo-500 group-hover/item:scale-125 transition-transform" />
                        <div className="flex flex-col">
                          <span className="text-xs font-semibold text-slate-200 group-hover/item:text-cyan-300 transition-colors">
                            {demo.name}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {demo.categoryLabel}
                          </span>
                        </div>
                      </Link>
                    ))}
                    <Link
                      to="/demos"
                      className="mt-1 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-indigo-400 hover:text-indigo-300 font-semibold px-2 py-1"
                    >
                      <span>Explore all 8+ Demos</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              to="/demos"
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-semibold rounded-xl group bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <span className="px-4 py-2 transition-all ease-in duration-75 bg-slate-950 rounded-[10px] group-hover:bg-opacity-0 flex items-center gap-2 text-white">
                <Compass className="w-4 h-4 text-cyan-400 group-hover:rotate-45 transition-transform duration-300" />
                <span>Explore Demos</span>
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/98 border-b border-slate-800 px-4 pt-4 pb-6 space-y-3 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium flex items-center justify-between ${
                  isActive(link.path)
                    ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <span>{link.name}</span>
                {isActive(link.path) && <div className="w-2 h-2 rounded-full bg-indigo-400" />}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2">
            <Link
              to="/demos"
              className="w-full py-2.5 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white text-center rounded-xl font-semibold text-sm shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4" />
              <span>Explore Demos</span>
            </Link>
            <Link
              to="/contact"
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-200 text-center rounded-xl font-semibold text-sm border border-slate-700/60"
            >
              Get a Custom Website
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
