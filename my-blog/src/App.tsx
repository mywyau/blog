// src/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './views/pages/LandingPage';
import BlogPost from './views/blog/BlogPost';
import About from './views/pages/About';
import Contacts from './views/pages/Contacts';
import Skills from './views/pages/Skills';
import WorkLog from './views/pages/Irl';
import CreateBlogPost from './views/pages/CreateBlogPost';
import Interests from './views/pages/Interests';
import ButtonAssetsPage from './views/pages/ButtonAssetsPage';
import Images from './views/pages/Images';
import PrivacyPolicy from './views/pages/PrivacyPolicy';

const baseUrl = "ice-barrage"

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
      <Route path="/button-assets" element={<ButtonAssetsPage />} />
      <Route path="/create-blog-post" element={<CreateBlogPost />} />
      <Route path="/images" element={<Images />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
    </Routes>
  );
};

export default App;


