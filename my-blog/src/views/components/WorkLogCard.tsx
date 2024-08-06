// src/components/SkillsCard.tsx
import React, { useState } from 'react';
// import { messages } from '../../messages/skills';

interface WorkLogCardProps {
    id: number;
    taskTitle: string;
    description: string;
}

const WorkLogCard: React.FC<WorkLogCardProps> = ({ id, taskTitle, description }) => {

    const countWords = (text: String) => {
        return text ? text.trim().split(/\s+/).length : 0;
    };

    return (
        <div className="w-full pt-6 pb-6 md:w-auto">
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 h-full">
                <div className="text-xl bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
                    <h2>{taskTitle}</h2>
                    <p className='text-sm text-orange-400 mb-4 pt-4'>Word Count: {countWords(description)}</p>
                    <p className="text-base text-gray-700 mb-4">{description}</p>
                </div>
            </div>
        </div>
    );
};

export default WorkLogCard;
