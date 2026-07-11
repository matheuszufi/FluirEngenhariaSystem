import { useState, useEffect } from 'react'
import { ref, onValue } from 'firebase/database'
import { rtdb } from '../firebase'

export default function Portfolio() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onValue(ref(rtdb, 'portfolio'), (snap) => {
      if (snap.exists()) {
        const items = Object.entries(snap.val())
          .map(([id, v]) => ({ id, ...v }))
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        setProjects(items)
      } else {
        setProjects([])
      }
      setLoading(false)
    })
    return () => unsub()
  }, [])

  if (loading || projects.length === 0) return null

  return (
    <section className="portfolio" id="portfolio">
      <div className="container">
        <p className="section-tag section-tag--light">Portfólio</p>
        <h2 className="section-title section-title--light">
          Nossos projetos falam por si.
        </h2>
        <div className="portfolio__grid">
          {projects.map((p) => (
            <div className="portfolio__card" key={p.id}>
              <div className="portfolio__img-wrap">
                {p.imageUrl
                  ? <img src={p.imageUrl} alt={p.name} loading="lazy" />
                  : <div className="portfolio__img-placeholder" />
                }
                {p.tag && <span className="portfolio__tag">{p.tag}</span>}
              </div>
              <div className="portfolio__info">
                <h3 className="portfolio__name">{p.name}</h3>
                <p className="portfolio__client">{p.client}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="portfolio__cta">
          <a href="/" className="btn btn--outline-light" onClick={(e) => { e.preventDefault(); document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' }) }}>VER TODOS OS PROJETOS</a>
        </div>
      </div>
    </section>
  )
}
