import { useEffect, useState } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiEdit2,
  FiMessageSquare,
  FiPlus,
  FiTrash2,
  FiUser,
  FiX,
} from "react-icons/fi";
import "./student.css";
const StudentsSection = ({
  groups,
  classes,
  setShowMessageModal,
  setMessageRecipient,
  setMessageSubject,
  setSelectedGroup,
}) => {
  // États principaux
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const itemsPerPage = 10;

  // États pour les modales
  const [showStudentForm, setShowStudentForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    classe_id: "",
    groupe_id: "",
  });

  // Charger les étudiants au montage
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/etudiants");
      if (!response.ok)
        throw new Error("Erreur lors du chargement des étudiants");
      const data = await response.json();
      setStudents(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Gestion du formulaire
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCreateStudent = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/etudiant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok)
        throw new Error("Erreur lors de la création de l'étudiant");

      const newStudent = await response.json();
      setStudents([...students, newStudent]);
      setShowStudentForm(false);
      setFormData({ nom: "", email: "", classe_id: "", groupe_id: "" });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateStudent = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/etudiant/${editingStudent.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok)
        throw new Error("Erreur lors de la mise à jour de l'étudiant");

      const updatedStudent = await response.json();
      setStudents(
        students.map((s) => (s.id === updatedStudent.id ? updatedStudent : s))
      );
      setShowStudentForm(false);
      setEditingStudent(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteStudent = async () => {
    try {
      const response = await fetch(`/api/etudiant/${studentToDelete.id}`, {
        method: "DELETE",
      });
      if (!response.ok)
        throw new Error("Erreur lors de la suppression de l'étudiant");

      setStudents(students.filter((s) => s.id !== studentToDelete.id));
      setStudentToDelete(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSetCoordinator = async (groupId, studentId) => {
    try {
      const response = await fetch("/api/groupe/coordinateur", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          groupe_id: groupId,
          etudiant_id: studentId,
        }),
      });
      if (!response.ok)
        throw new Error("Erreur lors de la désignation du coordinateur");

      // Mettre à jour les groupes localement
      const updatedGroups = groups.map((g) =>
        g.id === groupId ? { ...g, coordinateur_id: studentId } : g
      );

      // On suppose que le parent gère les groupes, donc on ne les met pas à jour ici
      // Mais on peut forcer un re-render en changeant l'état local
      setStudents([...students]);
    } catch (err) {
      setError(err.message);
    }
  };

  // Préparation des données pour l'affichage
  const paginatedStudents = students.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Fonction pour préparer le formulaire d'édition
  const prepareEditForm = (student) => {
    const studentGroup = groups.find((g) => g.membres?.includes(student.id));
    setEditingStudent(student);
    setFormData({
      nom: student.nom,
      email: student.email,
      classe_id: student.classe_id || "",
      groupe_id: studentGroup?.id || "",
    });
    setShowStudentForm(true);
  };

  return (
    <section className="students-section">
      {/* En-tête */}
      <div className="section-header">
        <h2>Liste des étudiants</h2>
        <button
          className="btn-primary"
          onClick={() => {
            setEditingStudent(null);
            setFormData({ nom: "", email: "", classe_id: "", groupe_id: "" });
            setShowStudentForm(true);
          }}
        >
          <FiPlus /> Ajouter un étudiant
        </button>
      </div>

      {/* Affichage des erreurs */}
      {error && <div className="error-message">{error}</div>}

      {/* États de chargement */}
      {isLoading ? (
        <div className="loading">Chargement des étudiants...</div>
      ) : students.length === 0 ? (
        <div className="empty-state">
          <p>Aucun étudiant enregistré</p>
        </div>
      ) : (
        <>
          {/* Tableau des étudiants */}
          <div className="students-table">
            <div className="table-header">
              <div className="col">Nom</div>
              <div className="col">Email</div>
              <div className="col">Classe</div>
              <div className="col">Groupe</div>
              <div className="col">Rôle</div>
              <div className="col">Actions</div>
            </div>

            {paginatedStudents.map((student) => {
              const studentGroup = groups.find((g) =>
                g.membres?.includes(student.id)
              );
              const studentClass = classes.find((c) =>
                c.groupes?.some((g) => g.membres?.includes(student.id))
              );

              return (
                <div key={student.id} className="table-row">
                  <div className="col">{student.nom}</div>
                  <div className="col">{student.email}</div>
                  <div className="col">{studentClass?.nom || "N/A"}</div>
                  <div className="col">{studentGroup?.nom || "N/A"}</div>
                  <div className="col">
                    <span
                      className={`role-badge ${
                        studentGroup?.coordinateur_id === student.id
                          ? "coordinator"
                          : ""
                      }`}
                    >
                      {studentGroup?.coordinateur_id === student.id
                        ? "Coordinateur"
                        : "Membre"}
                    </span>
                  </div>
                  <div className="col actions">
                    <button
                      className="btn-icon"
                      onClick={() => {
                        setMessageRecipient(student);
                        setMessageSubject(`Message pour ${student.nom}`);
                        setSelectedGroup(studentGroup);
                        setShowMessageModal(true);
                      }}
                    >
                      <FiMessageSquare />
                    </button>
                    <button
                      className="btn-icon"
                      onClick={() => prepareEditForm(student)}
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      className="btn-icon"
                      onClick={() => setStudentToDelete(student)}
                    >
                      <FiTrash2 />
                    </button>
                    {studentGroup &&
                      studentGroup.coordinateur_id !== student.id && (
                        <button
                          className="btn-icon"
                          onClick={() =>
                            handleSetCoordinator(studentGroup.id, student.id)
                          }
                          title="Désigner comme coordinateur"
                        >
                          <FiUser />
                        </button>
                      )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {students.length > itemsPerPage && (
            <div className="pagination-controls">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <FiChevronLeft />
              </button>
              <span>
                Page {currentPage} sur{" "}
                {Math.ceil(students.length / itemsPerPage)}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((p) =>
                    Math.min(Math.ceil(students.length / itemsPerPage), p + 1)
                  )
                }
                disabled={
                  currentPage === Math.ceil(students.length / itemsPerPage)
                }
              >
                <FiChevronRight />
              </button>
            </div>
          )}
        </>
      )}

      {/* Modale de formulaire d'étudiant */}
      {showStudentForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>
                {editingStudent
                  ? "Modifier l'étudiant"
                  : "Ajouter un nouvel étudiant"}
              </h3>
              <button
                className="btn-icon"
                onClick={() => setShowStudentForm(false)}
              >
                <FiX />
              </button>
            </div>
            <form
              onSubmit={
                editingStudent ? handleUpdateStudent : handleCreateStudent
              }
            >
              <div className="form-group">
                <label>Nom complet</label>
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Classe</label>
                <select
                  name="classe_id"
                  value={formData.classe_id}
                  onChange={handleFormChange}
                >
                  <option value="">Sélectionnez une classe</option>
                  {classes.map((classe) => (
                    <option key={classe.id} value={classe.id}>
                      {classe.nom}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Groupe</label>
                <select
                  name="groupe_id"
                  value={formData.groupe_id}
                  onChange={handleFormChange}
                >
                  <option value="">Sélectionnez un groupe</option>
                  {groups.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.nom} (
                      {classes.find((c) => c.id === group.classe_id)?.nom ||
                        "N/A"}
                      )
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-actions">
                <button
                  type="button"
                  className="btn-outline"
                  onClick={() => setShowStudentForm(false)}
                >
                  Annuler
                </button>
                <button type="submit" className="btn-primary">
                  {editingStudent ? "Mettre à jour" : "Créer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modale de confirmation de suppression */}
      {studentToDelete && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Supprimer l'étudiant</h3>
              <button
                className="btn-icon"
                onClick={() => setStudentToDelete(null)}
              >
                <FiX />
              </button>
            </div>
            <p>
              Êtes-vous sûr de vouloir supprimer l'étudiant "
              {studentToDelete.nom}" ?
            </p>
            <div className="modal-actions">
              <button
                className="btn-outline"
                onClick={() => setStudentToDelete(null)}
              >
                Annuler
              </button>
              <button className="btn-danger" onClick={handleDeleteStudent}>
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default StudentsSection;
