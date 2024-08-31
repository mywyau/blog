// src/components/worklog/YearSearchBar.tsx
import React, { useState } from 'react';

interface YearSearchBarProps {
  onYearSearch: (year: number) => void;
}

const YearSearchBar: React.FC<YearSearchBarProps> = ({ onYearSearch }) => {
  const [inputYear, setInputYear] = useState<string>('');

  const handleSearch = () => {
    const year = parseInt(inputYear, 10);
    if (!isNaN(year)) {
      onYearSearch(year);
    }
  };

  return (
    <div className="flex mb-4">
      <input
        type="text"
        value={inputYear}
        onChange={(e) => setInputYear(e.target.value)}
        placeholder="Enter year..."
        className="px-4 py-2 border rounded-l-md focus:outline-none"
      />
      <button
        onClick={handleSearch}
        className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-700 focus:outline-none"
      >
        Search
      </button>
    </div>
  );
};

export default YearSearchBar;
