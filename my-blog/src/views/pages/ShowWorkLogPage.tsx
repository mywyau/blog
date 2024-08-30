// src/pages/About.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { messages } from '../../messages/worklog';
import { WorkLogData } from '../../models/WorkLogData';
import Copyright from '../components/Copyright';
import H1 from '../components/general/H1';
import Navbar from '../components/navigation_bar/NavBar';
import WorkLogGrid from '../components/worklog/WorkLogGrid';
import WorkLogPagination from '../components/worklog/WorkLogPagination';

interface WorkLogPageProps {
  worklogs: WorkLogData[];
  errorMessage: string;
}

const ShowWorkLogPage: React.FC<WorkLogPageProps> = ({ worklogs, errorMessage }) => {

  const [currentPage, setCurrentPage] = useState(1);

  const worklogPerPage = 2;
  const indexOfLastTask = currentPage * worklogPerPage;
  const indexOfFirstTask = indexOfLastTask - worklogPerPage;

  const currentTasks = worklogs.slice(indexOfFirstTask, indexOfLastTask);

  return (
    <div className="flex flex-col min-h-screen font-nunito bg-gray-100">
      <Navbar />
      <H1 id={"worklog"} message={messages.about.title} className={""} />
      <div className="flex flex-col flex-grow container mx-auto">

        {currentTasks.map(worklog =>
          <div key={worklog.id} className="p-2 sm:p-3 h-full flex"> {/* Ensure equal height */}
            <WorkLogGrid workLogData={worklog} />
          </div>
        )}

        <div className="flex justify-start pb-10">
          <div className="p-2 sm:p-4">
            <WorkLogPagination
              worklogPerPage={worklogPerPage}
              totalWorklogs={worklogs.length}
              paginate={(pageNumber) => setCurrentPage(pageNumber)}
            />
          </div>
        </div>

        <div className="flex justify-start pb-20">
          <Link
            id="add-new-work"
            to="/worklog/add/new/work"
            className="inline-block font-nunito p-2 pr-6 pl-6 rounded-md focus:outline-none bg-green-600 text-white hover:bg-green-700 justify-center"
          >
            Add New Piece of Work
          </Link>
        </div>
      </div>
      <Copyright />
    </div>
  );
};

export default ShowWorkLogPage;
