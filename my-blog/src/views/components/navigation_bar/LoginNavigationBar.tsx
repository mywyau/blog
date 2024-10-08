import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginNavbarPages from '../../../models/ADTs/LoginNavbarPages';
import LogoutButton from '../buttons/LogoutButton';

interface LoginNavbarProps {
  page?: LoginNavbarPages;
}

const LoginNavigationbar: React.FC<LoginNavbarProps> = ({ page = LoginNavbarPages.Default }) => {

  const linkClassName = (LoginnavbarPages: LoginNavbarPages) => {
    return (
      page === LoginnavbarPages
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
              id="login"
              to="/login"
              className={linkClassName(LoginNavbarPages.Login)}
            >
              Login
            </Link>
            <Link
              id="create-new-account"
              to="/register"
              className={linkClassName(LoginNavbarPages.CreateAccount)}
            >
              Create Account
            </Link>
            <Link
              id="forgot-password"
              to="/forgot/password"
              className={linkClassName(LoginNavbarPages.ForgottenPassword)}
            >
              Forgotten Password
            </Link>
            <LogoutButton />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default LoginNavigationbar;
