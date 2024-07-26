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

  const baseUrl = "http://localhost:8080"

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

  return (
    <div>
      <h2>Create a New Post</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createPost();
        }}
      >
        <div>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Content:
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </label>
        </div>
        <button type="submit" className='bg-true-blue text-white hover:bg-cardinal'>Create Post</button>
      </form>
    </div>
  );
};

export default PostCreator;
