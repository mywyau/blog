import { render, screen } from '@testing-library/react';
import { none, some } from 'fp-ts/Option';
import React from 'react';
import { PostData } from '../../../src/models/PostData';
import BlogPostPage from '../../../src/views/blog/BlogPostPage';
import { BrowserRouter as Router } from 'react-router-dom';

// Mock the Navbar component
jest.mock('../../../src/views/components/navigation_bar/NavBar', () => () => (
  <div>Mocked Navbar</div>
));

describe('BlogPostPage', () => {

  it('should render loading state', () => {
    render(
      <Router>
        <BlogPostPage post={none} loading={some(true)} errorMessage={none} />
      </Router>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render error message when there is an error', () => {
    render(
      <Router>
        <BlogPostPage post={none} loading={some(false)} errorMessage={some('Error occurred')} />
      </Router>
    );
    expect(screen.getByText('Error occurred')).toBeInTheDocument();
  });

  it('should render the blog post content when post data is available', () => {
    const mockPost: PostData = {
      id: 1,
      post_id: 'post-id-123',
      title: 'Test Blog Post',
      body: 'This is the content of the test blog post.',
    };

    render(
      <Router>
        <BlogPostPage post={some(mockPost)} loading={some(false)} errorMessage={none} />
      </Router>
    );

    expect(screen.getByText('Test Blog Post')).toBeInTheDocument();
    expect(screen.getByText('This is the content of the test blog post.')).toBeInTheDocument();
  });

  it('should render the mocked navbar and footer', () => {
    render(
      <Router>
        <BlogPostPage post={none} loading={some(false)} errorMessage={none} />
      </Router>
    );

    // Check that the mocked navbar and footer are rendered
    expect(screen.getByText('Mocked Navbar')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument(); // Footer is typically within a <footer> (role=contentinfo)
  });

  it('should render the DeletePostButton and EditButton', () => {
    render(
      <Router>
        <BlogPostPage post={none} loading={some(false)} errorMessage={none} />
      </Router>
    );

    // Find the "Delete" button
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();

    // Find the "Edit" link
    expect(screen.getByRole('link', { name: /edit/i })).toBeInTheDocument();
  });
});
