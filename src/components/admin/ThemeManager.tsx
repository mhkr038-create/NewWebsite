'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Palette, 
  Plus, 
  Check, 
  Eye, 
  Code, 
  Trash2, 
  Copy, 
  ExternalLink, 
  Sparkles, 
  Layers, 
  Settings, 
  RefreshCw, 
  Laptop, 
  Smartphone, 
  Tablet, 
  X, 
  CheckCircle2, 
  Play, 
  FileCode, 
  BookOpen, 
  Globe 
} from 'lucide-react';
import { ThemeConfig } from '../../types/theme';

const STARTER_BOILERPLATES = [
  {
    name: 'Modern Tailwind Hero with Badges & CTAs',
    html: `<div class="w-full min-h-[90vh] bg-gradient-to-b from-black via-zinc-950 to-black text-white flex flex-col justify-center items-center text-center px-4 py-20 relative overflow-hidden">
  <!-- Glow backdrop -->
  <div class="absolute top-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-[140px] pointer-events-none"></div>

  <div class="max-w-4xl mx-auto space-y-6 relative z-10">
    <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-mono uppercase tracking-wider">
      <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
      <span>Custom Enterprise Architecture</span>
    </div>

    <h1 class="text-4xl sm:text-7xl font-bold tracking-tight text-white">
      Scale Your Digital Business With Next-Gen Intelligence
    </h1>

    <p class="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed">
      Custom designed landing pages, high-converting Meta advertising campaigns, and autonomous WhatsApp operations.
    </p>

    <div class="flex flex-wrap items-center justify-center gap-4 pt-4">
      <a href="/intake-form" class="px-7 py-3.5 rounded-full bg-white text-black font-semibold text-xs font-mono uppercase tracking-wider hover:bg-zinc-200 transition-all shadow-lg">
        Submit Request →
      </a>
      <a href="/free-school-management-software" class="px-6 py-3.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs font-mono uppercase tracking-wider transition-colors">
        SchoolMIS Cloud ERP
      </a>
    </div>

    <!-- 4 Stats Strip -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 border-t border-zinc-900 text-left">
      <div class="p-4 rounded-xl bg-zinc-950/60 border border-zinc-900">
        <div class="text-2xl font-mono font-bold text-white">99.9%</div>
        <div class="text-xs text-zinc-400">Reliability Rate</div>
      </div>
      <div class="p-4 rounded-xl bg-zinc-950/60 border border-zinc-900">
        <div class="text-2xl font-mono font-bold text-white">₹0</div>
        <div class="text-xs text-zinc-400">ERP License Fee</div>
      </div>
      <div class="p-4 rounded-xl bg-zinc-950/60 border border-zinc-900">
        <div class="text-2xl font-mono font-bold text-white">&lt; 48h</div>
        <div class="text-xs text-zinc-400">Setup Velocity</div>
      </div>
      <div class="p-4 rounded-xl bg-zinc-950/60 border border-zinc-900">
        <div class="text-2xl font-mono font-bold text-white">24/7</div>
        <div class="text-xs text-zinc-400">Automated Bot</div>
      </div>
    </div>
  </div>
</div>`,
    css: `@keyframes floatGlow {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}`,
    js: `// Client interactive initialization
console.log('Custom Tailwind Hero Loaded successfully');`,
  },
  {
    name: 'Interactive Canvas Particles & Neon Grid',
    html: `<div class="w-full min-h-[90vh] bg-black text-cyan-400 flex flex-col justify-center items-center text-center px-4 py-20 relative overflow-hidden font-mono">
  <canvas id="particleCanvas" class="absolute inset-0 pointer-events-none w-full h-full"></canvas>

  <div class="max-w-3xl mx-auto space-y-6 relative z-10">
    <div class="px-3 py-1 rounded bg-cyan-950/70 border border-cyan-500/50 text-cyan-300 text-xs inline-block">
      SYSTEM PROTOCOL // QUANTUM NODE ACTIVE
    </div>

    <h1 class="text-4xl sm:text-6xl font-black uppercase text-white tracking-tight">
      Engineered for High-Velocity Digital Dominance
    </h1>

    <p class="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
      Algorithmic lead acquisition and enterprise web runtimes deployed with precision.
    </p>

    <div class="flex justify-center gap-4 pt-4">
      <a href="/intake-form" class="px-6 py-3 rounded bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(0,240,255,0.4)]">
        Execute Intake
      </a>
      <a href="/admin" class="px-6 py-3 rounded bg-black border border-cyan-500/50 text-cyan-300 text-xs uppercase tracking-wider hover:bg-cyan-950/50 transition-colors">
        Control Center
      </a>
    </div>
  </div>
</div>`,
    css: `canvas { opacity: 0.7; }`,
    js: `const canvas = container.querySelector('#particleCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const particles = Array.from({ length: 60 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 1.2,
    vy: (Math.random() - 0.5) * 1.2,
    radius: Math.random() * 2 + 1,
  }));

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00f0ff';
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }
  animate();
}`,
  },
  {
    name: 'Liquid Glass Button Hero Showcase',
    html: `<div class="w-full min-h-[90vh] bg-black text-white flex flex-col justify-center items-center text-center px-4 py-20 relative overflow-hidden">
  <!-- Dotted background -->
  <svg xmlns="http://www.w3.org/2000/svg" height="100%" width="100%" class="pointer-events-none absolute inset-0 z-0">
    <defs>
      <pattern patternUnits="userSpaceOnUse" height="30" width="30" id="dottedGrid">
        <circle fill="rgba(255, 255, 255, 0.15)" r="1" cy="2" cx="2"></circle>
      </pattern>
    </defs>
    <rect fill="url(#dottedGrid)" height="100%" width="100%"></rect>
  </svg>

  <div class="max-w-3xl mx-auto space-y-6 relative z-10">
    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono uppercase tracking-wider text-zinc-400">
      ⚡ Specular Liquid Glass UI
    </div>

    <h1 class="text-4xl sm:text-7xl font-bold tracking-tight text-white">
      Reflective Glassmorphism Experience
    </h1>

    <p class="text-base sm:text-lg text-zinc-400 max-w-xl mx-auto font-light leading-relaxed">
      Crafted with conic angle rotations, dynamic OKLCH color spaces, and tactile 3D perspective feedback.
    </p>

    <div class="flex flex-wrap items-center justify-center gap-6 pt-6">
      <div class="glass-button-wrap cursor-pointer rounded-full">
        <button class="glass-button relative isolate cursor-pointer rounded-full transition-all">
          <span class="glass-button-text relative block select-none tracking-tighter px-8 py-4 text-base font-semibold">
            Explore Growth Systems →
          </span>
        </button>
        <div class="glass-button-shadow rounded-full"></div>
      </div>

      <div class="glass-button-wrap cursor-pointer rounded-full">
        <a href="/intake-form" class="glass-button relative isolate cursor-pointer rounded-full transition-all inline-block">
          <span class="glass-button-text relative block select-none tracking-tighter px-6 py-3.5 text-sm font-semibold">
            Submit Intake
          </span>
        </a>
        <div class="glass-button-shadow rounded-full"></div>
      </div>
    </div>
  </div>
</div>`,
    css: `@property --angle-1 { syntax: "<angle>"; inherits: false; initial-value: -75deg; }
@property --angle-2 { syntax: "<angle>"; inherits: false; initial-value: -45deg; }
.glass-button-wrap {
  --anim-time:.4s;
  --anim-ease:cubic-bezier(.25,1,.5,1);
  --border-width:clamp(1px,.0625em,4px);
  z-index:2;
  transform-style:preserve-3d;
  transition:transform var(--anim-time)var(--anim-ease);
  position:relative;
}
.glass-button-wrap:has(.glass-button:active) { transform:rotateX(25deg); }
.glass-button-shadow {
  --shadow-cutoff-fix:2em;
  width:calc(100% + var(--shadow-cutoff-fix));
  height:calc(100% + var(--shadow-cutoff-fix));
  top:calc(0% - var(--shadow-cutoff-fix)/2);
  left:calc(0% - var(--shadow-cutoff-fix)/2);
  filter:blur(clamp(2px,.125em,12px));
  transition:filter var(--anim-time)var(--anim-ease);
  pointer-events:none;
  position:absolute;
}
.glass-button-shadow:after {
  content:"";
  background:linear-gradient(180deg,rgba(255,255,255,0.2),rgba(255,255,255,0.05));
  width:calc(100% - var(--shadow-cutoff-fix) - .25em);
  height:calc(100% - var(--shadow-cutoff-fix) - .25em);
  top:calc(var(--shadow-cutoff-fix) - .5em);
  left:calc(var(--shadow-cutoff-fix) - .875em);
  border-radius:9999px;
  position:absolute;
}
.glass-button {
  backdrop-filter:blur(clamp(1px,.125em,4px));
  transition:all var(--anim-time)var(--anim-ease);
  background:linear-gradient(-75deg,rgba(255,255,255,0.05),rgba(255,255,255,0.15),rgba(255,255,255,0.05));
  border:1px solid rgba(255,255,255,0.2);
  box-shadow:inset 0 1px 1px rgba(255,255,255,0.2),0 4px 12px rgba(0,0,0,0.5);
}
.glass-button:hover {
  transform:scale(.98);
  box-shadow:inset 0 1px 2px rgba(255,255,255,0.3),0 2px 6px rgba(0,0,0,0.6);
}
.glass-button-text { color: #ffffff; text-shadow:0 1px 2px rgba(0,0,0,0.5); }`,
    js: `console.log('Glass button hero template initialized');`,
  },
];

const PRESET_LIBRARIES = [
  { name: 'GSAP 3', url: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js' },
  { name: 'Three.js', url: 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js' },
  { name: 'Canvas Confetti', url: 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js' },
  { name: 'Chart.js', url: 'https://cdn.jsdelivr.net/npm/chart.js' },
  { name: 'Google Font: Space Grotesk', url: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&display=swap' },
];

export function ThemeManager() {
  const [themes, setThemes] = useState<ThemeConfig[]>([]);
  const [activeThemeId, setActiveThemeId] = useState<string>('minimalist-obsidian');
  const [loading, setLoading] = useState<boolean>(true);
  const [activatingId, setActivatingId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Modal State for + Add / Edit Custom Theme
  const [editorModalOpen, setEditorModalOpen] = useState<boolean>(false);
  const [editingTheme, setEditingTheme] = useState<Partial<ThemeConfig>>({
    name: '',
    description: '',
    prompt: '',
    displayMode: 'full_page',
    libraries: [],
    customHtml: '',
    customCss: '',
    customJs: '',
    tags: ['Custom'],
  });
  const [newLibUrl, setNewLibUrl] = useState<string>('');
  const [activeEditorTab, setActiveEditorTab] = useState<'html' | 'css' | 'js' | 'libraries' | 'prompt'>('html');
  const [previewModalOpen, setPreviewModalOpen] = useState<boolean>(false);
  const [previewTheme, setPreviewTheme] = useState<ThemeConfig | null>(null);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const fetchThemes = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/themes', { cache: 'no-store' });
      const data = await res.json();
      if (data.ok) {
        setThemes(data.themes || []);
        setActiveThemeId(data.activeThemeId || 'minimalist-obsidian');
      }
    } catch (err) {
      console.error('Failed to load themes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchThemes();
  }, []);

  const handleActivateTheme = async (themeId: string) => {
    try {
      setActivatingId(themeId);
      const res = await fetch('/api/admin/themes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'set_active', themeId }),
      });
      const data = await res.json();
      if (data.ok) {
        setActiveThemeId(themeId);
        setStatusMessage(`Theme successfully activated on the live website!`);
        setTimeout(() => setStatusMessage(null), 4000);
      } else {
        alert(data.error || 'Failed to activate theme');
      }
    } catch (err) {
      alert('Network error while activating theme');
    } finally {
      setActivatingId(null);
    }
  };

  const handleDeleteTheme = async (themeId: string) => {
    if (!confirm('Are you sure you want to delete this custom theme? This action cannot be undone.')) {
      return;
    }
    try {
      const res = await fetch('/api/admin/themes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete_theme', themeId }),
      });
      const data = await res.json();
      if (data.ok) {
        fetchThemes();
        setStatusMessage('Custom theme deleted.');
        setTimeout(() => setStatusMessage(null), 3000);
      } else {
        alert(data.error || 'Failed to delete theme');
      }
    } catch {
      alert('Error deleting theme');
    }
  };

  const handleOpenAddModal = () => {
    setEditingTheme({
      name: '',
      description: '',
      prompt: '',
      displayMode: 'full_page',
      libraries: [],
      customHtml: STARTER_BOILERPLATES[0].html,
      customCss: STARTER_BOILERPLATES[0].css,
      customJs: STARTER_BOILERPLATES[0].js,
      tags: ['Custom Design'],
    });
    setActiveEditorTab('html');
    setEditorModalOpen(true);
  };

  const handleOpenEditModal = (theme: ThemeConfig) => {
    setEditingTheme({
      ...theme,
      libraries: [...(theme.libraries || [])],
    });
    setActiveEditorTab('html');
    setEditorModalOpen(true);
  };

  const handleDuplicateTheme = (theme: ThemeConfig) => {
    setEditingTheme({
      name: `${theme.name} (Copy)`,
      description: `Customized copy of ${theme.name}`,
      prompt: theme.prompt || '',
      displayMode: theme.displayMode || 'full_page',
      libraries: [...(theme.libraries || [])],
      customHtml: theme.customHtml || '',
      customCss: theme.customCss || '',
      customJs: theme.customJs || '',
      tags: ['Custom', ...(theme.tags || [])],
    });
    setActiveEditorTab('html');
    setEditorModalOpen(true);
  };

  const handleSaveTheme = async (activateNow: boolean = false) => {
    if (!editingTheme.name || !editingTheme.name.trim()) {
      alert('Please provide a name for this theme.');
      return;
    }

    try {
      const res = await fetch('/api/admin/themes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'save_theme',
          theme: editingTheme,
          activateNow,
        }),
      });
      const data = await res.json();
      if (data.ok) {
        setEditorModalOpen(false);
        fetchThemes();
        setStatusMessage(activateNow ? 'Theme saved and applied to front page!' : 'Theme saved successfully!');
        setTimeout(() => setStatusMessage(null), 4000);
      } else {
        alert(data.error || 'Failed to save theme');
      }
    } catch {
      alert('Network error while saving theme');
    }
  };

  const handleAddLibrary = (url: string) => {
    const cleanUrl = url.trim();
    if (!cleanUrl) return;
    const current = editingTheme.libraries || [];
    if (!current.includes(cleanUrl)) {
      setEditingTheme({ ...editingTheme, libraries: [...current, cleanUrl] });
    }
    setNewLibUrl('');
  };

  const handleRemoveLibrary = (url: string) => {
    const current = editingTheme.libraries || [];
    setEditingTheme({ ...editingTheme, libraries: current.filter((l) => l !== url) });
  };

  const applyBoilerplate = (bp: typeof STARTER_BOILERPLATES[0]) => {
    if (editingTheme.customHtml && !confirm('Replace current code with this starter template?')) {
      return;
    }
    setEditingTheme({
      ...editingTheme,
      customHtml: bp.html,
      customCss: bp.css,
      customJs: bp.js,
    });
  };

  return (
    <div className="space-y-8 text-left">
      {/* Top Banner / Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Palette className="w-6 h-6 text-indigo-400" />
            <h1 className="text-xl sm:text-2xl font-bold text-white font-heading">
              Front Page Themes &amp; Design Studio
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Select and activate any pre-built theme, or click <strong className="text-white font-mono">+ Add Custom Theme</strong> to paste AI prompts, external libraries, and custom code.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Active Theme Pill */}
          <div className="px-3.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-400">Active:</span>
            <span className="text-white font-bold truncate max-w-[150px]">
              {themes.find((t) => t.id === activeThemeId)?.name || activeThemeId}
            </span>
          </div>

          <Link
            href="/"
            target="_blank"
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors flex items-center gap-1.5"
          >
            <span>View Live Site</span>
            <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
          </Link>

          {/* Prominent + Add Theme Button */}
          <button
            onClick={handleOpenAddModal}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-semibold text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-indigo-600/30 transition-all hover:scale-105 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add Custom Theme</span>
          </button>
        </div>
      </div>

      {/* Status Alert Notification */}
      {statusMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs flex items-center justify-between animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{statusMessage}</span>
          </div>
          <button onClick={() => setStatusMessage(null)} className="text-emerald-400 hover:text-white">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Theme Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* + Add New Theme Card Placeholder */}
        <div 
          onClick={handleOpenAddModal}
          className="group border-2 border-dashed border-slate-800 hover:border-indigo-500/60 rounded-3xl p-8 flex flex-col items-center justify-center text-center space-y-4 bg-slate-950/40 hover:bg-slate-900/40 transition-all cursor-pointer min-h-[300px]"
        >
          <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all flex items-center justify-center text-indigo-400">
            <Plus className="w-7 h-7 stroke-[2.5]" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
              Add New Theme / Custom Code
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-[220px]">
              Provide an AI design prompt, CDN libraries, or paste custom HTML/CSS/JS.
            </p>
          </div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-indigo-400 group-hover:underline">
            Open Theme Studio →
          </span>
        </div>

        {/* Existing Themes */}
        {themes.map((theme) => {
          const isActive = theme.id === activeThemeId;
          const isCustom = theme.category === 'custom';

          return (
            <div
              key={theme.id}
              className={`rounded-3xl border transition-all flex flex-col justify-between overflow-hidden relative ${
                isActive
                  ? 'bg-slate-900/90 border-indigo-500 shadow-2xl shadow-indigo-950/50 ring-2 ring-indigo-500/30'
                  : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 shadow-lg'
              }`}
            >
              {/* Card Header & Badges */}
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider ${
                      isCustom 
                        ? 'bg-purple-950/80 text-purple-300 border border-purple-800/40' 
                        : 'bg-indigo-950/80 text-indigo-300 border border-indigo-800/40'
                    }`}>
                      {isCustom ? 'Custom Code' : 'System Theme'}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-slate-900 text-slate-400 border border-slate-800">
                      {theme.displayMode === 'hero_replace' ? 'Hero Override' : 'Full Page'}
                    </span>
                  </div>

                  {isActive ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-[10px] font-mono font-bold uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Active Live
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                      Ready
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white font-heading">
                    {theme.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed line-clamp-3">
                    {theme.description}
                  </p>
                </div>

                {/* Tags */}
                {Array.isArray(theme.tags) && theme.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {theme.tags.map((tag, idx) => (
                      <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800/80">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Prompt preview if available */}
                {theme.prompt && (
                  <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 font-mono">
                    <span className="text-slate-500 block text-[9px] uppercase font-bold">Design Prompt:</span>
                    <span className="line-clamp-2 italic">&ldquo;{theme.prompt}&rdquo;</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="p-4 border-t border-slate-800/80 bg-slate-950/60 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  {/* Preview button */}
                  <button
                    onClick={() => {
                      setPreviewTheme(theme);
                      setPreviewModalOpen(true);
                    }}
                    className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs transition-colors flex items-center gap-1"
                    title="Live Preview Theme"
                  >
                    <Eye className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="hidden sm:inline text-[11px]">Preview</span>
                  </button>

                  {/* Duplicate */}
                  <button
                    onClick={() => handleDuplicateTheme(theme)}
                    className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 text-xs transition-colors"
                    title="Duplicate as new custom theme"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>

                  {/* Edit (if custom) */}
                  {isCustom && (
                    <button
                      onClick={() => handleOpenEditModal(theme)}
                      className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs transition-colors"
                      title="Edit Code & Libraries"
                    >
                      <Code className="w-3.5 h-3.5 text-indigo-400" />
                    </button>
                  )}

                  {/* Delete (if custom) */}
                  {isCustom && (
                    <button
                      onClick={() => handleDeleteTheme(theme.id)}
                      className="p-2 rounded-xl bg-slate-900 hover:bg-red-950/60 text-slate-500 hover:text-red-400 border border-slate-800 text-xs transition-colors"
                      title="Delete Theme"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Primary Activate Button */}
                {isActive ? (
                  <button
                    disabled
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-semibold flex items-center gap-1.5 cursor-default"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Applied</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleActivateTheme(theme.id)}
                    disabled={activatingId === theme.id}
                    className="px-4 py-1.5 rounded-xl bg-white hover:bg-slate-200 text-black font-semibold text-xs font-mono uppercase tracking-wider transition-all shadow hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-50"
                  >
                    {activatingId === theme.id ? 'Applying...' : 'Activate Theme'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL 1: Add / Edit Custom Theme Studio */}
      {editorModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-slate-950 border border-slate-800 rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-200 text-left overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <Palette className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white font-heading">
                    {editingTheme.id ? 'Edit Theme / Front Page Design' : 'Create Custom Front Page Theme'}
                  </h2>
                  <p className="text-xs text-slate-400">
                    Add custom code, external scripts/libraries, and design prompts to apply directly to the website.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setEditorModalOpen(false)}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
              {/* Row 1: Basic Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5 font-bold">
                    Theme Name *
                  </label>
                  <input
                    type="text"
                    value={editingTheme.name || ''}
                    onChange={(e) => setEditingTheme({ ...editingTheme, name: e.target.value })}
                    placeholder="e.g. Modern Glassmorphism Hero"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-sans focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5 font-bold">
                    Display Mode
                  </label>
                  <select
                    value={editingTheme.displayMode || 'full_page'}
                    onChange={(e) => setEditingTheme({ ...editingTheme, displayMode: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-sans focus:outline-none focus:border-indigo-500"
                  >
                    <option value="full_page">Full Page Replacement (Entire Homepage)</option>
                    <option value="hero_replace">Hero Override (Keep SchoolMIS &amp; 3 Pillars)</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5 font-bold">
                    Description &amp; Purpose
                  </label>
                  <input
                    type="text"
                    value={editingTheme.description || ''}
                    onChange={(e) => setEditingTheme({ ...editingTheme, description: e.target.value })}
                    placeholder="Brief description of this visual layout"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-sans focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Starter Boilerplates picker */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs text-white font-semibold">Load Quick Starter Template:</span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {STARTER_BOILERPLATES.map((bp, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => applyBoilerplate(bp)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs border border-slate-700 transition-colors"
                    >
                      {bp.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Editor Tabs Navigation */}
              <div className="flex items-center border-b border-slate-800 gap-1 overflow-x-auto">
                {[
                  { id: 'html', label: 'HTML / Tailwind Markup', icon: FileCode },
                  { id: 'css', label: 'Custom CSS (<style>)', icon: Palette },
                  { id: 'js', label: 'Custom Script (<script>)', icon: Code },
                  { id: 'libraries', label: `External Libraries (${(editingTheme.libraries || []).length})`, icon: Globe },
                  { id: 'prompt', label: 'AI Design Prompt', icon: BookOpen },
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveEditorTab(tab.id as any)}
                      className={`px-4 py-2.5 text-xs font-mono uppercase tracking-wider flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
                        activeEditorTab === tab.id
                          ? 'border-indigo-500 text-white font-bold bg-slate-900/80'
                          : 'border-transparent text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tab 1: HTML / Tailwind Code */}
              {activeEditorTab === 'html' && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs text-slate-400 font-mono">
                    <span>Write HTML with Tailwind CSS classes or custom elements:</span>
                    <span className="text-emerald-400">Tailwind JIT Supported</span>
                  </div>
                  <textarea
                    rows={12}
                    value={editingTheme.customHtml || ''}
                    onChange={(e) => setEditingTheme({ ...editingTheme, customHtml: e.target.value })}
                    placeholder="<div class='min-h-screen bg-black text-white p-8'>...</div>"
                    className="w-full p-4 rounded-xl bg-slate-900 border border-slate-800 text-cyan-300 font-mono text-xs focus:outline-none focus:border-indigo-500 leading-relaxed resize-y"
                    spellCheck={false}
                  />
                </div>
              )}

              {/* Tab 2: Custom CSS */}
              {activeEditorTab === 'css' && (
                <div className="space-y-2">
                  <div className="text-xs text-slate-400 font-mono">
                    Custom CSS stylesheet (keyframes, animations, scoped selectors):
                  </div>
                  <textarea
                    rows={12}
                    value={editingTheme.customCss || ''}
                    onChange={(e) => setEditingTheme({ ...editingTheme, customCss: e.target.value })}
                    placeholder="@keyframes pulseGlow { 0% { opacity: 0.5; } 100% { opacity: 1; } }"
                    className="w-full p-4 rounded-xl bg-slate-900 border border-slate-800 text-emerald-300 font-mono text-xs focus:outline-none focus:border-indigo-500 leading-relaxed resize-y"
                    spellCheck={false}
                  />
                </div>
              )}

              {/* Tab 3: Custom JS */}
              {activeEditorTab === 'js' && (
                <div className="space-y-2">
                  <div className="text-xs text-slate-400 font-mono">
                    Custom JavaScript (executed upon component mount, <code>container</code> provided as parameter):
                  </div>
                  <textarea
                    rows={12}
                    value={editingTheme.customJs || ''}
                    onChange={(e) => setEditingTheme({ ...editingTheme, customJs: e.target.value })}
                    placeholder="// e.g. initialize GSAP animations, particle canvases, or click listeners&#10;console.log('Theme initialized', container);"
                    className="w-full p-4 rounded-xl bg-slate-900 border border-slate-800 text-yellow-300 font-mono text-xs focus:outline-none focus:border-indigo-500 leading-relaxed resize-y"
                    spellCheck={false}
                  />
                </div>
              )}

              {/* Tab 4: External Libraries & CDNs */}
              {activeEditorTab === 'libraries' && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5 font-bold">
                      Add Custom CDN Script or CSS URL:
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={newLibUrl}
                        onChange={(e) => setNewLibUrl(e.target.value)}
                        placeholder="https://cdnjs.cloudflare.com/ajax/libs/... or https://fonts.googleapis.com/..."
                        className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-indigo-500"
                      />
                      <button
                        type="button"
                        onClick={() => handleAddLibrary(newLibUrl)}
                        className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold font-mono transition-colors"
                      >
                        + Add Library
                      </button>
                    </div>
                  </div>

                  {/* Preset quick buttons */}
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 block mb-2">
                      Quick Add Popular Libraries:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {PRESET_LIBRARIES.map((lib, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleAddLibrary(lib.url)}
                          className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-800 text-xs font-mono transition-colors"
                        >
                          + {lib.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Added Libraries List */}
                  <div className="space-y-2">
                    <span className="text-xs font-mono uppercase text-slate-300 font-bold block">
                      Currently Attached Libraries ({(editingTheme.libraries || []).length}):
                    </span>
                    {(editingTheme.libraries || []).length === 0 ? (
                      <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 text-xs text-slate-500 italic">
                        No external libraries added yet.
                      </div>
                    ) : (
                      (editingTheme.libraries || []).map((lib, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
                          <span className="truncate max-w-[500px]">{lib}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveLibrary(lib)}
                            className="text-red-400 hover:text-red-300 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* Tab 5: AI Prompt / Design Spec */}
              {activeEditorTab === 'prompt' && (
                <div className="space-y-2">
                  <div className="text-xs text-slate-400 font-mono">
                    Record the exact prompt, design instructions, or visual spec used to generate this layout:
                  </div>
                  <textarea
                    rows={10}
                    value={editingTheme.prompt || ''}
                    onChange={(e) => setEditingTheme({ ...editingTheme, prompt: e.target.value })}
                    placeholder="e.g. Design a sleek dark mode website with full-bleed hero, 3D rotating cards, and minimal typography..."
                    className="w-full p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 font-sans text-xs focus:outline-none focus:border-indigo-500 leading-relaxed resize-y"
                  />
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-5 sm:p-6 border-t border-slate-800 bg-slate-900/60 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setEditorModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
              >
                Cancel
              </button>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleSaveTheme(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs font-mono uppercase tracking-wider transition-colors"
                >
                  Save Theme
                </button>
                <button
                  type="button"
                  onClick={() => handleSaveTheme(true)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs font-mono uppercase tracking-wider shadow-lg shadow-indigo-600/30 transition-all hover:scale-105"
                >
                  Save &amp; Apply to Front Page
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Interactive Live Preview Modal */}
      {previewModalOpen && previewTheme && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col p-2 sm:p-4">
          {/* Preview Navigation Bar */}
          <div className="flex items-center justify-between p-3 bg-slate-950 border border-slate-800 rounded-2xl mb-2 text-xs">
            <div className="flex items-center gap-3">
              <span className="font-bold text-white font-heading text-sm">
                Preview: {previewTheme.name}
              </span>
              <span className="text-slate-400 hidden sm:inline">•</span>
              <span className="text-slate-400 hidden sm:inline">{previewTheme.description}</span>
            </div>

            <div className="flex items-center gap-2">
              {/* Device toggles */}
              <div className="flex bg-slate-900 rounded-xl p-1 border border-slate-800">
                <button
                  onClick={() => setPreviewDevice('desktop')}
                  className={`p-1.5 rounded-lg ${previewDevice === 'desktop' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
                  title="Desktop View"
                >
                  <Laptop className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setPreviewDevice('tablet')}
                  className={`p-1.5 rounded-lg ${previewDevice === 'tablet' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
                  title="Tablet View"
                >
                  <Tablet className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setPreviewDevice('mobile')}
                  className={`p-1.5 rounded-lg ${previewDevice === 'mobile' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
                  title="Mobile View"
                >
                  <Smartphone className="w-4 h-4" />
                </button>
              </div>

              {/* Apply theme directly from preview */}
              <button
                onClick={() => {
                  handleActivateTheme(previewTheme.id);
                  setPreviewModalOpen(false);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-200 text-black font-semibold text-xs font-mono uppercase tracking-wider transition-colors"
              >
                Apply to Website
              </button>

              <button
                onClick={() => setPreviewModalOpen(false)}
                className="p-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Preview Container Frame */}
          <div className="flex-1 flex justify-center items-center overflow-hidden bg-slate-950/50 rounded-2xl border border-slate-800/80 p-2">
            <div 
              className={`h-full transition-all duration-300 rounded-xl overflow-y-auto bg-black border border-slate-800 shadow-2xl ${
                previewDevice === 'mobile' 
                  ? 'w-[375px]' 
                  : previewDevice === 'tablet' 
                  ? 'w-[768px]' 
                  : 'w-full'
              }`}
            >
              {/* Render custom theme HTML or notice */}
              {previewTheme.customHtml ? (
                <div 
                  className="w-full min-h-full"
                  dangerouslySetInnerHTML={{ __html: previewTheme.customHtml }}
                />
              ) : (
                <div className="p-12 text-center text-slate-400 space-y-4">
                  <div className="text-lg font-bold text-white">System Theme: {previewTheme.name}</div>
                  <p className="max-w-md mx-auto text-xs leading-relaxed">
                    This is a native React server component theme compiled into the application bundle. You can activate it to display it live across the website.
                  </p>
                  <button
                    onClick={() => {
                      handleActivateTheme(previewTheme.id);
                      setPreviewModalOpen(false);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold text-xs uppercase tracking-wider"
                  >
                    Activate on Website Now
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
