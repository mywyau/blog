// src/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './views/components/pages/LandingPage';
import BlogPost from './views/components/blog/BlogPost';
import About from './views/components/pages/About';
import Contacts from './views/components/pages/Contacts';
import Skills from './views/components/pages/Skills';
import WorkLog from './views/components/pages/Irl';
import CreateBlogPost from './views/components/pages/CreateBlogPost';
import Interests from './views/components/pages/Interests';


const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/post/:id" element={<BlogPost />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contacts />} />
      <Route path="/interests" element={<Interests />} />
      <Route path="/skills" element={<Skills />} />
      <Route path="/work-log" element={<WorkLog />} />
      <Route path="/create-blog-post" element={<CreateBlogPost />} />
    </Routes>
  );
};

export default App;


