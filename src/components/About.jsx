export default function About() {
  return (
    <section className="about" id="sobre">
      <div className="container about__container">
        <div className="about__content">
         
          <p className="about__overline">QUEM SOMOS</p>
          <h2 className="about__title">Sobre a Fluir Engenharia</h2>
           {/* <p className="section-tag">PROJETOS PREDIAIS EM BIM</p> */}
          <p className="about__text">
            Nossa história é marcada por um compromisso com a excelência em cada projeto desenvolvido,
            prezando por garantir conforto máximo para o cliente final alinhado à economia financeira e prevenção de retrabalho para o construtor.
          </p>
          <p className="about__text">
             Com uma equipe experiente e comprometida, fornecemos serviços de alta qualidade, com processo e conhecimento técnico em todas as etapas do projeto.
          </p>
          {/* <a href="/" className="btn btn--primary" onClick={(e) => { e.preventDefault(); document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' }) }}>FALE COM A GENTE</a> */}
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
