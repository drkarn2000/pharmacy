"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import {
  Activity,
  Clock,
  Search,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  BookOpen,
  Mail,
  ChevronDown
} from "lucide-react";

// Blog Post Interface
interface BlogPost {
  id: string;
  title: string;
  desc: string;
  category: string;
  readTime: string;
  author: string;
  date: string;
}

// Blog Posts Data
const BLOGS_DATA: BlogPost[] = [
  {
    id: "everyday-habits-better-immunity",
    title: "5 Everyday Habits for Better Immunity",
    desc: "Simple lifestyle improvements, micronutrient protocols, and lymphatic circulation habits that significantly support long-term cellular wellness and immunological defenses.",
    category: "Immunity",
    readTime: "4 Min Read",
    author: "Dr. Saira Khan",
    date: "May 12, 2026"
  },
  {
    id: "when-to-choose-online-consultation",
    title: "When to Choose Online Consultation",
    desc: "Understand when tele-consultation is the right primary step for acute symptoms, regular laboratory reports and initial psychiatric pathways.",
    category: "Telehealth",
    readTime: "5 Min Read",
    author: "Dr. Rohan Sharma",
    date: "May 10, 2026"
  },
  {
    id: "prescription-orders-through-pharmacy",
    title: "How Prescription Orders Move Through Pharmacy",
    desc: "A meticulous behind-the-scenes tracking of prescription authentication, certified pharmacist packaging, cold-chain containment and express home dispatch.",
    category: "Pharmacy",
    readTime: "6 Min Read",
    author: "Dr. Vikram Malhotra",
    date: "May 08, 2026"
  },
  {
    id: "himalayan-shilajit-cellular-energy",
    title: "Himalayan Shilajit: Science of Cellular Vitality",
    desc: "An in-depth chemical evaluation of fulvic acid and trace minerals sourcing in high-grade Shilajit resin, detailing mitochondrial ATP production pathways.",
    category: "Ayurveda",
    readTime: "8 Min Read",
    author: "Dr. Vikram Malhotra",
    date: "May 05, 2026"
  },
  {
    id: "mitigating-daily-cortisol-stress",
    title: "Mitigating Cortisol: The Role of Ashwagandha Adaptogens",
    desc: "How KSM-66 root extracts downregulate autonomic nervous stress indicators and clinical cortisol markers by up to 27.9% in double-blind control trials.",
    category: "Stress-Care",
    readTime: "7 Min Read",
    author: "Dr. Saira Khan",
    date: "Apr 28, 2026"
  }
];

export default function BlogsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredBlogs = BLOGS_DATA.filter((blog) => {
    const matchesCategory = selectedCategory === "all" || blog.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          blog.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="relative min-h-screen bg-obsidian-bg text-slate-800 overflow-hidden font-sans pb-24">
      
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-15%] w-[45vw] h-[45vw] rounded-full bg-amber-500/3 blur-[140px] pointer-events-none" />

      {/* --- STICKY NAVIGATION --- */}
      <Header />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 text-left">
        
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
              <BookOpen className="w-3.5 h-3.5" /> Health Insights Portal
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold font-display text-gradient">
              Certified Longevity & Medical Science
            </h1>
            <p className="text-sm text-gray-400 leading-relaxed">
              Browse peer-reviewed clinical articles, metabolic wellness protocols, and historical Ayurvedic research reports compiled by our certified clinical specialists.
            </p>
          </div>
        </div>

        {/* Filters and Feeds layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SIDEBAR: FILTERS */}
          <div className="lg:col-span-3 space-y-6">
            <div className="glass-panel p-6 rounded-2xl border border-slate-200 space-y-6">
              
              {/* Search Box */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Search Articles</label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search titles, keywords..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs text-slate-800 glass-input text-left"
                  />
                  <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
                </div>
              </div>

              {/* Department Tabs */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Categories</label>
                <div className="flex flex-col gap-1.5">
                  {[
                    { id: "all", label: "All Literature" },
                    { id: "ayurveda", label: "Ayurvedic Science" },
                    { id: "immunity", label: "Immunology" },
                    { id: "telehealth", label: "Telemedicine" },
                    { id: "pharmacy", label: "Pharmacy Logistics" },
                    { id: "stress-care", label: "Cortisol Management" }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full px-4 py-3 rounded-xl text-left text-xs font-semibold uppercase tracking-wider transition-all border ${
                        selectedCategory === cat.id
                          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                          : "bg-transparent border-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Newsletter Capture inside sidebar */}
              <div className="p-5 rounded-2xl bg-slate-50/50 border border-slate-200 text-left space-y-4">
                <Mail className="w-6 h-6 text-emerald-400" />
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Join Briefings</h4>
                  <p className="text-[10px] text-gray-500 mt-1 leading-normal">Get weekly peer-reviewed longevity directives in your mailbox.</p>
                </div>
                <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
                  <input
                    type="email"
                    placeholder="Email address"
                    className="w-full px-3 py-2 rounded-lg text-xs text-slate-800 glass-input text-left"
                  />
                  <button className="w-full py-2 rounded-lg bg-emerald-500 hover:brightness-110 text-white text-[10px] font-bold uppercase tracking-wider transition-all">
                    Subscribe
                  </button>
                </form>
              </div>

            </div>
          </div>

          {/* RIGHT GRID: ARTICLES */}
          <div className="lg:col-span-9 space-y-8">
            
            {/* Feed metadata */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <span className="text-xs text-gray-400">
                Displaying <strong className="text-slate-800">{filteredBlogs.length}</strong> medical articles
              </span>
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                Sorted by <strong className="text-slate-800 flex items-center gap-1 cursor-default">Latest Release <ChevronDown className="w-3.5 h-3.5" /></strong>
              </div>
            </div>

            {/* Articles feed grid */}
            {filteredBlogs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredBlogs.map((blog) => (
                  <Link
                    key={blog.id}
                    href={`/blogs/${blog.id}`}
                    className="glass-panel rounded-2xl overflow-hidden border border-slate-200 flex flex-col justify-between hover:border-emerald-500/20 hover:bg-slate-50/50 transition-all duration-300 group hover:-translate-y-1"
                  >
                    
                    {/* Visual Card Header */}
                    <div className="h-44 w-full bg-gradient-to-br from-emerald-950/20 via-obsidian-card to-blue-950/15 border-b border-slate-200 relative overflow-hidden flex items-center justify-center">
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-20 transition-opacity" />
                      <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                        <BookOpen className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Card Content details */}
                    <div className="p-6 flex-1 flex flex-col justify-between text-left space-y-6">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="uppercase font-bold tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                            {blog.category}
                          </span>
                          <span className="text-gray-500 flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-gray-600" /> {blog.readTime}
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-slate-800 group-hover:text-emerald-300 transition-colors leading-snug">
                          {blog.title}
                        </h3>

                        <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">
                          {blog.desc}
                        </p>
                      </div>

                      {/* Author credentials */}
                      <div className="flex items-center justify-between border-t border-slate-200 pt-4 text-[10px]">
                        <span className="text-gray-500">By <strong>{blog.author}</strong></span>
                        <span className="text-gray-600 font-semibold">{blog.date}</span>
                      </div>
                    </div>

                  </Link>
                ))}
              </div>
            ) : (
              <div className="glass-panel p-16 rounded-2xl border border-slate-200 text-center space-y-4">
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center mx-auto text-gray-500">
                  <Search className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">No articles found</h3>
                  <p className="text-xs text-gray-400 mt-1">We couldn't find any publication in our directories matching your query. Try other search keywords.</p>
                </div>
              </div>
            )}

          </div>

        </div>

      </main>

    </div>
  );
}
