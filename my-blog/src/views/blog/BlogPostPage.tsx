import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BlogPostConnector from '../../connectors/BlogPostConnector';
import { PostData } from '../../models/PostData';
import Copyright from '../components/Copyright';
import DeletePostButton from '../components/buttons/DeletePostButton';
import EditButton from '../components/buttons/EditButton';
import Navbar from '../components/navigation_bar/NavBar';
import GETAndRenderBlogPost from './GETAndRenderBlogPost';

const BlogPostPage: React.FC = () => {

  const fakeBlogPost: PostData =
  {
      id: 1,
      post_id: "mikey-1",
      title: "updated title",
      body: "Some Content"
  }


  const { id } = useParams<{ id: string }>();
  const postId = id ?? 'default-post-id'; // Replace 'default-post-id' with an appropriate default value or handle it accordingly

  const [post, setPost] = useState<PostData>(fakeBlogPost); // Allow null as an initial state
  const [errorMessage, setErrorMessage] = useState<string | null>(null);


  // Example useEffect to fetch post data (replace with your actual data fetching logic)
  useEffect(() => {

    const fetchPostData = async () => {
      // Simulating an API call to fetch post data
      const { data, error } = await BlogPostConnector.getViaPostId(postId);

      if (error) {
        setErrorMessage(error);
      } else if (data) {
        setPost(data);
      }
    }

    fetchPostData();
  }, []);

  // const [post, setPost] = useState<PostData>(fakeBlogPost);

  return (
    <div className="font-nunito min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-celadon-600 text-raisin-black py-4">
        <Navbar />
      </header>

      <main className="container mx-auto p-4 flex-grow max-w-4xl px-8">
        <div className="flex flex-col space-y-4">
          <GETAndRenderBlogPost />
          {post && ( // Render buttons only if post is not null
            <div className="flex space-x-4">
              <DeletePostButton post={post} setPost={setPost} />
              <EditButton />
            </div>
          )}
        </div>
      </main>

      <footer>
        <Copyright />
      </footer>
    </div>
  );
};

export default BlogPostPage;
