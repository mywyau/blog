import { Either, fold } from 'fp-ts/lib/Either';
import { none, Option, fold as optionFold, some } from 'fp-ts/lib/Option';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RoleProtected from '../../../contexts/RoleProtected';
import { UserRoleProvider } from '../../../contexts/UserRoleContext';
import NavbarPages from '../../../models/ADTs/NavbarPages';
import UserTypes from '../../../models/ADTs/UserType';
import UserTypeErrors from '../../../models/ADTs/UserTypeErrors';
import AuthService from '../../../service/AuthService';
import LogoutButton from '../buttons/LogoutButton';

interface NavbarProps {
  page?: NavbarPages;
}

const Navbar: React.FC<NavbarProps> = ({ page = NavbarPages.Default }) => {
  
  const linkClassName = (navbarPages: NavbarPages) => {
    switch (navbarPages) {
      case NavbarPages.Home:
        return (
          page === navbarPages
            ? "text-3xl text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-pink-600 animate-bounce hover:text-pink-200 transition-colors"
            : "text-3xl text-black  hover:text-gray-500  transition-colors duration-300"
        );
      default:
        return (
          page === navbarPages
            ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-pink-600 animate-bounce text-xl hover:text-pink-200 transition-colors"
            : "text-black text-xl hover:text-gray-500 transition-colors duration-300"
        );
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const [userBasedContent, setUserBasedContent] = useState<Option<JSX.Element>>(none); // State to track user role

  // Fetch user role when component mounts
  useEffect(() => {
    const renderContent = async () => {
      const result: Either<UserTypeErrors, UserTypes> = await AuthService.getRole();

      fold<UserTypeErrors, UserTypes, void>(
        (error) => {
          switch (error) {
            case UserTypeErrors.UnknownUserType:
              setUserBasedContent(none); // No content for unknown user type
              break;
            default:
              setUserBasedContent(none); // No content for other errors
              break;
          }
        },
        (userType) => {
          switch (userType) {
            case UserTypes.Admin:
              setUserBasedContent(some(
                <div>
                  <p className="text-lg text-pink-500 text-right">Logged in as Admin</p>
                </div>
              ));
              break;
            case UserTypes.Viewer:
              setUserBasedContent(some(
                <div>
                  <p className="text-lg text-pink-500 text-right">Logged in as Viewer</p>
                </div>
              ));
              break;
            default:
              setUserBasedContent(none); // No content for other cases
              break;
          }
        }
      )(result);
    };

    renderContent(); // Invoke the function to fetch and set the content based on the user role
  }, []); // Empty dependency array to run only on mount

  return (
    <UserRoleProvider>
      <nav className="bg-gray-100 p-4 fixed w-full z-50 border-b-2 border-gray-300">
        <div className="container mx-auto flex justify-between items-center">
          {/* Brand or Home Link */}
          <div className="flex items-center space-x-4">
            <Link
              id="home"
              to="/"
              className={linkClassName(NavbarPages.Home)}
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
              <RoleProtected roles={[UserTypes.Admin]}>
                <Link
                  id="assets"
                  to="/assets"
                  className={linkClassName(NavbarPages.Assets)}
                >
                  Assets
                </Link>
              </RoleProtected>
              <Link
                id="login-nav"
                to="/login"
                className={linkClassName(NavbarPages.Login)}
              >
                Login
              </Link>
              {
                optionFold<JSX.Element, JSX.Element>(
                  () => <></>, // Render nothing for the None case
                  (content) => content // Render content for the Some case
                )(userBasedContent)
              }
              <RoleProtected roles={[UserTypes.Admin]}>
                <div className="flex flex-col space-y-2">
                  <Link
                    id="create-blog-post"
                    to="/create-blog-post"
                    className="bg-green-500 text-white text-lg font-semibold py-2 px-5 rounded hover:bg-green-400 hover:text-gray-700 transition-colors duration-300 flex items-center justify-center"
                  >
                    Create Blog Post
                  </Link>
                  <LogoutButton />
                </div>
              </RoleProtected>
            </div>
          </div>
        </div>
      </nav>
    </UserRoleProvider>
  );
};

export default Navbar;
