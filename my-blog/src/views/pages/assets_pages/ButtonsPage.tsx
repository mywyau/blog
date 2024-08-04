import React from 'react';
import Button from '../../components/Button';
import Copyright from '../../components/Copyright';
import AssetsNavigationBar from '../../components/navigation_bar/AssetsNavigationBar';

const ButtonsPage: React.FC = () => {

  return (
    <div className="flex flex-col min-h-screen font-nunito bg-gray-50">
      <AssetsNavigationBar />
      <div className="flex-grow container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-4">Buttons</h1>
        <div className="flex flex-col space-y-4">
          <Button>Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="danger">Danger Button</Button>
          <Button variant="gradient-light-up">Gradient with Light up Button</Button>
          <Button variant="gradient" disabled>Disabled Gradient Button</Button>
        </div>
      </div>
      <Copyright />
    </div>
  );
};

export default ButtonsPage;
