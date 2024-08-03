import '@testing-library/jest-dom';

import App from '../src/App';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react';

// Mocking the components to verify their rendering
jest.mock('../src/views/pages/LandingPage', () => () => <div>LandingPage Component</div>);
jest.mock('../src/views/blog/BlogPost', () => () => <div>BlogPost Component</div>);
jest.mock('../src/views/pages/About', () => () => <div>About Component</div>);
jest.mock('../src/views/pages/Contacts', () => () => <div>Contacts Component</div>);

describe('App', () => {
  it('renders the LandingPage component at the root path', async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      );
    });
    expect(screen.getByText('LandingPage Component')).toBeInTheDocument();
  });

  it('renders the BlogPost component at the /post/:id path', async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/post/1']}>
          <App />
        </MemoryRouter>
      );
    });
    expect(screen.getByText('BlogPost Component')).toBeInTheDocument();
  });

  it('renders the About component at the /about path', async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/about']}>
          <App />
        </MemoryRouter>
      );
    });
    expect(screen.getByText('About Component')).toBeInTheDocument();
  });

  it('renders the Contacts component at the /contact path', async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/contact']}>
          <App />
        </MemoryRouter>
      );
    });
    expect(screen.getByText('Contacts Component')).toBeInTheDocument();
  });
});
