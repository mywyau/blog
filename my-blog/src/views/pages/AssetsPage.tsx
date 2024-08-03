import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import Copyright from '../components/Copyright';
import LoadingIcon from '../components/LoadingIcon';
import AssetsNavigationBar from '../components/navigation_bar/AssetsNavigationBar';

const AssetsPage: React.FC = () => {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a network request or some async operation
    setTimeout(() => {
      setIsLoading(false);
    }, 5000); // 3 seconds delay
  }, []);


  return (
    <div className="flex flex-col min-h-screen font-nunito bg-gray-50">
      <AssetsNavigationBar />
      <div className="flex-grow container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-4">Assets</h1>
        <div className="flex flex-col space-y-4">
        </div>
      </div>
      <Copyright />
    </div>
  );
};

export default AssetsPage;
