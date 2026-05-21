"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import {
  Activity,
  Shield,
  Heart,
  Award,
  ArrowLeft,
  Lock,
  Cpu,
  Clock,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Database,
  CheckCircle,
  Users,
  Check,
  Stethoscope,
  MousePointer
} from "lucide-react";

// Scroll reveal component for fluid scroll entrances
function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    const current = elementRef.current;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, []);

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function AboutPage() {
  // Custom cursor position state with spring lag interpolation
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorType, setCursorType] = useState<"default" | "explore" | "secure" | "certified" | "doctor" | "click">("default");
  const [isHovered, setIsHovered] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);

  // Stats incremental animation values
  const [encryptionValue, setEncryptionValue] = useState(90);
  const [specialistsValue, setSpecialistsValue] = useState(150);

  useEffect(() => {
    // 1. Mouse Move Listener
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!hasMoved) setHasMoved(true);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 2. Cursor Spring Interpolation loop (requestAnimationFrame)
    let animationFrameId: number;
    const updateCursor = () => {
      setCursorPosition((prev) => {
        // Linear interpolation for spring lag effect
        const dx = mousePosition.x - prev.x;
        const dy = mousePosition.y - prev.y;
        return {
          x: prev.x + dx * 0.12,
          y: prev.y + dy * 0.12
        };
      });
      animationFrameId = requestAnimationFrame(updateCursor);
    };
    animationFrameId = requestAnimationFrame(updateCursor);

    // 3. Stats Tick animation on page load
    const interval = setInterval(() => {
      setEncryptionValue((prev) => (prev < 99.9 ? Math.min(prev + 0.3, 99.9) : 99.9));
      setSpecialistsValue((prev) => (prev < 250 ? Math.min(prev + 3, 250) : 250));
    }, 40);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      clearInterval(interval);
    };
  }, [mousePosition, hasMoved]);

  // Helper handler to change cursor status
  const triggerCursor = (type: typeof cursorType, active: boolean) => {
    setCursorType(type);
    setIsHovered(active);
  };

  return (
    <div className="relative min-h-screen bg-obsidian-bg text-slate-800 overflow-hidden font-sans pb-32 text-left selection:bg-emerald-500/20 selection:text-emerald-800">
      
      {/* Custom Floating Cursor Tracker */}
      {hasMoved && (
        <div
          className="fixed pointer-events-none z-50 hidden md:block transition-transform duration-300 ease-out"
          style={{
            left: `${cursorPosition.x}px`,
            top: `${cursorPosition.y}px`,
            transform: "translate(-50%, -50%)"
          }}
        >
          {/* Main glowing cursor body */}
          <div
            className={`rounded-full flex items-center justify-center font-display text-[9px] font-black uppercase tracking-widest transition-all duration-500 ${
              isHovered
                ? "w-20 h-20 bg-emerald-500/90 text-white shadow-[0_0_30px_rgba(16,185,129,0.5)] border border-white/20 scale-100"
                : "w-6 h-6 bg-slate-900/10 backdrop-blur-sm border-2 border-emerald-500/60 shadow-[0_0_15px_rgba(16,185,129,0.2)] scale-75"
            }`}
          >
            {isHovered && (
              <span className="animate-fade-in text-center leading-tight">
                {cursorType === "explore" && "EXPLORE"}
                {cursorType === "secure" && "SECURE"}
                {cursorType === "certified" && "WHO-GMP"}
                {cursorType === "doctor" && "CONSULT"}
                {cursorType === "click" && "GO"}
              </span>
            )}
          </div>
          {/* External soft trail aura */}
          <div
            className={`absolute inset-[-10px] rounded-full border border-emerald-500/20 pointer-events-none transition-all duration-700 ${
              isHovered ? "scale-150 opacity-100" : "scale-75 opacity-0"
            }`}
          />
        </div>
      )}

      {/* Decorative Aurora Background Spheres */}
      <div className="absolute top-[-5%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none animate-aurora-1" />
      <div className="absolute bottom-[20%] right-[-15%] w-[50vw] h-[50vw] rounded-full bg-amber-500/4 blur-[140px] pointer-events-none animate-aurora-2" />
      <div className="absolute top-[40%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-emerald-500/3 blur-[130px] pointer-events-none animate-pulse-slow" />

      {/* Sticky Header */}
      <Header />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 relative">
        
        {/* Back Link */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-emerald-600 transition-colors py-1.5 px-3 rounded-lg bg-slate-50 border border-slate-200/50 hover:border-slate-200/90"
            onMouseEnter={() => triggerCursor("click", true)}
            onMouseLeave={() => triggerCursor("default", false)}
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>
          
          <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-400 font-semibold bg-slate-100/50 px-3 py-1 rounded-full border border-slate-200/30">
            <MousePointer className="w-3.5 h-3.5 text-emerald-500 animate-bounce" /> Hover elements for cursor action
          </div>
        </div>

        {/* Hero Section */}
        <ScrollReveal>
          <div className="relative glass-panel p-8 md:p-14 rounded-3xl overflow-hidden mb-20 bg-gradient-to-r from-emerald-500/5 via-white to-white border border-slate-100 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.05)]">
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
              
              {/* Text Elements (Left Column) */}
              <div className="lg:col-span-7 space-y-6 text-left relative z-20">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-black text-emerald-600 uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Revolutionizing Modern Longevity
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold font-display tracking-tight text-slate-900 leading-tight">
                  A Legacy of Premium Care. <br />
                  <span className="text-gradient">A Future of Clinical AI.</span>
                </h1>
                <p className="text-sm md:text-base text-gray-400 leading-relaxed max-w-xl">
                  At Duraup, we bridge the gap between traditional clinical excellence and modern technical precision. We provide a decentralized, encrypted, and highly personalized digital health network designed to return sovereignty to your biological metrics.
                </p>
                <div className="pt-2 flex items-center gap-4 flex-wrap">
                  <div className="flex -space-x-3">
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-700">Dr.</div>
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-700">Al</div>
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-emerald-500 text-[10px] font-bold text-white flex items-center justify-center">Rx</div>
                  </div>
                  <span className="text-xs text-gray-400 font-semibold">Joined by 25,000+ longevity seekers globally.</span>
                </div>
              </div>

              {/* Dynamic Overlapping Visual Composition (Right Column) */}
              <div 
                className="lg:col-span-5 relative w-full h-[450px] mt-12 lg:mt-0 flex items-center justify-center select-none"
                onMouseEnter={() => triggerCursor("explore", true)}
                onMouseLeave={() => triggerCursor("default", false)}
              >
                {/* HUD Concentric Rings for High-Tech visual depth */}
                <div className="absolute w-[360px] h-[360px] rounded-full border border-dashed border-emerald-500/10 animate-[spin_80s_linear_infinite] pointer-events-none" />
                <div className="absolute w-[290px] h-[290px] rounded-full border border-emerald-500/5 border-t-emerald-500/25 border-b-emerald-500/25 animate-spin-reverse pointer-events-none" />

                {/* Layer 1: Background Colleague Card (Tall portrait offset right) */}
                <div 
                  className="absolute right-[5%] top-[10%] w-[45%] aspect-[0.68] rounded-3xl overflow-hidden shadow-[0_15px_35px_rgba(15,23,42,0.06)] border-4 border-white bg-white z-10 hover:z-25 transition-all duration-700 hover:scale-[1.03] group/colleague"
                  style={{
                    animation: "float 6.4s ease-in-out infinite",
                    animationDelay: "0.4s"
                  }}
                >
                  <img 
                    src="/clinical_office_colleagues.png" 
                    alt="Clinical Office Environment" 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover/colleague:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent pointer-events-none" />
                </div>

                {/* Layer 2: Main Team Meeting Card (Square offset left) */}
                <div 
                  className="absolute left-[5%] top-[5%] w-[68%] aspect-[1.1] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(15,23,42,0.1)] border-4 border-white bg-white z-20 hover:z-25 transition-all duration-700 hover:scale-[1.03] group/meeting"
                  style={{
                    animation: "float 5.2s ease-in-out infinite",
                    animationDelay: "0s"
                  }}
                >
                  <img 
                    src="/clinical_team_meeting.png" 
                    alt="Healthcare Startup Collaborative Discussion" 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover/meeting:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/25 to-transparent pointer-events-none" />

                  {/* Badge "VISION IN ACTION" top-left */}
                  <div className="absolute top-4 left-4 bg-emerald-600/90 text-white font-display text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full backdrop-blur-md shadow-md border border-slate-200 select-none">
                    Vision In Action
                  </div>

                  {/* Floating Golden play button bottom-right */}
                  <button 
                    className="absolute bottom-4 right-4 w-12.5 h-12.5 rounded-full bg-amber-500 hover:bg-amber-600 text-slate-800 flex items-center justify-center shadow-lg transition-transform duration-300 group-hover/meeting:scale-110 relative"
                    aria-label="Play Clinical Overview Video"
                  >
                    <div className="absolute inset-0 rounded-full bg-amber-500/20 border border-amber-500/30 animate-ping opacity-75 pointer-events-none" />
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current ml-0.5">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                </div>

                {/* Layer 3: Dark overlay capsule bottom */}
                <div 
                  className="absolute bottom-[8%] left-[8%] right-[8%] bg-slate-900/95 text-white p-5 rounded-2.5xl border border-slate-200 z-30 transition-all duration-500 backdrop-blur-md shadow-2xl hover:scale-[1.02] flex items-center gap-3.5 animate-float"
                  style={{
                    animationDelay: "0.8s"
                  }}
                >
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-400">
                    <Activity className="w-4 h-4 animate-pulse" />
                  </div>
                  <p className="text-[11px] font-semibold text-slate-200 leading-normal text-left">
                    Sovereign clinical systems that balance security, precision, and healthcare longevity.
                  </p>
                </div>

              </div>

            </div>
          </div>
        </ScrollReveal>

        {/* SECTION 1: Our Clinical Origin & AI Diagnostics */}
        <div className="my-24">
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Text Area (Left) */}
              <div className="lg:col-span-6 space-y-6 pr-4">
                <div className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-600 uppercase tracking-widest">
                  <Activity className="w-3.5 h-3.5 text-emerald-500" /> Origin story
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
                  Where Symptomatology Meets Autonomous AI.
                </h2>
                <div className="h-1 w-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" />
                <p className="text-sm text-gray-400 leading-relaxed">
                  Duraup was founded by a union of clinical endocrinologists, AI researchers, and software architects with a singular shared vision: to replace slow, friction-filled healthcare channels with immediate diagnostic intelligence.
                </p>
                <p className="text-sm text-gray-400 leading-relaxed">
                  We engineered our symptom assessments to process biological datasets against certified medical guidelines. This allows seekers to retrieve preliminary indicator reports in under 3 minutes—bypassing high-stress waiting loops.
                </p>

                {/* Sub features list */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="flex gap-2.5 items-start">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs">Self-Learning Diagnosis</h4>
                      <p className="text-[11px] text-gray-400 mt-0.5">Adapts dynamically to regional clinical datasets.</p>
                    </div>
                  </div>
                  <div className="flex gap-2.5 items-start">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs">Empathetic Bedside Logic</h4>
                      <p className="text-[11px] text-gray-400 mt-0.5">Designed to provide high-clarity wellness advice.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Side Image (Right) */}
              <div 
                className="lg:col-span-6 relative group"
                onMouseEnter={() => triggerCursor("explore", true)}
                onMouseLeave={() => triggerCursor("default", false)}
              >
                {/* Glowing backdrop shadow */}
                <div className="absolute inset-4 rounded-3xl bg-emerald-500/10 blur-2xl group-hover:bg-emerald-500/20 transition-all duration-700 pointer-events-none" />
                
                {/* Image panel wrapper */}
                <div className="relative overflow-hidden rounded-3xl border border-slate-100 shadow-xl bg-white p-3 group-hover:border-emerald-500/20 transition-all duration-700">
                  <div className="overflow-hidden rounded-2xl relative">
                    <img 
                      src="/clinical_lab_illustration.png" 
                      alt="Clinical Diagnostic Lab" 
                      className="w-full aspect-[4/3] object-cover rounded-2xl group-hover:scale-105 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] filter brightness-[0.97]"
                    />
                    {/* Dark gradient overlay overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent pointer-events-none" />
                  </div>

                  {/* Dynamic hovering capsule overlay */}
                  <div className="absolute bottom-6 right-6 glass-panel py-2.5 px-4 rounded-2xl flex items-center gap-2 border border-white/40 shadow-lg translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-[10px] font-black text-slate-900 tracking-wider uppercase">Active Diagnostic Network</span>
                  </div>
                </div>
              </div>

            </div>
          </ScrollReveal>
        </div>

        {/* SECTION 2: Sovereign Medical Vault */}
        <div className="my-24">
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Side Image (Left) */}
              <div 
                className="lg:col-span-6 order-last lg:order-first relative group"
                onMouseEnter={() => triggerCursor("secure", true)}
                onMouseLeave={() => triggerCursor("default", false)}
              >
                {/* Glowing backdrop shadow */}
                <div className="absolute inset-4 rounded-3xl bg-emerald-500/10 blur-2xl group-hover:bg-emerald-500/20 transition-all duration-700 pointer-events-none" />
                
                {/* Image panel wrapper */}
                <div className="relative overflow-hidden rounded-3xl border border-slate-100 shadow-xl bg-white p-3 group-hover:border-emerald-500/20 transition-all duration-700">
                  <div className="overflow-hidden rounded-2xl relative">
                    <img 
                      src="/medical_shield_security.png" 
                      alt="Encrypted Medical Vault Security" 
                      className="w-full aspect-[4/3] object-cover rounded-2xl group-hover:scale-105 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent pointer-events-none" />
                  </div>

                  {/* Floating security pill */}
                  <div className="absolute bottom-6 left-6 glass-panel py-2.5 px-4 rounded-2xl flex items-center gap-2 border border-white/40 shadow-lg translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
                    <Lock className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                    <span className="text-[10px] font-black text-slate-900 tracking-wider uppercase">AES-256 Data Vault</span>
                  </div>
                </div>
              </div>

              {/* Text Area (Right) */}
              <div className="lg:col-span-6 space-y-6 pl-4">
                <div className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-600 uppercase tracking-widest">
                  <Shield className="w-3.5 h-3.5 text-emerald-500" /> High Security
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
                  Absolute Sovereignty Over Your Health Credentials.
                </h2>
                <div className="h-1 w-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" />
                <p className="text-sm text-gray-400 leading-relaxed">
                  We believe that health records are deeply private, sovereign assets. At Duraup, your clinical symptom history, telemedicine consultation records, and therapeutic regimens are secured by decentralized multi-layered encryption protocols.
                </p>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Unlike traditional hospital registries that sell patient databases, we retain an absolute zero-knowledge metadata framework. No third-party network has access to your therapeutic indices without your explicit permission.
                </p>

                {/* Sub Features grid */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="glass-panel p-4 rounded-2xl border border-slate-100 hover:border-emerald-500/20 transition-all duration-300">
                    <Database className="w-5 h-5 text-emerald-600 mb-2" />
                    <h5 className="font-bold text-xs text-slate-900">Zero Leak Record</h5>
                    <p className="text-[10px] text-gray-400 mt-1 leading-normal">Encrypted decentralized metadata protocols.</p>
                  </div>
                  <div className="glass-panel p-4 rounded-2xl border border-slate-100 hover:border-emerald-500/20 transition-all duration-300">
                    <Lock className="w-5 h-5 text-emerald-600 mb-2" />
                    <h5 className="font-bold text-xs text-slate-900">Tokenized Identity</h5>
                    <p className="text-[10px] text-gray-400 mt-1 leading-normal">Masked credentials to safeguard home delivery route details.</p>
                  </div>
                </div>
              </div>

            </div>
          </ScrollReveal>
        </div>

        {/* SECTION 3: Certified Digital Pharmacy Marketplace */}
        <div className="my-24">
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Text Area (Left) */}
              <div className="lg:col-span-6 space-y-6 pr-4">
                <div className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-600 uppercase tracking-widest">
                  <Award className="w-3.5 h-3.5 text-emerald-500" /> Sourcing Certifications
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
                  WHO-GMP Certified, Rigorously Assayed Therapeutics.
                </h2>
                <div className="h-1 w-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" />
                <p className="text-sm text-gray-400 leading-relaxed">
                  Every ayurvedic remedy, medical-grade compound, or standard wellness solution dispatched through our digital pharmacy network undergoes deep molecular validation. We work strictly with certified manufacturers to prevent clinical counterfeiting.
                </p>
                <p className="text-sm text-gray-400 leading-relaxed">
                  From pure Himalayan Shilajit to proprietary premium adaptogens, each bath is verified by independent, NABL-accredited labs. This ensures the zero presence of heavy metals, binders, or undocumented excipients.
                </p>

                {/* Sub Features items */}
                <div className="space-y-3.5 pt-2">
                  <div className="flex gap-3 items-center">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 flex items-center justify-center shrink-0">
                      <CheckCircle className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs text-slate-900 font-bold">100% Genuine WHO-GMP Pharmaceutical Standards</span>
                  </div>
                  <div className="flex gap-3 items-center">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 flex items-center justify-center shrink-0">
                      <CheckCircle className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs text-slate-900 font-bold">Independent NABL Laboratory Assay Certificates Provided</span>
                  </div>
                  <div className="flex gap-3 items-center">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 flex items-center justify-center shrink-0">
                      <CheckCircle className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs text-slate-900 font-bold">Encrypted Cold-Chain Tracking & Temper-Evident Seals</span>
                  </div>
                </div>
              </div>

              {/* Side Image (Right) */}
              <div 
                className="lg:col-span-6 relative group"
                onMouseEnter={() => triggerCursor("certified", true)}
                onMouseLeave={() => triggerCursor("default", false)}
              >
                {/* Glowing backdrop shadow */}
                <div className="absolute inset-4 rounded-3xl bg-emerald-500/10 blur-2xl group-hover:bg-emerald-500/20 transition-all duration-700 pointer-events-none" />
                
                {/* Image panel wrapper */}
                <div className="relative overflow-hidden rounded-3xl border border-slate-100 shadow-xl bg-white p-3 group-hover:border-emerald-500/20 transition-all duration-700">
                  <div className="overflow-hidden rounded-2xl relative">
                    <img 
                      src="/clinical_seal_iso.png" 
                      alt="WHO GMP Sourcing Certifications" 
                      className="w-full aspect-[4/3] object-cover rounded-2xl group-hover:scale-105 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent pointer-events-none" />
                  </div>

                  {/* Certified badge overlay */}
                  <div className="absolute bottom-6 right-6 glass-panel py-2.5 px-4 rounded-2xl flex items-center gap-2 border border-white/40 shadow-lg translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
                    <Award className="w-3.5 h-3.5 text-amber-600 animate-spin-reverse" />
                    <span className="text-[10px] font-black text-slate-900 tracking-wider uppercase">NABL Lab Approved</span>
                  </div>
                </div>
              </div>

            </div>
          </ScrollReveal>
        </div>

        {/* SECTION 4: Global Network of Elite Specialists */}
        <div className="my-24">
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Side Image (Left) */}
              <div 
                className="lg:col-span-6 order-last lg:order-first relative group"
                onMouseEnter={() => triggerCursor("doctor", true)}
                onMouseLeave={() => triggerCursor("default", false)}
              >
                {/* Glowing backdrop shadow */}
                <div className="absolute inset-4 rounded-3xl bg-emerald-500/10 blur-2xl group-hover:bg-emerald-500/20 transition-all duration-700 pointer-events-none" />
                
                {/* Image panel wrapper */}
                <div className="relative overflow-hidden rounded-3xl border border-slate-100 shadow-xl bg-white p-3 group-hover:border-emerald-500/20 transition-all duration-700">
                  <div className="overflow-hidden rounded-2xl relative">
                    <img 
                      src="/clinical_doctor_portrait.png" 
                      alt="Consulting Elite Board Certified Doctors" 
                      className="w-full aspect-[4/3] object-cover rounded-2xl group-hover:scale-105 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent pointer-events-none" />
                  </div>

                  {/* Dynamic availability tag */}
                  <div className="absolute bottom-6 left-6 glass-panel py-2.5 px-4 rounded-2xl flex items-center gap-2 border border-white/40 shadow-lg translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-black text-slate-900 tracking-wider uppercase">Doctors Online Now</span>
                  </div>
                </div>
              </div>

              {/* Text Area (Right) */}
              <div className="lg:col-span-6 space-y-6 pl-4">
                <div className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-600 uppercase tracking-widest">
                  <Heart className="w-3.5 h-3.5 text-emerald-500" /> Medical Specialists
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
                  Direct Integration With Elite Longevity Consultants.
                </h2>
                <div className="h-1 w-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" />
                <p className="text-sm text-gray-400 leading-relaxed">
                  Duraup is not just a digital retail checkout. We maintain direct, secure API connections to hundreds of board-certified clinical specialists, metabolic advisors, and holistic wellness experts across key medical hubs.
                </p>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Upon completing your dynamic symptom diagnosis, you can immediately initiate a private consult loop. Doctors will review your biological values to construct customized wellness protocols tailored strictly to your genetic limits.
                </p>

                {/* Sub Features items */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="glass-panel p-4 rounded-2xl border border-slate-100 flex gap-3 items-center">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 flex items-center justify-center shrink-0">
                      <Stethoscope className="w-4 h-4" />
                    </div>
                    <div>
                      <h6 className="font-bold text-xs text-slate-900">Elite Experts</h6>
                      <p className="text-[9px] text-gray-400">Board-certified endocrinologists & practitioners.</p>
                    </div>
                  </div>
                  <div className="glass-panel p-4 rounded-2xl border border-slate-100 flex gap-3 items-center">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 flex items-center justify-center shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <h6 className="font-bold text-xs text-slate-900">Zero Wait Consults</h6>
                      <p className="text-[9px] text-gray-400">Secure message streams and live voice appointments.</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </ScrollReveal>
        </div>

        {/* SECTION 5: High-Performance Stats Counter Grid */}
        <div className="my-28">
          <ScrollReveal>
            <div className="relative glass-panel p-10 md:p-14 rounded-3xl border border-slate-100 bg-gradient-to-tr from-emerald-500/[0.03] to-white/70 overflow-hidden shadow-2xl">
              
              {/* Background accent circular elements */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/5 rounded-full blur-2xl" />
              <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-amber-500/5 rounded-full blur-2xl" />

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y-2 md:divide-y-0 md:divide-x-2 divide-slate-100/60">
                
                {/* Stat 1 */}
                <div className="pt-6 md:pt-0">
                  <div className="text-4xl md:text-5xl font-black text-slate-900 font-display tracking-tight flex items-center justify-center gap-0.5">
                    <span>{encryptionValue.toFixed(1)}</span>
                    <span className="text-emerald-500">%</span>
                  </div>
                  <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mt-2">Data Vault Encryption</p>
                  <p className="text-[9px] text-gray-400 mt-1 leading-normal max-w-[150px] mx-auto">Absolute private patient sovereignty</p>
                </div>

                {/* Stat 2 */}
                <div className="pt-6 md:pt-0">
                  <div className="text-4xl md:text-5xl font-black text-emerald-600 font-display tracking-tight flex items-center justify-center gap-0.5">
                    <span>{specialistsValue}</span>
                    <span className="text-emerald-500">+</span>
                  </div>
                  <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mt-2">Board Specialists</p>
                  <p className="text-[9px] text-gray-400 mt-1 leading-normal max-w-[150px] mx-auto">Top-tier verified expert panel</p>
                </div>

                {/* Stat 3 */}
                <div className="pt-6 md:pt-0">
                  <div className="text-4xl md:text-5xl font-black text-slate-900 font-display tracking-tight flex items-center justify-center gap-1">
                    <span>WHO</span>
                  </div>
                  <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mt-2">GMP Certified</p>
                  <p className="text-[9px] text-gray-400 mt-1 leading-normal max-w-[150px] mx-auto">Authentic therapeutic sourcing</p>
                </div>

                {/* Stat 4 */}
                <div className="pt-6 md:pt-0">
                  <div className="text-4xl md:text-5xl font-black text-emerald-600 font-display tracking-tight flex items-center justify-center gap-0.5">
                    <span>3</span>
                    <span className="text-slate-900">Min</span>
                  </div>
                  <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mt-2">Symptom Assessment</p>
                  <p className="text-[9px] text-gray-400 mt-1 leading-normal max-w-[150px] mx-auto">Immediate diagnostic protocols</p>
                </div>

              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* SECTION 6: High-Fidelity Call-To-Action (CTAs) */}
        <ScrollReveal>
          <div className="relative glass-panel p-8 md:p-16 rounded-3xl border border-slate-100 overflow-hidden text-center space-y-8 bg-gradient-to-tr from-emerald-500/10 via-white to-amber-500/[0.03] shadow-[0_30px_60px_-15px_rgba(16,185,129,0.08)]">
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-2xl mx-auto space-y-4 relative">
              <h3 className="text-2xl md:text-4xl font-extrabold font-display text-slate-900 tracking-tight leading-tight">
                Ready to Optimize Your Biological Longevity Loop?
              </h3>
              <p className="text-xs md:text-sm text-gray-400 max-w-lg mx-auto leading-relaxed">
                Run our authenticated, AI-driven assessment to generate initial indicator reports, or establish a direct communication link with a licensed expert.
              </p>
            </div>

            <div className="flex justify-center gap-4 flex-wrap pt-2 relative">
              <Link
                href="/assessment"
                className="px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-black uppercase tracking-wider transition-all duration-300 shadow-lg shadow-emerald-500/15 hover:shadow-emerald-500/30 hover:-translate-y-0.5 flex items-center gap-2 group"
                onMouseEnter={() => triggerCursor("click", true)}
                onMouseLeave={() => triggerCursor("default", false)}
              >
                Start AI Assessment <Sparkles className="w-3.5 h-3.5 text-slate-800 group-hover:animate-pulse" />
              </Link>
              
              <Link
                href="/doctors"
                className="px-8 py-4 rounded-full bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-black uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2 shadow-sm"
                onMouseEnter={() => triggerCursor("click", true)}
                onMouseLeave={() => triggerCursor("default", false)}
              >
                Book Consultation <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              </Link>
            </div>
          </div>
        </ScrollReveal>

      </main>

    </div>
  );
}
