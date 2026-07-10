import { useState, useEffect } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, db } from '../firebase'
import { useNavigate, Link } from 'react-router-dom'
import './Auth.css'

const SETTINGS_DOC = doc(db, 'settings', 'registration')

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '', confirm: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [checking, setChecking] = useState(true)
  const [enabled, setEnabled] = useState(true)
  const [registered, setRegistered] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [deleted, setDeleted] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setChecking(false), 4000)

    getDoc(SETTINGS_DOC)
      .then((snap) => {
        if (snap.exists() && snap.data().enabled === false) setEnabled(false)
      })
      .catch(() => {})
      .finally(() => {
        clearTimeout(timeout)
        setChecking(false)
      })

    return () => clearTimeout(timeout)
  }, [])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (form.password !== form.confirm) {
      setError('As senhas não coincidem.')
      return
    }
    if (form.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.')
      return
    }

    setLoading(true)
    try {
      await createUserWithEmailAndPassword(auth, form.email, form.password)
      setRegistered(true)
    } catch (err) {
      setError(translateError(err.code))
    } finally {
      setLoading(false)
    }
  }

  const handleDeletePage = async () => {
    if (!window.confirm('Tem certeza? A página de registro será desativada permanentemente.')) return
    setDeleting(true)
    try {
      await setDoc(SETTINGS_DOC, { enabled: false })
      setDeleted(true)
    } catch {
      alert('Erro ao desativar a página. Tente novamente.')
    } finally {
      setDeleting(false)
    }
  }

  if (checking) {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <span className="auth-btn__spinner auth-btn__spinner--dark" />
        </div>
      </div>
    )
  }

  if (!enabled || deleted) {
    return (
      <div className="auth-page">
        <div className="auth-card auth-card--center">
          <div className="auth-disabled-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10"/>
              <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
            </svg>
          </div>
          <h2 className="auth-card__title">Registro desativado</h2>
          <p className="auth-card__subtitle">
            Esta página foi desativada pelo administrador.
          </p>
          <Link to="/admin" className="auth-btn auth-btn--link">IR PARA O LOGIN</Link>
        </div>
      </div>
    )
  }

  if (registered) {
    return (
      <div className="auth-page">
        <div className="auth-card auth-card--center">
          <div className="auth-success-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="9 12 11 14 15 10"/>
            </svg>
          </div>
          <h2 className="auth-card__title">Conta criada!</h2>
          <p className="auth-card__subtitle">
            Seu acesso foi configurado com sucesso.
          </p>

          <div className="auth-delete-section">
            <p className="auth-delete-warning">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              Recomendado: desative esta página para impedir novos registros.
            </p>
            <button
              className="auth-btn auth-btn--danger"
              onClick={handleDeletePage}
              disabled={deleting}
            >
              {deleting
                ? <span className="auth-btn__spinner" />
                : <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                      <polyline points="3 6 5 6 21 6"/>
                      <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
                      <path d="M10 11v6M14 11v6"/>
                      <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
                    </svg>
                    EXCLUIR PÁGINA DE REGISTRO
                  </>
              }
            </button>
          </div>

          <Link to="/admin" className="auth-footer-link">Ir para o login →</Link>
        </div>
      </div>
    )
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

        <h1 className="auth-card__title">Criar conta</h1>
        <p className="auth-card__subtitle">Configure o acesso administrativo do sistema.</p>

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
              placeholder="Mínimo 6 caracteres"
              value={form.password}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
          </div>
          <div className="auth-field">
            <label htmlFor="confirm">Confirmar senha</label>
            <input
              id="confirm"
              name="confirm"
              type="password"
              placeholder="Repita a senha"
              value={form.confirm}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
          </div>
          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? <span className="auth-btn__spinner" /> : 'CRIAR CONTA'}
          </button>
        </form>

        <p className="auth-footer-link">
          Já tem conta? <Link to="/admin">Fazer login</Link>
        </p>
        <p className="auth-footer-link">
          <Link to="/">← Voltar ao site</Link>
        </p>
      </div>
    </div>
  )
}

function translateError(code) {
  const messages = {
    'auth/email-already-in-use': 'Este e-mail já está em uso.',
    'auth/invalid-email': 'E-mail inválido.',
    'auth/weak-password': 'Senha muito fraca. Use pelo menos 6 caracteres.',
    'auth/operation-not-allowed': 'Operação não permitida.',
  }
  return messages[code] || 'Erro ao criar conta. Tente novamente.'
}
