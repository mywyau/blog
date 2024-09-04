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
import YearFilter from '../components/worklog/YearFilter';
import YearSearchBar from '../components/worklog/YearSearchBar';
import NavbarPages from '../../models/ADTs/NavbarPages';
import Spacer from '../components/Spacer';

interface WorkLogPageProps {
  worklogs: WorkLogData[];
  errorMessage: string;
}

const ShowWorkLogPage: React.FC<WorkLogPageProps> = ({ worklogs, errorMessage }) => {

  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [searchYear, setSearchYear] = useState<number | null>(null);

  // Filter worklogs based on the selected year - Year Tabs
  // const filteredWorklogs = worklogs.filter(worklog => {
  //   const worklogYear = new Date(worklog.created_at).getFullYear();
  //   return worklogYear === selectedYear;
  // });

  // Extract unique years from worklogs for the filter
  const years = Array.from(new Set(worklogs.map(worklog => new Date(worklog.created_at).getFullYear())));


  const [currentPage, setCurrentPage] = useState(1);

  const worklogPerPage = 2;
  const indexOfLastTask = currentPage * worklogPerPage;
  const indexOfFirstTask = indexOfLastTask - worklogPerPage;


  // Filter worklogs based on the searched year - Search Bar
  const filteredWorklogs = searchYear
    ? worklogs.filter(worklog => new Date(worklog.created_at).getFullYear() === searchYear)
    : worklogs;


  const currentTasks = filteredWorklogs.slice(indexOfFirstTask, indexOfLastTask);

  return (
    <div className="flex flex-col min-h-screen font-nunito bg-gray-100">
      <Navbar page={NavbarPages.Worklog} />
      <Spacer size={"p-20"} />
      {/* <H1 id={"worklog"} message={messages.about.title} className={""} /> */}
      <div className="flex flex-col flex-grow container mx-auto">

        {/* Year Filter Component
        <YearFilter years={years} selectedYear={selectedYear} onYearSelect={setSelectedYear} /> */}


        {/* Year Search Bar */}
        <YearSearchBar onYearSearch={setSearchYear} />


        <div className="sm:p-2">
          <WorkLogPagination
            worklogPerPage={worklogPerPage}
            totalWorklogs={filteredWorklogs.length}
            paginate={(pageNumber) => setCurrentPage(pageNumber)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 h-full w-full gap-4 mt-4"> {/* Ensure equal height p-2 sm:p-3 h-full flex */}
          {currentTasks.map(worklog =>
            <WorkLogGrid workLogData={worklog} />
          )}
        </div>

        <div className="flex justify-start pb-10">
          <div className="sm:p-4">
            <WorkLogPagination
              worklogPerPage={worklogPerPage}
              totalWorklogs={filteredWorklogs.length}
              paginate={(pageNumber) => setCurrentPage(pageNumber)}
            />
          </div>
        </div>

        <div className="flex justify-start pb-20">
          <Link
            id="add-new-work"
            to="/worklog/add/new/worklog"
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
