// src/App.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import BlogPost from './views/blog/BlogPostPage';
import About from './views/pages/About';
import ButtonsPage from './views/pages/assets_pages/ButtonsPage';
import CheckboxesPage from './views/pages/assets_pages/CheckboxesPage';
import FormsPage from './views/pages/assets_pages/FormsPage';
import ImagesPage from './views/pages/assets_pages/ImagesPage';
import LoadingPage from './views/pages/assets_pages/LoadingPage';
import RadioPage from './views/pages/assets_pages/RadioPage';
import VideosPage from './views/pages/assets_pages/VideosPage';
import ButtonAssetsPage from './views/pages/AssetsPage';
import Contacts from './views/pages/ContactsPage';
import CreateBlogPost from './views/pages/CreateBlogPost';
import EditBlogPost from './views/pages/EditBlogPost';
import Interests from './views/pages/Interests';
import LandingPage from './views/pages/LandingPage';
import PrivacyPolicy from './views/pages/PrivacyPolicy';
import Skills from './views/pages/Skills';
import TermsOfService from './views/pages/TermsOfService';
import WorkLog from './views/pages/WorkLog';
import LandingPageController from './controllers/LandingPageController';
import BlogPostController from './controllers/BlogPostController';



const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPageController.onPageLoad />} />
      <Route path="/post/:id" element={<BlogPostController.onPageLoad />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contacts />} />
      <Route path="/interests" element={<Interests />} />
      <Route path="/skills" element={<Skills />} />
      <Route path="/work-log" element={<WorkLog />} />
      <Route path="/assets" element={<ButtonAssetsPage />} />
      <Route path="/create-blog-post" element={<CreateBlogPost />} />
      <Route path="/edit-blog-post/:post_id" element={<EditBlogPost />} />

      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />

      <Route path="/buttons" element={<ButtonsPage />} />
      <Route path="/images" element={<ImagesPage />} />
      <Route path="/loading" element={<LoadingPage />} />
      <Route path="/forms" element={<FormsPage />} />
      <Route path="/checkboxes" element={<CheckboxesPage />} />
      <Route path="/radios" element={<RadioPage />} />
      <Route path="/videos" element={<VideosPage />} />

    </Routes>
  );
};

export default App;


