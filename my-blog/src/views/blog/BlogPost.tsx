// src/pages/BlogPost.tsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { PostData } from '../../connectors/BlogPostConnector';
import Copyright from '../components/Copyright';
import DeleteButton from '../components/buttons/DeleteButton';
import GETPostButton from '../components/buttons/GETPostButton';
import Navbar from '../components/navigation_bar/NavBar';
import UpdateBlogPostButton from '../components/buttons/UpdateBlogPostButton copy';

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Sample data for demonstration
  const post = {
    title: `Post ${id}`,
    content: `This is the content of post ${id}.`
  };

  const [posts, setPosts] = useState<PostData[]>([]); // Initialize your posts here if needed

  return (
    <div className="font-nunito min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-celadon-600 text-raisin-black py-4">
        <Navbar />
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4 flex-grow">
        {/* {/* Post Title */}
        {/* // <h1 className="text-4xl font-bold mb-4">{post.title}</h1> */}

        {/* Post Content */}

        {/* <p className="text-gray-700 text-lg mb-6">{post.content}</p> */}

        {/* Button Container */}
        <div className="flex flex-col space-y-4">
          <GETPostButton />
          <UpdateBlogPostButton />
          <DeleteButton posts={posts} setPosts={setPosts} />
        </div>
      </main>

      {/* Footer */}
      <footer>
        <Copyright />
      </footer>
    </div>
  );
};

export default BlogPost;
