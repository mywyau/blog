import React from 'react';
import { WorkLogData } from '../../../models/WorkLogData';
import WorkLogCard from './WorkLogCard';

interface WorkLogListProps {
  workLogData: WorkLogData;
}

const WorkLogGrid: React.FC<WorkLogListProps> = ({ workLogData }) => {
  return (
    <div className="h-full w-full">
      <WorkLogCard 
        key={workLogData.id} 
        worklogData={workLogData} 
        // className="h-full w-full" // Ensure the card itself also fills the grid space
      />
    </div>
  );
};

export default WorkLogGrid;
