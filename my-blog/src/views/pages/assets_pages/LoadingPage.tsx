import React, { useEffect, useState } from 'react';
import Copyright from '../../components/Copyright';
import LoadingIcon from '../../components/LoadingIcon';
import AssetsNavigationBar from '../../components/navigation_bar/AssetsNavigationBar';

const LoadingPage: React.FC = () => {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a network request or some async operation
    setTimeout(() => {
      setIsLoading(false);
    }, 5000); // 3 seconds delay
  }, []);

  return (
    <div className="flex flex-col min-h-screen font-nunito bg-gray-100">
      <AssetsNavigationBar />
      <div className="flex-grow container mx-auto p-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent pt-6">Loading</h1>

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
      <Copyright />
    </div>
  );
};

export default LoadingPage;
