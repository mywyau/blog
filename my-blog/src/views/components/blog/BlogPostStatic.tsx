import React from 'react';

interface BlogPostProps {
  post: {
    id: number;
    title: string;
    content: string;
  };
}

const BlogPostStatic: React.FC<BlogPostProps> = ({ post }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
      <p className="text-gray-700">{post.content}</p>
    </div>
  );
};

export default BlogPostStatic;