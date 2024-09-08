import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavbarPages from '../../../models/ADTs/NavbarPages';
import LogoutButton from '../buttons/LogoutButton';

interface NavbarProps {
  page?: NavbarPages;
}

const Navbar: React.FC<NavbarProps> = ({ page = NavbarPages.Default }) => {

  const linkClassName = (navbarPages: NavbarPages) => {
    return (
      page === navbarPages
        ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-pink-300 animate-bounce text-xl hover:text-pink-200 transition-colors"
        : "text-white text-xl hover:text-gray-300 transition-colors duration-300"
    )
  }


  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-true-blue p-4 shadow-lg fixed w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand or Home Link */}
        <div className="flex items-center space-x-4">
          <Link
            id="home"
            to="/"
            className="text-white text-4xl font-bold hover:text-gray-300"
          >
            Home
          </Link>
        </div>
        {/* Mobile menu button */}
        <div className="block md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              className="h-6 w-6 transition-transform transform-gpu"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                transform: isOpen ? 'rotate(45deg)' : 'rotate(0)',
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isOpen
                    ? 'M6 18L18 6M6 6l12 12'
                    : 'M4 6h16M4 12h16m-7 6h7'
                }
              />
            </svg>
          </button>
        </div>
        {/* Navigation Links */}
        <div
          className={`md:flex items-center md:space-x-6 ${isOpen ? 'block' : 'hidden'
            } md:block absolute md:static right-0 top-16 md:top-auto bg-true-blue md:bg-transparent p-4 md:p-0 w-64 md:w-auto shadow-md md:shadow-none rounded-lg md:rounded-none transition-all duration-300`}
        >
          <div className="flex flex-col md:flex-row md:items-center md:space-x-6 space-y-4 md:space-y-0">
            {/* Conditionally render the "About Me" link */}
            <Link
              id="about-me"
              to="/about"
              className={linkClassName(NavbarPages.About)}
            >
              About Me
            </Link>
            <Link
              id="contact"
              to="/contact"
              className={linkClassName(NavbarPages.Contact)}
            >
              Contact
            </Link>
            <Link
              id="interests"
              to="/interests"
              className={linkClassName(NavbarPages.Interests)}
            >
              Interests
            </Link>
            <Link
              id="skills"
              to="/skills"
              className={linkClassName(NavbarPages.Skills)}
            >
              Skills
            </Link>
            <Link
              id="worklog-nav"
              to="/worklog"
              className={linkClassName(NavbarPages.Worklog)}
            >
              WorkLog
            </Link>
            <Link
              id="assets"
              to="/assets"
              className={linkClassName(NavbarPages.Assets)}
            >
              Assets
            </Link>
            <Link
              id="create-blog-post"
              to="/login"
              className={linkClassName(NavbarPages.Login)}
            >
              Login
            </Link>
            <Link
              id="create-blog-post"
              to="/create-blog-post"
              className="bg-green-500 text-white text-lg font-semibold py-2 px-5 rounded hover:bg-green-400 hover:text-gray-700 transition-colors duration-300 flex items-center justify-center"
            >
              Create Blog Post
            </Link>
            <LogoutButton />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
