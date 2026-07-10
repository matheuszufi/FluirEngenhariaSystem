const images = [
  { id: 1, label: 'Projeto Residencial Torre A', src: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80' },
  { id: 2, label: 'BIM - Hidrossanitário', src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80' },
  { id: 3, label: 'Projeto Incêndio', src: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=600&q=80' },
  { id: 4, label: 'Planta Baixa BIM', src: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80' },
  { id: 5, label: 'Modelagem 3D', src: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80' },
  { id: 6, label: 'Empreendimento Residencial', src: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=80' },
]

export default function Entregas() {
  return (
    <section className="entregas">
      <div className="container">
        <p className="section-tag">Resultados</p>
        <h2 className="section-title">Nossas entregas</h2>
      </div>
      <div className="entregas__gallery">
        {images.map((img) => (
          <div className="entregas__item" key={img.id}>
            <img src={img.src} alt={img.label} loading="lazy" />
            <div className="entregas__item-overlay">
              <span>{img.label}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="container entregas__cta">
        <a href="#contato" className="btn btn--primary">SOLICITAR PROPOSTA</a>
      </div>
    </section>
  )
}
