import React from 'react';

interface WorkLogPaginationProps {
  worklogPerPage: number;
  totalWorklogs: number;
  paginate: (pageNumber: number) => void;
  currentPage: number; // Add currentPage prop to track the active page
}

const WorkLogPagination: React.FC<WorkLogPaginationProps> = ({ worklogPerPage, totalWorklogs, paginate, currentPage }) => {
  const pageNumbers = [];

  // Don't show pagination if there are no worklogs
  if (totalWorklogs === 0) {
    return null;
  }

  // Calculate the number of pages
  for (let i = 1; i <= Math.ceil(totalWorklogs / worklogPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      {/* Align the pagination to the left using justify-start */}
      <ul className="flex justify-start space-x-1 mt-2">
        {/* Previous Button */}
        <li>
          <button
            onClick={() => paginate(currentPage - 1)}
            className={`px-2 py-1 text-base rounded text-gray-800 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed line-through' : ''} hover:bg-blue-200`}
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </li>

        {/* Page Numbers */}
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`px-2 py-1 text-base rounded ${currentPage === number ? 'text-black animate-bounce' : 'text-gray-500 hover:bg-blue-200'}`}
            >
              {number}
            </button>
          </li>
        ))}

        {/* Next Button */}
        <li>
          <button
            onClick={() => paginate(currentPage + 1)}
            className={`px-2 py-1 text-base rounded text-gray-800 ${currentPage === pageNumbers.length ? 'opacity-50 cursor-not-allowed line-through' : ''} hover:bg-blue-200`}
            disabled={currentPage === pageNumbers.length}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default WorkLogPagination;
