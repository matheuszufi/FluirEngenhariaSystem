import { useState, useEffect } from 'react'
import { ref, onValue } from 'firebase/database'
import { rtdb } from '../firebase'

export default function Hero() {
  const [slides, setSlides] = useState([])
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const unsub = onValue(ref(rtdb, 'hero'), (snap) => {
      if (snap.exists()) {
        const items = Object.entries(snap.val())
          .map(([id, v]) => ({ id, ...v }))
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        setSlides(items)
        setCurrent(0)
      } else {
        setSlides([])
      }
    })
    return () => unsub()
  }, [])

  useEffect(() => {
    if (slides.length <= 1) return
    const duration = (slides[current]?.duration || 5) * 1000
    const timer = setTimeout(() => setCurrent(c => (c + 1) % slides.length), duration)
    return () => clearTimeout(timer)
  }, [current, slides])

  return (
    <section className="hero" id="home">
      {slides.length > 0 ? (
        slides.map((slide, i) => (
          <div
            key={slide.id}
            className={`hero__slide${i === current ? ' hero__slide--active' : ''}`}
            style={{ backgroundImage: `url('${slide.imageUrl}')` }}
          />
        ))
      ) : (
        <div className="hero__slide hero__slide--active" style={{ backgroundImage: `url('${import.meta.env.BASE_URL}hero-bg.png')` }} />
      )}

      <div className="hero__overlay" />

      <div className="hero__container">
        <div className="hero__content">
          <p className="hero__tag">Projetos em BIM</p>
          <h1 className="hero__title">
            Projetos Hidráulicos<br />
            Prediais em <span className="hero__title--accent">BIM</span>
          </h1>
          <p className="hero__subtitle">
            Empresa referência em projetos hidráulicos para construções
            residenciais e comerciais. Entregamos soluções eficientes,
            compatibilizadas e dentro do prazo.
          </p>
          <a href="#contato" className="btn btn--primary">FALE CONOSCO</a>
        </div>
      </div>

      {slides.length > 1 && (
        <div className="hero__dots">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`hero__dot${i === current ? ' hero__dot--active' : ''}`}
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      )}

      <div className="hero__stats">
        <div className="hero__stats-container">
          <div className="hero__stat">
            <span className="hero__stat-number">+800.000m²</span>
            <span className="hero__stat-label">de empreendimentos</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-number">+40</span>
            <span className="hero__stat-label">projetos ativos</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-number">+06 anos</span>
            <span className="hero__stat-label">em BIM</span>
          </div>
        </div>
      </div>
    </section>
  )
}

