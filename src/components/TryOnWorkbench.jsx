import { useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

export default function TryOnWorkbench() {
  const [userImage, setUserImage] = useState('')
  const [selections, setSelections] = useState({ accessory_ids: [] })
  const [starting, setStarting] = useState(false)
  const [job, setJob] = useState(null)

  const handleStart = async () => {
    if (!userImage) return
    setStarting(true)
    try {
      const res = await fetch(`${API_BASE}/api/looks/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_image_url: userImage, ...selections, animate: false })
      })
      const data = await res.json()
      setJob(data)
    } catch (e) {
      console.error(e)
    } finally {
      setStarting(false)
    }
  }

  return (
    <section className="grid md:grid-cols-2 gap-6">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
        <h3 className="text-white font-semibold mb-3">Your Photo</h3>
        <input
          type="url"
          placeholder="Paste a full‑body image URL"
          value={userImage}
          onChange={(e)=>setUserImage(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-slate-900/70 border border-white/10 text-white placeholder:text-blue-200/50 mb-3"
        />
        <div className="aspect-[3/4] w-full rounded-xl overflow-hidden bg-slate-900/60 flex items-center justify-center">
          {userImage ? (
            <img src={userImage} alt="user" className="w-full h-full object-cover" />
          ) : (
            <p className="text-blue-200/70 text-sm">Add an image URL to preview</p>
          )}
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
        <h3 className="text-white font-semibold mb-3">Selections</h3>
        <pre className="text-xs text-blue-200/80 bg-slate-900/60 p-3 rounded-lg border border-white/10 overflow-auto max-h-52">{JSON.stringify(selections, null, 2)}</pre>
        <button onClick={handleStart} disabled={!userImage || starting} className="mt-4 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white font-medium">
          {starting ? 'Starting...' : 'Generate Look'}
        </button>
        {job && (
          <div className="mt-3 text-blue-100 text-sm">Job started: <span className="font-mono">{job.job_id}</span> • {job.status}</div>
        )}
      </div>
    </section>
  )
}
