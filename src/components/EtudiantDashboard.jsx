import React, { useState } from 'react';
import {
  FiUsers, FiUpload, FiMessageSquare, FiFileText,
  FiCheckCircle, FiBarChart2, FiDownload, FiUser,
  FiChevronRight, FiSearch, FiClock, FiAlertCircle
} from 'react-icons/fi';
import './EtudiantDashboard.css';


// Composant Sidebar simplifié
const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Menu</h2>
      </div>
      <nav className="sidebar-nav">
        <button
          className={`nav-item ${activeTab === 'progress' ? 'active' : ''}`}
          onClick={() => setActiveTab('progress')}
        >
          <FiBarChart2 className="nav-icon" />
          <span>Progression</span>
          <FiChevronRight className="nav-arrow" />
        </button>
        
        <button
          className={`nav-item ${activeTab === 'documents' ? 'active' : ''}`}
          onClick={() => setActiveTab('documents')}
        >
          <FiFileText className="nav-icon" />
          <span>Documents</span>
          <FiChevronRight className="nav-arrow" />
        </button>
        
        <button
          className={`nav-item ${activeTab === 'messages' ? 'active' : ''}`}
          onClick={() => setActiveTab('messages')}
        >
          <FiMessageSquare className="nav-icon" />
          <span>Messages</span>
          <FiChevronRight className="nav-arrow" />
        </button>
        
        <button
          className={`nav-item ${activeTab === 'group' ? 'active' : ''}`}
          onClick={() => setActiveTab('group')}
        >
          <FiUsers className="nav-icon" />
          <span>Mon groupe</span>
          <FiChevronRight className="nav-arrow" />
        </button>
      </nav>
    </div>
  );
};

// Composant ProgressTracker adapté
const ProgressTracker = ({ progress }) => {
  const steps = [
    'Soumission du thème',
    'Validation du thème',
    'Rédaction chapitre 1',
    'Chapitre 1 OK',
    'Rédaction chapitre 2',
    'Chapitre 2 OK',
    'Rédaction chapitre 3',
    'Chapitre 3 OK',
    'Version provisoire',
    'Diapo de présentation',
    'Correction après soutenance',
    'Version finale'
  ];

  return (
    <div className="progress-tracker">
      <div className="progress-header">
        <h3>État d'avancement du projet</h3>
        <div className="progress-percentage">
          {Math.round((progress + 1) / steps.length * 100)}%
        </div>
      </div>
      
      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{ width: `${(progress + 1) / steps.length * 100}%` }}
        ></div>
      </div>
      
      <div className="current-step">
        <div className="step-indicator current">
          {progress + 1}
        </div>
        <div className="step-info">
          <h4>Étape actuelle</h4>
          <p>{steps[progress]}</p>
          <div className="step-deadline">
            <FiClock /> Échéance: {15 + progress}/10/2023
          </div>
        </div>
      </div>
      
      <div className="next-step">
        <div className="step-indicator next">
          {progress < steps.length - 1 ? progress + 2 : '✓'}
        </div>
        <div className="step-info">
          <h4>Prochaine étape</h4>
          <p>{progress < steps.length - 1 ? steps[progress + 1] : 'Projet terminé!'}</p>
        </div>
      </div>
      
      {progress === 3 && (
        <div className="professor-feedback">
          <div className="feedback-header">
            <FiAlertCircle className="alert-icon" />
            <h4>Feedback du professeur</h4>
          </div>
          <p>"Le chapitre 1 est bien structuré mais manque de références académiques. Veuillez ajouter au moins 5 sources supplémentaires."</p>
          <div className="feedback-meta">
            <span className="professor-name">Dr. Smith</span>
            <span className="feedback-date">15/05/2023</span>
          </div>
        </div>
      )}
    </div>
  );
};

// Composant DocumentList simplifié
const DocumentList = ({ documents, onDownload }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredDocs = documents.filter(doc => 
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="document-list">
      <div className="section-header">
        <h3>Documents partagés</h3>
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Rechercher un document..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {filteredDocs.length === 0 ? (
        <div className="empty-message">
          {searchTerm ? (
            <p>Aucun document ne correspond à votre recherche.</p>
          ) : (
            <p>Aucun document partagé pour le moment.</p>
          )}
        </div>
      ) : (
        <div className="documents-table">
          <div className="table-header">
            <div className="header-name">Nom</div>
            <div className="header-author">Auteur</div>
            <div className="header-date">Date</div>
            <div className="header-size">Taille</div>
            <div className="header-actions">Actions</div>
          </div>
          
          {filteredDocs.map(doc => (
            <div key={doc.id} className="document-row">
              <div className="doc-name">
                <FiFileText className="doc-icon" />
                <span>{doc.name}</span>
              </div>
              <div className="doc-author">{doc.author}</div>
              <div className="doc-date">{doc.date}</div>
              <div className="doc-size">{doc.size || 'N/A'}</div>
              <div className="doc-actions">
                <button 
                  onClick={() => onDownload(doc.id)}
                  className="btn-icon"
                  title="Télécharger"
                >
                  <FiDownload />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Composant MessageBoard simplifié
const MessageBoard = ({ messages, currentUser, onSend }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage = {
        id: Date.now(),
        text: message,
        sender: currentUser.name,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: new Date().toLocaleDateString(),
        isCurrentUser: true
      };
      onSend(newMessage);
      setMessage('');
    }
  };

  return (
    <div className="message-board">
      <div className="message-header">
        <h3>Messagerie du groupe</h3>
      </div>
      
      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="empty-message">
            <p>Aucun message dans cette conversation</p>
            <p>Envoyez un message pour commencer la discussion</p>
          </div>
        ) : (
          messages.map(msg => (
            <div 
              key={msg.id} 
              className={`message ${msg.isCurrentUser ? 'sent' : 'received'}`}
            >
              <div className="message-header">
                <div className="sender-info">
                  <div className={`avatar ${msg.isCurrentUser ? 'you' : ''}`}>
                    {msg.sender.charAt(0)}
                  </div>
                  <div>
                    <span className="sender-name">{msg.sender}</span>
                    <span className="message-time">{msg.time} • {msg.date}</span>
                  </div>
                </div>
              </div>
              <div className="message-content">{msg.text}</div>
            </div>
          ))
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="message-form">
        <div className="form-group">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Écrire un message au groupe..."
            required
            rows="2"
          />
          <button type="submit" className="btn-primary send-btn">
            <FiMessageSquare />
          </button>
        </div>
      </form>
    </div>
  );
};

// Composant GroupInfo simplifié
const GroupInfo = ({ group, currentUser }) => {
  return (
    <div className="group-info">
      <div className="section-header">
        <h3>Mon groupe</h3>
      </div>
      
      <div className="group-card">
        <div className="group-header">
          <h4>{group.name}</h4>
          <div className="group-meta">
            <span>{group.members.length} membres</span>
            <span>Projet à {Math.round((group.progress + 1) / 12 * 100)}%</span>
          </div>
        </div>
        
        <div className="coordinator-info">
          <h5>Coordinateur</h5>
          <div className="coordinator-card">
            <div 
              className="avatar"
              style={{ backgroundImage: `url(${group.coordinator.avatar})` }}
            >
              {!group.coordinator.avatar && group.coordinator.name.charAt(0)}
            </div>
            <div>
              <h6>{group.coordinator.name}</h6>
              <p>{group.coordinator.email}</p>
            </div>
          </div>
        </div>
        
        <div className="members-list">
          <h5>Membres du groupe</h5>
          <div className="members-grid">
            {group.members.map(member => (
              <div key={member.id} className="member-card">
                <div 
                  className="avatar small"
                  style={{ backgroundImage: `url(${member.avatar})` }}
                >
                  {!member.avatar && member.name.charAt(0)}
                </div>
                <div className="member-info">
                  <h6>{member.name}</h6>
                  <p>{member.role || 'Membre'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Composant principal StudentDashboard
const EtudiantDashboard = () => {
  // Données mockées
  const [currentUser, setCurrentUser] = useState({
    id: 'user2',
    name: 'Marie Martin',
    email: 'marie@exemple.com',
    avatar: 'https://i.pravatar.cc/150?u=marie@exemple.com',
    isCoordinator: false
  });

  const [groupData, setGroupData] = useState({
    id: 'group1',
    name: 'Groupe Projet Web - P22',
    progress: 3,
    coordinator: {
      id: 'user1',
      name: 'Jean Dupont',
      email: 'jean@exemple.com',
      avatar: 'https://i.pravatar.cc/150?u=jean@exemple.com'
    },
    members: [
      { 
        id: 'user1', 
        name: 'Jean Dupont', 
        email: 'jean@exemple.com',
        avatar: 'https://i.pravatar.cc/150?u=jean@exemple.com',
        role: 'Coordinateur'
      },
      { 
        id: 'user2', 
        name: 'Marie Martin', 
        email: 'marie@exemple.com',
        avatar: 'https://i.pravatar.cc/150?u=marie@exemple.com',
        role: 'Designer'
      },
      { 
        id: 'user3', 
        name: 'Pierre Durand', 
        email: 'pierre@exemple.com',
        avatar: 'https://i.pravatar.cc/150?u=pierre@exemple.com',
        role: 'Développeur'
      },
      { 
        id: 'user4', 
        name: 'Sophie Lambert', 
        email: 'sophie@exemple.com',
        avatar: 'https://i.pravatar.cc/150?u=sophie@exemple.com',
        role: 'Rédactrice'
      }
    ]
  });

  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: 'Guide de style.pdf',
      date: '10/05/2023',
      size: '1.2 MB',
      author: 'Jean Dupont',
      shared: true
    },
    {
      id: 2,
      name: 'Maquettes_Figma.pptx',
      date: '12/05/2023',
      size: '4.5 MB',
      author: 'Marie Martin',
      shared: false
    },
    {
      id: 3,
      name: 'Bibliographie.docx',
      date: '08/05/2023',
      size: '356 KB',
      author: 'Pierre Durand',
      shared: true
    },
    {
      id: 4,
      name: 'Rapport_chapitre1.docx',
      date: '15/05/2023',
      size: '1.8 MB',
      author: 'Sophie Lambert',
      shared: true
    }
  ]);

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Bonjour à tous, j\'ai commencé à travailler sur le premier chapitre. Pouvez-vous me faire vos retours?',
      sender: 'Jean Dupont',
      senderId: 'user1',
      time: '10:30',
      date: '10/05/2023',
      isCurrentUser: false,
      thread: 'group'
    },
    {
      id: 2,
      text: 'J\'ai ajouté les maquettes dans les documents partagés. Elles sont encore provisoires mais donnent une bonne idée de l\'interface.',
      sender: 'Marie Martin',
      senderId: 'user2',
      time: '11:45',
      date: '12/05/2023',
      isCurrentUser: true,
      thread: 'group'
    },
    {
      id: 3,
      text: 'Merci pour les maquettes Marie, elles sont très bien! J\'ai commencé à implémenter la structure HTML.',
      sender: 'Pierre Durand',
      senderId: 'user3',
      time: '13:20',
      date: '12/05/2023',
      isCurrentUser: false,
      thread: 'group'
    }
  ]);

  const [activeTab, setActiveTab] = useState('progress');

  // Gestionnaires d'événements
  const handleDownloadDoc = (docId) => {
    const doc = documents.find(d => d.id === docId);
    alert(`Téléchargement du document: ${doc.name}`);
  };

  const handleSendMessage = (message) => {
    setMessages([...messages, message]);
  };

  return (
    <div className="student-dashboard-container">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
      />
      
      <main className="dashboard-content">
        <header className="dashboard-header">
          <div className="header-left">
            <h1>Tableau de bord étudiant</h1>
            <div className="breadcrumbs">
              <span>Projet Web</span>
              <FiChevronRight />
              <span>{groupData.name}</span>
            </div>
          </div>
          
          <div className="user-profile">
            <div 
              className="avatar"
              style={{ backgroundImage: `url(${currentUser.avatar})` }}
            >
              {!currentUser.avatar && currentUser.name.charAt(0)}
            </div>
            <div className="user-info">
              <span className="user-name">{currentUser.name}</span>
              <span className="user-role">Membre</span>
            </div>
          </div>
        </header>

        <div className="dashboard-main">
          {activeTab === 'progress' && (
            <section className="progress-section">
              <ProgressTracker
                progress={groupData.progress}
              />
              
              <div className="quick-actions">
                <h4>Actions rapides</h4>
                <div className="actions-grid">
                  <button className="action-card">
                    <FiFileText className="action-icon" />
                    <span>Consulter les consignes</span>
                  </button>
                  <button className="action-card">
                    <FiUsers className="action-icon" />
                    <span>Contacter le coordinateur</span>
                  </button>
                  <button className="action-card">
                    <FiDownload className="action-icon" />
                    <span>Télécharger les ressources</span>
                  </button>
                </div>
              </div>
            </section>
          )}

          {activeTab === 'documents' && (
            <section className="documents-section">
              <DocumentList
                documents={documents}
                onDownload={handleDownloadDoc}
              />
            </section>
          )}

          {activeTab === 'messages' && (
            <section className="messages-section">
              <MessageBoard
                messages={messages.filter(m => m.thread === 'group')}
                currentUser={currentUser}
                onSend={handleSendMessage}
              />
            </section>
          )}

          {activeTab === 'group' && (
            <section className="group-section">
              <GroupInfo
                group={groupData}
                currentUser={currentUser}
              />
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default EtudiantDashboard;