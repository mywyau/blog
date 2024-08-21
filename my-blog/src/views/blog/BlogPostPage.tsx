import { Option } from 'fp-ts/Option';
import React from 'react';
import { PostData } from '../../models/PostData';
import Copyright from '../components/Copyright';
import DeletePostButton from '../components/buttons/DeletePostButton';
import EditButton from '../components/buttons/EditButton';
import Navbar from '../components/navigation_bar/NavBar';
import RenderBlogPost from './RenderBlogPost';

interface BlogPostPageProps {
  post: Option<PostData>;
  loading: Option<boolean>;
  errorMessage: Option<string>;
}

const BlogPostPage: React.FC<BlogPostPageProps> = ({ post, loading, errorMessage }) => {


  return (
    <div className="font-nunito min-h-screen bg-gray-100 flex flex-col">

      <header className="bg-celadon-600 text-raisin-black py-4">
        <Navbar />
      </header>

      <main className="container mx-auto p-4 flex-grow max-w-4xl px-8">
        <div className="flex flex-col space-y-4">

          <RenderBlogPost post={post} loading={loading} errorMessage={errorMessage} />
          <div className="flex space-x-4">
            <DeletePostButton />
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
