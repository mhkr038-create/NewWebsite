import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  User, 
  Sparkles, 
  ArrowRight 
} from 'lucide-react';
import { BLOG_POSTS } from '../data/blogPosts';
import { CTASection } from '../components/common/CTASection';
import { SITE_CONFIG } from '../config/siteConfig';

export const BlogPostPage: React.FC<{ slug: string }> = ({ slug }) => {
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }


  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: '2026-08-01',
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.brandName,
      url: 'https://digitalsimplesolution.com',
    },
    mainEntityOfPage: `https://digitalsimplesolution.com/blog/${post.slug}`,
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-24 overflow-x-hidden pt-28 sm:pt-36">
      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-8">
        {/* Back Link */}
        <div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </Link>
        </div>


        {/* Category & Metadata */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400">
            <span className="px-3.5 py-1 rounded-full bg-indigo-950/80 border border-indigo-800/40 text-cyan-300 font-semibold">
              {post.category}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>{post.readTime}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>{post.publishDate}</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-heading tracking-tight leading-[1.15]">
            {post.title}
          </h1>

          <div className="flex items-center gap-3 pt-2 text-xs text-slate-400 border-b border-slate-800/80 pb-6">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-400 p-[1px]">
              <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-cyan-300" />
              </div>
            </div>
            <div>
              <span className="font-bold text-white block">{post.author.name}</span>
              <span className="text-[11px] text-slate-500">{post.author.role}</span>
            </div>
          </div>
        </div>

        {/* Lead Excerpt / Intro */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 text-slate-200 text-sm sm:text-base leading-relaxed italic border-l-4 border-l-cyan-400">
          {post.content.intro}
        </div>

        {/* Article Body Sections */}
        <div className="space-y-10 pt-4 text-slate-300 leading-relaxed text-sm sm:text-base">
          {post.content.sections.map((sec, idx) => (
            <section key={idx} className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading tracking-tight">
                {sec.heading}
              </h2>

              <div className="space-y-3">
                {sec.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>

              {sec.keyTakeaway && (
                <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 flex items-start gap-3 my-4">
                  <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm text-cyan-200">
                    <strong className="text-white block mb-0.5">Key Strategy Takeaway:</strong>
                    {sec.keyTakeaway}
                  </div>
                </div>
              )}
            </section>
          ))}

          {/* Conclusion */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3 mt-8">
            <h3 className="text-xl font-bold text-white font-heading">
              Final Thoughts & Execution
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {post.content.conclusion}
            </p>
          </div>
        </div>

        {/* Related Offering Callout Box */}
        <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-indigo-950/80 via-slate-900 to-cyan-950/80 border border-indigo-500/40 space-y-4 shadow-xl">
          <span className="text-xs font-mono uppercase text-cyan-400 font-semibold">
            Ready to Implement This in Your Business?
          </span>
          <h3 className="text-2xl font-bold text-white font-heading">
            Need Expert Help with {post.category}?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Our team builds the complete growth system—from high-converting landing pages to targeted advertising and automated WhatsApp qualification workflows.
          </p>
          <div className="pt-2">
            <Link
              href={post.relatedServiceRoute}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-bold text-xs shadow-lg transition-all"
            >
              <span>{post.relatedServiceText}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

          </div>
        </div>
      </article>

      {/* Final CTA */}
      <CTASection />
    </div>
  );
};
