import "./Pagination.css";

export default function Pagination({ currentPage, pageCount, onPageChange }) {
  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= pageCount) {
      onPageChange(newPage);
    }
  };

  return (
    <div className="pagination">
      <button
        onClick={() => changePage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {"<"}
      </button>

      <button
        onClick={() => changePage(1)}
        className={currentPage === 1 ? "active" : ""}
      >
        1
      </button>

      {currentPage > 3 && <span className="dots">...</span>}

      {currentPage > 2 && currentPage < pageCount - 1 && (
        <button onClick={() => changePage(currentPage - 1)}>
          {currentPage - 1}
        </button>
      )}

      {currentPage !== 1 && currentPage !== pageCount && (
        <button className="active">{currentPage}</button>
      )}

      {currentPage < pageCount - 1 && currentPage > 1 && (
        <button onClick={() => changePage(currentPage + 1)}>
          {currentPage + 1}
        </button>
      )}

      {currentPage < pageCount - 2 && <span className="dots">...</span>}

      {pageCount > 1 && (
        <button
          onClick={() => changePage(pageCount)}
          className={currentPage === pageCount ? "active" : ""}
        >
          {pageCount}
        </button>
      )}

      <button
        onClick={() => changePage(currentPage + 1)}
        disabled={currentPage === pageCount}
      >
        {">"}
      </button>
    </div>
  );
}
