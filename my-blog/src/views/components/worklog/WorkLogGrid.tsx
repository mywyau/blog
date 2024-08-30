// src/components/BlogList.tsx
import React from 'react';
import { WorkLogData } from '../../../models/WorkLogData';
import WorkLogCard from './WorkLogCard';


interface WorkLogListProps {
  workLogData: WorkLogData;
}

const WorkLogGrid: React.FC<WorkLogListProps> = ({ workLogData }) => {

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mt-4">
      {
        <WorkLogCard worklog_id={workLogData.worklog_id} taskTitle={workLogData.work_title} description={workLogData.body} />
      }
    </div>
  );
};

export default WorkLogGrid;
