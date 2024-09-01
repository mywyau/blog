import { useEffect, useState } from 'react';
import WorkLogConnector from '../connectors/WorkLogConnector';
import { WorkLogData } from '../models/WorkLogData';
;

const GetAllWorkLogs = () => {

    const [workLogs, setWorkLogs] = useState<WorkLogData[]>([]);
    const [getAllWorklogErrorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(
        () => {
            const fetchPost = async () => {
                setErrorMessage(null);
                setWorkLogs([]);

                const { data, error } = await WorkLogConnector.getAllWorklogs();

                if (error) {
                    setErrorMessage(error);
                } else if (data) {
                    if (data.length === 0) {
                        setErrorMessage(`[GetAllWorkLogs][getAllWorkLogs] No WorkLogs data retrieved, database likely empty`);
                    } else {
                        setWorkLogs(data);
                        console.log('[GetAllWorkLogs][getAllWorkLogs] Data retrieved:', data);
                    }
                }

                setLoading(false);
            };

            fetchPost();
        },
        []
    );


    return { workLogs, getAllWorklogErrorMessage };
};

export default GetAllWorkLogs;
