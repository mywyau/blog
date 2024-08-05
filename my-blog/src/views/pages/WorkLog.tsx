// src/pages/About.tsx
import React, { useState } from 'react';
import { messages } from '../../messages/worklog';
import Copyright from '../components/Copyright';
import Navbar from '../components/NavBar';
import WorkLogGrid from '../components/WorkLogGrid';
import WorkLogPagination from '../components/WorkLogPagination';


const WorkLog: React.FC = () => {

  // Sample data for demonstration
  const records = [
    { id: 1, taskTitle: 'Post 1', description: messages.lorem.p1 },
    { id: 2, taskTitle: 'Post 2', description: messages.lorem.p1 },
    { id: 3, taskTitle: 'Post 3', description: messages.lorem.p1 },
    { id: 4, taskTitle: 'Post 4', description: messages.lorem.p1 },
    { id: 5, taskTitle: 'Post 5', description: messages.lorem.p1 },
    { id: 6, taskTitle: 'Post 6', description: messages.lorem.p1 },
    { id: 7, taskTitle: 'Post 7', description: messages.lorem.p1 },
    { id: 8, taskTitle: 'Post 8', description: messages.lorem.p1 },
    { id: 9, taskTitle: 'Post 9', description: messages.lorem.p1 },
    { id: 10, taskTitle: 'Post 10', description: messages.lorem.p1 },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 2;

  const indexOfLastRecords = currentPage * recordsPerPage;
  const indexOfFirstRecords = indexOfLastRecords - recordsPerPage;
  const currentRecords = records.slice(indexOfFirstRecords, indexOfLastRecords);

  return (
    <div className="flex flex-col min-h-screen font-nunito bg-gray-100">
      <Navbar />
      <div className="flex-grow container mx-auto p-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent pt-6">{messages.about.title}</h1>
      </div>
      <div className="flex-grow container mx-auto pb-10">
            <WorkLogGrid records={currentRecords} />
            <WorkLogPagination
              recordsPerPage={recordsPerPage}
              totalrecords={records.length}
              paginate={(pageNumber) => setCurrentPage(pageNumber)}
            />
      </div>
      <Copyright />
    </div>
  );
};

export default WorkLog;
