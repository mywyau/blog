// src/pages/BlogPage.tsx
import React from 'react';
import BlogList from '../BlogList';
import Title from '../title/Title';


const BlogPage: React.FC = () => {
  // Sample data for demonstration
  const posts = [
    { id: 1, title: 'First Post', excerpt: 'This is the first post.' },
    { id: 2, title: 'Second Post', excerpt: 'This is the second post.' },
    { id: 3, title: 'Third Post', excerpt: 'This is the third post.' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white py-4">
      <Title />
        {/* <div className="container mx-auto">
          <h1 className="text-3xl font-bold">My Blog</h1>
        </div> */}
      </header>
      <main className="container mx-auto p-4">
        <BlogList posts={posts} />
      </main>
      <footer className="bg-gray-800 text-white py-4 mt-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 My Blog. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default BlogPage;
