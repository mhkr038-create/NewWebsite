import React from 'react';
import Link from 'next/link';
import { Clock, ArrowRight, BookOpen, Calendar } from 'lucide-react';
import type { BlogPost } from '../../data/blogPosts';

interface BlogCardProps {
  post: BlogPost;
  className?: string;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post, className = '' }) => {
  return (
    <article
      className={`bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 rounded-3xl p-6 sm:p-7 flex flex-col justify-between space-y-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-indigo-950/40 relative group text-left backdrop-blur-xl ${className}`}
    >
      <div className="space-y-4">
        {/* Category & Read Time */}
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-cyan-300 text-[11px] font-mono font-semibold">
            <BookOpen className="w-3 h-3 text-cyan-400" />
            {post.category}
          </span>
          <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-500" />
            {post.readTime}
          </span>
        </div>

        {/* Title */}
        <Link href={`/blog/${post.slug}`} className="block group-hover:text-cyan-300 transition-colors">
          <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors font-heading leading-snug">
            {post.title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="text-sm text-slate-300 leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>
      </div>

      {/* Footer: Date & Read Article Link */}
      <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
        <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5" />
          <span>{post.publishDate}</span>
        </span>

        <Link
          href={`/blog/${post.slug}`}
          className="text-xs font-semibold text-cyan-400 group-hover:text-cyan-300 flex items-center gap-1.5 transition-colors"
        >
          <span>Read Article</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  );
};
