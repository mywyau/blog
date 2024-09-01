import { none, Option, some } from 'fp-ts/Option';
import { useState } from 'react';
import SkillsConnector from '../connectors/SkillsConnector';
import { DeleteResponseBody } from '../models/DeleteResponseBody';


interface OnDeleteReturn {
    handleDelete: () => Promise<void>;
    loadingState: Option<boolean>;
    deleteErrorMessage: Option<string>;
    deleteResponseBody: Option<DeleteResponseBody>;
}

const UseDeleteSkill = (skill_id: string): OnDeleteReturn => {

    const [deleteResponseBody, setDeleteResponseBody] = useState<Option<DeleteResponseBody>>(none);
    const [deleteErrorMessage, setDeleteErrorMessage] = useState<Option<string>>(none);
    const [loadingState, setLoadingState] = useState<Option<boolean>>(some(false));

    const handleDelete = async () => {
        const confirmDelete = window.confirm(`Are you sure you want to delete this skill? ${skill_id}`);
        if (!confirmDelete) return;

        setLoadingState(some(true));
        setDeleteErrorMessage(none);

        const { data, error } = await SkillsConnector.deleteSkill(skill_id);

        if (error) {
            setDeleteErrorMessage(some(error));
            setLoadingState(some(false));
        } else if (data) {
            setDeleteResponseBody(some(data));
            setLoadingState(some(false));
        }
    };

    return { handleDelete, loadingState, deleteErrorMessage, deleteResponseBody };
};

export default UseDeleteSkill;
