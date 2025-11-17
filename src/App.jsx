import { useState, useEffect } from 'react'
import Hero from './components/Hero'
import Catalog from './components/Catalog'
import TryOnWorkbench from './components/TryOnWorkbench'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

function App() {
  const [showBuilder, setShowBuilder] = useState(false)
  const [selections, setSelections] = useState({ accessory_ids: [] })
  const [seeded, setSeeded] = useState(false)

  useEffect(() => {
    // Seed some demo items if catalog empty (one-time best-effort)
    async function seed() {
      try {
        const res = await fetch(`${API_BASE}/api/items`)
        const items = await res.json()
        if (Array.isArray(items) && items.length === 0) {
          const demo = [
            { name: 'Classic White Tee', brand: 'LookLab', category: 'top', price: 24, image_url: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop' },
            { name: 'Navy Blazer', brand: 'LookLab', category: 'top', price: 129, image_url: 'https://images.unsplash.com/photo-1520975922284-9d06a1f30b15?q=80&w=800&auto=format&fit=crop' },
            { name: 'Black Jeans', brand: 'LookLab', category: 'bottom', price: 59, image_url: 'https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=800&auto=format&fit=crop' },
            { name: 'Beige Chinos', brand: 'LookLab', category: 'bottom', price: 54, image_url: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=800&auto=format&fit=crop' },
            { name: 'White Sneakers', brand: 'LookLab', category: 'shoes', price: 79, image_url: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=800&auto=format&fit=crop' },
            { name: 'Leather Belt', brand: 'LookLab', category: 'accessory', price: 35, image_url: 'https://images.unsplash.com/photo-1620799139504-5f99b51d82ad?q=80&w=800&auto=format&fit=crop' },
            { name: 'City Loft', brand: 'LookLab', category: 'background', price: 0, image_url: 'https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop' },
          ]
          await Promise.all(demo.map(async (d) => {
            await fetch(`${API_BASE}/api/items`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(d) })
          }))
        }
      } catch (e) {
        console.warn('Seed skipped', e)
      } finally {
        setSeeded(true)
      }
    }
    if (!seeded) seed()
  }, [seeded])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-blue-100">
      <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
        <Hero onStart={() => setShowBuilder(true)} />

        {showBuilder && (
          <>
            <TryOnWorkbench />
            <Catalog selections={selections} setSelections={setSelections} />
          </>
        )}

        {!showBuilder && (
          <div className="text-center opacity-80">
            <p>Use the button above to start a try‑on. A small demo catalog will auto‑populate for testing.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
