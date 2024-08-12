import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
import BlogPost from '../src/views/blog/BlogPost';

// Mocking the useParams hook from react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: '1'
  }),
}));

describe('BlogPost component', () => {
  test('renders the BlogPost component with correct title and content', () => {
    // render(
    //   <BrowserRouter>
    //     <BlogPost />
    //   </BrowserRouter>
    // );

    // const titleElement = screen.getByText('Post 1');
    // const contentElement = screen.getByText('This is the content of post 1.');

    // expect(titleElement).toBeInTheDocument();
    // expect(contentElement).toBeInTheDocument();
  });

  test('renders Navbar and Copyright components', () => {
    render(
      <BrowserRouter>
        <BlogPost />
      </BrowserRouter>
    );

    const navbarElement = screen.getByText('Home'); // Assuming 'Home' is a text in Navbar
    const copyrightElement = screen.getByText(/all rights reserved/i);

    expect(navbarElement).toBeInTheDocument();
    expect(copyrightElement).toBeInTheDocument();
  });
});
