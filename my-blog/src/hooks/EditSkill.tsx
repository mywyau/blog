import { none, Option, some } from 'fp-ts/Option';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import SkillsConnector from '../connectors/SkillsConnector';
import { SkillData } from '../models/SkillData';

const EditSkill = () => {

    const { id } = useParams<{ id: string }>();
    const skill_id = id ?? 'default-skill-id';

    // const [skill, setSkill] = useState<Option<SkillData>>(none)
    const [loading, setLoading] = useState<boolean>(false);

    const [sqlId, setSqlId] = useState(0);
    const [sqlSkillId, setSqlPostId] = useState('');
    const [skillName, setSkillName] = useState('');
    const [content, setContent] = useState('');

    // const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<Option<string>>(none)

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    // const maxTitleLength = 100;
    // const maxPostIdLength = 50;
    // const maxContentLength = 400;

    // useEffect(
    //     () => {
    //         const fetchPost = async () => {

    //             setSkill(none);
    //             setErrorMessage(none);

    //             const { data, error } = await SkillsConnector.getViaSkillId(skill_id);

    //             setLoading(false);

    //             if (error) {
    //                 setErrorMessage(some(error));
    //             } else if (data) {
    //                 setSkill(some(data));
    //             }
    //         };

    //         fetchPost();
    //     },
    //     []
    // );

    const getSkillToEdit = async (): Promise<Option<SkillData>> => {
        try {
            const { data, error } = await SkillsConnector.getViaSkillId(skill_id);
            if (error) {
                console.error(`Error: ${error}`);
                return none; // Return null or handle the error as needed
            } else if (data) {
                return (
                    some(
                        {
                            id: data.id,
                            skill_id: data.skill_id,
                            skill_name: data.skill_name,
                            body: data.body,
                        }
                    )
                );
            } else {
                return none; // Handle the case where data is undefined or null
            }
        } catch (err) {
            console.error('Unexpected error:', err);
            return none; // Handle unexpected errors
        }
    };



    const editSkillFunction =

        async () => {

            if (skillName.trim() === '' || content.trim() === '') {
                alert('Title and content cannot be empty');
                return;
            }

            // setIsLoading(true);

            const updatedSkill:
                SkillData = {
                id: sqlId, // Use the current postId
                skill_id: sqlSkillId, // Use the updated post_id from state
                skill_name: skillName, // Use the updated title from state
                body: content // Use the updated content from state
            };

            const {data, error} = await SkillsConnector.updateSkillById(sqlSkillId, updatedSkill);
                if (error) {
                    setErrorMessage(some(error));
                    alert(`[EditSkill][editSkill] Failed to update the skill. Please try again. ${API_BASE_URL}/blog/skill/update`);
                } else {
                    console.log('Post edited successfully:', data);
                }
            // } catch (error) {
            //     console.error('Error when editing skill:', error);
            //     alert(`[EditSkill][editSkill] Failed to update the blog post. Please try again. ${API_BASE_URL}/blog/skill/update`);
            // } finally {
            //     setIsLoading(false);
            // }
            // putRequest
        };


    return { getSkillToEdit, editSkillFunction, errorMessage };
};

export default EditSkill;
