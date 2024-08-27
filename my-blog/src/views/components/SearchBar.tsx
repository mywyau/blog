import React from 'react';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="relative mb-6">
      <input
        type="text"
        placeholder="Search blog posts..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 border rounded-lg pr-10"
      />
      {searchQuery && (
        <button
          type="button"
          onClick={() => setSearchQuery('')}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default SearchBar;
