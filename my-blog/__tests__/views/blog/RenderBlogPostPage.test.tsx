// __tests__/RenderBlogPost.test.tsx

import { render, screen } from '@testing-library/react';
import { none, some } from 'fp-ts/Option';
import TextCountHelper from '../../../src/helpers/TextCountHelper';
import { PostData } from '../../../src/models/PostData';
import RenderBlogPost from '../../../src/views/blog/RenderBlogPost';


jest.mock('../../../src/helpers/TextCountHelper', () => ({
  countWords: jest.fn(),
  calculateReadingTime: jest.fn(),
}));

describe('RenderBlogPost Component', () => {

  const mockPost: PostData = {
    id: 1,
    post_id: 'post-id-1',
    title: 'Sample Blog Post',
    body: 'This is a sample blog post.\nIt has multiple paragraphs.',
  };

  it('renders the blog post correctly', () => {
    TextCountHelper.countWords.mockReturnValue(10);
    TextCountHelper.calculateReadingTime.mockReturnValue('1 min read');

    render(<RenderBlogPost post={some(mockPost)} loading={none} errorMessage={none} />);

    expect(screen.getByText('Sample Blog Post')).toBeInTheDocument();
    expect(screen.getByText('Word Count: 10')).toBeInTheDocument();
    expect(screen.getByText(/1 min read/i)).toBeInTheDocument();  // Using regex for matching
    expect(screen.getByText('This is a sample blog post.')).toBeInTheDocument();
    expect(screen.getByText('It has multiple paragraphs.')).toBeInTheDocument();
  });

  it('displays loading message when loading is true', () => {
    render(<RenderBlogPost post={none} loading={some(true)} errorMessage={none} />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays an error message when there is an error', () => {
    render(<RenderBlogPost post={none} loading={none} errorMessage={some('Error loading post')} />);

    expect(screen.getByText('Error loading post')).toBeInTheDocument();
  });

  it('renders nothing when there is no post, loading, or error', () => {
    render(<RenderBlogPost post={none} loading={none} errorMessage={none} />);

    expect(screen.queryByText('Sample Blog Post')).not.toBeInTheDocument();
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.queryByText('Error loading post')).not.toBeInTheDocument();
  });
});
