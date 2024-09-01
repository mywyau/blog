import React from 'react';
import messages from '../../messages/contact';
import Copyright from '../components/Copyright';
import H1 from '../components/general/H1';
import Navbar from '../components/navigation_bar/NavBar';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'react-lazy-load-image-component/src/effects/black-and-white.css';
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';

// Example image imports
import email_icon from '../../assets/email_icon.png';
import dog_phone from '../../assets/dog_phone.jpeg';
import home_icon from '../../assets/home_icon.png';

const Contact: React.FC = () => {

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="flex flex-col min-h-screen font-nunito bg-gray-100">
      <Navbar />
      <H1 id={"contacts-page"} message={messages.title} className={""} />

      <div className="flex-grow container mx-auto p-4">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">

          <div className="flex flex-col flex-none w-full pt-10 pb-10">
            <div className="grid grid-cols-3 bg-white rounded-lg shadow-lg p-8 h-auto">

              <div className="flex flex-col items-center text-center text-xl bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
                <div className="w-full md:w-3/4 lg:w-2/3 pt-10">
                  <LazyLoadImage
                    src={dog_phone}
                    alt="dog_phone"
                    effect="opacity"
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <div className="flex items-center justify-center mt-10">
                  <p className="text-2xl text-gray-700 mb-4 pt-5">{messages.phoneNumber.mobile}</p>
                  <FontAwesomeIcon
                    icon={faCopy}
                    className="ml-3 text-gray-500 cursor-pointer"
                    onClick={() => copyToClipboard(messages.phoneNumber.mobile)}
                  />
                </div>
              </div>

              <div className="flex flex-col items-center text-center text-xl bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">

                <div className="w-full md:w-3/4 lg:w-2/3 p-2">
                  <LazyLoadImage
                    src={home_icon}
                    alt="home_icon"
                    effect="opacity"
                    className="w-full h-auto rounded-lg"
                  />
                </div>

                <div className="flex items-center justify-center mb-4">
                  <p className="text-2xl text-gray-700">{messages.address.houseNumber} {messages.address.street}</p>
                  <FontAwesomeIcon
                    icon={faCopy}
                    className="ml-3 text-gray-500 cursor-pointer"
                    onClick={() => copyToClipboard(`${messages.address.houseNumber} ${messages.address.street}`)}
                  />
                </div>

                <div className="flex items-center justify-center mb-4">
                  <p className="text-2xl text-gray-700">{messages.address.county}</p>
                  <FontAwesomeIcon
                    icon={faCopy}
                    className="ml-3 text-gray-500 cursor-pointer"
                    onClick={() => copyToClipboard(messages.address.county)}
                  />
                </div>

                <div className="flex items-center justify-center mb-4">
                  <p className="text-2xl text-gray-700">{messages.address.city}</p>
                  <FontAwesomeIcon
                    icon={faCopy}
                    className="ml-3 text-gray-500 cursor-pointer"
                    onClick={() => copyToClipboard(messages.address.city)}
                  />
                </div>

                <div className="flex items-center justify-center mb-4">
                  <p className="text-2xl text-gray-700">{messages.address.country}</p>
                  <FontAwesomeIcon
                    icon={faCopy}
                    className="ml-3 text-gray-500 cursor-pointer"
                    onClick={() => copyToClipboard(messages.address.country)}
                  />
                </div>

                <div className="flex items-center justify-center mb-4">
                  <p className="text-2xl text-gray-700">{messages.address.postcode}</p>
                  <FontAwesomeIcon
                    icon={faCopy}
                    className="ml-3 text-gray-500 cursor-pointer"
                    onClick={() => copyToClipboard(messages.address.postcode)}
                  />
                </div>

              </div>

              <div className="flex flex-col items-center text-center text-xl bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
                <div className="w-1/2 md:w-1/3 lg:w-1/2 mt-10 p-8"> {/* Smaller width for the email icon */}
                  <LazyLoadImage
                    src={email_icon}
                    alt="email_icon"
                    effect="opacity"
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <div className="flex items-center justify-center mt-10">
                  <p className="text-2xl text-gray-700">{messages.email}</p>
                  <FontAwesomeIcon
                    icon={faCopy}
                    className="ml-3 text-gray-500 cursor-pointer"
                    onClick={() => copyToClipboard(messages.email)}
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      <Copyright />
    </div>
  );
};

export default Contact;
