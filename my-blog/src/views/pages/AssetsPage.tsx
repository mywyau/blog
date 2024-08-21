import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Copyright from '../components/Copyright';
import AssetsNavigationBar from '../components/navigation_bar/AssetsNavigationBar';

const AssetsPage: React.FC = () => {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a network request or some async operation
    setTimeout(() => {
      setIsLoading(false);
    }, 1000); //  seconds delay
  }, []);

  return (
    <div className="flex flex-col min-h-screen font-nunito bg-gray-50">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <AssetsNavigationBar />
          <div className="flex-grow container mx-auto p-4">
            <h1 className="text-4xl font-bold mb-4">Assets</h1>
            <div className="flex flex-col space-y-4">
              {/* Add your content here */}
            </div>
          </div>
          <Copyright />
        </>
      )}
    </div>
  );
};

export default AssetsPage;
