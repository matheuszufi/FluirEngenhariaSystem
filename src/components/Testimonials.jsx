import { useState, useEffect } from 'react'
import { ref, onValue } from 'firebase/database'
import { rtdb } from '../firebase'

export default function Testimonials() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const unsub = onValue(ref(rtdb, 'testimonials'), (snap) => {
      if (snap.exists()) {
        const data = Object.entries(snap.val())
          .map(([id, v]) => ({ id, ...v }))
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        setItems(data)
        setCurrent(0)
      } else {
        setItems([])
      }
      setLoading(false)
    })
    return () => unsub()
  }, [])

  if (loading || items.length === 0) return null

  const t = items[current]
  const prev = () => setCurrent((c) => (c === 0 ? items.length - 1 : c - 1))
  const next = () => setCurrent((c) => (c === items.length - 1 ? 0 : c + 1))

  return (
    <section className="testimonials">
      <div className="container">
        <p className="section-tag">Depoimentos</p>
        <h2 className="section-title">O que nossos clientes dizem</h2>

        <div className="testimonials__wrapper">
          <button className="testimonials__arrow testimonials__arrow--prev" onClick={prev} aria-label="Anterior">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div className="testimonials__card">
            <div className="testimonials__header">
              <div className="testimonials__avatar">{t.avatar}</div>
              <div className="testimonials__info">
                <strong>{t.name}</strong>
                <span>{t.company}</span>
                <span className="testimonials__role">{t.role}</span>
              </div>
            </div>
            <div className="testimonials__stars">
              {Array.from({ length: t.stars ?? 5 }).map((_, i) => (
                <svg key={i} viewBox="0 0 24 24" fill="#FF6500">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ))}
            </div>
            <p className="testimonials__text">"{t.text}"</p>
          </div>

          <button className="testimonials__arrow testimonials__arrow--next" onClick={next} aria-label="Próximo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        <div className="testimonials__dots">
          {items.map((_, i) => (
            <button
              key={i}
              className={`testimonials__dot${i === current ? ' testimonials__dot--active' : ''}`}
              onClick={() => setCurrent(i)}
              aria-label={`Depoimento ${i + 1}`}
            />
          ))}
        </div>

        <div className="testimonials__cta">
          <a href="/" className="btn btn--primary" onClick={(e) => { e.preventDefault(); document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' }) }}>JUNTE-SE A ELES</a>
        </div>
      </div>
    </section>
  )
}
