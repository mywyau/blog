// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BlogList from './components/BlogList';
import BlogPost from './components/BlogPost';
import BlogPage from './components/pages/BlogPage';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BlogPage />} />
        <Route path="/post/:id" element={<BlogPost />} />
      </Routes>
    </Router>
  );
};

export default App;
