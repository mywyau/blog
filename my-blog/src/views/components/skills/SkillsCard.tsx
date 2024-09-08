// src/components/SkillsCard.tsx
import { Either, fold } from 'fp-ts/lib/Either';
import { fold as optionFold } from 'fp-ts/lib/Option';
import { Option, none, some } from 'fp-ts/Option';

import React, { useEffect, useState } from 'react';
import UseDeleteSkill from '../../../hooks/UseDeleteSkill';
import UserTypes from '../../../models/ADTs/UserType';
import UserTypeErrors from '../../../models/ADTs/UserTypeErrors';
import AuthService from '../../../service/AuthService';
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
        const renderContent = async () => {
            const result: Either<UserTypeErrors, UserTypes> = await AuthService.getRole();

            fold<UserTypeErrors, UserTypes, void>(
                (error) => {
                    switch (error) {
                        case UserTypeErrors.UnknownUserType:
                            setUserBasedContent(none); // No content for unknown user type
                            break;
                        default:
                            setUserBasedContent(none); // No content for other errors
                            break;
                    }
                },
                (userType) => {
                    switch (userType) {
                        case UserTypes.Admin:
                            setUserBasedContent(some(
                                <div className="flex space-x-4"> {/* Flex container for buttons */}
                                    <EditSkillButton skillId={skill_id} />
                                    <DeleteSkillButton
                                        handleDelete={handleDelete}
                                        loading={loadingState}
                                        errorMessage={deleteErrorMessage}
                                        deleteResponseBody={deleteResponseBody}
                                    />
                                </div>
                            ));
                            break;
                        case UserTypes.Viewer:
                            setUserBasedContent(none);
                            break;
                        default:
                            setUserBasedContent(none); // No content for other cases
                            break;
                    }
                }
            )(result);
        };

        renderContent(); // Invoke the function to fetch and set the content based on the user role
    }, []); // Empty dependency array to run only on mount

    return (
        <div className="flex flex-col flex-none w-full pt-2 pb-2 md:w-auto">
            <div className="bg-white rounded-lg p-6 md:p-8 h-full">
                <div className="text-xl bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
                    <h2 className='pb-4'>{skill}</h2>
                    <p className="text-base text-gray-700 mb-4">{description}</p>
                </div>
                {/* Render User Role Content */}
                {
                    optionFold<JSX.Element, JSX.Element>(
                        () => <></>, // Render nothing for the None case
                        (content) => content // Render content for the Some case
                    )(userBasedContent)
                }
            </div>
        </div>
    );
};

export default SkillsCard;
