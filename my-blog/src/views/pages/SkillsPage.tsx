// src/pages/About.tsx
import React from 'react';
import { messages } from '../../messages/skills';
import Copyright from '../components/Copyright';
import Navbar from '../components/navigation_bar/NavBar';
import SkillsCard from '../components/SkillsCard';

const SkillsPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen font-nunito bg-gray-100">
      <Navbar />

      <div className="flex-grow container mx-auto pt-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent pt-6">
          {messages.about.title}
        </h1>
      </div>

      <div className="flex-grow container mx-auto pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          <SkillsCard id={1} skill={"Python"} description={messages.lorem.p1} />
          <SkillsCard id={2} skill={"Rust"} description={messages.lorem.p1} />
          <SkillsCard id={3} skill={"Scala"} description={messages.lorem.p1} />
          <SkillsCard id={4} skill={"Typescript"} description={messages.lorem.p1} />
          <SkillsCard id={5} skill={"Latex"} description={messages.lorem.p1} />
          <SkillsCard id={6} skill={"Nix"} description={messages.lorem.p1} />
          <SkillsCard id={6} skill={"Git"} description={messages.lorem.p1} />
          <SkillsCard id={6} skill={"Docker"} description={messages.lorem.p1} />
          <SkillsCard id={6} skill={"JavaScript"} description={messages.lorem.p1} />
        </div>
      </div>
      <Copyright />
    </div>
  );
};

export default SkillsPage;
