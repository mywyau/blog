// src/pages/About.tsx
import React from 'react';
import Copyright from '../components/Copyright';
import Navbar from '../components/navigation_bar/NavBar';
import PostCreator from '../components/PostCreator';
import EditPostForm from '../components/EditPostForm';

const EditBlogPost: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen font-nunito bg-gray-100">
      <Navbar />
      <div className="flex-grow container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-4">Edit a blog post</h1>
        <EditPostForm />
      </div>
      <Copyright />
    </div>
  );
};

export default EditBlogPost;
