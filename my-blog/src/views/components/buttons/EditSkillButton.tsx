import React from 'react';
import { Link } from 'react-router-dom';

interface EditSkillButtonProps {
    skillId: string;
}

const EditSkillButton: React.FC<EditSkillButtonProps> = ({ skillId }) => {

    const editUrl = `/edit-skill/${skillId}`

    return (
        <div>
            <Link
                id="edit-skill-button"
                to={editUrl}
                className="inline-block font-nunito p-1 pr-3 pl-3 text-sm rounded-md focus:outline-none bg-gradient-to-r from-primary-start to-primary-end text-white hover:animate-light-up"
            >
                Edit Skill
            </Link>
        </div>
    )
}


export default EditSkillButton;