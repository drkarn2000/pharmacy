'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ShoppingCart,
  Star,
  ShieldCheck,
  Truck,
  HeartPulse,
  Clock3,
  Leaf,
  ChevronDown,
  BadgeCheck,
  Check,
  Send,
} from 'lucide-react'

const gallery = [
  'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=1200&auto=format&fit=crop',
]

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-[#020817] text-white overflow-hidden">

      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.15),transparent_40%)] pointer-events-none" />

      <header className="sticky top-0 z-50 backdrop-blur-2xl border-b border-white/10 bg-[#020817]/80">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-emerald-400">
              DURAP
            </h1>
            <p className="text-[10px] tracking-[4px] text-slate-500 uppercase">
              Wellness
            </p>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm text-slate-300">
            <Link href="#">Home</Link>
            <Link href="#">Shop</Link>
            <Link href="#">About</Link>
            <Link href="#">Contact</Link>
          </nav>

          <button className="px-5 py-2 rounded-xl border border-white/10 bg-white/5">
            Login
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">

        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-emerald-400 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          <div className="flex gap-4">

            <div className="hidden sm:flex flex-col gap-4">
              {gallery.map((img, idx) => (
                <div
                  key={idx}
                  className="w-24 h-24 rounded-2xl overflow-hidden border border-emerald-500/20 bg-white/5"
                >
                  <Image
                    src={img}
                    alt="thumb"
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 rounded-[34px] overflow-hidden border border-emerald-500/20 bg-white/5"
            >
              <Image
                src={gallery[0]}
                alt="product"
                width={1400}
                height={1400}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-5">
              <BadgeCheck className="w-4 h-4" />
              Best Seller
            </div>

            <h1 className="text-6xl font-black">
              Delayza Wellness
            </h1>

            <p className="text-slate-300 text-lg mt-5">
              Premium stamina and performance support formula designed with Ayurvedic ingredients.
            </p>

            <div className="flex items-center gap-4 mt-5">
              <div className="flex gap-1 text-yellow-400">
                {[1,2,3,4,5].map((i)=>(
                  <Star key={i} className="w-4 h-4 fill-yellow-400" />
                ))}
              </div>

              <span className="text-slate-400">
                4.8 (128 Reviews)
              </span>
            </div>

            <div className="mt-8 flex items-end gap-4">
              <h2 className="text-6xl font-black text-emerald-400">
                699
              </h2>

              <span className="text-slate-500 line-through text-2xl">
                999
              </span>

              <span className="px-4 py-1 rounded-full bg-emerald-500 text-black font-bold text-sm">
                30% OFF
              </span>
            </div>

            <div className="flex gap-4 flex-wrap mt-8">

              <button className="flex-1 min-w-[220px] inline-flex items-center justify-center gap-2 px-8 py-5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold">
                <ShoppingCart className="w-5 h-5" />
                Add To Cart
              </button>

              <button className="flex-1 min-w-[220px] px-8 py-5 rounded-2xl border border-white/10 bg-white/5">
                Buy Now
              </button>

            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">

              <div className="rounded-2xl p-5 border border-white/10 bg-white/5">
                <div className="flex items-center gap-3 text-emerald-400">
                  <Truck className="w-5 h-5" />
                  <span>Free Delivery</span>
                </div>
              </div>

              <div className="rounded-2xl p-5 border border-white/10 bg-white/5">
                <div className="flex items-center gap-3 text-emerald-400">
                  <ShieldCheck className="w-5 h-5" />
                  <span>100% Original</span>
                </div>
              </div>

            </div>
          </motion.div>
        </div>

      </main>
    </div>
  )
}
