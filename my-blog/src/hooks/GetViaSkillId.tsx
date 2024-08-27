import { none, Option, some } from 'fp-ts/Option';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SkillsConnector from '../connectors/SkillsConnector';
import { SkillData } from '../models/SkillData';


const GetViaSkillId = () => {

    const { id } = useParams<{ id: string }>();
    const skill_id = id ?? 'default-skill-id';

    const [sqlSkillData, setSqlSkillData] = useState<Option<SkillData>>(none)

    const [getAllSkillErrorMessage, setErrorMessage] = useState<Option<string>>(none)

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    useEffect(
        () => {
            const fetchSkill = async () => {

                setSqlSkillData(none);

                const { data, error } = await SkillsConnector.getViaSkillId(skill_id);

                if (error) {
                    setErrorMessage(some(error));
                } else if (data) {

                    setSqlSkillData(some(data));
                    console.log('[GetAllSkills][getAllSKills] Data retrieved:', data);
                } else {
                    return none;
                }
            }
            fetchSkill();
        },
        []
    )



    return { sqlSkillData, getAllSkillErrorMessage };
};

export default GetViaSkillId;
