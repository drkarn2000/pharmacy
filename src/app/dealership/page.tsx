"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import {
  ArrowLeft,
  Briefcase,
  Building2,
  Check,
  ChevronDown,
  Mail,
  MapPin,
  Phone,
  Send
} from "lucide-react";

export default function DealershipPage() {
  const [formData, setFormData] = useState({
    directorName: "",
    corporateEmail: "",
    directPhone: "",
    operatingCity: "",
    entityType: "",
    operationalProfile: ""
  });
  const [applySuccess, setApplySuccess] = useState(false);
  const [applyRefNumber, setApplyRefNumber] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.directorName || !formData.corporateEmail || !formData.directPhone) return;

    setApplyRefNumber("B2B-REF-" + Math.floor(100000 + Math.random() * 900000));
    setApplySuccess(true);
  };

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-800 overflow-hidden font-sans pb-24 text-left">
      <div className="absolute top-[-12%] left-[-10%] w-[48vw] h-[48vw] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[8%] right-[-15%] w-[42vw] h-[42vw] rounded-full bg-amber-500/5 blur-[140px] pointer-events-none" />

      <Header />

      <main className="relative max-w-5xl mx-auto px-4 pt-12">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-emerald-600 transition-colors mb-8">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
        </Link>

        <section className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.35em] text-emerald-600 mb-5">
            <Briefcase className="w-3.5 h-3.5" /> Partner Network
          </div>
          <h1 className="text-4xl md:text-6xl font-black font-display text-slate-950 tracking-tight leading-tight">
            Become an<br className="hidden sm:block" /> Official Partner.
          </h1>
          <p className="mt-6 text-base md:text-lg text-slate-500 leading-8">
            Apply to become an official Duraup pharmacy dealership and scale your healthcare operations on our premium technological infrastructure.
          </p>
        </section>

        <section className="max-w-4xl mx-auto rounded-[2rem] border border-slate-100 bg-white p-6 md:p-10 shadow-2xl shadow-slate-200/70">
          {!applySuccess ? (
            <form onSubmit={handleSubmit} className="space-y-7">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.35em] text-emerald-600">
                  <Building2 className="w-4 h-4" /> Enterprise Application
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-slate-400">Director Name</label>
                  <input
                    required
                    value={formData.directorName}
                    onChange={(e) => setFormData({ ...formData, directorName: e.target.value })}
                    placeholder="Enter full name"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-slate-400">Corporate Email</label>
                  <input
                    type="email"
                    required
                    value={formData.corporateEmail}
                    onChange={(e) => setFormData({ ...formData, corporateEmail: e.target.value })}
                    placeholder="you@company.com"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-slate-400">Direct Phone</label>
                  <input
                    required
                    value={formData.directPhone}
                    onChange={(e) => setFormData({ ...formData, directPhone: e.target.value })}
                    placeholder="Contact line"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-slate-400">Operating City</label>
                  <input
                    value={formData.operatingCity}
                    onChange={(e) => setFormData({ ...formData, operatingCity: e.target.value })}
                    placeholder="Corporate location"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-slate-400">Entity Type</label>
                <div className="relative">
                  <select
                    value={formData.entityType}
                    onChange={(e) => setFormData({ ...formData, entityType: e.target.value })}
                    className="w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:bg-white"
                  >
                    <option value="">Select corporate structure</option>
                    <option value="pharmacy">Retail Pharmacy</option>
                    <option value="distributor">Regional Distributor</option>
                    <option value="clinic">Clinic / Healthcare Group</option>
                    <option value="enterprise">Enterprise Wellness Partner</option>
                  </select>
                  <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-slate-400">Operational Profile</label>
                <textarea
                  rows={5}
                  value={formData.operationalProfile}
                  onChange={(e) => setFormData({ ...formData, operationalProfile: e.target.value })}
                  placeholder="Summarize your current scale, revenue, and expansion goals..."
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:bg-white resize-none"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-8 py-4 text-xs font-black uppercase tracking-[0.25em] text-white shadow-xl shadow-emerald-500/20 hover:bg-emerald-700 transition-all"
              >
                Submit Request <Send className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <div className="text-center py-10 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-600">
                <Check className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-950">Application Submitted</h2>
                <p className="mt-2 text-sm text-slate-500">Your enterprise application has been received by the Duraup partner network.</p>
              </div>
              <div className="max-w-md mx-auto rounded-2xl bg-slate-50 border border-slate-200 p-5 text-sm text-left">
                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">Director</span>
                  <strong>{formData.directorName}</strong>
                </div>
                <div className="flex justify-between gap-4 mt-2">
                  <span className="text-slate-500">Reference</span>
                  <strong className="font-mono text-emerald-700">{applyRefNumber}</strong>
                </div>
              </div>
            </div>
          )}
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
          {[
            { icon: Mail, title: "Corporate Email", value: "hello@duraup.com" },
            { icon: Phone, title: "Direct Line", value: "+91 00000 00000" },
            { icon: MapPin, title: "Operating Desk", value: "Duraup HQ, CP 1001" }
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-700">
                <item.icon className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{item.value}</p>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
