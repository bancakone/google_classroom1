import { FiX } from "react-icons/fi";

const ClassFormModal = ({
  show,
  onClose,
  newClassName,
  setNewClassName,
  handleCreateClass,
}) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>Créer une nouvelle classe</h3>
          <button className="close-btn" onClick={onClose}>
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
          <button className="btn-outline" onClick={onClose}>
            Annuler
          </button>
          <button
            className="btn-primary"
            onClick={handleCreateClass}
            disabled={!newClassName.trim()}
          >
            Créer
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassFormModal;
