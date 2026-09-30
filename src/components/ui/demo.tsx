// This is a file with a demo for your component
// That's what users will see in the preview
// Create new files in this directory to add more demos

"use client";

import { ImageStreamHero } from "@/components/ui/image-stream-hero";
import { Sparkles, ArrowRight } from "lucide-react";

// Verified stock images from Unsplash and CDN
const IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    alt: "Abstract 3D curved waves and modern color palette",
  },
  {
    src: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&auto=format&fit=crop&q=80",
    alt: "Vibrant neon lighting and architectural gradient",
  },
  {
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80",
    alt: "High-tech circuit board and future digital network",
  },
  {
    src: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80",
    alt: "Artistic oil portrait with creative modern expression",
  },
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
    alt: "Modern luxury architecture and ambient evening lighting",
  },
  {
    src: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80",
    alt: "Northern lights aurora borealis across starry sky",
  },
  {
    src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80",
    alt: "Earth satellite connectivity and global data network",
  },
  {
    src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
    alt: "Cybersecurity code matrix and digital encryption",
  },
  {
    src: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&auto=format&fit=crop&q=80",
    alt: "Milky Way galaxy and deep space nebula",
  },
  {
    src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&auto=format&fit=crop&q=80",
    alt: "Creative strategy meeting and analytics dashboard",
  },
  {
    src: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&auto=format&fit=crop&q=80",
    alt: "Digital user interface design and modern branding",
  },
  {
    src: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80",
    alt: "Modern executive and digital leadership",
  },
];

// ONLY DEFAULT EXPORT WILL BE TREATED AS A DEMO
export default function DemoOne() {
  return (
    <ImageStreamHero
      images={IMAGES}
      className="h-[560px] w-full rounded-2xl border border-white/10 bg-neutral-950 shadow-2xl overflow-hidden"
    >
      <div className="relative z-10 flex h-full flex-col items-center justify-between py-12 px-4 text-center">
        <div className="flex flex-col items-center space-y-4 max-w-2xl px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-cyan-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive 3D Corridor Experience</span>
          </div>
          <h1 className="text-balance text-4xl font-medium tracking-tight text-white sm:text-6xl font-heading leading-tight">
            Your work,
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              front and centre.
            </span>
          </h1>
        </div>

        <div className="flex flex-col items-center gap-4 max-w-md px-6">
          <p className="text-balance text-sm text-neutral-400 leading-relaxed">
            A dynamic hero corridor that leads with imagery instead of just describing it.
            Swap in your own brand visuals and the perspective stream automatically balances around them.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="#explore"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-neutral-950 font-semibold text-xs hover:bg-neutral-200 transition-all shadow-lg"
            >
              <span>Explore Gallery</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </ImageStreamHero>
  );
}
