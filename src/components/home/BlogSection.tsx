import React from 'react';
import { BookOpen, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { BLOG_POSTS } from '../../data/blogPosts';
import { BlogCard } from '../common/BlogCard';

export const BlogSection: React.FC = () => {
  return (
    <section id="blog-preview" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 scroll-mt-28">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 text-left">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-indigo-500/30 text-indigo-300 text-xs font-mono">
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span>Digital Growth Insights & Guides</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-heading tracking-tight">
            Latest Marketing & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400">
              Automation Playbooks
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Actionable strategies on landing pages, Meta vs Google Ads, WhatsApp CRM follow-ups, digital products, and search SEO.
          </p>
        </div>

        {/* Desktop Explore All Articles CTA */}
        <Link
          href="/blog"
          className="hidden md:inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200 hover:text-white transition-all shadow-md shrink-0"
        >
          <span>Explore All Articles</span>
          <ArrowRight className="w-4 h-4 text-cyan-400" />
        </Link>
      </div>

      {/* 5 Featured Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {BLOG_POSTS.slice(0, 5).map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      {/* Mobile CTA */}
      <div className="mt-8 text-center md:hidden">
        <Link
          href="/blog"
          className="w-full py-3 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-white flex items-center justify-center gap-2"
        >
          <span>Explore All Articles</span>
          <ArrowRight className="w-4 h-4 text-cyan-400" />
        </Link>
      </div>
    </section>
  );
};

