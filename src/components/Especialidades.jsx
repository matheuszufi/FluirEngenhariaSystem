const especialidades = [
  {
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="28" fill="#FF650015"/>
        <path d="M32 12C32 12 20 22 20 34C20 40.627 25.373 46 32 46C38.627 46 44 40.627 44 34C44 22 32 12 32 12Z" fill="#FF6500" opacity="0.8"/>
        <path d="M32 20C32 20 26 27 26 34C26 37.314 28.686 40 32 40C35.314 40 38 37.314 38 34C38 27 32 20 32 20Z" fill="white" opacity="0.9"/>
        <rect x="20" y="47" width="24" height="4" rx="2" fill="#FF6500"/>
      </svg>
    ),
    title: 'Hidrossanitário',
  },
  {
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="28" fill="#FF650015"/>
        <path d="M32 14C32 14 24 22 24 30C24 32 25 34 27 35C27 29 30 25 32 23C34 25 37 29 37 35C39 34 40 32 40 30C40 22 32 14 32 14Z" fill="#FF6500"/>
        <path d="M32 24C32 24 28 28 28 34C28 37.314 29.686 40 32 40C34.314 40 36 37.314 36 34C36 28 32 24 32 24Z" fill="#FF6500" opacity="0.5"/>
        <rect x="30" y="40" width="4" height="10" rx="2" fill="#FF6500"/>
        <rect x="24" y="47" width="16" height="3" rx="1.5" fill="#FF6500"/>
      </svg>
    ),
    title: 'Gás',
  },
  {
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="28" fill="#FF650015"/>
        <circle cx="32" cy="28" r="8" fill="#FF6500"/>
        <rect x="30" y="36" width="4" height="14" rx="2" fill="#FF6500"/>
        <path d="M18 34H46" stroke="#FF6500" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M14 44C14 44 18 38 24 38" stroke="#FF6500" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M50 44C50 44 46 38 40 38" stroke="#FF6500" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="32" cy="28" r="4" fill="white"/>
      </svg>
    ),
    title: 'Incêndio',
  },
  {
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="28" fill="#FF650015"/>
        <rect x="14" y="28" width="36" height="22" rx="4" fill="#FF6500" opacity="0.2"/>
        <rect x="14" y="28" width="36" height="22" rx="4" stroke="#FF6500" strokeWidth="2.5"/>
        <path d="M20 28V24C20 18.477 24.477 14 30 14H34C39.523 14 44 18.477 44 24V28" stroke="#FF6500" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="26" cy="39" r="3" fill="#FF6500"/>
        <circle cx="38" cy="39" r="3" fill="#FF6500"/>
        <path d="M26 42V46" stroke="#FF6500" strokeWidth="2" strokeLinecap="round"/>
        <path d="M38 42V46" stroke="#FF6500" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Piscina',
  },
]

export default function Especialidades() {
  return (
    <section className="especialidades" id="servicos">
      <div className="container">
        <p className="section-tag">O que fazemos</p>
        <h2 className="section-title">Nossas especialidades</h2>
        <div className="especialidades__grid">
          {especialidades.map((item) => (
            <div className="especialidades__card" key={item.title}>
              <div className="especialidades__icon">{item.icon}</div>
              <h3 className="especialidades__name">{item.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
