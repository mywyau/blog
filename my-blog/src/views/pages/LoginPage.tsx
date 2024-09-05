// src/pages/About.tsx
import React from 'react';
import NavbarPages from '../../models/ADTs/NavbarPages';
import Copyright from '../components/Copyright';
import LoginNavigationbar from '../components/navigation_bar/LoginNavigationBar';
import LoginForm from '../forms/LoginForm';
import LoginNavbarPages from '../../models/ADTs/LoginNavbarPages';

const LoginPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen font-nunito bg-gray-100">
      <LoginNavigationbar page={LoginNavbarPages.Login} />
      <div className="flex-grow container mx-auto p-4">
        <LoginForm />
      </div>
      <Copyright />
    </div>
  );
};

export default LoginPage;
