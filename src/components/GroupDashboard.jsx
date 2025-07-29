import React, { useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import Sidebar from './coorPage/Sidebar';
import ProgressTracker from './coorPage/ProgressTracker';
import GroupSubmission from './coorPage/GroupSubmission';
import DocumentList from './coorPage/Document'; // pas "DocumentList", ton fichier s'appelle "Document.jsx"
import MessageBoard from './coorPage/MessageBoard';
import GroupManagement from './coorPage/GroupManagement';
import './coorPage/GroupDashboard.css';

const GroupDashboard = () => {
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
  const [submissions, setSubmissions] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [messages, setMessages] = useState([]);
  const [activeTab, setActiveTab] = useState('progress');

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
                        {/* ... (le reste du code de rendu des soumissions) ... */}
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