import React, { useState } from 'react';
import { FiUpload, FiSend, FiTrash2 } from 'react-icons/fi';
import './GroupDashboard.css';

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

export default GroupSubmission;