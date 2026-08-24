import React, { useState } from 'react';
import { Zap, Calculator, ArrowRight } from 'lucide-react';
import { WORKFLOWS_DATA } from '../data/workflows';
import { WorkflowCard } from '../components/common/WorkflowCard';
import { CTASection } from '../components/common/CTASection';
import { MeetingSection } from '../components/home/MeetingSection';

export const AutomationPage: React.FC = () => {
  const [teamSize, setTeamSize] = useState(5);
  const [hourlyRate, setHourlyRate] = useState(50);
  const [manualHoursPerWeek, setManualHoursPerWeek] = useState(8);

  const monthlyHoursSaved = Math.round(teamSize * manualHoursPerWeek * 4 * 0.75);
  const monthlyCostSaved = Math.round(monthlyHoursSaved * hourlyRate);
  const annualCostSaved = monthlyCostSaved * 12;

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-24">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>Operational Efficiency & Autopilot Systems</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight font-heading leading-tight">
          Stop Doing Everything <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-300 to-cyan-400">
            Manually.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
          We help businesses automate repetitive tasks so they can focus on customers, growth, and high-leverage strategic work.
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#calculator"
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all"
          >
            <Calculator className="w-4 h-4" />
            <span>Calculate Your Savings</span>
          </a>
          <a
            href="#schedule-meeting"
            className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-xs border border-slate-700 transition-colors"
          >
            Book Workflow Audit
          </a>
        </div>
      </div>

      {/* 3 Core Visual Workflow Pipelines */}
      <div className="space-y-8 text-left">
        <div>
          <span className="text-xs font-mono uppercase text-cyan-400 font-semibold tracking-wider">
            Architecture Blueprints
          </span>
          <h2 className="text-3xl font-bold text-white font-heading mt-1">
            Example Production Workflows
          </h2>
        </div>

        <div className="space-y-8">
          {WORKFLOWS_DATA.map((wf) => (
            <WorkflowCard key={wf.id} workflow={wf} />
          ))}
        </div>
      </div>

      {/* Interactive Automation ROI & Cost Savings Calculator */}
      <div id="calculator" className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-12 space-y-8 text-left shadow-2xl backdrop-blur-2xl scroll-mt-28">
        <div className="border-b border-slate-800 pb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/40 text-emerald-400 text-xs font-mono mb-2">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive ROI Estimator</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading">
            Calculate How Much Time & Money Automation Saves You
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Sliders Area */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-300 mb-2">
                <span>Team Members Doing Repetitive Work:</span>
                <span className="text-indigo-400 font-mono text-sm">{teamSize} People</span>
              </div>
              <input
                type="range"
                min={1}
                max={50}
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-300 mb-2">
                <span>Average Manual Hours Spent per Person / Week:</span>
                <span className="text-cyan-400 font-mono text-sm">{manualHoursPerWeek} Hours / Wk</span>
              </div>
              <input
                type="range"
                min={2}
                max={30}
                value={manualHoursPerWeek}
                onChange={(e) => setManualHoursPerWeek(Number(e.target.value))}
                className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-300 mb-2">
                <span>Average Loaded Hourly Cost:</span>
                <span className="text-emerald-400 font-mono text-sm">${hourlyRate} / Hour</span>
              </div>
              <input
                type="range"
                min={20}
                max={250}
                step={5}
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>
          </div>

          {/* Savings Result Card */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-slate-950 border border-indigo-500/30 text-center space-y-6 shadow-xl">
            <span className="text-xs font-mono uppercase text-slate-400 tracking-wider font-semibold">
              Estimated Annual Savings
            </span>

            <div className="space-y-1">
              <span className="text-4xl sm:text-5xl font-mono font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                ${annualCostSaved.toLocaleString()}
              </span>
              <span className="text-xs text-slate-400 block">per year in recovered labor</span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-900 text-xs">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Monthly Hours Saved</span>
                <span className="text-lg font-bold text-white font-mono">{monthlyHoursSaved} hrs</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Monthly Cost Saved</span>
                <span className="text-lg font-bold text-emerald-400 font-mono">${monthlyCostSaved.toLocaleString()}</span>
              </div>
            </div>

            <a
              href="#schedule-meeting"
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-600/30 flex items-center justify-center gap-1.5 transition-all"
            >
              <span>Unlock These Savings for Your Business</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>
      </div>

      {/* CTA Section */}
      <CTASection
        headline="Ready to Eliminate Manual Workflows?"
        description="Schedule a 1-on-1 automation architecture consultation to map out your custom pipelines."
      />

      {/* Meeting Section */}
      <MeetingSection />

    </div>
  );
};
