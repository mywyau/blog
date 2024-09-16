import React, { useState } from 'react';
import Copyright from '../components/Copyright';
import AssetsNavigationBar from '../components/navigation_bar/AssetsNavigationBar';
import Spacer from '../components/Spacer';

const AssetsPage: React.FC = () => {

  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="flex flex-col min-h-screen font-nunito bg-gray-100">
      <Spacer size='pb-20'/>
      {/* <AssetsNavigationBar /> */}
      <div className="flex-grow container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-4">Assets</h1>
        <div className="flex flex-col space-y-4">
          {/* Add your content here */}
        </div>
      </div>
      <Copyright />
    </div>
  );
};

export default AssetsPage;
