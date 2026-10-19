import React from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Mail, 
  Phone, 
  ArrowRight, 
  TrendingUp, 
  ShieldCheck,
  MessageCircle
} from 'lucide-react';
import { SITE_CONFIG } from '../../config/siteConfig';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#070709] border-t border-zinc-800 pt-12 sm:pt-16 pb-12 relative text-left font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Directory - Single Column Mobile First */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-zinc-800">
          
          {/* Col 1: Brand & Contact */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-sm bg-zinc-900 border border-zinc-750 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-zinc-200" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-base tracking-tight text-white font-heading">
                  {SITE_CONFIG.brandName}
                </span>
                <span className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider -mt-0.5">
                  Architecture &amp; Automation
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
              High-performance web architecture, zero-license cloud ERPs, and autonomous 24/7 WhatsApp AI systems.
            </p>

            <div className="space-y-2 pt-1 text-xs font-mono">
              <div className="flex items-center gap-2 text-zinc-300 min-h-[36px]">
                <Mail className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="hover:text-white transition-colors underline underline-offset-2 break-all"
                >
                  {SITE_CONFIG.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-zinc-300 min-h-[36px]">
                <Phone className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <a
                  href={`tel:${SITE_CONFIG.contact.phone}`}
                  className="hover:text-white transition-colors"
                >
                  {SITE_CONFIG.contact.displayPhone}
                </a>
              </div>
              <div className="flex items-center gap-2 text-emerald-400 min-h-[36px]">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a
                  href={`https://wa.me/${SITE_CONFIG.contact.whatsappNumber}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-300 font-semibold transition-colors"
                >
                  Direct WhatsApp Dispatch
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-bold mb-3 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <span>Core Practices</span>
            </h4>
            <ul className="space-y-1 text-xs sm:text-sm text-zinc-400 font-mono">
              <li>
                <Link href="/landing-pages" className="hover:text-white transition-colors flex items-center min-h-[40px]">
                  Next.js Landing Platforms
                </Link>
              </li>
              <li>
                <Link href="/whatsapp-automation" className="hover:text-white transition-colors flex items-center min-h-[40px]">
                  WhatsApp Cloud Automation
                </Link>
              </li>
              <li>
                <Link href="/meta-ads" className="hover:text-white transition-colors flex items-center min-h-[40px]">
                  Paid Media &amp; CAPI Funnels
                </Link>
              </li>
              <li>
                <Link href="/free-school-management-software" className="text-zinc-200 hover:text-white transition-colors flex items-center gap-1.5 min-h-[40px]">
                  <span className="w-1.5 h-1.5 bg-emerald-400 shrink-0" />
                  <span>SchoolMIS Cloud ERP [₹0 Fee]</span>
                </Link>
              </li>
              <li>
                <Link href="/demos" className="hover:text-white transition-colors flex items-center min-h-[40px]">
                  Interactive Work Archive [8]
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Company & Governance */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-bold mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
              <span>Company</span>
            </h4>
            <ul className="space-y-1 text-xs sm:text-sm text-zinc-400 font-mono">
              <li>
                <Link href="/about" className="hover:text-white transition-colors flex items-center min-h-[40px]">
                  About Studio
                </Link>
              </li>
              <li>
                <Link href="/solutions" className="hover:text-white transition-colors flex items-center min-h-[40px]">
                  Industry Solutions (8 Sectors)
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors flex items-center min-h-[40px]">
                  Engineering Blog &amp; Guides
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors flex items-center min-h-[40px]">
                  Direct Contact Line
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5 min-h-[40px]">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Admin Terminal</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Action / Commissioning */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-bold mb-3">
              Direct Protocol
            </h4>
            <p className="text-xs text-zinc-400 mb-4 leading-relaxed font-normal">
              Fixed-scope engineering briefs reviewed within 15 minutes.
            </p>
            <div className="space-y-2.5">
              <Link
                href="/intake-form"
                className="w-full min-h-[48px] py-3 px-4 bg-white hover:bg-zinc-200 text-black rounded-sm text-xs font-mono uppercase tracking-wider font-extrabold flex items-center justify-between transition-all"
              >
                <span>Initiate Project</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/schedule-meeting"
                className="w-full min-h-[46px] py-2.5 px-4 bg-zinc-950 hover:bg-zinc-900 text-zinc-200 rounded-sm text-xs font-mono uppercase tracking-wider border border-zinc-800 flex items-center justify-center transition-colors"
              >
                <span>Book 15m Architecture Call</span>
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400 font-mono">
          <p>© 2026 {SITE_CONFIG.brandName}. All Rights Reserved.</p>
          <div className="flex items-center gap-4 flex-wrap justify-center text-zinc-400">
            <Link href="/privacy-policy" className="hover:text-white transition-colors min-h-[36px] flex items-center">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="hover:text-white transition-colors min-h-[36px] flex items-center">Terms of Service</Link>
            <Link href="/contact" className="hover:text-white transition-colors min-h-[36px] flex items-center">Contact</Link>
            <Link href="/admin" className="text-emerald-400 hover:text-emerald-300 transition-colors min-h-[36px] flex items-center">Admin</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
