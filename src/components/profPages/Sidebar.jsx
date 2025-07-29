import {
  FiChevronRight,
  FiFileText,
  FiMessageSquare,
  FiUser,
  FiUsers,
} from "react-icons/fi";

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Menu Professeur</h2>
      </div>
      <nav className="sidebar-nav">
        {[
          { id: "classes", icon: <FiUsers />, label: "Classes" },
          { id: "groups", icon: <FiUsers />, label: "Groupes" },
          { id: "students", icon: <FiUser />, label: "Étudiants" },
          { id: "works", icon: <FiFileText />, label: "Travaux" },
          { id: "announcements", icon: <FiMessageSquare />, label: "Annonces" },
          { id: "messages", icon: <FiMessageSquare />, label: "Messages" },
        ].map((tab) => (
          <button
            key={tab.id}
            className={`nav-item ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon}
            <span>{tab.label}</span>
            <FiChevronRight className="nav-arrow" />
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
