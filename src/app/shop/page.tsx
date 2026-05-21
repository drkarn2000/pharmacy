"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import {
  Activity,
  ShoppingBag,
  Search,
  Star,
  Shield,
  ArrowRight,
  Filter,
  Check,
  ChevronDown,
  Info,
  Clock,
  Sparkle,
  ArrowLeft,
  Calendar,
  X
} from "lucide-react";

// Product Type
interface Product {
  id: string;
  name: string;
  category: string;
  desc: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  badge?: string;
  inStock: boolean;
  imageUrl: string;
}

// Products Data
const PRODUCTS_DATA: Product[] = [
  {
    id: "duraup-capsules",
    name: "Duraup Vitality Capsules (60 count)",
    category: "ayurvedic",
    desc: "Premium double-extract Ayurvedic formula with pure Himalayan Shilajit & KSM-66 Ashwagandha for strength, recovery and stamina.",
    price: 1299,
    originalPrice: 1999,
    rating: 4.9,
    reviews: 142,
    badge: "Bestseller",
    inStock: true,
    imageUrl: "/service_pharmacy.png"
  },
  {
    id: "himalayan-shilajit-resin",
    name: "Himalayan Shilajit Resin (Gold Grade, 20g)",
    category: "ayurvedic",
    desc: "100% pure Himalayan Shilajit resin purified using traditional methods. Standardized to 80% fulvic acid with rich trace minerals.",
    price: 1899,
    originalPrice: 2499,
    rating: 4.8,
    reviews: 96,
    badge: "Pure Grade",
    inStock: true,
    imageUrl: "/service_health_vault.png"
  },
  {
    id: "cardioflow-coq10",
    name: "Cardioflow CoQ10 Ubiquinol (30 Cap)",
    category: "cardiology",
    desc: "Clinical-grade Coenzyme Q10 in highly bioavailable ubiquinol format to support myocardial cellular energy and blood flow dynamics.",
    price: 1499,
    originalPrice: 1799,
    rating: 4.7,
    reviews: 64,
    inStock: true,
    imageUrl: "/clinical_lab_illustration.png"
  },
  {
    id: "dermaglow-biotin-gummies",
    name: "DermaGlow Biotin & Zinc (60 count)",
    category: "skin-hair",
    desc: "Synergistic biotin, folic acid, and zinc gummies to combat hormonal hair fall, strengthen root follicles, and promote skin glow.",
    price: 899,
    originalPrice: 1199,
    rating: 4.6,
    reviews: 82,
    badge: "Derm Approved",
    inStock: true,
    imageUrl: "/service_self_assessment.png"
  },
  {
    id: "active-multivitamin-complex",
    name: "Active Daily Multivitamin Complex (90 Tab)",
    category: "wellness",
    desc: "Broad-spectrum daily formula loaded with 24 bio-active vitamins, digestive enzymes, and botanical extracts for immunity.",
    price: 799,
    originalPrice: 999,
    rating: 4.8,
    reviews: 110,
    inStock: true,
    imageUrl: "/service_pharmacy.png"
  },
  {
    id: "ashwagandha-pro-extract",
    name: "KSM-66 Ashwagandha Pro Extract (60 count)",
    category: "ayurvedic",
    desc: "Single-herb high-potency adaptogenic support to reduce systemic cortisol levels, manage daily fatigue, and optimize recovery.",
    price: 999,
    originalPrice: 1299,
    rating: 4.7,
    reviews: 73,
    inStock: true,
    imageUrl: "/service_health_vault.png"
  },
  {
    id: "omega-3-triple-strength",
    name: "Omega-3 Triple Strength Softgels (60 count)",
    category: "cardiology",
    desc: "High-potency EPA and DHA softgels for heart, brain, eye, and healthy triglyceride support.",
    price: 1199,
    originalPrice: 1599,
    rating: 4.6,
    reviews: 51,
    badge: "Test Product",
    inStock: true,
    imageUrl: "/coq10_capsules.png"
  },
  {
    id: "probiotic-digestive-care",
    name: "Probiotic Digestive Care Capsules (30 count)",
    category: "wellness",
    desc: "Daily probiotic blend with prebiotic fiber to support digestion, bloating control, and gut balance.",
    price: 699,
    originalPrice: 899,
    rating: 4.5,
    reviews: 38,
    badge: "Dummy",
    inStock: true,
    imageUrl: "/multivitamin_tablets.png"
  },
  {
    id: "vitamin-d3-k2-drops",
    name: "Vitamin D3 + K2 Oral Drops (30 ml)",
    category: "wellness",
    desc: "Easy daily D3 and K2 drops designed to support bone strength, immunity, and calcium utilization.",
    price: 549,
    originalPrice: 749,
    rating: 4.7,
    reviews: 44,
    inStock: true,
    imageUrl: "/service_self_assessment.png"
  },
  {
    id: "collagen-peptide-powder",
    name: "Marine Collagen Peptide Powder (200g)",
    category: "skin-hair",
    desc: "Unflavoured collagen peptide powder for skin elasticity, nail strength, and hair wellness routines.",
    price: 1399,
    originalPrice: 1899,
    rating: 4.4,
    reviews: 29,
    badge: "New",
    inStock: true,
    imageUrl: "/biotin_gummies.png"
  }
];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [cartCount, setCartCount] = useState<number>(0);
  const [activeCartAlert, setActiveCartAlert] = useState<boolean>(false);
  const [lastAddedItem, setLastAddedItem] = useState<string>("");

  const handleAddToCart = (productName: string) => {
    setCartCount((prev) => prev + 1);
    setLastAddedItem(productName);
    setActiveCartAlert(true);
    setTimeout(() => {
      setActiveCartAlert(false);
    }, 3000);
  };

  const filteredProducts = PRODUCTS_DATA.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="relative min-h-screen bg-obsidian-bg text-gray-100 overflow-hidden font-sans pb-24">

      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-15%] w-[45vw] h-[45vw] rounded-full bg-amber-500/3 blur-[140px] pointer-events-none" />

      {/* Cart Alert Toast */}
      {activeCartAlert && (
        <div className="fixed bottom-8 right-8 z-50 glass-panel p-4 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom duration-300 max-w-sm">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Check className="w-4 h-4" />
          </div>
          <div className="text-left">
            <p className="text-xs font-bold text-white">Added to Prescription Cart</p>
            <p className="text-[10px] text-gray-400 mt-0.5 line-clamp-1">{lastAddedItem}</p>
          </div>
          <button
            onClick={() => setActiveCartAlert(false)}
            className="text-gray-500 hover:text-white ml-2 p-1 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header Sticky Navigation */}
      <Header cartCount={cartCount} />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 text-left">

        {/* Back Link */}
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
          </Link>
        </div>

        {/* Hero Section */}
        <div className="glass-panel p-8 md:p-12 rounded-3xl border border-slate-100 bg-gradient-to-r from-emerald-500/[0.03] via-white to-slate-100 relative overflow-hidden mb-12 shadow-sm">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-xl space-y-4 relative text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-700">
              <Shield className="w-3.5 h-3.5" /> 100% Certified Pharmacy
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold font-display bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-700 bg-clip-text text-transparent">
              24/7 Digital Health Marketplace
            </h1>
            <p className="text-sm text-slate-650 leading-relaxed">
              Order certified prescription medicines, vitamins, and signature formulations. Direct pharmacy dispatch utilizing temperature-controlled logistics, compliant with national clinical standards.
            </p>
          </div>
        </div>

        {/* Search, Filter Tabs and Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* LEFT SIDEBAR: FILTERS */}
          <div className="lg:col-span-3 space-y-6">
            <div className="glass-panel p-6 rounded-2xl border border-slate-100 bg-white space-y-6 shadow-sm">

              {/* Search Box */}
              <div className="space-y-2 text-left">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Search Products</label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search medicines, vitamins..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs text-slate-800 bg-slate-50 border border-slate-200 focus:outline-none focus:border-emerald-500 text-left"
                  />
                  <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-450" />
                </div>
              </div>

              {/* Category Filters */}
              <div className="space-y-3 text-left">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5 text-emerald-600" /> Categories
                </label>
                <div className="flex flex-col gap-1.5">
                  {[
                    { id: "all", label: "All Products" },
                    { id: "ayurvedic", label: "Ayurvedic Formulas" },
                    { id: "wellness", label: "Daily Wellness" },
                    { id: "skin-hair", label: "Skin & Hair" },
                    { id: "cardiology", label: "Cardiology" }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full px-4 py-3 rounded-xl text-left text-xs font-semibold uppercase tracking-wider transition-all border ${selectedCategory === cat.id
                          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-700"
                          : "bg-transparent border-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                        }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pharmacy Info Panel */}
              <div className="p-4 bg-emerald-500/[0.04] border border-emerald-500/20 rounded-xl text-xs text-emerald-800 space-y-2.5 text-left">
                <div className="flex items-center gap-1.5 font-bold">
                  <Info className="w-4 h-4 shrink-0 text-emerald-600" /> Sourcing Warranty
                </div>
                <p className="text-[10px] leading-relaxed text-slate-650">
                  Every order includes free prescription review by our medical panel and active tele-consultation follow-up scheduling.
                </p>
              </div>

            </div>
          </div>

          {/* RIGHT GRID: PRODUCTS */}
          <div className="lg:col-span-9 space-y-8">

            {/* Products Counter */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <span className="text-xs text-slate-300">
                Showing <strong className="text-slate-100">{filteredProducts.length}</strong> authenticated products
              </span>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                Sorted by <strong className="text-slate-150 flex items-center gap-1 cursor-default">Best Match <ChevronDown className="w-3.5 h-3.5" /></strong>
              </div>
            </div>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="glass-panel rounded-2xl overflow-hidden border border-slate-100 bg-white flex flex-col justify-between hover:border-emerald-500/20 hover:bg-slate-50/50 shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-1"
                  >

                    {/* Visual Graphic Placeholder with styling - Clickable Link */}
                    <Link
                      href={`/shop/${product.id}`}
                      className="block h-44 w-full relative overflow-hidden flex items-center justify-center p-4 border-b border-slate-100 cursor-pointer"
                    >
                      {/* High-Resolution Professional Supplement Image Backdrop */}
                      <img
                        src={['https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?q=80&w=940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D','https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D','https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=437&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D','https://images.unsplash.com/photo-1628771065518-0d82f1938462?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D','https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=879&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'][filteredProducts.indexOf(product) % 5]}
                        alt={product.name}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {product.badge && (
                        <span className="absolute top-4 left-4 text-[9px] bg-amber-500/90 border border-amber-500 text-white font-bold px-2 py-0.5 rounded-full uppercase tracking-wider z-20 shadow-sm">
                          {product.badge}
                        </span>
                      )}
                    </Link>

                    {/* Description Details */}
                    <div className="p-5 flex-1 flex flex-col justify-between text-left space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-1 text-[10px] text-slate-500">
                          <span className="uppercase font-bold tracking-wider text-emerald-600">{product.category}</span>
                          <span>•</span>
                          <span className="flex items-center gap-0.5 text-slate-650"><Star className="w-3 h-3 text-amber-400 fill-amber-400" /> {product.rating} ({product.reviews})</span>
                        </div>

                        <h3 className="text-sm font-bold text-slate-800 leading-snug group-hover:text-emerald-600 transition-colors">
                          <Link href={`/shop/${product.id}`} className="hover:underline cursor-pointer">
                            {product.name}
                          </Link>
                        </h3>

                        <p className="text-[11px] text-slate-500 leading-normal line-clamp-3">
                          {product.desc}
                        </p>
                      </div>

                      {/* Pricing and Action */}
                      <div className="space-y-3 pt-3 border-t border-slate-100">
                        <div className="flex items-baseline gap-2">
                          <span className="text-base font-extrabold text-slate-900">₹{product.price}</span>
                          <span className="text-xs text-slate-400 line-through">₹{product.originalPrice}</span>
                          <span className="text-[10px] text-emerald-600 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">
                            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% Off
                          </span>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => handleAddToCart(product.name)}
                            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:brightness-110 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer active:scale-95"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" /> Add To Cart
                          </button>
                          <Link
                            href={`/shop/${product.id}`}
                            className="px-3.5 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300 text-xs font-bold uppercase tracking-wider flex items-center justify-center transition-all cursor-pointer"
                          >
                            Details
                          </Link>
                        </div>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            ) : (
              <div className="glass-panel p-16 rounded-2xl border border-slate-100 bg-white text-center space-y-4 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mx-auto text-slate-400">
                  <Search className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">No products found</h3>
                  <p className="text-xs text-slate-500 mt-1">We couldn&apos;t find any products matching your search query. Try adjusting your filters.</p>
                </div>
              </div>
            )}

            {/* Quality Seals */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {[
                { title: "NABL Lab Tested", desc: "Every batch verified for toxicity & heavy metals.", icon: Check },
                { title: "ISO Quality Seals", desc: "100% genuine formulation certified by WHO-GMP.", icon: Shield },
                { title: "Cold-chain Logistics", desc: "Delivered securely maintaining thermal integrity.", icon: Clock }
              ].map((seal, sIdx) => (
                <div key={sIdx} className="glass-panel p-4 rounded-xl border border-slate-100 bg-white flex gap-3 text-left shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 shrink-0">
                    <seal.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">{seal.title}</h4>
                    <p className="text-[10px] text-slate-500 mt-0.5 leading-normal">{seal.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </main>

    </div>
  );
}
