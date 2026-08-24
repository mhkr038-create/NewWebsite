import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  Menu, 
  X, 
  ArrowRight, 
  Calendar, 
  Zap, 
  ChevronDown 
} from 'lucide-react';
import { useInquiry } from '../../context/InquiryContext';
import { SOLUTIONS_DATA } from '../../data/solutions';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { openQuickModal } = useInquiry();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    setSolutionsDropdownOpen(false);
  }, [location.key]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'AI Services', path: '/ai-services' },
    { name: 'Digital Marketing', path: '/digital-marketing' },
    { name: 'Automation', path: '/automation' },
    { name: 'Solutions', path: '/solutions', hasDropdown: true },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleScheduleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === '/' || document.getElementById('schedule-meeting')) {
      const el = document.getElementById('schedule-meeting');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    navigate('/schedule-meeting');
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
            <div className="flex flex-col text-left">
              <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1 font-heading">
                Digital<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400">Flow</span>Hub
              </span>
              <span className="text-[10px] text-slate-400 tracking-wider font-mono uppercase -mt-1 font-medium">
                AI & Digital Agency
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 bg-slate-900/70 p-1.5 rounded-full border border-slate-800/70 backdrop-blur-md">
            {navLinks.map((link) => (
              <div
                key={link.path}
                className="relative"
                onMouseEnter={() => link.hasDropdown && setSolutionsDropdownOpen(true)}
                onMouseLeave={() => link.hasDropdown && setSolutionsDropdownOpen(false)}
              >
                <Link
                  to={link.path}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1 ${
                    isActive(link.path)
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                  }`}
                >
                  {link.name}
                  {link.hasDropdown && (
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        solutionsDropdownOpen ? 'rotate-180 text-cyan-300' : 'text-slate-400'
                      }`}
                    />
                  )}
                </Link>

                {/* Solutions Dropdown Menu */}
                {link.hasDropdown && solutionsDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-80 bg-slate-900/95 backdrop-blur-2xl border border-slate-800 rounded-2xl p-3 shadow-2xl shadow-black/80 grid grid-cols-1 gap-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-3 py-1.5 text-[10px] font-mono uppercase text-slate-400 tracking-wider border-b border-slate-800/80 mb-1 flex justify-between items-center">
                      <span>Industry Solutions</span>
                      <span className="text-cyan-400 font-semibold">8 Sectors</span>
                    </div>
                    {SOLUTIONS_DATA.slice(0, 6).map((sol) => (
                      <Link
                        key={sol.id}
                        to={`/solutions/${sol.slug}`}
                        className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-800/80 transition-colors group/item text-left"
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
                      to="/solutions"
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

          {/* Two Prominent Action CTA Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* CTA 1: Get Started */}
            <button
              onClick={() => openQuickModal()}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-700/80 shadow-md transition-all hover:border-slate-600 flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Get Started</span>
            </button>

            {/* CTA 2: Schedule a Meeting */}
            <button
              onClick={handleScheduleClick}
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs font-bold rounded-xl group bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <span className="px-3.5 py-2 transition-all ease-in duration-75 bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-[10px] flex items-center gap-1.5 text-white">
                <Calendar className="w-3.5 h-3.5 text-cyan-200" />
                <span>Schedule a Meeting</span>
              </span>
            </button>
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
        <div className="lg:hidden bg-slate-950/98 border-b border-slate-800 px-4 pt-4 pb-6 space-y-3 animate-in fade-in duration-200 text-left">
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
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openQuickModal();
              }}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-200 text-center rounded-xl font-semibold text-xs border border-slate-700 flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Get Started</span>
            </button>
            <button
              onClick={(e) => {
                setMobileMenuOpen(false);
                handleScheduleClick(e);
              }}
              className="w-full py-2.5 bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white text-center rounded-xl font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Schedule a Meeting</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
