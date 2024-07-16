// src/App.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import BlogPage from './views/components/pages/BlogPage';
import BlogPost from './views/components/BlogPost';
import About from './views/components/pages/About';
import Contacts from './views/components/pages/Contacts';

// Mocking the components to verify their rendering
jest.mock('./components/pages/BlogPage', () => () => <div>BlogPage Component</div>);
jest.mock('./components/BlogPost', () => () => <div>BlogPost Component</div>);
jest.mock('./components/pages/About', () => () => <div>About Component</div>);
jest.mock('./components/pages/Contacts', () => () => <div>Contacts Component</div>);

describe('App', () => {
  it('renders the BlogPage component at the root path', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('BlogPage Component')).toBeInTheDocument();
  });

  it('renders the BlogPost component at the /post/:id path', () => {
    render(
      <MemoryRouter initialEntries={['/post/1']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('BlogPost Component')).toBeInTheDocument();
  });

  it('renders the About component at the /about path', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('About Component')).toBeInTheDocument();
  });

  it('renders the Contacts component at the /contact path', () => {
    render(
      <MemoryRouter initialEntries={['/contact']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('Contacts Component')).toBeInTheDocument();
  });
});
