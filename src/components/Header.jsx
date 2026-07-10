import { useState } from 'react'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="header">
      <div className="header__container">
        <a href="#home" className="header__logo">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 2C16 2 4 10 4 20C4 26.627 9.373 32 16 32C22.627 32 28 26.627 28 20C28 10 16 2 16 2Z" fill="#FF6500"/>
            <path d="M16 8C16 8 9 14 9 20C9 23.866 12.134 27 16 27C19.866 27 23 23.866 23 20C23 14 16 8 16 8Z" fill="white" fillOpacity="0.2"/>
          </svg>
          <div className="header__logo-text">
            <span className="header__logo-name">FLUIR</span>
            <span className="header__logo-sub">Engenharia</span>
          </div>
        </a>

        <nav className={`header__nav${menuOpen ? ' header__nav--open' : ''}`}>
          <a href="#sobre" onClick={() => setMenuOpen(false)}>Sobre</a>
          <a href="#servicos" onClick={() => setMenuOpen(false)}>Serviços</a>
          <a href="#portfolio" onClick={() => setMenuOpen(false)}>Portfólio</a>
          <a href="#faq" onClick={() => setMenuOpen(false)}>FAQ</a>
          <a href="#contato" onClick={() => setMenuOpen(false)}>Contato</a>
        </nav>

        <a href="tel:+5511999999999" className="header__cta">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
          </svg>
          (41) 9 9999-9999
        </a>

        <button
          className={`header__hamburger${menuOpen ? ' header__hamburger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  )
}
