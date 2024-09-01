// src/components/worklog/YearFilter.tsx
import React from 'react';

interface YearFilterProps {
  years: number[];
  selectedYear: number;
  onYearSelect: (year: number) => void;
}

const YearFilter: React.FC<YearFilterProps> = ({ years, selectedYear, onYearSelect }) => {
  return (
    <div className="flex space-x-4 mb-4">
      {years.map((year) => (
        <button
          key={year}
          onClick={() => onYearSelect(year)}
          className={`px-4 py-2 rounded ${year === selectedYear ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
        >
          {year}
        </button>
      ))}
    </div>
  );
};

export default YearFilter;
