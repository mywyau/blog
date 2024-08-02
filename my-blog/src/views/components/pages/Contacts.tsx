import React from 'react';
import Copyright from '../Copyright';
import Navbar from '../NavBar';

const Contact: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen font-nunito bg-gray-100">
      <Navbar />
      <div className="flex-grow container mx-auto p-4">
        
        <div className="flex space-x-4">

          {/* Left Box with Gray Background Padding */}
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md" style={{ height: '300px' }}>
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
              Contact Us
              <p className="text-lg text-gray-700 mb-4">This is the contact page content.</p>
            </div>
          </div>

          {/* Right Box */}
          <div className="bg-gray-100 pb-10">
            <div className="bg-white rounded-lg shadow-lg p-8 flex-1">
              <div className="text-6xl font-bold bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">

              <h1 className="text-6xl font-bold bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text pb-6">More Content</h1>
                

                <p className="text-2xl text-gray-700 mb-4">This is additional content on the right side.</p>
                <p className="text-2xl text-gray-700 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <p className="text-2xl text-gray-700 mb-4">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <p className="text-2xl text-gray-700 mb-4">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                <p className="text-2xl text-gray-700 mb-4">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                <p className="text-2xl text-gray-700 mb-4">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                <p className="text-2xl text-gray-700 mb-4">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                <p className="text-2xl text-gray-700 mb-4">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                <p className="text-2xl text-gray-700 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <p className="text-2xl text-gray-700 mb-4">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <p className="text-2xl text-gray-700 mb-4">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                <p className="text-2xl text-gray-700 mb-4">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                <p className="text-2xl text-gray-700 mb-4">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                <p className="text-2xl text-gray-700 mb-4">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                <p className="text-2xl text-gray-700 mb-4">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                <p className="text-2xl text-gray-700 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 p-6">
        </div>

      </div>
      <Copyright />
    </div>
  );
};

export default Contact;
