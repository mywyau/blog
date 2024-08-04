// src/pages/About.tsx
import React from 'react';
import { messages } from '../../messages/interests';
import Copyright from '../components/Copyright';
import Navbar from '../components/NavBar';
import InterestsCard from '../components/InterestsCard';

const Interests: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen font-nunito bg-gray-100">
      <Navbar />

      <div className="flex-grow container mx-auto pt-4">
        <div className="flex justify-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent pt-6">
            {messages.title}
          </h1>
        </div>
      </div>

      <div className="flex-grow container mx-auto pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          <InterestsCard id={1} interest={"OSRS"} description={messages.lorem.p1} />
          <InterestsCard id={2} interest={"League Of Legends"} description={messages.lorem.p1} />
          <InterestsCard id={3} interest={"Cooking"} description={messages.lorem.p1} />
          <InterestsCard id={4} interest={"Gardening"} description={messages.lorem.p1} />
          <InterestsCard id={5} interest={"Reading"} description={messages.lorem.p1} />
        </div>
      </div>
      <Copyright />
    </div>
  );
};

export default Interests;
