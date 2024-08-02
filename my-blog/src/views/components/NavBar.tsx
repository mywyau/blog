import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-true-blue p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand or Home Link */}
        <div className="flex items-center space-x-4">
          <Link id="home" to="/" className="text-white text-4xl hover:text-gray-300">
            Home
          </Link>
        </div>
        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
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
          <Link 
            id="create-blog-post" 
            to="/create-blog-post" 
            className="bg-cambridge-blue text-black text-xl font-semibold py-3 px-8 rounded hover:bg-gray-100 transition-colors duration-300"
          >
            Create
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
