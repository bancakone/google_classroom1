import axios from "axios";
import { useEffect, useState } from "react";
import {
  FiEdit2,
  FiKey,
  FiMessageSquare,
  FiPlus,
  FiTrash2,
  FiUsers,
  FiX,
} from "react-icons/fi";
import "./classe.css";

const ClassesSection = () => {
  // États pour les données
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [classGroups, setClassGroups] = useState([]); // groupes de la classe sélectionnée
  // États pour les modales
  const [showClassForm, setShowClassForm] = useState(false);
  const [showGroupForm, setShowGroupForm] = useState(false);
  const [showAnnouncementForm, setShowAnnouncementForm] = useState(false);
  const [showCodeGenerator, setShowCodeGenerator] = useState(false);
  // États pour l'édition
  const [editMode, setEditMode] = useState(false);
  const [editedClassName, setEditedClassName] = useState("");
  const [editingClassId, setEditingClassId] = useState(null);
  // États pour les formulaires
  const [newClassName, setNewClassName] = useState("");
  const [newGroupName, setNewGroupName] = useState("");
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    content: "",
  });
  // Loading
  const [loading, setLoading] = useState(true);
  // Professeur
  const professeur = JSON.parse(localStorage.getItem("user") || "{}");
  const token = localStorage.getItem("token");

  // Charger les classes du professeur
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:5000/api/classes/${professeur.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setClasses(res.data);
      } catch (err) {
        console.error("Erreur lors du chargement des classes:", err);
      } finally {
        setLoading(false);
      }
    };
    if (professeur.id && token) fetchClasses();
  }, [professeur.id, token]);

  // Charger les groupes d'une classe sélectionnée
  useEffect(() => {
    const fetchGroups = async () => {
      if (!selectedClass) return setClassGroups([]);
      try {
        const res = await axios.get(
          `http://localhost:5000/api/groupes/${selectedClass.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setClassGroups(res.data);
      } catch (err) {
        setClassGroups([]);
      }
    };
    fetchGroups();
  }, [selectedClass, showGroupForm]);

  // Créer une nouvelle classe
  const handleCreateClass = async () => {
    if (!newClassName.trim()) return;
    try {
      await axios.post(
        "http://localhost:5000/api/classe",
        {
          nom: newClassName,
          professeur_id: professeur.id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Rafraîchir la liste
      const res = await axios.get(
        `http://localhost:5000/api/classes/${professeur.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setClasses(res.data);
      setShowClassForm(false);
      setNewClassName("");
    } catch (err) {
      alert("Erreur lors de la création de la classe");
    }
  };

  // Modifier une classe
  const handleEditClass = () => {
    setClasses(
      classes.map((classe) =>
        classe.id === editingClassId
          ? { ...classe, nom: editedClassName }
          : classe
      )
    );
    cancelEditing();
  };

  // Supprimer une classe
  const handleDeleteClass = (classId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette classe ?")) {
      setClasses(classes.filter((classe) => classe.id !== classId));
    }
  };

  // Créer un nouveau groupe
  const handleCreateGroup = async () => {
    if (!newGroupName.trim()) {
      alert("Veuillez entrer un nom de groupe.");
      return;
    }
    if (!selectedClass || !selectedClass.id) {
      alert("Aucune classe sélectionnée. Veuillez réessayer.");
      return;
    }
    try {
      console.log("Création du groupe avec:", {
        nom: newGroupName,
        classe_id: selectedClass.id,
      });
      const response = await axios.post(
        "http://localhost:5000/api/groupe",
        {
          nom: newGroupName,
          classe_id: selectedClass.id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (
        response.data?.message &&
        response.data.message.toLowerCase().includes("créé")
      ) {
        setShowGroupForm(false); // Fermer la modale immédiatement
        setNewGroupName("");
        // Rafraîchir les groupes en arrière-plan
        const res = await axios.get(
          `http://localhost:5000/api/groupes/${selectedClass.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setClassGroups(res.data);
        alert("Groupe créé avec succès !");
      } else {
        alert(
          "Erreur inattendue: " +
            (response.data?.message || "Aucune réponse du serveur.")
        );
      }
    } catch (err) {
      console.error(
        "Erreur lors de la création du groupe:",
        err,
        err?.response
      );
      alert(
        err?.response?.data?.message || "Erreur lors de la création du groupe"
      );
    }
  };

  // Publier une annonce
  const handleCreateAnnouncement = async () => {
    if (!newAnnouncement.title.trim() || !selectedClass) return;
    try {
      await axios.post(
        "http://localhost:5000/api/post",
        {
          professeur_id: professeur.id,
          classe_id: selectedClass.id,
          titre: newAnnouncement.title,
          contenu: newAnnouncement.content,
          date: new Date().toISOString(),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNewAnnouncement({ title: "", content: "" });
      setShowAnnouncementForm(false);
    } catch (err) {
      alert("Erreur lors de la publication de l'annonce");
    }
  };

  // Démarrer l'édition d'une classe
  const startEditing = (classId, className) => {
    setEditMode(true);
    setEditingClassId(classId);
    setEditedClassName(className);
  };

  // Annuler l'édition
  const cancelEditing = () => {
    setEditMode(false);
    setEditingClassId(null);
    setEditedClassName("");
  };

  return (
    <section className="classes-section">
      {/* En-tête */}
      <div className="section-header">
        <h2>Vos classes</h2>
        <div className="header-actions">
          <button
            className="btn-outline"
            onClick={() => setShowCodeGenerator(true)}
          >
            <FiKey /> Générer des codes
          </button>
          <button
            className="btn-primary"
            onClick={() => setShowClassForm(true)}
          >
            <FiPlus /> Nouvelle classe
          </button>
        </div>
      </div>

      {/* Liste des classes */}
      {loading ? (
        <div className="empty-state">
          <p>Chargement...</p>
        </div>
      ) : classes.length === 0 ? (
        <div className="empty-state">
          <p>Aucune classe créée pour le moment</p>
          <button
            className="btn-primary"
            onClick={() => setShowClassForm(true)}
          >
            <FiPlus /> Créer votre première classe
          </button>
        </div>
      ) : (
        <div className="classes-grid">
          {classes.map((classe) => (
            <div key={classe.id} className="class-card">
              <div className="class-header">
                {editMode && editingClassId === classe.id ? (
                  <input
                    type="text"
                    value={editedClassName}
                    onChange={(e) => setEditedClassName(e.target.value)}
                    className="edit-input"
                  />
                ) : (
                  <h3>{classe.nom}</h3>
                )}
                <span className="class-status active">Active</span>
              </div>

              <div className="class-meta">
                <div className="meta-item">
                  <FiUsers />
                  <span>
                    {classe.id === selectedClass?.id ? classGroups.length : "?"}{" "}
                    groupes
                  </span>
                </div>
                {/* Pour les étudiants, il faudrait une requête supplémentaire */}
              </div>

              <div className="class-actions">
                {editMode && editingClassId === classe.id ? (
                  <>
                    <button
                      className="btn-outline success"
                      onClick={handleEditClass}
                    >
                      Enregistrer
                    </button>
                    <button
                      className="btn-outline danger"
                      onClick={cancelEditing}
                    >
                      Annuler
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn-outline"
                      onClick={() => {
                        setSelectedClass(classe);
                        setShowGroupForm(true);
                      }}
                    >
                      <FiPlus /> Ajouter groupe
                    </button>
                    <button
                      className="btn-outline"
                      onClick={() => {
                        setSelectedClass(classe);
                        setShowAnnouncementForm(true);
                      }}
                    >
                      <FiMessageSquare /> Publier annonce
                    </button>
                    <div className="edit-actions">
                      <button
                        className="btn-icon"
                        onClick={() => startEditing(classe.id, classe.nom)}
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        className="btn-icon danger"
                        onClick={() => handleDeleteClass(classe.id)}
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modale de création de classe */}
      {showClassForm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Créer une nouvelle classe</h3>
              <button
                className="close-btn"
                onClick={() => setShowClassForm(false)}
              >
                <FiX />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Nom de la classe</label>
                <input
                  type="text"
                  value={newClassName}
                  onChange={(e) => setNewClassName(e.target.value)}
                  placeholder="Entrez le nom de la classe"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn-outline"
                onClick={() => setShowClassForm(false)}
              >
                Annuler
              </button>
              <button className="btn-primary" onClick={handleCreateClass}>
                Créer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modale d'ajout de groupe */}
      {showGroupForm && selectedClass && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Ajouter un groupe à {selectedClass.nom}</h3>
              <button
                className="close-btn"
                onClick={() => setShowGroupForm(false)}
              >
                <FiX />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Nom du groupe</label>
                <input
                  type="text"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  placeholder="Entrez le nom du groupe"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn-outline"
                onClick={() => setShowGroupForm(false)}
              >
                Annuler
              </button>
              <button className="btn-primary" onClick={handleCreateGroup}>
                Créer
              </button>
            </div>
            {/* Liste des groupes de la classe */}
            <div className="modal-body">
              <h4>Groupes existants :</h4>
              <ul>
                {classGroups.map((g) => (
                  <li key={g.id}>{g.nom}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Modale de publication d'annonce */}
      {showAnnouncementForm && selectedClass && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Publier une annonce pour {selectedClass.nom}</h3>
              <button
                className="close-btn"
                onClick={() => setShowAnnouncementForm(false)}
              >
                <FiX />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Titre</label>
                <input
                  type="text"
                  value={newAnnouncement.title}
                  onChange={(e) =>
                    setNewAnnouncement({
                      ...newAnnouncement,
                      title: e.target.value,
                    })
                  }
                  placeholder="Titre de l'annonce"
                />
              </div>
              <div className="form-group">
                <label>Contenu</label>
                <textarea
                  value={newAnnouncement.content}
                  onChange={(e) =>
                    setNewAnnouncement({
                      ...newAnnouncement,
                      content: e.target.value,
                    })
                  }
                  placeholder="Contenu de l'annonce"
                  rows="5"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn-outline"
                onClick={() => setShowAnnouncementForm(false)}
              >
                Annuler
              </button>
              <button
                className="btn-primary"
                onClick={handleCreateAnnouncement}
              >
                Publier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modale de génération de codes */}
      {showCodeGenerator && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Générer des codes d'accès</h3>
              <button
                className="close-btn"
                onClick={() => setShowCodeGenerator(false)}
              >
                <FiX />
              </button>
            </div>
            <div className="modal-body">
              <p>Fonctionnalité de génération de codes à implémenter</p>
            </div>
            <div className="modal-footer">
              <button
                className="btn-primary"
                onClick={() => setShowCodeGenerator(false)}
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ClassesSection;
