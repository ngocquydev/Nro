import React from 'react';

function Pagination({
  currentPage,
  totalResults,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}) {
  const totalPages = Math.ceil(totalResults / itemsPerPage);

  const getPaginationPages = () => {
    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== '...') {
        pages.push('...');
      }
    }
    return pages;
  };

  const handlePageClick = (page) => {
    if (page !== '...' && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        {/* Phần thống kê kết quả */}
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
          <span className="font-medium">{Math.min(currentPage * itemsPerPage, totalResults)}</span>{' '}
          of <span className="font-medium">{totalResults}</span> results
        </p>

        <div className="flex items-center gap-4">
          {/* Select Rows Per Page */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Rows:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
              className="block w-20 rounded-md border border-gray-300 py-2 pr-8 pl-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
            >
              {[5, 10, 20, 50].map((val) => (
                <option key={val} value={val}>
                  {val}
                </option>
              ))}
            </select>
          </div>

          {/* Nav Pagination */}
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
            <button
              onClick={() => handlePageClick(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 disabled:opacity-50"
            >
              &larr;
            </button>

            {getPaginationPages().map((page, index) => (
              <button
                key={index}
                onClick={() => handlePageClick(page)}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                  page === currentPage
                    ? 'z-10 bg-indigo-600 text-white'
                    : page === '...'
                      ? 'cursor-default text-gray-700 ring-1 ring-gray-300 ring-inset'
                      : 'text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageClick(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 disabled:opacity-50"
            >
              &rarr;
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
