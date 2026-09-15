'use client';

import React, { useState } from 'react';
import { BookOpen, Search } from 'lucide-react';
import { BLOG_POSTS } from '../data/blogPosts';
import { BlogCard } from '../components/common/BlogCard';
import { CTASection } from '../components/common/CTASection';
import { SITE_CONFIG } from '../config/siteConfig';

export const BlogPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Landing Pages & CRO',
    'Paid Advertising',
    'Automation & CRM',
    'Digital Products',
    'SEO & Organic Growth',
  ];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'All' || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `${SITE_CONFIG.brandName} Digital Growth & Marketing Blog`,
    description: 'Expert playbooks, tutorials, and data-driven guides on landing pages, paid ads, SEO, and WhatsApp automation.',
    url: `${SITE_CONFIG.siteUrl}/blog`,
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.brandName,
      url: SITE_CONFIG.siteUrl,
    },
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-24 overflow-x-hidden pt-28 sm:pt-36">

      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-indigo-500/30 text-indigo-300 text-xs font-mono">
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span>Articles, Playbooks & Case Breakdowns</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.1] font-heading">
            Digital Marketing & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400">
              Automation Playbooks
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            No fluff. Just proven, battle-tested frameworks to help your business build a predictable client acquisition engine.
          </p>

          {/* Search Bar & Categories */}
          <div className="pt-4 space-y-4 max-w-xl mx-auto">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics (e.g., landing pages, Meta Ads, WhatsApp)..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-900/90 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-colors shadow-inner"
              />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30'
                      : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/40 rounded-3xl border border-slate-800 space-y-3">
            <p className="text-base text-slate-300 font-semibold">No articles match your search.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="text-xs text-cyan-400 hover:underline"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <CTASection
        headline="Ready to Implement These Growth Strategies?"
        description="We can build the exact landing page, paid ad funnel, or WhatsApp automation system described in these playbooks for your business."
        primaryCtaText="Book a Consultation"
        secondaryCtaText="Explore Services"
      />
    </div>
  );
};
