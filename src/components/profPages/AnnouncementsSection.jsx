import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import PaginationControls from './PaginationControls';

const AnnouncementsSection = ({ announcements, classes, searchTerm }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredAnnouncements = announcements.filter(ann => 
    ann.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    classes.find(c => c.id === ann.classe_id)?.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedAnnouncements = filteredAnnouncements.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section className="announcements-section">
      <div className="section-header">
        <h2>Annonces publiées</h2>
      </div>

      <div className="announcements-list">
        {paginatedAnnouncements.map(ann => {
          const classe = classes.find(c => c.id === ann.classe_id);
          
          return (
            <div key={ann.id} className="announcement-card">
              <div className="announcement-header">
                <h3>{ann.titre}</h3>
                <span className="announcement-date">
                  {new Date(ann.date).toLocaleDateString()}
                </span>
              </div>
              <div className="announcement-info">
                <p>Classe: {classe?.nom || 'N/A'}</p>
              </div>
              <div className="announcement-content">
                {ann.contenu}
              </div>
            </div>
          );
        })}
      </div>

      {filteredAnnouncements.length > itemsPerPage && (
        <PaginationControls
          currentPage={currentPage}
          totalItems={filteredAnnouncements.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      )}
    </section>
  );
};

export default AnnouncementsSection;