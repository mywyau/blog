// src/App.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import BlogPostController from './controllers/BlogPostController';
import CreateSkillsController from './controllers/CreateSkillsController copy';
import LandingPageController from './controllers/LandingPageController';
import ShowSkillsPageController from './controllers/ShowSkillsPageController';
import EditSkillPageController from './controllers/EditSkillsPageController';
import AboutPage from './views/pages/AboutPage';
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
import PrivacyPolicy from './views/pages/PrivacyPolicy';
import TermsOfService from './views/pages/TermsOfService';
import WorkLog from './views/pages/WorkLog';



const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPageController.onPageLoad />} />
      <Route path="/post/:id" element={<BlogPostController />} />
      <Route path="/create/skill" element={<CreateSkillsController />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<Contacts />} />
      <Route path="/interests" element={<Interests />} />
      <Route path="/skills" element={<ShowSkillsPageController />} />
      <Route path="/edit-skill/:skill_id" element={<EditSkillPageController />} />
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


