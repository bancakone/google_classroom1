import { useState, useEffect } from "react";
import { FiEye, FiPlus, FiEdit2, FiTrash2, FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";

const WorksSection = ({ groups, setShowDetailsModal }) => {
  // États principaux
  const [works, setWorks] = useState([]);
  const [steps, setSteps] = useState([]);
  const [comments, setComments] = useState([]);
  const [files, setFiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tous");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const itemsPerPage = 5;

  // États pour les modales
  const [showWorkForm, setShowWorkForm] = useState(false);
  const [showStepForm, setShowStepForm] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [showFileForm, setShowFileForm] = useState(false);
  const [editingWork, setEditingWork] = useState(null);
  const [editingStep, setEditingStep] = useState(null);
  const [workToDelete, setWorkToDelete] = useState(null);
  const [selectedWork, setSelectedWork] = useState(null);
  const [formData, setFormData] = useState({
    titre: "",
    dateSoumission: "",
    groupe_id: "",
    statut: "EN_COURS"
  });
  const [stepFormData, setStepFormData] = useState({
    titre: "",
    description: "",
    ordre: 1
  });
  const [commentFormData, setCommentFormData] = useState({
    auteur: "Professeur",
    contenu: "",
    date: new Date().toISOString()
  });
  const [fileFormData, setFileFormData] = useState({
    nom: "",
    url: ""
  });

  // Charger les données initiales
  useEffect(() => {
    fetchWorks();
  }, []);

  // Charger les données associées quand un travail est sélectionné
  useEffect(() => {
    if (selectedWork) {
      fetchSteps(selectedWork.id);
      fetchComments(selectedWork.id);
      fetchFiles(selectedWork.id);
    }
  }, [selectedWork]);

  // Fonctions API
  const fetchWorks = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/travaux");
      if (!response.ok) throw new Error("Erreur de chargement des travaux");
      const data = await response.json();
      setWorks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSteps = async (workId) => {
    try {
      const response = await fetch(`/api/etapes/${workId}`);
      if (!response.ok) throw new Error("Erreur de chargement des étapes");
      setSteps(await response.json());
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchComments = async (workId) => {
    try {
      const response = await fetch(`/api/commentaires/${workId}`);
      if (!response.ok) throw new Error("Erreur de chargement des commentaires");
      setComments(await response.json());
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchFiles = async (workId) => {
    try {
      const response = await fetch(`/api/fichiers/travail/${workId}`);
      if (!response.ok) throw new Error("Erreur de chargement des fichiers");
      setFiles(await response.json());
    } catch (err) {
      setError(err.message);
    }
  };

  // Gestion des travaux
  const handleCreateWork = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/travail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (!response.ok) throw new Error("Erreur de création du travail");
      
      const newWork = await response.json();
      setWorks([...works, newWork]);
      setShowWorkForm(false);
      resetWorkForm();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateWork = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/travail/${editingWork.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (!response.ok) throw new Error("Erreur de mise à jour du travail");
      
      const updatedWork = await response.json();
      setWorks(works.map(w => w.id === updatedWork.id ? updatedWork : w));
      setShowWorkForm(false);
      resetWorkForm();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteWork = async () => {
    try {
      const response = await fetch(`/api/travail/${workToDelete.id}`, {
        method: "DELETE"
      });
      if (!response.ok) throw new Error("Erreur de suppression du travail");
      
      setWorks(works.filter(w => w.id !== workToDelete.id));
      setWorkToDelete(null);
    } catch (err) {
      setError(err.message);
    }
  };

  // Gestion des étapes
  const handleCreateStep = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/etape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...stepFormData,
          travail_id: selectedWork.id
        })
      });
      if (!response.ok) throw new Error("Erreur de création de l'étape");
      
      const newStep = await response.json();
      setSteps([...steps, newStep]);
      setShowStepForm(false);
      resetStepForm();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateStepProgress = async (stepId, progress) => {
    try {
      const response = await fetch(`/api/etape/${stepId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ progression: progress })
      });
      if (!response.ok) throw new Error("Erreur de mise à jour de l'étape");
      
      const updatedStep = await response.json();
      setSteps(steps.map(s => s.id === updatedStep.id ? updatedStep : s));
    } catch (err) {
      setError(err.message);
    }
  };

  // Gestion des commentaires
  const handleCreateComment = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/commentaire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...commentFormData,
          travail_id: selectedWork.id,
          date: new Date().toISOString()
        })
      });
      if (!response.ok) throw new Error("Erreur de création du commentaire");
      
      const newComment = await response.json();
      setComments([...comments, newComment]);
      setShowCommentForm(false);
      resetCommentForm();
    } catch (err) {
      setError(err.message);
    }
  };

  // Gestion des fichiers
  const handleUploadFile = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/fichier", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...fileFormData,
          travail_id: selectedWork.id
        })
      });
      if (!response.ok) throw new Error("Erreur d'ajout du fichier");
      
      const newFile = await response.json();
      setFiles([...files, newFile]);
      setShowFileForm(false);
      resetFileForm();
    } catch (err) {
      setError(err.message);
    }
  };

  // Helpers
  const resetWorkForm = () => {
    setFormData({
      titre: "",
      dateSoumission: "",
      groupe_id: "",
      statut: "EN_COURS"
    });
    setEditingWork(null);
  };

  const resetStepForm = () => {
    setStepFormData({
      titre: "",
      description: "",
      ordre: 1
    });
    setEditingStep(null);
  };

  const resetCommentForm = () => {
    setCommentFormData({
      auteur: "Professeur",
      contenu: "",
      date: new Date().toISOString()
    });
  };

  const resetFileForm = () => {
    setFileFormData({
      nom: "",
      url: ""
    });
  };

  const prepareEditWork = (work) => {
    setEditingWork(work);
    setFormData({
      titre: work.titre,
      dateSoumission: work.dateSoumission,
      groupe_id: work.groupe_id,
      statut: work.statut
    });
    setShowWorkForm(true);
  };

  // Filtrage et pagination
  const filteredWorks = works.filter(work => {
    const matchesSearch = work.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      groups.find(g => g.id === work.groupe_id)?.nom.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "Tous" || work.statut === statusFilter.toUpperCase().replace(" ", "_");
    
    return matchesSearch && matchesStatus;
  });

  const paginatedWorks = filteredWorks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section className="works-section">
      {/* En-tête avec contrôles */}
      <div className="section-header">
        <h2>Travaux assignés</h2>
        <div className="controls">
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>Tous</option>
            <option>En cours</option>
            <option>À corriger</option>
            <option>En revision</option>
            <option>Corrigé</option>
          </select>
          <button 
            className="btn primary"
            onClick={() => {
              resetWorkForm();
              setShowWorkForm(true);
            }}
          >
            <FiPlus /> Nouveau travail
          </button>
        </div>
      </div>

      {/* Affichage des erreurs */}
      {error && <div className="error">{error}</div>}

      {/* Contenu principal */}
      {isLoading ? (
        <div className="loading">Chargement...</div>
      ) : works.length === 0 ? (
        <div className="empty-state">
          <p>Aucun travail assigné</p>
        </div>
      ) : (
        <>
          {/* Tableau des travaux */}
          <div className="works-table">
            <div className="table-header">
              <div className="col">Titre</div>
              <div className="col">Groupe</div>
              <div className="col">Date limite</div>
              <div className="col">Statut</div>
              <div className="col">Étapes</div>
              <div className="col">Actions</div>
            </div>

            {paginatedWorks.map(work => {
              const group = groups.find(g => g.id === work.groupe_id);
              const workSteps = steps.filter(s => s.travail_id === work.id);

              return (
                <div key={work.id} className="table-row">
                  <div className="col">{work.titre}</div>
                  <div className="col">{group?.nom || "N/A"}</div>
                  <div className="col">
                    {new Date(work.dateSoumission).toLocaleDateString()}
                  </div>
                  <div className="col">
                    <span className={`status-badge ${work.statut.toLowerCase().replace("_", "-")}`}>
                      {work.statut.replace("_", " ")}
                    </span>
                  </div>
                  <div className="col">
                    {workSteps.length} étape{workSteps.length !== 1 ? "s" : ""}
                  </div>
                  <div className="col actions">
                    <button
                      onClick={() => {
                        setSelectedWork(work);
                        setShowDetailsModal(true);
                      }}
                    >
                      <FiEye /> Détails
                    </button>
                    <button
                      onClick={() => prepareEditWork(work)}
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      onClick={() => setWorkToDelete(work)}
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {filteredWorks.length > itemsPerPage && (
            <div className="pagination">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))} 
                disabled={currentPage === 1}
              >
                <FiChevronLeft />
              </button>
              <span>Page {currentPage} sur {Math.ceil(filteredWorks.length / itemsPerPage)}</span>
              <button 
                onClick={() => setCurrentPage(p => 
                  Math.min(Math.ceil(filteredWorks.length / itemsPerPage), p + 1)
                )} 
                disabled={currentPage === Math.ceil(filteredWorks.length / itemsPerPage)}
              >
                <FiChevronRight />
              </button>
            </div>
          )}
        </>
      )}

      {/* Modale de formulaire de travail */}
      {showWorkForm && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{editingWork ? "Modifier le travail" : "Créer un nouveau travail"}</h3>
              <button onClick={() => setShowWorkForm(false)}>
                <FiX />
              </button>
            </div>
            <form onSubmit={editingWork ? handleUpdateWork : handleCreateWork}>
              <div className="form-group">
                <label>Titre</label>
                <input
                  type="text"
                  value={formData.titre}
                  onChange={(e) => setFormData({...formData, titre: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Date limite</label>
                <input
                  type="date"
                  value={formData.dateSoumission}
                  onChange={(e) => setFormData({...formData, dateSoumission: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Groupe</label>
                <select
                  value={formData.groupe_id}
                  onChange={(e) => setFormData({...formData, groupe_id: parseInt(e.target.value)})}
                  required
                >
                  <option value="">Sélectionnez un groupe</option>
                  {groups.map(group => (
                    <option key={group.id} value={group.id}>{group.nom}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Statut</label>
                <select
                  value={formData.statut}
                  onChange={(e) => setFormData({...formData, statut: e.target.value})}
                >
                  <option value="EN_COURS">En cours</option>
                  <option value="A_CORRIGER">À corriger</option>
                  <option value="EN_REVISION">En revision</option>
                  <option value="CORRIGE">Corrigé</option>
                </select>
              </div>

              <div className="form-actions">
                <button type="button" className="btn outline" onClick={() => setShowWorkForm(false)}>
                  Annuler
                </button>
                <button type="submit" className="btn primary">
                  {editingWork ? "Mettre à jour" : "Créer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modale de confirmation de suppression */}
      {workToDelete && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Confirmer la suppression</h3>
              <button onClick={() => setWorkToDelete(null)}>
                <FiX />
              </button>
            </div>
            <p>Êtes-vous sûr de vouloir supprimer le travail "{workToDelete.titre}" ?</p>
            <div className="modal-actions">
              <button className="btn outline" onClick={() => setWorkToDelete(null)}>
                Annuler
              </button>
              <button className="btn danger" onClick={handleDeleteWork}>
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default WorksSection;