// src/components/BlogList.tsx
import React from 'react';
import WorkLogCard from './WorkLogCard';

interface Record {
  id: number;
  taskTitle: string;
  description: string;
}

interface WorkLogListProps {
  records: Record[];
}

const WorkLogGrid: React.FC<WorkLogListProps> = ({ records }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mt-4">
      {
        records.map(record => (
          <WorkLogCard id={record.id} taskTitle={record.taskTitle} description={record.description} />
        ))
      }
    </div>
  );
};

export default WorkLogGrid;
