import React, { useState } from 'react';
import { FiSearch, FiPlus, FiDownload, FiShare2, FiUser } from 'react-icons/fi';
import './GroupDashboard.css';

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

export default DocumentList;