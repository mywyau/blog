import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import App from '../src/App';

// Mock the components to verify their rendering
jest.mock('../src/views/blog/BlogPostPage', () => () => <div>BlogPostPage Component</div>);
jest.mock('../src/views/pages/AboutPage', () => () => <div>About Component</div>);
jest.mock('../src/views/pages/assets_pages/ButtonsPage', () => () => <div>ButtonsPage Component</div>);
jest.mock('../src/views/pages/assets_pages/CheckboxesPage', () => () => <div>CheckboxesPage Component</div>);
jest.mock('../src/views/pages/assets_pages/FormsPage', () => () => <div>FormsPage Component</div>);
jest.mock('../src/views/pages/assets_pages/ImagesPage', () => () => <div>ImagesPage Component</div>);
jest.mock('../src/views/pages/assets_pages/LoadingPage', () => () => <div>LoadingPage Component</div>);
jest.mock('../src/views/pages/assets_pages/RadioPage', () => () => <div>RadioPage Component</div>);
jest.mock('../src/views/pages/AssetsPage', () => () => <div>ButtonAssetsPage Component</div>);
jest.mock('../src/views/pages/ContactsPage', () => () => <div>Contacts Component</div>);
jest.mock('../src/views/pages/CreateBlogPostPage', () => () => <div>CreateBlogPost Component</div>);
jest.mock('../src/views/pages/InterestsPage', () => () => <div>Interests Component</div>);
jest.mock('../src/views/pages/LandingPage', () => () => <div>LandingPage Component</div>);
jest.mock('../src/views/pages/PrivacyPolicyPage', () => () => <div>PrivacyPolicy Component</div>);
jest.mock('../src/views/pages/SkillsPage', () => () => <div>Skills Component</div>);
jest.mock('../src/views/pages/TermsOfServicePage', () => () => <div>TermsOfService Component</div>);
jest.mock('../src/views/pages/WorkLogPage', () => () => <div>WorkLog Component</div>);

describe('App component', () => {
  test('renders LandingPage component for the root route', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(screen.getByText('LandingPage Component')).toBeInTheDocument();
  });

  test('renders About component for the /about route', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('About Component')).toBeInTheDocument();
  });

  test('renders BlogPostPage component for the /post/:id route', () => {
    render(
      <MemoryRouter initialEntries={['/post/1']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('BlogPostPage Component')).toBeInTheDocument();
  });

  test('renders ButtonsPage component for the /buttons route', () => {
    render(
      <MemoryRouter initialEntries={['/buttons']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('ButtonsPage Component')).toBeInTheDocument();
  });

  test('renders CheckboxesPage component for the /checkboxes route', () => {
    render(
      <MemoryRouter initialEntries={['/checkboxes']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('CheckboxesPage Component')).toBeInTheDocument();
  });

  test('renders FormsPage component for the /forms route', () => {
    render(
      <MemoryRouter initialEntries={['/forms']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('FormsPage Component')).toBeInTheDocument();
  });

  test('renders ImagesPage component for the /images route', () => {
    render(
      <MemoryRouter initialEntries={['/images']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('ImagesPage Component')).toBeInTheDocument();
  });

  test('renders LoadingPage component for the /loading route', () => {
    render(
      <MemoryRouter initialEntries={['/loading']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('LoadingPage Component')).toBeInTheDocument();
  });

  test('renders RadioPage component for the /radios route', () => {
    render(
      <MemoryRouter initialEntries={['/radios']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('RadioPage Component')).toBeInTheDocument();
  });

  test('renders ButtonAssetsPage component for the /assets route', () => {
    render(
      <MemoryRouter initialEntries={['/assets']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('ButtonAssetsPage Component')).toBeInTheDocument();
  });

  test('renders Contacts component for the /contact route', () => {
    render(
      <MemoryRouter initialEntries={['/contact']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('Contacts Component')).toBeInTheDocument();
  });

  test('renders CreateBlogPost component for the /create-blog-post route', () => {
    render(
      <MemoryRouter initialEntries={['/create-blog-post']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('CreateBlogPost Component')).toBeInTheDocument();
  });

  test('renders Interests component for the /interests route', () => {
    render(
      <MemoryRouter initialEntries={['/interests']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('Interests Component')).toBeInTheDocument();
  });

  test('renders PrivacyPolicy component for the /privacy-policy route', () => {
    render(
      <MemoryRouter initialEntries={['/privacy-policy']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('PrivacyPolicy Component')).toBeInTheDocument();
  });

  test('renders TermsOfService component for the /terms-of-service route', () => {
    render(
      <MemoryRouter initialEntries={['/terms-of-service']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('TermsOfService Component')).toBeInTheDocument();
  });

  test('renders Skills component for the /skills route', () => {
    render(
      <MemoryRouter initialEntries={['/skills']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('Skills Component')).toBeInTheDocument();
  });

  test('renders WorkLog component for the /work-log route', () => {
    render(
      <MemoryRouter initialEntries={['/work-log']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('WorkLog Component')).toBeInTheDocument();
  });
});
