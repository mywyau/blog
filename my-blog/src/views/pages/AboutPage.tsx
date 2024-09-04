import React from 'react';
import { messages } from '../../messages/about';
import NavbarPages from '../../models/ADTs/NavbarPages';
import Copyright from '../components/Copyright';
import Navbar from '../components/navigation_bar/NavBar';

const AboutPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen font-nunito bg-gray-100">
      <Navbar page={NavbarPages.About} />
      {/* <H1 id={"about"} message={messages.about.title} className={""} /> */}
        <div className="flex flex-grow container mx-auto pt-28 flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex flex-col flex-none w-full pt-0 pb-5 md:pt-0 pr-20 pl-20">
            <div className="rounded-lg p-8">
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

      <Copyright />
    </div>
  );
};

export default AboutPage;
