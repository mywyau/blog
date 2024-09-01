import React from 'react';

interface WorkLogPaginationProps {
  worklogPerPage: number;
  totalWorklogs: number;
  paginate: (pageNumber: number) => void;
}


const WorkLogPagination: React.FC<WorkLogPaginationProps> = ({ worklogPerPage, totalWorklogs, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalWorklogs / worklogPerPage); i++) {
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
