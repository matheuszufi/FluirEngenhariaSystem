const especialidades = [
  {
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="28" fill="#FF650015" />
        <path
          d="M32 14C32 14 20 27 20 37C20 43.627 25.373 49 32 49C38.627 49 44 43.627 44 37C44 27 32 14 32 14Z"
          fill="#99592f"
        />
        <path
          d="M27 37C27 34 28.5 31 31 28"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: 'Hidrossanitário',
    topics: [
      'Aprovativos',
      'Pressurização',
      'Cisternas potáveis e não potáveis',
      'Água quente (passagem e acumulação)',
      'Sanitário, gordura e ventilação',
      'Drenagem e bacias de contenção',
    ],
  },
  {
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="28" fill="#99592f15" />
        <path
          d="M32 14C36 20 44 25 44 35C44 42 38.6 48 32 48C25.4 48 20 42 20 35C20 28 24 23 28 19C28 24 30 26 32 27C33 24 33 19 32 14Z"
          fill="#99592f"
        />
        <path
          d="M32 27C35 30 37 33 37 36C37 39 34.8 42 32 42C29.2 42 27 39 27 36C27 33.5 29 30.5 32 27Z"
          fill="white"
        />
      </svg>
    ),
    title: 'Gás',
    topics: [
      'Centrais',
      'Reguladores de pressão',
      'Medidores',
      'Redes e consumo',
    ],
  },
  {
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="28" fill="#FF650015" />

        <rect x="26" y="22" width="12" height="24" rx="4" fill="#99592f" />
        <rect x="22" y="18" width="20" height="6" rx="3" fill="#99592f" />
        <rect x="29" y="14" width="6" height="6" rx="3" fill="#99592f" />

        <circle cx="21" cy="31" r="4" fill="#99592f" />
        <circle cx="43" cy="31" r="4" fill="#99592f" />

        <rect x="24" y="46" width="16" height="4" rx="2" fill="#99592f" />
      </svg>
    ),
    title: 'Incêndio',
    topics: [
      'Aprovativos',
      'Hidrantes',
      'Sprinklers',
    ],
  },
  {
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="28" fill="#99592f15" />

        {/* Escada */}
        <path
          d="M18 28V46"
          stroke="#99592f"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M24 28V46"
          stroke="#99592f"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path d="M18 32H24" stroke="#99592f" strokeWidth="3" />
        <path d="M18 38H24" stroke="#99592f" strokeWidth="3" />

        {/* Água */}
        <path
          d="M28 42C31 40 34 44 37 42C40 40 43 44 46 42"
          stroke="#99592f"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <path
          d="M28 47C31 45 34 49 37 47C40 45 43 49 46 47"
          stroke="#99592f"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: 'Piscina',
    topics: [
      'Filtragem',
      'Aquecimento',
      'Hidromassagem',
      'Borda infinita',
      'Cascata',
    ],
  },
]

export default function Especialidades() {
  return (
    <section className="especialidades" id="servicos">
      <div className="container">
        <div className="especialidades__header">
          <p className="section-tag">O que fazemos</p>
          <h2 className="section-title">Nossas especialidades</h2>
        </div>

        <div className="especialidades__grid">
          {especialidades.map((item) => (
            <div className="especialidades__card" key={item.title}>
              <div className="especialidades__icon">
                {item.icon}
              </div>

              <h3 className="especialidades__name">
                {item.title}
              </h3>

              <ul className="especialidades__topics">
                {item.topics.map((topic) => (
                  <li key={topic}>{topic}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}