"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import {
  Activity,
  Search,
  Star,
  Shield,
  Calendar,
  Clock,
  ArrowLeft,
  X,
  Check,
  Award,
  Video,
  ChevronDown,
  Info,
  DollarSign,
  Heart
} from "lucide-react";

// Doctor Interface
interface Doctor {
  id: string;
  name: string;
  specialty: string;
  department: string;
  credentials: string;
  experience: number;
  rating: number;
  reviews: number;
  satisfaction: number;
  fee: number;
  nextAvailable: string;
}

// Doctors Data
const DOCTORS_DATA: Doctor[] = [
  {
    id: "dr-vikram-malhotra",
    name: "Dr. Vikram Malhotra",
    specialty: "Men's Health, Longevity & Ayurveda",
    department: "mens-health",
    credentials: "MD - Ayurvedic Medicine (BHU), Fellow in Endocrinology",
    experience: 16,
    rating: 4.95,
    reviews: 218,
    satisfaction: 99,
    fee: 899,
    nextAvailable: "Today, 4:30 PM"
  },
  {
    id: "dr-rohan-sharma",
    name: "Dr. Rohan Sharma",
    specialty: "Consultant Cardiologist",
    department: "cardiology",
    credentials: "MD (AIIMS), DM - Cardiology, FACC (USA)",
    experience: 14,
    rating: 4.92,
    reviews: 184,
    satisfaction: 98,
    fee: 999,
    nextAvailable: "Tomorrow, 10:00 AM"
  },
  {
    id: "dr-ananya-iyer",
    name: "Dr. Ananya Iyer",
    specialty: "Clinical & Aesthetic Dermatologist",
    department: "dermatology",
    credentials: "MBBS, MD - Dermatology & Venereology (JIPMER)",
    experience: 11,
    rating: 4.88,
    reviews: 146,
    satisfaction: 97,
    fee: 799,
    nextAvailable: "Tomorrow, 2:00 PM"
  },
  {
    id: "dr-saira-khan",
    name: "Dr. Saira Khan",
    specialty: "General Medicine & Internal Therapy",
    department: "general",
    credentials: "MBBS (KGMU), MD - Internal Medicine",
    experience: 12,
    rating: 4.90,
    reviews: 165,
    satisfaction: 98,
    fee: 699,
    nextAvailable: "Today, 5:30 PM"
  }
];

export default function DoctorsPage() {
  const [selectedDept, setSelectedDept] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  // Booking states
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [bookingDate, setBookingDate] = useState<string>("");
  const [bookingTime, setBookingTime] = useState<string>("");
  const [patientNote, setPatientNote] = useState<string>("");
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);
  const [transactionId, setTransactionId] = useState<string>("");

  const handleOpenBooking = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setBookingDate("");
    setBookingTime("");
    setPatientNote("");
    setBookingSuccess(false);
  };

  const handleCloseBooking = () => {
    setSelectedDoctor(null);
    setBookingSuccess(false);
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingDate || !bookingTime) return;
    
    // Generate mock transaction ID
    const randomTxId = "TX-" + Math.floor(100000 + Math.random() * 900000);
    setTransactionId(randomTxId);
    setBookingSuccess(true);
  };

  const filteredDoctors = DOCTORS_DATA.filter((doctor) => {
    const matchesDept = selectedDept === "all" || doctor.department === selectedDept;
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doctor.credentials.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <div className="relative min-h-screen bg-obsidian-bg text-slate-800 overflow-hidden font-sans pb-24">
      
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-15%] w-[45vw] h-[45vw] rounded-full bg-blue-500/4 blur-[140px] pointer-events-none" />

      {/* --- HEADER sticky navbar --- */}
      <Header />

      {/* Booking Overlay Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg glass-panel rounded-3xl border border-slate-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            
            {/* Modal Header */}
            <div className="px-6 py-4 bg-slate-50/50 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-base font-bold font-display text-slate-800 flex items-center gap-2">
                <Video className="w-4 h-4 text-emerald-400" /> Book Tele-Consultation
              </h3>
              <button 
                onClick={handleCloseBooking}
                className="p-1 rounded bg-slate-50 border border-slate-200 text-gray-400 hover:text-emerald-600 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-8 text-left">
              {!bookingSuccess ? (
                <form onSubmit={handleSubmitBooking} className="space-y-5">
                  
                  {/* Doctor Info Card */}
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-200">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center font-display font-black text-emerald-400 text-base">
                      {selectedDoctor.name.split(" ").slice(-1)[0][0]}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">{selectedDoctor.name}</h4>
                      <p className="text-xs text-emerald-400">{selectedDoctor.specialty}</p>
                      <p className="text-[10px] text-gray-500 mt-0.5">{selectedDoctor.credentials}</p>
                    </div>
                  </div>

                  {/* Date Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-emerald-400" /> Select Consultation Date
                    </label>
                    <input
                      type="date"
                      required
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl text-xs text-slate-800 glass-input text-left"
                    />
                  </div>

                  {/* Time Slots */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-emerald-400" /> Select Time Slot
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {["09:00 AM", "11:30 AM", "02:00 PM", "04:30 PM"].map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setBookingTime(slot)}
                          className={`py-2 rounded-lg text-xs font-semibold border transition-all ${
                            bookingTime === slot
                              ? "bg-emerald-500 text-black font-bold border-emerald-400 shadow-md shadow-emerald-500/10"
                              : "bg-slate-50/50 border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Consultation Notes */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Primary Health Symptoms / Notes</label>
                    <textarea
                      placeholder="e.g. Chronic fatigue, lack of sleep, stamina concerns, Ayurvedic review request..."
                      rows={3}
                      value={patientNote}
                      onChange={(e) => setPatientNote(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl text-xs text-slate-800 glass-input text-left"
                    />
                  </div>

                  {/* Booking Pricing summary */}
                  <div className="p-4 bg-slate-50/50 border border-slate-200 rounded-2xl flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-800">Consultation Fee</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">Direct 20-min private secure session</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-black text-slate-800">₹{selectedDoctor.fee}</p>
                      <p className="text-[9px] text-emerald-400 font-bold uppercase">100% Secure Transaction</p>
                    </div>
                  </div>

                  {/* Submit buttons */}
                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleCloseBooking}
                      className="flex-1 py-3 rounded-xl bg-slate-50 border border-slate-200 hover:bg-white/8 hover:border-slate-300 text-xs font-bold text-gray-300 uppercase tracking-wider transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!bookingDate || !bookingTime}
                      className={`flex-1 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md ${
                        bookingDate && bookingTime
                          ? "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:brightness-110 text-white"
                          : "bg-slate-50 text-gray-500 border border-slate-200 cursor-not-allowed"
                      }`}
                    >
                      Pay & Confirm Slot
                    </button>
                  </div>

                </form>
              ) : (
                <div className="text-center space-y-6 py-6 animate-in zoom-in-95 duration-500">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
                    <Check className="w-8 h-8" />
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-xl font-bold text-slate-800">Tele-Consultation Booked!</h4>
                    <p className="text-xs text-gray-400 max-w-sm mx-auto">
                      Your booking has been authenticated. An encrypted calendar invite and a direct video channel link have been dispatched to your email.
                    </p>
                  </div>

                  {/* Details Block */}
                  <div className="max-w-md mx-auto glass-panel p-5 rounded-2xl border border-slate-200 space-y-2.5 text-left text-xs bg-slate-50/50">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Physician:</span>
                      <strong className="text-slate-800">{selectedDoctor.name}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Appointment Date:</span>
                      <strong className="text-emerald-400">{bookingDate}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Time Slot:</span>
                      <strong className="text-emerald-400">{bookingTime}</strong>
                    </div>
                    <div className="flex justify-between border-t border-slate-200 pt-2.5">
                      <span className="text-gray-400 font-semibold">Consult Transaction ID:</span>
                      <strong className="text-slate-800 font-mono">{transactionId}</strong>
                    </div>
                  </div>

                  <button
                    onClick={handleCloseBooking}
                    className="px-6 py-3 rounded-xl bg-emerald-500 hover:brightness-110 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md"
                  >
                    Return to Directory
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 text-left">
        
        {/* Back Link */}
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-emerald-600 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
          </Link>
        </div>

        {/* Hero Banner */}
        <div className="glass-panel p-8 md:p-12 rounded-3xl border border-slate-200 bg-gradient-to-r from-emerald-950/20 via-obsidian-card to-obsidian-bg relative overflow-hidden mb-12 shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-2xl space-y-4 relative">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-400">
              <Video className="w-3.5 h-3.5 animate-pulse" /> Board-Certified Tele-Consultations
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold font-display text-gradient">
              Consult Top Medical Specialists Online
            </h1>
            <p className="text-sm text-gray-400 leading-relaxed">
              Skip waiting rooms and consult board-certified physicians, cardiologists, dermatologists, and specialized Men's health longevity experts from the comfort of your home. Encrypted, private, and HIPAA-compliant.
            </p>
          </div>
        </div>

        {/* Search, Departments Tabs and Doctors Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SIDEBAR: FILTERS */}
          <div className="lg:col-span-3 space-y-6">
            <div className="glass-panel p-6 rounded-2xl border border-slate-200 space-y-6">
              
              {/* Search Box */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Search Doctor</label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search name, credentials..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs text-slate-800 glass-input text-left"
                  />
                  <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
                </div>
              </div>

              {/* Department Tabs */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Departments</label>
                <div className="flex flex-col gap-1.5">
                  {[
                    { id: "all", label: "All Specialists" },
                    { id: "mens-health", label: "Men's Health & Longevity" },
                    { id: "cardiology", label: "Cardiology Clinic" },
                    { id: "dermatology", label: "Dermatology Clinic" },
                    { id: "general", label: "General Medicine" }
                  ].map((dept) => (
                    <button
                      key={dept.id}
                      onClick={() => setSelectedDept(dept.id)}
                      className={`w-full px-4 py-3 rounded-xl text-left text-xs font-semibold uppercase tracking-wider transition-all border ${
                        selectedDept === dept.id
                          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                          : "bg-transparent border-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                    >
                      {dept.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Security info box */}
              <div className="p-4 bg-emerald-950/5 border border-emerald-500/15 rounded-xl text-xs text-emerald-300 space-y-2.5">
                <div className="flex items-center gap-1.5 font-bold">
                  <Shield className="w-4 h-4 shrink-0" /> Privacy Shield Active
                </div>
                <p className="text-[10px] leading-relaxed text-emerald-400">
                  Direct connection video tunnels are 256-bit AES encrypted. Zero recording of patient sessions ensures absolute legal and clinical compliance.
                </p>
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN: DOCTORS DOSSIER */}
          <div className="lg:col-span-9 space-y-8">
            
            {/* Dossier Header info */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <span className="text-xs text-gray-400">
                Found <strong className="text-slate-800">{filteredDoctors.length}</strong> active clinical specialists
              </span>
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                Clinic Status: <span className="text-emerald-400 font-bold flex items-center gap-1">Online & Booking</span>
              </div>
            </div>

            {/* Doctors Cards Grid */}
            {filteredDoctors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredDoctors.map((doc) => (
                  <div
                    key={doc.id}
                    className="glass-panel p-6 rounded-2xl border border-slate-200 flex flex-col justify-between hover:border-emerald-500/20 hover:bg-slate-50/50 transition-all duration-300 group hover:-translate-y-1"
                  >
                    
                    {/* Header info */}
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center font-display font-black text-emerald-400 text-base shadow-inner">
                            {doc.name.split(" ").slice(-1)[0][0]}
                          </div>
                          <div>
                            <h3 className="text-base font-bold text-slate-800 group-hover:text-emerald-300 transition-colors leading-tight">
                              {doc.name}
                            </h3>
                            <p className="text-xs text-emerald-400 font-medium mt-0.5">{doc.specialty}</p>
                          </div>
                        </div>

                        {/* rating */}
                        <div className="flex items-center gap-1 text-[10px] bg-slate-50 border border-slate-200 px-2 py-0.5 rounded">
                          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                          <span className="font-bold text-slate-800">{doc.rating}</span>
                        </div>
                      </div>

                      {/* Credentials */}
                      <p className="text-[11px] text-gray-400 leading-normal border-b border-slate-200 pb-3">
                        <strong>Credentials:</strong> {doc.credentials}
                      </p>

                      {/* key stats */}
                      <div className="grid grid-cols-3 gap-2 py-1 text-left">
                        <div>
                          <p className="text-[9px] text-gray-500 uppercase leading-none">Experience</p>
                          <p className="text-xs font-bold text-slate-800 mt-1">{doc.experience}+ Years</p>
                        </div>
                        <div>
                          <p className="text-[9px] text-gray-500 uppercase leading-none">Satisfaction</p>
                          <p className="text-xs font-bold text-emerald-400 mt-1">{doc.satisfaction}%</p>
                        </div>
                        <div>
                          <p className="text-[9px] text-gray-500 uppercase leading-none">Consult Fee</p>
                          <p className="text-xs font-bold text-slate-800 mt-1">₹{doc.fee}</p>
                        </div>
                      </div>
                    </div>

                    {/* Booking button footer */}
                    <div className="space-y-3 pt-4 border-t border-slate-200 mt-4">
                      
                      {/* Availability status */}
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-gray-500 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-gray-600" /> Next Slot:
                        </span>
                        <strong className="text-emerald-400 font-bold">{doc.nextAvailable}</strong>
                      </div>

                      <button
                        onClick={() => handleOpenBooking(doc)}
                        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:brightness-110 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md"
                      >
                        <Calendar className="w-3.5 h-3.5" /> Schedule Consult
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            ) : (
              <div className="glass-panel p-16 rounded-2xl border border-slate-200 text-center space-y-4">
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center mx-auto text-gray-500">
                  <Search className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">No physicians found</h3>
                  <p className="text-xs text-gray-400 mt-1">We couldn't find any specialist in our directories matching your query. Try altering search queries.</p>
                </div>
              </div>
            )}

            {/* Quality Seals */}
            <div className="glass-panel p-6 rounded-2xl border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Certified Global Qualifications</h4>
                  <p className="text-[10px] text-gray-400 mt-0.5 leading-relaxed">
                    Our physicians are verified against national registry records and possess additional training in modern digital tele-consultations.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Digital Health Record Vault</h4>
                  <p className="text-[10px] text-gray-400 mt-0.5 leading-relaxed">
                    Prescriptions written during consult sessions are automatically updated inside your encrypted personal Health Vault for easy pharmacy order routing.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
}
