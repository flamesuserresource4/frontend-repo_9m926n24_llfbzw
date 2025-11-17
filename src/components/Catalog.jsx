import { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

function CategoryTabs({ active, onChange }) {
  const tabs = [
    { key: 'top', label: 'Tops' },
    { key: 'bottom', label: 'Bottoms' },
    { key: 'shoes', label: 'Shoes' },
    { key: 'accessory', label: 'Accessories' },
    { key: 'background', label: 'Backgrounds' },
  ]
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {tabs.map(t => (
        <button
          key={t.key}
          onClick={() => onChange(t.key)}
          className={`px-3 py-2 rounded-lg text-sm border ${active===t.key? 'bg-blue-600 text-white border-blue-500':'bg-white/5 text-blue-100 border-white/10 hover:bg-white/10'}`}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}

function ItemCard({ item, selected, onSelect }) {
  return (
    <button onClick={() => onSelect(item)} className={`group w-full text-left p-3 rounded-xl border transition ${selected? 'border-blue-400 bg-blue-500/10':'border-white/10 bg-white/5 hover:bg-white/10'}`}>
      <div className="aspect-[4/5] w-full overflow-hidden rounded-lg bg-slate-900">
        <img src={item.image_url} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition" />
      </div>
      <div className="mt-2 flex items-center justify-between">
        <div>
          <p className="text-sm text-white/90 font-medium">{item.name}</p>
          {item.brand && <p className="text-xs text-blue-200/70">{item.brand}</p>}
        </div>
        {item.price != null && <p className="text-sm text-blue-100">${item.price}</p>}
      </div>
    </button>
  )
}

export default function Catalog({ selections, setSelections }) {
  const [active, setActive] = useState('top')
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchItems() {
      setLoading(true)
      try {
        const res = await fetch(`${API_BASE}/api/items?category=${active}`)
        const data = await res.json()
        setItems(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchItems()
  }, [active])

  const handleSelect = (item) => {
    const key = item.category === 'accessory' ? 'accessory_ids' : `${item.category}_id`
    if (item.category === 'accessory') {
      const curr = new Set(selections.accessory_ids || [])
      if (curr.has(item.id)) curr.delete(item.id); else curr.add(item.id)
      setSelections({ ...selections, accessory_ids: Array.from(curr) })
    } else {
      setSelections({ ...selections, [key]: item.id })
    }
  }

  const isSelected = (item) => {
    if (item.category === 'accessory') return (selections.accessory_ids||[]).includes(item.id)
    const key = `${item.category}_id`
    return selections[key] === item.id
  }

  return (
    <section id="catalog">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold text-white">Catalog</h2>
        <CategoryTabs active={active} onChange={setActive} />
      </div>
      {loading ? (
        <p className="text-blue-200">Loading...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map(it => (
            <ItemCard key={it.id} item={it} selected={isSelected(it)} onSelect={handleSelect} />
          ))}
        </div>
      )}
    </section>
  )
}
