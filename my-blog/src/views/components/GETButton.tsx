import React from 'react';

const GETButton: React.FC = () => {
  const handleClick = async () => {
    try {
      const response = await fetch('http://localhost:8080/blog/posts/retrieve/1', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Successful GET blog post:', data);
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  };

  return (
    <button onClick={handleClick} className="bg-true-blue hover:bg-cardinal text-white py-2 px-4 rounded-md focus:outline-none">
      GET Post
    </button>
  );
};

export default GETButton;
