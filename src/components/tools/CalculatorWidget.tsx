'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Calculator, Sparkles, RotateCcw, Delete, ArrowRight, DollarSign, Users, Zap, Check } from 'lucide-react';
import Link from 'next/link';

export const CalculatorWidget: React.FC = () => {
  const [calcMode, setCalcMode] = useState<'standard' | 'roi'>('standard');

  // Standard calculator state
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [overwrite, setOverwrite] = useState(false);

  // ROI calculator state
  const [studentsCount, setStudentsCount] = useState(650);
  const [currentFeePerStudent, setCurrentFeePerStudent] = useState(150);
  const [monthlyWebsiteVisitors, setMonthlyWebsiteVisitors] = useState(5000);
  const [averageDealValue, setAverageDealValue] = useState(4000);

  // Calculator buttons handler
  const handleDigit = useCallback((digit: string) => {
    if (overwrite || display === '0') {
      setDisplay(digit);
      setOverwrite(false);
    } else {
      if (display.length < 14) {
        setDisplay(display + digit);
      }
    }
  }, [display, overwrite]);

  const handleDecimal = useCallback(() => {
    if (overwrite) {
      setDisplay('0.');
      setOverwrite(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  }, [display, overwrite]);

  const handleClear = useCallback(() => {
    setDisplay('0');
    setEquation('');
    setPrevValue(null);
    setOperation(null);
    setOverwrite(false);
  }, []);

  const handleBackspace = useCallback(() => {
    if (overwrite) {
      setDisplay('0');
      setOverwrite(false);
      return;
    }
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  }, [display, overwrite]);

  const handleOperator = useCallback((op: string) => {
    const cur = parseFloat(display);
    if (prevValue === null) {
      setPrevValue(cur);
      setEquation(`${cur} ${op}`);
    } else if (operation) {
      let res = prevValue;
      if (operation === '+') res = prevValue + cur;
      if (operation === '-') res = prevValue - cur;
      if (operation === '×' || operation === '*') res = prevValue * cur;
      if (operation === '÷' || operation === '/') res = cur !== 0 ? prevValue / cur : 0;
      setPrevValue(res);
      setDisplay(String(Number(res.toFixed(6))));
      setEquation(`${Number(res.toFixed(6))} ${op}`);
    }
    setOperation(op);
    setOverwrite(true);
  }, [display, operation, prevValue]);

  const handleEquals = useCallback(() => {
    if (prevValue === null || !operation) return;
    const cur = parseFloat(display);
    let res = prevValue;
    if (operation === '+') res = prevValue + cur;
    if (operation === '-') res = prevValue - cur;
    if (operation === '×' || operation === '*') res = prevValue * cur;
    if (operation === '÷' || operation === '/') res = cur !== 0 ? prevValue / cur : 0;

    const rounded = Number(res.toFixed(6));
    setEquation(`${prevValue} ${operation} ${cur} =`);
    setDisplay(String(rounded));
    setPrevValue(null);
    setOperation(null);
    setOverwrite(true);
  }, [display, operation, prevValue]);

  const handlePercent = useCallback(() => {
    const cur = parseFloat(display);
    const res = cur / 100;
    setDisplay(String(res));
  }, [display]);

  const handleToggleSign = useCallback(() => {
    const cur = parseFloat(display);
    setDisplay(String(cur * -1));
  }, [display]);

  // Physical keyboard listener for desktop users
  useEffect(() => {
    if (calcMode !== 'standard') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't capture keyboard if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (/^[0-9]$/.test(e.key)) {
        e.preventDefault();
        handleDigit(e.key);
      } else if (e.key === '.') {
        e.preventDefault();
        handleDecimal();
      } else if (e.key === '+' || e.key === '-') {
        e.preventDefault();
        handleOperator(e.key);
      } else if (e.key === '*') {
        e.preventDefault();
        handleOperator('×');
      } else if (e.key === '/') {
        e.preventDefault();
        handleOperator('÷');
      } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        handleEquals();
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        handleBackspace();
      } else if (e.key === 'Escape' || e.key.toLowerCase() === 'c') {
        handleClear();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [calcMode, handleDigit, handleDecimal, handleOperator, handleEquals, handleBackspace, handleClear]);

  // Calculations for ROI
  const schoolAnnualSavings = studentsCount * currentFeePerStudent;
  const estimatedConversionLift = Math.round(monthlyWebsiteVisitors * 0.018 * averageDealValue * 0.35);

  return (
    <div className="w-full text-left font-sans space-y-6">
      {/* Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-850 pb-4 font-mono text-xs">
        <div className="flex items-center gap-2 text-white font-bold">
          <Calculator className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-sm uppercase tracking-wider">System &amp; Financial Calculator</span>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-zinc-950 border border-zinc-800">
          <button
            type="button"
            onClick={() => setCalcMode('standard')}
            className={`px-3 py-1 text-[11px] font-mono uppercase transition-colors cursor-pointer ${
              calcMode === 'standard' ? 'bg-white text-black font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Arithmetic Calc
          </button>
          <button
            type="button"
            onClick={() => setCalcMode('roi')}
            className={`px-3 py-1 text-[11px] font-mono uppercase transition-colors cursor-pointer ${
              calcMode === 'roi' ? 'bg-white text-black font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            ROI &amp; Savings Model
          </button>
        </div>
      </div>

      {calcMode === 'standard' ? (
        /* STANDARD ARITHMETIC CALCULATOR */
        <div className="max-w-md mx-auto bg-zinc-950 border border-zinc-800 p-5 sm:p-6 space-y-4">
          {/* LCD Display */}
          <div className="bg-black border border-zinc-850 p-4 rounded-sm text-right font-mono space-y-1">
            <div className="text-xs text-zinc-500 h-4 tracking-wider overflow-hidden">
              {equation || '\u00A0'}
            </div>
            <div className="text-3xl sm:text-4xl font-black text-white tracking-tight break-all">
              {display}
            </div>
          </div>

          {/* Keypad Grid (4 columns) */}
          <div className="grid grid-cols-4 gap-2 font-mono text-sm">
            {/* Row 1 */}
            <button
              onClick={handleClear}
              className="min-h-[50px] bg-zinc-900 hover:bg-zinc-800 text-rose-400 font-bold border border-zinc-800 transition-colors cursor-pointer active:scale-95"
            >
              C
            </button>
            <button
              onClick={handleToggleSign}
              className="min-h-[50px] bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 transition-colors cursor-pointer active:scale-95"
            >
              ±
            </button>
            <button
              onClick={handlePercent}
              className="min-h-[50px] bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 transition-colors cursor-pointer active:scale-95"
            >
              %
            </button>
            <button
              onClick={() => handleOperator('÷')}
              className={`min-h-[50px] border transition-colors cursor-pointer active:scale-95 ${
                operation === '÷' ? 'bg-emerald-400 text-black border-emerald-400 font-bold' : 'bg-zinc-850 hover:bg-zinc-800 text-emerald-400 border-zinc-750'
              }`}
            >
              ÷
            </button>

            {/* Row 2 */}
            <button
              onClick={() => handleDigit('7')}
              className="min-h-[50px] bg-zinc-900/80 hover:bg-zinc-800 text-white font-semibold border border-zinc-800 transition-colors cursor-pointer active:scale-95"
            >
              7
            </button>
            <button
              onClick={() => handleDigit('8')}
              className="min-h-[50px] bg-zinc-900/80 hover:bg-zinc-800 text-white font-semibold border border-zinc-800 transition-colors cursor-pointer active:scale-95"
            >
              8
            </button>
            <button
              onClick={() => handleDigit('9')}
              className="min-h-[50px] bg-zinc-900/80 hover:bg-zinc-800 text-white font-semibold border border-zinc-800 transition-colors cursor-pointer active:scale-95"
            >
              9
            </button>
            <button
              onClick={() => handleOperator('×')}
              className={`min-h-[50px] border transition-colors cursor-pointer active:scale-95 ${
                operation === '×' ? 'bg-emerald-400 text-black border-emerald-400 font-bold' : 'bg-zinc-850 hover:bg-zinc-800 text-emerald-400 border-zinc-750'
              }`}
            >
              ×
            </button>

            {/* Row 3 */}
            <button
              onClick={() => handleDigit('4')}
              className="min-h-[50px] bg-zinc-900/80 hover:bg-zinc-800 text-white font-semibold border border-zinc-800 transition-colors cursor-pointer active:scale-95"
            >
              4
            </button>
            <button
              onClick={() => handleDigit('5')}
              className="min-h-[50px] bg-zinc-900/80 hover:bg-zinc-800 text-white font-semibold border border-zinc-800 transition-colors cursor-pointer active:scale-95"
            >
              5
            </button>
            <button
              onClick={() => handleDigit('6')}
              className="min-h-[50px] bg-zinc-900/80 hover:bg-zinc-800 text-white font-semibold border border-zinc-800 transition-colors cursor-pointer active:scale-95"
            >
              6
            </button>
            <button
              onClick={() => handleOperator('-')}
              className={`min-h-[50px] border transition-colors cursor-pointer active:scale-95 ${
                operation === '-' ? 'bg-emerald-400 text-black border-emerald-400 font-bold' : 'bg-zinc-850 hover:bg-zinc-800 text-emerald-400 border-zinc-750'
              }`}
            >
              -
            </button>

            {/* Row 4 */}
            <button
              onClick={() => handleDigit('1')}
              className="min-h-[50px] bg-zinc-900/80 hover:bg-zinc-800 text-white font-semibold border border-zinc-800 transition-colors cursor-pointer active:scale-95"
            >
              1
            </button>
            <button
              onClick={() => handleDigit('2')}
              className="min-h-[50px] bg-zinc-900/80 hover:bg-zinc-800 text-white font-semibold border border-zinc-800 transition-colors cursor-pointer active:scale-95"
            >
              2
            </button>
            <button
              onClick={() => handleDigit('3')}
              className="min-h-[50px] bg-zinc-900/80 hover:bg-zinc-800 text-white font-semibold border border-zinc-800 transition-colors cursor-pointer active:scale-95"
            >
              3
            </button>
            <button
              onClick={() => handleOperator('+')}
              className={`min-h-[50px] border transition-colors cursor-pointer active:scale-95 ${
                operation === '+' ? 'bg-emerald-400 text-black border-emerald-400 font-bold' : 'bg-zinc-850 hover:bg-zinc-800 text-emerald-400 border-zinc-750'
              }`}
            >
              +
            </button>

            {/* Row 5 */}
            <button
              onClick={() => handleDigit('0')}
              className="min-h-[50px] col-span-2 bg-zinc-900/80 hover:bg-zinc-800 text-white font-semibold border border-zinc-800 transition-colors cursor-pointer active:scale-95"
            >
              0
            </button>
            <button
              onClick={handleDecimal}
              className="min-h-[50px] bg-zinc-900/80 hover:bg-zinc-800 text-white font-semibold border border-zinc-800 transition-colors cursor-pointer active:scale-95"
            >
              .
            </button>
            <button
              onClick={handleEquals}
              className="min-h-[50px] bg-white hover:bg-zinc-200 text-black font-extrabold border border-white transition-all cursor-pointer active:scale-95"
            >
              =
            </button>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 pt-1">
            <span>KEYBOARD ENABLED</span>
            <button
              onClick={handleBackspace}
              className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
            >
              <Delete className="w-3.5 h-3.5" />
              <span>Backspace</span>
            </button>
          </div>
        </div>
      ) : (
        /* ROI & CLOUD SAVINGS ESTIMATOR */
        <div className="space-y-6">
          {/* Model 01: SchoolMIS Cloud ERP Savings */}
          <div className="border border-zinc-800 bg-zinc-950 p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-850 pb-2.5 font-mono text-xs">
              <span className="text-emerald-400 font-bold">[ 01 // SCHOOLMIS ₹0-LICENSE ESTIMATOR ]</span>
              <span className="text-zinc-400">INSTITUTIONAL METRIC</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
              <div className="space-y-1.5">
                <label className="text-zinc-400 block text-[11px] uppercase">
                  Enrolled Students: <span className="text-white font-bold">{studentsCount}</span>
                </label>
                <input
                  type="range"
                  min="50"
                  max="3000"
                  step="25"
                  value={studentsCount}
                  onChange={(e) => setStudentsCount(Number(e.target.value))}
                  className="w-full accent-white cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-zinc-400 block text-[11px] uppercase">
                  Current Vendor ERP Fee / Student / Yr: <span className="text-white font-bold">₹{currentFeePerStudent}</span>
                </label>
                <input
                  type="range"
                  min="50"
                  max="500"
                  step="25"
                  value={currentFeePerStudent}
                  onChange={(e) => setCurrentFeePerStudent(Number(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>
            </div>

            {/* Savings Callout */}
            <div className="p-4 bg-emerald-950/20 border border-emerald-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block">
                  Recurring Fee Saved with Digital Simple Solution:
                </span>
                <span className="text-3xl font-black font-mono text-white tracking-tight">
                  ₹{schoolAnnualSavings.toLocaleString('en-IN')}{' '}
                  <span className="text-xs font-normal text-zinc-400">/ Year</span>
                </span>
              </div>
              <Link
                href="/free-school-management-software#enquiry-form"
                className="min-h-[44px] px-5 py-2.5 bg-white text-black font-mono text-xs uppercase font-extrabold flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors"
              >
                <span>Claim ₹0 License</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Model 02: Next.js Performance & Speed ROI */}
          <div className="border border-zinc-800 bg-zinc-950 p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-850 pb-2.5 font-mono text-xs">
              <span className="text-white font-bold">[ 02 // WEB VELOCITY REVENUE GAIN ]</span>
              <span className="text-zinc-400">&lt;1.2S SPEED IMPACT</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
              <div className="space-y-1.5">
                <label className="text-zinc-400 block text-[11px] uppercase">
                  Monthly Web Visitors: <span className="text-white font-bold">{monthlyWebsiteVisitors.toLocaleString()}</span>
                </label>
                <input
                  type="range"
                  min="500"
                  max="50000"
                  step="500"
                  value={monthlyWebsiteVisitors}
                  onChange={(e) => setMonthlyWebsiteVisitors(Number(e.target.value))}
                  className="w-full accent-white cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-zinc-400 block text-[11px] uppercase">
                  Avg Deal / Transaction Value: <span className="text-white font-bold">₹{averageDealValue.toLocaleString()}</span>
                </label>
                <input
                  type="range"
                  min="500"
                  max="50000"
                  step="500"
                  value={averageDealValue}
                  onChange={(e) => setAverageDealValue(Number(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>
            </div>

            <div className="p-4 bg-zinc-900 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">
                  Projected Revenue Recaptured (via 35% Bounce Reduction):
                </span>
                <span className="text-2xl font-black font-mono text-emerald-400 tracking-tight">
                  +₹{estimatedConversionLift.toLocaleString('en-IN')}{' '}
                  <span className="text-xs font-normal text-zinc-400">/ Month</span>
                </span>
              </div>
              <Link
                href="/landing-pages"
                className="min-h-[44px] px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white font-mono text-xs uppercase font-bold flex items-center justify-center gap-2 transition-colors border border-zinc-700"
              >
                <span>Explore Landing Platforms</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
