// src/pages/BlogPost.tsx
import React, { useState } from 'react';
import { PostData } from '../../connectors/BlogPostConnector';
import Copyright from '../components/Copyright';
import DeleteButton from '../components/buttons/DeleteButton';
import EditButton from '../components/buttons/EditButton';
import GETAndRenderBlogPost from '../components/buttons/GETAndRenderBlogPost';
import Navbar from '../components/navigation_bar/NavBar';
import { useParams } from 'react-router-dom';


const BlogPost: React.FC = () => {

  const [posts, setPosts] = useState<PostData[]>([]); // Initialize your posts here if needed

  const { post_id } = useParams<{ post_id: string }>();

  const postId = post_id ?? 'default-post-id'; // Replace 'default-post-id' with an appropriate default value or handle it accordingly

  return (
    <div className="font-nunito min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-celadon-600 text-raisin-black py-4">
        <Navbar />
      </header>

      <main className="container mx-auto p-4 flex-grow">
        <div className="flex flex-col space-y-4">
          <GETAndRenderBlogPost />
          {/* Place the buttons in the same div and use flexbox to align them side by side */}
          <div className="flex space-x-4">
            
            <DeleteButton posts={posts} setPosts={setPosts} />
            <EditButton />
          </div>
        </div>
      </main>

      <footer>
        <Copyright />
      </footer>
    </div>
  );
};

export default BlogPost;
