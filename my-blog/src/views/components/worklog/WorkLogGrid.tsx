// src/components/BlogList.tsx
import React from 'react';
import { WorkLogData } from '../../../models/WorkLogData';
import WorkLogCard from './WorkLogCard';


interface WorkLogListProps {
  workLogData: WorkLogData;
}

const WorkLogGrid: React.FC<WorkLogListProps> = ({ workLogData }) => {

  return (
    <div className="h-full flex">
      {
        <WorkLogCard key={workLogData.id} worklog_id={workLogData.worklog_id} taskTitle={workLogData.work_title} description={workLogData.body} />
      }
    </div>
  );
};

export default WorkLogGrid;
