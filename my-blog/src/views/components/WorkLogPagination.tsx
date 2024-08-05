import React from 'react';

interface WorkLogPaginationProps {
  recordsPerPage: number;
  totalrecords: number;
  paginate: (pageNumber: number) => void;
}


const WorkLogPagination: React.FC<WorkLogPaginationProps> = ({ recordsPerPage, totalrecords, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalrecords / recordsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="flex justify-right space-x-4 mt-4">
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default WorkLogPagination;
