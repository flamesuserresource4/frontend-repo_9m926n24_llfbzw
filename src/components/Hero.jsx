import { useState } from 'react'

export default function Hero({ onStart }) {
  const [brand, setBrand] = useState('LookLab')

  return (
    <section className="relative overflow-hidden">
      <div className="text-center mb-10">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white">
          AI Virtual Try‑On Studio
        </h1>
        <p className="mt-4 text-lg text-blue-200/90 max-w-2xl mx-auto">
          Let shoppers see themselves wearing any outfit in seconds. Mix tops, bottoms, accessories, shoes and backgrounds — then generate a shareable image or short modelling video.
        </p>
      </div>
      <div className="flex items-center justify-center gap-3">
        <button onClick={onStart} className="px-5 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-medium shadow-lg shadow-blue-500/30 transition">
          Start a Try‑On
        </button>
        <a href="#catalog" className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium border border-white/10 transition">
          Browse Catalog
        </a>
      </div>
    </section>
  )
}
