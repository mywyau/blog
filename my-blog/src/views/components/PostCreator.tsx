import axios from 'axios';
import React, { useState } from 'react';
import { PostData } from '../../models/PostData';


const PostCreator: React.FC = () => {

  const [id, setId] = useState(0);
  const [post_id, setPostId] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const maxTitleLength = 100;
  const maxPostIdLength = 50;
  const maxContentLength = 20000;

  const createPost = async () => {
    if (title.trim() === '' || content.trim() === '') {
      alert('Title and content cannot be empty');
      return;
    }

    const postData: PostData = {
      id: id,
      post_id: post_id,
      title: title,
      body: content,
      created_at: new Date(),
      updated_at: new Date()
    };

    setIsLoading(true);
    try {
      const response = await
        axios.post(
          API_BASE_URL + '/blog/post/create',
          {
            ...postData,
            created_at: postData.created_at.toISOString(),
            updated_at: postData.updated_at.toISOString(),
          }
        );

      console.log('Post created successfully:', response.data);
      setTitle('');
      setPostId('');
      setContent('');
    } catch (error) {
      console.error('Error creating post:', error);
      alert(`[PostCreator][axios.post] Failed to create the post. Please try again. ${API_BASE_URL}/blog/post/create`);
    } finally {
      setIsLoading(false);
    }
  };

  const remainingTitleChars = maxTitleLength - title.length;
  const remainingPostIdChars = maxPostIdLength - post_id.length;
  const remainingContentChars = maxContentLength - content.length;

  return (
    <div className="">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createPost();
        }}
      >
        <div className="mb-4">
          <label id='create-post-title' className="block mb-2">
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
          <label id='create-post-post-id' className="block mb-2">
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
          <label id='create-post-content' className="block mb-2">
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
          {isLoading ? 'Creating...' : 'Create Post'}
        </button>
      </form>
    </div>
  );
};

export default PostCreator;
