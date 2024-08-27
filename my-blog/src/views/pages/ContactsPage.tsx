import React from 'react';
import messages from '../../messages/contact';
import Copyright from '../components/Copyright';
import H1 from '../components/general/H1';
import Navbar from '../components/navigation_bar/NavBar';

const Contact: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen font-nunito bg-gray-100">
      <Navbar />
      <H1 id={"contacts-page"} message={messages.title} className={""}/>

      <div className="flex-grow container mx-auto p-4">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          {/* Left Box with Bottom Gray Padding */}

          <div className="flex flex-col flex-none w-full pt-10 pb-10 md:w-1/3">
            <div className="bg-white rounded-lg shadow-lg p-8 h-auto">
              <div className="text-xl bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">

                <p className="text-base text-gray-700 mb-4">{messages.phoneNumber.mobile}</p>
                <p className="text-base text-gray-700 mb-4">{messages.email}</p>

                <p className="text-base text-gray-700 mb-4">{messages.address.houseNumber}</p>
                <p className="text-base text-gray-700 mb-4">{messages.address.street}</p>
                <p className="text-base text-gray-700 mb-4">{messages.address.county}</p>
                <p className="text-base text-gray-700 mb-4">{messages.address.city}</p>
                <p className="text-base text-gray-700 mb-4">{messages.address.country}</p>

              </div>
            </div>
          </div>
          {/* Right Box */}
          <div className="flex flex-col flex-none w-full pt-4 pb-10 md:w-2/3">
            {/* <div className="bg-gray-100 rounded-lg shadow-lg p-8 flex-grow"> */}
            <div className="bg-gray-100 rounded-lg p-8 flex-grow">
              <div className="">
                <h2 className="text-2xl pb-5">More Content</h2>
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

export default Contact;
