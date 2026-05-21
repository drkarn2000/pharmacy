"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "../../../components/Header";
import {
  Activity,
  ShoppingBag,
  Star,
  Shield,
  ArrowLeft,
  Check,
  Info,
  Clock,
  Sparkle,
  Plus,
  Minus,
  Sparkles,
  Heart,
  ChevronRight,
  TrendingUp,
  X,
  Lock,
  RotateCcw,
  Truck,
  Eye,
  CheckCircle2,
  Calendar,
  AlertTriangle,
  Award,
  ChevronDown,
  ChevronUp,
  Mail,
  Send,
  Phone,
  Play,
  ZoomIn,
  FileText,
  BookOpen,
  Zap
} from "lucide-react";
import { motion } from "framer-motion";
// Product Detail Specifications
interface ProductDetails {
  id: string;
  name: string;
  category: string;
  desc: string;
  longDesc: string;
  highlight: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  badge?: string;
  inStock: boolean;
  boughtCount: string;
  tags: string[];
  features: { title: string; desc: string }[];
  composition: { name: string; dosage: string }[];
  howToUse: string[];
  tip: string;
  whoCanUse: string[];
  doctorCertified: { name: string; role: string; cert: string };
  accordions: {
    benefits: string[];
    ingredients: string[];
    sideEffects: string[];
    precautions: string[];
  };
  gradient: string;
  imageUrl: string;
}

// Product Database
const PRODUCTS_DATA: Record<string, ProductDetails> = {
  "duraup-capsules": {
    id: "duraup-capsules",
    name: "Duraup Vitality Capsules",
    category: "Sexual Wellness",
    desc: "Premium double-extract Ayurvedic formula with pure Himalayan Shilajit & KSM-66 Ashwagandha for strength, recovery and stamina.",
    longDesc: "Engineered to deliver exceptional cellular energy restoration, Duraup Vitality Capsules contain a highly synergistic combination of Himalayan Shilajit and KSM-66® Ashwagandha. Designed for high-performance recovery, systemic stamina, and physical endurance, this formula elevates mitochondrial ATP synthesis while actively lowering biological cortisol markers. Certified organic and verified via HPLC assays.",
    highlight: "Performance, Stamina & Timing - For Men",
    price: 699,
    originalPrice: 999,
    rating: 4.8,
    reviews: 128,
    badge: "Best Seller",
    inStock: true,
    boughtCount: "500+ bought in past month",
    tags: ["Boost Performance", "Increase Stamina", "Longer Duration", "100% Ayurvedic"],
    features: [
      { title: "Improves Stamina", desc: "Helps improve energy & physical endurance" },
      { title: "Enhances Performance", desc: "Supports better performance & satisfaction" },
      { title: "Increases Timing", desc: "Helps in delaying climax naturally" },
      { title: "100% Ayurvedic", desc: "Made with natural herbs, no side effects" }
    ],
    composition: [
      { name: "Ashwagandha (Withania somnifera)", dosage: "100 mg" },
      { name: "Safed Musli (Chlorophytum borivilianum)", dosage: "100 mg" },
      { name: "Shilajit (Asphaltum punjabianum)", dosage: "50 mg" },
      { name: "Gokshura (Tribulus terrestris)", dosage: "50 mg" },
      { name: "Kali Musli (Curculigo orchioides)", dosage: "50 mg" },
      { name: "Jaiphal (Myristica fragrans)", dosage: "25 mg" }
    ],
    howToUse: [
      "Take 1 tablet twice a day",
      "With milk or warm water",
      "30 mins after meals",
      "For best results, use for 60-90 days"
    ],
    tip: "Tip: For better results make it a part of your daily routine with a healthy diet & regular exercise.",
    whoCanUse: [
      "Men experiencing low stamina",
      "Men with performance concerns",
      "Men looking to improve timing",
      "Men looking for natural support"
    ],
    doctorCertified: {
      name: "Dr. Aditya Sharma",
      role: "Lead Ayurvedic Endocrinologist",
      cert: "BAMS, MD - 14 Years Experience"
    },
    accordions: {
      benefits: [
        "Elevates core muscle protein synthesis and biological oxygen intake.",
        "Significantly boosts cell mitochondria activity and organic ATP logs.",
        "Implements natural stress control (down-regulates blood cortisol up to 27%).",
        "Aids post-exertion recovery speed and supports clean vascular circulation."
      ],
      ingredients: [
        "Himalayan Shilajit Resin: Standardized to 80% bioactive Fulvic Acid.",
        "KSM-66® Ashwagandha Extract: full-spectrum organic root concentrate.",
        "Chlorophytum Borivilianum: Saponins and alkaloids for circulatory support.",
        "Tribulus Terrestris: Standardized to 45% saponins to enhance stamina."
      ],
      sideEffects: [
        "Formulated with pure clinical-grade extracts with no synthetic chemicals.",
        "No documented side effects when consumed according to exact dosage specs.",
        "Mild body heat increase may occur initially due to active trace minerals."
      ],
      precautions: [
        "Consult your personal physician panel if diagnosed with high iron overload.",
        "Avoid ingestion on a completely empty stomach if prone to hyperacidity.",
        "Ensure capsule container is stored away from high humidity to avoid clumping."
      ]
    },
    gradient: "from-emerald-950/85 via-emerald-900 to-emerald-950",
    imageUrl: "/service_pharmacy.png"
  },
  "himalayan-shilajit-resin": {
    id: "himalayan-shilajit-resin",
    name: "Himalayan Shilajit Resin (Gold Grade)",
    category: "Ayurvedic Formulas",
    desc: "100% pure Himalayan Shilajit resin purified using traditional methods. Standardized to 80% fulvic acid with rich trace minerals.",
    longDesc: "Sourced at ultra-high altitudes (16,000+ feet) in the pristine Himalayan range, this gold-grade Shilajit resin is purified using traditional, water-based filtration protocols. Heavily standardized to ensure optimal concentrations of active fulvic acid and loaded with 85+ bio-available ionic minerals, it represents the ultimate natural adaptogen for physiological performance.",
    highlight: "Cellular Energy, Recovery & Vitality - Unisex",
    price: 1899,
    originalPrice: 2499,
    rating: 4.8,
    reviews: 96,
    badge: "Pure Grade",
    inStock: true,
    boughtCount: "300+ bought in past month",
    tags: ["Cellular Energy", "85+ Trace Minerals", "HPLC Verified", "100% Organic"],
    features: [
      { title: "Mitochondrial Energy", desc: "Accelerates ATP production on cellular levels" },
      { title: "Detox & Oxygenation", desc: "Fulvic acid chelates biological heavy metals" },
      { title: "Muscular Endurance", desc: "Enhances oxygen uptake in skeletal muscles" },
      { title: "Purity Certified", desc: "Strict water purification with no chemical acids" }
    ],
    composition: [
      { name: "Purified Himalayan Shilajit", dosage: "250 mg" },
      { name: "Active Fulvic Acid Complex", dosage: "200 mg" },
      { name: "Ionic Trace Minerals (85+ kinds)", dosage: "50 mg" }
    ],
    howToUse: [
      "Take a pea-sized portion (250-500mg)",
      "Dissolve in warm water, milk, or tea",
      "Consume once daily on an empty stomach",
      "Continue daily protocol for 3 months"
    ],
    tip: "Tip: Consume early in the morning to unlock peak cognitive clarity and dynamic endurance throughout the day.",
    whoCanUse: [
      "Individuals experiencing general fatigue",
      "Athletes seeking faster muscle recovery",
      "Anyone looking to supplement trace minerals",
      "Those pursuing a natural longevity routine"
    ],
    doctorCertified: {
      name: "Dr. Rajesh Varma",
      role: "Director of Clinical Herbology",
      cert: "BAMS, Ph.D. in Pharmacognosy"
    },
    accordions: {
      benefits: [
        "Elevates core muscle recovery loops by facilitating mineral transport.",
        "Supplies highly concentrated Fulvic carriers to improve gut cell absorption.",
        "Provides 85+ dynamic micro-nutrients lacking in conventional modern diets."
      ],
      ingredients: [
        "100% Pure Himalayan Asphaltum Punjabianum (Gold Grade Resin)."
      ],
      sideEffects: [
        "100% natural and free of heavy metals (tested in NABL labs).",
        "Rare mild stomach warmth may arise; can be avoided by dissolving in warm milk."
      ],
      precautions: [
        "Do not mix with carbonated drinks or alcoholic beverages.",
        "Keep sealed in a cool, dry place. Resin may solidify if exposed to excessive dry air."
      ]
    },
    gradient: "from-slate-900 via-slate-800 to-slate-900",
    imageUrl: "/service_health_vault.png"
  },
  "cardioflow-coq10": {
    id: "cardioflow-coq10",
    name: "Cardioflow CoQ10 Ubiquinol",
    category: "Cardiology",
    desc: "Clinical-grade Coenzyme Q10 in highly bioavailable ubiquinol format to support myocardial cellular energy and blood flow dynamics.",
    longDesc: "Cardioflow Ubiquinol represents the absolute peak of myocardial cellular support. By incorporating clinical-grade Kaneka Ubiquinol®—the pre-converted, active antioxidant form of Coenzyme Q10—this therapeutic complex is immediately utilized by cardiac cells to power cellular respiration and maintain optimal endothelial arterial elasticity.",
    highlight: "Cardiovascular Support & Cellular Respiration",
    price: 1499,
    originalPrice: 1799,
    rating: 4.7,
    reviews: 64,
    badge: "Cardio Approved",
    inStock: true,
    boughtCount: "150+ bought in past month",
    tags: ["Active Ubiquinol", "Endothelial Support", "Myocardial Energy", "Zero Sugar"],
    features: [
      { title: "Myocardial Strength", desc: "Powers cardiac cell mitochondrial respiration" },
      { title: "Arterial Health", desc: "Protects low-density lipids from oxidation" },
      { title: "Oxygen Efficiency", desc: "Improves cellular oxygen usage during stress" },
      { title: "Highest Bioavailability", desc: "Kaneka Ubiquinol® absorbs 3x faster than regular CoQ10" }
    ],
    composition: [
      { name: "Kaneka Ubiquinol® (Active Coenzyme Q10)", dosage: "100 mg" },
      { name: "Organic Cold-Pressed Flaxseed Oil", dosage: "250 mg" },
      { name: "Medium Chain Triglycerides (MCT)", dosage: "100 mg" }
    ],
    howToUse: [
      "Take 1 liquid softgel daily",
      "Consume with meals containing healthy fats",
      "Take preferably with breakfast",
      "Use consistently for 8-12 weeks"
    ],
    tip: "Tip: Take alongside healthy fats (like avocados or nuts) to maximize softgel absorption.",
    whoCanUse: [
      "Adults looking to reinforce heart wellness",
      "Individuals experiencing general muscle fatigue",
      "Those taking statin therapies (which deplete CoQ10)",
      "Performance athletes managing cardiac workload"
    ],
    doctorCertified: {
      name: "Dr. Sandeep Mehta",
      role: "Lead Consulting Cardiologist",
      cert: "MD, DM (Cardiology) - 18 Years Experience"
    },
    accordions: {
      benefits: [
        "Replenishes cellular CoQ10 reserves depleted by age or statin medication.",
        "Safeguards cellular membranes and vascular walls from free radicals.",
        "Improves cardiac pumping dynamics and cellular respiration coefficients."
      ],
      ingredients: [
        "Kaneka Ubiquinol® Active CoQ10 (patented yeast-fermented isolate).",
        "Softgel Shell: Gelatin, vegetable glycerin, purified water."
      ],
      sideEffects: [
        "Exceedingly well tolerated. Extremely rare mild digestive shifts may occur.",
        "No toxic accumulation logs documented at standard dosage levels."
      ],
      precautions: [
        "If taking blood-thinning compounds (like warfarin), consult your physician.",
        "Keep softgels away from direct heat to protect soft capsule shells."
      ]
    },
    gradient: "from-rose-950/80 via-rose-900 to-rose-950",
    imageUrl: "/clinical_lab_illustration.png"
  },
  "dermaglow-biotin-gummies": {
    id: "dermaglow-biotin-gummies",
    name: "DermaGlow Biotin & Zinc Gummies",
    category: "Skin & Hair",
    desc: "Synergistic biotin, folic acid, and zinc gummies to combat hormonal hair fall, strengthen root follicles, and promote skin glow.",
    longDesc: "Formulated to combat hormonal hair fall, strengthen root follicles, and promote skin glow, DermaGlow Biotin Gummies combine high-potency D-Biotin with bio-active zinc and folate. These chewable, premium gummies optimize collagen synthesis and support the biological production of keratin chains.",
    highlight: "Root Follicle Nutrition & Skin Glow Complexes",
    price: 899,
    originalPrice: 1199,
    rating: 4.6,
    reviews: 82,
    badge: "Derm Approved",
    inStock: true,
    boughtCount: "400+ bought in past month",
    tags: ["D-Biotin 5000mcg", "Bioactive Zinc", "Folic Acid Complex", "Vegan Friendly"],
    features: [
      { title: "Combats Hair Fall", desc: "Blocks cellular DHT triggers on root shafts" },
      { title: "Strengthens Nails", desc: "Increases nail plate thickness up to 25%" },
      { title: "Revitalizes Skin", desc: "Supports collagen polypeptide production" },
      { title: "Chewable Vegan Gummies", desc: "Pectin-based, delicious strawberry infusion" }
    ],
    composition: [
      { name: "D-Biotin (USP Grade Active Compound)", dosage: "5000 mcg" },
      { name: "Bioactive Zinc Citrate", dosage: "15 mg" },
      { name: "Folic Acid / Vitamin B9", dosage: "400 mcg" },
      { name: "Vitamin C (Ascorbic Acid)", dosage: "40 mg" },
      { name: "Vitamin E (dl-Alpha-Tocopheryl)", dosage: "10 mg" }
    ],
    howToUse: [
      "Chew 2 gummies daily",
      "Consume at any convenient hour",
      "Thoroughly chew before swallowing",
      "Maintain course for 60-90 days"
    ],
    tip: "Tip: Drink at least 8-10 glasses of water daily to synergize biotin cellular flushing and optimize skin hydration.",
    whoCanUse: [
      "Women/Men managing accelerated hair thinning",
      "Anyone with brittle nails prone to peeling",
      "Individuals experiencing skin dullness",
      "Those looking for a delicious daily beauty vitamin"
    ],
    doctorCertified: {
      name: "Dr. Kriti Malhotra",
      role: "Chief Dermatological Advisor",
      cert: "MD, DNB (Dermatology) - 10 Years Experience"
    },
    accordions: {
      benefits: [
        "Accelerates keratin protein chain production in nail and hair matrices.",
        "Supplies essential zinc to support skin cellular renewal cycles.",
        "Helps nourish hair follicles from within, reducing hair shedding logs."
      ],
      ingredients: [
        "Active USP D-Biotin, Pectin, Organic Cane Sugar, Natural Strawberry Flavour."
      ],
      sideEffects: [
        "Extremely safe. Biotin is water-soluble; any excess is naturally flushed.",
        "Rare mild skin purging may occur in the first week as toxins clear."
      ],
      precautions: [
        "If scheduled for blood lab tests, disclose biotin intake (can shift assay readouts).",
        "Keep out of reach of young children. Store below 25°C to avoid melting."
      ]
    },
    gradient: "from-sky-950/80 via-sky-900 to-sky-950",
    imageUrl: "/service_self_assessment.png"
  },
  "active-multivitamin-complex": {
    id: "active-multivitamin-complex",
    name: "Active Daily Multivitamin Complex",
    category: "Daily Wellness",
    desc: "Broad-spectrum daily formula loaded with 24 bio-active vitamins, digestive enzymes, and botanical extracts for immunity.",
    longDesc: "Active Daily Multivitamin is a comprehensive broad-spectrum tablet complex comprising 24 essential vitamins and minerals combined with digestive enzymes. Specifically designed for active lifestyles, it bridges daily nutritional gaps, supports systemic immune response, and boosts overall physiological recovery loops.",
    highlight: "Daily Vitality, Immune & Digestive Support",
    price: 799,
    originalPrice: 999,
    rating: 4.8,
    reviews: 110,
    badge: "Daily Vitality",
    inStock: true,
    boughtCount: "250+ bought in past month",
    tags: ["24 Bio-Active Nutrients", "Digestive Enzymes", "Korean Ginseng", "HPLC Verified"],
    features: [
      { title: "Bridges Nutrient Gaps", desc: "100% RDA of essential vitamins & minerals" },
      { title: "Immune Response", desc: "Zinc, Vitamin C & D modulate immunoglobulins" },
      { title: "Digestive Synergy", desc: "Active enzymes support nutrient utilization" },
      { title: "Fights Fatigue", desc: "Ginseng extract raises biological stamina" }
    ],
    composition: [
      { name: "Active Essential Vitamin Blend (A, C, D3, E, B-Complex)", dosage: "500 mg" },
      { name: "Digestive Enzyme Matrix (Amylase, Lipase, Protease)", dosage: "75 mg" },
      { name: "Panax Ginseng Root Extract", dosage: "50 mg" },
      { name: "Grape Seed Extract (95% Proanthocyanidins)", dosage: "25 mg" }
    ],
    howToUse: [
      "Take 1 tablet daily",
      "Consume with lunch or breakfast",
      "Swallow with a full glass of water",
      "Consume daily as a foundation protocol"
    ],
    tip: "Tip: Avoid taking right before sleeping as Panax Ginseng may slightly elevate alertness and wakefulness.",
    whoCanUse: [
      "Busy professionals managing long hours",
      "Fitness enthusiasts seeking recovery support",
      "Anyone experiencing diet-based nutrient deficits",
      "Older adults looking to maintain cognitive/physical vitality"
    ],
    doctorCertified: {
      name: "Dr. Rohan Kapoor",
      role: "Lead Clinical Dietitian",
      cert: "MD (Clinical Nutrition) - 12 Years Experience"
    },
    accordions: {
      benefits: [
        "Fulfills 100% daily reference allowance for key immune-catalyzing vitamins.",
        "Supports enzyme-assisted food breakdown, minimizing post-meal bloating.",
        "Helps protect nervous system components from everyday environmental stressors."
      ],
      ingredients: [
        "Vitamin A, C, D3, E, K1, B1, B2, B3, B6, B12, Biotin, Zinc, Ginseng Extract."
      ],
      sideEffects: [
        "Extremely safe for daily, long-term therapeutic consumption.",
        "May cause harmless bright yellow urine coloration due to excess riboflavin (B2)."
      ],
      precautions: [
        "Do not consume on an empty stomach to avoid mild temporary nausea.",
        "Store in a dark cabinet away from direct kitchen stove heat."
      ]
    },
    gradient: "from-teal-950/80 via-teal-900 to-teal-950",
    imageUrl: "/service_pharmacy.png"
  },
  "ashwagandha-pro-extract": {
    id: "ashwagandha-pro-extract",
    name: "KSM-66 Ashwagandha Pro Extract",
    category: "Sexual Wellness",
    desc: "Single-herb high-potency adaptogenic support to reduce systemic cortisol levels, manage daily fatigue, and optimize recovery.",
    longDesc: "Sourced directly from certified, sustainable adaptogenic root plantations, KSM-66® Ashwagandha Pro Extract is the most bio-available full-spectrum root extract available globally. Formulated in vegetarian capsules, it delivers immediate HPA-axis (hypothalamic-pituitary-adrenal) cortisol regulation to calm nerves and sustain daily muscular energy.",
    highlight: "Stress Response, Endurance & Recovery - For Men & Women",
    price: 999,
    originalPrice: 1299,
    rating: 4.7,
    reviews: 73,
    badge: "Stamina Boost",
    inStock: true,
    boughtCount: "350+ bought in past month",
    tags: ["KSM-66® Root", "Cortisol Regulation", "Cognitive Focus", "99% Pure Extract"],
    features: [
      { title: "Lowers Cortisol", desc: "Reduces anxiety & cortisol logs by up to 27.9%" },
      { title: "Enhances Focus", desc: "Calms central nervous system synapse firing" },
      { title: "Improves Recovery", desc: "Aids muscle fiber repair post physical stress" },
      { title: "Deep Sleep Cycles", desc: "Increases duration of deep non-REM restorative sleep" }
    ],
    composition: [
      { name: "KSM-66® Ashwagandha Root Extract (5% Withanolides)", dosage: "500 mg" },
      { name: "Bio-enhanced Piperine Black Pepper Extract", dosage: "5 mg" }
    ],
    howToUse: [
      "Take 1 capsule twice daily",
      "Consume with warm water or hot milk",
      "Take 1 capsule before sleep if managing insomnia",
      "Continue protocol consistently for 60 days"
    ],
    tip: "Tip: Taking before bedtime works wonders in elevating sleep cycles and helping muscles recover overnight.",
    whoCanUse: [
      "Individuals managing high daily stress logs",
      "Athletes looking to boost strength and muscle recovery",
      "Anyone experiencing disrupted deep sleep patterns",
      "Those seeking a clinical-grade natural vitality boost"
    ],
    doctorCertified: {
      name: "Dr. Meera Sen",
      role: "Lead Clinical Pharmacologist",
      cert: "MD, Ph.D. - 15 Years Experience in Bio-Actives"
    },
    accordions: {
      benefits: [
        "Regulates hypothalamic-pituitary-adrenal (HPA) axis stress responses.",
        "Suppresses elevated cortisol markers to promote clean muscular energy.",
        "Improves cognitive performance logs and physical cellular endurance."
      ],
      ingredients: [
        "KSM-66® Ashwagandha root extract, organic black pepper extract (Piperine)."
      ],
      sideEffects: [
        "100% natural organic root extract with exceptional safety profile.",
        "Very rarely, mild early morning groziness may occur; resolve by shifting dose to earlier."
      ],
      precautions: [
        "Consult your physician if currently taking thyroid medication.",
        "Avoid usage if currently taking heavy prescription tranquilizers or sedatives."
      ]
    },
    gradient: "from-emerald-950/80 via-emerald-900 to-emerald-950",
    imageUrl: "/service_health_vault.png"
  },
  "omega-3-triple-strength": {
    id: "omega-3-triple-strength",
    name: "Omega-3 Triple Strength Softgels",
    category: "Cardiology",
    desc: "High-potency EPA and DHA softgels for heart, brain, eye, and healthy triglyceride support.",
    longDesc: "A dummy test product formulated for QA flows. Omega-3 Triple Strength Softgels provide concentrated EPA and DHA in an easy daily softgel format, useful for testing product detail content, cart actions, accordions, recommendations, and pricing layouts across the shop experience.",
    highlight: "Heart, Brain & Eye Support",
    price: 1199,
    originalPrice: 1599,
    rating: 4.6,
    reviews: 51,
    badge: "Test Product",
    inStock: true,
    boughtCount: "120+ bought in past month",
    tags: ["Heart Support", "EPA DHA", "Brain Health", "Softgel"],
    features: [
      { title: "Heart Support", desc: "Supports healthy cardiovascular function" },
      { title: "Brain Wellness", desc: "DHA helps support cognitive routines" },
      { title: "Eye Health", desc: "Daily support for visual wellness" },
      { title: "Easy Softgel", desc: "Simple once-daily test product format" }
    ],
    composition: [
      { name: "Fish Oil Concentrate", dosage: "1000 mg" },
      { name: "EPA", dosage: "540 mg" },
      { name: "DHA", dosage: "360 mg" }
    ],
    howToUse: [
      "Take 1 softgel daily",
      "Consume after a meal",
      "Use consistently for 8-12 weeks",
      "Do not exceed suggested serving"
    ],
    tip: "Tip: Take with lunch or dinner to improve tolerance during testing.",
    whoCanUse: [
      "Supports healthy lipid metabolism",
      "Helps maintain brain and eye wellness",
      "Complements heart-friendly diet routines",
      "Works best with consistent daily use"
    ],
    doctorCertified: {
      name: "Dr. Nikhil Rao",
      role: "Clinical Nutrition Advisor",
      cert: "MD, Cardio-Metabolic Wellness"
    },
    accordions: {
      benefits: [
        "Supports healthy cardiovascular wellness routines.",
        "Provides EPA and DHA fatty acids in concentrated form."
      ],
      ingredients: [
        "Fish oil concentrate, gelatin capsule shell, natural antioxidant blend."
      ],
      sideEffects: [
        "Mild fishy aftertaste may occur in some users.",
        "Take after meals to reduce digestive discomfort."
      ],
      precautions: [
        "Consult a physician if using blood thinning medication.",
        "Avoid if allergic to fish or marine ingredients."
      ]
    },
    gradient: "from-sky-950/85 via-slate-900 to-emerald-950",
    imageUrl: "/coq10_capsules.png"
  },
  "probiotic-digestive-care": {
    id: "probiotic-digestive-care",
    name: "Probiotic Digestive Care Capsules",
    category: "Daily Wellness",
    desc: "Daily probiotic blend with prebiotic fiber to support digestion, bloating control, and gut balance.",
    longDesc: "A dummy digestive wellness product for testing catalog behavior. Probiotic Digestive Care combines a multi-strain probiotic style profile with prebiotic fiber copy, helping you validate product descriptions, composition lists, cart flows, and detail-page content across a different wellness category.",
    highlight: "Digestive Balance & Bloating Support",
    price: 699,
    originalPrice: 899,
    rating: 4.5,
    reviews: 38,
    badge: "Dummy",
    inStock: true,
    boughtCount: "90+ bought in past month",
    tags: ["Gut Health", "Bloating Support", "Daily Use", "Prebiotic"],
    features: [
      { title: "Gut Balance", desc: "Supports daily digestive comfort" },
      { title: "Bloating Care", desc: "Helps maintain a lighter routine" },
      { title: "Prebiotic Fiber", desc: "Feeds beneficial gut flora" },
      { title: "Daily Capsule", desc: "Simple test product dosing" }
    ],
    composition: [
      { name: "Multi-Strain Probiotic Blend", dosage: "10 Billion CFU" },
      { name: "Fructooligosaccharides", dosage: "100 mg" },
      { name: "Digestive Enzyme Blend", dosage: "50 mg" }
    ],
    howToUse: [
      "Take 1 capsule daily",
      "Consume after breakfast",
      "Drink enough water during the day",
      "Use daily for 30 days"
    ],
    tip: "Tip: Keep intake consistent for better test visibility across repeat checkout flows.",
    whoCanUse: [
      "Supports digestive comfort after meals",
      "Helps maintain gut flora balance",
      "Useful for daily wellness routines",
      "Works alongside fiber-rich diets"
    ],
    doctorCertified: {
      name: "Dr. Kavya Menon",
      role: "Gastro Wellness Consultant",
      cert: "MD, Clinical Nutrition"
    },
    accordions: {
      benefits: [
        "Supports healthy gut microflora balance.",
        "Helps maintain digestive comfort and regularity."
      ],
      ingredients: [
        "Probiotic blend, prebiotic fiber, digestive enzyme blend."
      ],
      sideEffects: [
        "Temporary gas or mild bloating can occur initially.",
        "Usually settles as the body adjusts."
      ],
      precautions: [
        "Consult a physician if immunocompromised.",
        "Store in a cool and dry place."
      ]
    },
    gradient: "from-lime-950/85 via-emerald-900 to-slate-950",
    imageUrl: "/multivitamin_tablets.png"
  },
  "vitamin-d3-k2-drops": {
    id: "vitamin-d3-k2-drops",
    name: "Vitamin D3 + K2 Oral Drops",
    category: "Daily Wellness",
    desc: "Easy daily D3 and K2 drops designed to support bone strength, immunity, and calcium utilization.",
    longDesc: "A dummy liquid supplement created for testing non-capsule product layouts. Vitamin D3 + K2 Oral Drops are represented as a convenient daily drop format, helping validate pricing, product imagery, instructions, and wellness-category filtering in the store.",
    highlight: "Bone Strength & Immunity Support",
    price: 549,
    originalPrice: 749,
    rating: 4.7,
    reviews: 44,
    inStock: true,
    boughtCount: "150+ bought in past month",
    tags: ["Bone Support", "Immunity", "Daily Drops", "D3 K2"],
    features: [
      { title: "Bone Support", desc: "Supports healthy calcium utilization" },
      { title: "Immune Routine", desc: "Complements everyday wellness habits" },
      { title: "Drop Format", desc: "Easy to dose and test" },
      { title: "K2 Pairing", desc: "Designed for combined D3 support" }
    ],
    composition: [
      { name: "Vitamin D3", dosage: "1000 IU" },
      { name: "Vitamin K2 MK-7", dosage: "45 mcg" },
      { name: "MCT Oil Base", dosage: "q.s." }
    ],
    howToUse: [
      "Take 4 drops daily",
      "Use directly or mix with food",
      "Take after a meal",
      "Shake well before use"
    ],
    tip: "Tip: This dummy drop product helps test non-tablet instructions and product copy.",
    whoCanUse: [
      "Supports bone wellness routines",
      "Helps maintain vitamin D intake",
      "Pairs with calcium-rich diets",
      "Useful for daily immunity support"
    ],
    doctorCertified: {
      name: "Dr. Sana Kapoor",
      role: "Preventive Health Specialist",
      cert: "MBBS, Nutrition Medicine"
    },
    accordions: {
      benefits: [
        "Supports healthy bones and calcium metabolism.",
        "Complements daily immunity-focused wellness routines."
      ],
      ingredients: [
        "Vitamin D3, Vitamin K2 MK-7, MCT oil base."
      ],
      sideEffects: [
        "Generally well tolerated when used as directed.",
        "Excessive intake may cause vitamin D overload."
      ],
      precautions: [
        "Consult a doctor if using anticoagulant medication.",
        "Keep away from direct sunlight and children."
      ]
    },
    gradient: "from-amber-900/85 via-orange-900 to-slate-950",
    imageUrl: "/service_self_assessment.png"
  },
  "collagen-peptide-powder": {
    id: "collagen-peptide-powder",
    name: "Marine Collagen Peptide Powder",
    category: "Skin & Hair",
    desc: "Unflavoured collagen peptide powder for skin elasticity, nail strength, and hair wellness routines.",
    longDesc: "A dummy skin and hair product for broader store testing. Marine Collagen Peptide Powder is represented as an unflavoured powder format that helps validate long product names, skin-care filtering, powder-style usage instructions, and related product recommendations.",
    highlight: "Skin Elasticity, Nails & Hair Wellness",
    price: 1399,
    originalPrice: 1899,
    rating: 4.4,
    reviews: 29,
    badge: "New",
    inStock: true,
    boughtCount: "70+ bought in past month",
    tags: ["Collagen", "Skin Glow", "Hair Wellness", "Powder"],
    features: [
      { title: "Skin Elasticity", desc: "Supports routine skin wellness" },
      { title: "Nail Strength", desc: "Complements nail care habits" },
      { title: "Hair Routine", desc: "Pairs with nutrition-led hair care" },
      { title: "Powder Format", desc: "Useful for testing usage copy" }
    ],
    composition: [
      { name: "Hydrolyzed Marine Collagen Peptides", dosage: "5000 mg" },
      { name: "Vitamin C", dosage: "40 mg" },
      { name: "Hyaluronic Acid", dosage: "25 mg" }
    ],
    howToUse: [
      "Mix 1 scoop in water",
      "Can be added to smoothies",
      "Consume once daily",
      "Use consistently for 8 weeks"
    ],
    tip: "Tip: Add to cold drinks for easier dummy powder product testing.",
    whoCanUse: [
      "Supports skin elasticity routines",
      "Helps maintain nail wellness",
      "Complements hair nutrition plans",
      "Works well in daily beauty regimens"
    ],
    doctorCertified: {
      name: "Dr. Rhea Thomas",
      role: "Dermatology Nutrition Advisor",
      cert: "MD Dermatology, 9 Years Experience"
    },
    accordions: {
      benefits: [
        "Supports collagen intake in daily beauty routines.",
        "Pairs with vitamin C for collagen synthesis support."
      ],
      ingredients: [
        "Marine collagen peptides, vitamin C, hyaluronic acid."
      ],
      sideEffects: [
        "May not suit users with marine-source allergies.",
        "Mild digestive discomfort can occur initially."
      ],
      precautions: [
        "Avoid if allergic to fish or marine ingredients.",
        "Store sealed to prevent moisture exposure."
      ]
    },
    gradient: "from-rose-950/85 via-slate-900 to-emerald-950",
    imageUrl: "/biotin_gummies.png"
  }
};

// Customer Reviews List
const MOCK_REVIEWS = [
  {
    name: "Amit Sharma",
    rating: 5,
    daysAgo: "2 days ago",
    text: "Delayza has really helped me improve my stamina and confidence. Highly recommended! It took about 2 weeks to see substantial improvements, but it is totally worth it.",
    verified: true
  },
  {
    name: "Rohan Das",
    rating: 5,
    daysAgo: "5 days ago",
    text: "The composition is highly effective. The Shilajit and Ashwagandha in here are top-tier. Sourcing this directly saved me a lot of hassle. Ordering second batch today.",
    verified: true
  },
  {
    name: "Vikram Malhotra",
    rating: 4,
    daysAgo: "1 week ago",
    text: "Perfect clinical packaging. The product arrived inside a secure, highly discreet box. Excellent support panel from Duraup physicians during the review.",
    verified: true
  },
  {
    name: "Suresh Pillai",
    rating: 5,
    daysAgo: "2 weeks ago",
    text: "Outstanding formulation! I can see a massive upgrade in my daily physical recovery loops. The ATP muscle stamina gains are real. Doctor consult was included free.",
    verified: true
  }
];

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  // Dynamic product loader
  const product = PRODUCTS_DATA[id] || PRODUCTS_DATA["duraup-capsules"]; 
  const relatedProductsList = Object.values(PRODUCTS_DATA).filter((p) => p.id !== product.id).slice(0, 4);

  const [quantity, setQuantity] = useState<number>(1);
  const [selectedPackIndex, setSelectedPackIndex] = useState<number>(0);
  const [activeThumbnail, setActiveThumbnail] = useState<number>(0);
  const [activeReviewIndex, setActiveReviewIndex] = useState<number>(0);
  const [isZoomOpen, setIsZoomOpen] = useState<boolean>(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const productMedia = [
    { type: "image", url: product.imageUrl, thumb: product.imageUrl },
    { type: "image", url: "/service_pharmacy.png", thumb: "/service_pharmacy.png" },
    { type: "video", url: "https://www.w3schools.com/html/mov_bbb.mp4", thumb: "/service_health_vault.png" },
    { type: "image", url: "/coq10_capsules.png", thumb: "/coq10_capsules.png" },
  ];

  // Accordion toggle states
  const [expandedAccordions, setExpandedAccordions] = useState<Record<string, boolean>>({
    benefits: false,
    sideEffects: false,
    precautions: false
  });

  const [cartCount, setCartCount] = useState<number>(0);
  const [activeCartAlert, setActiveCartAlert] = useState<boolean>(false);

  const packOptions = [
    {
      title: "1 Pack (Single)",
      subtitle: "Standard pack",
      units: 1,
      price: product.price,
      originalPrice: product.originalPrice
    },
    {
      title: "Pack of 2",
      subtitle: `${Math.round(product.price * 0.95)} / pack`,
      units: 2,
      price: Math.round(product.price * 2 * 0.95),
      originalPrice: product.originalPrice * 2
    },
    {
      title: "Pack of 3",
      subtitle: `${Math.round(product.price * 0.88)} / pack`,
      units: 3,
      price: Math.round(product.price * 3 * 0.88),
      originalPrice: product.originalPrice * 3
    }
  ];
  const selectedPack = packOptions[selectedPackIndex];

  const incrementQty = () => setQuantity((prev) => prev + 1);
  const decrementQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    setCartCount((prev) => prev + quantity * selectedPack.units);
    setActiveCartAlert(true);
    setTimeout(() => {
      setActiveCartAlert(false);
    }, 3000);
  };

  // Mouse follow effect setup
  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      document.documentElement.style.setProperty('--mouse-x', (x * 100).toString());
      document.documentElement.style.setProperty('--mouse-y', (y * 100).toString());
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen bg-obsidian-bg text-slate-800 overflow-hidden font-sans pb-24 selection:bg-emerald-500/30 selection:text-emerald-300">
      
      {/* Custom Cursor */}
      <div 
        className="fixed top-0 left-0 w-6 h-6 rounded-full border-2 border-emerald-500/50 pointer-events-none z-[9999] transition-transform duration-75 mix-blend-difference"
        style={{ transform: `translate(${mousePos.x - 12}px, ${mousePos.y - 12}px)` }}
      />

      {/* Background Radial Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-blue-500/4 blur-[140px] pointer-events-none" />

      {/* Cart Toast Notification */}
      <div className="cursor-effect">
        {activeCartAlert && (
          <div className="fixed bottom-8 right-8 z-50 glass-panel p-4 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom duration-300 max-w-sm">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
              <Check className="w-4 h-4" />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-white">Prescription Cart Updated</p>
              <p className="text-[10px] text-gray-400 mt-0.5">{quantity}x {product.name} added.</p>
            </div>
            <button
              onClick={() => setActiveCartAlert(false)}
              className="text-gray-500 hover:text-white ml-2 p-1 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      <Header cartCount={cartCount} />

      <div className="mouse-effect">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 text-left">

        {/* breadcrumbs */}
        <div className="flex flex-wrap items-center gap-1.5 mb-6 text-xs text-gray-400">
          <Link href="/" className="hover:text-emerald-600 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 text-gray-600" />
          <Link href="/shop" className="hover:text-emerald-600 transition-colors">Shop</Link>
          <ChevronRight className="w-3 h-3 text-gray-600" />
          <span className="hover:text-emerald-600 transition-colors">{product.category}</span>
          <ChevronRight className="w-3 h-3 text-gray-600" />
          <span className="text-emerald-400 font-medium truncate max-w-[200px]">{product.name}</span>
        </div>

        {/* Dynamic Back Link */}
        <div className="mb-6">
          <Link href="/shop" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-emerald-600 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Marketplace
          </Link>
        </div>

        {/* ========================================================================= */}
        {/* --- DYNAMIC PRODUCT HERO MODULE (MATCHES USER'S EXACT SCREENSHOT) --- */}
        {/* ========================================================================= */}
        <motion.div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>

          {/* COLUMN 1 & 2: Thumbnails list + Central Visual Showcase container */}
          <div className="lg:col-span-5 flex flex-col gap-6">

            <div className="flex gap-4">
              {/* COLUMN 1.1: Vertical Thumbnails Selector (Media) */}
              <div className="flex flex-col gap-3 w-20 shrink-0">
                {productMedia.map((media, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveThumbnail(idx)}
                    className={`w-full aspect-square rounded-xl border flex items-center justify-center relative overflow-hidden transition-all cursor-pointer ${activeThumbnail === idx
                      ? "border-emerald-500 shadow-lg shadow-emerald-500/15 scale-105"
                      : "border-slate-200/60 hover:border-emerald-300 opacity-70 hover:opacity-100 bg-white"
                      }`}
                  >
                    <img src={media.thumb} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                    {media.type === 'video' && (
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center pl-0.5 shadow-md">
                          <Play className="w-3 h-3" />
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* COLUMN 1.2: Large Center Visual Showcase Frame */}
              <div className="flex-1 sm:flex-none relative flex items-center justify-center w-full sm:w-[356px] h-auto sm:h-[356px] aspect-square">
                {productMedia[activeThumbnail].type === 'video' ? (
                  <video
                    src={productMedia[activeThumbnail].url}
                    controls
                    className="w-full h-full object-cover rounded-3xl animate-in fade-in duration-300 shadow-lg border border-slate-200/50"
                  />
                ) : (
                  <div
                    className="relative w-full h-full group cursor-zoom-in animate-in fade-in duration-300"
                    onClick={() => setIsZoomOpen(true)}
                  >
                    <img
                      src={productMedia[activeThumbnail].url}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-3xl shadow-lg border border-slate-200/50"
                    />
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-900/40 backdrop-blur border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <ZoomIn className="w-5 h-5" />
                    </div>
                  </div>
                )}
              </div>
            </div> {/* END flex gap-4 */}

            {/* Pack selector */}
            <div className="space-y-3 pt-2 max-w-[452px]">
              <h3 className="text-xs font-extrabold text-slate-600 uppercase tracking-widest">Choose Your Pack</h3>
              <div className="flex flex-col gap-2.5">
                {packOptions.map((pack, idx) => {
                  const savings = pack.originalPrice - pack.price;

                  return (
                    <button
                      key={pack.title}
                      type="button"
                      onClick={() => setSelectedPackIndex(idx)}
                      className={`w-full rounded-2xl border px-4 py-3 text-left transition-all cursor-pointer flex items-center justify-between ${selectedPackIndex === idx
                        ? "border-emerald-500 bg-emerald-50/50 shadow-md ring-1 ring-emerald-500/20"
                        : "border-slate-200 bg-white hover:border-emerald-300 hover:bg-slate-50"
                        }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span
                          className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${selectedPackIndex === idx ? "border-emerald-600" : "border-slate-300"
                            }`}
                        >
                          {selectedPackIndex === idx && <span className="w-2 h-2 rounded-full bg-emerald-600" />}
                        </span>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sm font-extrabold text-slate-950">{pack.title}</span>
                            {idx > 0 && (
                              <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-emerald-700">
                                Save &#8377;{savings}
                              </span>
                            )}
                          </div>
                          <p className="mt-0.5 text-[11px] font-medium text-slate-500">
                            {idx === 0 ? pack.subtitle : <span className="text-emerald-700 font-bold">&#8377;{pack.subtitle}</span>}
                          </p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-lg font-black text-slate-950 leading-none">&#8377;{pack.price}</div>
                        <div className="text-[10px] text-slate-400 line-through leading-tight mt-0.5">&#8377;{pack.originalPrice}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* COLUMN 3: Right Side Copy Detail Options Box */}
          <div className="lg:col-span-7 space-y-6 text-left">

            {/* Header info */}
            <div className="space-y-3">
              {product.badge && (
                <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {product.badge}
                </span>
              )}

              <h1 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-slate-950 leading-none">
                {product.name}
              </h1>

              <p className="max-w-2xl text-sm text-slate-650 leading-6">
                {product.desc}
              </p>

              {/* Rating metrics strip */}
              <div className="flex flex-wrap items-center gap-2 text-xs pt-1">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <span className="font-extrabold text-slate-800">{product.rating}</span>
                <span className="text-slate-600">({product.reviews} reviews)</span>
                <span className="text-slate-400">|</span>
                <span className="text-emerald-700 font-semibold">{product.boughtCount}</span>
              </div>
            </div>

            {/* Pricing details */}
            <div className="space-y-1.5 border-t border-slate-200 pt-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-emerald-400">&#8377;{selectedPack.price}</span>
                <span className="text-sm text-slate-450 line-through">&#8377;{selectedPack.originalPrice}</span>
                <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded uppercase tracking-wider">
                  {Math.round(((selectedPack.originalPrice - selectedPack.price) / selectedPack.originalPrice) * 100)}% OFF
                </span>
              </div>
              <p className="text-[10px] text-slate-400">Inclusive of all taxes</p>
            </div>

            {/* Stock and Shipping logs */}
            <div className="flex items-center gap-2 text-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping pointer-events-none" />
              <span className="font-bold text-slate-800">In Stock</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-700">Usually delivered in 2-4 days</span>
            </div>

            {/* Quantity adjustment & Actions row */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Quantity</span>
                <div className="flex items-center border border-slate-200 bg-white rounded-lg px-2 py-1 gap-3">
                  <button
                    onClick={decrementQty}
                    className="w-5 h-5 rounded bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors cursor-pointer"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-xs font-bold text-slate-900 w-4 text-center tabular-nums">{quantity}</span>
                  <button
                    onClick={incrementQty}
                    className="w-5 h-5 rounded bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Instant purchase checkout triggers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <button
                  onClick={handleAddToCart}
                  className="py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:brightness-110 text-white text-xs font-extrabold uppercase tracking-widest flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" /> Add To Cart
                </button>
                <button
                  onClick={handleAddToCart}
                  className="py-3 px-4 rounded-xl bg-white hover:bg-gray-100 text-slate-950 text-xs font-extrabold uppercase tracking-widest flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                >
                  <Sparkle className="w-4 h-4 fill-slate-950" /> Buy Now
                </button>
              </div>
            </div>

            {/* Secure Checkouts Seals list */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-[8px] text-slate-600 font-extrabold uppercase tracking-wider">
              <div className="flex items-center gap-1.5 p-2 rounded bg-white border border-slate-200">
                <Lock className="w-3 h-3 text-emerald-400 shrink-0" /> SSL Secured
              </div>
              <div className="flex items-center gap-1.5 p-2 rounded bg-white border border-slate-200">
                <Award className="w-3 h-3 text-emerald-400 shrink-0" /> 100% Original
              </div>
              <div className="flex items-center gap-1.5 p-2 rounded bg-white border border-slate-200">
                <RotateCcw className="w-3 h-3 text-emerald-400 shrink-0" /> Easy Returns
              </div>
              <div className="flex items-center gap-1.5 p-2 rounded bg-white border border-slate-200">
                <Shield className="w-3 h-3 text-emerald-600 shrink-0" /> Discreet Pack
              </div>
            </div>

            {/* Delivery estimation panel */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 animate-pulse" />
                <div>
                  <h5 className="font-bold text-slate-800">Delivery By</h5>
                  <p className="text-[11px] text-emerald-650 font-extrabold mt-0.5">Tomorrow, 25 May</p>
                  <p className="text-[9px] text-slate-500 mt-0.5">If you order within 2h 15m</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Truck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-slate-800">Free Delivery</h5>
                  <p className="text-[11px] text-slate-650 mt-0.5">On all orders above ₹499</p>
                </div>
              </div>
            </div>

          </div>

        </motion.div>

        {/* ========================================================================= */}
        {/* --- 3-COLUMNS DETAILED SPECIFICATIONS ROW (PREMIUM REDESIGN) --- */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-16"
        >
          {/* ── Card 1: Product Description ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group relative rounded-[20px] border border-slate-200/80 bg-white overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-emerald-200/60 transition-all duration-500"
          >
            {/* Gradient header strip */}
            <div className="h-1.5 bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500" />
            <div className="p-6 flex flex-col min-h-[320px]">
              {/* Header */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                  <FileText className="w-4.5 h-4.5 text-white" />
                </div>
                <div>
                  <h3 className="text-[13px] font-extrabold text-slate-900 tracking-tight">Product Description</h3>
                  <p className="text-[9px] text-slate-400 font-semibold uppercase tracking-widest">Overview</p>
                </div>
              </div>
              {/* Body */}
              <p className="text-[13px] text-slate-600 leading-[1.85] flex-1">{product.desc}</p>
              {/* Bottom accent */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2">
                <div className="flex -space-x-1">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <div className="w-2 h-2 rounded-full bg-teal-400" />
                  <div className="w-2 h-2 rounded-full bg-cyan-400" />
                </div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Clinically Formulated</span>
              </div>
            </div>
          </motion.div>

          {/* ── Card 2: How to Use ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="group relative rounded-[20px] border border-slate-200/80 bg-white overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-emerald-200/60 transition-all duration-500"
          >
            {/* Gradient header strip */}
            <div className="h-1.5 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500" />
            <div className="p-6 flex flex-col min-h-[320px]">
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                    <BookOpen className="w-4.5 h-4.5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-[13px] font-extrabold text-slate-900 tracking-tight">How to Use</h3>
                    <p className="text-[9px] text-slate-400 font-semibold uppercase tracking-widest">Step-by-step</p>
                  </div>
                </div>
                <span className="text-[8px] font-extrabold uppercase tracking-wider text-indigo-600 bg-indigo-500/8 border border-indigo-500/15 rounded-full px-2.5 py-1">Guide</span>
              </div>
              {/* Steps with connecting line */}
              <div className="relative flex-1">
                <div className="absolute left-[15px] top-4 bottom-4 w-px bg-gradient-to-b from-blue-200 via-indigo-200 to-transparent" />
                <div className="space-y-4">
                  {product.howToUse.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3.5 relative">
                      <div className="relative z-10 w-[30px] h-[30px] rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-[11px] font-black text-white shadow-md shadow-blue-500/25 shrink-0">
                        {idx + 1}
                      </div>
                      <div className="pt-1 min-w-0">
                        <p className="text-[12px] text-slate-700 leading-relaxed font-medium">{step}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Tip box */}
              <div className="mt-5 p-3.5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/60 rounded-xl flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-amber-400/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-3 h-3 text-amber-600" />
                </div>
                <p className="text-[10px] text-amber-800 leading-relaxed font-semibold">{product.tip}</p>
              </div>
            </div>
          </motion.div>

          {/* ── Card 3: How It Works ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="group relative rounded-[20px] border border-slate-200/80 bg-white overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-emerald-200/60 transition-all duration-500"
          >
            {/* Gradient header strip */}
            <div className="h-1.5 bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-600" />
            <div className="p-6 flex flex-col min-h-[320px]">
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                    <Zap className="w-4.5 h-4.5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-[13px] font-extrabold text-slate-900 tracking-tight">How It Works</h3>
                    <p className="text-[9px] text-slate-400 font-semibold uppercase tracking-widest">Mechanism</p>
                  </div>
                </div>
                <span className="text-[8px] font-extrabold uppercase tracking-wider text-emerald-600 bg-emerald-500/8 border border-emerald-500/15 rounded-full px-2.5 py-1">Flow</span>
              </div>
              {/* Steps */}
              <div className="space-y-3 flex-1">
                {product.whoCanUse.map((dem, idx) => {
                  const icons = [Activity, TrendingUp, Clock, CheckCircle2];
                  const Icon = icons[idx] || CheckCircle2;
                  const colors = [
                    "from-emerald-400 to-teal-500",
                    "from-blue-400 to-cyan-500",
                    "from-purple-400 to-indigo-500",
                    "from-amber-400 to-orange-500"
                  ];
                  return (
                    <div key={idx} className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50/80 border border-slate-100 hover:bg-emerald-50/50 hover:border-emerald-200/40 transition-all duration-300">
                      <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${colors[idx]} flex items-center justify-center shrink-0 shadow-sm`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[8px] font-extrabold uppercase tracking-widest text-slate-400 mb-0.5">Step {idx + 1}</div>
                        <p className="text-[11px] text-slate-700 leading-snug font-medium">{dem}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* Doctor recommendation */}
              <div className="mt-5 p-3.5 rounded-2xl bg-gradient-to-r from-slate-50 to-emerald-50/50 border border-emerald-100/60 flex gap-3.5 items-center">
                <div className="relative">
                  <img src="/clinical_doctor_portrait.png" alt={product.doctorCertified.name} className="w-11 h-11 rounded-full object-cover shrink-0 ring-2 ring-emerald-400/40 ring-offset-2" />
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center">
                    <CheckCircle2 className="w-2.5 h-2.5 text-white" />
                  </div>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[7px] text-emerald-600 uppercase tracking-[0.15em] font-extrabold block">Recommended by</span>
                  <h5 className="text-[11px] font-extrabold text-slate-900">{product.doctorCertified.name}</h5>
                  <p className="text-[9px] text-emerald-700 font-semibold">{product.doctorCertified.role}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>


        {/* ========================================================================= */}
        {/* --- DETAILED CUSTOMER REVIEWS --- */}
        {/* ========================================================================= */}
        {/* --- SAFETY INFORMATION: SIDE EFFECTS & PRECAUTIONS --- */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <motion.div
            className="glass-panel p-6 rounded-3xl border border-slate-100 bg-white shadow-sm hover:shadow-lg transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <h4 className="text-sm font-bold text-slate-900 uppercase mb-2">Side Effects</h4>
            <ul className="list-disc list-inside text-xs text-slate-600 space-y-1">
              {product.accordions.sideEffects.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            className="glass-panel p-6 rounded-3xl border border-slate-100 bg-white shadow-sm hover:shadow-lg transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <h4 className="text-sm font-bold text-slate-900 uppercase mb-2">Precautions</h4>
            <ul className="list-disc list-inside text-xs text-slate-600 space-y-1">
              {product.accordions.precautions.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
        {/* --- DETAILED CUSTOMER REVIEWS --- */}
        <motion.div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start text-left" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>

          {/* Customer Reviews & Star metrics */}
          <div className="lg:col-span-12 glass-panel p-6 rounded-3xl border border-slate-100 bg-white space-y-6 text-left min-h-[385px] flex flex-col justify-between shadow-sm">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Customer Reviews</h3>
              <span className="text-xs text-emerald-600 font-semibold cursor-pointer hover:underline">View all</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">

              {/* Rating Big Number */}
              <div className="sm:col-span-5 text-center space-y-2 border-r border-slate-100 sm:pr-4">
                <div className="text-5xl font-black text-slate-900 font-display">{product.rating}</div>
                <div className="flex justify-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <div className="text-[10px] text-slate-500 uppercase font-extrabold tracking-wider">Based on {product.reviews} reviews</div>
              </div>

              {/* Progress Bars Chart */}
              <div className="sm:col-span-7 space-y-1.5 text-xs text-slate-600 font-semibold">
                {[
                  { stars: 5, pct: 87 },
                  { stars: 4, pct: 9 },
                  { stars: 3, pct: 2 },
                  { stars: 2, pct: 1 },
                  { stars: 1, pct: 1 }
                ].map((row) => (
                  <div key={row.stars} className="flex items-center gap-3">
                    <span className="w-2">{row.stars}</span>
                    <Star className="w-3 h-3 text-slate-350 fill-slate-350 shrink-0" />
                    <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500"
                        style={{ width: `${row.pct}%` }}
                      />
                    </div>
                    <span className="w-7 text-right tabular-nums text-[10px] text-slate-500">{row.pct}%</span>
                  </div>
                ))}
              </div>

            </div>

            {/* Testimonial Active Slider Quote bubble */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 relative min-h-[120px] flex flex-col justify-between mt-2">
              <div className="absolute top-4 right-6 text-emerald-500/10 font-serif text-6xl leading-none select-none">“</div>

              <div className="space-y-4 z-10">
                <div className="flex justify-between items-center">
                  <div>
                    <h5 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      {MOCK_REVIEWS[activeReviewIndex].name}
                      {MOCK_REVIEWS[activeReviewIndex].verified && (
                        <span className="text-[8px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 px-1.5 py-0.5 rounded font-extrabold uppercase tracking-wider">Verified Buyer</span>
                      )}
                    </h5>
                    <span className="text-[9px] text-slate-500">{MOCK_REVIEWS[activeReviewIndex].daysAgo}</span>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(MOCK_REVIEWS[activeReviewIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                </div>

                <p className="text-xs text-slate-650 italic leading-relaxed">
                  &quot;{MOCK_REVIEWS[activeReviewIndex].text}&quot;
                </p>
              </div>

              {/* Slider Dots */}
              <div className="flex justify-center gap-2 pt-4">
                {MOCK_REVIEWS.map((_, rIdx) => (
                  <button
                    key={rIdx}
                    onClick={() => setActiveReviewIndex(rIdx)}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${activeReviewIndex === rIdx ? "w-6 bg-emerald-600" : "w-1.5 bg-slate-200"
                      }`}
                  />
                ))}
              </div>

            </div>

          </div>

        </motion.div>

        {/* ========================================================================= */}
        {/* --- "YOU MAY ALSO LIKE" RELATED PRODUCTS CAROUSEL --- */}
        {/* ========================================================================= */}
        <motion.section className="border-t border-slate-100 pt-12 mb-12 text-left" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-extrabold font-display text-slate-900 tracking-tight">You May Also Like</h3>
            <div className="flex gap-1.5">
              <button className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 cursor-pointer hover:bg-slate-100">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 cursor-pointer hover:bg-slate-100">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">{relatedProductsList.map((rec, idx) => (
            
              <div className="glass-panel rounded-2xl overflow-hidden border border-slate-100 bg-white flex flex-col justify-between hover:border-emerald-500/20 hover:bg-slate-50/50 transition-all duration-300 group hover:-translate-y-1 shadow-sm">
                {/* Product illustration */}
                <div className="h-36 bg-gradient-to-br from-emerald-500/[0.03] via-slate-50 to-blue-500/[0.03] border-b border-slate-100 relative overflow-hidden flex items-center justify-center">
                  <img src={['https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?q=80&w=940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D','https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D','https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=437&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D','https://images.unsplash.com/photo-1628771065518-0d82f1938462?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D','https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=879&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'][idx % 5]} alt="Product image" className="relative w-full h-full object-cover" />
                </div>
                {/* Info block */}
                <div className="p-4 space-y-3.5 flex-1 flex flex-col justify-between text-left">
                  <div className="space-y-1.5">
                    <span className="text-[9px] text-emerald-600 font-bold uppercase tracking-widest">{rec.category}</span>
                    <h4 className="text-xs font-bold text-slate-800 line-clamp-1 group-hover:text-emerald-600 transition-colors">{rec.name}</h4>
                    <p className="text-[10px] text-slate-500 leading-relaxed line-clamp-1">{rec.highlight}</p>
                  </div>
                  <div className="flex items-center justify-between pt-2.5 border-t border-slate-100">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xs font-bold text-slate-900">₹{rec.price}</span>
                      <span className="text-[9px] text-slate-450 line-through">₹{rec.originalPrice}</span>
                    </div>
                    <Link href={`/shop/${rec.id}`} className="px-3 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-600 border border-emerald-500/20 hover:border-emerald-600 text-emerald-700 hover:text-white text-[9px] font-extrabold uppercase tracking-wider transition-all">View</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ========================================================================= */}
        {/* --- HORIZONTAL QUALITY TRUST FOOTER STRIP --- */}
        {/* ========================================================================= */}
        <motion.div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-12 border-t border-slate-100 mb-16 text-left" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          {[
            { title: "100% Authentic", desc: "Original Products", icon: CheckCircle2 },
            { title: "Secure Payments", desc: "100% Safe & Secure", icon: Lock },
            { title: "Easy Returns", desc: "Hassle-free Returns", icon: RotateCcw },
            { title: "Discreet Packaging", desc: "Privacy Protected", icon: Shield },
            { title: "Customer Support", desc: "+91 75900 12345", icon: Phone }
          ].map((item, idx) => (
            <div key={idx} className="flex gap-2.5 items-center">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-650 shrink-0">
                <item.icon className="w-4 h-4" />
              </div>
              <div className="leading-tight">
                <h4 className="text-[10px] font-extrabold text-slate-800 uppercase tracking-wider">{item.title}</h4>
                <p className="text-[9px] text-slate-500 mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* ========================================================================= */}
        {/* --- STAY UPDATED NEWSLETTER FOOTER --- */}
        {/* ========================================================================= */}
        <motion.div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-8 md:p-12 bg-slate-50 border border-slate-200 rounded-3xl mb-8 items-center text-left" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>

          <div className="md:col-span-5 space-y-2">
            <h4 className="text-base font-extrabold text-slate-900 uppercase tracking-widest">Stay Updated</h4>
            <p className="text-xs text-slate-650 leading-normal">
              Get exclusive offers and health tips straight to your inbox.
            </p>
          </div>

          <div className="md:col-span-5">
            <form onSubmit={(e) => e.preventDefault()} className="relative">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full pl-4 pr-12 py-3 rounded-xl text-xs text-slate-850 bg-white border border-slate-200 focus:outline-none focus:border-emerald-500 text-left"
                required
              />
              <button
                type="submit"
                className="absolute right-2 top-2 p-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          <div className="md:col-span-2 flex flex-col items-start md:items-end gap-2.5">
            <span className="text-[9px] text-slate-500 uppercase tracking-widest font-extrabold">Follow Us</span>
            <div className="flex gap-3 text-slate-500">
              <a href="#" className="hover:text-emerald-400 transition-colors">
                <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                </svg>
              </a>
              <a href="#" className="hover:text-emerald-400 transition-colors">
                <svg className="w-4.5 h-4.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="#" className="hover:text-emerald-400 transition-colors">
                <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.507 9.388.507 9.388.507s7.517 0 9.388-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

        

        </main>
      </div>

      {/* Fullscreen Zoom Modal */}
      {isZoomOpen && productMedia[activeThumbnail].type === 'image' && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <button
            onClick={() => setIsZoomOpen(false)}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors border border-white/20 cursor-pointer z-50"
          >
            <X className="w-6 h-6" />
          </button>

          <img
            src={productMedia[activeThumbnail].url}
            alt="Zoomed"
            className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)]"
          />
        </div>
      )}
    </div>
    <style jsx>{`
      .mouse-effect { cursor: none; }
      .mouse-effect::before {
        content: '';
        position: fixed;
        top: var(--mouse-y, 0);
        left: var(--mouse-x, 0);
        width: 120px;
        height: 120px;
        background: radial-gradient(circle at center, rgba(0,255,180,0.2), transparent 70%);
        transform: translate(-50%, -50%);
        pointer-events: none;
        mix-blend-mode: overlay;
        border-radius: 50%;
        transition: background 0.2s ease;
      }
      @media (prefers-reduced-motion: reduce) {
        .mouse-effect::before { animation: none; }
      }
    `}</style>
  );
}
