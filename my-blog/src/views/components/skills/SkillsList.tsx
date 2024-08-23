// src/components/BlogList.tsx
import React from 'react';
import { SkillData } from '../../../models/SkillData';
import SkillCard from '../skills/SkillsCard';

interface SkillListProps {
    skill: SkillData;
}

const SkillList: React.FC<SkillListProps> = ({ skill }) => {

    return (
        <div>
            <ul>
                <li key={skill.id} className="">
                    <SkillCard id={skill.id} skill={skill.skill_name} description={skill.body} />
                </li>
            </ul>
        </div >
    );
};

export default SkillList;
