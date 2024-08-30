// src/pages/About.tsx
import React from 'react';
import Copyright from '../../components/Copyright';
import Navbar from '../../components/navigation_bar/NavBar';
import EditSkillForm from '../../components/skills/EditSkillForm';
import H1 from '../../components/general/H1';

const EditSkillsPage: React.FC = () => {

  return (
    <div className="flex flex-col min-h-screen font-nunito bg-gray-100">
      <Navbar />
      <div className="flex-grow container mx-auto p-4">
        <H1 id={'edit-a-skill'} message={'Edit a Skill'} className={''} />
        <EditSkillForm />
      </div>
      <Copyright />
    </div>
  );
};

export default EditSkillsPage;
