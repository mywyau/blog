import { fold } from 'fp-ts/lib/Either';
import { none, Option, some } from 'fp-ts/lib/Option';
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

// Toggle Menu Logic
export const useToggleMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((prevState) => !prevState);
  return { isOpen, toggleMenu };
};

// Generate Link Class based on active page
export const generateLinkClassName = (page: NavbarPages, navbarPages: NavbarPages) => {
  const baseClasses = 'transition-colors duration-300';
  const activeClasses = 'bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-pink-600 animate-bounce';
  return page === navbarPages
    ? `text-3xl text-transparent ${activeClasses} hover:text-pink-200`
    : `text-black ${baseClasses} hover:text-gray-500`;
};

// Fetch User Role and Generate Role-specific Content
export const fetchUserRole = async (setUserBasedContent: React.Dispatch<Option<JSX.Element>>) => {
  const result = await AuthService.getRole();
  fold<UserTypeErrors, UserTypes, void>(
    () => setUserBasedContent(none), // Handle error cases
    (userType) => {
      switch (userType) {
        case UserTypes.Admin:
          setUserBasedContent(some(<p className="text-lg text-pink-500 text-right">Logged in as Admin</p>));
          break;
        case UserTypes.Viewer:
          setUserBasedContent(some(<p className="text-lg text-pink-500 text-right">Logged in as Viewer</p>));
          break;
        default:
          setUserBasedContent(none); // Handle unexpected roles
          break;
      }
    }
  )(result);
};


const Navbar: React.FC<NavbarProps> = ({ page = NavbarPages.Default }) => {
  const { isOpen, toggleMenu } = useToggleMenu();
  const [userBasedContent, setUserBasedContent] = useState<Option<JSX.Element>>(none);

  // Fetch user role when the component mounts
  useEffect(() => {
    fetchUserRole(setUserBasedContent);
  }, []);

  return (
    <UserRoleProvider>
      <nav className="bg-gray-100 p-4 fixed w-full z-50 border-b-2 border-gray-300">
        <div className="container mx-auto flex justify-between items-center">
          {/* Home Link */}
          <div className="flex items-center space-x-4">
            <Link id="home" to="/" className={generateLinkClassName(page, NavbarPages.Home)}>
              Home
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="block md:hidden">
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              <svg
                className="h-6 w-6 transition-transform transform-gpu"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0)' }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'} />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <div className={`md:flex items-center md:space-x-6 ${isOpen ? 'block' : 'hidden'} md:block absolute md:static right-0 top-16 md:top-auto bg-true-blue md:bg-transparent p-4 md:p-0 w-64 md:w-auto shadow-md md:shadow-none rounded-lg md:rounded-none transition-all duration-300`}>
            <div className="flex flex-col md:flex-row md:items-center md:space-x-6 space-y-4 md:space-y-0">
              {/* Static Navigation Links */}
              <Link id="about-me" to="/about" className={generateLinkClassName(page, NavbarPages.About)}>About Me</Link>
              <Link id="contact" to="/contact" className={generateLinkClassName(page, NavbarPages.Contact)}>Contact</Link>
              <Link id="interests" to="/interests" className={generateLinkClassName(page, NavbarPages.Interests)}>Interests</Link>
              <Link id="skills" to="/skills" className={generateLinkClassName(page, NavbarPages.Skills)}>Skills</Link>
              <Link id="worklog-nav" to="/worklog" className={generateLinkClassName(page, NavbarPages.Worklog)}>WorkLog</Link>

              {/* Admin-specific links */}
              <RoleProtected roles={[UserTypes.Admin]}>
                <Link id="assets" to="/assets" className={generateLinkClassName(page, NavbarPages.Assets)}>Assets</Link>
                <div className="flex flex-col space-y-2">
                  <Link id="create-blog-post" to="/create-blog-post" className="bg-green-500 text-white text-lg font-semibold py-2 px-5 rounded hover:bg-green-400 hover:text-gray-700 transition-colors duration-300 flex items-center justify-center">
                    Create Blog Post
                  </Link>
                  <LogoutButton />
                </div>
              </RoleProtected>

              {/* Login Link */}
              <Link id="login-nav" to="/login" className={generateLinkClassName(page, NavbarPages.Login)}>Login</Link>

              {/* User-specific content */}
              {userBasedContent && userBasedContent._tag === 'Some' && userBasedContent.value}
            </div>
          </div>
        </div>
      </nav>
    </UserRoleProvider>
  );
};

export default Navbar;
