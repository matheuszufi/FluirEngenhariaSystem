import { useState } from 'react'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="header">
      <div className="header__container">
        <a href="/" className="header__logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
          <img src={`${import.meta.env.BASE_URL}logofluir.png`} alt="Fluir Engenharia" className="header__logo-img" />
        </a>

        <nav className={`header__nav${menuOpen ? ' header__nav--open' : ''}`}>
          <a href="/" onClick={(e) => { e.preventDefault(); document.getElementById('sobre')?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false) }}>Sobre</a>
          <a href="/" onClick={(e) => { e.preventDefault(); document.getElementById('servicos')?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false) }}>Serviços</a>
          <a href="/" onClick={(e) => { e.preventDefault(); document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false) }}>Portfólio</a>
          <a href="/" onClick={(e) => { e.preventDefault(); document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false) }}>FAQ</a>
          <a href="/" onClick={(e) => { e.preventDefault(); document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false) }}>Contato</a>
        </nav>

        {/* <a href="tel:+5511999999999" className="header__cta">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
          </svg>
          (43) 9 9997-0284
        </a> */}

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
