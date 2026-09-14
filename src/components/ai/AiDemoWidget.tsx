'use client';

import React, { useState } from 'react';
import { Bot, Sparkles, CheckCircle2, CornerDownLeft, RefreshCw } from 'lucide-react';


interface PromptPreset {
  id: string;
  category: string;
  title: string;
  prompt: string;
  response: string;
  metrics: { timeSaved: string; action: string; confidence: string };
}

const PRESETS: PromptPreset[] = [
  {
    id: 'lead-qualification',
    category: 'Lead Intake',
    title: 'Qualify & Triage High-Value Prospect',
    prompt: 'A visitor just submitted: "We are a 45-person B2B company spending ₹1.5L/mo on ads, but our leads take 2 days to get answered. We need an automated chatbot and CRM routing."',
    response: `🎯 High-Intent Lead Detected (₹1.5L/mo ad spend).
1. Lead Priority: TIER-1 Enterprise (Urgent SLA).
2. Action Taken: Auto-created deal in HubSpot CRM, assigned to Senior Architect.
3. Automated Action: Sent VIP Calendly booking link with personalized 3-minute video intro via SMS & Email.
4. Estimated Value: ₹75,000/mo retainer opportunity.`,
    metrics: { timeSaved: '45 mins manual triage', action: 'Instant CRM + Calendar Route', confidence: '99.2%' },
  },
  {
    id: 'support-resolution',
    category: 'Customer Support',
    title: 'Resolve Complex Multi-Turn Support Query',
    prompt: 'Customer asks: "How do I connect my Stripe webhook to sync newly enrolled students into our private Slack channel automatically?"',
    response: `✅ Knowledge Base Match Found:
"To connect Stripe to Slack:
1. In your digitalsimplesolution Admin, navigate to Integrations > Webhooks.
2. Select 'Stripe Checkout Completed' trigger.
3. Choose destination: '#alumni-students' Slack channel.
4. Test the payload & enable toggle. Done in 60 seconds!"

Result: Ticket resolved autonomously without escalating to support staff.`,
    metrics: { timeSaved: '100% human-free resolution', action: 'Direct Knowledge Sync', confidence: '98.8%' },
  },
  {
    id: 'content-engine',
    category: 'Content Automation',
    title: 'Repurpose Case Study into 5 Multi-Channel Assets',
    prompt: 'Repurpose our latest client win: "How Dr. Henderson clinic increased appointments by 68% using our AI Receptionist widget."',
    response: `🚀 Generated 5 Ready-to-Publish Formats:
1. LinkedIn Carousel Hook: "Why 90% of dental clinics lose ₹1.5L/mo to missed calls (and the 5-minute fix)..."
2. X/Twitter Thread: 7-step blueprint dissecting Dr. Henderson's 68% booking lift.
3. Email Newsletter: Subject line "Case Study: The ₹0 ad-spend growth lever."
4. Short-form Video Script: 30-second reel hook with caption & hashtag cluster.
5. High-Impact Quote Card Graphic ready for Instagram.`,
    metrics: { timeSaved: '4 hours copywriting', action: '5 Multi-Channel Assets', confidence: '99.5%' },
  },
];

export const AiDemoWidget: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [activePreset, setActivePreset] = useState<PromptPreset>(PRESETS[0]);
  const [customInput, setCustomInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeResponse, setActiveResponse] = useState(PRESETS[0].response);
  const [activeMetrics, setActiveMetrics] = useState(PRESETS[0].metrics);

  const handleSelectPreset = (preset: PromptPreset) => {
    setActivePreset(preset);
    setCustomInput(preset.prompt);
    setIsProcessing(true);
    setTimeout(() => {
      setActiveResponse(preset.response);
      setActiveMetrics(preset.metrics);
      setIsProcessing(false);
    }, 400);
  };

  const handleRunCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;

    setIsProcessing(true);
    setTimeout(() => {
      setActiveResponse(
        `⚡ Custom AI Agent Analysis Complete:\n` +
        `• Detected Intent: Operational Bottleneck & Growth Automation\n` +
        `• Recommended Solution: Bespoke Multi-Step AI Pipeline & Webhook Connector\n` +
        `• Predicted Impact: Save 20+ hours weekly and accelerate response time to under 10 seconds.\n` +
        `• Next Step: Schedule a 15-minute scoping call to deploy this custom workflow for your brand.`
      );
      setActiveMetrics({
        timeSaved: '20+ hrs/wk projected',
        action: 'Custom Workflow Formatted',
        confidence: '97.8%',
      });
      setIsProcessing(false);
    }, 600);
  };

  return (
    <div className={`bg-slate-900/90 border border-slate-800 rounded-3xl p-4 sm:p-7 shadow-2xl backdrop-blur-2xl ${className}`}>
      
      {/* Top Bar with status & presets */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-5 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-400 p-[1.5px]">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Bot className="w-4 h-4 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-white font-heading">
                Interactive AI Agent Simulator
              </h4>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Test how our intelligent systems handle business automation live
            </p>
          </div>
        </div>

        {/* Preset switch pills */}
        <div className="flex flex-wrap gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
          {PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleSelectPreset(preset)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                activePreset.id === preset.id
                  ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {preset.category}
            </button>
          ))}
        </div>
      </div>

      {/* Main Sandbox Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-5">
        
        {/* Left Input Area */}
        <div className="lg:col-span-5 space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase text-slate-400 font-semibold block">
              Input Prompt / Scenario
            </span>
            <form onSubmit={handleRunCustom} className="space-y-3">
              <textarea
                rows={4}
                value={customInput || activePreset.prompt}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="Type a business scenario to automate..."
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 leading-relaxed resize-none"
              />

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Executing Autonomous Logic...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                    <span>Execute AI Agent Workflow</span>
                    <CornerDownLeft className="w-3.5 h-3.5 opacity-60" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Micro badges */}
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1 text-[11px] text-slate-400">
            <div className="flex items-center justify-between">
              <span>Time Saved:</span>
              <span className="font-bold text-emerald-400 font-mono">{activeMetrics.timeSaved}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Action:</span>
              <span className="font-semibold text-cyan-300">{activeMetrics.action}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Confidence:</span>
              <span className="font-bold text-indigo-400 font-mono">{activeMetrics.confidence}</span>
            </div>
          </div>
        </div>

        {/* Right Output Terminal Area */}
        <div className="lg:col-span-7 flex flex-col">
          <span className="text-[11px] font-mono uppercase text-cyan-400 font-semibold mb-2 flex items-center justify-between">
            <span>Agent Execution Output</span>
            <span className="text-[10px] text-slate-500">Autonomous Pipeline</span>
          </span>

          <div className="flex-1 min-h-[220px] p-4 rounded-2xl bg-slate-950 border border-slate-800/90 font-mono text-xs text-slate-300 relative overflow-hidden shadow-inner flex flex-col justify-between">
            {isProcessing ? (
              <div className="flex-1 flex flex-col items-center justify-center space-y-3 py-10">
                <div className="w-8 h-8 rounded-full border-2 border-indigo-500 border-t-cyan-400 animate-spin" />
                <p className="text-xs text-slate-400 font-sans">
                  Querying vector knowledge base & routing webhooks...
                </p>
              </div>
            ) : (
              <div className="space-y-2 whitespace-pre-line leading-relaxed text-xs animate-in fade-in duration-200">
                {activeResponse}
              </div>
            )}

            <div className="pt-3 mt-3 border-t border-slate-900 flex items-center justify-between text-[10px] text-slate-500">
              <span className="flex items-center gap-1 text-emerald-400 font-sans font-semibold">
                <CheckCircle2 className="w-3 h-3" />
                <span>Zero Latency Live Processing</span>
              </span>
              <span>Encrypted & Guardrailed</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
