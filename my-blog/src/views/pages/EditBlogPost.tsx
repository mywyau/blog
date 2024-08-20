// src/pages/About.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PostData } from '../../models/PostData';
import Copyright from '../components/Copyright';
import EditPostForm from '../components/EditPostForm';
import Navbar from '../components/navigation_bar/NavBar';
import BlogPostConnector from '../../connectors/BlogPostConnector';

const EditBlogPost: React.FC = () => {

  return (
    <div className="flex flex-col min-h-screen font-nunito bg-gray-100">
      <Navbar />
      <div className="flex-grow container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-4">Edit a blog post</h1>
        <EditPostForm/>
      </div>
      <Copyright />
    </div>
  );
};

export default EditBlogPost;
