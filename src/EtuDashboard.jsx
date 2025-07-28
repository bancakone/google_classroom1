import { useState } from "react";
import {
  FiAlertTriangle,
  FiBell,
  FiBook,
  FiCalendar,
  FiCheckCircle,
  FiFileText,
  FiLogOut,
  FiMessageSquare,
  FiSearch,
  FiSettings,
  FiUsers,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "./EtuDashboard.css";

const EtuDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("projects");
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      text: "Nouveau feedback sur votre livrable",
      time: "15 min",
      read: false,
      type: "feedback",
    },
    {
      id: 2,
      text: "Rappel: Soumission avant demain 18h",
      time: "2h",
      read: false,
      type: "deadline",
    },
  ]);

  // Données factices
  const projects = [
    {
      id: 1,
      title: "Projet Tutoré Web",
      progress: 65,
      deadline: "25/06/2023",
      status: "En cours",
      tasks: [
        { id: 1, name: "Maquettes UI", completed: true },
        { id: 2, name: "Backend API", completed: true },
        { id: 3, name: "Tests unitaires", completed: false },
      ],
    },
    {
      id: 2,
      title: "Projet Data Science",
      progress: 30,
      deadline: "10/07/2023",
      status: "En cours",
      tasks: [
        { id: 1, name: "Collecte données", completed: true },
        { id: 2, name: "Nettoyage données", completed: false },
      ],
    },
  ];

  const upcomingDeadlines = [
    {
      id: 1,
      project: "Projet Tutoré Web",
      task: "Rendu final",
      date: "25/06/2023",
      urgent: true,
    },
    {
      id: 2,
      project: "Projet Data Science",
      task: "Présentation intermédiaire",
      date: "05/07/2023",
      urgent: false,
    },
  ];

  const handleLogout = () => {
    navigate("/login");
  };

  const markNotificationAsRead = (id) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <div className="etu-dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>
            Project<span>Flow</span>
          </h2>
          <p className="user-role">Étudiant</p>
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
            className={`menu-item ${activeTab === "group" ? "active" : ""}`}
            onClick={() => setActiveTab("group")}
          >
            <FiUsers className="menu-icon" />
            <span>Mon Groupe</span>
          </div>

          <div
            className={`menu-item ${
              activeTab === "deliverables" ? "active" : ""
            }`}
            onClick={() => setActiveTab("deliverables")}
          >
            <FiFileText className="menu-icon" />
            <span>Livrables</span>
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
            <span>Messagerie</span>
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
            <input
              type="text"
              placeholder="Rechercher un projet, document..."
            />
          </div>

          <div className="user-actions">
            <div className="notification-bell">
              <FiBell />
              {notifications.filter((n) => !n.read).length > 0 && (
                <span className="notification-badge">
                  {notifications.filter((n) => !n.read).length}
                </span>
              )}

              {/* Notification Dropdown */}
              <div className="notification-dropdown">
                <h4>Notifications</h4>
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`notification-item ${
                      !notification.read ? "unread" : ""
                    }`}
                    onClick={() => markNotificationAsRead(notification.id)}
                  >
                    <div className="notification-icon">
                      {notification.type === "feedback" ? (
                        <FiMessageSquare />
                      ) : (
                        <FiAlertTriangle />
                      )}
                    </div>
                    <div className="notification-content">
                      <p>{notification.text}</p>
                      <span className="notification-time">
                        {notification.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="user-profile">
              <img src="/images/student-avatar.jpg" alt="Profile" />
              <span>Étudiant</span>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="dashboard-content">
          <div className="welcome-banner">
            <h1>
              Bienvenue, <span>Jean Dupont</span>
            </h1>
            <p>Vous avez {projects.length} projets en cours cette période</p>
          </div>

          {/* Projects Section */}
          <div className="projects-section">
            <h2>
              <FiBook /> Mes Projets Actifs
            </h2>
            <div className="projects-grid">
              {projects.map((project) => (
                <div key={project.id} className="project-card">
                  <div className="project-header">
                    <h3>{project.title}</h3>
                    <div className="project-status">
                      <span
                        className={`status-badge ${project.status
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        {project.status}
                      </span>
                      <span className="deadline">
                        Échéance: {project.deadline}
                      </span>
                    </div>
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

                  <div className="tasks-list">
                    <h4>Tâches:</h4>
                    {project.tasks.map((task) => (
                      <div key={task.id} className="task-item">
                        {task.completed ? (
                          <FiCheckCircle className="task-icon completed" />
                        ) : (
                          <div className="task-icon incomplete"></div>
                        )}
                        <span
                          className={task.completed ? "completed-task" : ""}
                        >
                          {task.name}
                        </span>
                      </div>
                    ))}
                  </div>

                  <button
                    className="project-action-btn"
                    onClick={() => navigate(`/project/${project.id}`)}
                  >
                    Accéder au projet
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Section */}
          <div className="dashboard-bottom">
            {/* Deadlines */}
            <div className="deadlines-section">
              <h2>
                <FiCalendar /> Échéances à venir
              </h2>
              <div className="deadlines-list">
                {upcomingDeadlines.map((deadline) => (
                  <div
                    key={deadline.id}
                    className={`deadline-item ${
                      deadline.urgent ? "urgent" : ""
                    }`}
                  >
                    <div className="deadline-info">
                      <h4>{deadline.task}</h4>
                      <p>{deadline.project}</p>
                    </div>
                    <div className="deadline-date">
                      {deadline.date}
                      {deadline.urgent && (
                        <span className="urgent-badge">URGENT</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="quick-actions-section">
              <h2>
                <FiCheckCircle /> Actions Rapides
              </h2>
              <div className="actions-grid">
                <button
                  className="action-card"
                  onClick={() => navigate("/submit-deliverable")}
                >
                  <FiFileText className="action-icon" />
                  <span>Soumettre un livrable</span>
                </button>

                <button
                  className="action-card"
                  onClick={() => navigate("/group-discussion")}
                >
                  <FiMessageSquare className="action-icon" />
                  <span>Discuter avec mon groupe</span>
                </button>

                <button
                  className="action-card"
                  onClick={() => navigate("/schedule-meeting")}
                >
                  <FiCalendar className="action-icon" />
                  <span>Planifier une réunion</span>
                </button>

                <button
                  className="action-card"
                  onClick={() => navigate("/request-feedback")}
                >
                  <FiMessageSquare className="action-icon" />
                  <span>Demander un feedback</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EtuDashboard;
