import { fold as optionFold } from 'fp-ts/lib/Option';
import { Option, none, some } from 'fp-ts/Option';
import React, { useEffect, useState } from 'react';
import RoleProtected from '../../../contexts/RoleProtected';
import UseDeleteSkill from '../../../hooks/UseDeleteSkill';
import UserTypes from '../../../models/ADTs/UserType';
import DeleteSkillButton from '../buttons/DeleteSkillButton';
import EditSkillButton from '../buttons/EditSkillButton';

interface SkillsCardProps {
    id: number;
    skill_id: string;
    skill: string;
    description: string;
}

const SkillsCard: React.FC<SkillsCardProps> = ({ id, skill_id, skill, description }) => {
    const { handleDelete, loadingState, deleteErrorMessage, deleteResponseBody } = UseDeleteSkill(skill_id);
    const [userBasedContent, setUserBasedContent] = useState<Option<JSX.Element>>(none); // State to track user role

    // Fetch user role when component mounts
    useEffect(() => {
        const fetchUserRole = async () => {
            try {

                setUserBasedContent(some(
                    <div className="flex space-x-4">
                        <RoleProtected roles={[UserTypes.Admin]}>
                            <EditSkillButton skillId={skill_id} />
                            <DeleteSkillButton
                                handleDelete={handleDelete}
                                loading={loadingState}
                                errorMessage={deleteErrorMessage}
                                deleteResponseBody={deleteResponseBody}
                            />
                        </RoleProtected>
                    </div>
                ));
            } catch (error) {
                console.error('Error fetching user role:', error);
                setUserBasedContent(none);
            }
        };

        fetchUserRole(); // Fetch and set the content based on the user role
    }, [skill_id, handleDelete, loadingState, deleteErrorMessage, deleteResponseBody]);

    return (
        <div className="flex flex-col flex-none w-full pt-2 pb-2 md:w-auto">
            <div className="rounded-lg p-6 md:p-8 h-full">
                <div className="text-xl text-blue-600">
                    <h2 className="pb-4">{skill}</h2>
                    <p className="text-base text-gray-800 mb-4">{description}</p>
                </div>
                {/* Render User Role Content */}
                {optionFold<JSX.Element, JSX.Element>(
                    () => <></>, // Render nothing if the user is not an admin
                    (content) => content // Render content if the user is an admin
                )(userBasedContent)}
            </div>
        </div>
    );
};

export default SkillsCard;
