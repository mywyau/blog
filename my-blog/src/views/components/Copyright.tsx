import React from 'react';

const Copyright: React.FC = () => {
  return (
    <footer className="w-full font-nunito bg-true-blue text-white py-1 fixed bottom-0">
      <div className="container mx-auto text-center px-4 sm:px-6 lg:px-8">
        <p className="text-xs xs:text-base">
          &copy; 2024 Michael Yau Blog | All rights reserved
          <a href="/privacy-policy" className="text-white underline hover:text-gray-300 ml-2 sm:ml-4 sm:mr-2">Privacy Policy</a> |
          <a href="/terms-of-service" className="text-white underline hover:text-gray-300 ml-2">Terms of Service</a>
        </p>
      </div>
    </footer>
  );
};

export default Copyright;
