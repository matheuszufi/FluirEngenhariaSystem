export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero__overlay" />
      <div className="hero__container">
        <div className="hero__content">
          <p className="hero__tag">Projetos em BIM</p>
          <h1 className="hero__title">
            Projetos Hidráulicos<br />
            Prediais em <span className="hero__title--accent">BIM</span>
          </h1>
          <p className="hero__subtitle">
            Empresa referência em projetos hidráulicos para construções
            residenciais e comerciais. Entregamos soluções eficientes,
            compatibilizadas e dentro do prazo.
          </p>
          <a href="#contato" className="btn btn--primary">FALE CONOSCO</a>
        </div>
      </div>

      <div className="hero__stats">
        <div className="hero__stats-container">
          <div className="hero__stat">
            <span className="hero__stat-number">+800.000m²</span>
            <span className="hero__stat-label">de empreendimentos</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-number">+40</span>
            <span className="hero__stat-label">projetos ativos</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-number">+06 anos</span>
            <span className="hero__stat-label">em BIM</span>
          </div>
        </div>
      </div>
    </section>
  )
}
