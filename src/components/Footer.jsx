export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__container">
        <div className="footer__brand">
          <a href="#home" className="footer__logo">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
              <path d="M16 2C16 2 4 10 4 20C4 26.627 9.373 32 16 32C22.627 32 28 26.627 28 20C28 10 16 2 16 2Z" fill="#FF6500"/>
              <path d="M16 8C16 8 9 14 9 20C9 23.866 12.134 27 16 27C19.866 27 23 23.866 23 20C23 14 16 8 16 8Z" fill="white" fillOpacity="0.2"/>
            </svg>
            <div>
              <span className="footer__logo-name">FLUIR</span>
              <span className="footer__logo-sub">Engenharia</span>
            </div>
          </a>
          <address className="footer__address">
            <p>Av. Exemplo, 123 – Sala 45</p>
            <p>Curitiba – PR, 80000-000</p>
            <p>(41) 9 9999-9999</p>
            <p>contato@fluirengenharia.com.br</p>
          </address>
        </div>

        <div className="footer__links">
          <h4 className="footer__heading">Mapa do site</h4>
          <nav>
            <a href="#home">Início</a>
            <a href="#sobre">Sobre</a>
            <a href="#servicos">Serviços</a>
            <a href="#portfolio">Portfólio</a>
            <a href="#faq">FAQ</a>
            <a href="#contato">Contato</a>
          </nav>
        </div>

        <div className="footer__social">
          <h4 className="footer__heading">Redes sociais</h4>
          <div className="footer__social-links">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="5"/>
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
            <a href="https://wa.me/5541999999999" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container">
          <p>© {new Date().getFullYear()} Fluir Engenharia. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
