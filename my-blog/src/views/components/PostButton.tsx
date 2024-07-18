// src/components/PostButton.tsx
import React from 'react';

const PostButton: React.FC = () => {
  const handleClick = async () => {
    try {
      const response = await fetch('http://localhost:3000/post/1', {
        method: 'GET',
        headers: {
        //   'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'foo',
          body: 'bar',
          userId: 1,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Successfully posted:', data);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  return (
    <button onClick={handleClick} className="bg-true-blue hover:bg-cardinal text-white py-2 px-4 rounded-md focus:outline-none">
      Post Data
    </button>
  );
};

export default PostButton;
