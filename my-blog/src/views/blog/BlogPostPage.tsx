import { none, Option, some } from 'fp-ts/Option';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import BlogPostConnector from '../../connectors/BlogPostConnector';
import { DeleteResponseBody } from '../../models/DeleteResponseBody';
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

interface OnDeleteReturn {
  handleDelete: () => Promise<void>;
  loadingState: Option<boolean>;
  deleteErrorMessage: Option<string>;
  deleteResponseBody: Option<DeleteResponseBody>;
}


const useDeleteBlogPost = (): OnDeleteReturn => {

  const { id } = useParams<{ id: string }>();
  const postId = id ?? 'default-post-id';

  const [deleteResponseBody, setDeleteResponseBody] = useState<Option<DeleteResponseBody>>(none);
  const [deleteErrorMessage, setDeleteErrorMessage] = useState<Option<string>>(none);
  const [loadingState, setLoadingState] = useState<Option<boolean>>(some(false));

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this blog post?");
    if (!confirmDelete) return;

    setLoadingState(some(true));
    setDeleteErrorMessage(none);

    const { data, error } = await BlogPostConnector.deleteBlogPost(postId);

    if (error) {
      setDeleteErrorMessage(some(error));
      setLoadingState(some(false));
    } else if (data) {
      setDeleteResponseBody(some(data));
      setLoadingState(some(false));
    }
  };

  return { handleDelete, loadingState, deleteErrorMessage, deleteResponseBody };
};

const BlogPostPage: React.FC<BlogPostPageProps> = ({ post, loading, errorMessage }) => {

  const { handleDelete, loadingState, deleteErrorMessage, deleteResponseBody } = useDeleteBlogPost();

  return (
    <div className="font-nunito min-h-screen bg-gray-100 flex flex-col">

      <header className="bg-celadon-600 text-raisin-black py-4">
        <Navbar />
      </header>

      <main className="container mx-auto p-4 flex-grow max-w-4xl px-8">
        <div className="flex flex-col space-y-4">
          <EditButton />
          <RenderBlogPost post={post} loading={loading} errorMessage={errorMessage} />
          <div className="flex space-x-4">
            <DeletePostButton handleDelete={handleDelete} loading={loadingState} errorMessage={deleteErrorMessage} deleteResponseBody={deleteResponseBody} />
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
