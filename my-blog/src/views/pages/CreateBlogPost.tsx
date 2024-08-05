// src/pages/About.tsx
import React from 'react';
import Copyright from '../components/Copyright';
import Navbar from '../components/NavBar';
import PostCreator from '../components/PostCreator';

const CreateBlogPost: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen font-nunito bg-gray-100">
      <Navbar />
      <div className="flex-grow container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-4">Create a new blog post</h1>
        <PostCreator />
      </div>
      <Copyright />
    </div>
  );
};

export default CreateBlogPost;
