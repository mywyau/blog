// src/components/BlogPost.tsx
import React from 'react';
import { useParams } from 'react-router-dom';

interface Post {
  id: number;
  title: string;
  content: string;
}

interface BlogPostProps {
  posts: Post[];
}

const BlogPost: React.FC<BlogPostProps> = ({ posts }) => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div className="text-red-500">Invalid post ID</div>;
  }

  const postId = parseInt(id, 10);
  const post = posts.find(post => post.id === postId);

  if (!post) {
    return <div className="text-red-500">Post not found</div>;
  }

  return (
    <div>
      <h1 className="text-3xl text-red-500 font-bold mb-4">{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
};

export default BlogPost;
