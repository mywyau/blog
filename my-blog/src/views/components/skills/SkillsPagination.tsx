import React from 'react';

interface SkillsPaginationProps {
  skillsPerPage: number;
  totalSkills: number;
  paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<SkillsPaginationProps> = ({ skillsPerPage, totalSkills, paginate }) => {
  
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalSkills / skillsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="flex justify-right space-x-4">
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

export default Pagination;
