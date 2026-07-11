import { useEffect, useState } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import '../pages/Dashboard.css'

export default function DashboardLayout({ children }) {
  const [user, setUser] = useState(null)
  const [loggingOut, setLoggingOut] = useState(false)
  const navigate = useNavigate()

  useEffect(() => onAuthStateChanged(auth, setUser), [])

  const handleLogout = async () => {
    setLoggingOut(true)
    await signOut(auth)
    navigate('/admin')
  }

  const initials = user?.email?.[0]?.toUpperCase() ?? '?'

  const navItem = ({ isActive }) =>
    `dash__nav-item${isActive ? ' dash__nav-item--active' : ''}`

  return (
    <div className="dash">
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
          <NavLink to="/dashboard" end className={navItem}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
            </svg>
            Dashboard
          </NavLink>
          <NavLink to="/dashboard/faq" className={navItem}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            Perguntas Frequentes
          </NavLink>
          <Link to="/" className="dash__nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/>
            </svg>
            Ver site
          </Link>
        </nav>

        <div className="dash__sidebar-footer">
          <div className="dash__user">
            <div className="dash__user-avatar">{initials}</div>
            <div className="dash__user-info">
              <span className="dash__user-email">{user?.email ?? ''}</span>
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

      <main className="dash__main">
        {children}
      </main>
    </div>
  )
}
