import React, { useState } from 'react';
import {
  FiUsers, FiUpload, FiMessageSquare, FiFileText,
  FiCheckCircle, FiBarChart2, FiShare2, FiSend,
  FiEdit2, FiDownload, FiUser, FiPlus, FiTrash2,
  FiChevronRight, FiChevronLeft, FiSearch, FiSettings
} from 'react-icons/fi';
import './GroupDashboard.css';

// Nouveau composant pour la barre latérale
const Sidebar = ({ activeTab, setActiveTab, isCoordinator }) => {
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
          className={`nav-item ${activeTab === 'submissions' ? 'active' : ''}`}
          onClick={() => setActiveTab('submissions')}
        >
          <FiUpload className="nav-icon" />
          <span>Soumissions</span>
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
        
        {isCoordinator && (
          <button
            className={`nav-item ${activeTab === 'management' ? 'active' : ''}`}
            onClick={() => setActiveTab('management')}
          >
            <FiUsers className="nav-icon" />
            <span>Gestion</span>
            <FiChevronRight className="nav-arrow" />
          </button>
        )}
        
        {isCoordinator && (
          <button
            className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <FiSettings className="nav-icon" />
            <span>Paramètres</span>
            <FiChevronRight className="nav-arrow" />
        </button>
        )}
      </nav>
    </div>
  );
};

// Composant ProgressTracker amélioré
const ProgressTracker = ({ progress, isCoordinator, onProgressChange }) => {
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
      
      <div className="progress-steps">
        {steps.map((step, index) => (
          <div 
            key={index} 
            className={`step ${index <= progress ? 'completed' : ''} ${index === progress ? 'current' : ''}`}
          >
            <div className="step-indicator">
              {index <= progress ? (
                <div className="checkmark">
                  <FiCheckCircle />
                </div>
              ) : (
                <div className="step-number">{index + 1}</div>
              )}
            </div>
            <div className="step-label">{step}</div>
            {index === progress && (
              <div className="step-date">
                {index === 0 ? 'Début: 01/09/2023' : 
                 index === steps.length - 1 ? 'Échéance: 30/05/2024' : 
                 `Échéance: ${15 + index}/10/2023`}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {isCoordinator && (
        <div className="progress-controls">
          <button 
            onClick={() => onProgressChange(progress - 1)}
            disabled={progress <= 0}
            className="btn-outline"
          >
            <FiChevronLeft /> Étape précédente
          </button>
          <button 
            onClick={() => onProgressChange(progress + 1)}
            disabled={progress >= steps.length - 1}
            className="btn-primary"
          >
            Étape suivante <FiChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

// Composant GroupSubmission amélioré
const GroupSubmission = ({ onSubmit, isCoordinator, submissions }) => {
  const [files, setFiles] = useState([]);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length > 0 && isCoordinator) {
      setIsSubmitting(true);
      
      // Simulation d'un délai de soumission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const submission = {
        id: Date.now(),
        files: Array.from(files).map(file => ({
          name: file.name,
          size: (file.size / 1024).toFixed(1) + ' KB',
          type: file.type.split('/')[1] || 'file'
        })),
        date: new Date().toLocaleDateString('fr-FR'),
        time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        comment,
        status: 'submitted'
      };
      
      onSubmit(submission);
      setFiles([]);
      setComment('');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="submission-form">
      <div className="section-header">
        <h3>Soumettre le travail du groupe</h3>
        <div className="submission-count">
          {submissions.length} soumission{submissions.length !== 1 ? 's' : ''}
        </div>
      </div>
      
      {isCoordinator ? (
        <form onSubmit={handleSubmit} className="card">
          <div className="form-group">
            <label className="file-upload">
              <div className="upload-content">
                <FiUpload className="upload-icon" />
                <div>
                  <p className="upload-title">Glissez-déposez vos fichiers ou cliquez pour parcourir</p>
                  <p className="upload-hint">Formats supportés: PDF, DOCX, PPTX, ZIP (max. 10MB)</p>
                </div>
              </div>
              <input 
                type="file" 
                multiple 
                onChange={handleFileChange}
                required
              />
            </label>
            
            {files.length > 0 && (
              <div className="file-preview">
                <div className="preview-header">
                  <span>{files.length} fichier{files.length !== 1 ? 's' : ''} sélectionné{files.length !== 1 ? 's' : ''}</span>
                  <button 
                    type="button" 
                    onClick={() => setFiles([])}
                    className="btn-text"
                  >
                    Tout effacer
                  </button>
                </div>
                
                <div className="file-list">
                  {files.map((file, index) => (
                    <div key={index} className="file-item">
                      <div className="file-icon">
                        {file.type.includes('pdf') ? '📄' : 
                         file.type.includes('word') ? '📝' : 
                         file.type.includes('powerpoint') ? '📊' : 
                         file.type.includes('zip') ? '🗄️' : '📁'}
                      </div>
                      <div className="file-details">
                        <div className="file-name">{file.name}</div>
                        <div className="file-size">{(file.size / 1024).toFixed(1)} KB</div>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => setFiles(files.filter((_, i) => i !== index))}
                        className="btn-icon danger"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="form-group">
            <label>
              <span>Commentaire pour le professeur</span>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Décrivez les modifications ou points importants de cette soumission..."
                rows="4"
              />
            </label>
          </div>
          
          <div className="form-actions">
            <button 
              type="submit" 
              className="btn-primary"
              disabled={isSubmitting || files.length === 0}
            >
              {isSubmitting ? (
                <span className="spinner"></span>
              ) : (
                <>
                  <FiSend /> Soumettre le travail
                </>
              )}
            </button>
          </div>
        </form>
      ) : (
        <div className="card info-message">
          <p>
            <strong>Seul le coordinateur peut soumettre le travail du groupe.</strong><br />
            Contactez {submissions.length > 0 ? submissions[0].submittedBy : 'le coordinateur'} si vous avez des fichiers à ajouter.
          </p>
        </div>
      )}
    </div>
  );
};

// Composant DocumentList amélioré
const DocumentList = ({ documents, onDownload, onShare, isCoordinator }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredDocs = documents.filter(doc => 
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="document-list">
      <div className="section-header">
        <h3>Documents partagés</h3>
        <div className="documents-actions">
          <div className="search-box">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Rechercher un document..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {isCoordinator && (
            <button className="btn-primary" onClick={() => onShare(null)}>
              <FiPlus /> Ajouter
            </button>
          )}
        </div>
      </div>
      
      {filteredDocs.length === 0 ? (
        <div className="card empty-message">
          {searchTerm ? (
            <p>Aucun document ne correspond à votre recherche.</p>
          ) : (
            <p>Aucun document partagé pour le moment.</p>
          )}
        </div>
      ) : (
        <div className="documents-grid">
          {filteredDocs.map(doc => (
            <div key={doc.id} className="document-card">
              <div className="document-icon">
                {doc.name.includes('.pdf') ? '📄' : 
                 doc.name.includes('.doc') ? '📝' : 
                 doc.name.includes('.ppt') ? '📊' : '📁'}
              </div>
              <div className="document-info">
                <h4 className="doc-name">{doc.name}</h4>
                <div className="doc-meta">
                  <span className="doc-author"><FiUser /> {doc.author}</span>
                  <span className="doc-date">Ajouté le {doc.date}</span>
                  <span className="doc-size">{doc.size || 'N/A'}</span>
                </div>
              </div>
              
              <div className="document-actions">
                <button 
                  onClick={() => onDownload(doc.id)}
                  className="btn-icon"
                  title="Télécharger"
                >
                  <FiDownload />
                </button>
                {isCoordinator && (
                  <button 
                    onClick={() => onShare(doc.id)}
                    className="btn-icon"
                    title="Partager avec le professeur"
                  >
                    <FiShare2 />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Composant MessageBoard amélioré
const MessageBoard = ({ messages, currentUser, onSend }) => {
  const [message, setMessage] = useState('');
  const [activeThread, setActiveThread] = useState('group');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage = {
        id: Date.now(),
        text: message,
        sender: currentUser.name,
        senderId: currentUser.id,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: new Date().toLocaleDateString(),
        isCurrentUser: true,
        thread: activeThread
      };
      onSend(newMessage);
      setMessage('');
    }
  };

  return (
    <div className="message-board">
      <div className="message-header">
        <h3>Messagerie</h3>
        <div className="message-tabs">
          <button
            className={`tab-btn ${activeThread === 'group' ? 'active' : ''}`}
            onClick={() => setActiveThread('group')}
          >
            Groupe
          </button>
          <button
            className={`tab-btn ${activeThread === 'professor' ? 'active' : ''}`}
            onClick={() => setActiveThread('professor')}
          >
            Professeur
          </button>
        </div>
      </div>
      
      <div className="messages-container">
        {messages.filter(m => m.thread === activeThread).length === 0 ? (
          <div className="empty-message">
            <p>Aucun message dans cette conversation</p>
            {activeThread === 'professor' && (
              <p>Envoyez un message au professeur pour des questions privées</p>
            )}
          </div>
        ) : (
          messages
            .filter(m => m.thread === activeThread)
            .map(msg => (
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
            placeholder={`Écrire un message ${activeThread === 'group' ? 'au groupe' : 'au professeur'}...`}
            required
            rows="2"
          />
          <button type="submit" className="btn-primary send-btn">
            <FiSend />
          </button>
        </div>
      </form>
    </div>
  );
};

// Composant GroupManagement amélioré
const GroupManagement = ({ group, currentUser, onUpdateGroup }) => {
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [groupName, setGroupName] = useState(group.name);

  const handleAddMember = (e) => {
    e.preventDefault();
    if (newMemberEmail.trim()) {
      const newMember = {
        id: `user${group.members.length + 1}`,
        name: newMemberEmail.split('@')[0],
        email: newMemberEmail,
        avatar: `https://i.pravatar.cc/150?u=${newMemberEmail}`
      };
      onUpdateGroup({
        ...group,
        members: [...group.members, newMember]
      });
      setNewMemberEmail('');
    }
  };

  const handleRemoveMember = (memberId) => {
    if (memberId !== currentUser.id) {
      onUpdateGroup({
        ...group,
        members: group.members.filter(m => m.id !== memberId)
      });
    }
  };

  const handleSetCoordinator = (memberId) => {
    const newCoordinator = group.members.find(m => m.id === memberId);
    if (newCoordinator) {
      onUpdateGroup({
        ...group,
        coordinator: newCoordinator
      });
    }
  };

  const saveGroupName = () => {
    onUpdateGroup({
      ...group,
      name: groupName
    });
    setIsEditing(false);
  };

  return (
    <div className="group-management">
      <div className="section-header">
        <h3>Gestion du groupe</h3>
      </div>
      
      <div className="group-info-card">
        <div className="group-name">
          {isEditing ? (
            <div className="edit-group-name">
              <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
              <button onClick={saveGroupName} className="btn-small">
                Enregistrer
              </button>
              <button onClick={() => setIsEditing(false)} className="btn-small btn-outline">
                Annuler
              </button>
            </div>
          ) : (
            <>
              <h4>{group.name}</h4>
              <button 
                onClick={() => setIsEditing(true)}
                className="btn-icon"
              >
                <FiEdit2 />
              </button>
            </>
          )}
        </div>
        <div className="group-stats">
          <div className="stat-item">
            <span className="stat-number">{group.members.length}</span>
            <span className="stat-label">Membres</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">3</span>
            <span className="stat-label">Soumissions</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">5</span>
            <span className="stat-label">Documents</span>
          </div>
        </div>
      </div>
      
      <div className="management-sections">
        <div className="coordinator-section">
          <h4>Coordinateur actuel</h4>
          <div className="coordinator-card">
            <div 
              className="avatar large"
              style={{ backgroundImage: `url(${group.coordinator.avatar})` }}
            >
              {!group.coordinator.avatar && group.coordinator.name.charAt(0)}
            </div>
            <div className="coordinator-info">
              <h5>{group.coordinator.name}</h5>
              <p>{group.coordinator.email}</p>
              {group.coordinator.id === currentUser.id && (
                <span className="badge">(Vous)</span>
              )}
            </div>
          </div>
        </div>
        
        <div className="members-section">
          <h4>Membres du groupe ({group.members.length})</h4>
          <div className="members-list">
            {group.members.map(member => (
              <div key={member.id} className="member-card">
                <div className="member-info">
                  <div 
                    className="avatar"
                    style={{ backgroundImage: `url(${member.avatar})` }}
                  >
                    {!member.avatar && member.name.charAt(0)}
                  </div>
                  <div>
                    <h5>{member.name}</h5>
                    <p>{member.email}</p>
                  </div>
                </div>
                
                {currentUser.id === group.coordinator.id && member.id !== group.coordinator.id && (
                  <div className="member-actions">
                    <button 
                      onClick={() => handleSetCoordinator(member.id)}
                      className="btn-small"
                    >
                      Désigner coordinateur
                    </button>
                    <button 
                      onClick={() => handleRemoveMember(member.id)}
                      className="btn-small danger"
                    >
                      <FiTrash2 /> Retirer
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="add-member-section">
          <h4>Ajouter un membre</h4>
          <form onSubmit={handleAddMember} className="card">
            <div className="form-group">
              <label>Adresse email de l'étudiant</label>
              <input
                type="email"
                value={newMemberEmail}
                onChange={(e) => setNewMemberEmail(e.target.value)}
                placeholder="email@exemple.com"
                required
              />
            </div>
            <button type="submit" className="btn-primary">
              <FiPlus /> Ajouter au groupe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Composant principal GroupDashboard amélioré
const GroupDashboard = () => {
  // Données mockées améliorées
  const [currentUser, setCurrentUser] = useState({
    id: 'user1',
    name: 'Jean Dupont',
    email: 'jean@exemple.com',
    avatar: 'https://i.pravatar.cc/150?u=jean@exemple.com',
    isCoordinator: true
  });

  const [groupData, setGroupData] = useState({
    id: 'group1',
    name: 'Groupe Projet Web - P22',
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
        avatar: 'https://i.pravatar.cc/150?u=jean@exemple.com'
      },
      { 
        id: 'user2', 
        name: 'Marie Martin', 
        email: 'marie@exemple.com',
        avatar: 'https://i.pravatar.cc/150?u=marie@exemple.com'
      },
      { 
        id: 'user3', 
        name: 'Pierre Durand', 
        email: 'pierre@exemple.com',
        avatar: 'https://i.pravatar.cc/150?u=pierre@exemple.com'
      }
    ]
  });

  const [progress, setProgress] = useState(3);
  const [submissions, setSubmissions] = useState([
    {
      id: 1,
      files: [{ name: 'rapport_partie1.pdf', size: '245.6 KB', type: 'pdf' }],
      date: '15/05/2023',
      time: '14:30',
      comment: 'Première version du rapport avec les chapitres 1 et 2',
      submittedBy: 'Jean Dupont',
      status: 'submitted',
      feedback: {
        text: 'Bon travail, mais le chapitre 2 nécessite plus de détails sur la méthodologie. Veuillez revoir et soumettre à nouveau.',
        files: ['feedback_ch2.pdf'],
        date: '17/05/2023',
        professor: 'Dr. Smith'
      }
    },
    {
      id: 2,
      files: [
        { name: 'presentation.pptx', size: '3.2 MB', type: 'ppt' },
        { name: 'annexes.zip', size: '1.5 MB', type: 'zip' }
      ],
      date: '22/05/2023',
      time: '10:15',
      comment: 'Présentation pour la soutenance et documents annexes',
      submittedBy: 'Marie Martin',
      status: 'approved'
    }
  ]);

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
      isCurrentUser: true,
      thread: 'group'
    },
    {
      id: 2,
      text: 'J\'ai ajouté les maquettes dans les documents partagés. Elles sont encore provisoires mais donnent une bonne idée de l\'interface.',
      sender: 'Marie Martin',
      senderId: 'user2',
      time: '11:45',
      date: '12/05/2023',
      isCurrentUser: false,
      thread: 'group'
    },
    {
      id: 3,
      text: 'J\'ai une question concernant les exigences pour la soutenance. Doit-on préparer un document spécifique?',
      sender: 'Jean Dupont',
      senderId: 'user1',
      time: '09:15',
      date: '15/05/2023',
      isCurrentUser: true,
      thread: 'professor'
    }
  ]);

  const [activeTab, setActiveTab] = useState('progress');

  // Gestionnaires d'événements améliorés
  const handleWorkSubmit = (submission) => {
    setSubmissions([{
      ...submission,
      id: Date.now(),
      submittedBy: currentUser.name,
      status: 'submitted'
    }, ...submissions]);
  };

  const handleDownloadDoc = (docId) => {
    const doc = documents.find(d => d.id === docId);
    alert(`Téléchargement du document: ${doc.name}`);
  };

  const handleShareDoc = (docId) => {
    if (docId) {
      const doc = documents.find(d => d.id === docId);
      setDocuments(documents.map(d => 
        d.id === docId ? { ...d, shared: true } : d
      ));
      alert(`Document partagé avec le professeur: ${doc.name}`);
    } else {
      const newDoc = {
        id: documents.length + 1,
        name: `Nouveau_document_${documents.length + 1}.pdf`,
        date: new Date().toLocaleDateString('fr-FR'),
        size: '0 KB',
        author: currentUser.name,
        shared: false
      };
      setDocuments([newDoc, ...documents]);
    }
  };

  const handleSendMessage = (message) => {
    setMessages([...messages, message]);
  };

  const handleUpdateGroup = (updatedGroup) => {
    setGroupData(updatedGroup);
    if (updatedGroup.coordinator.id === currentUser.id) {
      setCurrentUser({ ...currentUser, isCoordinator: true });
    } else if (currentUser.id === updatedGroup.coordinator.id) {
      setCurrentUser({ ...currentUser, isCoordinator: false });
    }
  };

  return (
    <div className="group-dashboard-container">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isCoordinator={currentUser.isCoordinator} 
      />
      
      <main className="dashboard-content">
        <header className="dashboard-header">
          <div className="header-left">
            <h1>{groupData.name}</h1>
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
              <span className="user-role">
                {currentUser.isCoordinator ? 'Coordinateur' : 'Membre'}
              </span>
            </div>
          </div>
        </header>

        <div className="dashboard-main">
          {activeTab === 'progress' && (
            <section className="progress-section">
              <ProgressTracker
                progress={progress}
                isCoordinator={currentUser.isCoordinator}
                onProgressChange={setProgress}
              />
              
              <div className="progress-notes card">
                <h4>Notes du professeur</h4>
                {progress === 3 && (
                  <div className="note-content">
                    <p>"Le chapitre 1 est bien structuré mais manque de références académiques. Veuillez ajouter au moins 5 sources supplémentaires avant la prochaine soumission."</p>
                    <div className="note-meta">
                      <span className="note-author">Dr. Smith</span>
                      <span className="note-date">15/05/2023</span>
                    </div>
                  </div>
                )}
                {progress !== 3 && (
                  <p className="empty-message">Aucune note pour cette étape.</p>
                )}
              </div>
            </section>
          )}

          {activeTab === 'submissions' && (
            <section className="submissions-section">
              <GroupSubmission
                onSubmit={handleWorkSubmit}
                isCoordinator={currentUser.isCoordinator}
                submissions={submissions}
              />
              
              <div className="submissions-history">
                <h3>Historique des soumissions</h3>
                {submissions.length === 0 ? (
                  <div className="card empty-message">
                    <p>Aucune soumission pour le moment</p>
                  </div>
                ) : (
                  <div className="submissions-list">
                    {submissions.map(sub => (
                      <div key={sub.id} className="submission-card">
                        <div className="submission-header">
                          <div className="submission-meta">
                            <h4>Soumission du {sub.date} à {sub.time}</h4>
                            <span className={`status-badge ${sub.status}`}>
                              {sub.status === 'submitted' ? 'En attente' : 
                               sub.status === 'approved' ? 'Approuvé' : 'Corrections'}
                            </span>
                          </div>
                          <span className="submitted-by">par {sub.submittedBy}</span>
                        </div>
                        
                        {sub.comment && (
                          <div className="submission-comment">
                            <p>{sub.comment}</p>
                          </div>
                        )}
                        
                        <div className="submission-files">
                          {sub.files.map((file, index) => (
                            <div key={index} className="file-item">
                              <div className="file-icon">
                                {file.type === 'pdf' ? '📄' : 
                                 file.type === 'doc' ? '📝' : 
                                 file.type === 'ppt' ? '📊' : '📁'}
                              </div>
                              <div className="file-info">
                                <span className="file-name">{file.name}</span>
                                <span className="file-size">{file.size}</span>
                              </div>
                              <button className="btn-icon">
                                <FiDownload />
                              </button>
                            </div>
                          ))}
                        </div>
                        
                        {sub.feedback && (
                          <div className="submission-feedback">
                            <div className="feedback-header">
                              <h5>Retour du professeur</h5>
                              <span className="feedback-date">{sub.feedback.date}</span>
                            </div>
                            <p>{sub.feedback.text}</p>
                            {sub.feedback.files && sub.feedback.files.length > 0 && (
                              <div className="feedback-files">
                                {sub.feedback.files.map((file, index) => (
                                  <div key={index} className="file-item">
                                    <div className="file-icon">📄</div>
                                    <div className="file-info">
                                      <span className="file-name">{file}</span>
                                      <span className="file-size">N/A</span>
                                    </div>
                                    <button className="btn-icon">
                                      <FiDownload />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          )}

          {activeTab === 'documents' && (
            <section className="documents-section">
              <DocumentList
                documents={documents}
                onDownload={handleDownloadDoc}
                onShare={currentUser.isCoordinator ? handleShareDoc : null}
                isCoordinator={currentUser.isCoordinator}
              />
            </section>
          )}

          {activeTab === 'messages' && (
            <section className="messages-section">
              <MessageBoard
                messages={messages}
                currentUser={currentUser}
                onSend={handleSendMessage}
              />
            </section>
          )}

          {activeTab === 'management' && currentUser.isCoordinator && (
            <section className="management-section">
              <GroupManagement
                group={groupData}
                currentUser={currentUser}
                onUpdateGroup={handleUpdateGroup}
              />
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default GroupDashboard;