import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-true-blue p-2 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand or Home Link */}
        <div className="flex items-center space-x-4">
          <Link id="home" to="/" className="text-white text-3xl hover:text-gray-300">
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
        <div className={`md:flex items-center md:space-x-6 ${isOpen ? 'block' : 'hidden'} md:block absolute md:static right-0 top-16 md:top-auto bg-true-blue md:bg-transparent p-4 md:p-0 w-64 md:w-auto`}>
          <div className="flex flex-col md:flex-row md:items-center md:space-x-6 space-y-4 md:space-y-0">
            <Link id="about" to="/about" className="text-white text-lg hover:text-gray-300">
              About Me
            </Link>
            <Link id="contact" to="/contact" className="text-white text-lg hover:text-gray-300">
              Contact
            </Link>
            <Link id="interests" to="/interests" className="text-white text-lg hover:text-gray-300">
              Interests
            </Link>
            <Link id="skills" to="/skills" className="text-white text-lg hover:text-gray-300">
              Skills
            </Link>
            <Link id="work-log" to="/work-log" className="text-white text-lg hover:text-gray-300">
              WorkLog
            </Link>
            <Link id="assets" to="/assets" className="text-white text-lg hover:text-gray-300">
              Assets
            </Link>
            <Link
              id="create-blog-post"
              to="/create-blog-post"
              className="bg-cambridge-blue text-black text-lg font-semibold py-3 px-7 rounded hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center"
            >
              Create
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
