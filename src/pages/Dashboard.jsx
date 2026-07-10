import { useEffect, useState } from 'react'
import { signOut, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'
import { useNavigate, Link } from 'react-router-dom'
import './Dashboard.css'

const stats = [
  { label: 'Projetos ativos', value: '+40', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  )},
  { label: 'Área projetada', value: '800k m²', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
    </svg>
  )},
  { label: 'Anos em BIM', value: '+06', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  )},
  { label: 'Clientes atendidos', value: '15+', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
    </svg>
  )},
]

const quickLinks = [
  { label: 'Ver site', href: '/', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/>
    </svg>
  )},
  { label: 'Portfólio', href: '/#portfolio', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
    </svg>
  )},
  { label: 'Contato', href: '/#contato', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  )},
]

export default function Dashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loggingOut, setLoggingOut] = useState(false)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u))
    return unsub
  }, [])

  const handleLogout = async () => {
    setLoggingOut(true)
    await signOut(auth)
    navigate('/admin')
  }

  const initials = user?.email ? user.email[0].toUpperCase() : '?'
  const emailShort = user?.email ?? ''

  return (
    <div className="dash">
      {/* Sidebar */}
      <aside className="dash__sidebar">
        <Link to="/" className="dash__logo">
          <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
            <path d="M16 2C16 2 4 10 4 20C4 26.627 9.373 32 16 32C22.627 32 28 26.627 28 20C28 10 16 2 16 2Z" fill="#FF6500"/>
            <path d="M16 8C16 8 9 14 9 20C9 23.866 12.134 27 16 27C19.866 27 23 23.866 23 20C23 14 16 8 16 8Z" fill="white" fillOpacity="0.2"/>
          </svg>
          <div>
            <span className="dash__logo-name">FLUIR</span>
            <span className="dash__logo-sub">Admin</span>
          </div>
        </Link>

        <nav className="dash__nav">
          <span className="dash__nav-section">Menu</span>
          <a href="#" className="dash__nav-item dash__nav-item--active">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
            </svg>
            Dashboard
          </a>
          <Link to="/" className="dash__nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/>
            </svg>
            Ver site
          </Link>
        </nav>

        <div className="dash__sidebar-footer">
          <div className="dash__user">
            <div className="dash__user-avatar">{initials}</div>
            <div className="dash__user-info">
              <span className="dash__user-email">{emailShort}</span>
              <span className="dash__user-role">Administrador</span>
            </div>
          </div>
          <button className="dash__logout" onClick={handleLogout} disabled={loggingOut} title="Sair">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="dash__main">
        <header className="dash__header">
          <div>
            <h1 className="dash__header-title">Dashboard</h1>
            <p className="dash__header-sub">Bem-vindo de volta, <strong>{emailShort}</strong></p>
          </div>
          <button className="dash__logout-btn" onClick={handleLogout} disabled={loggingOut}>
            {loggingOut ? 'Saindo…' : 'Sair'}
          </button>
        </header>

        {/* Stats */}
        <div className="dash__stats">
          {stats.map((s) => (
            <div className="dash__stat-card" key={s.label}>
              <div className="dash__stat-icon">{s.icon}</div>
              <div>
                <span className="dash__stat-value">{s.value}</span>
                <span className="dash__stat-label">{s.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Content grid */}
        <div className="dash__grid">
          {/* Quick links */}
          <div className="dash__card">
            <h2 className="dash__card-title">Acesso rápido</h2>
            <div className="dash__quick-links">
              {quickLinks.map((l) => (
                <Link to={l.href} className="dash__quick-link" key={l.label}>
                  <span className="dash__quick-link-icon">{l.icon}</span>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Account info */}
          <div className="dash__card">
            <h2 className="dash__card-title">Conta</h2>
            <div className="dash__account">
              <div className="dash__account-row">
                <span>E-mail</span>
                <strong>{emailShort}</strong>
              </div>
              <div className="dash__account-row">
                <span>Perfil</span>
                <strong>Administrador</strong>
              </div>
              <div className="dash__account-row">
                <span>Autenticação</span>
                <span className="dash__badge dash__badge--green">Ativa</span>
              </div>
            </div>
            <button className="dash__danger-btn" onClick={handleLogout} disabled={loggingOut}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Encerrar sessão
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
