import React from 'react';
import {
  FiUsers, FiUpload, FiMessageSquare, FiFileText,
  FiCheckCircle, FiBarChart2, FiShare2, FiSend,
  FiEdit2, FiDownload, FiUser, FiPlus, FiTrash2,
  FiChevronRight, FiChevronLeft, FiSearch, FiSettings
} from 'react-icons/fi';

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

export default Sidebar;