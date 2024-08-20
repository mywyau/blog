// src/components/BlogList.tsx
import React from 'react';
import { PostData } from '../../models/PostData';
import BlogCard from '../blog/BlogCard';

interface BlogListProps {
  posts: PostData[];
}

const BlogList: React.FC<BlogListProps> = ({ posts }) => {
  return (
    <div>
      <ul>
        {posts.map(post => (
          <li key={post.id} className="mb-2">
            <BlogCard id={post.id} post_id={post.post_id} title={post.title} body={post.body} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
