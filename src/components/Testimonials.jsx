import { useState } from 'react'

const testimonials = [
  {
    id: 1,
    name: 'Iago Pegnan',
    company: 'MORFINS ENGENHARIA',
    role: 'Diretor de Projetos',
    text: 'A Fluir é um grande parceiro técnico e comercial da MORFINS. Em todas as obras de grande porte, sempre indicamos a Fluir para os nossos clientes. Diferentes múltiplos trabalhos em execução dos dias. A Fluir nos enquadrou muito bem no desenvolvimento deste projeto!',
    stars: 5,
    avatar: 'IP',
  },
  {
    id: 2,
    name: 'Carlos Andrade',
    company: 'URBAN EDGE',
    role: 'Engenheiro Responsável',
    text: 'Trabalhar com a Fluir Engenharia foi uma experiência excepcional. A qualidade dos projetos BIM entregues superou nossas expectativas, com soluções eficientes que geraram grande economia na execução da obra.',
    stars: 5,
    avatar: 'CA',
  },
  {
    id: 3,
    name: 'Fernanda Lima',
    company: 'PECCON',
    role: 'Gestora de Projetos',
    text: 'A equipe da Fluir demonstra um nível técnico impressionante. Os projetos hidráulicos entregues foram detalhados, bem compatibilizados e dentro do prazo acordado. Recomendo fortemente!',
    stars: 5,
    avatar: 'FL',
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1))
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1))

  const t = testimonials[current]

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
              {Array.from({ length: t.stars }).map((_, i) => (
                <svg key={i} viewBox="0 0 24 24" fill="#FF6500" xmlns="http://www.w3.org/2000/svg">
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
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`testimonials__dot${i === current ? ' testimonials__dot--active' : ''}`}
              onClick={() => setCurrent(i)}
              aria-label={`Depoimento ${i + 1}`}
            />
          ))}
        </div>

        <div className="testimonials__cta">
          <a href="#contato" className="btn btn--primary">JUNTE-SE A ELES</a>
        </div>
      </div>
    </section>
  )
}
