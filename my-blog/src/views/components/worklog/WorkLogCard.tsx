// src/components/WorklogsCard.tsx
import React from 'react';
import TextCountHelper from '../../../helpers/TextCountHelper';
import DeleteWorklog from '../../../hooks/DeleteWorklog';
import DeleteWorklogButton from '../buttons/DeleteWorklogButton';
import EditWorklogButton from '../buttons/EditWorklogButton';
// import { messages } from '../../messages/Worklogs';

interface WorkLogCardProps {
    worklog_id: string;
    taskTitle: string;
    description: string;
}

const WorkLogCard: React.FC<WorkLogCardProps> = ({ worklog_id, taskTitle, description }) => {


    const { handleDelete, loadingState, deleteErrorMessage, deleteResponseBody } = DeleteWorklog(worklog_id);


    return (
        <div className="w-full pt-6 pb-6 md:w-auto">
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 h-full">
                <div className="text-xl bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
                    <h2>{taskTitle}</h2>
                    <p className='text-sm text-orange-400 mb-4 pt-4'>Word Count: {TextCountHelper.countWords(description)}</p>
                    <p className="text-base text-gray-700 mb-4">{description}</p>
                </div>
                <div className="flex space-x-4"> {/* Flex container for buttons */}
                    <EditWorklogButton worklogId={worklog_id} />
                    <DeleteWorklogButton handleDelete={handleDelete} loading={loadingState} errorMessage={deleteErrorMessage} deleteResponseBody={deleteResponseBody} />
                </div>
            </div>
        </div>
    );
};

export default WorkLogCard;
