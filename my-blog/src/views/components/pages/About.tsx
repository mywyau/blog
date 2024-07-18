// src/pages/About.tsx
import React from 'react';
import Navbar from '../NavBar';
import Copyright from '../Copyright';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-4">About</h1>
        <p className="text-gray-700">This is the about page content.</p>
      </div>
      <Copyright />
    </div>
  );
};

export default About;
