'use client';

import React, { useState } from 'react';
import { Search, Globe, FileCode, ArrowUpRight, Sparkles, ExternalLink, Hash, BookOpen } from 'lucide-react';

export const GoogleSearchWidget: React.FC = () => {
  const [query, setQuery] = useState('');
  const [searchScope, setSearchScope] = useState<'web' | 'site' | 'scholar' | 'news'>('web');

  const executeSearch = (e?: React.FormEvent, customQuery?: string) => {
    if (e) e.preventDefault();
    const targetQuery = customQuery !== undefined ? customQuery : query;
    if (!targetQuery.trim()) return;

    let searchUrl = '';
    const encoded = encodeURIComponent(targetQuery.trim());

    switch (searchScope) {
      case 'site':
        searchUrl = `https://www.google.com/search?q=site:digitalsimplesolution.online+${encoded}`;
        break;
      case 'scholar':
        searchUrl = `https://scholar.google.com/scholar?q=${encoded}`;
        break;
      case 'news':
        searchUrl = `https://www.google.com/search?q=${encoded}&tbm=nws`;
        break;
      case 'web':
      default:
        searchUrl = `https://www.google.com/search?q=${encoded}`;
        break;
    }

    window.open(searchUrl, '_blank', 'noopener,noreferrer');
  };

  const quickPrompts = [
    { label: 'Next.js 15 Performance', q: 'Next.js 15 performance optimization core web vitals' },
    { label: 'Cloud School ERP ₹0', q: 'site:digitalsimplesolution.online SchoolMIS ERP free license' },
    { label: 'Meta Conversions CAPI', q: 'Meta Conversions API server side tracking Next.js' },
    { label: 'WhatsApp Cloud API', q: 'WhatsApp Cloud API automated lead qualification webhook' },
    { label: 'Sub-second Web Vitals', q: 'Google Core Web Vitals 95+ score Next.js SSR' },
  ];

  const operators = [
    { code: 'site:digitalsimplesolution.online', desc: 'Search within this platform' },
    { code: 'filetype:pdf', desc: 'Search documentation & PDFs' },
    { code: '"exact quote"', desc: 'Match exact phrasing' },
    { code: 'intitle:ERP', desc: 'Look for keywords in title' },
  ];

  const appendOperator = (op: string) => {
    setQuery((prev) => (prev ? `${prev} ${op}` : op));
  };

  return (
    <div className="w-full text-left font-sans space-y-6">
      {/* Search Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-850 pb-4 font-mono text-xs">
        <div className="flex items-center gap-2 text-white font-bold">
          <Globe className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-sm uppercase tracking-wider">Google Search Command Console</span>
        </div>
        <div className="flex items-center gap-1.5 text-zinc-400 text-[11px]">
          <span className="px-2 py-0.5 border border-zinc-800 bg-zinc-900/60 uppercase">Free Global Search API</span>
        </div>
      </div>

      {/* Scope Selector Bar */}
      <div className="flex flex-wrap gap-2 font-mono text-xs">
        <button
          type="button"
          onClick={() => setSearchScope('web')}
          className={`min-h-[38px] px-3.5 py-1.5 border transition-all flex items-center gap-1.5 cursor-pointer ${
            searchScope === 'web'
              ? 'bg-white text-black border-white font-bold'
              : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700'
          }`}
        >
          <Search className="w-3.5 h-3.5" />
          <span>Google Web</span>
        </button>

        <button
          type="button"
          onClick={() => setSearchScope('site')}
          className={`min-h-[38px] px-3.5 py-1.5 border transition-all flex items-center gap-1.5 cursor-pointer ${
            searchScope === 'site'
              ? 'bg-white text-black border-white font-bold'
              : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700'
          }`}
        >
          <FileCode className="w-3.5 h-3.5" />
          <span>Site Search (DSS)</span>
        </button>

        <button
          type="button"
          onClick={() => setSearchScope('scholar')}
          className={`min-h-[38px] px-3.5 py-1.5 border transition-all flex items-center gap-1.5 cursor-pointer ${
            searchScope === 'scholar'
              ? 'bg-white text-black border-white font-bold'
              : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Google Scholar</span>
        </button>

        <button
          type="button"
          onClick={() => setSearchScope('news')}
          className={`min-h-[38px] px-3.5 py-1.5 border transition-all flex items-center gap-1.5 cursor-pointer ${
            searchScope === 'news'
              ? 'bg-white text-black border-white font-bold'
              : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Google News</span>
        </button>
      </div>

      {/* Main Search Query Terminal */}
      <form onSubmit={(e) => executeSearch(e)} className="space-y-3">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              searchScope === 'site'
                ? 'Search DSS documentation, solutions, ERP guides...'
                : 'Enter search query or engineering prompt...'
            }
            className="w-full min-h-[52px] bg-zinc-950 border border-zinc-750 px-4 pl-12 pr-28 text-sm font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-white transition-colors"
            autoFocus
          />
          <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 min-h-[38px] px-4 bg-white hover:bg-zinc-200 text-black font-mono text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <span>Search</span>
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>

        {/* Quick Search Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-xs">
          <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Quick Inquiries:</span>
          {quickPrompts.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => {
                setQuery(p.q);
                executeSearch(undefined, p.q);
              }}
              className="px-2.5 py-1 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 hover:border-zinc-600 text-[11px] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Hash className="w-3 h-3 text-zinc-500" />
              <span>{p.label}</span>
            </button>
          ))}
        </div>
      </form>

      {/* Search Operators Console */}
      <div className="p-4 bg-zinc-950 border border-zinc-850 space-y-2.5 font-mono text-xs">
        <div className="flex items-center justify-between text-[10px] text-zinc-400 uppercase tracking-wider border-b border-zinc-900 pb-1.5">
          <span>Google Advanced Search Operators</span>
          <span className="text-zinc-500">Click to Append</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {operators.map((op) => (
            <button
              key={op.code}
              type="button"
              onClick={() => appendOperator(op.code)}
              className="text-left p-2 bg-zinc-900/40 hover:bg-zinc-900 border border-zinc-800/80 hover:border-zinc-700 transition-colors flex items-center justify-between group cursor-pointer"
            >
              <span className="text-emerald-400 font-semibold">{op.code}</span>
              <span className="text-[10px] text-zinc-400 group-hover:text-zinc-300">{op.desc}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
