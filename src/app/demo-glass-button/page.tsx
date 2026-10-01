import { GlassButton } from "@/components/ui/glass-button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const ZapIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const DottedBackground = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="100%"
    width="100%"
    className="pointer-events-none absolute inset-0 z-0"
  >
    <defs>
      <pattern
        patternUnits="userSpaceOnUse"
        height="30"
        width="30"
        id="dottedGrid"
      >
        <circle
          fill="rgba(255, 255, 255, 0.2)"
          r="1"
          cy="2"
          cx="2"
        ></circle>
      </pattern>
    </defs>
    <rect fill="url(#dottedGrid)" height="100%" width="100%"></rect>
  </svg>
);

export default function GlassButtonDemo() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center gap-8 bg-black text-white p-10 pt-24 overflow-hidden">
      <DottedBackground />

      <div className="absolute top-6 left-6 z-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      <div className="z-10 text-center max-w-xl space-y-4">
        <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono uppercase tracking-wider text-zinc-400">
          Interactive Component Demo
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-heading">
          Liquid Glass Button
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
          3D specular chromatic reflection with animated conic angle gradients, backdrop blur refraction, and dynamic touch/hover tilt response.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 pt-4">
          <GlassButton size="sm">Small</GlassButton>
          <GlassButton
            size="default"
            contentClassName="flex items-center gap-2"
          >
            <span>Generate</span>
            <ZapIcon className="h-5 w-5" />
          </GlassButton>
          <GlassButton size="lg">Submit</GlassButton>
          <GlassButton size="icon" aria-label="Quick Action">
            <ZapIcon className="h-5 w-5" />
          </GlassButton>
        </div>
      </div>
    </div>
  );
}
