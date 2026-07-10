const projects = [
  {
    id: 1,
    name: 'Vilas Alameda',
    client: 'LJETS INC.',
    tag: 'Residencial',
    img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 2,
    name: 'Conjunto RG',
    client: 'DANCON',
    tag: 'Residencial',
    img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 3,
    name: 'GR Peccon',
    client: 'PECCON',
    tag: 'Comercial',
    img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=600&q=80',
  },
]

export default function Portfolio() {
  return (
    <section className="portfolio" id="portfolio">
      <div className="container">
        <p className="section-tag section-tag--light">Portfólio</p>
        <h2 className="section-title section-title--light">
          Nossos projetos falam por si.
        </h2>
        <div className="portfolio__grid">
          {projects.map((p) => (
            <div className="portfolio__card" key={p.id}>
              <div className="portfolio__img-wrap">
                <img src={p.img} alt={p.name} loading="lazy" />
                <span className="portfolio__tag">{p.tag}</span>
              </div>
              <div className="portfolio__info">
                <h3 className="portfolio__name">{p.name}</h3>
                <p className="portfolio__client">{p.client}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="portfolio__cta">
          <a href="#contato" className="btn btn--outline-light">VER TODOS OS PROJETOS</a>
        </div>
      </div>
    </section>
  )
}
