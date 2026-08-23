import React, { useState, useMemo } from 'react';
import { 
  Dumbbell, 
  Flame, 
  Trophy, 
  ArrowRight, 
  CheckCircle2, 
  X
} from 'lucide-react';
import { DemoFrameWrapper } from '../DemoFrameWrapper';
import { DEMO_REGISTRY } from '../../data/demos';

const demoData = DEMO_REGISTRY.find(d => d.id === 'fitness-coach')!;

export const FitnessCoachDemo: React.FC = () => {
  // Macro Calculator state
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [weightLbs, setWeightLbs] = useState<number>(180);
  const [goal, setGoal] = useState<'shred' | 'muscle' | 'maintain'>('shred');
  const [activity, setActivity] = useState<'moderate' | 'high'>('moderate');

  // Transformation Slider state
  const [sliderPos, setSliderPos] = useState<number>(50);

  // 7-Day Challenge Modal
  const [trialModalOpen, setTrialModalOpen] = useState(false);
  const [trialSuccess, setTrialSuccess] = useState(false);

  const calculatedMacros = useMemo(() => {
    let bmr = gender === 'male' ? weightLbs * 11 : weightLbs * 10;
    let tdee = activity === 'high' ? bmr * 1.55 : bmr * 1.35;

    let targetCalories = tdee;
    if (goal === 'shred') targetCalories -= 500;
    if (goal === 'muscle') targetCalories += 350;

    const proteinGrams = Math.round(weightLbs * 1.0);
    const fatGrams = Math.round((targetCalories * 0.25) / 9);
    const carbsGrams = Math.round((targetCalories - (proteinGrams * 4 + fatGrams * 9)) / 4);

    return {
      calories: Math.round(targetCalories),
      protein: proteinGrams,
      carbs: Math.max(50, carbsGrams),
      fat: Math.max(30, fatGrams),
    };
  }, [gender, weightLbs, goal, activity]);

  return (
    <DemoFrameWrapper demo={demoData}>
      <div className="bg-[#090b0d] text-slate-100 font-sans min-h-screen selection:bg-lime-500 selection:text-black">
        
        {/* Header */}
        <header className="bg-[#0f1317]/95 border-b border-lime-500/20 sticky top-12 z-30 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-lime-500 to-emerald-400 p-0.5 shadow-md shadow-lime-500/30">
                <div className="w-full h-full bg-[#090b0d] rounded-[10px] flex items-center justify-center">
                  <Dumbbell className="w-5 h-5 text-lime-400" />
                </div>
              </div>
              <div>
                <span className="font-extrabold text-lg text-white font-heading tracking-tight flex items-center gap-1">
                  Apex<span className="text-lime-400">Athletic</span>
                </span>
                <span className="text-[10px] text-lime-300/80 block font-mono">
                  Custom Physique & Nutrition Coaching
                </span>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-7 text-xs font-semibold uppercase tracking-wider text-slate-300">
              <a href="#transformations" className="hover:text-lime-400 transition-colors">Results</a>
              <a href="#macros" className="hover:text-lime-400 transition-colors">Macro Calculator</a>
              <a href="#programs" className="hover:text-lime-400 transition-colors">Programs</a>
              <a href="#about" className="hover:text-lime-400 transition-colors">Coach Dave</a>
            </nav>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setTrialSuccess(false);
                  setTrialModalOpen(true);
                }}
                className="px-4 py-2 rounded-xl bg-lime-500 hover:bg-lime-400 text-black font-bold text-xs uppercase tracking-wider shadow-lg shadow-lime-500/20 transition-all flex items-center gap-1.5"
              >
                <Flame className="w-3.5 h-3.5 fill-black" />
                <span>Join 7-Day Challenge</span>
              </button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative pt-20 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[#131b14] via-[#090b0d] to-[#090b0d]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lime-950/80 border border-lime-700/50 text-lime-300 text-xs font-semibold">
                <Trophy className="w-3.5 h-3.5 text-lime-400" />
                <span>Over 3,400+ Bodies Transformed Since 2018</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] font-heading">
                Sculpt Your Peak Physique. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-emerald-300 to-teal-300">
                  Zero Fad Diets. Pure Science.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
                Custom progressive training, flexible macronutrient protocols, and direct 1-on-1 accountability designed around your busy lifestyle.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800">
                <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-lime-500/20">
                  <span className="text-2xl font-bold text-lime-400 font-heading">48,000+</span>
                  <p className="text-xs text-slate-400 mt-0.5">Lbs Fat Lost</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-lime-500/20">
                  <span className="text-2xl font-bold text-lime-400 font-heading">4.9 ★</span>
                  <p className="text-xs text-slate-400 mt-0.5">App Client Rating</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-lime-500/20">
                  <span className="text-2xl font-bold text-lime-400 font-heading">98%</span>
                  <p className="text-xs text-slate-400 mt-0.5">Habit Consistency</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={() => {
                    setTrialSuccess(false);
                    setTrialModalOpen(true);
                  }}
                  className="px-6 py-3.5 rounded-xl bg-lime-500 hover:bg-lime-400 text-black font-bold text-xs uppercase tracking-wider shadow-lg shadow-lime-500/25 flex items-center gap-2 transition-all hover:scale-105"
                >
                  <Flame className="w-4 h-4 fill-black" />
                  <span>Start Free 7-Day Trial</span>
                </button>
                <a
                  href="#macros"
                  className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-lime-300 font-semibold text-xs uppercase tracking-wider border border-lime-500/30 flex items-center gap-2 transition-colors"
                >
                  <span>Calculate Daily Macros</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right Card: Coach Image */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-lime-500/30 shadow-2xl bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80"
                  alt="Coach Dave Miller"
                  className="w-full h-96 sm:h-[460px] object-cover"
                />
                <div className="p-6 bg-slate-950/90 border-t border-slate-800 space-y-1">
                  <h3 className="font-bold text-lg text-white">Dave Miller, CSCS</h3>
                  <p className="text-xs text-lime-400 font-mono">Head Strength & Metabolic Conditioning Coach</p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Interactive Before/After Transformation Slider */}
        <section id="transformations" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-mono uppercase text-lime-400 tracking-wider font-semibold">
              Real Visual Proof
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-heading">
              12-Week Transformation Showcase
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Drag the interactive slider below to inspect real client results.
            </p>
          </div>

          <div className="bg-[#12171c] border border-lime-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4">
            <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-slate-800 select-none">
              {/* After Image (Full background) */}
              <img
                src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1000&q=80"
                alt="After Transformation"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <span className="absolute top-4 right-4 px-3 py-1 bg-lime-500 text-black font-bold text-xs uppercase tracking-wider rounded-lg shadow-md">
                WEEK 12 (AFTER: 11% Body Fat)
              </span>

              {/* Before Image (Clipped by slider position) */}
              <div
                className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-lime-400"
                style={{ width: `${sliderPos}%` }}
              >
                <img
                  src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80"
                  alt="Before Transformation"
                  className="absolute inset-0 w-full h-full object-cover max-w-none"
                  style={{ width: '100%', minWidth: '600px' }}
                />
                <span className="absolute top-4 left-4 px-3 py-1 bg-black/80 text-slate-200 font-bold text-xs uppercase tracking-wider rounded-lg border border-slate-700">
                  WEEK 1 (BEFORE: 24% Body Fat)
                </span>
              </div>
            </div>

            {/* Slider Control */}
            <div className="pt-2">
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPos}
                onChange={(e) => setSliderPos(Number(e.target.value))}
                className="w-full accent-lime-400 bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-1">
                <span>◀ Slide to reveal Before</span>
                <span>Slide to reveal After ▶</span>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Calorie & Macro Target Calculator */}
        <section id="macros" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0f1317] border-y border-lime-500/20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
              <span className="text-xs font-mono uppercase text-lime-400 tracking-wider font-semibold">
                Nutritional Precision
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white font-heading">
                Instant Daily Macro Calculator
              </h2>
              <p className="text-sm text-slate-400">
                Get your personalized protein, carb, and fat targets tailored to your exact goal.
              </p>
            </div>

            <div className="bg-[#141a20] border border-lime-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Controls */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">Biological Sex</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setGender('male')}
                      className={`py-2 rounded-xl text-xs font-bold uppercase transition-colors ${gender === 'male' ? 'bg-lime-500 text-black' : 'bg-slate-900 text-slate-300'}`}
                    >
                      Male
                    </button>
                    <button
                      type="button"
                      onClick={() => setGender('female')}
                      className={`py-2 rounded-xl text-xs font-bold uppercase transition-colors ${gender === 'female' ? 'bg-lime-500 text-black' : 'bg-slate-900 text-slate-300'}`}
                    >
                      Female
                    </button>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-2">
                    <span className="text-slate-300">Current Body Weight:</span>
                    <span className="text-lime-400 font-bold text-sm">{weightLbs} lbs</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="320"
                    value={weightLbs}
                    onChange={(e) => setWeightLbs(Number(e.target.value))}
                    className="w-full accent-lime-400 bg-slate-900 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">Primary Goal</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'shred', label: 'Fat Loss' },
                      { id: 'maintain', label: 'Maintenance' },
                      { id: 'muscle', label: 'Lean Bulk' },
                    ].map((g) => (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => setGoal(g.id as any)}
                        className={`py-2 px-1 rounded-xl text-xs font-semibold transition-colors ${goal === g.id ? 'bg-lime-500 text-black font-bold' : 'bg-slate-900 text-slate-300'}`}
                      >
                        {g.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">Weekly Activity Level</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setActivity('moderate')}
                      className={`py-2 rounded-xl text-xs font-semibold transition-colors ${activity === 'moderate' ? 'bg-lime-500 text-black font-bold' : 'bg-slate-900 text-slate-300'}`}
                    >
                      Moderate (3-4x / wk)
                    </button>
                    <button
                      type="button"
                      onClick={() => setActivity('high')}
                      className={`py-2 rounded-xl text-xs font-semibold transition-colors ${activity === 'high' ? 'bg-lime-500 text-black font-bold' : 'bg-slate-900 text-slate-300'}`}
                    >
                      High Athlete (5-7x / wk)
                    </button>
                  </div>
                </div>
              </div>

              {/* Outputs */}
              <div className="lg:col-span-6 bg-[#090b0d] border border-lime-500/30 rounded-2xl p-6 sm:p-8 space-y-6">
                <div className="text-center space-y-1 pb-6 border-b border-slate-800">
                  <span className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                    Recommended Daily Calorie Target
                  </span>
                  <h3 className="text-4xl sm:text-5xl font-mono font-extrabold text-lime-400 tracking-tight mt-1">
                    {calculatedMacros.calories} kcal
                  </h3>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 font-mono">
                    <span className="text-[10px] text-slate-400 uppercase block">Protein</span>
                    <span className="text-lg font-bold text-white mt-1 block">{calculatedMacros.protein}g</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 font-mono">
                    <span className="text-[10px] text-slate-400 uppercase block">Carbs</span>
                    <span className="text-lg font-bold text-white mt-1 block">{calculatedMacros.carbs}g</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 font-mono">
                    <span className="text-[10px] text-slate-400 uppercase block">Healthy Fats</span>
                    <span className="text-lg font-bold text-white mt-1 block">{calculatedMacros.fat}g</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setTrialSuccess(false);
                    setTrialModalOpen(true);
                  }}
                  className="w-full py-3.5 bg-lime-500 hover:bg-lime-400 text-black font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-lime-500/25 transition-all flex items-center justify-center gap-2"
                >
                  <span>Get Custom Meal Plan With These Macros</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        </section>

        {/* 7-Day Challenge Modal */}
        {trialModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-[#141a20] border border-lime-500/40 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl">
              <button
                onClick={() => setTrialModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>

              {!trialSuccess ? (
                <div>
                  <span className="text-[11px] font-mono text-lime-400 uppercase tracking-wider font-semibold">
                    Instant Mobile App Access
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">Start Free 7-Day Performance Challenge</h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Get custom daily workout routines, macro meal templates, and direct coaching chat in our app.
                  </p>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setTrialSuccess(true);
                    }}
                    className="mt-5 space-y-3.5 text-xs"
                  >
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">Your Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Cole Bennett"
                        className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-lime-400"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1">Email</label>
                        <input
                          type="email"
                          required
                          placeholder="cole@example.com"
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-lime-400"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1">Phone</label>
                        <input
                          type="tel"
                          required
                          placeholder="(555) 123-4567"
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-lime-400"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full mt-2 py-3 bg-lime-500 hover:bg-lime-400 text-black font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-lime-500/25 transition-all"
                    >
                      Unlock 7-Day Challenge Free
                    </button>
                  </form>
                </div>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-lime-500/20 text-lime-400 flex items-center justify-center mx-auto border border-lime-500/40">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Challenge Access Unlocked!</h3>
                  <p className="text-xs text-slate-300 max-w-sm mx-auto">
                    Download instructions and your customized starter workouts have been emailed to you.
                  </p>
                  <button
                    onClick={() => setTrialModalOpen(false)}
                    className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-lime-300 rounded-xl text-xs font-semibold"
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
