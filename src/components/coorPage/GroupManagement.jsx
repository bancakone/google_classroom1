import React, { useState } from 'react';
import { FiEdit2, FiTrash2, FiPlus, FiUser } from 'react-icons/fi';
import './GroupDashboard.css';

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

export default GroupManagement;