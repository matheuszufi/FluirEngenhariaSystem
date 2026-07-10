import { useState } from 'react'

const faqs = [
  {
    q: 'Quais os tipos de projetos desenvolvem?',
    a: 'Desenvolvemos projetos hidrossanitários, de gás, combate a incêndio e piscinas para edificações residenciais e comerciais, todos executados em BIM.',
  },
  {
    q: 'Como é feito o orçamento?',
    a: 'O orçamento é feito com base nas informações do empreendimento. Após análise técnica inicial, enviamos uma proposta detalhada e personalizada para cada projeto.',
  },
  {
    q: 'Em que regiões do Brasil atuam?',
    a: 'Atendemos todo o Brasil. Nossos projetos são desenvolvidos de forma remota com uso de tecnologia BIM, garantindo qualidade independente da localização.',
  },
  {
    q: 'Entregam todas as disciplinas complementares juntas?',
    a: 'Sim. Podemos entregar todas as disciplinas hidráulicas (hidrossanitário, gás, incêndio e piscina) de forma integrada e compatibilizada em BIM.',
  },
  {
    q: 'E se surgir problema na execução do projeto?',
    a: 'Nossa equipe oferece suporte técnico durante toda a execução da obra. Estamos disponíveis para esclarecer dúvidas, emitir revisões e acompanhar o andamento do projeto.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)

  return (
    <section className="faq" id="faq">
      <div className="container faq__container">
        <div className="faq__header">
          <p className="section-tag">Dúvidas</p>
          <h2 className="section-title">Perguntas frequentes</h2>
        </div>
        <div className="faq__list">
          {faqs.map((item, i) => (
            <div
              key={i}
              className={`faq__item${open === i ? ' faq__item--open' : ''}`}
            >
              <button
                className="faq__question"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                {item.q}
                <span className="faq__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </span>
              </button>
              <div className="faq__answer">
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
