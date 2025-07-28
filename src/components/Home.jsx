import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-content">
          <h1>
            Project<span>Flow</span>
          </h1>
          <p className="hero-subtitle">
            La plateforme collaborative pour la gestion de vos projets tutorés
          </p>
          <div className="cta-buttons">
            <button className="primary-btn" onClick={() => navigate("/login")}>
              Connexion
            </button>
            <button
              className="secondary-btn"
              onClick={() => navigate("/register")}
            >
              Inscription
            </button>
          </div>
        </div>
        <div className="hero-image">
          <img
            src="https://tse3.mm.bing.net/th/id/OIP.ZigO6WEtDq2nXAdj8VC86gHaE7?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
            alt="Team collaboration"
          />
        </div>
      </header>

      {/* Features Section */}
      <section className="features-section">
        <h2>Fonctionnalités clés</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-users"></i>
            </div>
            <h3>Gestion des groupes</h3>
            <p>
              Créez des groupes, désignez un coordinateur et collaborez
              efficacement.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-tasks"></i>
            </div>
            <h3>Suivi des projets</h3>
            <p>
              Visualisez l'avancement des projets étape par étape avec
              validation pédagogique.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-file-upload"></i>
            </div>
            <h3>Livrables centralisés</h3>
            <p>
              Soumettez vos travaux en groupe avec un espace dédié pour chaque
              projet.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-comments"></i>
            </div>
            <h3>Feedback structuré</h3>
            <p>
              Recevez des retours ciblés de vos enseignants sur chaque livrable.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2>Ce qu'en disent nos utilisateurs</h2>
        <div className="testimonials-container">
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>
                "Enfin une plateforme adaptée à nos besoins pour les projets
                tutorés. La gestion des groupes est intuitive et le suivi des
                étapes nous fait gagner un temps précieux."
              </p>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">
                <img
                  src="https://tse1.mm.bing.net/th/id/OIP.0aVYqeLtLMTJSbC37XpzDwHaFi?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
                  alt="Professor"
                />
              </div>
              <div className="author-info">
                <h4>Dr. Sophie Martin</h4>
                <p>Enseignante en Informatique</p>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>
                "Travailler sur nos projets est maintenant beaucoup plus simple.
                On peut facilement soumettre nos travaux en groupe et voir les
                commentaires des professeurs au même endroit."
              </p>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">
                <img
                  src="https://www.anacours.com/wp-content/uploads/2021/02/la-selection-de-votre-enseignant-anacours_2-1024x683.jpg"
                  alt="Student"
                />
              </div>
              <div className="author-info">
                <h4>Thomas Leroy</h4>
                <p>Étudiant en Master</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="final-cta">
        <h2>Prêt à révolutionner la gestion de vos projets tutorés ?</h2>
        <button
          className="primary-btn large"
          onClick={() => navigate("/register")}
        >
          Commencer maintenant
        </button>
      </section>
    </div>
  );
};

export default Home;
