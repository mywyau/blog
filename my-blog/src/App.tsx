// src/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './views/components/pages/LandingPage';
import BlogPost from './views/components/blog/BlogPost';
import About from './views/components/pages/About';
import Contacts from './views/components/pages/Contacts';



const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/post/:id" element={<BlogPost />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contacts />} />
    </Routes>
  );
};

export default App;


