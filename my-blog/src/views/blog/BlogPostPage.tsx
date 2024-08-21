import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { PostData } from '../../models/PostData';
import Copyright from '../components/Copyright';
import DeleteButton from '../components/buttons/DeleteAllButton';
import EditButton from '../components/buttons/EditButton';
import GETAndRenderBlogPost from './GETAndRenderBlogPost';
import Navbar from '../components/navigation_bar/NavBar';

const BlogPostPage: React.FC = () => {

  const [posts, setPosts] = useState<PostData[]>([]);

  return (
    <div className="font-nunito min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-celadon-600 text-raisin-black py-4">
        <Navbar />
      </header>

      <main className="container mx-auto p-4 flex-grow max-w-4xl px-8">
        <div className="flex flex-col space-y-4">
          <GETAndRenderBlogPost />
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

export default BlogPostPage;
