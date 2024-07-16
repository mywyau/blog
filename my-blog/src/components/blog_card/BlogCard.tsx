// src/components/BlogCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface BlogCardProps {
  id: number;
  title: string;
  excerpt: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ id, title, excerpt }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
      <h2 className="text-2xl font-bold mb-2">
        <Link to={`/post/${id}`} className="text-blue-500 hover:underline">
          {title}
        </Link>
      </h2>
      <p className="text-gray-700">{excerpt}</p>
      <Link to={`/post/${id}`} className="text-blue-500 hover:underline mt-4 inline-block">
        Read more
      </Link>
    </div>
  );
};

export default BlogCard;
