"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "../components/Header";
import {
  Activity,
  Shield,
  Heart,
  Search,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Star,
  Mail,
  Phone,
  MapPin,
  Menu,
  X,
  ArrowRight,
  Check,
  Lock,
  Cpu,
  Award,
  Sparkles,
  Clock,
  ExternalLink,
  ChevronDown,
  ShoppingBag,
  Sliders,
  Sparkle
} from "lucide-react";

// Types for Hero Slider
interface HeroSlide {
  badge: string;
  title: string;
  description: string;
  cta1: string;
  cta1Link: string;
  cta2: string;
  cta2Link: string;
  bgImage: string;
}

// Hero Slides Data
const HERO_SLIDES: HeroSlide[] = [
  {
    badge: "Your Trusted Healthcare Partner",
    title: "Advanced Digital Medical Excellence",
    description: "Experience a comprehensive healthcare ecosystem. From AI-driven diagnostics to premium pharmacy delivery and elite physician consultations, we prioritize your long-term wellness.",
    cta1: "Book an Appointment",
    cta1Link: "/doctors",
    cta2: "Learn More About Us",
    cta2Link: "/about",
    bgImage: "radial-gradient(circle at 70% 30%, rgba(16, 185, 129, 0.15) 0%, transparent 50%)"
  },
  {
    badge: "24/7 Digital Pharmacy",
    title: "Expert Care At Your Doorstep",
    description: "Get your prescriptions and essential supplements delivered fast. Explore a curated catalog of certified health products tailored to your needs.",
    cta1: "Explore Pharmacy",
    cta1Link: "/shop",
    cta2: "Find a Doctor",
    cta2Link: "/doctors",
    bgImage: "radial-gradient(circle at 70% 30%, rgba(245, 158, 11, 0.12) 0%, transparent 50%)"
  },
  {
    badge: "AI Powered Diagnostics",
    title: "Intelligent Health Protocol",
    description: "Run our advanced symptom checker and receive clinical insights in minutes. Your data is encrypted in our secure Health Vault.",
    cta1: "Start Assessment",
    cta1Link: "/assessment",
    cta2: "Contact Support",
    cta2Link: "/contact",
    bgImage: "radial-gradient(circle at 70% 30%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)"
  }
];

// Interactive Assessment Types
type ConcernTrack = "wellness" | "mens-health" | "skin-hair" | "chronic";

interface SymptomQuestion {
  question: string;
  options: string[];
}

const ASSESSMENT_QUESTIONS: Record<ConcernTrack, SymptomQuestion[]> = {
  wellness: [
    {
      question: "What is your primary wellness goal today?",
      options: ["Boost everyday energy levels", "Improve sleep quality & relaxation", "Enhance immune system support", "General preventive longevity check"]
    },
    {
      question: "Rate your general energy level from 1 to 5:",
      options: ["1 - Extremely fatigued daily", "2 - Mild afternoon crashes", "3 - Stable but mediocre", "4 - Generally energetic", "5 - Peak operational performance"]
    }
  ],
  "mens-health": [
    {
      question: "What area would you like to target primarily?",
      options: ["Stamina, strength & endurance", "Vitality & stress management", "Hormonal balance & recovery", "Comprehensive private health assessment"]
    },
    {
      question: "How long have you experienced mild fatigue or lack of stamina?",
      options: ["Just a few days", "1 to 3 months", "Over 6 months", "Looking to preventively optimize"]
    }
  ],
  "skin-hair": [
    {
      question: "Which skin or hair concern is most prominent?",
      options: ["Accelerated hair fall or thinning", "Acne, breakouts & inflammation", "Dull skin & premature aging", "Scalp health & dryness"]
    },
    {
      question: "Select your current hair/skin care routine type:",
      options: ["Basic washing only", "Over-the-counter creams/shampoos", "Prescription treatments", "None currently"]
    }
  ],
  chronic: [
    {
      question: "Select the area you wish to manage or assess:",
      options: ["Blood sugar / Diabetes tracker", "Blood pressure & Cardiovascular flow", "Weight management & Metabolic rate", "Thyroid or hormone screening"]
    },
    {
      question: "Do you have a current medical prescription for this condition?",
      options: ["Yes, taking medication daily", "Yes, occasionally", "No, diagnosed but not medicated", "No, just searching for preventive insights"]
    }
  ]
};

// Herbs Data (Refined for Allopathic Therapeutics)
interface HerbDetail {
  name: string;
  title: string;
  benefits: string[];
  clinicalHighlight: string;
}

const HERBS_DATA: Record<string, HerbDetail> = {
  cardio: {
    name: "Cardiovascular Dynamics",
    title: "Targeted HMG-CoA Reductase & Beta-Adrenergic Modulation",
    benefits: [
      "Precise lipid profile optimization (reduces low-density lipoproteins)",
      "Modulates cardiac output and blood pressure with high receptor affinity",
      "Stabilizes endothelial plaque and enhances vascular lumen elasticity"
    ],
    clinicalHighlight: "Synthesized under strict WHO-GMP guidelines, verified with HPLC chromatography to guarantee 99.9% active pharmaceutical purity."
  },
  metabolic: {
    name: "Metabolic Control Solutions",
    title: "AMP-Activated Protein Kinase & DPP-4 Enzyme Pathways",
    benefits: [
      "Suppresses hepatic gluconeogenesis and elevates insulin receptor sensitivity",
      "Maintains stable postprandial glucose dynamics without systemic crashes",
      "Optimizes cellular energy pathways and supports vascular longevity"
    ],
    clinicalHighlight: "Clinical trials indicate steady metabolic glycemic balance and reduced long-term cardiovascular risks."
  },
  neuro: {
    name: "Neuro-Cognitive Regulation",
    title: "Acetylcholinesterase Inhibition & GABAergic Signal Clarity",
    benefits: [
      "Enhances synaptic acetylcholine density for crisp memory retention",
      "Stabilizes over-excited calcium channel units to support restful sleep",
      "Protects cerebral vascular networks from oxidative stress"
    ],
    clinicalHighlight: "Highly bioavailable formulations that cross the blood-brain barrier with optimal pharmacokinetic half-life."
  },
  immunology: {
    name: "Immunology & Advanced Defense",
    title: "Cytokine Modulation & Certified Cellular Immunological Response",
    benefits: [
      "Neutralizes key pro-inflammatory interleukin and cytokine pathways",
      "Accelerates lymphocytic cellular defense and tissue healing loops",
      "Guarantees zero chemical contamination through aseptic NABL filtration"
    ],
    clinicalHighlight: "Developed in state-of-the-art sterile biopharma labs with zero toxin logs."
  }
};

// Animated Counter Component with Intersection Observer Easing from ProHealth v6
interface CounterProps {
  end: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
}

const AnimatedCounter = ({ end, duration = 2000, decimals = 0, suffix = "", prefix = "" }: CounterProps) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = React.useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setHasStarted(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Easing function: easeOutQuad
      const easedProgress = progress * (2 - progress);
      const currentValue = easedProgress * end;
      
      setCount(currentValue);

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      }
    };

    animationFrameId = window.requestAnimationFrame(step);
    return () => {
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [end, duration, hasStarted]);

  return (
    <span ref={elementRef} className="tabular-nums">
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
};

export default function HomePage() {
  // Navigation states
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Hero slide state
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const [heroInterval, setHeroInterval] = useState<NodeJS.Timeout | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 800);
    return () => clearTimeout(timer);
  }, [currentHeroSlide]);

  // AI assessment interactive wizard states
  const [activeConcern, setActiveConcern] = useState<ConcernTrack>("wellness");
  const [wizardStep, setWizardStep] = useState(0); // 0: Start, 1: Question 1, 2: Question 2, 3: Analyzing, 4: Result
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [wizardAnswers, setWizardAnswers] = useState<string[]>([]);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  // Ayurvedic Herbs interactive highlight state
  const [selectedHerb, setSelectedHerb] = useState<string>("cardio");

  // Testimonials state
  const [currentReview, setCurrentReview] = useState(0);

  // Mouse Follow / Cursor parallax position state
  const [heroMousePos, setHeroMousePos] = useState({ x: 0, y: 0 });

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setHeroMousePos({ x, y });
  };

  const handleHeroMouseLeave = () => {
    setHeroMousePos({ x: 0, y: 0 });
  };

  // Auto-play for Hero Slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 8000);
    setHeroInterval(timer);
    return () => clearInterval(timer);
  }, []);

  // Simulator analysis progress runner
  useEffect(() => {
    if (wizardStep === 3) {
      setAnalysisProgress(0);
      const progressTimer = setInterval(() => {
        setAnalysisProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressTimer);
            setTimeout(() => {
              setWizardStep(4);
            }, 600);
            return 100;
          }
          return prev + 5;
        });
      }, 100);
      return () => clearInterval(progressTimer);
    }
  }, [wizardStep]);

  const handleHeroDotClick = (index: number) => {
    if (heroInterval) clearInterval(heroInterval);
    setCurrentHeroSlide(index);
  };

  const startAssessmentWizard = (track: ConcernTrack) => {
    setActiveConcern(track);
    setWizardStep(1);
    setSelectedAnswer(null);
    setWizardAnswers([]);
  };

  const handleOptionSelect = (option: string) => {
    setSelectedAnswer(option);
  };

  const nextWizardStep = () => {
    if (!selectedAnswer) return;
    const updatedAnswers = [...wizardAnswers, selectedAnswer];
    setWizardAnswers(updatedAnswers);
    setSelectedAnswer(null);

    const questionsCount = ASSESSMENT_QUESTIONS[activeConcern].length;
    if (wizardStep < questionsCount) {
      setWizardStep((prev) => prev + 1);
    } else {
      setWizardStep(3); // Go to Analysis loader
    }
  };

  const resetWizard = () => {
    setWizardStep(0);
    setSelectedAnswer(null);
    setWizardAnswers([]);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev === 0 ? 2 : prev - 1));
  };

  const nextReview = () => {
    setCurrentReview((prev) => (prev === 2 ? 0 : prev + 1));
  };

  return (
    <div className="relative min-h-screen bg-obsidian-bg text-gray-100 overflow-hidden font-sans selection:bg-emerald-500/30 selection:text-emerald-300">
      
      {/* Background Radial Auroras for Luxury Depth */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none animate-aurora-1" />
      <div className="absolute bottom-[20%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-amber-500/3 blur-[140px] pointer-events-none animate-aurora-2" />
      <div className="absolute top-[40%] left-[30%] w-[35vw] h-[35vw] rounded-full bg-blue-500/4 blur-[130px] pointer-events-none" />

      {/* --- 1. PREMIUM HEADER / STICKY NAVBAR --- */}
      <Header />

      {/* --- 2. CINEMATIC HERO SLIDER --- */}
      <section 
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
        className="relative min-h-[90vh] flex flex-col justify-center py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10"
      >
        
        {/* Dynamic Slide Background Tint overlay */}
        <div 
          className="absolute inset-0 transition-all duration-1000 ease-in-out pointer-events-none rounded-3xl"
          style={{ background: HERO_SLIDES[currentHeroSlide].bgImage }}
        />

        {/* Engineering Grid Overlay for high-end technical depth */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.012)_1px,transparent_1px)] bg-[size:40px_40px] opacity-75 rounded-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full relative pt-8">
          
          {/* Slide Text Content */}
          <div className="lg:col-span-7 space-y-7 text-left relative z-20">
            
            {/* Animated Badge with Accent Underline from ProHealth v6 */}
            <div className={`space-y-2 transform transition-all duration-700 ease-out ${
              isTransitioning ? "opacity-0 -translate-y-4 scale-95" : "opacity-100 translate-y-0 scale-100"
            }`}>
              <span className="text-xs font-black uppercase tracking-widest text-emerald-600 block">
                {HERO_SLIDES[currentHeroSlide].badge}
              </span>
              <div className="w-12 h-0.5 bg-emerald-500 rounded-full" />
            </div>

            {/* Dynamic Slider Title */}
            <h1 className={`text-4.5xl sm:text-5.5xl lg:text-6xl font-extrabold tracking-tight font-display text-gradient leading-tight transform transition-all duration-700 ease-out delay-100 ${
              isTransitioning ? "opacity-0 translate-y-6 blur-sm" : "opacity-100 translate-y-0 blur-none"
            }`}>
              {HERO_SLIDES[currentHeroSlide].title}
            </h1>

            {/* Dynamic Slider Subtitle */}
            <p className={`text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed transform transition-all duration-700 ease-out delay-200 ${
              isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
            }`}>
              {HERO_SLIDES[currentHeroSlide].description}
            </p>

            {/* Dynamic CTAs - Premium play button like ProHealth v6 */}
            <div className={`flex flex-wrap items-center gap-6 pt-2 transform transition-all duration-700 ease-out delay-300 ${
              isTransitioning ? "opacity-0 translate-y-4 scale-95" : "opacity-100 translate-y-0 scale-100"
            }`}>
              <Link
                href={HERO_SLIDES[currentHeroSlide].cta1Link}
                className="px-8 py-4 text-sm font-bold tracking-wide rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/35 hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden group"
              >
                {HERO_SLIDES[currentHeroSlide].cta1}
              </Link>
              
              {/* Pulsing play button */}
              <Link
                href="/about"
                className="inline-flex items-center gap-3 group/play cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-emerald-600 relative group-hover/play:scale-105 transition-all duration-300 shrink-0">
                  <div className="absolute inset-0 rounded-full bg-emerald-500/10 border border-emerald-500/20 animate-ping opacity-75 pointer-events-none" />
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current ml-0.5">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <span className="text-sm font-bold text-slate-800 group-hover/play:text-emerald-600 transition-colors">
                  See Clinical Walkthrough
                </span>
              </Link>
            </div>

            {/* Navigation Tabs (Quick Switch) */}
            <div className="flex items-center gap-3 pt-6">
              {HERO_SLIDES.map((slide, idx) => (
                <button
                  key={idx}
                  onClick={() => handleHeroDotClick(idx)}
                  className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                    currentHeroSlide === idx ? "w-10 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" : "w-2.5 bg-slate-300 hover:bg-slate-400"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Interactive Hero Visual Showcase with Parallax Asymmetric Floating Cards */}
          <div className="lg:col-span-5 flex justify-center items-center relative h-[400px] lg:h-[450px] z-10">
            
            {/* Ambient Pulse Aura behind visual */}
            <div className={`absolute w-72 h-72 rounded-full blur-[80px] pointer-events-none transition-all duration-1000 ${
              currentHeroSlide === 0 ? "bg-emerald-500/10" : currentHeroSlide === 1 ? "bg-amber-500/10" : "bg-blue-500/10"
            }`} />

            {/* Concentric HUD Rings */}
            <div 
              className="absolute w-80 h-80 sm:w-96 sm:h-96 rounded-full border border-dashed border-emerald-500/15 animate-[spin_60s_linear_infinite]"
              style={{
                transform: `translate3d(${heroMousePos.x * 12}px, ${heroMousePos.y * 12}px, 0)`,
                transition: 'transform 0.15s ease-out'
              }}
            />
            <div 
              className="absolute w-72 h-72 sm:w-80 sm:h-80 rounded-full border border-emerald-500/10 border-t-emerald-500/30 border-b-emerald-500/30 animate-spin-reverse"
              style={{
                transform: `translate3d(${heroMousePos.x * -10}px, ${heroMousePos.y * -10}px, 0)`,
                transition: 'transform 0.15s ease-out'
              }}
            />

            {/* Visual Glassmorphic Core */}
            <div 
              className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-white border border-slate-100 flex items-center justify-center p-6 shadow-xl backdrop-blur-md animate-float"
              style={{
                transform: `translate3d(${heroMousePos.x * 20}px, ${heroMousePos.y * 20}px, 0)`,
                transition: 'transform 0.15s ease-out'
              }}
            >
              <div className="absolute inset-4 rounded-full border border-dashed border-slate-100 animate-[spin_20s_linear_infinite]" />
              
              <div className="z-10 text-center space-y-4 w-full px-4">
                
                {/* Slide 0: EKG Live Pulse */}
                {currentHeroSlide === 0 && (
                  <div className="space-y-4 animate-in fade-in duration-500 flex flex-col items-center">
                    <div className="w-full max-w-[160px] h-12 flex items-center justify-center relative overflow-hidden bg-emerald-50/30 rounded-lg px-2 border border-emerald-500/10">
                      <svg viewBox="0 0 200 60" className="w-full h-full text-emerald-600 drop-shadow-[0_0_4px_rgba(16,185,129,0.3)]">
                        <path
                          d="M 0 30 L 40 30 L 50 10 L 60 50 L 70 30 L 100 30 L 110 30 L 115 5 L 125 55 L 135 30 L 145 30 L 200 30"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeDasharray="600"
                          strokeDashoffset="600"
                          className="animate-dash"
                        />
                      </svg>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shadow-md animate-heartbeat">
                      <Heart className="w-7 h-7 text-emerald-600 fill-emerald-500/10" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800">98.6°F · 72 BPM</div>
                      <p className="text-[10px] text-slate-500 mt-1 max-w-[160px] mx-auto leading-normal">
                        Board-certified specialist network actively online.
                      </p>
                    </div>
                  </div>
                )}

                {/* Slide 1: Fast Delivery & Shilajit Bottle mockup */}
                {currentHeroSlide === 1 && (
                  <div className="space-y-3 animate-in fade-in duration-500 flex flex-col items-center">
                    <div className="relative w-16 h-24 bg-gradient-to-b from-amber-950 via-amber-900 to-amber-950 rounded-xl border border-amber-500/30 shadow-lg flex flex-col justify-between py-2.5 px-1.5 animate-pulse-slow">
                      <div className="text-center">
                        <span className="text-[6px] text-amber-400 uppercase tracking-widest font-extrabold">GOLD</span>
                        <div className="text-[9px] font-extrabold text-white leading-none">DURAUP</div>
                      </div>
                      <div className="w-6 h-6 rounded-full bg-amber-500/10 border border-amber-500/25 flex items-center justify-center mx-auto text-amber-400">
                        <Sparkles className="w-3 h-3" />
                      </div>
                      <div className="text-[6px] text-gray-400 uppercase text-center font-semibold">60 Cap</div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800">Active Herb Shilajit blend</div>
                      <p className="text-[10px] text-slate-500 mt-1 max-w-[160px] mx-auto leading-normal">
                        Direct pharmacy logistics ensuring cold-chain containment.
                      </p>
                    </div>
                  </div>
                )}

                {/* Slide 2: AI Clinical diagnostics & Synapse nodes */}
                {currentHeroSlide === 2 && (
                  <div className="space-y-4 animate-in fade-in duration-500 flex flex-col items-center">
                    <div className="w-32 h-14 relative flex items-center justify-center">
                      <div className="absolute w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping" />
                      <div className="absolute w-12 h-12 rounded-full border border-dashed border-blue-500/20 animate-spin" />
                      <div className="absolute top-2 left-4 w-2 h-2 rounded-full bg-blue-400 shadow-md animate-pulse" />
                      <div className="absolute bottom-1 right-3 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-md animate-pulse" />
                      <div className="absolute top-1 right-6 w-2 h-2 rounded-full bg-blue-500 shadow-md animate-pulse" />
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shadow-md">
                        <Cpu className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800">Encrypted Medical AI</div>
                      <p className="text-[10px] text-slate-500 mt-1 max-w-[170px] mx-auto leading-normal">
                        Clinical diagnostic logic complying with privacy rules.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Asynchronous Parallax Floating Cards from ProHealth home-v6 */}
            
            {/* 1. Floating Recovery Card (Top Right) */}
            <div 
              className="absolute top-4 -right-4 sm:-right-8 z-30 pointer-events-none"
              style={{
                transform: `translate3d(${heroMousePos.x * 35}px, ${heroMousePos.y * 35}px, 0)`,
                transition: 'transform 0.15s ease-out'
              }}
            >
              <div 
                className="p-3.5 rounded-2xl bg-white border border-slate-200/60 shadow-lg flex items-center gap-3"
                style={{
                  animation: 'float 5.2s ease-in-out infinite',
                  animationDelay: '0s'
                }}
              >
                <div className="flex -space-x-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 border-2 border-white flex items-center justify-center text-[8px] font-black text-white shrink-0">VP</div>
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 to-orange-400 border-2 border-white flex items-center justify-center text-[8px] font-black text-white shrink-0">AK</div>
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-400 border-2 border-white flex items-center justify-center text-[8px] font-black text-white shrink-0">NA</div>
                </div>
                <div className="text-left leading-none">
                  <p className="text-[11px] font-black text-slate-800">150K+ Patients</p>
                  <p className="text-[8px] text-slate-400 font-semibold mt-0.5">Recovered & Satisfied</p>
                </div>
              </div>
            </div>

            {/* 2. Floating Pulse Status Card (Left Middle) */}
            <div 
              className="absolute top-20 -left-6 sm:-left-12 z-30 pointer-events-none"
              style={{
                transform: `translate3d(${heroMousePos.x * -40}px, ${heroMousePos.y * -40}px, 0)`,
                transition: 'transform 0.15s ease-out'
              }}
            >
              <div 
                className="p-3 rounded-2xl bg-white border border-slate-200/60 shadow-lg flex items-center gap-2.5"
                style={{
                  animation: 'float 6.4s ease-in-out infinite',
                  animationDelay: '0.5s'
                }}
              >
                <div className="w-6.5 h-6.5 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 animate-pulse shrink-0">
                  <Activity className="w-3.5 h-3.5" />
                </div>
                <div className="text-left leading-none">
                  <p className="text-[10px] font-bold text-slate-800">Live Pulse Node</p>
                  <p className="text-[7.5px] text-slate-400 font-semibold mt-0.5">Telemetry Connected</p>
                </div>
              </div>
            </div>

            {/* 3. Floating Rating Card (Bottom Right) */}
            <div 
              className="absolute bottom-6 right-2 sm:right-6 z-30 pointer-events-none"
              style={{
                transform: `translate3d(${heroMousePos.x * 25}px, ${heroMousePos.y * 25}px, 0)`,
                transition: 'transform 0.15s ease-out'
              }}
            >
              <div 
                className="p-3 rounded-full bg-white border border-slate-200/60 shadow-lg flex items-center gap-2"
                style={{
                  animation: 'float 4.8s ease-in-out infinite',
                  animationDelay: '1.2s'
                }}
              >
                <div className="w-5 h-5 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
                  <Star className="w-3 h-3 fill-amber-500" />
                </div>
                <span className="text-[10px] font-extrabold text-slate-800 pr-1">4.9/5 Trust Rating</span>
              </div>
            </div>

            {/* 4. Floating Security Badge (Bottom Left) */}
            <div 
              className="absolute bottom-16 -left-4 sm:-left-8 z-30 pointer-events-none"
              style={{
                transform: `translate3d(${heroMousePos.x * -30}px, ${heroMousePos.y * -30}px, 0)`,
                transition: 'transform 0.15s ease-out'
              }}
            >
              <div 
                className="p-3 rounded-full bg-white border border-slate-200/60 shadow-lg flex items-center gap-2"
                style={{
                  animation: 'float 5.8s ease-in-out infinite',
                  animationDelay: '0.8s'
                }}
              >
                <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 shrink-0">
                  <Shield className="w-3 h-3" />
                </div>
                <span className="text-[10px] font-extrabold text-slate-800 pr-1">100% HIPAA Secure</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Glassmorphic Stats Strip (From ProHealth home-v6 Layout) */}
        <div className="w-full mt-16 p-6 rounded-3xl glass-panel border border-slate-200/40 bg-white/70 shadow-sm relative z-20 grid grid-cols-2 md:grid-cols-4 gap-6 items-center text-center">
          <div className="space-y-1 md:border-r border-slate-200/50">
            <h3 className="text-2xl font-black text-slate-800 font-display">
              <AnimatedCounter end={20} suffix="+" /> Years
            </h3>
            <p className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider">Clinical Experience</p>
          </div>
          <div className="space-y-1 md:border-r border-slate-200/50">
            <h3 className="text-2xl font-black text-slate-800 font-display">
              <AnimatedCounter end={99.9} decimals={1} suffix="%" />
            </h3>
            <p className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider">HIPAA Data Security</p>
          </div>
          <div className="space-y-1 md:border-r border-slate-200/50">
            <h3 className="text-2xl font-black text-slate-800 font-display">
              <AnimatedCounter end={250} suffix="+" /> Doctors
            </h3>
            <p className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider">Certified Specialists</p>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-black text-slate-800 font-display">
              <AnimatedCounter end={150} suffix="K+" />
            </h3>
            <p className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider">Satisfied Recoveries</p>
          </div>
        </div>
      </section>

      {/* --- 3. PREMIUM CORE SERVICES LINK CARDS --- */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Self Assessment",
              desc: "Take our free AI-guided health assessment to get personalized insights and safe over-the-counter medicine suggestions.",
              icon: Cpu,
              image: "/service_self_assessment.png",
              link: "/assessment",
              bgIcon: "bg-emerald-50 border-emerald-100 text-emerald-600",
              hoverColor: "group-hover:text-emerald-600 text-emerald-600",
              color: "border-slate-100 hover:border-emerald-500/30 hover:shadow-emerald-500/5"
            },
            {
              title: "Pharmacy",
              desc: "Access our fully stocked digital pharmacy offering genuine medicines, supplements, and fast doorstep delivery.",
              icon: ShoppingBag,
              image: "/service_pharmacy.png",
              link: "/shop",
              bgIcon: "bg-amber-50 border-amber-100 text-amber-600",
              hoverColor: "group-hover:text-amber-600 text-amber-600",
              color: "border-slate-100 hover:border-amber-500/30 hover:shadow-amber-500/5"
            },
            {
              title: "Book Appointment",
              desc: "Schedule an online consultation with our board-certified specialists for personalized, high-quality patient care.",
              icon: Calendar,
              image: "/service_book_appointment.png",
              link: "/doctors",
              bgIcon: "bg-blue-50 border-blue-100 text-blue-600",
              hoverColor: "group-hover:text-blue-600 text-blue-600",
              color: "border-slate-100 hover:border-blue-500/30 hover:shadow-blue-500/5"
            }
          ].map((card, i) => (
            <Link 
              key={i} 
              href={card.link}
              className={`bg-white rounded-3xl border flex flex-col text-left justify-between transition-all duration-300 group hover:-translate-y-1.5 shadow-lg shadow-slate-200/40 overflow-hidden ${card.color}`}
            >
              {/* Dynamic Service Card Image Wrapper */}
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-50 border-b border-slate-100">
                <img 
                  src={card.image} 
                  alt={card.title} 
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Float Icon Badge inside Image */}
                <div className={`absolute top-4 left-4 w-11 h-11 rounded-xl border backdrop-blur-md shadow-md flex items-center justify-center group-hover:scale-105 transition-transform duration-300 ${card.bgIcon}`}>
                  <card.icon className="w-4.5 h-4.5" />
                </div>
              </div>

              <div className="p-8 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className={`text-xl font-bold font-display text-slate-800 mb-3 transition-colors ${card.hoverColor}`}>
                    {card.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-6">
                    {card.desc}
                  </p>
                </div>
                <div className={`flex items-center gap-2 text-xs font-black uppercase tracking-wider transition-colors ${card.hoverColor}`}>
                  Proceed Track <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* --- 4. INTERACTIVE CLINICAL AI SIMULATOR --- */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 relative">
        <div className="relative bg-gradient-to-br from-emerald-500/[0.01] via-slate-50 to-blue-500/[0.01] border border-slate-100 rounded-4xl p-8 md:p-14 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.03)] overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-tr from-emerald-500/5 to-blue-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
            
            {/* Interactive Screen Simulator Box (Left Column) */}
            <div className="lg:col-span-6 relative">
              
              {/* Ambient Backlight */}
              <div className="absolute inset-[-10px] rounded-3.5xl bg-gradient-to-tr from-emerald-500/10 to-blue-500/10 blur-2xl opacity-60 z-0 pointer-events-none" />

              {/* Double Border Premium Wrapper */}
              <div className="relative p-[1px] bg-gradient-to-tr from-emerald-500/20 via-slate-200/40 to-blue-500/20 rounded-3xl overflow-hidden shadow-2xl z-10 bg-white">
                <div className="bg-white rounded-[23px] overflow-hidden">
                  
                  {/* Simulator Header */}
                  <div className="px-6 py-4.5 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1.5 shrink-0">
                        <span className="w-2 h-2 rounded-full bg-slate-200" />
                        <span className="w-2 h-2 rounded-full bg-slate-200" />
                        <span className="w-2 h-2 rounded-full bg-slate-200 animate-pulse" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 border-l border-slate-200 pl-3 flex items-center gap-1.5">
                        <Lock className="w-3 h-3 text-slate-450" /> 12ms CLI LATENCY
                      </span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                      <span className="text-[8px] text-emerald-600 font-extrabold uppercase tracking-widest">Active Node</span>
                    </div>
                  </div>

                  {/* Simulator Core Content */}
                  <div className="p-8 min-h-[380px] flex flex-col justify-between text-left">
                    
                    {/* STATE 0: Welcome Screen */}
                    {wizardStep === 0 && (
                      <div className="space-y-6 my-auto animate-in fade-in duration-300">
                        <div className="text-center space-y-2">
                          <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest">How are you feeling?</p>
                          <h3 className="text-xl font-bold font-display text-slate-800">Select a concern to begin clinical track</h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {[
                            { id: "wellness" as ConcernTrack, label: "General Wellness", sub: "Energy, immunity & longevity" },
                            { id: "mens-health" as ConcernTrack, label: "Men's Health", sub: "Stamina, stress & private care" },
                            { id: "skin-hair" as ConcernTrack, label: "Skin & Hair", sub: "Hair fall, acne & clinical derm" },
                            { id: "chronic" as ConcernTrack, label: "Chronic Support", sub: "Diabetes, blood pressure & logs" }
                          ].map((item) => (
                            <button
                              key={item.id}
                              onClick={() => startAssessmentWizard(item.id)}
                              className="bg-white p-4 rounded-xl text-left border border-slate-100 hover:border-emerald-500/30 hover:bg-slate-50/50 hover:shadow-md hover:shadow-slate-200/45 transition-all group cursor-pointer"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">
                                  {item.label}
                                </span>
                                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                              </div>
                              <p className="text-xs text-slate-500 mt-1">{item.sub}</p>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* STATE 1 & 2: Questionnaire Wizard */}
                    {(wizardStep === 1 || wizardStep === 2) && (
                      <div className="space-y-6 w-full animate-in fade-in duration-300">
                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                          <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
                            Concern: {activeConcern.replace("-", " ")}
                          </span>
                          <span className="text-xs text-slate-400">
                            Step {wizardStep} of {ASSESSMENT_QUESTIONS[activeConcern].length}
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className="bg-emerald-500 h-full transition-all duration-500" 
                            style={{ width: `${(wizardStep / ASSESSMENT_QUESTIONS[activeConcern].length) * 100}%` }}
                          />
                        </div>

                        {/* Question */}
                        <div className="space-y-4">
                          <h4 className="text-base font-bold text-slate-800 leading-relaxed">
                            {ASSESSMENT_QUESTIONS[activeConcern][wizardStep - 1].question}
                          </h4>

                          <div className="space-y-2.5">
                            {ASSESSMENT_QUESTIONS[activeConcern][wizardStep - 1].options.map((option, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleOptionSelect(option)}
                                className={`w-full p-3.5 rounded-xl text-left text-sm border transition-all cursor-pointer ${
                                  selectedAnswer === option
                                    ? "bg-emerald-50 border-emerald-500 text-emerald-700 font-semibold"
                                    : "bg-white border-slate-100 text-slate-600 hover:border-slate-200 hover:bg-slate-50/50"
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                                    selectedAnswer === option ? "border-emerald-500 bg-emerald-500" : "border-slate-300"
                                  }`}>
                                    {selectedAnswer === option && <Check className="w-2.5 h-2.5 text-white" />}
                                  </span>
                                  {option}
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                          <button
                            onClick={resetWizard}
                            className="text-xs text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={nextWizardStep}
                            disabled={!selectedAnswer}
                            className={`px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                              selectedAnswer
                                ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/10"
                                : "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed"
                            }`}
                          >
                            Continue <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* STATE 3: Running AI Diagnosis */}
                    {wizardStep === 3 && (
                      <div className="my-auto space-y-6 w-full text-center animate-in fade-in duration-300">
                        <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                          <div className="absolute inset-0 rounded-full border-4 border-slate-100" />
                          <div className="absolute inset-0 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin" />
                          <Cpu className="w-8 h-8 text-emerald-600" />
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-lg font-bold text-slate-800">Analyzing Diagnostic Indicators...</h4>
                          <p className="text-xs text-slate-500 max-w-sm mx-auto">Cross-referencing telemetry symptoms with primary database trees.</p>
                        </div>

                        <div className="max-w-xs mx-auto space-y-1">
                          <div className="flex justify-between text-[10px] text-slate-400 font-semibold uppercase">
                            <span>Compiling Protocol</span>
                            <span>{analysisProgress}%</span>
                          </div>
                          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                            <div 
                              className="bg-emerald-500 h-full transition-all duration-100" 
                              style={{ width: `${analysisProgress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STATE 4: Assessment Results */}
                    {wizardStep === 4 && (
                      <div className="space-y-6 w-full text-left animate-in zoom-in-95 duration-500">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-md bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                              <Award className="w-3.5 h-3.5 text-emerald-600" />
                            </div>
                            <span className="text-xs font-bold text-slate-800 tracking-wide uppercase">Simulation Complete</span>
                          </div>
                          <span className="text-[10px] bg-emerald-50 border border-emerald-100 text-emerald-600 font-bold px-2 py-0.5 rounded">
                            Actionable Protocol Generated
                          </span>
                        </div>

                        <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-50/20 space-y-3">
                          <h5 className="text-sm font-bold text-slate-800">Preliminary Symptom Protocol Summary:</h5>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            Based on your selections for <strong className="text-slate-800">{activeConcern.replace("-", " ")}</strong>: &quot;{wizardAnswers[0]}&quot; and &quot;{wizardAnswers[1]}&quot;, our simulated protocol advises active energy optimization.
                          </p>
                          
                          {activeConcern === "mens-health" ? (
                            <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg text-xs text-slate-700 leading-relaxed flex items-center gap-2">
                              <Sparkles className="w-4 h-4 shrink-0 text-amber-500" />
                              <span>Recommended Supplement: <strong className="text-amber-700">Duraup Capsules (Himalayan Shilajit & KSM-66 Blend)</strong> for strength and recovery.</span>
                            </div>
                          ) : (
                            <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-lg text-xs text-slate-700 leading-relaxed flex items-center gap-2">
                              <Heart className="w-4 h-4 shrink-0 text-emerald-600" />
                              <span>Recommended: Free 10-minute checkup call with our general practitioners to structure a detailed diet profile.</span>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                          <Link
                            href={activeConcern === "mens-health" ? "/shop" : "/doctors"}
                            className="flex-1 text-center py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:brightness-110 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
                          >
                            {activeConcern === "mens-health" ? "Acquire Duraup Formula" : "Schedule Consultant"}
                          </Link>
                          <button
                            onClick={resetWizard}
                            className="px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 hover:border-slate-300 text-xs font-bold text-slate-600 uppercase tracking-wider transition-all cursor-pointer"
                          >
                            Run New assessment
                          </button>
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              </div>
            </div>

            {/* Copy & Command Center Side (Right Column) */}
            <div className="lg:col-span-6 space-y-7 text-left lg:pl-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-black tracking-widest text-emerald-300 uppercase">
                <Activity className="w-3.5 h-3.5 animate-pulse" /> Interactive Lab
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display text-white leading-tight">
                  Private symptom intake before the appointment.
                </h2>
                <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-xl">
                  Start with a guided health track, receive a structured preliminary protocol, then route yourself to the right consultant or pharmacy flow without waiting-room friction.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Avg. intake", value: "3 min" },
                  { label: "Data mode", value: "Private" },
                  { label: "Routing", value: "Instant" }
                ].map((metric) => (
                  <div key={metric.label} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                    <div className="text-lg font-black text-white">{metric.value}</div>
                    <div className="mt-1 text-[9px] font-extrabold uppercase tracking-widest text-slate-400">{metric.label}</div>
                  </div>
                ))}
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 md:p-6 shadow-2xl shadow-black/10">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <h3 className="text-sm font-black text-white uppercase tracking-widest">Clinical Command Center</h3>
                    <p className="mt-1 text-xs text-slate-400">Live routing map for the assessment workflow.</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center text-emerald-300">
                    <Cpu className="w-4 h-4" />
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { icon: Lock, title: "Encrypted intake", desc: "Sensitive answers stay protected." },
                    { icon: Sliders, title: "Adaptive questions", desc: "Tracks change by concern type." },
                    { icon: Award, title: "Protocol summary", desc: "Actionable next steps generated." },
                    { icon: ExternalLink, title: "Directed routing", desc: "Continue to doctor or pharmacy." }
                  ].map((item) => (
                    <div key={item.title} className="rounded-2xl bg-slate-950/45 border border-white/10 p-4">
                      <item.icon className="w-4 h-4 text-emerald-300" />
                      <h4 className="mt-3 text-xs font-black text-white">{item.title}</h4>
                      <p className="mt-1 text-[11px] leading-relaxed text-slate-400">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/assessment"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 transition-all cursor-pointer hover:-translate-y-0.5"
                >
                  Launch Assessment <ExternalLink className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/doctors"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-black text-xs uppercase tracking-wider transition-all"
                >
                  Talk To Doctor <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- 5. EDITORIAL BRAND STORYTELLING (ABOUT BLOCK) --- */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 relative border-t border-slate-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Copy & Stats Side (Left Column) */}
          <div className="lg:col-span-6 space-y-7 text-left pr-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-xs font-black tracking-widest text-emerald-600 uppercase">
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" /> About Duraup
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-slate-905 leading-tight">
              A Legacy of Care.<br />
              <span className="text-gradient">A Future of Innovation.</span>
            </h2>
            
            <div className="space-y-4 text-slate-500 text-sm leading-relaxed max-w-xl">
              <p>
                At Duraup, we believe that healthcare should be an integrated, seamless experience. From the moment you begin your wellness journey with our AI diagnostic tools, to scheduling an elite consultation and receiving your prescribed medications at your doorstep—we are with you every step of the way.
              </p>
              <p>
                Our mission is to bridge the gap between traditional clinical excellence and modern technological convenience, providing you with a secure, confidential, and highly effective healthcare protocol.
              </p>
            </div>

            {/* Solid Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow text-left">
                <div className="text-2xl font-black font-display text-emerald-600">99.9%</div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mt-1.5">Uncompromised Security</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-normal">Telemetry and checkout logs protected by multi-layer bank-grade protocols.</p>
              </div>
              
              <div className="p-5 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow text-left">
                <div className="text-2xl font-black font-display text-emerald-600">3 Min</div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mt-1.5">Average Response Time</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-normal">Fastest digital routing to clinical assistance and prescription verification.</p>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <Link
                href="/about"
                className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer hover:-translate-y-0.5"
              >
                More About Our Journey
              </Link>
            </div>
          </div>

          {/* Dynamic Overlapping Visual Composition (Right Column) */}
          <div className="lg:col-span-6 relative w-full h-[480px] mt-12 lg:mt-0 flex items-center justify-center select-none">
            {/* HUD Concentric Rings for High-Tech visual depth */}
            <div className="absolute w-[380px] h-[380px] rounded-full border border-dashed border-emerald-500/10 animate-[spin_100s_linear_infinite] pointer-events-none" />
            <div className="absolute w-[300px] h-[300px] rounded-full border border-emerald-500/5 border-t-emerald-500/20 border-b-emerald-500/20 animate-spin-reverse pointer-events-none" />

            {/* Layer 1: Background Colleague Card (Tall portrait offset right) */}
            <div 
              className="absolute right-[5%] top-[10%] w-[45%] aspect-[0.68] rounded-3xl overflow-hidden shadow-[0_15px_35px_rgba(15,23,42,0.06)] border-4 border-white bg-white z-10 hover:z-25 transition-all duration-700 hover:scale-[1.03] group/colleague"
              style={{
                animation: "float 6.8s ease-in-out infinite",
                animationDelay: "0.5s"
              }}
            >
              <img 
                src="/clinical_office_colleagues.png" 
                alt="Clinical Specialists Collaborating" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover/colleague:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent pointer-events-none" />
            </div>

            {/* Layer 2: Main Security Card (Square offset left) */}
            <div 
              className="absolute left-[5%] top-[5%] w-[68%] aspect-[1.1] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(15,23,42,0.1)] border-4 border-white bg-white z-20 hover:z-25 transition-all duration-700 hover:scale-[1.03] group/security"
              style={{
                animation: "float 5.6s ease-in-out infinite",
                animationDelay: "0s"
              }}
            >
              <img 
                src="/medical_shield_security.png" 
                alt="Uncompromised Telemetry Security" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover/security:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/25 to-transparent pointer-events-none" />

              {/* Secure Badge top-left */}
              <div className="absolute top-4 left-4 bg-emerald-600/90 text-white font-display text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full backdrop-blur-md shadow-md border border-white/10 select-none">
                Encrypted Vault
              </div>

              {/* Glowing pulse indicator bottom-right */}
              <div className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-lg select-none">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-455 animate-ping" />
                <span className="absolute w-2.5 h-2.5 rounded-full bg-emerald-455" />
              </div>
            </div>

            {/* Layer 3: Floating Gold ISO Certification Badge */}
            <div 
              className="absolute bottom-[12%] right-[15%] bg-gradient-to-r from-amber-500 to-amber-600 text-black px-4.5 py-2.5 rounded-full font-display text-[10px] font-black uppercase tracking-widest z-30 transition-all duration-500 shadow-xl hover:scale-[1.05]"
              style={{
                animation: "float 6.0s ease-in-out infinite",
                animationDelay: "1s"
              }}
            >
              ISO Certified
            </div>
          </div>
        </div>
      </section>

      {/* --- 6. MEDICAL SOLUTIONS SERVICES GRID --- */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 relative border-t border-slate-100">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <p className="text-sm font-bold text-emerald-600 uppercase tracking-widest">Our Services</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-slate-800">
            Comprehensive Medical Solutions
          </h2>
          <p className="text-slate-550 text-sm leading-relaxed">
            We offer a broad spectrum of clinical services tailored to your unique health profile. Explore our integrated digital clinic.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "General Consultations",
              desc: "Speak with our board-certified general practitioners for primary care, routine check-ups, and immediate medical guidance.",
              icon: Heart,
              link: "/doctors",
              comingSoon: false,
              img: "/clinical_doctor_portrait.png"
            },
            {
              title: "Digital Pharmacy",
              desc: "Order prescription medications, vitamins, and supplements through our secure, fully stocked digital marketplace.",
              icon: ShoppingBag,
              link: "/shop",
              comingSoon: false,
              img: "/service_pharmacy.png"
            },
            {
              title: "AI Health Assessment",
              desc: "Utilize our state-of-the-art AI symptom checker to receive a preliminary health protocol within minutes.",
              icon: Cpu,
              link: "/assessment",
              comingSoon: false,
              img: "/service_self_assessment.png"
            },
            {
              title: "Health Vault",
              desc: "Store your medical history, test results, and prescriptions securely online for easy access during your next visit.",
              icon: Shield,
              link: "/dashboard",
              comingSoon: false,
              img: "/service_health_vault.png"
            },
            {
              title: "Cardiology Care",
              desc: "Expert cardiac evaluations, risk assessments, and ongoing management programs from top heart specialists.",
              icon: Activity,
              link: "/doctors",
              comingSoon: false,
              img: "/service_book_appointment.png"
            },
            {
              title: "Lab Testing",
              desc: "Book at-home diagnostic tests. Our phlebotomists collect samples safely, providing rapid online results.",
              icon: Sliders,
              link: "/",
              comingSoon: true,
              img: "/clinical_team_meeting.png"
            }
          ].map((service, i) => (
            <div 
              key={i} 
              className="bg-white p-5 rounded-3xl border border-slate-100 hover:border-emerald-500/30 hover:bg-slate-50/50 shadow-lg shadow-slate-200/40 hover:-translate-y-2 hover:shadow-xl transition-all duration-500 group flex flex-col justify-between overflow-hidden"
            >
              <div>
                {/* Premium Image Header */}
                <div className="relative h-44 w-full overflow-hidden shrink-0 rounded-2xl mb-6">
                  <img 
                    src={service.img} 
                    alt={service.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/25 to-transparent pointer-events-none" />
                  
                  {/* Floating icon badge inside the image frame */}
                  <div className="absolute bottom-3 left-3 w-10 h-10 rounded-xl bg-white/95 backdrop-blur flex items-center justify-center text-emerald-600 shadow-sm border border-slate-100/50">
                    <service.icon className="w-4.5 h-4.5" />
                  </div>

                  {service.comingSoon && (
                    <span className="absolute top-3 right-3 text-[9px] bg-amber-500/90 backdrop-blur-md text-black font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow">
                      Coming Soon
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold font-display text-slate-805 mb-2 group-hover:text-emerald-700 transition-colors px-1">
                  {service.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-6 px-1">
                  {service.desc}
                </p>
              </div>

              <div className="px-1 pt-2 border-t border-slate-50">
                {!service.comingSoon ? (
                  <Link
                    href={service.link}
                    className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 group-hover:text-emerald-700 transition-all cursor-pointer"
                  >
                    Read More <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-all" />
                  </Link>
                ) : (
                  <span className="text-xs font-semibold text-slate-400 cursor-default">
                    Under Lock & Key
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- 7. SPECIALIZED PRODUCT SPOTLIGHT (ALLOPATHIC PHARMACOLOGICAL EXCELLENCE) --- */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 relative border-t border-white/5">
        <div className="absolute top-[20%] right-[10%] w-[30vw] h-[30vw] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Visual Highlight Product Showcase */}
          <div className="lg:col-span-6 flex flex-col items-center">
            
            {/* The Product Bottle card */}
            <div className="relative w-full max-w-[420px] glass-panel p-8 rounded-3xl border border-white/8 shadow-2xl overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
              
              {/* Floating clinical badge */}
              <div className="absolute top-6 left-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-400">
                <Sparkle className="w-3.5 h-3.5 animate-spin" /> WHO-GMP Certified
              </div>

              {/* Central Bottle illustration Mockup (Highly designed SVG styling) */}
              <div className="h-64 flex items-center justify-center relative my-4">
                <div className="absolute w-44 h-44 rounded-full bg-emerald-500/5 border border-dashed border-emerald-500/25 animate-[spin_20s_linear_infinite]" />
                
                {/* 3D Vial Design Mockup */}
                <div className="relative w-28 h-48 bg-gradient-to-b from-slate-950/95 via-slate-900 to-slate-950 rounded-2xl border-2 border-emerald-500/30 flex flex-col justify-between py-4 px-2 shadow-2xl z-10 group-hover:scale-105 transition-transform duration-300">
                  <div className="text-center">
                    <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-semibold">Rx Prescription</span>
                    <h4 className="text-base font-extrabold tracking-widest font-display text-white mt-1">DURAUP RX</h4>
                    <p className="text-[9px] text-gray-400 uppercase">Clinical Therapeutics</p>
                  </div>
                  
                  {/* Heartbeat EKG visual */}
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto text-emerald-400 animate-pulse">
                    <Activity className="w-4 h-4" />
                  </div>

                  <div className="text-center">
                    <div className="text-[8px] text-gray-400 uppercase tracking-wider">60 Capsules</div>
                    <div className="text-[9px] font-bold text-emerald-450 uppercase mt-0.5">Molecular Complex</div>
                  </div>
                </div>
              </div>

              {/* Ingredient Trigger Pills */}
              <div className="flex flex-wrap justify-center gap-2 pt-4 border-t border-white/5">
                {[
                  { id: "cardio", label: "Cardiology" },
                  { id: "metabolic", label: "Metabolics" },
                  { id: "neuro", label: "Neuro-CNS" },
                  { id: "immunology", label: "Immunology" }
                ].map((herb) => (
                  <button
                    key={herb.id}
                    onClick={() => setSelectedHerb(herb.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 transform active:scale-95 cursor-pointer ${
                      selectedHerb === herb.id
                        ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-500/20 scale-[1.03]"
                        : "bg-white/5 border border-white/5 text-gray-300 hover:border-white/10 hover:bg-white/8 hover:text-white"
                    }`}
                  >
                    {herb.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Therapeutic benefit details block with custom re-mount animation */}
            <div 
              key={selectedHerb} 
              className="w-full max-w-[420px] mt-6 glass-panel p-6 rounded-2xl border border-emerald-500/15 bg-slate-900/60 text-left animate-[fadeInUp_0.4s_ease-out] shadow-xl hover:shadow-emerald-500/5 transition-all"
            >
              <h4 className="text-base font-extrabold text-emerald-400 font-display flex items-center gap-2">
                <Sparkle className="w-4 h-4" /> {HERBS_DATA[selectedHerb].name}
              </h4>
              <p className="text-xs text-gray-300 italic mt-1 font-medium">{HERBS_DATA[selectedHerb].title}</p>
              
              <ul className="mt-3.5 space-y-2">
                {HERBS_DATA[selectedHerb].benefits.map((benefit, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-2 text-xs text-gray-400 leading-relaxed">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              
              <p className="text-[10px] text-gray-500 mt-4 border-t border-white/5 pt-3 leading-normal">
                <strong>Clinical Note:</strong> {HERBS_DATA[selectedHerb].clinicalHighlight}
              </p>
            </div>

          </div>

          {/* Core Info & clinical metrics side */}
          <div className="lg:col-span-6 space-y-8 text-left">
            <div className="space-y-3">
              <p className="text-sm font-semibold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> Signature Formula
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-gradient leading-tight">
                Certified Allopathic Formulations. Molecular Precision.
              </h2>
              <p className="text-sm text-gray-400 leading-relaxed">
                Experience high-efficacy clinical health management with our sovereign, certified allopathic therapeutics. Every batch is synthesized using state-of-the-art chemical processes to preserve pharmaceutical integrity and guarantee absolute molecular precision.
              </p>
            </div>

            {/* The Big Stats Column */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="p-5 rounded-2xl bg-white/3 border border-white/5 text-left hover:border-emerald-500/20 transition-colors duration-300 hover:bg-slate-900/40">
                <div className="text-2xl font-extrabold text-emerald-400 font-display">99.9%</div>
                <h4 className="text-sm font-semibold text-white mt-1">Chemical Assay Purity</h4>
                <p className="text-xs text-gray-400 mt-1">Tested under rigorous high-performance liquid chromatography to guarantee zero active impurities.</p>
              </div>

              <div className="p-5 rounded-2xl bg-white/3 border border-white/5 text-left hover:border-emerald-500/20 transition-colors duration-300 hover:bg-slate-900/40">
                <div className="text-2xl font-extrabold text-emerald-400 font-display">94%</div>
                <h4 className="text-sm font-semibold text-white mt-1">Bioavailable Absorption</h4>
                <p className="text-xs text-gray-400 mt-1">Advanced pharmacokinetics ensure maximized systemic absorption and stable biological half-life.</p>
              </div>

              <div className="p-5 rounded-2xl bg-white/3 border border-white/5 text-left hover:border-emerald-500/20 transition-colors duration-300 hover:bg-slate-900/40">
                <div className="text-2xl font-extrabold text-emerald-400 font-display">100% Certified</div>
                <h4 className="text-sm font-semibold text-white mt-1">Licensed WHO-GMP Labs</h4>
                <p className="text-xs text-gray-400 mt-1">Formulated in state-of-the-art sterile manufacturing environments matching global standards.</p>
              </div>

              <div className="p-5 rounded-2xl bg-white/3 border border-white/5 text-left hover:border-emerald-500/20 transition-colors duration-300 hover:bg-slate-900/40">
                <div className="text-2xl font-extrabold text-emerald-400 font-display">NABL Checked</div>
                <h4 className="text-sm font-semibold text-white mt-1">Rigorous Quality Seals</h4>
                <p className="text-xs text-gray-400 mt-1">Every manufactured batch undergoes heavy metal and toxin screening in independent clinical laboratories.</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/shop"
                className="px-8 py-3.5 text-sm font-bold tracking-wide rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-[0_4px_25px_rgba(16,185,129,0.2)] hover:brightness-110 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
              >
                Explore Pharmacopoeia
              </Link>
              <Link
                href="/contact"
                className="px-8 py-3.5 text-sm font-bold tracking-wide rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 transition-all cursor-pointer hover:-translate-y-0.5"
              >
                Verify Prescriptions
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- 8. TESTIMONIALS CAROUSEL --- */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 relative border-t border-white/5">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <p className="text-sm font-semibold text-emerald-400 uppercase tracking-widest">Client Testimonials</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-gradient">
            What Our Patients Say
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Real feedback from verified Duraup consumers detailing their wellness pathways and recovery successes.
          </p>
        </div>

        {/* Testimonial card slider */}
        <div className="max-w-4xl mx-auto relative px-4 md:px-12">
          
          <div className="glass-panel p-8 md:p-12 rounded-3xl border border-white/8 relative shadow-2xl text-left min-h-[220px] flex flex-col justify-between">
            <div className="absolute top-6 right-8 text-emerald-400/20 font-serif text-8xl leading-none select-none">“</div>
            
            <div className="space-y-6">
              {/* Rating stars */}
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Feedback Content */}
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed italic">
                {currentReview === 0 && (
                  `"Duraup Capsules have been a game-changer for me! I've been taking them for a month, and I've noticed a significant improvement in my overall energy levels and mental clarity. The natural ingredients are a plus, and I appreciate the transparency in the product's formulation. No side effects, easy to incorporate into my routine - definitely a must-try for anyone looking to boost their vitality!"`
                )}
                {currentReview === 1 && (
                  `"Duraup Capsules have exceeded my expectations! I've struggled with fatigue and stress, but since incorporating these capsules into my daily routine, I've experienced a remarkable difference. The blend of ingredients seems to work synergistically, providing a noticeable boost in my resilience and focus. I appreciate the natural approach, and the results speak for themselves. Highly recommended for those seeking a natural energy and wellness solution!"`
                )}
                {currentReview === 2 && (
                  `"I can't say enough about Duraup Capsules! These capsules have become an essential part of my wellness routine. The carefully selected ingredients have helped me manage stress more effectively, and I've noticed a positive impact on my overall well-being. No jitters or crashes - just a steady, sustained energy throughout the day. Kudos to Duraup for creating a reliable and effective supplement that delivers on its promises!"`
                )}
              </p>
            </div>

            {/* Author */}
            <div className="flex items-center gap-4 mt-8 border-t border-white/5 pt-6">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center font-display font-extrabold text-emerald-400">
                {currentReview === 0 && "VP"}
                {currentReview === 1 && "AK"}
                {currentReview === 2 && "NA"}
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">
                  {currentReview === 0 && "Vipan"}
                  {currentReview === 1 && "Ajay Kumar"}
                  {currentReview === 2 && "Naveen Ahuja"}
                </h4>
                <p className="text-xs text-gray-400 mt-0.5">Verified Duraup Customer</p>
              </div>
            </div>
          </div>

          {/* Slider Controllers */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevReview}
              className="p-3 rounded-xl bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/15 transition-all shadow-md"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              {[0, 1, 2].map((idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentReview(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    currentReview === idx ? "bg-emerald-400" : "bg-gray-700 hover:bg-gray-600"
                  }`}
                  aria-label={`Go to review ${idx + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextReview}
              className="p-3 rounded-xl bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/15 transition-all shadow-md"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* --- 9. MAGAZINE-STYLE HEALTH INSIGHTS (BLOGS) --- */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 relative border-t border-white/5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-16">
          <div className="text-left max-w-xl space-y-4">
            <p className="text-sm font-semibold text-emerald-400 uppercase tracking-widest">Health Insights</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-gradient">
              Latest Wellness Intelligence
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Curated medical literature, recovery guides and biological longevity research compiled by our certified clinical writers.
            </p>
          </div>
          <Link
            href="/blogs"
            className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-white font-semibold text-xs tracking-wide transition-all uppercase shrink-0"
          >
            Explore Full Library
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "5 Everyday Habits for Better Immunity",
              desc: "Simple lifestyle improvements and micronutrient protocols that significantly support long-term lymphatic wellness and molecular prevention.",
              readTime: "4 Min Read",
              category: "Immunity",
              link: "/blogs/everyday-habits-better-immunity"
            },
            {
              title: "When to Choose Online Consultation",
              desc: "Understand when tele-consultation is the right primary step for acute symptoms, regular reports and initial psychiatric pathways.",
              readTime: "5 Min Read",
              category: "Telehealth",
              link: "/blogs/when-to-choose-online-consultation"
            },
            {
              title: "How Prescription Orders Move Through Pharmacy",
              desc: "A meticulous behind-the-scenes tracking of prescription authentication, certified pharmacist packaging, cold-chain containment and express home dispatch.",
              readTime: "6 Min Read",
              category: "Pharmacy Logistics",
              link: "/blogs/prescription-orders-through-pharmacy"
            }
          ].map((blog, i) => (
            <Link 
              key={i} 
              href={blog.link}
              className="glass-panel rounded-2xl overflow-hidden border border-white/5 flex flex-col justify-between text-left group hover:border-emerald-500/20 hover:bg-white/5 transition-all duration-300"
            >
              {/* Blog Graphic Placeholder Block with dynamic styles */}
              <div className="h-48 w-full bg-gradient-to-br from-emerald-950/40 via-obsidian-card to-blue-950/20 border-b border-white/5 relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform duration-300">
                  <Activity className="w-5 h-5" />
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                      {blog.category}
                    </span>
                    <span className="text-[10px] text-gray-500 font-medium flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-gray-600" /> {blog.readTime}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug">
                    {blog.title}
                  </h3>

                  <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">
                    {blog.desc}
                  </p>
                </div>

                <div className="flex items-center gap-1 text-xs font-semibold text-emerald-400 group-hover:text-emerald-300 border-t border-white/5 pt-4">
                  Read Full Article <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* --- 10. DYNAMIC NEWSLETTER PORTAL --- */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 relative">
        <div className="relative glass-panel p-10 md:p-16 rounded-3xl border border-white/8 overflow-hidden shadow-2xl">
          
          {/* Internal Glowing Blob */}
          <div className="absolute bottom-[-50px] right-[-50px] w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
          <div className="absolute top-[-50px] left-[-50px] w-64 h-64 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />

          <div className="relative max-w-2xl mx-auto text-center space-y-6">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto text-emerald-400">
              <Mail className="w-6 h-6" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-gradient">
              Join Our Premium Medical Briefing
            </h3>
            
            <p className="text-sm text-gray-400 max-w-lg mx-auto leading-relaxed">
              Join our premium network to receive curated longevity protocols, early access to new digital clinics, and expert health briefings. We respect your privacy, unsubscribe anytime.
            </p>

            <form 
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2"
            >
              <input
                type="email"
                placeholder="Enter secure email address"
                required
                className="flex-1 px-4 py-3 rounded-xl text-sm text-white glass-input text-left"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:brightness-110 text-white text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-md"
              >
                Access Briefings
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* --- 11. DETAILED FOOTER --- */}
      <footer className="glass-panel border-t border-white/5 pt-20 pb-8 px-4 sm:px-6 lg:px-8 z-10 relative bg-obsidian-card/40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-white/5 pb-16 text-left">
          
          {/* Column 1: Brand & Logo */}
          <div className="md:col-span-4 space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <Activity className="w-4.5 h-4.5 text-emerald-400" />
              </div>
              <span className="text-xl font-bold tracking-wider font-display text-white">DURAUP</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              Building the next generation of premium healthcare. Experience seamless digital integration from clinical-grade AI assessment to private physician consultation and direct pharmacy dispatch, all in one encrypted environment.
            </p>
          </div>

          {/* Column 2: Explore links */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Explore</h4>
            <ul className="space-y-2.5">
              {[
                { name: "Home", href: "/" },
                { name: "About Us", href: "/about" },
                { name: "Doctors Directory", href: "/doctors" },
                { name: "Pharmacy Store", href: "/shop" },
                { name: "Health Insights", href: "/blogs" }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-xs text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Policies links */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Policies</h4>
            <ul className="space-y-2.5">
              {[
                { name: "Privacy Policy", href: "/" },
                { name: "Terms of Service", href: "/" },
                { name: "Refund Policy", href: "/" },
                { name: "Patient Rights", href: "/" },
                { name: "Contact Support", href: "/contact" }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-xs text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact details */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Clinical Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-xs text-gray-400 leading-normal">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Duraup HQ, Business District, Innovation Park, CP 1001</span>
              </li>
              <li className="flex items-center gap-2.5 text-xs text-gray-400">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="tel:+910000000000" className="hover:text-white transition-colors">+91 00000 00000</a>
              </li>
              <li className="flex items-center gap-2.5 text-xs text-gray-400">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="mailto:hello@duraup.com" className="hover:text-white transition-colors">hello@duraup.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright sub-footer */}
        <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© 2026 Duraup Healthcare. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-white transition-colors">Terms of Use</Link>
            <Link href="/" className="hover:text-white transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
