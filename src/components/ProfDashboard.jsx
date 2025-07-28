import { useState } from "react";
import {
  FiBell,
  FiBook,
  FiCalendar,
  FiFileText,
  FiLogOut,
  FiMessageSquare,
  FiSearch,
  FiSettings,
  FiUsers,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "./ProfDashboard.css";

const ProfDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("projects");
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      text: "Nouveau commentaire sur votre projet",
      time: "10 min",
      read: false,
    },
    {
      id: 2,
      text: "Rappel: Échéance demain pour le projet A",
      time: "1h",
      read: false,
    },
  ]);

  // Données factices pour les projets
  const projects = [
    {
      id: 1,
      title: "Projet Tutoré A",
      progress: 75,
      deadline: "15/06/2023",
      members: 4,
    },
    {
      id: 2,
      title: "Projet Tutoré B",
      progress: 30,
      deadline: "30/06/2023",
      members: 3,
    },
    {
      id: 3,
      title: "Projet Tutoré C",
      progress: 90,
      deadline: "05/06/2023",
      members: 5,
    },
  ];

  const recentActivities = [
    {
      id: 1,
      text: "Vous avez soumis le livrable 2",
      time: "2h",
      icon: <FiFileText />,
    },
    {
      id: 2,
      text: "Dr. Martin a commenté votre projet",
      time: "5h",
      icon: <FiMessageSquare />,
    },
    {
      id: 3,
      text: "Réunion d'équipe programmée",
      time: "1j",
      icon: <FiCalendar />,
    },
  ];

  const handleLogout = () => {
    // Logique de déconnexion
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>
            Project<span>Flow</span>
          </h2>
        </div>

        <div className="sidebar-menu">
          <div
            className={`menu-item ${activeTab === "projects" ? "active" : ""}`}
            onClick={() => setActiveTab("projects")}
          >
            <FiBook className="menu-icon" />
            <span>Mes Projets</span>
          </div>

          <div
            className={`menu-item ${activeTab === "groups" ? "active" : ""}`}
            onClick={() => setActiveTab("groups")}
          >
            <FiUsers className="menu-icon" />
            <span>Groupes</span>
          </div>

          <div
            className={`menu-item ${activeTab === "calendar" ? "active" : ""}`}
            onClick={() => setActiveTab("calendar")}
          >
            <FiCalendar className="menu-icon" />
            <span>Calendrier</span>
          </div>

          <div
            className={`menu-item ${activeTab === "messages" ? "active" : ""}`}
            onClick={() => setActiveTab("messages")}
          >
            <FiMessageSquare className="menu-icon" />
            <span>Messages</span>
          </div>
        </div>

        <div className="sidebar-footer">
          <div className="menu-item" onClick={() => setActiveTab("settings")}>
            <FiSettings className="menu-icon" />
            <span>Paramètres</span>
          </div>
          <div className="menu-item" onClick={handleLogout}>
            <FiLogOut className="menu-icon" />
            <span>Déconnexion</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Top Navigation */}
        <div className="top-nav">
          <div className="search-bar">
            <FiSearch className="search-icon" />
            <input type="text" placeholder="Rechercher un projet, groupe..." />
          </div>

          <div className="user-actions">
            <div className="notification-bell">
              <FiBell />
              {notifications.filter((n) => !n.read).length > 0 && (
                <span className="notification-badge">
                  {notifications.filter((n) => !n.read).length}
                </span>
              )}
            </div>

            <div className="user-profile">
              <img src="/images/user-avatar.jpg" alt="Profile" />
              <span>John Doe</span>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="dashboard-content">
          <h1 className="dashboard-title">Tableau de Bord</h1>

          {/* Projects Overview */}
          <div className="projects-overview">
            <h2>Mes Projets en Cours</h2>
            <div className="projects-grid">
              {projects.map((project) => (
                <div key={project.id} className="project-card">
                  <div className="project-header">
                    <h3>{project.title}</h3>
                    <span className="deadline">
                      Échéance: {project.deadline}
                    </span>
                  </div>

                  <div className="progress-container">
                    <div
                      className="progress-bar"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                    <span className="progress-text">
                      {project.progress}% complété
                    </span>
                  </div>

                  <div className="project-footer">
                    <div className="members">
                      <FiUsers />
                      <span>{project.members} membres</span>
                    </div>
                    <button className="view-btn">Voir le projet</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats & Recent Activity */}
          <div className="dashboard-bottom">
            <div className="stats-section">
              <h2>Statistiques</h2>
              <div className="stats-grid">
                <div className="stat-card">
                  <div
                    className="stat-icon"
                    style={{ backgroundColor: "#4361ee20", color: "#4361ee" }}
                  >
                    <FiBook />
                  </div>
                  <div className="stat-info">
                    <h3>5</h3>
                    <p>Projets actifs</p>
                  </div>
                </div>

                <div className="stat-card">
                  <div
                    className="stat-icon"
                    style={{ backgroundColor: "#4cc9f020", color: "#4cc9f0" }}
                  >
                    <FiFileText />
                  </div>
                  <div className="stat-info">
                    <h3>12</h3>
                    <p>Livrables soumis</p>
                  </div>
                </div>

                <div className="stat-card">
                  <div
                    className="stat-icon"
                    style={{ backgroundColor: "#f7258520", color: "#f72585" }}
                  >
                    <FiMessageSquare />
                  </div>
                  <div className="stat-info">
                    <h3>8</h3>
                    <p>Commentaires</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="activity-section">
              <h2>Activité Récente</h2>
              <div className="activity-list">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="activity-item">
                    <div className="activity-icon">{activity.icon}</div>
                    <div className="activity-content">
                      <p>{activity.text}</p>
                      <span className="activity-time">{activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfDashboard;
