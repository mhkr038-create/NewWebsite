import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Star, Sparkles } from 'lucide-react';
import type { DemoItem } from '../../data/demos';
import { useInquiry } from '../../context/InquiryContext';

interface DemoCardProps {
  demo: DemoItem;
  className?: string;
}

export const DemoCard: React.FC<DemoCardProps> = ({ demo, className = '' }) => {
  const { openQuickModal } = useInquiry();

  return (
    <div
      className={`bg-slate-900/80 border border-slate-800 hover:border-indigo-500/40 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-950/40 flex flex-col group text-left ${className}`}
    >
      {/* Thumbnail with overlay tags */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-950">
        <img
          src={demo.previewImage}
          alt={demo.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-950/85 backdrop-blur-md text-indigo-300 text-[10px] font-mono uppercase font-bold border border-indigo-800/40">
          {demo.categoryLabel}
        </div>
        <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-slate-950/85 backdrop-blur-md text-amber-400 text-xs font-bold flex items-center gap-1 border border-slate-700">
          <Star className="w-3 h-3 fill-amber-400" />
          <span>{demo.rating}</span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h4 className="font-bold text-base sm:text-lg text-white group-hover:text-cyan-300 transition-colors font-heading">
            {demo.name}
          </h4>
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {demo.description}
          </p>
        </div>

        <div className="space-y-3 pt-3 border-t border-slate-800/80">
          <div className="flex flex-wrap gap-1">
            {demo.tags.slice(0, 2).map((t, idx) => (
              <span
                key={idx}
                className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <Link
              to={demo.route}
              className="py-2.5 px-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-600/20 flex items-center justify-center gap-1.5 transition-all"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>View Live Demo</span>
            </Link>
            <button
              onClick={() => openQuickModal(demo.id)}
              className="py-2.5 px-3 bg-slate-950 hover:bg-slate-800 text-slate-200 font-semibold text-xs rounded-xl border border-slate-800 transition-colors flex items-center justify-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Customize</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
