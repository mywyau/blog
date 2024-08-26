// src/pages/About.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { messages } from '../../messages/skills';
import { SkillData } from '../../models/SkillData';
import Copyright from '../components/Copyright';
import H1 from '../components/general/H1';
import Navbar from '../components/navigation_bar/NavBar';
import SkillList from '../components/skills/SkillsList';
import SkillsPagination from '../components/skills/SkillsPagination';

const SkillsPage: React.FC = () => {

  const skillData: SkillData[] = [
    { id: 1, skill_id: "skill_id_1", skill_name: "Python", body: "Lorem ipsum dolor sit amet, consectetur adipiscing el aspect, sed do eiusmod tempor incididunt ut lab" },
    { id: 2, skill_id: "skill_id_2", skill_name: "Rust", body: "Lorem ipsum dolor sit amet, consectetur adipiscing el aspect, sed do eiusmod tempor incididunt ut lab" },
    { id: 3, skill_id: "skill_id_3", skill_name: "Scala", body: "Lorem ipsum dolor sit amet, consectetur adipiscing el aspect, sed do eiusmod tempor incididunt ut lab" },
    { id: 4, skill_id: "skill_id_4", skill_name: "Typescript", body: "Lorem ipsum dolor sit amet, consectetur adipiscing el aspect, sed do eiusmod tempor incididunt ut lab" },
    { id: 5, skill_id: "skill_id_5", skill_name: "Latex", body: "Lorem ipsum dolor sit amet, consectetur adipiscing el aspect, sed do eiusmod tempor incididunt ut lab" },
    { id: 6, skill_id: "skill_id_6", skill_name: "Nix", body: "Lorem ipsum dolor sit amet, consectetur adipiscing el aspect, sed do eiusmod tempor incididunt ut lab" },
    { id: 7, skill_id: "skill_id_7", skill_name: "Git", body: "Lorem ipsum dolor sit amet, consectetur adipiscing el aspect, sed do eiusmod tempor incididunt ut lab" },
    { id: 8, skill_id: "skill_id_8", skill_name: "Docker", body: "Lorem ipsum dolor sit amet, consectetur adipiscing el aspect, sed do eiusmod tempor incididunt ut lab" },
    { id: 9, skill_id: "skill_id_9", skill_name: "Tampermonkey", body: "Lorem ipsum dolor sit amet, consectetur adipiscing el aspect, sed do eiusmod tempor incididunt ut lab" },
    { id: 10, skill_id: "skill_id_10", skill_name: "Selenium", body: "Lorem ipsum dolor sit amet, consectetur adipiscing el aspect, sed do eiusmod tempor incididunt ut lab" },
    { id: 11, skill_id: "skill_id_11", skill_name: "Cats", body: "Lorem ipsum dolor sit amet, consectetur adipiscing el aspect, sed do eiusmod tempor incididunt ut lab" },
    { id: 12, skill_id: "skill_id_12", skill_name: "Cats Effect 3", body: "Lorem ipsum dolor sit amet, consectetur adipiscing el aspect, sed do eiusmod tempor incididunt ut lab" },
    { id: 13, skill_id: "skill_id_13", skill_name: "React", body: "Lorem ipsum dolor sit amet, consectetur adipiscing el aspect, sed do eiusmod tempor incididunt ut lab" },
    { id: 14, skill_id: "skill_id_14", skill_name: "Functional Programming", body: "Lorem ipsum dolor sit amet, consectetur adipiscing el aspect, sed do eiusmod tempor incididunt ut lab" },
    { id: 15, skill_id: "skill_id_15", skill_name: "Sql", body: "Lorem ipsum dolor sit amet, consectetur adipiscing el aspect, sed do eiusmod tempor incididunt ut lab" },
    { id: 16, skill_id: "skill_id_16", skill_name: "Github Actions", body: "Lorem ipsum dolor sit amet, consectetur adipiscing el aspect, sed do eiusmod tempor incididunt ut lab" },
    { id: 17, skill_id: "skill_id_17", skill_name: "Tailwind CSS", body: "Lorem ipsum dolor sit amet, consectetur adipiscing el aspect, sed do eiusmod tempor incididunt ut lab" },
    { id: 18, skill_id: "skill_id_18", skill_name: "MongoDb", body: "Lorem ipsum dolor sit amet, consectetur adipiscing el aspect, sed do eiusmod tempor incididunt ut lab" },
    { id: 19, skill_id: "skill_id_19", skill_name: "Unix", body: "Lorem ipsum dolor sit amet, consectetur adipiscing el aspect, sed do eiusmod tempor incididunt ut lab" },
    { id: 20, skill_id: "skill_id_20", skill_name: "Vim", body: "Lorem ipsum dolor sit amet, consectetur adipiscing el aspect, sed do eiusmod tempor incididunt ut lab" }
  ];

  function sortBySkillName(skills: SkillData[]): SkillData[] {
    return skills.sort((a, b) => a.skill_name.localeCompare(b.skill_name));
  }

  const [currentPage, setCurrentPage] = useState(1);
  const skillsPerPage = 9;
  const indexOfLastSkill = currentPage * skillsPerPage;
  const indexOfFirstSkill = indexOfLastSkill - skillsPerPage;

  const currentPosts = sortBySkillName(skillData).slice(indexOfFirstSkill, indexOfLastSkill);

  return (
    <div className="flex flex-col min-h-screen font-nunito bg-gray-100">
      <Navbar />
      <H1 id={"skills"} message={messages.about.title} />
      <div className="flex flex-col flex-grow container mx-auto">
        <div className="flex-grow">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-2">
            {currentPosts.map(skill =>
              <div key={skill.id} className="p-2 sm:p-3"> {/* Added padding for small screens */}
                <SkillList key={skill.id} skill={skill} />
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-start pb-10">
          <div className="p-2 sm:p-4">
            <SkillsPagination
              skillsPerPage={skillsPerPage}
              totalSkills={skillData.length}
              paginate={(pageNumber) => setCurrentPage(pageNumber)}
            />
          </div>
        </div>

        <div className="flex justify-start pb-20">
          <Link
            id="add-new-skill"
            to="/create/skill"
            className="bg-cambridge-blue text-black text-lg font-semibold py-3 px-7 rounded hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center"
          >
            Add New Skill
          </Link>
        </div>
      </div>
      <Copyright />
    </div>
  );
};

export default SkillsPage;
