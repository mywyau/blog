import { pipe } from 'fp-ts/lib/function';
import { getOrElse, none, Option, some } from 'fp-ts/lib/Option';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import WorkLogConnector from '../../../connectors/WorkLogConnector';
import { WorkLogData } from '../../../models/WorkLogData';

const EditWorklogForm: React.FC = () => {

    const [sqlId, setSqlId] = useState(0);
    const [sqlWorklogId, setSqlWorklogId] = useState('');
    const [workTitle, setWorkTitle] = useState('');
    const [content, setContent] = useState('');
    const [createdAtTime, setCreatedAtTime] = useState<Option<Date>>(none);
    const [updatedAtTime, setUpdatedAtTime] = useState<Option<Date>>(none);

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const maxWork_titleLength = 100;
    const maxContentLength = 400;

    const { worklog_id } = useParams<{ worklog_id: string }>();
    console.log(`${worklog_id}`)
    const worklog_idIdDefaulted = worklog_id ?? 'default-Worklog-id';

    useEffect(() => {

        const fetchWorklog = async () => {
            setIsLoading(true);
            setErrorMessage(null);

            const { data, error } = await WorkLogConnector.getViaWorklogId(worklog_idIdDefaulted);

            if (error) {
                setErrorMessage(error);
            } else if (data) {
                // Preset the form fields with the fetched Worklog data
                setSqlId(data.id);
                setSqlWorklogId(data.worklog_id);
                setWorkTitle(data.work_title);
                setContent(data.body);
                setContent(data.body);
                setCreatedAtTime(some(data.created_at));
                setUpdatedAtTime(some(data.updated_at));
            }

            setIsLoading(false);
        };

        fetchWorklog(); // Call the async function when the component mounts
    }, [sqlWorklogId]);

    const editWorklog = async () => {

        const handledCreatedAt =
            pipe(
                createdAtTime,
                getOrElse(
                    () => new Date()
                )
            )

        try {
            const updatedWorklog: WorkLogData = {
                id: sqlId, // Use the current WorklogId
                worklog_id: sqlWorklogId, // Use the updated Worklog_id from state
                work_title: workTitle,
                body: content, // Use the updated content from state,
                created_at: handledCreatedAt,
                updated_at: new Date()
            };

            const { data, error } = await WorkLogConnector.updateWorklogById(sqlWorklogId, updatedWorklog);
            if (error) {
                setErrorMessage(error);
                alert(`[EditWorklogForm][editWorklog] Failed to update the blog Worklog. Please try again. ${API_BASE_URL}/blog/worklog/update`);
            } else {
                console.log('Worklog edited successfully:', data);
            }
        } catch (error) {
            console.error('Error when editing Worklog:', error);
            alert(`[EditWorklogForm][editWorklog] Failed to update the blog Worklog. Please try again. ${API_BASE_URL}/blog/worklog/update`);
        } finally {
            setIsLoading(false);
        }
    };

    const semWiningwork_titleChars = maxWork_titleLength - workTitle.length;
    const remainingContentChars = maxContentLength - content.length;

    return (
        <div className="p-4">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    editWorklog();
                }}
            >
                <div className="mb-4">
                    <label className="block mb-2">
                        Worklog Name:
                        <input
                            type="text"
                            value={workTitle}
                            onChange={(e) => setWorkTitle(e.target.value)}
                            className="w-full border border-gray-300 rounded p-2"
                            maxLength={maxWork_titleLength}
                            disabled={isLoading}
                        />
                    </label>
                    <p className="text-gray-600 text-sm">
                        {semWiningwork_titleChars} characters remaining
                    </p>
                </div>
                <div className="mt-4 mb-4">
                    <label className="block mb-2">
                        Content:
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full h-64 border border-gray-300 rounded p-2"
                            maxLength={maxContentLength}
                            disabled={isLoading}
                        />
                    </label>
                    <p className="text-gray-600 text-sm">
                        {remainingContentChars} characters remaining
                    </p>
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-true-blue text-white hover:bg-cambridge-blue px-4 py-2 rounded"
                >
                    {isLoading ? 'Updating...' : 'Update Worklog'}
                </button>
            </form>
            {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
        </div>
    );
};

export default EditWorklogForm;
