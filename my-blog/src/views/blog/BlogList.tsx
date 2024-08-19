// src/components/BlogList.tsx
import React from 'react';
import BlogCard from '../blog/BlogCard';

interface Post {
  id: number;
  post_id: string;
  title: string;
  content: string;
}

interface BlogListProps {
  posts: Post[];
}

const BlogList: React.FC<BlogListProps> = ({ posts }) => {

  

  return (
    <div>
      <ul>
        {posts.map(post => (
          <li key={post.id} className="mb-2">
            <BlogCard id={post.id} post_id ={post.post_id}  title={post.title} excerpt={post.content} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
