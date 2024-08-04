import React from 'react';

interface MobileNavBarProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const MobileNavBar: React.FC<MobileNavBarProps> = ({ isOpen, toggleMenu }) => {
  return (
    <button
      onClick={toggleMenu}
      className="text-white focus:outline-none"
    >
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'} />
      </svg>
    </button>
  );
};

export default MobileNavBar;
