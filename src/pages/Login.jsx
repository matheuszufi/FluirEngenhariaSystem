import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import { useNavigate, Link } from 'react-router-dom'
import './Auth.css'

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password)
      navigate('/dashboard')
    } catch (err) {
      setError(translateError(err.code))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card__logo">
          <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
            <path d="M16 2C16 2 4 10 4 20C4 26.627 9.373 32 16 32C22.627 32 28 26.627 28 20C28 10 16 2 16 2Z" fill="#FF6500"/>
            <path d="M16 8C16 8 9 14 9 20C9 23.866 12.134 27 16 27C19.866 27 23 23.866 23 20C23 14 16 8 16 8Z" fill="white" fillOpacity="0.2"/>
          </svg>
          <div>
            <span className="auth-card__logo-name">FLUIR</span>
            <span className="auth-card__logo-sub">Engenharia</span>
          </div>
        </div>

        <h1 className="auth-card__title">Acesso administrativo</h1>
        <p className="auth-card__subtitle">Entre com suas credenciais para acessar o painel.</p>

        {error && <div className="auth-alert auth-alert--error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="auth-field">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="seu@email.com"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </div>
          <div className="auth-field">
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
            />
          </div>
          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? <span className="auth-btn__spinner" /> : 'ENTRAR'}
          </button>
        </form>

        <p className="auth-footer-link">
          <Link to="/">← Voltar ao site</Link>
        </p>
      </div>
    </div>
  )
}

function translateError(code) {
  const messages = {
    'auth/user-not-found': 'Usuário não encontrado.',
    'auth/wrong-password': 'Senha incorreta.',
    'auth/invalid-email': 'E-mail inválido.',
    'auth/invalid-credential': 'Credenciais inválidas. Verifique e-mail e senha.',
    'auth/too-many-requests': 'Muitas tentativas. Tente novamente mais tarde.',
  }
  return messages[code] || 'Erro ao fazer login. Tente novamente.'
}
