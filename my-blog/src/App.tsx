// src/App.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import BlogPostController from './controllers/BlogPostController';
import CreateSkillsController from './controllers/CreateSkillsController';
import CreateUserController from './controllers/CreateUserController';
import CreateWorklogController from './controllers/CreateWorklogController';
import EditSkillPageController from './controllers/EditSkillsPageController';
import EditWorklogPageController from './controllers/EditWorklogPageController copy';
import ForgottenPasswordController from './controllers/ForgottenPasswordController';
import LandingPageController from './controllers/LandingPageController';
import LoginController from './controllers/LoginController';
import ShowSkillsPageController from './controllers/ShowSkillsPageController';
import ShowWorklogsPageController from './controllers/ShowWorklogsPageController';
import AboutPage from './views/pages/AboutPage';
import ButtonsPage from './views/pages/assets_pages/ButtonsPage';
import CheckboxesPage from './views/pages/assets_pages/CheckboxesPage';
import FormsPage from './views/pages/assets_pages/FormsPage';
import ImagesPage from './views/pages/assets_pages/ImagesPage';
import LoadingPage from './views/pages/assets_pages/LoadingPage';
import RadioPage from './views/pages/assets_pages/RadioPage';
import VideosPage from './views/pages/assets_pages/VideosPage';
import AssetsPage from './views/pages/AssetsPage';
import ContactPage from './views/pages/ContactsPage';
import CreateBlogPostPage from './views/pages/CreateBlogPostPage';
import EditBlogPostPage from './views/pages/EditBlogPostPage';
import InterestsPage from './views/pages/InterestsPage';
import PrivacyPolicyPage from './views/pages/PrivacyPolicyPage';
import TermsOfServicePage from './views/pages/TermsOfServicePage';



const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPageController />} />

      <Route path="/create-blog-post" element={<CreateBlogPostPage />} />
      <Route path="/post/:id" element={<BlogPostController />} />
      <Route path="/edit-blog-post/:post_id" element={<EditBlogPostPage />} />

      <Route path="/create/skill" element={<CreateSkillsController />} />
      <Route path="/skills" element={<ShowSkillsPageController />} />
      <Route path="/edit-skill/:skill_id" element={<EditSkillPageController />} />

      <Route path="/worklog" element={<ShowWorklogsPageController />} />
      <Route path="worklog/add/new/worklog" element={<CreateWorklogController />} />
      <Route path="/edit-worklog/:worklog_id" element={<EditWorklogPageController />} />

      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/interests" element={<InterestsPage />} />

      <Route path="/assets" element={<AssetsPage />} />
      <Route path="/buttons" element={<ButtonsPage />} />
      <Route path="/images" element={<ImagesPage />} />
      <Route path="/loading" element={<LoadingPage />} />
      <Route path="/forms" element={<FormsPage />} />
      <Route path="/checkboxes" element={<CheckboxesPage />} />
      <Route path="/radios" element={<RadioPage />} />
      <Route path="/videos" element={<VideosPage />} />

      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      <Route path="/terms-of-service" element={<TermsOfServicePage />} />

      <Route path="/login" element={<LoginController />} />
      <Route path="/register" element={<CreateUserController />} />
      <Route path="/forgot/password" element={<ForgottenPasswordController />} />

    </Routes>
  );
};

export default App;


