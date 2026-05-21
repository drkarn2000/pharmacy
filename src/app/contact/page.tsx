"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import {
  Mail,
  Phone,
  MapPin,
  ArrowLeft,
  Check,
  Shield,
  Info,
  Clock,
  Send,
  MessageSquare
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "general",
    message: ""
  });
  
  const [ticketSuccess, setTicketSuccess] = useState<boolean>(false);
  const [ticketNumber, setTicketNumber] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    // Generate mock support ticket number
    const randomTicket = "TKT-" + Math.floor(100000 + Math.random() * 900000);
    setTicketNumber(randomTicket);
    setTicketSuccess(true);
  };

  const handleResetForm = () => {
    setFormData({ name: "", email: "", subject: "general", message: "" });
    setTicketSuccess(false);
  };

  return (
    <div className="relative min-h-screen bg-obsidian-bg text-slate-800 overflow-hidden font-sans pb-24 text-left">
      
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-15%] w-[45vw] h-[45vw] rounded-full bg-blue-500/4 blur-[140px] pointer-events-none" />

      {/* Sticky Header */}
      <Header />

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-4 pt-12">
        
        {/* Back Link */}
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-emerald-600 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
          </Link>
        </div>

        {/* Headline Banner */}
        <div className="glass-panel p-8 md:p-12 rounded-3xl border border-slate-200 bg-gradient-to-r from-emerald-950/20 via-obsidian-card to-obsidian-bg relative overflow-hidden mb-12 shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-2xl space-y-4 relative">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-400">
              <MessageSquare className="w-3.5 h-3.5 animate-pulse" /> Private Directory
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold font-display text-gradient">
              Global Support.
            </h1>
            <p className="text-sm text-gray-400 leading-relaxed">
              Reach out for dedicated support, specialized partnerships, clinical feedback, or anything else requiring our attention.
            </p>
          </div>
        </div>

        {/* Contact Form & Coordinates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: FORM BOX */}
          <div className="md:col-span-7">
            <div className="glass-panel p-8 rounded-3xl border border-slate-200 relative shadow-2xl">
              
              {!ticketSuccess ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Patient Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl text-xs text-slate-800 glass-input"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Digital Contact</label>
                      <input
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl text-xs text-slate-800 glass-input"
                      />
                    </div>
                  </div>

                  {/* Subject Dropdown */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Inquiry Subject</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="What does this pertain to?"
                      className="w-full px-4 py-3 rounded-xl text-xs text-slate-800 glass-input bg-obsidian-card border border-slate-200"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Message Context</label>
                    <textarea
                      required
                      placeholder="Provide details to expedite our response..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-xs text-slate-800 glass-input"
                    />
                  </div>

                  {/* Secure warning banner */}
                  <div className="p-3 bg-slate-50/50 border border-slate-200 rounded-xl text-[10px] text-gray-400 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Communication channel uses end-to-end encryption complying with medical standards.</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:brightness-110 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
                  >
                    <Send className="w-4 h-4" /> Dispatch Message
                  </button>

                </form>
              ) : (
                <div className="text-center space-y-6 py-6 animate-in zoom-in-95 duration-500">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
                    <Check className="w-8 h-8" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-800 font-display">Support Ticket Logged!</h3>
                    <p className="text-xs text-gray-400 max-w-sm mx-auto">
                      Thank you for contacting Duraup. Our clinical response specialists have received your encrypted inquiry and will resolve it shortly.
                    </p>
                  </div>

                  <div className="max-w-md mx-auto glass-panel p-5 rounded-2xl border border-slate-200 space-y-2 text-left text-xs bg-slate-50/50">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Sender Name:</span>
                      <strong className="text-slate-800">{formData.name}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Recipient Desk:</span>
                      <strong className="text-emerald-400 capitalize">{formData.subject} Department</strong>
                    </div>
                    <div className="flex justify-between border-t border-slate-200 pt-2 mt-2">
                      <span className="text-gray-400 font-semibold">Active Support Ticket ID:</span>
                      <strong className="text-slate-800 font-mono">{ticketNumber}</strong>
                    </div>
                  </div>

                  <button
                    onClick={handleResetForm}
                    className="px-6 py-3 rounded-xl bg-emerald-500 hover:brightness-110 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md"
                  >
                    Create New Ticket
                  </button>
                </div>
              )}

            </div>
          </div>

          {/* RIGHT: DETAILS COORDINATES */}
          <div className="md:col-span-5 space-y-6">
            
            {/* Support details */}
            <div className="glass-panel p-6 rounded-2xl border border-slate-200 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">Secure Email</h3>
              
              <div className="space-y-3.5 text-xs text-gray-400">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>concierge@duraup.com</span>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <a href="tel:+910000000000" className="hover:text-emerald-600 transition-colors">+91 00000 00000</a>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>24/7 Premium Support</span>
                </div>
              </div>
            </div>

            {/* Response speed metrics */}
            <div className="glass-panel p-6 rounded-2xl border border-slate-200 space-y-3.5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Clock className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-slate-800">Standard Service Metrics</h4>
              </div>

              <ul className="space-y-2 text-[11px] text-gray-400">
                <li className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span>General Support desk:</span>
                  <strong className="text-slate-800">Under 2 hours</strong>
                </li>
                <li className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span>Prescription queries:</span>
                  <strong className="text-emerald-400">Under 30 mins</strong>
                </li>
                <li className="flex justify-between">
                  <span>Bulk dealership desks:</span>
                  <strong className="text-slate-800">Under 24 hours</strong>
                </li>
              </ul>
            </div>

            {/* Quality Seals */}
            <div className="p-4 bg-emerald-950/5 border border-emerald-500/15 rounded-2xl text-[10px] text-emerald-400 leading-normal flex items-start gap-2.5">
              <Info className="w-4 h-4 shrink-0 mt-0.5 text-emerald-300" />
              <span>For emergency cardiovascular or toxicological symptoms, please directly contact your nearest local clinic or hospital numbers. Telehealth is primarily for preventive checks and routine follow-up reviews.</span>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
}
