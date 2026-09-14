import React, { useState, useMemo } from 'react';
import { 
  ShoppingBag, 
  Download, 
  CheckCircle2, 
  ShieldCheck, 
  Check, 
  X, 
  CreditCard, 
  Zap, 
  Lock 
} from 'lucide-react';
import { PRODUCTS_REGISTRY, type ProductItem } from '../data/products';
import confetti from 'canvas-confetti';

export const ProductsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeProduct, setActiveProduct] = useState<ProductItem | null>(null);
  const [checkoutStep, setCheckoutStep] = useState<'details' | 'success'>('details');
  const [buyerEmail, setBuyerEmail] = useState('');

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'templates', label: 'Website Templates' },
    { id: 'prompts', label: 'AI Prompt Packs' },
    { id: 'automation', label: 'Automation Blueprints' },
    { id: 'marketing', label: 'Marketing Kits' },
  ];

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') return PRODUCTS_REGISTRY;
    return PRODUCTS_REGISTRY.filter((p: ProductItem) => p.category === selectedCategory);
  }, [selectedCategory]);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep('success');
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const closeModal = () => {
    setActiveProduct(null);
    setCheckoutStep('details');
    setBuyerEmail('');
  };

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
          <ShoppingBag className="w-3.5 h-3.5 text-cyan-400" />
          <span>Digital Assets & Automation Store</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight font-heading leading-tight">
          Accelerate Your Growth With <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400">
            Plug-and-Play Digital Assets.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
          Instant-download website source codes, enterprise AI prompt engines, webhook automations, and funnel marketing kits to deploy in minutes.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800 max-w-xl mx-auto">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
              selectedCategory === cat.id
                ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product: ProductItem) => (
          <div
            key={product.id}
            className="bg-slate-900/80 border border-slate-800 hover:border-indigo-500/40 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-950/40 flex flex-col group"
          >
            {/* Image */}
            <div className="relative h-48 w-full overflow-hidden bg-slate-800">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-lg bg-slate-950/90 backdrop-blur-md text-indigo-300 text-[10px] font-mono uppercase font-bold border border-indigo-800/40">
                {product.category}
              </span>
              {product.badge && (
                <span className="absolute top-3.5 right-3.5 px-2.5 py-0.5 rounded-lg bg-amber-500/20 backdrop-blur-md text-amber-300 text-[10px] font-bold border border-amber-500/30">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Body */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg text-white group-hover:text-cyan-300 transition-colors font-heading">
                    {product.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Features */}
              <div className="space-y-2 pt-3 border-t border-slate-800">
                <span className="text-[11px] font-mono uppercase text-slate-400 block font-semibold">
                  What's Included:
                </span>
                <div className="space-y-1.5">
                  {product.features.map((feat: string, i: number) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & Action */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-slate-400 line-through mr-2 font-mono">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-2xl font-extrabold text-white font-mono">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                </div>

                <button
                  onClick={() => {
                    setActiveProduct(product);
                    setCheckoutStep('details');
                  }}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-600/30 flex items-center gap-1.5 transition-all hover:scale-105"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Get Instant Access</span>
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Trust Guarantee Bar */}
      <div className="p-8 rounded-3xl bg-slate-950 border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-xs">
        <div className="space-y-1">
          <ShieldCheck className="w-6 h-6 text-emerald-400 mx-auto" />
          <h4 className="font-bold text-white">Commercial License</h4>
          <p className="text-slate-400">Use on unlimited client & commercial projects with zero royalties.</p>
        </div>
        <div className="space-y-1">
          <Zap className="w-6 h-6 text-cyan-400 mx-auto" />
          <h4 className="font-bold text-white">Instant Download</h4>
          <p className="text-slate-400">Receive source files, PDF guides, and Notion links instantly via email.</p>
        </div>
        <div className="space-y-1">
          <Lock className="w-6 h-6 text-indigo-400 mx-auto" />
          <h4 className="font-bold text-white">Lifetime Updates</h4>
          <p className="text-slate-400">Receive all future version iterations and prompt refreshes at no charge.</p>
        </div>
      </div>

      {/* Instant Purchase Modal */}
      {activeProduct && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl space-y-4">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            {checkoutStep === 'details' ? (
              <div>
                <span className="text-xs font-mono uppercase text-cyan-400 font-semibold">
                  Secure Digital Checkout
                </span>
                <h3 className="text-2xl font-bold text-white font-heading mt-1">
                  {activeProduct.title}
                </h3>

                <div className="my-4 p-3 rounded-2xl bg-slate-950 border border-indigo-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={activeProduct.image}
                      alt={activeProduct.title}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <div>
                      <span className="text-xs font-bold text-white block">{activeProduct.title}</span>
                      <span className="text-[11px] text-slate-400 font-mono">Instant Digital Download</span>
                    </div>
                  </div>
                  <span className="text-xl font-bold text-emerald-400 font-mono">
                    ₹{activeProduct.price.toLocaleString('en-IN')}
                  </span>
                </div>

                <form onSubmit={handleCheckoutSubmit} className="space-y-3.5 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Your Email (for instant download link)</label>
                    <input
                      type="email"
                      required
                      value={buyerEmail}
                      onChange={(e) => setBuyerEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 text-slate-400 text-[11px]">
                    <div className="flex items-center gap-2 text-slate-300">
                      <CreditCard className="w-4 h-4 text-cyan-400" />
                      <span>Instant Digital Download Access</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Complete Download (₹{activeProduct.price.toLocaleString('en-IN')})</span>
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                  <Check className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white font-heading">
                    Download Ready!
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 max-w-sm mx-auto">
                    Your digital assets for <span className="text-indigo-400 font-semibold">{activeProduct.title}</span> have been sent to <span className="text-white font-semibold">{buyerEmail || 'your email'}</span>.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-2 text-left">
                  <span className="text-[10px] font-mono uppercase text-indigo-400 font-semibold block">
                    Direct Download Links:
                  </span>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200">
                    <span>Source Package (.ZIP + Notion Guide)</span>
                    <button
                      onClick={() => alert(`Downloading package for ${activeProduct.title}...`)}
                      className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-[11px] font-bold"
                    >
                      Download Now
                    </button>
                  </div>
                </div>

                <button
                  onClick={closeModal}
                  className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold"
                >
                  Close & Continue Browsing
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
