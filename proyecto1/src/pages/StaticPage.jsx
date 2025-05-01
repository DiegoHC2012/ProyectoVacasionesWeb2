import "../styles/staticpage.css";

function StaticPage() {
  return (
    <div className="main-wrapper">
      <section className="hero-section">
        <div className="container">
          <h1 className="hero-title">
            Aviso para Viajeros Interdimensionales
          </h1>
        </div>
      </section>

      <section className="content-section">
        <div className="container wysiwyg">
          <figure className="hero-image">
            <img 
              src="https://www.leblancsparesorts.com/sites/default/files/2022-05/avisofumadores.jpg" 
              alt="Aviso para Viajeros"
            />
          </figure>

          <article className="content-article">
            <p>
              Estimado viajero del multiverso:
            </p>

            <p>
              En cumplimiento con la Ley General de Control Interdimensional, le informamos que está prohibido abrir portales dentro de las instalaciones de la Ciudadela sin la debida autorización de la Federación Galáctica.
            </p>

            <p>
              Para la comodidad de nuestros visitantes de otras realidades, se han asignado áreas específicas donde se permite el uso de portales, dispositivos de teletransportación y consumo de mega semillas controladas.
            </p>

            <p>
              Agradecemos su cooperación para mantener la integridad del tejido espacio-temporal. ¡Recuerde, cada salto cuántico genera papeleo interdimensional!
            </p>

            <p>
              Gracias por viajar responsablemente. Wubba Lubba Dub-Dub.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}

export default StaticPage;
