import { render, screen } from '@testing-library/react';
import { act } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import BlogCard from '../../../src/views/blog/BlogCard';

import '@testing-library/jest-dom';
import { PostData } from '../../../src/models/PostData';

describe('BlogCard', () => {

  const blogCardProps: PostData = {
    id: 1,
    post_id: 'blog-post-1',
    title: 'Test Blog Post',
    body: 'This is a test excerpt for the blog post.',
  };

  const renderComponent = (props = blogCardProps) => {
    return act(() => {
      render(
        <Router>
          <BlogCard {...props} />
        </Router>
      );
    });
  };

  test('renders BlogCard component', () => {
    renderComponent();
    expect(screen.getByText(blogCardProps.title)).toBeInTheDocument();
    expect(screen.getByText(blogCardProps.body)).toBeInTheDocument();
  });

  test('renders the title with correct link', () => {
    renderComponent();
    const titleLink = screen.getByText(blogCardProps.title).closest('a');
    expect(titleLink).toHaveAttribute('href', `/post/${blogCardProps.post_id}`);
  });

  test('renders the "Read more" link with correct href', () => {
    renderComponent();
    const readMoreLink = screen.getByText('Read more').closest('a');
    expect(readMoreLink).toHaveAttribute('href', `/post/${blogCardProps.post_id}`);
  });

  test('renders the title with correct class', () => {
    renderComponent();
    const titleElement = screen.getByText(blogCardProps.title);
    expect(titleElement).toHaveClass('text-green-500 hover:underline');
  });

  test('renders the "Read more" link with correct class', () => {
    renderComponent();
    const readMoreLink = screen.getByText('Read more');
    expect(readMoreLink).toHaveClass('text-azure hover:underline mt-4 inline-block');
  });

  // test('renders the blog card with correct structure and classes', () => {
  //   renderComponent();
  //   const cardElement = screen.getByRole('article'); // Assuming div acts as an article here
  //   expect(cardElement).toHaveClass('text-azure');
  // });
});
