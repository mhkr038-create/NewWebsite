import React, { useState } from 'react';
import { 
  GraduationCap, 
  Users, 
  Star, 
  CheckCircle2, 
  ArrowRight, 
  Award, 
  Sparkles, 
  FileCode, 
  X,
  Search
} from 'lucide-react';
import { DemoFrameWrapper } from '../DemoFrameWrapper';
import { DEMO_REGISTRY } from '../../data/demos';

const demoData = DEMO_REGISTRY.find(d => d.id === 'education-academy')!;

export const EducationAcademyDemo: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewCourse, setPreviewCourse] = useState<any | null>(null);
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [enrollSuccess, setEnrollSuccess] = useState(false);

  const courses = [
    {
      id: 'ai-eng',
      title: 'Full-Stack AI Agent & LLM Architecture',
      category: 'ai',
      level: 'Intermediate to Advanced',
      duration: '8 Weeks • Live Cohort',
      students: '3,850 enrolled',
      rating: 4.9,
      price: '$690',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
      instructor: 'Dr. Leo Vance (Ex-Google Brain)',
      description: 'Master LangChain, autonomous agent swarms, vector databases (Pinecone), and production deployment on AWS with enterprise security.',
      syllabus: [
        'Week 1-2: Advanced Prompt Engineering & Function Calling Architectures',
        'Week 3-4: RAG Pipelines, Hybrid Search & Semantic Chunking',
        'Week 5-6: Autonomous Multi-Agent Swarms & Task Graphs',
        'Week 7-8: Capstone Production Deployment & Latency Optimization',
      ],
    },
    {
      id: 'saas-dev',
      title: 'Modern Full-Stack React, Next.js & TypeScript',
      category: 'dev',
      level: 'All Levels',
      duration: '10 Weeks • Self-Paced + Mentorship',
      students: '7,200 enrolled',
      rating: 5.0,
      price: '$490',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
      instructor: 'Marcus Chen (Senior Staff Engineer)',
      description: 'Build and ship 4 production SaaS products with Next.js App Router, Tailwind CSS, Supabase authentication, and Stripe payments.',
      syllabus: [
        'Week 1-3: Modern React 19 State Machines & Server Components',
        'Week 4-6: Postgres Architecture, Row-Level Security & Webhooks',
        'Week 7-8: Stripe Billing, Subscription Metering & Customer Portals',
        'Week 9-10: CI/CD Pipelines, Performance Monitoring & Launch Day',
      ],
    },
    {
      id: 'growth-mktg',
      title: 'Performance Marketing & Viral Growth Engines',
      category: 'business',
      level: 'Beginner to Intermediate',
      duration: '6 Weeks • Live Cohort',
      students: '2,940 enrolled',
      rating: 4.8,
      price: '$550',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
      instructor: 'Elena Rostova (VP of Growth)',
      description: 'The exact framework used to scale 12 tech startups from $0 to $1M ARR using paid media, algorithmic SEO, and viral referral loops.',
      syllabus: [
        'Week 1-2: Meta & Google Ads Algorithmic Bidding Optimization',
        'Week 3: Programmatic SEO & Content Cluster Authority',
        'Week 4-5: High-Converting Landing Page Design & A/B Testing',
        'Week 6: Retention Loops, Referral Systems & LTV Expansion',
      ],
    },
    {
      id: 'ui-ux',
      title: 'Product Design Systems & High-Fidelity UX',
      category: 'design',
      level: 'Intermediate',
      duration: '6 Weeks • Live Cohort',
      students: '4,120 enrolled',
      rating: 4.9,
      price: '$520',
      image: 'https://images.unsplash.com/photo-1581291518655-9523c932edcf?auto=format&fit=crop&w=600&q=80',
      instructor: 'Sophia Laurent (Head of Design)',
      description: 'Build enterprise-grade Figma design systems with auto-layout variables, dark mode tokens, micro-interactions, and accessible UI patterns.',
      syllabus: [
        'Week 1-2: Design Tokens, Typography Scales & Responsive Grids',
        'Week 3-4: Component Architecture & Interactive Prototyping',
        'Week 5: User Research, Usability Testing & Heatmap Synthesis',
        'Week 6: Developer Handoff, Design QA & Portfolio Case Study',
      ],
    },
  ];

  const filteredCourses = courses.filter((c) => {
    const matchesCat = selectedCategory === 'all' || c.category === selectedCategory;
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <DemoFrameWrapper demo={demoData}>
      <div className="bg-slate-950 text-slate-100 font-sans min-h-screen">
        
        {/* Academy Header */}
        <header className="bg-slate-900/90 border-b border-indigo-900/40 sticky top-12 z-30 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 p-0.5 shadow-md shadow-indigo-500/30">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-indigo-400" />
                </div>
              </div>
              <div>
                <span className="font-bold text-lg text-white font-heading tracking-tight flex items-center gap-1.5">
                  Skill<span className="text-indigo-400">Forge</span> Academy
                </span>
                <span className="text-[10px] text-indigo-300 block font-mono">Modern Tech & Leadership Guild</span>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300 font-medium">
              <a href="#courses" className="hover:text-indigo-400 transition-colors">Courses</a>
              <a href="#outcomes" className="hover:text-indigo-400 transition-colors">Career Outcomes</a>
              <a href="#instructors" className="hover:text-indigo-400 transition-colors">Instructors</a>
              <a href="#reviews" className="hover:text-indigo-400 transition-colors">Student Reviews</a>
            </nav>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setPreviewCourse(courses[0]);
                  setEnrollModalOpen(true);
                }}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Enroll in Cohort</span>
              </button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative pt-16 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-indigo-950/40 via-slate-950 to-slate-950">
          <div className="max-w-7xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-700/50 text-indigo-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Fall 2026 Cohort Applications Open • Limited to 50 Seats per Track</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight max-w-4xl mx-auto leading-[1.15]">
              Master High-Income Skills. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">
                Ship Real Products. Land Your Dream Role.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Interactive cohort-based academies taught by proven industry leaders. Get live code reviews, build production-grade capstones, and join our elite alumni network.
            </p>

            {/* Course Search & Filter Bar */}
            <div className="max-w-2xl mx-auto pt-4">
              <div className="relative flex items-center bg-slate-900 border border-slate-700/80 rounded-2xl p-2 shadow-2xl focus-within:border-indigo-500">
                <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search courses by skill (e.g. AI, Next.js, Marketing, Figma)..."
                  className="w-full px-3 py-2 bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
                />
                <button
                  onClick={() => {
                    const el = document.getElementById('courses');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shrink-0 transition-colors"
                >
                  Browse Tracks
                </button>
              </div>
            </div>

            {/* Alumni Placement Banner */}
            <div className="pt-8">
              <p className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-4">
                Our Graduates Lead Engineering & Growth At:
              </p>
              <div className="flex flex-wrap justify-center items-center gap-8 opacity-70 text-sm font-semibold text-slate-300">
                <span className="hover:opacity-100 transition-opacity">Google</span>
                <span className="hover:opacity-100 transition-opacity">Meta</span>
                <span className="hover:opacity-100 transition-opacity">Stripe</span>
                <span className="hover:opacity-100 transition-opacity">OpenAI</span>
                <span className="hover:opacity-100 transition-opacity">Apple</span>
                <span className="hover:opacity-100 transition-opacity">Airbnb</span>
              </div>
            </div>
          </div>
        </section>

        {/* Course Catalog */}
        <section id="courses" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-mono uppercase text-indigo-400 tracking-wider font-semibold">
                Curated Academies
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-1">
                Featured Cohort Tracks
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
              {[
                { id: 'all', label: 'All Tracks' },
                { id: 'ai', label: 'AI & Machine Learning' },
                { id: 'dev', label: 'Full-Stack Development' },
                { id: 'business', label: 'Growth & Business' },
                { id: 'design', label: 'Product UI/UX' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    selectedCategory === tab.id
                      ? 'bg-indigo-600 text-white font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Course Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredCourses.map((c) => (
              <div
                key={c.id}
                className="bg-slate-900/80 border border-slate-800 hover:border-indigo-500/40 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-950/40 flex flex-col group"
              >
                <div className="relative h-52 w-full overflow-hidden bg-slate-800">
                  <img
                    src={c.image}
                    alt={c.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/85 backdrop-blur-md text-indigo-300 text-xs font-semibold border border-indigo-800/40">
                    {c.duration}
                  </div>
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-slate-950/85 backdrop-blur-md text-amber-300 text-xs font-bold flex items-center gap-1 border border-slate-700">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{c.rating}</span>
                  </div>
                </div>

                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Level: {c.level}</span>
                      <span>{c.students}</span>
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {c.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {c.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-mono">Led by {c.instructor}</span>
                      <span className="text-xl font-bold text-white font-heading">{c.price}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setPreviewCourse(c)}
                        className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
                      >
                        Syllabus
                      </button>
                      <button
                        onClick={() => {
                          setPreviewCourse(c);
                          setEnrollSuccess(false);
                          setEnrollModalOpen(true);
                        }}
                        className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition-all flex items-center gap-1"
                      >
                        <span>Enroll Now</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Learn With Us */}
        <section id="outcomes" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/60 border-y border-slate-900">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
              <span className="text-xs font-mono uppercase text-indigo-400 tracking-wider font-semibold">
                The SkillForge Difference
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Engineered for Real Career Outcomes
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Users,
                  title: 'Live 1-on-1 Mentorship',
                  desc: 'Never get stuck on a bug. Weekly office hours and 1-on-1 code reviews with staff engineers from high-growth tech firms.',
                },
                {
                  icon: FileCode,
                  title: 'Production Capstone Projects',
                  desc: 'Build and deploy actual SaaS and AI applications that real users can pay for and use, not generic tutorial clones.',
                },
                {
                  icon: Award,
                  title: 'Verified Hiring Network',
                  desc: 'Direct resume referrals and warm introductions to hiring managers at over 150+ venture-backed startup partners.',
                },
              ].map((feat, i) => {
                const IconComp = feat.icon;
                return (
                  <div key={i} className="p-8 rounded-3xl bg-slate-950/80 border border-slate-800 space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold text-white">{feat.title}</h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{feat.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Syllabus Preview Modal */}
        {previewCourse && !enrollModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl">
              <button
                onClick={() => setPreviewCourse(null)}
                className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-4">
                <span className="text-[11px] font-mono text-indigo-400 uppercase tracking-wider font-semibold">
                  Course Syllabus & Curriculum
                </span>
                <h3 className="text-xl font-bold text-white">{previewCourse.title}</h3>
                <p className="text-xs text-slate-300">{previewCourse.description}</p>

                <div className="space-y-2.5 pt-2 border-t border-slate-800">
                  <h4 className="text-xs font-semibold text-slate-200">Modules Outline:</h4>
                  {previewCourse.syllabus.map((mod: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                      <span>{mod}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-slate-800">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-mono">Cohort Price</span>
                    <span className="text-lg font-bold text-white">{previewCourse.price}</span>
                  </div>
                  <button
                    onClick={() => setEnrollModalOpen(true)}
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center gap-1.5"
                  >
                    <span>Proceed to Enrollment</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enrollment Modal */}
        {enrollModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-indigo-500/40 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl">
              <button
                onClick={() => setEnrollModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>

              {!enrollSuccess ? (
                <div>
                  <span className="text-[11px] font-mono text-indigo-400 uppercase tracking-wider font-semibold">
                    Instant Seat Reservation
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">Enroll in Cohort</h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Track: <span className="text-indigo-300 font-semibold">{previewCourse?.title}</span>
                  </p>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setEnrollSuccess(true);
                    }}
                    className="mt-5 space-y-3.5"
                  >
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Student Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Maya Lin"
                        className="w-full px-3.5 py-2 text-xs bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Email</label>
                        <input
                          type="email"
                          required
                          placeholder="maya@example.com"
                          className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Phone</label>
                        <input
                          type="tel"
                          required
                          placeholder="(555) 000-1122"
                          className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-indigo-950/50 border border-indigo-800/40 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-slate-300 block font-medium">Early-Bird Rate</span>
                        <span className="text-slate-400 text-[11px]">Includes 1-on-1 mentorship & lifetime discord access</span>
                      </div>
                      <span className="text-base font-bold text-white font-heading">{previewCourse?.price}</span>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/30 transition-all"
                    >
                      Complete Enrollment & Reserve Seat
                    </button>
                  </form>
                </div>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Enrollment Confirmed!</h3>
                    <p className="text-xs text-slate-300 mt-1 max-w-sm mx-auto">
                      Welcome to the cohort! Your student portal access and Discord invitation have been sent to your email.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setEnrollModalOpen(false);
                      setPreviewCourse(null);
                    }}
                    className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold"
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
