import React from 'react';
import { Link } from 'react-router-dom';

interface EditWorklogButtonProps {
    worklogId: string;
}

const EditWorklogButton: React.FC<EditWorklogButtonProps> = ({ worklogId }) => {

    const editUrl = `/edit-worklog/${worklogId}`

    return (
        <div>
            <Link
                id="edit-worklog-button"
                to={editUrl}
                className="inline-block font-nunito p-1 pr-3 pl-3 text-sm rounded-md focus:outline-none bg-gradient-to-r from-info-start to-info-end text-white hover:animate-light-up"
            >
                Edit Task
            </Link>
        </div>
    )
}


export default EditWorklogButton;