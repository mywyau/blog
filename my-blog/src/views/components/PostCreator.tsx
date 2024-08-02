import React, { useState } from 'react';
import axios from 'axios';

// Define an interface for the post data
interface PostData {
  title: string;
  body: string;
}

const PostCreator: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const baseUrl = "http://localhost:8080";

  // Maximum length for the title
  const maxTitleLength = 100;
  
  const maxContentLength = 5000;

  // Function to handle POST request
  const createPost = async () => {
    const postData: PostData = {
      title: title,
      body: content,
    };

    try {
      const response = await axios.post(baseUrl + "/blog/post/create", postData);
      console.log('Post created successfully:', response.data);
      // Optionally reset form or handle success
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  // Calculate remaining characters
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
            />
          </label>
          <p className="text-gray-600 text-sm">
            {remainingContentChars} characters remaining
          </p>
        </div>
        <button type="submit" className='bg-true-blue text-white hover:bg-cambridge-blue px-4 py-2 rounded'>
          Create Post
        </button>
      </form>
    </div>
  );
};

export default PostCreator;
