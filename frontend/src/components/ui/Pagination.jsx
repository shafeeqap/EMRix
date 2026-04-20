import React from "react";

const Pagination = ({ setPage, page, totalPages }) => {
  const visiblePages = Array.from(
    { length: Math.min(totalPages) },
    (_, i) => i + Math.max(1, page - 2)
  );

  return (
    <div className="flex justify-center items-center gap-2 mt-6 pb-15">
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="px-3 py-1 b bg-white border rounded disabled:opacity-50 cursor-pointer"
      >
        Previous
      </button>

      <span className="text-sm">
        {/* Page {page} of {totalPages} */}
        {visiblePages.map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`px-3 py-2 border rounded cursor-pointer ${
              page === p ? "bg-primary text-white" : "bg-white"
            }`}
          >
            {p}
          </button>
        ))}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        className="px-3 py-1 bg-white border rounded disabled:opacity-50 cursor-pointer"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
