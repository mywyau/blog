// src/components/SkillsCard.tsx
import React from 'react';
import UseDeleteSkill from '../../../hooks/UseDeleteSkill';
import EditSkillButton from '../buttons/EditSkillButton';
import DeleteSkillButton from '../buttons/DeleteSkillButton';

interface SkillsCardProps {
    id: number;
    skill_id: string;
    skill: string;
    description: string;
}

const SkillsCard: React.FC<SkillsCardProps> = ({ id, skill_id, skill, description }) => {

    const { handleDelete, loadingState, deleteErrorMessage, deleteResponseBody } = UseDeleteSkill(skill_id);

    return (
        <div className="flex flex-col flex-none w-full pt-2 pb-2 md:w-auto">
            <div className="bg-white rounded-lg p-6 md:p-8 h-full">
                <div className="text-xl bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
                    <h2>{skill}</h2>
                    <p className="text-base text-gray-700 mb-4">{description}</p>
                </div>
                <div className="flex space-x-4"> {/* Flex container for buttons */}
                    <EditSkillButton skillId={skill_id} />
                    <DeleteSkillButton handleDelete={handleDelete} loading={loadingState} errorMessage={deleteErrorMessage} deleteResponseBody={deleteResponseBody} />
                </div>
            </div>
        </div>
    );
};

export default SkillsCard;
