// src/pages/About.tsx
import React from 'react';
import Button from '../Button';
import Copyright from '../Copyright';
import GETButton from '../GETButton';
import Navbar from '../NavBar';

const ButtonAssetsPage: React.FC = () => {
  return (
    <div className="font-nunito min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-4">Buttons</h1>
        <Button>Primary Button</Button>
        <Button variant="secondary">Secondary Button</Button>
        <Button variant="danger">Danger Button</Button>
        <GETButton />
      </div>
      <Copyright />
    </div>
  );
};

export default ButtonAssetsPage;
