const clients = [
  'LEX', 'PECCON', 'HENDEL', 'MANTRI', 'LJETS INC.',
  'ROGGA', 'RTX', 'PRIMINHA', 'URBAN EDGE', 'MUMUJU',
  'MANDALI', 'CONSTRU NEVES', 'WHITE', 'DANCON', 'JS',
]

export default function Clients() {
  return (
    <section className="clients">
      <div className="container">
        <p className="section-tag">Parceiros</p>
        <h2 className="section-title">Nossos clientes</h2>
        <div className="clients__grid">
          {clients.map((name) => (
            <div className="clients__logo" key={name}>
              <span>{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
