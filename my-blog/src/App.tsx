// src/App.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import BlogPost from './views/blog/BlogPost';
import About from './views/pages/About';
import ButtonsPage from './views/pages/assets_pages/ButtonsPage';
import CheckboxesPage from './views/pages/assets_pages/CheckboxesPage';
import FormsPage from './views/pages/assets_pages/FormsPage';
import ImagesPage from './views/pages/assets_pages/ImagesPage';
import LoadingPage from './views/pages/assets_pages/LoadingPage';
import RadioPage from './views/pages/assets_pages/RadioPage';
import ButtonAssetsPage from './views/pages/AssetsPage';
import Contacts from './views/pages/Contacts';
import CreateBlogPost from './views/pages/CreateBlogPost';
import Interests from './views/pages/Interests';
import LandingPage from './views/pages/LandingPage';
import PrivacyPolicy from './views/pages/PrivacyPolicy';
import Skills from './views/pages/Skills';
import TermsOfService from './views/pages/TermsOfService';
import Videos from './views/pages/Videos';
import WorkLog from './views/pages/WorkLog';

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
      <Route path="/assets" element={<ButtonAssetsPage />} />
      <Route path="/create-blog-post" element={<CreateBlogPost />} />

      {/* <Route path="/images" element={<Images />} /> */}
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />

      <Route path="/buttons" element={<ButtonsPage />} />
      <Route path="/images" element={<ImagesPage />} />
      <Route path="/loading" element={<LoadingPage />} />
      <Route path="/forms" element={<FormsPage />} />
      <Route path="/checkboxes" element={<CheckboxesPage />} />
      <Route path="/radios" element={<RadioPage />} />
      <Route path="/videos" element={<Videos />} />

    </Routes>
  );
};

export default App;


