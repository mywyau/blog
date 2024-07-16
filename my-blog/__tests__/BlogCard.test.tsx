import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BlogCard from '../src/views/components/blog_card/BlogCard';

describe('BlogCard', () => {
  it('renders the blog card with title and excerpt', () => {
    const { getByText } = render(
      <MemoryRouter>
        <BlogCard id={1} title="Test Title" excerpt="Test Excerpt" />
      </MemoryRouter>
    );

    expect(getByText('Test Title')).toBeInTheDocument();
    expect(getByText('Test Excerpt')).toBeInTheDocument();
    expect(getByText('Read more')).toBeInTheDocument();
  });

  it('links to the correct post page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <BlogCard id={1} title="Test Title" excerpt="Test Excerpt" />
      </MemoryRouter>
    );

    expect(getByText('Read more')).toHaveAttribute('href', '/post/1');
  });
});
