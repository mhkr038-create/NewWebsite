import React, { useState, useMemo } from 'react';
import { 
  Bot, 
  Cpu, 
  Terminal, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Play, 
  Activity, 
  Layers, 
  Zap, 
  X, 
  Code2, 
  Workflow, 
  FileCode 
} from 'lucide-react';
import { DemoFrameWrapper } from '../DemoFrameWrapper';
import { DEMO_REGISTRY } from '../../data/demos';

const demoData = DEMO_REGISTRY.find(d => d.id === 'ai-agency')!;

export const AiAgencyDemo: React.FC = () => {
  const [activePromptTab, setActivePromptTab] = useState<'support' | 'leads' | 'doc'>('support');
  const [isRunningAgent, setIsRunningAgent] = useState(false);
  const [agentOutput, setAgentOutput] = useState<string | null>(null);

  // ROI Calculator State
  const [teamSize, setTeamSize] = useState<number>(12);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(15);
  const [hourlyCost, setHourlyCost] = useState<number>(45);

  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingDone, setBookingDone] = useState(false);

  const calculatedRoi = useMemo(() => {
    const totalWeeklyHours = teamSize * hoursPerWeek;
    const hoursSavedWeekly = totalWeeklyHours * 0.75; // 75% automation efficiency
    const monthlyDollarsSaved = hoursSavedWeekly * hourlyCost * 4.2;
    const annualDollarsSaved = monthlyDollarsSaved * 12;

    return {
      hoursSavedMonthly: Math.round(hoursSavedWeekly * 4.2),
      monthlyDollarsSaved: Math.round(monthlyDollarsSaved),
      annualDollarsSaved: Math.round(annualDollarsSaved),
      roiMultiplier: '7.8x',
    };
  }, [teamSize, hoursPerWeek, hourlyCost]);

  const handleRunAgent = () => {
    setIsRunningAgent(true);
    setAgentOutput(null);

    setTimeout(() => {
      if (activePromptTab === 'support') {
        setAgentOutput(`[NexusAI Agent Swarm v4.2 - Execution Complete]
✔ Ingested incoming Zendesk ticket #8942
✔ Parsed customer sentiment: Urgent / Billing Discrepancy
✔ Queried Stripe API & verified $420 double charge on account 'acct_984'
✔ Issued automated refund via Stripe webhook (Tx: #rf_091823)
✔ Generated empathetic, branded resolution email in 1.2 seconds.
✔ Status: TICKET RESOLVED (Zero human agent intervention required)`);
      } else if (activePromptTab === 'leads') {
        setAgentOutput(`[NexusAI Lead Intelligence Pipeline]
✔ Captured inbound form submission: CTO at FinTech Series B
✔ Scraped LinkedIn & Apollo: 140 headcount, $18M funding, tech stack: React/AWS
✔ Enriched lead score: 98/100 (Tier-1 Enterprise Buyer)
✔ Auto-scheduled calendar invite with VP of Sales & drafted personalized slide deck.
✔ CRM synced to HubSpot & Slack alert dispatched to #deals-won`);
      } else {
        setAgentOutput(`[NexusAI Document Extraction & Compliance Engine]
✔ Uploaded 48-page commercial lease agreement PDF
✔ Extracted 14 core covenants, indemnification clauses & renewal dates
✔ Identified 2 non-standard liability risk outliers in Section 14.3
✔ Generated executive summary markdown report & synced to Notion database in 2.8s`);
      }
      setIsRunningAgent(false);
    }, 1200);
  };

  return (
    <DemoFrameWrapper demo={demoData}>
      <div className="bg-[#040711] text-slate-100 font-sans min-h-screen selection:bg-cyan-500 selection:text-slate-950">
        
        {/* Futuristic Agency Header */}
        <header className="bg-[#070c1e]/90 border-b border-cyan-500/20 sticky top-12 z-30 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 p-[1.5px] shadow-lg shadow-cyan-500/20">
                <div className="w-full h-full bg-[#040711] rounded-[10px] flex items-center justify-center">
                  <Bot className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <div>
                <span className="font-extrabold text-lg text-white font-heading tracking-tight flex items-center gap-1.5">
                  Nexus<span className="text-cyan-400">AI</span> Systems
                </span>
                <span className="text-[10px] text-cyan-300/80 block font-mono">
                  Autonomous AI Workflows & LLM Agents
                </span>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-7 text-xs font-mono uppercase tracking-wider text-slate-300">
              <a href="#sandbox" className="hover:text-cyan-400 transition-colors">Agent Sandbox</a>
              <a href="#services" className="hover:text-cyan-400 transition-colors">Solutions</a>
              <a href="#calculator" className="hover:text-cyan-400 transition-colors">ROI Calculator</a>
              <a href="#pipeline" className="hover:text-cyan-400 transition-colors">Architecture</a>
              <a href="#cases" className="hover:text-cyan-400 transition-colors">Case Studies</a>
            </nav>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setBookingDone(false);
                  setBookingModalOpen(true);
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 transition-all flex items-center gap-1.5 font-mono"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
                <span>Deploy AI Agents</span>
              </button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative pt-20 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[#0a122c] via-[#040711] to-[#040711]">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 text-xs font-mono">
                <Cpu className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span>Next-Gen Enterprise LLM Orchestration</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] font-heading">
                Turn Complex Manual Operations Into <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                  Autonomous AI Workflows.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
                We engineer custom autonomous AI agents that handle 24/7 client triage, streamline complex back-office data pipelines, and cut operational costs by over 70%.
              </p>

              {/* Performance Metrics */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800">
                <div className="p-3.5 rounded-2xl bg-[#091124] border border-cyan-500/20">
                  <span className="text-2xl font-mono font-bold text-cyan-400">120k+</span>
                  <p className="text-[11px] text-slate-400 mt-0.5">Hours Saved Monthly</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#091124] border border-cyan-500/20">
                  <span className="text-2xl font-mono font-bold text-cyan-400">8.4x</span>
                  <p className="text-[11px] text-slate-400 mt-0.5">Average Client ROI</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#091124] border border-cyan-500/20">
                  <span className="text-2xl font-mono font-bold text-cyan-400">&lt; 3.0s</span>
                  <p className="text-[11px] text-slate-400 mt-0.5">Agent Response Latency</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={() => {
                    setBookingDone(false);
                    setBookingModalOpen(true);
                  }}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-xl shadow-cyan-500/25 flex items-center gap-2 transition-all hover:scale-105 font-mono"
                >
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>Schedule AI Architecture Audit</span>
                </button>
                <a
                  href="#sandbox"
                  className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 font-semibold text-xs uppercase tracking-wider border border-cyan-500/30 flex items-center gap-2 transition-colors font-mono"
                >
                  <Play className="w-4 h-4 text-cyan-400" />
                  <span>Test Live Agent Sandbox</span>
                </a>
              </div>
            </div>

            {/* Right Card: Live Interactive AI Sandbox */}
            <div id="sandbox" className="lg:col-span-5">
              <div className="bg-[#091124] border border-cyan-500/40 rounded-3xl p-6 sm:p-7 shadow-2xl shadow-cyan-950/60 backdrop-blur-xl relative">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2 font-mono text-xs text-cyan-400">
                    <Terminal className="w-4 h-4" />
                    <span>Agent Execution Sandbox</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-mono border border-emerald-500/30 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    Live LLM Node
                  </span>
                </div>

                {/* Workflow preset switcher */}
                <div className="mt-4 grid grid-cols-3 gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
                  <button
                    onClick={() => {
                      setActivePromptTab('support');
                      setAgentOutput(null);
                    }}
                    className={`py-1.5 px-2 rounded-lg text-[11px] font-mono transition-colors ${activePromptTab === 'support' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
                  >
                    Customer Support
                  </button>
                  <button
                    onClick={() => {
                      setActivePromptTab('leads');
                      setAgentOutput(null);
                    }}
                    className={`py-1.5 px-2 rounded-lg text-[11px] font-mono transition-colors ${activePromptTab === 'leads' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
                  >
                    Lead Triage
                  </button>
                  <button
                    onClick={() => {
                      setActivePromptTab('doc');
                      setAgentOutput(null);
                    }}
                    className={`py-1.5 px-2 rounded-lg text-[11px] font-mono transition-colors ${activePromptTab === 'doc' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
                  >
                    Doc Extraction
                  </button>
                </div>

                {/* Terminal console screen */}
                <div className="mt-4 p-4 rounded-2xl bg-black/90 border border-slate-800/90 font-mono text-xs min-h-[190px] flex flex-col justify-between">
                  <div className="text-slate-400 space-y-1">
                    <p className="text-cyan-400 font-semibold">&gt; Workflow: {activePromptTab === 'support' ? 'Automated Customer Resolution Agent' : activePromptTab === 'leads' ? 'Inbound Lead Enrichment & CRM Pipeline' : 'Contract Intelligence & Risk Extractor'}</p>
                    {isRunningAgent && (
                      <p className="text-amber-400 animate-pulse mt-2 flex items-center gap-2">
                        <Activity className="w-3.5 h-3.5 animate-spin" />
                        <span>Querying vector memory & executing autonomous tool calls...</span>
                      </p>
                    )}
                    {agentOutput && (
                      <div className="mt-2 whitespace-pre-line text-emerald-400 text-[11px] leading-relaxed animate-in fade-in duration-300">
                        {agentOutput}
                      </div>
                    )}
                    {!isRunningAgent && !agentOutput && (
                      <p className="text-slate-500 italic mt-3">Click below to simulate live autonomous agent execution in real time.</p>
                    )}
                  </div>
                </div>

                <button
                  onClick={handleRunAgent}
                  disabled={isRunningAgent}
                  className="w-full mt-4 py-3 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Play className="w-4 h-4 fill-slate-950" />
                  <span>{isRunningAgent ? 'Running Agent Swarm...' : 'Execute Agent Workflow'}</span>
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* AI Services Solutions */}
        <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-mono uppercase text-cyan-400 tracking-wider font-semibold">
              Engineered Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-heading">
              Autonomous AI Systems We Build
            </h2>
            <p className="text-sm text-slate-400">
              From enterprise RAG pipelines to autonomous multi-agent task swarms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Autonomous Customer Service Swarms',
                desc: 'Trained on your private product documentation, past tickets, and CRM records to resolve 60-80% of support inquiries with zero human involvement.',
                icon: Bot,
                tags: ['Zendesk', 'Intercom', 'Stripe Sync'],
              },
              {
                title: 'Automated Lead Enrichment & SDRs',
                desc: 'Scrapes, enriches, and scores every inbound lead within 60 seconds, drafting hyper-personalized outreach and booking meetings directly into sales calendars.',
                icon: Zap,
                tags: ['Apollo API', 'HubSpot', 'Gmail OAuth'],
              },
              {
                title: 'Intelligent Document & Invoice OCR',
                desc: 'Extract structured data from complex PDFs, legal contracts, medical charts, and supplier invoices directly into your internal database.',
                icon: FileCode,
                tags: ['Vision LLMs', 'Schema Validation', 'Postgres'],
              },
              {
                title: 'Custom Knowledge Base RAG Systems',
                desc: 'Connect your internal Notion, Google Drive, Jira, and Slack archives into a unified, secure enterprise AI assistant with fine-grained RBAC.',
                icon: Layers,
                tags: ['Pinecone', 'Hybrid Search', 'SOC2 Safe'],
              },
              {
                title: 'Autonomous Code & QA Agents',
                desc: 'Automated test writing, vulnerability scanning, PR reviews, and error reproduction pipelines that streamline engineering release velocity.',
                icon: Code2,
                tags: ['GitHub Actions', 'Docker', 'Sentry'],
              },
              {
                title: 'Cross-App Workflow Automations',
                desc: 'Custom n8n and Make.com architectures connecting over 50+ enterprise SaaS apps with self-healing error loops and Slack monitoring.',
                icon: Workflow,
                tags: ['n8n Self-Hosted', 'Webhooks', 'REST APIs'],
              },
            ].map((srv, idx) => {
              const IconComp = srv.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#091124] border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-6 transition-all hover:shadow-xl hover:shadow-cyan-950/40 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors mb-5">
                    <IconComp className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
                    {srv.desc}
                  </p>

                  <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                    {srv.tags.map((t, i) => (
                      <span key={i} className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-950 text-cyan-300/80 border border-slate-800">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Interactive ROI Savings Calculator */}
        <section id="calculator" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#070c1e] border-y border-cyan-500/20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
              <span className="text-xs font-mono uppercase text-cyan-400 tracking-wider font-semibold">
                Financial Impact Modeling
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white font-heading">
                Calculate Your Automation ROI
              </h2>
              <p className="text-sm text-slate-400">
                Estimate how many hundreds of manual labor hours and operational dollars AI workflows will return to your business.
              </p>
            </div>

            <div className="bg-[#091124] border border-cyan-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Inputs */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-2">
                    <span className="text-slate-300">Team Size on Repetitive Tasks:</span>
                    <span className="text-cyan-400 font-bold text-sm">{teamSize} Employees</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="100"
                    step="1"
                    value={teamSize}
                    onChange={(e) => setTeamSize(Number(e.target.value))}
                    className="w-full accent-cyan-400 bg-slate-900 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-2">
                    <span className="text-slate-300">Hours Per Week Spent Manually (Per Person):</span>
                    <span className="text-cyan-400 font-bold text-sm">{hoursPerWeek} Hours/wk</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="35"
                    step="1"
                    value={hoursPerWeek}
                    onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                    className="w-full accent-cyan-400 bg-slate-900 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-2">
                    <span className="text-slate-300">Average Blended Hourly Rate:</span>
                    <span className="text-cyan-400 font-bold text-sm">${hourlyCost}/hour</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="150"
                    step="5"
                    value={hourlyCost}
                    onChange={(e) => setHourlyCost(Number(e.target.value))}
                    className="w-full accent-cyan-400 bg-slate-900 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              {/* Output Display */}
              <div className="lg:col-span-6 bg-[#040711] border border-cyan-500/30 rounded-2xl p-6 sm:p-8 space-y-6">
                <div className="text-center space-y-1 pb-6 border-b border-slate-800">
                  <span className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                    Estimated Annual Operational Savings
                  </span>
                  <h3 className="text-4xl sm:text-5xl font-mono font-extrabold text-cyan-400 tracking-tight mt-1">
                    ${calculatedRoi.annualDollarsSaved.toLocaleString()}
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 font-mono">
                    <span className="text-[11px] text-slate-400 uppercase block">Hours Reclaimed</span>
                    <span className="text-lg font-bold text-white mt-1 block">
                      {calculatedRoi.hoursSavedMonthly} hrs/mo
                    </span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/20 font-mono">
                    <span className="text-[11px] text-cyan-400 uppercase block">Projected ROI</span>
                    <span className="text-lg font-bold text-emerald-400 mt-1 block">
                      {calculatedRoi.roiMultiplier}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setBookingDone(false);
                    setBookingModalOpen(true);
                  }}
                  className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider rounded-xl shadow-xl shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <span>Build This Custom AI System For My Team</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        </section>

        {/* 4-Step Pipeline */}
        <section id="pipeline" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-mono uppercase text-cyan-400 tracking-wider font-semibold">
              Rapid Execution Model
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-heading">
              From Discovery to Live AI in 14 Days
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Operational Audit',
                desc: 'We map out your highest-cost repetitive manual tasks, data silos, and workflow bottlenecks.',
              },
              {
                step: '02',
                title: 'Agent Architecture',
                desc: 'We design custom LLM prompts, tool schema integrations, and private vector memory stores.',
              },
              {
                step: '03',
                title: 'Sandbox Staging',
                desc: 'Rigorous benchmark evaluation with edge-case regression tests to guarantee zero hallucinations.',
              },
              {
                step: '04',
                title: 'Autopilot Launch',
                desc: 'Seamless production deployment with automated Slack fail-safe monitoring and continuous fine-tuning.',
              },
            ].map((p, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#091124] border border-slate-800 space-y-3">
                <span className="text-xs font-mono text-cyan-400 font-bold bg-cyan-950 px-2.5 py-1 rounded-md border border-cyan-800/50">
                  PHASE {p.step}
                </span>
                <h4 className="text-base font-bold text-white">{p.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* AI Strategy Consultation Modal */}
        {bookingModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-[#091124] border border-cyan-500/40 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl font-mono">
              <button
                onClick={() => setBookingModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>

              {!bookingDone ? (
                <div>
                  <span className="text-[11px] text-cyan-400 uppercase tracking-wider font-semibold">
                    Confidential Architecture Call
                  </span>
                  <h3 className="text-xl font-bold text-white font-heading mt-1">Book AI Strategy Session</h3>
                  <p className="text-xs text-slate-400 mt-1 font-sans">
                    Speak directly with a lead AI systems engineer. We'll map your custom agent architecture live.
                  </p>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setBookingDone(true);
                    }}
                    className="mt-5 space-y-3.5 text-xs"
                  >
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Alex Mercer"
                        className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1">Company Email</label>
                        <input
                          type="email"
                          required
                          placeholder="alex@company.com"
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1">Company Website</label>
                        <input
                          type="text"
                          required
                          placeholder="company.com"
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">Primary Automation Objective</label>
                      <select className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-cyan-400">
                        <option>Automate Customer Support & Triage</option>
                        <option>Lead Scraping & Inbound SDR Automation</option>
                        <option>Document / Invoice Intelligence Extraction</option>
                        <option>Custom Enterprise RAG Knowledge Base</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-2 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-cyan-500/25 transition-all"
                    >
                      Schedule Architecture Session
                    </button>
                  </form>
                </div>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto border border-cyan-500/40">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white font-heading">Strategy Session Confirmed</h3>
                    <p className="text-xs text-slate-300 mt-1 max-w-sm mx-auto font-sans">
                      Our lead AI systems architect has sent a private calendar link to your email. We look forward to analyzing your workflows.
                    </p>
                  </div>
                  <button
                    onClick={() => setBookingModalOpen(false)}
                    className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-xl text-xs font-semibold"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </DemoFrameWrapper>
  );
};
