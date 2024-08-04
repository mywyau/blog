// src/components/SkillsCard.tsx
import React from 'react';

interface InterestsCardProps {
    id: number;
    interest: string;
    description: string;
  }

const InterestsCard: React.FC<InterestsCardProps> = ({ id, interest, description }) => {
    return (
        <div className="flex flex-col flex-none w-full pt-6 pb-6 md:w-auto">
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 h-full">
                <div className="text-xl bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
                    <h2>{interest}</h2>
                    <p className="text-base text-gray-700 mb-4">{description}</p>
                </div>
            </div>
        </div>
    );
};

export default InterestsCard;
