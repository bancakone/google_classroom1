import React from 'react';
import { 
  FiBarChart2,
  FiFileText,
  FiMessageSquare,
  FiUpload,
  FiEdit2,
  FiSend,
  FiShare2,
  FiCheckSquare
} from 'react-icons/fi';
import './GroupDashboard.css';

const GroupDashboard = () => {
  // Données minimalistes
  const progressData = 65;
  const submittedWorks = [
    { id: 1, title: "Rapport partie 1", author: "Jean", date: "15/05" },
    { id: 2, title: "Analyse données", author: "Marie", date: "12/05" }
  ];

  return (
    <div className="dashboard-minimal">
      {/* Header simplifié */}
      <div className="dashboard-header">
        <h1>Gestion de Groupe</h1>
        <p className="role-badge">Coordinateur</p>
      </div>

      {/* Grille de fonctionnalités */}
      <div className="features-grid">
        {/* Voir progression */}
        <div className="feature-card">
          <div className="feature-header">
            <FiBarChart2 className="feature-icon" />
            <h3>Voir progression</h3>
          </div>
          <div className="progress-display">
            <div className="progress-bar-simple">
              <div style={{ width: `${progressData}%` }}></div>
            </div>
            <span>{progressData}% complété</span>
          </div>
          <button className="feature-btn">
            <FiEdit2 /> Modifier état
          </button>
        </div>

        {/* Consulter travail soumis */}
        <div className="feature-card">
          <div className="feature-header">
            <FiFileText className="feature-icon" />
            <h3>Travaux soumis</h3>
          </div>
          <ul className="submissions-list">
            {submittedWorks.map(work => (
              <li key={work.id}>
                <span>{work.title}</span>
                <div className="work-meta">
                  <span>{work.author}</span>
                  <span>{work.date}</span>
                </div>
              </li>
            ))}
          </ul>
          <button className="feature-btn">
            <FiCheckSquare /> Tout consulter
          </button>
        </div>

        {/* Commenter */}
        <div className="feature-card">
          <div className="feature-header">
            <FiMessageSquare className="feature-icon" />
            <h3>Commenter</h3>
          </div>
          <textarea 
            className="comment-box" 
            placeholder="Ajouter un commentaire..."
          ></textarea>
          <button className="feature-btn">
            <FiSend /> Envoyer
          </button>
        </div>

        {/* Partager document */}
        <div className="feature-card">
          <div className="feature-header">
            <FiShare2 className="feature-icon" />
            <h3>Partager document</h3>
          </div>
          <div className="upload-area">
            <FiUpload className="upload-icon" />
            <p>Glisser-déposer ou parcourir</p>
          </div>
          <button className="feature-btn">
            <FiShare2 /> Partager
          </button>
        </div>

        {/* Soumettre travail groupe */}
        <div className="feature-card">
          <div className="feature-header">
            <FiUpload className="feature-icon" />
            <h3>Soumettre travail</h3>
          </div>
          <div className="submit-checklist">
            <label>
              <input type="checkbox" /> Vérification terminée
            </label>
            <label>
              <input type="checkbox" /> Format conforme
            </label>
          </div>
          <button className="feature-btn primary">
            <FiSend /> Soumettre au professeur
          </button>
        </div>

        {/* Répondre au professeur */}
        <div className="feature-card">
          <div className="feature-header">
            <FiMessageSquare className="feature-icon" />
            <h3>Répondre au professeur</h3>
          </div>
          <select className="message-select">
            <option>Sélectionner un sujet</option>
            <option>Demande d'éclaircissement</option>
            <option>Soumission de travail</option>
            <option>Demande de rendez-vous</option>
          </select>
          <button className="feature-btn">
            <FiSend /> Nouveau message
          </button>
        </div>
      </div>

      {/* Extensions */}
      <div className="extensions-section">
        <h2><FiBarChart2 /> Extensions</h2>
        <div className="extension-options">
          <button className="extension-btn">
            <span>Extendis</span>
            <small>Pour le groupe</small>
          </button>
          <button className="extension-btn">
            <span>Extenus</span>
            <small>Individuelle</small>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupDashboard;