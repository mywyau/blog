// src/pages/About.tsx
import React from 'react';
import Copyright from '../../components/Copyright';
import Navbar from '../../components/navigation_bar/NavBar';
import EditSkillForm from '../../components/skills/EditSkillForm';

const EditSkillsPage: React.FC = () => {

  return (
    <div className="flex flex-col min-h-screen font-nunito bg-gray-100">
      <Navbar />
      <div className="flex-grow container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-4">Edit a blog post</h1>
        <EditSkillForm />
      </div>
      <Copyright />
    </div>
  );
};

export default EditSkillsPage;
