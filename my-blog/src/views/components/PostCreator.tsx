import React, { useState } from 'react';
import axios from 'axios';

interface PostData {
  title: string;
  body: string;
}

const PostCreator: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const baseUrl = "http://localhost:8080";

  const maxTitleLength = 100;
  const maxContentLength = 5000;

  const createPost = async () => {
    if (title.trim() === '' || content.trim() === '') {
      alert('Title and content cannot be empty');
      return;
    }

    const postData: PostData = {
      title,
      body: content,
    };

    setIsLoading(true);
    try {
      const response = await axios.post(baseUrl + "/blog/posts/create", postData);
      console.log('Post created successfully:', response.data);
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create the post. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const remainingTitleChars = maxTitleLength - title.length;
  const remainingContentChars = maxContentLength - content.length;

  return (
    <div className="p-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createPost();
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
        <div className="mb-4">
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
          {isLoading ? 'Creating...' : 'Create Post'}
        </button>
      </form>
    </div>
  );
};

export default PostCreator;
