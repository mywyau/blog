import React from 'react';
import RoleProtected from '../../../contexts/RoleProtected';
import TextCountHelper from '../../../helpers/TextCountHelper';
import DeleteWorklog from '../../../hooks/DeleteWorklog';
import UserTypes from '../../../models/ADTs/UserType';
import { WorkLogData } from '../../../models/WorkLogData';
import DeleteWorklogButton from '../buttons/DeleteWorklogButton';
import EditWorklogButton from '../buttons/EditWorklogButton';

interface WorkLogCardProps {
    worklogData: WorkLogData;
}

// Date formatting function
const formatDate = (date: Date | string) => {
    const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    };

    const dateObj = typeof date === 'string' ? new Date(date) : date;

    return new Intl.DateTimeFormat('en-GB', options).format(dateObj);
};

const WorkLogCard: React.FC<WorkLogCardProps> = ({ worklogData }) => {
    const { handleDelete, loadingState, deleteErrorMessage, deleteResponseBody } = DeleteWorklog(worklogData.worklog_id);

    return (
        <div className="h-full w-full pt-6 pb-6 md:w-auto">
            <div className="bg-stone-100/75 rounded-lg shadow-lg p-6 md:p-8 h-full">
                <div className="">
                    <h2 className="text-2xl text-black pt-2">{worklogData.work_title}</h2>
                    <div className="flex justify-between items-center pt-4 pb-5">
                        <p className="text-sm text-blue-500 mb-4 pt-4 text-left">{`Date created: ${formatDate(worklogData.created_at)}`}</p>
                        <p className="text-sm text-pink-500 mb-4 pt-4 text-right">{`Word Count: ${TextCountHelper.countWords(worklogData.body)}`}</p>
                    </div>
                    <p className="text-base text-gray-700 mb-4">{worklogData.body}</p>
                </div>
                <RoleProtected roles={[UserTypes.Admin]}>
                    <div className="flex space-x-4 pt-4"> {/* Flex container for buttons */}
                        <EditWorklogButton worklogId={worklogData.worklog_id} />
                        <DeleteWorklogButton handleDelete={handleDelete} loading={loadingState} errorMessage={deleteErrorMessage} deleteResponseBody={deleteResponseBody} />
                    </div>
                </RoleProtected >
            </div>
        </div>
    );
};

export default WorkLogCard;
