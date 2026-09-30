import type { Metadata } from 'next';
import DemoOne from '@/components/ui/demo';

export const metadata: Metadata = {
  title: 'ImageStreamHero 3D Perspective Corridor | Live Demo',
  description: 'Interactive 3D perspective corridor hero component preview with Unsplash imagery and responsive perspective projection.',
};

export default function DemoHeroPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-28 pb-16 px-4 sm:px-8 max-w-6xl mx-auto flex flex-col justify-center">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-white/10 pb-4">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 px-2.5 py-0.5 rounded-full">
            Component Showcase
          </span>
          <h1 className="text-2xl font-bold font-heading mt-2">ImageStreamHero Corridor</h1>
          <p className="text-xs text-neutral-400 font-mono mt-1">
            Path: <code className="text-cyan-300">src/components/ui/image-stream-hero.tsx</code>
          </p>
        </div>
      </div>
      <DemoOne />
    </div>
  );
}
