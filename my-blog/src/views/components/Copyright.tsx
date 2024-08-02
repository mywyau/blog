import React from 'react';

const Copyright: React.FC = () => {
  return (
    <footer className="w-full font-nunito bg-true-blue text-white py-4 fixed bottom-0">
      <div className="container mx-auto text-center">
        <p>
          &copy; 2024 My Blog. All rights reserved.
          <a href="/privacy-policy" className="text-white underline hover:text-gray-300 ml-4 mr-2">Privacy Policy</a> |
          <a href="/terms-of-service" className="text-white underline hover:text-gray-300 ml-2">Terms of Service</a>
        </p>
      </div>
    </footer>
  );
};

export default Copyright;
