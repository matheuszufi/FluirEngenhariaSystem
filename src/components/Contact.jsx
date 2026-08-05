import { useState } from 'react'
import emailjs from '@emailjs/browser'

const initialForm = { nome: '', email: '', telefone: '', mensagem: '' }

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setError(false)

    emailjs
      .send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          nome: form.nome,
          email: form.email,
          telefone: form.telefone,
          mensagem: form.mensagem,
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      )
      .then((response) => {
        // response: EmailJSResponseStatus { status, text }
        if (response.status === 200) {
          setSent(true)
          setForm(initialForm)
          setTimeout(() => setSent(false), 5000)
        } else {
          throw new Error(response.text)
        }
      })
      .catch((err) => {
        console.error('Erro ao enviar e-mail:', err)
        setError(true)
        setTimeout(() => setError(false), 5000)
      })
      .finally(() => setLoading(false))
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
        </div>

        <form className="contact__form" onSubmit={handleSubmit} noValidate>
          {sent && (
            <div className="contact__success">
              Mensagem enviada com sucesso! Entraremos em contato em breve.
            </div>
          )}
          {error && (
            <div className="contact__error">
              Não foi possível enviar sua mensagem. Tente novamente.
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
          <button type="submit" className="btn btn--primary contact__submit" disabled={loading}>
            {loading ? 'ENVIANDO...' : 'ENVIAR MENSAGEM'}
          </button>
        </form>
      </div>
    </section>
  )
}