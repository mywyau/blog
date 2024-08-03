import React from 'react';
import { messages } from '../../messages/privacy_policy';
import Copyright from '../components/Copyright';
import Navbar from '../components/NavBar';

const TermsOfService: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen font-nunito bg-gray-100">
      <Navbar />
      <div className="flex-grow container mx-auto p-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent pt-6">Terms Of Service</h1>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">

          {/* Left Box with Bottom Gray Padding */}

          <div className="flex flex-col flex-none w-full pt-10 pb-10 md:w-1/3">
            <div className="bg-white rounded-lg shadow-lg p-8 h-auto">
              <div className="text-xl bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">

                <p className="text-base text-gray-700 mb-4">{messages.lorem.p1}</p>
              </div>
            </div>
          </div>

          {/* Right Box */}
          <div className="flex flex-col flex-none w-full pt-10 pb-10 md:w-2/3">
            <div className="bg-white rounded-lg shadow-lg p-8 flex-grow">
              <div className="">
                <h2 className="text-2xl pb-5">Terms Of Service</h2>
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

export default TermsOfService;
