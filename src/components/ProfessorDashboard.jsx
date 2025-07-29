import axios from "axios";
import { useEffect, useState } from "react";
import "./ProfessorDashboard.css";

// Import des composants
import AnnouncementsSection from "./profPages/AnnouncementsSection";
import ClassesSection from "./profPages/ClassesSection";
import GroupsSection from "./profPages/GroupsSection";
import Header from "./profPages/Header";
import Sidebar from "./profPages/Sidebar";
import StatsOverview from "./profPages/StatsOverview";
import StudentsSection from "./profPages/StudentsSection";
import WorksSection from "./profPages/WorksSection";

const ProfessorDashboard = () => {
  // États principaux
  const [activeTab, setActiveTab] = useState("groups");
  const [searchTerm, setSearchTerm] = useState("");
  const [groups, setGroups] = useState([]);
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [messages, setMessages] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  // États pour les modales
  const [showClassForm, setShowClassForm] = useState(false);
  const [showGroupForm, setShowGroupForm] = useState(false);
  const [showWorkForm, setShowWorkForm] = useState(false);
  const [showStepForm, setShowStepForm] = useState(false);
  const [showAnnouncementForm, setShowAnnouncementForm] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showCodeGenerator, setShowCodeGenerator] = useState(false);
  // États pour les formulaires
  const [newClassName, setNewClassName] = useState("");
  const [newGroupName, setNewGroupName] = useState("");
  // États pour la messagerie
  const [messageRecipient, setMessageRecipient] = useState("");
  const [messageSubject, setMessageSubject] = useState("");
  // Fonctions vides pour éviter les erreurs si non définies
  const handleSetCoordinator = () => {};
  const handleCreateClass = () => {};
  const handleCreateGroup = () => {};

  // Autres états
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedWork, setSelectedWork] = useState(null);
  const [currentSubmission, setCurrentSubmission] = useState(null);
  const [generatedCodes, setGeneratedCodes] = useState([]);
  const [currentCourse, setCurrentCourse] = useState("");

  // Charger les données initiales
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));

        const [
          classesRes,
          studentsRes,
          submissionsRes,
          messagesRes,
          announcementsRes,
        ] = await Promise.all([
          axios.get(`http://localhost:5000/api/classes/${user.id}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/api/etudiants", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/api/travaux", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/api/messages", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/api/posts", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setClasses(classesRes.data);
        setStudents(studentsRes.data);
        setSubmissions(submissionsRes.data);
        setMessages(messagesRes.data);
        setAnnouncements(announcementsRes.data);

        const allGroups = classesRes.data.flatMap(
          (classe) => classe.groupes || []
        );
        setGroups(allGroups);
      } catch (err) {
        console.error("Erreur de chargement des données:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Chargement des données...</p>
      </div>
    );
  }

  return (
    <div className="professor-dashboard-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="dashboard-content">
        <Header
          activeTab={activeTab}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setShowClassForm={setShowClassForm}
          setShowGroupForm={setShowGroupForm}
          setShowWorkForm={setShowWorkForm}
          setShowAnnouncementForm={setShowAnnouncementForm}
          setShowMessageModal={setShowMessageModal}
          classes={classes}
        />

        <StatsOverview
          classes={classes}
          groups={groups}
          students={students}
          submissions={submissions}
          messages={messages}
        />

        <div className="tab-content">
          {activeTab === "classes" && (
            <ClassesSection
              classes={classes}
              students={students}
              setSelectedClass={setSelectedClass}
              setShowGroupForm={setShowGroupForm}
              setShowAnnouncementForm={setShowAnnouncementForm}
              setShowCodeGenerator={setShowCodeGenerator}
            />
          )}

          {activeTab === "groups" && (
            <GroupsSection
              groups={groups}
              classes={classes}
              students={students}
              submissions={submissions}
              searchTerm={searchTerm}
              setSelectedGroup={setSelectedGroup}
              setShowWorkForm={setShowWorkForm}
            />
          )}

          {activeTab === "students" && (
            <StudentsSection
              students={students}
              groups={groups}
              classes={classes}
              setMessageRecipient={setMessageRecipient}
              setMessageSubject={setMessageSubject}
              setSelectedGroup={setSelectedGroup}
              setShowMessageModal={setShowMessageModal}
              handleSetCoordinator={handleSetCoordinator}
            />
          )}

          {activeTab === "works" && (
            <WorksSection
              submissions={submissions}
              groups={groups}
              searchTerm={searchTerm}
              setSelectedWork={setSelectedWork}
              setShowStepForm={setShowStepForm}
              setCurrentSubmission={setCurrentSubmission}
              setShowDetailsModal={setShowDetailsModal}
            />
          )}

          {activeTab === "announcements" && (
            <AnnouncementsSection
              announcements={announcements}
              classes={classes}
              searchTerm={searchTerm}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default ProfessorDashboard;
