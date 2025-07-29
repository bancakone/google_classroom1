import { useState, useEffect } from "react";
import { FiFileText, FiPlus, FiUsers, FiEdit2, FiTrash2, FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "./work.css";
const GroupsSection = ({ professorId, setShowWorkForm, setSelectedGroup }) => {
  // États principaux 
  const [classes, setClasses] = useState([]);
  const [groups, setGroups] = useState([]);
  const [students, setStudents] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const itemsPerPage = 5;

  // États pour les modales
  const [showGroupForm, setShowGroupForm] = useState(false);
  const [editingGroup, setEditingGroup] = useState(null);
  const [groupToDelete, setGroupToDelete] = useState(null);
  const [formData, setFormData] = useState({
    nom: "",
    classe_id: "",
    coordinateur_id: null,
    progression: null
  });

  // Fonction pour charger les classes
  const fetchClasses = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/classes");
      if (!response.ok) throw new Error("Erreur de chargement des classes");
      const data = await response.json();
      setClasses(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Charger les données initiales
  useEffect(() => {
    if (professorId) {
      fetchClasses();
    }
  }, [professorId]);

  // Charger tous les groupes au chargement initial
  useEffect(() => {
    if (professorId) {
      fetchAllGroups();
    }
  }, [professorId]);

  // Regrouper les groupes par classe à chaque changement de selectedClass
  useEffect(() => {
    if (selectedClass) {
      // Pas besoin de refetch, on filtre localement
      setCurrentPage(1);
    }
  }, [selectedClass]);

  const fetchGroups = async (classId) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/groupes/${classId}`);
      if (!response.ok) throw new Error("Erreur de chargement des groupes");
      const data = await response.json();
      setGroups(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Nouvelle fonction pour fetch tous les groupes
  const fetchAllGroups = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/groupes`);
      if (!response.ok) throw new Error("Erreur de chargement des groupes");
      const data = await response.json();
      setGroups(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await fetch("/api/etudiants");
      if (!response.ok) throw new Error("Erreur de chargement des étudiants");
      setStudents(await response.json());
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchSubmissions = async () => {
    try {
      const response = await fetch("/api/soumissions");
      if (!response.ok) throw new Error("Erreur de chargement des travaux");
      setSubmissions(await response.json());
    } catch (err) {
      setError(err.message);
    }
  };

  // Gestion des groupes
  const handleCreateGroup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/groupe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (!response.ok) throw new Error("Erreur de création du groupe");
      
      // On ne push pas le groupe localement, on refetch tout pour cohérence
      await fetchAllGroups();
      setShowGroupForm(false);
      resetForm();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateGroup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/groupe/${editingGroup.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" }
      });
      // Refetch tous les groupes pour cohérence
      await fetchAllGroups();
      if (!response.ok) throw new Error("Erreur de mise à jour du groupe");
      
      const updatedGroup = await response.json();
      setGroups(groups.map(g => g.id === updatedGroup.id ? updatedGroup : g));
      setShowGroupForm(false);
      resetForm();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteGroup = async () => {
    try {
      const response = await fetch(`/api/groupe/${groupToDelete.id}`, {
        method: "DELETE"
      });
      if (!response.ok) throw new Error("Erreur de suppression du groupe");
      // Refetch tous les groupes pour cohérence
      await fetchAllGroups();
      setGroups(groups.filter(g => g.id !== groupToDelete.id));
      setGroupToDelete(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSetCoordinator = async (groupId, studentId) => {
    try {
      const response = await fetch("/api/groupe/coordinateur", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ groupId, studentId })
      });
      // Refetch tous les groupes pour cohérence
      await fetchAllGroups();
      if (!response.ok) throw new Error("Erreur de désignation du coordinateur");
      
      const updatedGroup = await response.json();
      setGroups(groups.map(g => g.id === updatedGroup.id ? updatedGroup : g));
    } catch (err) {
      setError(err.message);
    }
  };

  // Helpers
  const resetForm = () => {
    setFormData({
      nom: "",
      classe_id: selectedClass?.id || "",
      coordinateur_id: null,
      progression: null
    });
    setEditingGroup(null);
  };

  const prepareEditForm = (group) => {
    setEditingGroup(group);
    setFormData({
      nom: group.nom,
      classe_id: group.classe_id,
      coordinateur_id: group.coordinateur_id,
      progression: group.progression
    });
    setShowGroupForm(true);
  };


  // Filtrage par classe puis par nom
  const groupsForSelectedClass = selectedClass
    ? groups.filter(g => g.classe_id === selectedClass.id)
    : [];

  const filteredGroups = groupsForSelectedClass.filter(group =>
    group.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedGroups = filteredGroups.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section className="groups-section">
      {/* En-tête avec recherche et sélecteur */}
      <div className="section-header">
        <h2>Gestion des Groupes</h2>
        <div className="controls">
          <input
            type="text"
            placeholder="Rechercher un groupe..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={selectedClass?.id || ""}
            onChange={(e) => {
              const classId = e.target.value;
              setSelectedClass(classes.find(c => c.id === parseInt(classId)) || null);
              setCurrentPage(1);
            }}
          >
            {classes.map(classe => (
              <option key={classe.id} value={classe.id}>{classe.nom}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Affichage des erreurs */}
      {error && <div className="error">{error}</div>}

      {/* Contenu principal */}
      {isLoading ? (
        <div className="loading">Chargement...</div>
      ) : !selectedClass ? (
        <div className="empty-state">
          <p>Aucune classe sélectionnée</p>
        </div>
      ) : groups.length === 0 ? (
        <div className="empty-state">
          <p>Aucun groupe dans cette classe</p>
          <button className="btn primary" onClick={() => setShowGroupForm(true)}>
            <FiPlus /> Créer un groupe
          </button>
        </div>
      ) : (
        <>
          <div className="actions-bar">
            <button 
              className="btn primary" 
              onClick={() => {
                resetForm();
                setShowGroupForm(true);
              }}
            >
              <FiPlus /> Nouveau Groupe
            </button>
          </div>

          {/* Liste des groupes */}
          <div className="groups-grid">
            {paginatedGroups.map(group => {
              const coordinateur = students.find(s => s.id === group.coordinateur_id);
              const classForGroup = classes.find(c => c.id === group.classe_id);

              return (
                <div key={group.id} className="group-card">
                  <div className="card-header">
                    <h3>{group.nom}</h3>
                    <div className="actions">
                      <button onClick={() => prepareEditForm(group)}>
                        <FiEdit2 />
                      </button>
                      <button onClick={() => setGroupToDelete(group)}>
                        <FiTrash2 />
                      </button>
                    </div>
                    <span className={`status ${group.progression?.toLowerCase()}`}>
                      {group.progression || 'NON_COMMENCE'}
                    </span>
                  </div>

                  <div className="card-body">
                    <p><strong>Classe:</strong> {classForGroup?.nom || 'N/A'}</p>
                    <p>
                      <strong>Coordinateur:</strong> 
                      <select
                        value={group.coordinateur_id || ""}
                        onChange={(e) => handleSetCoordinator(group.id, parseInt(e.target.value))}
                      >
                        <option value="">Non désigné</option>
                        {students.map(student => (
                          <option key={student.id} value={student.id}>
                            {student.nom}
                          </option>
                        ))}
                      </select>
                    </p>
                  </div>

                  <div className="card-footer">
                    <div className="stats">
                      <span><FiUsers /> {group.membres?.length || 0} membres</span>
                      <span>
                        <FiFileText /> {submissions.filter(s => s.groupe_id === group.id).length} travaux
                      </span>
                    </div>
                    <button 
                      className="btn outline"
                      onClick={() => {
                        setSelectedGroup(group);
                        setShowWorkForm(true);
                      }}
                    >
                      <FiPlus /> Ajouter travail
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {filteredGroups.length > itemsPerPage && (
            <div className="pagination">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))} 
                disabled={currentPage === 1}
              >
                <FiChevronLeft />
              </button>
              <span>Page {currentPage} sur {Math.ceil(filteredGroups.length / itemsPerPage)}</span>
              <button 
                onClick={() => setCurrentPage(p => Math.min(
                  Math.ceil(filteredGroups.length / itemsPerPage), 
                  p + 1
                ))} 
                disabled={currentPage === Math.ceil(filteredGroups.length / itemsPerPage)}
              >
                <FiChevronRight />
              </button>
            </div>
          )}
        </>
      )}

      {/* Modale de formulaire */}
      {showGroupForm && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{editingGroup ? "Modifier le Groupe" : "Créer un Groupe"}</h3>
              <button onClick={() => setShowGroupForm(false)}>
                <FiX />
              </button>
            </div>
            <form onSubmit={editingGroup ? handleUpdateGroup : handleCreateGroup}>
              <div className="form-group">
                <label>Nom du groupe</label>
                <input
                  type="text"
                  value={formData.nom}
                  onChange={(e) => setFormData({...formData, nom: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Classe</label>
                <select
                  value={formData.classe_id}
                  onChange={(e) => setFormData({...formData, classe_id: parseInt(e.target.value)})}
                  required
                >
                  {classes.map(classe => (
                    <option key={classe.id} value={classe.id}>{classe.nom}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Coordinateur</label>
                <select
                  value={formData.coordinateur_id || ""}
                  onChange={(e) => setFormData({
                    ...formData, 
                    coordinateur_id: e.target.value ? parseInt(e.target.value) : null
                  })}
                >
                  <option value="">Aucun coordinateur</option>
                  {students.map(student => (
                    <option key={student.id} value={student.id}>{student.nom}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Progression</label>
                <select
                  value={formData.progression || ""}
                  onChange={(e) => setFormData({
                    ...formData, 
                    progression: e.target.value || null
                  })}
                >
                  <option value="">Non commencé</option>
                  <option value="THEME_SOUMIS">Thème soumis</option>
                  <option value="CHAPITRE_1_OK">Chapitre 1 validé</option>
                  <option value="REDACTION_EN_COURS">Rédaction en cours</option>
                  <option value="SOUMIS">Soumis</option>
                </select>
              </div>

              <div className="form-actions">
                <button type="button" className="btn outline" onClick={() => setShowGroupForm(false)}>
                  Annuler
                </button>
                <button type="submit" className="btn primary">
                  {editingGroup ? "Mettre à jour" : "Créer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modale de confirmation */}
      {groupToDelete && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Confirmer la suppression</h3>
              <button onClick={() => setGroupToDelete(null)}>
                <FiX />
              </button>
            </div>
            <p>Êtes-vous sûr de vouloir supprimer le groupe "{groupToDelete.nom}" ?</p>
            <div className="modal-actions">
              <button className="btn outline" onClick={() => setGroupToDelete(null)}>
                Annuler
              </button>
              <button className="btn danger" onClick={handleDeleteGroup}>
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GroupsSection;