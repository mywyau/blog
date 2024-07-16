// src/components/Title.tsx
import React from 'react';
import { messages } from '../../../messages/messages';

const Title: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-64 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300">
      <h1 className="text-6xl font-extrabold text-gray-800 shadow-md">
        {messages.blogPage.title}
      </h1>
    </div>
  );
};

export default Title;
