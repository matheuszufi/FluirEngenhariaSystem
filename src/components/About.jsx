export default function About() {
  return (
    <section className="about" id="sobre">
      <div className="container about__container">
        <div className="about__content">
          <p className="section-tag">Quem somos</p>
          <p className="about__overline">PROJETOS PREDIAIS EM BIM</p>
          <h2 className="about__title">Sobre a Fluir Engenharia</h2>
          <p className="about__text">
            Nossa história é marcada por um compromisso com a excelência em cada projeto desenvolvido.
            A Fluir atua de forma dedicada para superar as expectativas de cada cliente Fluir atualizado.
            A excelência financeira e a preservação de recursos técnicos em todos as etapas do projeto.
          </p>
          <p className="about__text">
            Com uma equipe experiente e comprometida, fornecemos serviços de alta qualidade que otimizam
            processos e potencializam resultados técnicos em todos os nichos das obras.
          </p>
          <a href="/" className="btn btn--primary" onClick={(e) => { e.preventDefault(); document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' }) }}>FALE COM A GENTE</a>
        </div>
        <div className="about__image">
          <img
            src={`${import.meta.env.BASE_URL}viniciusmelissa.jpg`}
            alt="Equipe Fluir Engenharia"
          />
        </div>
      </div>
    </section>
  )
}
