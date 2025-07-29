import React from 'react';
import { FiSearch, FiPlus, FiChevronRight } from 'react-icons/fi';

const Header = ({ 
  activeTab, 
  searchTerm, 
  setSearchTerm,
  setShowClassForm,
  setShowGroupForm,
  setShowWorkForm,
  setShowAnnouncementForm,
  setShowMessageModal,
  classes,
  setSelectedClass
}) => {
  const getTabName = () => {
    switch(activeTab) {
      case 'classes': return 'Classes';
      case 'groups': return 'Groupes';
      case 'students': return 'Étudiants';
      case 'works': return 'Travaux';
      case 'announcements': return 'Annonces';
      case 'messages': return 'Messages';
      default: return '';
    }
  };

  const handleActionButtonClick = () => {
    switch(activeTab) {
      case 'classes': 
        return setShowClassForm(true);
      case 'groups': 
        return classes.length > 0 
          ? (setSelectedClass(classes[0]), setShowGroupForm(true))
          : setShowClassForm(true);
      case 'works': 
        return setShowWorkForm(true);
      case 'announcements': 
        return setShowAnnouncementForm(true);
      case 'messages': 
        return setShowMessageModal(true);
      default: 
        return;
    }
  };

  return (
    <header className="dashboard-header">
      <div className="header-left">
        <h1>Tableau de bord du Professeur</h1>
        <div className="breadcrumbs">
          <span>Accueil</span>
          <FiChevronRight />
          <span>{getTabName()}</span>
        </div>
      </div>

      <div className="header-actions">
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button
          className="btn-primary"
          onClick={handleActionButtonClick}
        >
          <FiPlus /> 
          {activeTab === 'classes' ? 'Nouvelle classe' :
           activeTab === 'groups' ? 'Nouveau groupe' :
           activeTab === 'works' ? 'Nouveau travail' :
           activeTab === 'announcements' ? 'Nouvelle annonce' : 'Nouveau message'}
        </button>
      </div>
    </header>
  );
};

export default Header;