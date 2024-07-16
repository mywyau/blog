// src/pages/Contact.tsx
import React from 'react';
import Navbar from '../NavBar';
import Copyright from '../Copyright';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-4">Contact</h1>
        <p className="text-gray-700">This is the contact page content.</p>
      </div>
      <Copyright />
    </div>
  );
};

export default Contact;
