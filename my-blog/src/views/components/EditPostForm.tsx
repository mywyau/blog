import React, { useState } from 'react';
import { updatePostById } from '../../connectors/BlogPostConnector';

interface PostData {
  id: number;
  post_id: string;
  title: string;
  body: string;
}

const EditPostForm: React.FC = () => {

  const [id, setId] = useState(0);
  const [post_id, setPostId] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const maxTitleLength = 100;
  const maxPostIdLength = 50;
  const maxContentLength = 20000;

  const blogPostToSubmit: PostData = {
    id: id,
    post_id: post_id,
    title: title,
    body: content
  };

  const editPost = async (post_id: string, newBlogPost: PostData) => {

    if (title.trim() === '' || content.trim() === '') {
      alert('Title and content cannot be empty');
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await updatePostById(post_id, newBlogPost); // Replace '1' with the post ID you want to retrieve
      console.log('Post edited successfully:', data);
      setTitle('');
      setPostId('');
      setContent('');
    } catch (error) {
      console.error('Error when editing post:', error);
      alert(`[EditPostForm][axios.put] Failed to update the blog post. Please try again. ${API_BASE_URL}/blog/post/update`);
    } finally {
      setIsLoading(false);
    }
  };

  const remainingTitleChars = maxTitleLength - title.length;
  const remainingPostIdChars = maxPostIdLength - post_id.length;
  const remainingContentChars = maxContentLength - content.length;

  return (

    <div className="p-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          editPost(post_id, blogPostToSubmit);
        }}
      >
        <div className="mb-4">
          <label className="block mb-2">
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
              maxLength={maxTitleLength}
              disabled={isLoading}
            />
          </label>
          <p className="text-gray-600 text-sm">
            {remainingTitleChars} characters remaining
          </p>
        </div>
        <div>
          <label className="block mb-2">
            Post ID:
            <input
              type="text"
              value={post_id}
              onChange={(e) => setPostId(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
              maxLength={maxPostIdLength}
              disabled={isLoading}
            />
          </label>
          <p className="text-gray-600 text-sm">
            {remainingPostIdChars} characters remaining
          </p>
        </div>
        <div className="mt-4 mb-4">
          <label className="block mb-2">
            Content:
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-64 border border-gray-300 rounded p-2"
              maxLength={maxContentLength}
              disabled={isLoading}
            />
          </label>
          <p className="text-gray-600 text-sm">
            {remainingContentChars} characters remaining
          </p>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-true-blue text-white hover:bg-cambridge-blue px-4 py-2 rounded"
        >
          {isLoading ? 'Updating...' : 'edited Post'}
        </button>
      </form>
    </div>
  );
};

export default EditPostForm;
