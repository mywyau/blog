import { useEffect, useState } from 'react';
import SkillsConnector from '../connectors/SkillsConnector';
import { SkillData } from '../models/SkillData';

const GetAllSkills = () => {

    const [skills, setSkills] = useState<SkillData[]>([]);
    const [getAllSkillErrorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(
        () => {
            const fetchPost = async () => {
                setErrorMessage(null);
                setSkills([]);

                const { data, error } = await SkillsConnector.getAllSkills();

                if (error) {
                    setErrorMessage(error);
                } else if (data) {
                    if (data.length === 0) {
                        setErrorMessage(`[GetAllSkills][getAllSKills] No skills data retrieved, database likely empty`);
                    } else {
                        setSkills(data);
                        console.log('[GetAllSkills][getAllSKills] Data retrieved:', data);
                    }
                }

                setLoading(false);
            };

            fetchPost();
        },
        []
    );


    return { skills, getAllSkillErrorMessage };
};

export default GetAllSkills;
