import { useState, useEffect } from 'react'
import { ref, onValue } from 'firebase/database'
import { rtdb } from '../firebase'

export default function Clients() {
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onValue(ref(rtdb, 'clients'), (snap) => {
      if (snap.exists()) {
        const items = Object.entries(snap.val())
          .map(([id, v]) => ({ id, ...v }))
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        setClients(items)
      } else {
        setClients([])
      }
      setLoading(false)
    })
    return () => unsub()
  }, [])

  if (loading || clients.length === 0) return null

  return (
    <section className="clients">
      <div className="container">
        <p className="section-tag">Parceiros</p>
        <h2 className="section-title">Nossos clientes</h2>
        <div className="clients__grid">
          {clients.map((c) => (
            <div className="clients__logo" key={c.id}>
              {c.logoUrl
                ? <img src={c.logoUrl} alt={c.name} className="clients__logo-img" />
                : <span>{c.name}</span>
              }
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
