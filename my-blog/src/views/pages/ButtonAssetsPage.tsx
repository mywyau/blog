import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import Copyright from '../components/Copyright';
import LoadingIcon from '../components/LoadingIcon';
import Navbar from '../components/NavBar';

const ButtonAssetsPage: React.FC = () => {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a network request or some async operation
    setTimeout(() => {
      setIsLoading(false);
    }, 5000); // 3 seconds delay
  }, []);


  return (
    <div className="flex flex-col min-h-screen font-nunito bg-gray-50">
      <Navbar />
      <div className="flex-grow container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-4">Buttons</h1>
        <div className="flex flex-col space-y-4">
          <Button>Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="danger">Danger Button</Button>
          <Button variant="gradient-light-up">Gradient with Light up Button</Button>
          <Button variant="gradient" disabled>Disabled Gradient Button</Button>

          <div>
            {isLoading ? (
              <LoadingIcon />
            ) : (
              <div>
                <h1>Data Loaded</h1>
                {/* Rest of your component */}
              </div>
            )}
          </div>

        </div>
      </div>
      <Copyright />
    </div>
  );
};

export default ButtonAssetsPage;
