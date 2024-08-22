import React from 'react';
import { messages } from '../../messages/about';
import Copyright from '../components/Copyright';
import Navbar from '../components/navigation_bar/NavBar';

const About: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen font-nunito bg-gray-100">
      <Navbar />
      <div className="p-4 pb-6 container mx-auto">
        <div className="flex justify-right">
          <h1 id="about" className="text-6xl font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent pt-6">
            {messages.about.title}
          </h1>
        </div>
      </div>

      <div className="flex-grow container mx-auto">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex flex-col flex-none w-full pt-0 pb-5 md:pt-0 pr-20 pl-20">
            <div className="rounded-lg p-8 flex-grow">
              <div>
                <p className="text-base text-gray-700 mb-4">{messages.lorem.p1}</p>
                <p className="text-base text-gray-700 mb-4">{messages.lorem.p2}</p>
                <p className="text-base text-gray-700 mb-4">{messages.lorem.p3}</p>
                <p className="text-base text-gray-700 mb-4">{messages.lorem.p4}</p>
                <p className="text-base text-gray-700 mb-4">{messages.lorem.p5}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Copyright />
    </div>
  );
};

export default About;
