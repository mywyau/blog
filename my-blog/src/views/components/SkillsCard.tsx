// src/components/SkillsCard.tsx
import React from 'react';
import { messages } from '../../messages/skills';

interface SkillsCardProps {
    id: number;
    skill: string;
    description: string;
  }

const SkillsCard: React.FC<SkillsCardProps> = ({ id, skill, description }) => {
    return (
        <div className="flex flex-col flex-none w-full pt-6 pb-6 md:w-auto">
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 h-full">
                <div className="text-xl bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
                    <h2>{skill}</h2>
                    <p className="text-base text-gray-700 mb-4">{description}</p>
                </div>
            </div>
        </div>
    );
};

export default SkillsCard;
