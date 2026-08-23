import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Star, 
  Eye, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Compass, 
  X
} from 'lucide-react';
import { DEMO_REGISTRY, DEMO_CATEGORIES, type DemoItem } from '../data/demos';
import { useInquiry } from '../context/InquiryContext';

export const DemosPage: React.FC = () => {
  const { openQuickModal } = useInquiry();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeSpecDemo, setActiveSpecDemo] = useState<DemoItem | null>(null);

  const filteredDemos = useMemo(() => {
    return DEMO_REGISTRY.filter((demo) => {
      const matchesCategory = selectedCategory === 'all' || demo.category === selectedCategory;
      const matchesSearch = 
        demo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        demo.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        demo.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        demo.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Interactive Live Experiences</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight font-heading leading-tight">
          Explore Ready-Made <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400">
            Website Demos.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
          Every demo below is a complete, functioning digital experience with real interactive tools, appointment booking flows, and responsive viewports. Choose your favorite concept and let us customize it for your brand.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 p-3 sm:p-4 rounded-2xl shadow-xl">
          
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {DEMO_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/30'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search concepts or features..."
              className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Results count */}
        <div className="flex justify-between items-center text-xs text-slate-400 px-2 font-mono">
          <span>Showing {filteredDemos.length} Website Concept{filteredDemos.length === 1 ? '' : 's'}</span>
          <span>Click any card to launch full live demo</span>
        </div>
      </div>

      {/* Demos Grid */}
      {filteredDemos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDemos.map((demo) => (
            <div
              key={demo.id}
              className="bg-slate-900/80 border border-slate-800 hover:border-indigo-500/40 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-950/40 flex flex-col group"
            >
              {/* Thumbnail */}
              <div className="relative h-56 w-full overflow-hidden bg-slate-800">
                <img
                  src={demo.previewImage}
                  alt={demo.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-lg bg-slate-950/90 backdrop-blur-md text-indigo-300 text-[10px] font-mono uppercase font-bold border border-indigo-800/40">
                  {demo.categoryLabel}
                </div>
                <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-lg bg-slate-950/90 backdrop-blur-md text-amber-400 text-xs font-bold flex items-center gap-1 border border-slate-700">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{demo.rating}</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-xl text-white group-hover:text-cyan-300 transition-colors font-heading">
                      {demo.name}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {demo.description}
                  </p>
                </div>

                {/* Features Snippet */}
                <div className="space-y-2 pt-3 border-t border-slate-800">
                  <span className="text-[11px] font-mono uppercase text-slate-400 block font-semibold">
                    Key Integrated Features:
                  </span>
                  <div className="space-y-1.5">
                    {demo.features.slice(0, 3).map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2 pt-2">
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      to={demo.route}
                      className="py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-600/30 flex items-center justify-center gap-1.5 transition-all"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Live Demo</span>
                    </Link>

                    <button
                      onClick={() => openQuickModal(demo.id)}
                      className="py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl border border-slate-700 transition-colors flex items-center justify-center gap-1"
                    >
                      <span>Get Website</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => setActiveSpecDemo(demo)}
                    className="w-full py-1.5 text-center text-[11px] text-slate-400 hover:text-indigo-300 transition-colors font-mono"
                  >
                    View Full Specification & Architecture →
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-900/50 rounded-3xl border border-slate-800 space-y-4">
          <Compass className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-xl font-bold text-white">No Website Demos Match Your Filter</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try adjusting your search keywords or select "All Categories" to view all available concepts.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="px-5 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-xl"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Quick Spec Modal */}
      {activeSpecDemo && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 relative shadow-2xl space-y-5">
            <button
              onClick={() => setActiveSpecDemo(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <span className="text-xs font-mono uppercase text-indigo-400 font-semibold">
                Architecture Blueprint
              </span>
              <h3 className="text-2xl font-bold text-white font-heading mt-1">
                {activeSpecDemo.name}
              </h3>
              <p className="text-xs text-slate-400 mt-1">{activeSpecDemo.description}</p>
            </div>

            <div className="space-y-3 pt-2 border-t border-slate-800 text-xs">
              <h4 className="font-semibold text-white">Complete Integrated Feature Set:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeSpecDemo.features.map((f: string, i: number) => (
                  <div key={i} className="flex items-start gap-2 text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Design System:</span>
                <strong className="text-white capitalize">{activeSpecDemo.colorTheme.primary} Palette</strong>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Viewport Support:</span>
                <strong className="text-cyan-400">Desktop, Tablet & Mobile Fluid Responsive</strong>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Customization Time:</span>
                <strong className="text-emerald-400">5 to 7 Days to Final Launch</strong>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Link
                to={activeSpecDemo.route}
                className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl text-center shadow-lg shadow-indigo-600/30 transition-all"
              >
                Launch Live Demo
              </Link>
              <button
                onClick={() => {
                  const id = activeSpecDemo.id;
                  setActiveSpecDemo(null);
                  openQuickModal(id);
                }}
                className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl border border-slate-700 transition-colors"
              >
                Customize This Website
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
