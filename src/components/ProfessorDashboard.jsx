import React, { useState } from 'react';
import {
  FiUsers,
  FiFileText,
  FiMessageSquare,
 FiKey,
  FiEdit,
  FiCheckCircle,
  FiPlus,
  FiMail,
  FiUser,
  FiSearch,
  FiDownload,
FiCopy,
  FiClock,
FiChevronLeft,
FiChevronRight,
  FiUpload,
  FiEye,
  FiMessageCircle,
  FiX
} from 'react-icons/fi';
import './ProfessorDashboard.css';

const ProfessorDashboard = () => {
  const [activeTab, setActiveTab] = useState('groups');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [showGroupForm, setShowGroupForm] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectedCoordinator, setSelectedCoordinator] = useState('');
  const [uploadingFiles, setUploadingFiles] = useState({});
  const [uploadProgress, setUploadProgress] = useState({});
  const [showFileModal, setShowFileModal] = useState(false);
  const [currentSubmission, setCurrentSubmission] = useState(null);
  const [correctionFiles, setCorrectionFiles] = useState([]);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageContent, setMessageContent] = useState('');
  const [messageRecipient, setMessageRecipient] = useState('');
  const [messageSubject, setMessageSubject] = useState('');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [groupToDelete, setGroupToDelete] = useState(null);
  const [showCodeGenerator, setShowCodeGenerator] = useState(false);
const [generatedCodes, setGeneratedCodes] = useState([]);
const [currentCourse, setCurrentCourse] = useState('');

// États pour la pagination
  const [currentPage, setCurrentPage] = useState({
    groups: 1,
    students: 1,
    submissions: 1,
    messages: 1
  });
  const [itemsPerPage] = useState({
    groups: 2,    // 6 cartes de groupe par page
    students: 5,  // 5 étudiants par page
    submissions: 1, // 5 soumissions par page
    messages: 1   // 5 messages par page
  });

  // Fonction de pagination
  const paginate = (items, page, itemsPerPage) => {
    const startIndex = (page - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  };

  // Données simulées
  const allStudents = [
    { id: 1, name: 'Jean Dupont', email: 'jean.dupont@email.com' },
    { id: 2, name: 'Marie Martin', email: 'marie.martin@email.com' },
    { id: 3, name: 'Pierre Durand', email: 'pierre.durand@email.com' },
    { id: 4, name: 'Sophie Lambert', email: 'sophie.lambert@email.com' },
    { id: 5, name: 'Thomas Moreau', email: 'thomas.moreau@email.com' },
    { id: 6, name: 'Laura Petit', email: 'laura.petit@email.com' },
  ];

  const [groups, setGroups] = useState([
    { 
      id: 1, 
      name: 'Groupe Alpha', 
      progress: 75, 
      members: [
        { id: 1, name: 'Jean Dupont', isCoordinator: true },
        { id: 2, name: 'Marie Martin', isCoordinator: false },
        { id: 4, name: 'Sophie Lambert', isCoordinator: false }
      ], 
      lastActivity: '2h', 
      status: 'actif',
      currentStep: 'Rédaction chapitre 3',
      milestones: [
        { step: 'Soumission thème', completed: true, date: '10/01/2023' },
        { step: 'Validation thème', completed: true, date: '15/01/2023' },
        { step: 'Chapitre 1 OK', completed: true, date: '20/02/2023' },
        { step: 'Chapitre 2 OK', completed: true, date: '10/03/2023' },
        { step: 'Rédaction chapitre 3', completed: false },
        { step: 'Version provisoire', completed: false },
        { step: 'Diapo présentation', completed: false },
      ]
    },
    { 
      id: 2, 
      name: 'Groupe Beta', 
      progress: 42, 
      members: [
        { id: 3, name: 'Pierre Durand', isCoordinator: true },
        { id: 5, name: 'Thomas Moreau', isCoordinator: false }
      ], 
      lastActivity: '5j', 
      status: 'en retard',
      currentStep: 'Rédaction chapitre 2',
      milestones: [
        { step: 'Soumission thème', completed: true, date: '12/01/2023' },
        { step: 'Validation thème', completed: true, date: '18/01/2023' },
        { step: 'Chapitre 1 OK', completed: true, date: '25/02/2023' },
        { step: 'Rédaction chapitre 2', completed: false },
        { step: 'Chapitre 2 OK', completed: false },
        { step: 'Rédaction chapitre 3', completed: false },
      ]
    }
  ]);

  const [submissions, setSubmissions] = useState([
    { 
      id: 1, 
      group: 'Groupe Alpha', 
      title: 'Rapport phase 1 - Chapitres 1-2', 
      type: 'Document', 
      date: '15/05/2023', 
      status: 'À corriger',
      files: ['rapport_ch1-2.docx', 'annexes.zip'],
      comments: [
        { author: 'Jean Dupont', text: 'Veuillez trouver ci-joint notre rapport des chapitres 1 et 2', date: '15/05/2023 14:30' },
        { author: 'Professeur', text: 'Merci, je vais examiner cela sous peu', date: '15/05/2023 16:45' }
      ],
      corrections: []
    },
    { 
      id: 2, 
      group: 'Groupe Beta', 
      title: 'Présentation intermédiaire', 
      type: 'Slides', 
      date: '12/05/2023', 
      status: 'Corrigé',
      files: ['presentation_intermediaire.pptx', 'notes.pdf'],
      corrections: ['presentation_corrigee.pptx', 'feedback.pdf'],
      comments: [
        { author: 'Pierre Durand', text: 'Notre présentation pour la revue intermédiaire', date: '12/05/2023 10:15' },
        { author: 'Professeur', text: 'J\'ai ajouté mes corrections et commentaires', date: '18/05/2023 09:20' },
        { author: 'Pierre Durand', text: 'Merci pour les retours, nous allons travailler dessus', date: '18/05/2023 14:30' }
      ]
    }
  ]);

  const [messages, setMessages] = useState([
    { 
      id: 1, 
      from: 'Coordinateur Alpha (Jean Dupont)', 
      subject: 'Clarification exigences chapitre 3', 
      date: '10:30', 
      read: false,
      content: 'Bonjour Professeur, pourriez-vous préciser vos attentes pour le chapitre 3 ? Nous voulons nous assurer de bien comprendre les exigences avant de commencer la rédaction.',
      group: 'Groupe Alpha'
    },
    { 
      id: 2, 
      from: 'Coordinateur Beta (Pierre Durand)', 
      subject: 'Demande extension délai', 
      date: 'Hier', 
      read: true,
      content: 'Cher Professeur, nous rencontrons des difficultés techniques avec la collecte de données. Serait-il possible d\'avoir une semaine supplémentaire pour le chapitre 2 ?',
      group: 'Groupe Beta'
    }
  ]);

 

 // Fonctions de filtrage (inchangées)
  const filteredGroups = groups.filter(group => 
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.members.some(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredSubmissions = submissions.filter(sub => 
    sub.group.toLowerCase().includes(searchTerm.toLowerCase()) || 
    sub.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fonctions pour les boutons
  const handleContactGroup = (group) => {
    setMessageRecipient(`Coordinateur ${group.name} (${group.members.find(m => m.isCoordinator)?.name})`);
    setMessageSubject(`À propos du groupe ${group.name}`);
    setMessageContent('');
    setShowMessageModal(true);
  };

  const handleEditGroup = (group) => {
    setSelectedGroup(group);
    setNewGroupName(group.name);
    setSelectedStudents(group.members.map(m => allStudents.find(s => s.id === m.id)));
    setSelectedCoordinator(group.members.find(m => m.isCoordinator)?.id || '');
    setShowGroupForm(true);
  };

  const handleViewDetails = (submission) => {
    setCurrentSubmission(submission);
    setShowDetailsModal(true);
  };

  const handleDeleteGroup = (groupId) => {
  setGroupToDelete(groupId);
  setShowDeleteModal(true);
};

  const handleDownload = (submission) => {
    // Simulation de téléchargement
    const link = document.createElement('a');
    link.href = `#${submission.id}`;
    link.download = submission.files[0];
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const generateAccessCodes = () => {
  if (!currentCourse) return;
  
  const codes = [];
  for (let i = 0; i < 5; i++) { // Génère 5 codes par défaut
    const code = Math.random().toString(36).substring(2, 10).toUpperCase();
    codes.push({
      code,
      course: currentCourse,
      used: false,
      createdAt: new Date().toISOString()
    });
  }
  
  setGeneratedCodes([...generatedCodes, ...codes]);
};

  const handleComment = (submission) => {
    const comment = prompt(`Ajouter un commentaire pour ${submission.title}:`);
    if (comment) {
      setSubmissions(prev => prev.map(sub => {
        if (sub.id === submission.id) {
          return {
            ...sub,
            comments: [
              ...sub.comments,
              {
                author: 'Professeur',
                text: comment,
                date: new Date().toLocaleString()
              }
            ]
          };
        }
        return sub;
      }));
    }
  };

  const handleNewMessage = () => {
    setMessageRecipient('');
    setMessageSubject('');
    setMessageContent('');
    setShowMessageModal(true);
  };

  const handleReplyMessage = (message) => {
    setMessageRecipient(message.from);
    setMessageSubject(`RE: ${message.subject}`);
    setMessageContent(`\n\n--- Message original ---\n${message.content}`);
    setShowMessageModal(true);
  };

  const handleViewGroup = (message) => {
    const groupName = message.group.replace('Groupe ', '');
    const group = groups.find(g => g.name.includes(groupName));
    if (group) {
      setActiveTab('groups');
      setSelectedGroup(group);
    }
  };

  const sendMessage = () => {
    if (messageRecipient && messageSubject && messageContent) {
      const newMessage = {
        id: messages.length + 1,
        from: 'Professeur',
        to: messageRecipient,
        subject: messageSubject,
        content: messageContent,
        date: new Date().toLocaleTimeString(),
        read: false
      };
      
      setMessages([newMessage, ...messages]);
      setShowMessageModal(false);
    }
  };

  const handleCreateGroup = () => {
    if (!newGroupName || !selectedCoordinator || selectedStudents.length < 2) return;

    const newGroup = {
      id: groups.length + 1,
      name: newGroupName,
      progress: 0,
      members: selectedStudents.map(student => ({
        id: student.id,
        name: student.name,
        isCoordinator: student.id.toString() === selectedCoordinator
      })),
      lastActivity: 'Maintenant',
      status: 'actif',
      currentStep: 'Soumission thème',
      milestones: [
        { step: 'Soumission thème', completed: false },
        { step: 'Validation thème', completed: false },
        { step: 'Chapitre 1 OK', completed: false },
        { step: 'Chapitre 2 OK', completed: false },
        { step: 'Rédaction chapitre 3', completed: false },
        { step: 'Version provisoire', completed: false },
        { step: 'Diapo présentation', completed: false },
      ]
    };

    setGroups([...groups, newGroup]);
    setShowGroupForm(false);
    setNewGroupName('');
    setSelectedStudents([]);
    setSelectedCoordinator('');
  };

  const toggleStudentSelection = (student) => {
  setSelectedStudents(prev => 
    prev.some(s => s.id === student.id)
      ? prev.filter(s => s.id !== student.id)
      : [...prev, student]
  );
};
  const handleFileUpload = (event, submissionId) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    setCurrentSubmission(submissionId);
    setCorrectionFiles(files);
    setShowFileModal(true);
  };

  const confirmDelete = () => {
  if (groupToDelete) {
    setGroups(groups.filter(group => group.id !== groupToDelete));
    setSubmissions(submissions.filter(sub => {
      const groupName = groups.find(g => g.id === groupToDelete)?.name;
      return groupName ? !sub.group.includes(groupName) : true;
    }));
  }
  setShowDeleteModal(false);
  setGroupToDelete(null);
};

  const submitCorrections = () => {
    setUploadingFiles(prev => ({
      ...prev,
      [currentSubmission]: correctionFiles.map(file => file.name)
    }));

    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(prev => ({
        ...prev,
        [currentSubmission]: progress
      }));
      
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setSubmissions(prev => prev.map(sub => {
            if (sub.id === currentSubmission) {
              return {
                ...sub,
                status: 'Corrigé',
                corrections: correctionFiles.map(file => file.name),
                comments: [
                  ...sub.comments,
                  {
                    author: 'Professeur',
                    text: 'J\'ai ajouté mes corrections',
                    date: new Date().toLocaleString()
                  }
                ]
              };
            }
            return sub;
          }));

          setUploadingFiles(prev => {
            const updated = {...prev};
            delete updated[currentSubmission];
            return updated;
          });
          setUploadProgress(prev => {
            const updated = {...prev};
            delete updated[currentSubmission];
            return updated;
          });
          setShowFileModal(false);
          setCorrectionFiles([]);
        }, 500);
      }
    }, 300);
  };

  return (
    <div className="professor-dashboard">
      {/* En-tête */}
      <header className="dashboard-header">
        <div className="header-title">
          <h1><FiUser /> Dashboard Professeur</h1>
          <p className="subtitle">Gestion des groupes et projets de recherche</p>
        </div>
        <div className="header-actions">
          <div className="search-box">
            <FiSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Rechercher groupes, étudiants..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn primary" onClick={() => setShowGroupForm(true)}>
            <FiPlus /> Nouveau groupe
          </button>
        </div>
      </header>

      {/* Formulaire de création de groupe */}
     {showGroupForm && (
  <div className="modal-overlay">
    <div className="modal-content">
      <div className="modal-header">
        <h2>{selectedGroup ? 'Modifier le groupe' : 'Créer un nouveau groupe'}</h2>
        <button className="btn icon-btn" onClick={() => {
          setShowGroupForm(false);
          setSelectedGroup(null);
        }}>
          <FiX />
        </button>
      </div>
      
      <div className="form-group">
        <label>Nom du groupe</label>
        <input 
          type="text" 
          value={newGroupName}
          onChange={(e) => setNewGroupName(e.target.value)}
          placeholder="Entrez le nom du groupe"
        />
      </div>
      
      <div className="form-group">
        <label>Sélectionnez les membres du groupe (minimum 2)</label>
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Rechercher un étudiant..." 
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div><div className="students-list">
  {allStudents
    .filter(student => 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .map(student => (
      <div 
        key={student.id} 
        className={`student-item 
          ${selectedStudents.some(s => s.id === student.id) ? 'selected' : ''}
          ${student.id.toString() === selectedCoordinator ? 'coordinator' : ''}
        `}
        onClick={() => toggleStudentSelection(student)}
      >
        <input 
          type="checkbox" 
          checked={selectedStudents.some(s => s.id === student.id)}
          onChange={() => toggleStudentSelection(student)}
        />
        <div className="student-info">
          <span className="student-name">
            {student.name}
            {student.id.toString() === selectedCoordinator && (
              <span className="coordinator-badge"> (Coordinateur)</span>
            )}
          </span>
          <span className="student-email">{student.email}</span>
        </div>
      </div>
    ))}
</div>
      </div>
      
   {selectedStudents.length > 0 && (
  <div className="form-group">
    <label>
      Désigner le coordinateur *
      {!selectedCoordinator && (
        <span className="required-warning"> (Ce champ est obligatoire)</span>
      )}
    </label>
    <select
      value={selectedCoordinator}
      onChange={(e) => setSelectedCoordinator(e.target.value)}
      className={!selectedCoordinator ? "required-field" : ""}
    >
      <option value="">Sélectionnez un coordinateur</option>
      {selectedStudents.map(student => (
        <option key={student.id} value={student.id}>
          {student.name}
          {selectedStudents.length > 0 && student.id.toString() === selectedCoordinator && (
            <span> (Coordinateur)</span>
          )}
        </option>
      ))}
    </select>
  </div>
)}
      
      <div className="modal-actions">
        <button className="btn secondary" onClick={() => {
          setShowGroupForm(false);
          setSelectedGroup(null);
        }}>
          Annuler
        </button>
        <button 
          className="btn primary" 
          onClick={selectedGroup ? () => {
            setGroups(groups.map(g => 
              g.id === selectedGroup.id 
                ? {
                    ...g,
                    name: newGroupName,
                    members: selectedStudents.map(student => ({
                      id: student.id,
                      name: student.name,
                      isCoordinator: student.id.toString() === selectedCoordinator
                    }))
                  }
                : g
            ));
            setShowGroupForm(false);
            setSelectedGroup(null);
          } : handleCreateGroup}
          disabled={!newGroupName || !selectedCoordinator || selectedStudents.length < 2}
        >
          {selectedGroup ? 'Mettre à jour' : 'Créer le groupe'}
        </button>
      </div>
    </div>
  </div>
)}

      {/* Modal pour le téléversement de fichiers */}
      {showFileModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Envoyer des corrections</h2>
              <button className="btn icon-btn" onClick={() => setShowFileModal(false)}>
                <FiX />
              </button>
            </div>
            
            <div className="form-group">
              <label>Fichiers de correction</label>
              <div className="file-list">
                {correctionFiles.map((file, index) => (
                  <div key={index} className="file-item">
                    <span>{file.name}</span>
                    <button 
                      className="btn icon-btn small-btn"
                      onClick={() => setCorrectionFiles(correctionFiles.filter((_, i) => i !== index))}
                    >
                      <FiX />
                    </button>
                  </div>
                ))}
              </div>
              
              <input 
                type="file" 
                id="add-more-files"
                className="file-input"
                onChange={(e) => setCorrectionFiles([...correctionFiles, ...Array.from(e.target.files)])}
                multiple
              />
              <label htmlFor="add-more-files" className="btn secondary">
                <FiPlus /> Ajouter des fichiers
              </label>
            </div>
            
            <div className="modal-actions">
              <button className="btn secondary" onClick={() => setShowFileModal(false)}>
                Annuler
              </button>
              <button 
                className="btn primary" 
                onClick={submitCorrections}
                disabled={correctionFiles.length === 0}
              >
                <FiUpload /> Envoyer les corrections
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal pour les messages */}
      {showMessageModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{messageRecipient.includes('RE:') ? 'Répondre au message' : 'Nouveau message'}</h2>
              <button className="btn icon-btn" onClick={() => setShowMessageModal(false)}>
                <FiX />
              </button>
            </div>
            
            <div className="form-group">
              <label>Destinataire</label>
              <input 
                type="text" 
                value={messageRecipient}
                onChange={(e) => setMessageRecipient(e.target.value)}
                placeholder="Entrez le nom du destinataire"
              />
            </div>
            
            <div className="form-group">
              <label>Sujet</label>
              <input 
                type="text" 
                value={messageSubject}
                onChange={(e) => setMessageSubject(e.target.value)}
                placeholder="Entrez le sujet du message"
              />
            </div>
            
            <div className="form-group">
              <label>Message</label>
              <textarea 
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                placeholder="Écrivez votre message ici..."
                rows="6"
              />
            </div>
            
            <div className="modal-actions">
              <button className="btn secondary" onClick={() => setShowMessageModal(false)}>
                Annuler
              </button>
              <button 
                className="btn primary" 
                onClick={sendMessage}
                disabled={!messageRecipient || !messageSubject || !messageContent}
              >
                <FiMail /> Envoyer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal pour voir les détails */}
      {showDetailsModal && currentSubmission && (
        <div className="modal-overlay">
          <div className="modal-content wide-modal">
            <div className="modal-header">
              <h2>Détails de la soumission</h2>
              <button className="btn icon-btn" onClick={() => setShowDetailsModal(false)}>
                <FiX />
              </button>
            </div>
            
            <div className="submission-details">
              <div className="detail-row">
                <span className="detail-label">Groupe:</span>
                <span className="detail-value">{currentSubmission.group}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Titre:</span>
                <span className="detail-value">{currentSubmission.title}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Type:</span>
                <span className="detail-value">{currentSubmission.type}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Date:</span>
                <span className="detail-value">{currentSubmission.date}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Statut:</span>
                <span className={`detail-value status-badge ${currentSubmission.status.toLowerCase().replace(' ', '-')}`}>
                  {currentSubmission.status}
                </span>
              </div>
              
              <div className="files-section">
                <h3>Fichiers soumis</h3>
                <div className="files-list">
                  {currentSubmission.files.map((file, index) => (
                    <div key={index} className="file-item">
                      <span>{file}</span>
                      <button 
                        className="btn icon-btn small-btn download-btn"
                        onClick={() => handleDownload(currentSubmission)}
                      >
                        <FiDownload />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              {currentSubmission.corrections.length > 0 && (
                <div className="files-section">
                  <h3>Corrections</h3>
                  <div className="files-list">
                    {currentSubmission.corrections.map((file, index) => (
                      <div key={index} className="file-item">
                        <span>{file}</span>
                        <button 
                          className="btn icon-btn small-btn download-btn"
                          onClick={() => {
                            const link = document.createElement('a');
                            link.href = `#${currentSubmission.id}-correction-${index}`;
                            link.download = file;
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                          }}
                        >
                          <FiDownload />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="comments-section">
                <h3>Commentaires</h3>
                <div className="comments-list">
                  {currentSubmission.comments.map((comment, index) => (
                    <div key={index} className={`comment-item ${comment.author === 'Professeur' ? 'professor-comment' : ''}`}>
                      <div className="comment-header">
                        <span className="comment-author">{comment.author}</span>
                        <span className="comment-date">{comment.date}</span>
                      </div>
                      <div className="comment-content">
                        {comment.text}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="add-comment">
                  <textarea 
                    placeholder="Ajouter un commentaire..."
                    rows="3"
                  />
                  <button className="btn primary">
                    <FiMessageCircle /> Envoyer
                  </button>
                </div>
              </div>
            </div>
            
            <div className="modal-actions">
              <button className="btn secondary" onClick={() => setShowDetailsModal(false)}>
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation par onglets */}
      <nav className="dashboard-tabs">
  <button 
    className={`tab-btn ${activeTab === 'groups' ? 'active' : ''}`}
    onClick={() => setActiveTab('groups')}
  >
    <FiUsers /> Groupes
  </button>
  <button 
    className={`tab-btn ${activeTab === 'students' ? 'active' : ''}`}
    onClick={() => setActiveTab('students')}
  >
    <FiUser /> Étudiants
  </button>
  <button 
    className={`tab-btn ${activeTab === 'submissions' ? 'active' : ''}`}
    onClick={() => setActiveTab('submissions')}
  >
    <FiFileText /> Travaux soumis
  </button>
  <button 
    className={`tab-btn ${activeTab === 'messages' ? 'active' : ''}`}
    onClick={() => setActiveTab('messages')}
  >
    <FiMessageSquare /> Messages
  </button>
</nav>

      {/* Section Statistiques */}
      <section className="stats-section">
        <div className="stat-card">
          <div className="stat-value">{groups.length}</div>
          <div className="stat-label">Groupes actifs</div>
        </div>
        <div className="stat-card warning">
          <div className="stat-value">{groups.filter(g => g.status === 'en retard').length}</div>
          <div className="stat-label">Groupes en retard</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{submissions.filter(s => s.status === 'À corriger').length}</div>
          <div className="stat-label">Travaux à corriger</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{messages.filter(m => !m.read).length}</div>
          <div className="stat-label">Messages non lus</div>
        </div>
      </section>

      {/* Contenu des onglets */}
      <div className="tab-content">
        {activeTab === 'groups' && (
           <div className="groups-section">
                  <div className="section-header">
                    <h2>Vos groupes de recherche</h2>
                    <div className="header-actions">
                      <button className="btn primary" onClick={() => setShowCodeGenerator(true)}>
                        <FiKey /> Générer des codes
                      </button>

                    </div>
                  </div>
                 {activeTab === 'students' && (
                <div className="students-section">
                  <div className="section-header">
                    <h2>Liste des étudiants</h2>
                    <div className="search-box">
                      <FiSearch className="search-icon" />
                      <input 
                        type="text" 
                        placeholder="Rechercher un étudiant..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
    
    <div className="students-table">
      <div className="table-header">
        <div className="col">Nom</div>
        <div className="col">Email</div>
        <div className="col">Groupe</div>
        <div className="col">Rôle</div>
        <div className="col">Statut</div>
        <div className="col">Actions</div>
      </div>
      
     {paginate(
  allStudents.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  ),
  currentPage.students,
  itemsPerPage.students
).map(student => {
  const studentGroup = groups.find(group => 
    group.members.some(member => member.id === student.id)
  );
  
  const isCoordinator = studentGroup?.members.find(member => 
    member.id === student.id
  )?.isCoordinator;
  
  return (
    <div key={student.id} className="table-row">
      <div className="col">{student.name}</div>
      <div className="col">{student.email}</div>
      <div className="col">
        {studentGroup ? (
          <span className="group-badge">{studentGroup.name}</span>
        ) : (
          <span className="no-group">Aucun groupe</span>
        )}
      </div>
      <div className="col">
        {isCoordinator ? (
          <span className="role-badge coordinator">Coordinateur</span>
        ) : studentGroup ? (
          <span className="role-badge member">Membre</span>
        ) : (
          <span className="role-badge">-</span>
        )}
      </div>
      <div className="col">
        {studentGroup ? (
          <span className={`status-badge ${studentGroup.status === 'en retard' ? 'late' : 'active'}`}>
            {studentGroup.status}
          </span>
        ) : (
          <span className="status-badge inactive">Inactif</span>
        )}
      </div>
      <div className="col actions-col">
        <button 
          className="btn icon-btn message-btn"
          onClick={() => {
            setMessageRecipient(student.name);
            setMessageSubject(`Message pour ${student.name}`);
            setMessageContent('');
            setShowMessageModal(true);
          }}
        >
          <FiMessageSquare />
        </button>
        {studentGroup && (
          <button 
            className="btn icon-btn group-btn"
            onClick={() => {
              setActiveTab('groups');
              setSelectedGroup(studentGroup);
            }}
          >
            <FiUsers />
          </button>
        )}
      </div>
    </div>
  );
})}
    </div>
    
                <div className="section-footer">
                  <p>Total: {allStudents.length} étudiants</p>
                  <div className="status-legend">
                    <span><span className="legend-color coordinator"></span> Coordinateur</span>
                    <span><span className="legend-color member"></span> Membre</span>
                    <span><span className="legend-color inactive"></span> Sans groupe</span>
                  </div>
                </div>
              </div>
            )}

            <div className="horizontal-groups-container">
               {paginate(filteredGroups, currentPage.groups, itemsPerPage.groups).map(group => (
                <div key={group.id} className={`group-card ${group.status === 'en retard' ? 'late' : ''}`}>
                  <div className="group-header">
                    <h3>{group.name}</h3>
                    <span className="group-status">{group.status}</span>
                  </div>
                  
                  <div className="progress-container">
                    <div className="progress-info">
                      <span>Progression</span>
                      <span>{group.progress}%</span>
                    </div>
                    <div className="progress-bar">
                      <div style={{ width: `${group.progress}%` }}></div>
                    </div>
                    <div className="current-step">
                      <FiClock /> Étape actuelle: {group.currentStep}
                    </div>
                  </div>
                  
                  <div className="milestones">
                    <h4>Étapes du projet:</h4>
                    <div className="milestones-grid">
                      {group.milestones.map((milestone, index) => (
                        <div key={index} className={`milestone-item ${milestone.completed ? 'completed' : ''}`}>
                          {milestone.completed ? <FiCheckCircle className="milestone-icon" /> : <FiClock className="milestone-icon" />}
                          <div>
                            <span className="milestone-step">{milestone.step}</span>
                            {milestone.completed && milestone.date && (
                              <span className="milestone-date">{milestone.date}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="group-footer">
                    <div className="group-meta">
                      <span><FiUsers /> {group.members.length} membres</span>
                      <span><FiClock /> Dernière activité: {group.lastActivity}</span>
                    </div>
                    <div className="group-actions">
                      <button 
                        className="btn small-btn contact-btn"
                        onClick={() => handleContactGroup(group)}
                      >
                        <FiMessageSquare /> Contacter
                      </button>
                      <button 
                        className="btn small-btn edit-btn"
                        onClick={() => handleEditGroup(group)}
                      >
                        <FiEdit /> Modifier
                      </button>
                                      <button 
                  className="btn small-btn delete-btn"
                  onClick={() => handleDeleteGroup(group.id)}
                >
                  <FiX /> Supprimer
                </button>
                </div>
                  </div>
                </div>
              ))}
            </div>
{filteredGroups.length > itemsPerPage.groups && (
      <div className="table-footer">
        <div className="pagination-controls">
          <button
            className="btn pagination-btn"
            onClick={() => setCurrentPage(prev => ({ ...prev, groups: Math.max(1, prev.groups - 1) }))}
            disabled={currentPage.groups === 1}
          >
            <FiChevronLeft /> Précédent
          </button>
          <span className="page-info">
            Page {currentPage.groups} sur {Math.ceil(filteredGroups.length / itemsPerPage.groups)}
          </span>
          <button
            className="btn pagination-btn"
            onClick={() => setCurrentPage(prev => ({ ...prev, groups: prev.groups + 1 }))}
            disabled={currentPage.groups * itemsPerPage.groups >= filteredGroups.length}
          >
            Suivant <FiChevronRight />
          </button>
        </div>
        <div className="total-items">
          Total: {filteredGroups.length} groupes
        </div>
      </div>
    )}

            
          </div>
        )}


        {showCodeGenerator && (
  <div className="modal-overlay">
    <div className="modal-content">
      <div className="modal-header">
        <h2>Générer des codes d'accès</h2>
        <button className="btn icon-btn" onClick={() => setShowCodeGenerator(false)}>
          <FiX />
        </button>
      </div>
      
      <div className="form-group">
        <label>Pour quel cours ?</label>
        <input
          type="text"
          value={currentCourse}
          onChange={(e) => setCurrentCourse(e.target.value)}
          placeholder="Nom du cours"
        />
      </div>
      
      <button className="btn primary" onClick={generateAccessCodes}>
        Générer des codes
      </button>
      
      {generatedCodes.length > 0 && (
        <div className="generated-codes">
          <h3>Codes générés :</h3>
          <div className="codes-list">
            {generatedCodes
              .filter(code => code.course === currentCourse)
              .map((code, index) => (
                <div key={index} className="code-item">
                  <span>{code.code}</span>
                  <span>{code.used ? '(Utilisé)' : '(Disponible)'}</span>
                  <button 
                    className="btn icon-btn small-btn"
                    onClick={() => navigator.clipboard.writeText(code.code)}
                  >
                    <FiCopy />
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  </div>
)}

    {activeTab === 'submissions' && (
  <div className="submissions-section">
    <div className="section-header">
      <h2>Travaux soumis par les groupes</h2>
      <div className="section-actions">
        <select className="filter-select">
          <option>Tous les statuts</option>
          <option>À corriger</option>
          <option>En revision</option>
          <option>Corrigé</option>
        </select>
      </div>
    </div>

    <div className="submissions-table">
      <div className="table-header">
        <div className="col">Groupe</div>
        <div className="col">Titre</div>
        <div className="col">Type</div>
        <div className="col">Date</div>
        <div className="col">Statut</div>
        <div className="col">Actions</div>
      </div>

      {paginate(filteredSubmissions, currentPage.submissions, itemsPerPage.submissions).map((sub) => (
        <div key={sub.id} className="table-row">
          <div className="col group-col">
            <span className="group-badge">{sub.group}</span>
          </div>
          <div className="col">{sub.title}</div>
          <div className="col">
            <span className={`type-badge ${sub.type.toLowerCase()}`}>
              {sub.type}
            </span>
          </div>
          <div className="col">{sub.date}</div>
          <div className="col">
            <span className={`status-badge ${sub.status.toLowerCase().replace(' ', '-')}`}>
              {sub.status}
            </span>
          </div>
          <div className="col actions-col">
            <button 
              className="btn icon-btn details-btn" 
              onClick={() => handleViewDetails(sub)}
            >
              <FiEye />
            </button>
            <button 
              className="btn icon-btn download-btn"
              onClick={() => handleDownload(sub)}
            >
              <FiDownload />
            </button>
            {sub.status === 'À corriger' && (
              <div className="upload-corrections">
                <input 
                  type="file"
                  id={`file-upload-${sub.id}`}
                  className="file-upload-input"
                  onChange={(e) => handleFileUpload(e, sub.id)}
                  multiple
                />
                <label htmlFor={`file-upload-${sub.id}`} className="btn icon-btn upload-btn">
                  <FiUpload />
                </label>
                {uploadingFiles[sub.id] && (
                  <div className="upload-status">
                    <div className="upload-progress">
                      Téléversement: {uploadProgress[sub.id]}%
                    </div>
                    <div className="upload-progress-bar">
                      <div style={{ width: `${uploadProgress[sub.id]}%` }}></div>
                    </div>
                  </div>
                )}
              </div>
            )}
            <button 
              className="btn icon-btn comment-btn"
              onClick={() => handleComment(sub)}
            >
              <FiMessageCircle />
            </button>
          </div>
        </div>
      ))}
    </div>

    {filteredSubmissions.length > itemsPerPage.submissions && (
      <div className="table-footer">
        <div className="pagination-controls">
          <button
            className="btn pagination-btn"
            onClick={() => setCurrentPage((prev) => ({
              ...prev,
              submissions: Math.max(1, prev.submissions - 1),
            }))}
            disabled={currentPage.submissions === 1}
          >
            <FiChevronLeft /> Précédent
          </button>
          <span className="page-info">
            Page {currentPage.submissions} sur {Math.ceil(filteredSubmissions.length / itemsPerPage.submissions)}
          </span>
          <button
            className="btn pagination-btn"
            onClick={() => setCurrentPage((prev) => ({
              ...prev,
              submissions: prev.submissions + 1,
            }))}
            disabled={currentPage.submissions * itemsPerPage.submissions >= filteredSubmissions.length}
          >
            Suivant <FiChevronRight />
          </button>
        </div>
        <div className="total-items">
          {filteredSubmissions.length} soumission{filteredSubmissions.length !== 1 ? 's' : ''}
        </div>
      </div>
    )}
  </div>
)}


{activeTab === 'messages' && (
  <div className="messages-section">
    <div className="section-header">
      <h2>Messages des coordinateurs</h2>
      <button 
        className="btn primary new-message-btn"
        onClick={handleNewMessage}
      >
        <FiPlus /> Nouveau message
      </button>
    </div>
     {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Confirmer la suppression</h2>
              <button className="btn icon-btn" onClick={() => setShowDeleteModal(false)}>
                <FiX />
              </button>
            </div>
            
            <div className="modal-body">
              <p>Êtes-vous sûr de vouloir supprimer ce groupe ? Cette action est irréversible.</p>
              <p>Toutes les soumissions associées seront également supprimées.</p>
            </div>
            
            <div className="modal-actions">
              <button className="btn secondary" onClick={() => setShowDeleteModal(false)}>
                Annuler
              </button>
              <button className="btn danger" onClick={confirmDelete}>
                <FiX /> Supprimer définitivement
              </button>
            </div>
          </div>
        </div>
      )}
    <div className="messages-list">
  {paginate(
    messages,
    currentPage.messages,
    itemsPerPage.messages
  ).map(msg => (
    <div key={msg.id} className={`message-card ${!msg.read ? 'unread' : ''}`}>
      <div className="message-header">
        <div className="sender-info">
          <div className="sender-avatar">
            {msg.from.charAt(0)}
          </div>
          <div>
            <h4>{msg.from}</h4>
            <p>{msg.subject} - {msg.group}</p>
          </div>
        </div>
        <span className="message-date">{msg.date}</span>
      </div>
      <div className="message-content">
        {msg.content}
      </div>
      <div className="message-actions">
        <button 
          className="btn small-btn reply-btn"
          onClick={() => handleReplyMessage(msg)}
        >
          <FiMail /> Répondre
        </button>
        <button 
          className="btn small-btn view-group-btn"
          onClick={() => handleViewGroup(msg)}
        >
          <FiUser /> Voir le groupe
        </button>
      </div>
    </div>
  ))}
  {messages.length > itemsPerPage.messages && (
    <div className="table-footer">
      <div className="pagination-controls">
        <button
          className="btn pagination-btn"
          onClick={() => setCurrentPage(prev => ({
            ...prev,
            messages: Math.max(1, prev.messages - 1)
          }))}
          disabled={currentPage.messages === 1}
        >
          <FiChevronLeft /> Précédent
        </button>
        <span className="page-info">
          Page {currentPage.messages} sur {Math.ceil(messages.length / itemsPerPage.messages)}
        </span>
        <button
          className="btn pagination-btn"
          onClick={() => setCurrentPage(prev => ({
            ...prev,
            messages: prev.messages + 1
          }))}
          disabled={currentPage.messages * itemsPerPage.messages >= messages.length}
        >
          Suivant <FiChevronRight />
        </button>
      </div>
    </div>
  )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfessorDashboard;