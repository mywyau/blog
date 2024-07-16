// src/components/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link to="/" className="text-white hover:text-gray-300">
            My Blog
          </Link>
        </div>
        <div>
          <Link to="/" className="text-white hover:text-gray-300 mx-2">
            Home
          </Link>
          <Link to="/about" className="text-white hover:text-gray-300 mx-2">
            About
          </Link>
          <Link to="/contact" className="text-white hover:text-gray-300 mx-2">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
