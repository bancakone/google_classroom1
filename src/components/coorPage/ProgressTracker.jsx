import React from 'react';
import { FiCheckCircle, FiChevronRight, FiChevronLeft } from 'react-icons/fi';

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

export default ProgressTracker;