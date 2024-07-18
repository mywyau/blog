// src/components/Title.tsx
import React from 'react';
import { messages } from '../../../messages/blog_page_messages';

const Title: React.FC = () => {
  return (
    <div className="font-nunito flex justify-center items-center h-64 bg-white">
      <h1 className="text-black text-6xl font-extrabold">
        {messages.LandingPage.title}
      </h1>
    </div>
  );
};

export default Title;
