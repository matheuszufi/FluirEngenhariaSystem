export default function ValueProposition() {
  return (
    <section className="value-prop">
      <div className="container value-prop__container">
        <div className="value-prop__content">
          <h2 className="value-prop__title">
            Entendemos a necessidade da sua obra e criamos a{' '}
            <span className="value-prop__title--accent">melhor solução</span>{' '}
            para o seu projeto!
          </h2>
          <ul className="value-prop__list">
            <li className="value-prop__item">
              <span className="value-prop__check">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              Projetos compatibilizados em BIM
            </li>
            <li className="value-prop__item">
              <span className="value-prop__check">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              Economia para o construtor
            </li>
            <li className="value-prop__item">
              <span className="value-prop__check">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              Projetos com soluções eficientes de engenharia
            </li>
          </ul>
          <a href="/" className="btn btn--primary" onClick={(e) => { e.preventDefault(); document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' }) }}>FALAR COM ESPECIALISTA</a>
        </div>
        {/* <div className="value-prop__image">
          <img
            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=700&q=80"
            alt="Engenheiros trabalhando em projeto BIM"
          />
        </div> */}
      </div>
    </section>
  )
}
