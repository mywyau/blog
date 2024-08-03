import React from 'react';
import Copyright from '../Copyright';
import Navbar from '../NavBar';

const Contact: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen font-nunito bg-gray-100">
      <Navbar />
      <div className="flex-grow container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-4">Contact</h1>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          {/* Left Box with Bottom Gray Padding */}
          <div className="flex flex-col flex-none w-full md:w-1/3">
            <div className="bg-white rounded-lg shadow-lg p-8 h-auto">
              <div className="text-6xl font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
                <p className="text-2xl text-gray-700 mb-4">This is the contact page content.</p>
                Contact Us
              </div>
            </div>
            <div className="bg-gray-200 p-4 rounded-b-lg"></div>
          </div>
          {/* Right Box */}
          <div className="bg-white rounded-lg shadow-lg p-8 flex-grow">
            <div className="text-6xl font-bold bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
              <p className="text-2xl text-gray-700 mb-4">This is additional content on the right side.</p>
              <p className="text-2xl text-gray-700 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <p className="text-2xl text-gray-700 mb-4">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              <p className="text-2xl text-gray-700 mb-4">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
              <p className="text-2xl text-gray-700 mb-4">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
              <p className="text-2xl text-gray-700 mb-4">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
              <p className="text-2xl text-gray-700 mb-4">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
              <p className="text-2xl text-gray-700 mb-4">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
              More Content
            </div>
          </div>
        </div>
      </div>
      <Copyright />
    </div>
  );
};

export default Contact;
