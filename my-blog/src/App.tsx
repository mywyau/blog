// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BlogList from './components/BlogList';
import BlogPost from './components/BlogPost';

interface Post {
  id: number;
  title: string;
  content: string;
}

const App: React.FC = () => {
  const posts: Post[] = [
    { id: 1, title: 'First Post', content: 'This is the first post content.' },
    { id: 2, title: 'Second Post', content: 'This is the second post content.' },
  ];

  return (
    <Router>
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<BlogList posts={posts} />} />
          <Route path="/post/:id" element={<BlogPost posts={posts} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
