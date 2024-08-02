// src/components/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-true-blue p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="font-bold">
          <Link id="home" to="/" className="text-white text-4xl hover:text-gray-300">
            Home
          </Link>
        </div>
        <div>
          <Link id="about" to="/about" className="text-white text-2xl hover:text-gray-300 mx-2">
            About
          </Link>
          <Link id="contact" to="/contact" className="text-white text-2xl hover:text-gray-300 mx-2">
            Contact
          </Link>
          <Link id="interests" to="/interests" className="text-white text-2xl hover:text-gray-300 mx-2">
            Interests
          </Link>
          <Link id="skills" to="/skills" className="text-white text-2xl hover:text-gray-300 mx-2">
            Skills
          </Link>
          <Link id="work-log" to="/work-log" className="text-white text-2xl hover:text-gray-300 mx-2">
            WorkLog
          </Link>
          <Link id="work-log" to="/create-blog-post" className="text-white text-2xl hover:text-gray-300 mx-2">
            Create
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
