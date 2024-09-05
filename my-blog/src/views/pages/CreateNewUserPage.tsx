// src/pages/About.tsx
import React from 'react';
import CreateUserForm from '../../forms/CreateUserForm';
import NavbarPages from '../../models/ADTs/NavbarPages';
import Copyright from '../components/Copyright';
import Navbar from '../components/navigation_bar/NavBar';
import Spacer from '../components/Spacer';

const CreateNewUserPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen font-nunito bg-gray-100">
      <Navbar page={NavbarPages.Login} />
      <Spacer size='p-20' />
      <div className="flex-grow container mx-auto p-4">
        <CreateUserForm />
      </div>
      <Copyright />
    </div>
  );
};

export default CreateNewUserPage;
