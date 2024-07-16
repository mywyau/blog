// src/components/BlogList.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import BlogCard from './blog_card/BlogCard';

interface Post {
  id: number;
  title: string;
  excerpt: string;
}

interface BlogListProps {
  posts: Post[];
}

const BlogList: React.FC<BlogListProps> = ({ posts }) => {
  return (
    <div>
      {/* <h1 className="rainbow-text text-3xl font-bold mb-4">
        Super Long Blog List to showcase rainbow css
      </h1> */}
      <ul>
        {posts.map(post => (
          <li key={post.id} className="mb-2">
            <BlogCard id={post.id} title={post.title} excerpt={post.excerpt} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
