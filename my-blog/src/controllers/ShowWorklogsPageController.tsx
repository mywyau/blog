import React from 'react';
import GetAllWorkLogs from '../hooks/GetAllWorklogs';
import ShowWorkLogPage from '../views/pages/ShowWorkLogPage';

const ShowWorklogsPageController: React.FC = () => {

    const { workLogs, getAllWorklogErrorMessage } = GetAllWorkLogs();

    return (
        <ShowWorkLogPage worklogs={workLogs} errorMessage={getAllWorklogErrorMessage ?? ''} />
    );
};

export default ShowWorklogsPageController;
