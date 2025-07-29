import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const PaginationControls = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="pagination-controls">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        <FiChevronLeft /> Précédent
      </button>
      <span>
        Page {currentPage} sur {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage * itemsPerPage >= totalItems}
      >
        Suivant <FiChevronRight />
      </button>
    </div>
  );
};

export default PaginationControls;
