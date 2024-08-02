// src/pages/Contact.tsx
import React from 'react';
import Copyright from '../Copyright';
import Navbar from '../NavBar';

const Contact: React.FC = () => {
  return (
    <div className="font-nunito min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex-grow container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-4">Contact</h1>
        <p className="text-gray-700">This is the contact page content.</p>
        <div className="flex justify-center items-center h-screen bg-white">
          <div className="text-6xl font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
          </div>
        </div>
      </div>
      <Copyright />
    </div>
  );
};

export default Contact;
