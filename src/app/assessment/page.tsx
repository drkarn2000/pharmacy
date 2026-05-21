"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import {
  Activity,
  Cpu,
  Lock,
  ArrowLeft,
  ArrowRight,
  Check,
  Award,
  Shield,
  Info,
  Clock,
  Sparkles
} from "lucide-react";

// Types
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
    },
    {
      question: "How is your daily hydration and dietary intake?",
      options: ["High quality structured diets", "Occasional junk food and low water intake", "Irregular meals, heavy caffeine dependency", "Highly active sports nutrition plan"]
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
    },
    {
      question: "Rate your daily physical activity levels:",
      options: ["Sedentary desk job, zero exercise", "Light walking, 1-2 times a week", "Active workout routine, 3-4 times a week", "Heavy weightlifting or athletic training"]
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
    },
    {
      question: "Rate your daily sun exposure levels:",
      options: ["Minimal (indoor desk job)", "Moderate (daily commute & outdoor walks)", "High (active field work or sports)", "Always wear SPF protectors"]
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
    },
    {
      question: "Do you maintain a daily blood parameter log sheet?",
      options: ["Yes, log metrics using smart sensors", "Occasionally log manually", "Rarely check blood levels", "Looking to initiate tracking now"]
    }
  ]
};

export default function AssessmentPage() {
  const [activeConcern, setActiveConcern] = useState<ConcernTrack>("wellness");
  const [wizardStep, setWizardStep] = useState(0); // 0: Select Concern, 1,2,3: Questions, 4: Processing, 5: Results
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [wizardAnswers, setWizardAnswers] = useState<string[]>([]);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  // Run progress timer on analysis screen
  useEffect(() => {
    if (wizardStep === 4) {
      setAnalysisProgress(0);
      const timer = setInterval(() => {
        setAnalysisProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            setTimeout(() => {
              setWizardStep(5);
            }, 600);
            return 100;
          }
          return prev + 5;
        });
      }, 100);
      return () => clearInterval(timer);
    }
  }, [wizardStep]);

  const startAssessment = (track: ConcernTrack) => {
    setActiveConcern(track);
    setWizardStep(1);
    setSelectedAnswer(null);
    setWizardAnswers([]);
  };

  const handleSelectOption = (option: string) => {
    setSelectedAnswer(option);
  };

  const handleNextStep = () => {
    if (!selectedAnswer) return;
    const updatedAnswers = [...wizardAnswers, selectedAnswer];
    setWizardAnswers(updatedAnswers);
    setSelectedAnswer(null);

    const maxQuestions = ASSESSMENT_QUESTIONS[activeConcern].length;
    if (wizardStep < maxQuestions) {
      setWizardStep((prev) => prev + 1);
    } else {
      setWizardStep(4); // Run clinical analyzer
    }
  };

  const handleReset = () => {
    setWizardStep(0);
    setSelectedAnswer(null);
    setWizardAnswers([]);
  };

  return (
    <div className="relative min-h-screen bg-obsidian-bg text-slate-800 overflow-hidden font-sans pb-24">
      
      {/* Background radial glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none animate-aurora-1" />
      <div className="absolute bottom-[10%] right-[-15%] w-[45vw] h-[45vw] rounded-full bg-blue-500/4 blur-[140px] pointer-events-none animate-aurora-2" />

      {/* STICKY GLASSMORPHIC HEADER */}
      <Header />

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 pt-12 text-left">
        
        {/* Back Link */}
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-emerald-600 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
          </Link>
        </div>

        {/* Wizard Panel Container */}
        <div className="relative">
          {/* Ambient Backdrop shadow */}
          <div className="absolute inset-[-10px] rounded-3xl bg-gradient-to-r from-emerald-500/5 to-blue-500/5 blur-xl pointer-events-none" />

          <div className="relative glass-panel rounded-3xl overflow-hidden border border-slate-200 shadow-2xl z-10">
            
            {/* Simulator Header */}
            <div className="px-6 py-4 bg-slate-50/50 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                  <Cpu className="w-2.5 h-2.5 text-emerald-400" />
                </span>
                <span className="text-xs font-semibold text-gray-400 tracking-wide">
                  Duraup Clinical-Grade AI Diagnostic
                </span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                Secure HIPAA Vault Encrypted
              </div>
            </div>

            {/* Simulator body */}
            <div className="p-8 md:p-12 min-h-[420px] flex flex-col justify-between text-left">
              
              {/* STATE 0: Track Selection */}
              {wizardStep === 0 && (
                <div className="space-y-8 my-auto animate-in fade-in duration-300 w-full">
                  <div className="text-center space-y-3">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-400 uppercase tracking-widest mx-auto">
                      <Sparkles className="w-3 h-3 text-emerald-400 animate-pulse" /> Self Diagnostic Tool
                    </div>
                    <h1 className="text-3xl font-extrabold font-display text-slate-800">Generate Your Personalized Longevity Protocol</h1>
                    <p className="text-xs text-gray-400 max-w-lg mx-auto leading-relaxed">
                      Select your targeted clinical area below. Our neural networks will evaluate symptom parameters and prepare evidence-based wellness directives in under 3 minutes.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                    {[
                      { id: "wellness" as ConcernTrack, label: "General Wellness", sub: "Optimizing everyday energy, immunity and preventives." },
                      { id: "mens-health" as ConcernTrack, label: "Men's Health & Stamina", sub: "Targeting stamina, stress recoverability & Ayurvedic science." },
                      { id: "skin-hair" as ConcernTrack, label: "Skin & Hair Efficacy", sub: "Combating accelerated hair fall, thinning and skin balance." },
                      { id: "chronic" as ConcernTrack, label: "Chronic Parameter Checks", sub: "Managing long-term blood parameters, pressure logs & metabolics." }
                    ].map((track) => (
                      <button
                        key={track.id}
                        onClick={() => startAssessment(track.id)}
                        className="glass-panel p-5 rounded-2xl text-left border border-slate-200 hover:border-emerald-500/30 hover:bg-slate-50 transition-all group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-slate-800 group-hover:text-emerald-300 transition-colors">
                            {track.label}
                          </span>
                          <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                        </div>
                        <p className="text-[11px] text-gray-400 mt-1.5 leading-normal">{track.sub}</p>
                      </button>
                    ))}
                  </div>

                  <div className="max-w-md mx-auto pt-4 border-t border-slate-200 flex items-center justify-center gap-6 text-[10px] text-gray-500">
                    <span className="flex items-center gap-1"><Lock className="w-3.5 h-3.5 text-gray-600" /> 256-bit AES</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5 text-gray-600" /> HIPAA Safeguard compliant</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Award className="w-3.5 h-3.5 text-gray-600" /> 100% HIPAA Private</span>
                  </div>
                </div>
              )}

              {/* STATE 1, 2, 3: The Assessment Questions */}
              {(wizardStep >= 1 && wizardStep <= 3) && (
                <div className="space-y-6 w-full animate-in fade-in duration-300">
                  
                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                    <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                      Selected Track: {activeConcern.replace("-", " ")}
                    </span>
                    <span className="text-xs text-gray-400 font-semibold">
                      Question {wizardStep} of {ASSESSMENT_QUESTIONS[activeConcern].length}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-50 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-emerald-500 h-full transition-all duration-500" 
                      style={{ width: `${(wizardStep / ASSESSMENT_QUESTIONS[activeConcern].length) * 100}%` }}
                    />
                  </div>

                  {/* Question Prompt */}
                  <div className="space-y-4 pt-2">
                    <h2 className="text-xl md:text-2xl font-extrabold text-slate-800 leading-relaxed">
                      {ASSESSMENT_QUESTIONS[activeConcern][wizardStep - 1].question}
                    </h2>

                    <div className="space-y-3">
                      {ASSESSMENT_QUESTIONS[activeConcern][wizardStep - 1].options.map((option, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSelectOption(option)}
                          className={`w-full p-4 rounded-2xl text-left text-sm border transition-all ${
                            selectedAnswer === option
                              ? "bg-emerald-500/10 border-emerald-500 text-white font-semibold shadow-inner"
                              : "bg-slate-50/50 border-slate-200 text-gray-300 hover:border-white/25 hover:bg-slate-50"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                              selectedAnswer === option ? "border-emerald-400 bg-emerald-500" : "border-gray-600"
                            }`}>
                              {selectedAnswer === option && <Check className="w-2.5 h-2.5 text-slate-800" />}
                            </span>
                            {option}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step Buttons */}
                  <div className="flex justify-between items-center pt-6 border-t border-slate-200">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="text-xs font-bold text-gray-500 hover:text-emerald-600 uppercase tracking-wider transition-colors"
                    >
                      Reset Assessment
                    </button>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      disabled={!selectedAnswer}
                      className={`px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                        selectedAnswer
                          ? "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:brightness-110 text-white shadow-lg"
                          : "bg-slate-50 text-gray-500 border border-slate-200 cursor-not-allowed"
                      }`}
                    >
                      Next Step <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              )}

              {/* STATE 4: Running Diagnostics Spinner */}
              {wizardStep === 4 && (
                <div className="my-auto space-y-6 w-full text-center animate-in fade-in duration-300">
                  <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-4 border-slate-200" />
                    <div className="absolute inset-0 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin" />
                    <Cpu className="w-10 h-10 text-emerald-400" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-slate-800">Running Neural Diagnostics...</h3>
                    <p className="text-xs text-gray-400 max-w-sm mx-auto">Evaluating primary health parameters against certified clinical logic models.</p>
                  </div>

                  <div className="max-w-xs mx-auto space-y-1.5 pt-2">
                    <div className="flex justify-between text-[10px] text-gray-400 font-bold uppercase">
                      <span>Synthesizing Bio-Markers</span>
                      <span>{analysisProgress}%</span>
                    </div>
                    <div className="w-full bg-slate-50 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-emerald-400 h-full transition-all duration-100" 
                        style={{ width: `${analysisProgress}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STATE 5: Diagnostic Report */}
              {wizardStep === 5 && (
                <div className="space-y-6 w-full text-left animate-in zoom-in-95 duration-500">
                  
                  {/* Header info */}
                  <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                        <Award className="w-3.5 h-3.5 text-emerald-400" />
                      </div>
                      <span className="text-xs font-bold text-slate-800 tracking-wide uppercase">AI Protocol report</span>
                    </div>
                    <span className="text-[10px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded uppercase">
                      Analysis Authenticated
                    </span>
                  </div>

                  {/* Summary card */}
                  <div className="glass-panel p-6 rounded-2xl border border-emerald-500/20 bg-emerald-950/5 space-y-4">
                    <h4 className="text-base font-extrabold text-slate-800 font-display">Diagnostic Clinical Recommendation:</h4>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      Symptom checkers indicate a clear requirement for targeted molecular and vital stamina support. Based on your selections regarding <strong className="text-slate-800">{activeConcern.replace("-", " ")}</strong>:
                    </p>
                    
                    <ul className="space-y-2 text-xs text-gray-400 pl-2">
                      <li className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>Symptom 1 Priority: "{wizardAnswers[0]}"</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>Symptom 2 Severity: "{wizardAnswers[1]}"</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>Symptom 3 Baseline: "{wizardAnswers[2]}"</span>
                      </li>
                    </ul>

                    {activeConcern === "mens-health" ? (
                      <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-300 leading-relaxed flex items-start gap-3">
                        <Sparkles className="w-5 h-5 shrink-0 text-amber-400" />
                        <div>
                          <strong className="text-slate-800 font-semibold">Recommended Remedy: Duraup Capsules (Himalayan Shilajit & KSM-66 Blend)</strong>
                          <p className="text-[10px] text-amber-400 mt-1 leading-normal">
                            Direct clinical correlation: Taking 2 vitality capsules daily supports free testosterone recovery, stress reduction by 27.9%, and mitochondrial ATP generation.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-300 leading-relaxed flex items-start gap-3">
                        <Activity className="w-5 h-5 shrink-0 text-emerald-400" />
                        <div>
                          <strong className="text-slate-800 font-semibold">Recommended Remedy: Free General Medicine Tele-Consultation Slot</strong>
                          <p className="text-[10px] text-emerald-400 mt-1 leading-normal">
                            We suggest routing your responses to our board-certified general practitioners. A free 15-minute consult is allocated to your profile to verify secondary indicators.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <Link
                      href={activeConcern === "mens-health" ? "/shop" : "/doctors"}
                      className="flex-1 text-center py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:brightness-110 text-white text-xs font-bold uppercase tracking-wider shadow-lg transition-all"
                    >
                      {activeConcern === "mens-health" ? "Acquire Longevity Formula" : "Schedule Free Consult"}
                    </Link>
                    <button
                      onClick={handleReset}
                      className="px-6 py-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:bg-white/8 hover:border-slate-300 text-xs font-bold text-gray-300 uppercase tracking-wider transition-all"
                    >
                      Initiate New Assessment
                    </button>
                  </div>

                </div>
              )}

            </div>
          </div>
        </div>

      </main>

    </div>
  );
}
