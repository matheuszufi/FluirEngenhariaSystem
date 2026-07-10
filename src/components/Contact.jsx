import { useState } from 'react'

const initialForm = { nome: '', email: '', telefone: '', mensagem: '' }

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [sent, setSent] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setForm(initialForm)
    setTimeout(() => setSent(false), 5000)
  }

  return (
    <section className="contact" id="contato">
      <div className="container contact__container">
        <div className="contact__info">
          <p className="section-tag section-tag--light">Contato</p>
          <h2 className="contact__title">Envie sua mensagem</h2>
          <p className="contact__subtitle">
            Preencha o formulário e nossa equipe entrará em contato em breve.
          </p>
          <div className="contact__details">
            <div className="contact__detail">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
              </svg>
              <span>(41) 9 9999-9999</span>
            </div>
            <div className="contact__detail">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <span>contato@fluirengenharia.com.br</span>
            </div>
            <div className="contact__detail">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span>Curitiba, PR - Brasil</span>
            </div>
          </div>
        </div>

        <form className="contact__form" onSubmit={handleSubmit} noValidate>
          {sent && (
            <div className="contact__success">
              Mensagem enviada com sucesso! Entraremos em contato em breve.
            </div>
          )}
          <div className="contact__row">
            <div className="contact__field">
              <label htmlFor="nome">Nome</label>
              <input
                id="nome"
                name="nome"
                type="text"
                placeholder="Seu nome completo"
                value={form.nome}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="contact__row contact__row--split">
            <div className="contact__field">
              <label htmlFor="email">E-mail</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="seu@email.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="contact__field">
              <label htmlFor="telefone">Telefone</label>
              <input
                id="telefone"
                name="telefone"
                type="tel"
                placeholder="(00) 0 0000-0000"
                value={form.telefone}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="contact__field">
            <label htmlFor="mensagem">Mensagem</label>
            <textarea
              id="mensagem"
              name="mensagem"
              placeholder="Descreva seu projeto ou dúvida..."
              rows={5}
              value={form.mensagem}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn--primary contact__submit">
            ENVIAR MENSAGEM
          </button>
        </form>
      </div>
    </section>
  )
}
