import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const baseUrl = "ice-barrage";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-true-blue p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand or Home Link */}
        <div className="flex items-center space-x-4">
          <Link id="home" to="/" className="text-white text-4xl hover:text-gray-300">
            Home
          </Link>
        </div>
        {/* Mobile menu button */}
        <div className="block md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'} />
            </svg>
          </button>
        </div>
        {/* Navigation Links */}
        <div className={`md:flex items-center space-x-6 ${isOpen ? 'block' : 'hidden'} md:block w-full md:w-auto`}>
          <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
            <p id="mobile-number" className="text-white text-sm hover:text-gray-300">
              07402205071
            </p>
            <Link id="about" to="/about" className="text-white text-2xl hover:text-gray-300">
              About
            </Link>
            <Link id="contact" to="/contact" className="text-white text-2xl hover:text-gray-300">
              Contact
            </Link>
            <Link id="interests" to="/interests" className="text-white text-2xl hover:text-gray-300">
              Interests
            </Link>
            <Link id="skills" to="/skills" className="text-white text-2xl hover:text-gray-300">
              Skills
            </Link>
            <Link id="work-log" to="/work-log" className="text-white text-2xl hover:text-gray-300">
              WorkLog
            </Link>
            <Link id="button-assets" to="/button-assets" className="text-white text-2xl hover:text-gray-300">
              Assets
            </Link>
          </div>
          <Link
            id="create-blog-post"
            to="/create-blog-post"
            className="bg-cambridge-blue text-black text-xl font-semibold py-3 px-8 rounded hover:bg-gray-100 transition-colors duration-300 mt-4 md:mt-0 md:ml-6"
          >
            Create
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
