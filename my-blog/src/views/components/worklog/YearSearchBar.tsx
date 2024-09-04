import React, { useState } from 'react';

interface YearSearchBarProps {
  onYearSearch: (year: number | null) => void;  // Allow null to indicate no specific year
}

const YearSearchBar: React.FC<YearSearchBarProps> = ({ onYearSearch }) => {
  const [inputYear, setInputYear] = useState<string>('');

  const handleSearch = (yearStr: string) => {
    if (yearStr === '') {
      onYearSearch(null);  // Pass null to show all posts
    } else {
      const year = parseInt(yearStr, 10);
      if (!isNaN(year)) {
        onYearSearch(year);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const yearStr = e.target.value;
    setInputYear(yearStr);
    handleSearch(yearStr);
  };

  return (
    <div className="flex justify-center mb-4">
      <input
        type="text"
        value={inputYear}
        onChange={handleChange}  // Trigger search as user types
        placeholder="Enter year..."
        className="px-4 py-2 border rounded-md focus:outline-none"
      />
    </div>
  );
};

export default YearSearchBar;
