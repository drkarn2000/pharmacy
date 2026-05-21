"use client";

import React, { useState } from "react";
import Header from "../../components/Header";
import {
  ArrowRight,
  CheckCircle2,
  Home,
  Lock,
  Phone,
  Shield,
  Stethoscope,
  Truck,
  UserRound
} from "lucide-react";

export default function AuthPage() {
  const [role, setRole] = useState<"patient" | "doctor">("patient");
  const [phone, setPhone] = useState("");

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      <Header />

      <main className="grid min-h-[calc(100vh-5rem)] grid-cols-1 lg:grid-cols-2">
        <section className="relative min-h-[560px] overflow-hidden bg-slate-950 text-white flex items-center">
          <img
            src="/clinical_office_colleagues.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-950/55 to-emerald-950/70" />

          <div className="absolute left-8 top-8 flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-bold backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Live digital care preview
          </div>

          <div className="relative z-10 max-w-xl px-8 md:px-12 space-y-8">
            <div className="space-y-5">
              <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight">
                Your Complete Digital Healthcare Companion.
              </h1>
              <p className="text-base md:text-lg text-slate-100 leading-8">
                Book doctor consultations, shop clinical medicines, and manage your entire care journey with enterprise-grade security.
              </p>
            </div>

            <div className="relative aspect-video max-w-lg rounded-3xl border border-white/15 bg-white/10 shadow-2xl overflow-hidden backdrop-blur">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/15 via-white/5 to-slate-950/20" />
              <div className="absolute inset-x-6 top-6 h-2 rounded-full bg-white/15 overflow-hidden">
                <div className="h-full w-2/3 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div className="absolute left-6 right-6 top-14 grid grid-cols-3 gap-3">
                {[Shield, Lock, Truck].map((Icon, idx) => (
                  <div key={idx} className="rounded-2xl bg-white/10 border border-white/10 p-4 text-center">
                    <Icon className="w-6 h-6 mx-auto text-emerald-300" />
                    <div className="mt-3 h-2 rounded bg-white/20" />
                    <div className="mt-2 h-2 w-2/3 mx-auto rounded bg-white/10" />
                  </div>
                ))}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white text-emerald-700 flex items-center justify-center shadow-xl shadow-emerald-500/20 animate-pulse">
                  <ArrowRight className="w-7 h-7" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 max-w-md">
              {[
                { icon: Shield, label: "Verified" },
                { icon: Lock, label: "Secure" },
                { icon: Truck, label: "Fast" }
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <item.icon className="w-6 h-6 mx-auto text-white" />
                  <div className="mt-2 text-xs font-black uppercase tracking-[0.2em]">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center px-6 py-14">
          <div className="w-full max-w-xl">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.35em] text-slate-400">
                <Home className="w-3.5 h-3.5" /> Home <span className="text-slate-300">›</span> <span className="text-emerald-600">Authentication</span>
              </div>
              <h2 className="mt-7 text-4xl md:text-5xl font-black tracking-tight text-slate-950">Welcome to Duraup</h2>
              <p className="mt-4 text-sm md:text-base text-slate-500">
                Enter your phone number to receive a secure access code.
              </p>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="mt-10 rounded-[2rem] border border-slate-100 bg-white p-6 md:p-8 shadow-2xl shadow-slate-200/70">
              <div className="grid grid-cols-2 rounded-2xl border border-slate-200 bg-slate-50 p-1">
                {[
                  { id: "patient", label: "Patient", icon: UserRound },
                  { id: "doctor", label: "Doctor", icon: Stethoscope }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setRole(item.id as "patient" | "doctor")}
                    className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-black transition-all ${
                      role === item.id ? "bg-white text-emerald-700 shadow-sm" : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    <item.icon className="w-4 h-4" /> {item.label}
                  </button>
                ))}
              </div>

              <div className="mt-8 space-y-2">
                <label className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-slate-500">Phone Number</label>
                <div className="flex rounded-2xl border border-slate-200 bg-white overflow-hidden focus-within:border-emerald-500">
                  <div className="flex items-center gap-2 px-5 border-r border-slate-100 text-slate-700 font-black">
                    <Phone className="w-4 h-4 text-emerald-600" /> +91
                  </div>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 98765 43210"
                    className="min-w-0 flex-1 px-5 py-4 text-sm text-slate-900 outline-none"
                  />
                </div>
              </div>

              <button className="mt-8 w-full rounded-2xl bg-emerald-600 px-6 py-4 text-sm font-black text-white shadow-xl shadow-emerald-500/20 hover:bg-emerald-700 transition-all">
                Send Access Code
              </button>

              <button type="button" className="mt-7 w-full text-center text-xs font-black uppercase tracking-[0.25em] text-emerald-700 hover:text-emerald-900">
                Sign In With Password Instead
              </button>

              <div className="mt-10 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.2em] text-slate-400 text-center leading-5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                By proceeding, you agree to Duraup&apos;s Terms of Service & Privacy Policy
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
