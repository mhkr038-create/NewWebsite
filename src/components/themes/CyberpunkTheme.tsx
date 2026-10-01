'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Terminal, 
  Cpu, 
  ShieldAlert, 
  Zap, 
  ArrowUpRight, 
  Sparkles, 
  Activity, 
  Radio, 
  Code2, 
  Send
} from 'lucide-react';
import { useInquiry } from '../../context/InquiryContext';
import { SITE_CONFIG } from '../../config/siteConfig';

export function CyberpunkTheme() {
  const { openQuickModal } = useInquiry();
  const [commandInput, setCommandInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    'SYSTEM KERNEL INITIALIZED: DSS_V2.6_QUANTUM',
    'ALL CLOUD NODES OPERATIONAL: 99.99% SYSTEM HEALTH',
    'TYPE "help" OR "services" FOR COMMAND SPECIFICATIONS'
  ]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = commandInput.trim().toLowerCase();
    if (!cmd) return;

    let response = '';
    switch (cmd) {
      case 'help':
        response = 'AVAILABLE PROTOCOLS: services, schoolmis, deploy, contact, clear';
        break;
      case 'services':
        response = 'ENGINEERING: Next.js Portals | ACQUISITION: Meta/Google Ads | AUTOMATION: WhatsApp Cloud API';
        break;
      case 'schoolmis':
        response = 'SCHOOLMIS ERP: Complete School Management suite online. Zero license fee tier active.';
        break;
      case 'deploy':
        response = 'INITIATING CLIENT INTAKE PROTOCOL... REDIRECTING TO /intake-form';
        window.location.href = '/intake-form';
        break;
      case 'contact':
        response = `DIRECT UPLINK: ${SITE_CONFIG.contact.email} | WhatsApp: +91 85006 99708`;
        break;
      case 'clear':
        setTerminalHistory(['SYSTEM TERMINAL CLEARED.']);
        setCommandInput('');
        return;
      default:
        response = `UNKNOWN COMMAND: "${cmd}". TYPE "help" FOR KNOWN PROTOCOLS.`;
    }

    setTerminalHistory((prev) => [...prev, `> ${commandInput}`, response]);
    setCommandInput('');
  };

  return (
    <div className="w-full bg-[#050508] text-cyan-400 min-h-screen pt-32 pb-24 px-4 sm:px-8 font-mono overflow-x-hidden relative selection:bg-cyan-500 selection:text-black">
      {/* Cyberpunk grid background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'linear-gradient(to right, #00f0ff 1px, transparent 1px), linear-gradient(to bottom, #00f0ff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      
      {/* Neon ambient glows */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-40 right-1/4 w-96 h-96 bg-fuchsia-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        
        {/* Top HUD Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl border border-cyan-500/30 bg-black/80 backdrop-blur-md shadow-[0_0_20px_rgba(0,240,255,0.15)] text-xs">
          <div className="flex items-center gap-3">
            <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span className="text-white font-bold tracking-widest uppercase">
              NODE: AP-SOUTH-HYD // LIVE
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-400 text-[11px]">
            <span>LATENCY: <strong className="text-cyan-300">12ms</strong></span>
            <span>UPTIME: <strong className="text-emerald-400">99.98%</strong></span>
            <span>SYSTEM: <strong className="text-fuchsia-400">DSS-CYBER-CORE</strong></span>
          </div>
        </div>

        {/* Hero Headline */}
        <section className="text-left space-y-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs tracking-wider">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span>ALGORITHMIC SOFTWARE &amp; GROWTH PROTOCOLS</span>
          </div>

          <h1 className="text-3xl sm:text-6xl font-black tracking-tight uppercase leading-[1.05] text-white">
            WE ARCHITECT <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-fuchsia-500">DIGITAL WEAPONS</span> FOR ENTERPRISE DOMINANCE.
          </h1>

          <p className="text-xs sm:text-base text-slate-300 font-light max-w-2xl leading-relaxed">
            High-throughput Next.js core applications, precision programmatic advertising matrices, and autonomous 24/7 WhatsApp API customer conversion engines.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/intake-form"
              className="px-6 py-3.5 rounded bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs uppercase tracking-widest transition-all shadow-[0_0_25px_rgba(0,240,255,0.4)] flex items-center gap-2 hover:scale-105"
            >
              <span>EXECUTE REQUEST</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <button
              onClick={() => openQuickModal()}
              className="px-6 py-3.5 rounded bg-black/80 hover:bg-cyan-950/50 text-cyan-400 border border-cyan-500/50 hover:border-cyan-400 text-xs uppercase tracking-widest transition-colors cursor-pointer"
            >
              FAST TELEMETRY
            </button>
            <Link
              href="/free-school-management-software"
              className="px-6 py-3.5 rounded bg-fuchsia-950/40 hover:bg-fuchsia-900/50 text-fuchsia-300 border border-fuchsia-600/50 text-xs uppercase tracking-widest transition-colors"
            >
              SCHOOLMIS ERP [₹0 TIER]
            </Link>
          </div>
        </section>

        {/* Interactive Cyber Terminal */}
        <section className="rounded-2xl border border-cyan-500/40 bg-black/90 p-5 sm:p-7 shadow-[0_0_30px_rgba(0,240,255,0.12)] space-y-4">
          <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span className="text-xs uppercase font-bold text-white tracking-wider">
                LIVE INTERACTIVE CLI // TERMINAL SESSION
              </span>
            </div>
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
            </div>
          </div>

          {/* Terminal Output */}
          <div className="space-y-1.5 min-h-[160px] max-h-[240px] overflow-y-auto text-xs font-mono">
            {terminalHistory.map((line, idx) => (
              <div 
                key={idx} 
                className={line.startsWith('>') ? 'text-cyan-300 font-bold' : line.startsWith('SYSTEM') ? 'text-emerald-400' : 'text-slate-300'}
              >
                {line}
              </div>
            ))}
          </div>

          {/* Terminal Input Form */}
          <form onSubmit={handleCommand} className="flex items-center gap-2 pt-2 border-t border-cyan-500/20">
            <span className="text-cyan-400 font-bold">&gt;</span>
            <input
              type="text"
              value={commandInput}
              onChange={(e) => setCommandInput(e.target.value)}
              placeholder="Type command (e.g. 'help', 'services', 'schoolmis', 'deploy')..."
              className="flex-1 bg-transparent border-none outline-none text-white text-xs font-mono placeholder:text-slate-600"
            />
            <button
              type="submit"
              className="p-2 rounded bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500 hover:text-black border border-cyan-500/40 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </section>

        {/* 3 Tech Architecture Nodes */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              code: 'SYS_01',
              title: 'FULLSTACK PLATFORMS',
              desc: 'Sub-millisecond Next.js edge runtimes with hardened security, server actions, and automated CI/CD pipelines.',
              route: '/landing-pages'
            },
            {
              code: 'SYS_02',
              title: 'ALGORITHMIC ACQUISITION',
              desc: 'High-ROAS Meta & Google programmatic audience architectures with server-side conversion API telemetry.',
              route: '/meta-ads'
            },
            {
              code: 'SYS_03',
              title: 'AUTONOMOUS WORKFLOWS',
              desc: 'WhatsApp Cloud API micro-services dispatching real-time transactional alerts, bookings, and CRM updates.',
              route: '/whatsapp-automation'
            }
          ].map((item, idx) => (
            <Link
              key={idx}
              href={item.route}
              className="p-6 rounded-xl border border-cyan-500/20 bg-slate-950/60 hover:border-cyan-400/60 hover:bg-cyan-950/20 transition-all space-y-3 group"
            >
              <div className="flex justify-between items-center text-xs text-fuchsia-400 font-bold">
                <span>{item.code}</span>
                <ArrowUpRight className="w-4 h-4 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                {item.desc}
              </p>
            </Link>
          ))}
        </section>

      </div>
    </div>
  );
}
