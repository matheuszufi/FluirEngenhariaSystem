import { useEffect, useState } from 'react'
import { signOut, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'
import { useNavigate, Link } from 'react-router-dom'
import DashboardLayout from '../components/DashboardLayout'
import './Dashboard.css'

const stats = [
  { label: 'Projetos ativos', value: '+40', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  )},
  { label: 'Ãrea projetada', value: '800k mÂ²', icon: (
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
  { label: 'Perguntas Frequentes', href: '/dashboard/faq', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  )},
  { label: 'Depoimentos', href: '/dashboard/testimonials', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
    </svg>
  )},
  { label: 'Portfólio', href: '/dashboard/portfolio', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
    </svg>
  )},
  { label: 'Parceiros', href: '/dashboard/clients', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
    </svg>
  )},
  { label: 'Hero / Fundo', href: '/dashboard/hero', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
    </svg>
  )},
  { label: 'Nossas Entregas', href: '/dashboard/entregas', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="5" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/>
      <rect x="3" y="13" width="7" height="5" rx="1"/><rect x="14" y="13" width="7" height="5" rx="1"/>
    </svg>
  )},
  { label: 'Ver site', href: '/', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/>
    </svg>
  )},
]

export default function Dashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loggingOut, setLoggingOut] = useState(false)

  useEffect(() => onAuthStateChanged(auth, setUser), [])

  const handleLogout = async () => {
    setLoggingOut(true)
    await signOut(auth)
    navigate('/admin')
  }

  const emailShort = user?.email ?? ''

  return (
    <DashboardLayout>
      <header className="dash__header">
        <div>
          <h1 className="dash__header-title">Dashboard</h1>
          <p className="dash__header-sub">Bem-vindo de volta, <strong>{emailShort}</strong></p>
        </div>
        <button className="dash__logout-btn" onClick={handleLogout} disabled={loggingOut}>
          {loggingOut ? 'Saindoâ€¦' : 'Sair'}
        </button>
      </header>

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

      <div className="dash__grid">
        <div className="dash__card">
          <h2 className="dash__card-title">Acesso rÃ¡pido</h2>
          <div className="dash__quick-links">
            {quickLinks.map((l) => (
              <Link to={l.href} className="dash__quick-link" key={l.label}>
                <span className="dash__quick-link-icon">{l.icon}</span>
                {l.label}
              </Link>
            ))}
          </div>
        </div>

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
              <span>AutenticaÃ§Ã£o</span>
              <span className="dash__badge dash__badge--green">Ativa</span>
            </div>
          </div>
          <button className="dash__danger-btn" onClick={handleLogout} disabled={loggingOut}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Encerrar sessÃ£o
          </button>
        </div>
      </div>
    </DashboardLayout>
  )
}
