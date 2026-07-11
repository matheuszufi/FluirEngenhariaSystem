import { useState, useEffect } from 'react'
import { ref, onValue } from 'firebase/database'
import { rtdb } from '../firebase'

export default function FAQ() {
  const [faqs, setFaqs] = useState([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(null)

  useEffect(() => {
    const unsub = onValue(ref(rtdb, 'faqs'), (snap) => {
      if (snap.exists()) {
        const items = Object.entries(snap.val())
          .map(([id, v]) => ({ id, ...v }))
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        setFaqs(items)
      } else {
        setFaqs([])
      }
      setLoading(false)
    })
    return () => unsub()
  }, [])

  if (loading || faqs.length === 0) return null

  return (
    <section className="faq" id="faq">
      <div className="container faq__container">
        <div className="faq__header">
          <p className="section-tag">Dúvidas</p>
          <h2 className="section-title">Perguntas frequentes</h2>
        </div>
        <div className="faq__list">
          {faqs.map((item) => (
            <div
              key={item.id}
              className={`faq__item${open === item.id ? ' faq__item--open' : ''}`}
            >
              <button
                className="faq__question"
                onClick={() => setOpen(open === item.id ? null : item.id)}
                aria-expanded={open === item.id}
              >
                {item.question}
                <span className="faq__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </span>
              </button>
              <div className="faq__answer">
                {item.answer.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
