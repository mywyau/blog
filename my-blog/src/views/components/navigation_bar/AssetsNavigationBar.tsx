import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MobileNavBar from './MobileNavBar';

const AssetsNavigationBar: React.FC = () => {

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
          <MobileNavBar />
        </div>
        {/* Navigation Links */}
        <div className={`md:flex items-center md:space-x-6 ${isOpen ? 'block' : 'hidden'} md:block absolute md:static right-0 top-16 md:top-auto bg-true-blue md:bg-transparent p-4 md:p-0 w-64 md:w-auto`}>
          <div className="flex flex-col md:flex-row md:items-center md:space-x-6 space-y-4 md:space-y-0">
            <Link id="about" to="/buttons" className="text-white text-lg hover:text-gray-300">
              Buttons
            </Link>
            <Link id="about" to="/images" className="text-white text-lg hover:text-gray-300">
              Images
            </Link>
            <Link id="about" to="/loading" className="text-white text-lg hover:text-gray-300">
              Loading
            </Link>
            <Link id="about" to="/videos" className="text-white text-lg hover:text-gray-300">
              Videos
            </Link>
            <Link id="about" to="/forms" className="text-white text-lg hover:text-gray-300">
              Forms
            </Link>
            <Link id="about" to="/checkboxes" className="text-white text-lg hover:text-gray-300">
              Checkboxes
            </Link>
            <Link id="about" to="/radios" className="text-white text-lg hover:text-gray-300">
              Radios
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AssetsNavigationBar;
