// __tests__/UpdateBlogPostButton.test.tsx

import { render, screen, waitFor } from '@testing-library/react';
import BlogPostConnector from '../../../../src/connectors/BlogPostConnector';
import { PostData } from '../../../../src/models/PostData';
import UpdateBlogPostButton from '../../../../src/views/components/buttons/UpdateBlogPostButton';

jest.mock('../../../../src/connectors/BlogPostConnector');

describe('UpdateBlogPostButton Component', () => {
  const mockPost: PostData = {
    id: 1,
    post_id: 'mikey-1',
    title: 'updated title',
    body: 'Some Content',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should display loading indicator while fetching post', () => {
    (BlogPostConnector.updatePostById as jest.Mock).mockResolvedValue({
      data: mockPost,
      error: null,
    });

    render(<UpdateBlogPostButton />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should display the updated post after fetching', async () => {
    (BlogPostConnector.updatePostById as jest.Mock).mockResolvedValue({
      data: mockPost,
      error: null,
    });

    render(<UpdateBlogPostButton />);

    await waitFor(() => {
      expect(screen.getByText('updated title')).toBeInTheDocument();
      expect(screen.getByText(`${mockPost.id}`)).toBeInTheDocument();
      expect(screen.getByText(mockPost.post_id)).toBeInTheDocument();
      expect(screen.getByText(mockPost.body)).toBeInTheDocument();
    });
  });

  it('should display an error message if the update fails', async () => {
    (BlogPostConnector.updatePostById as jest.Mock).mockResolvedValue({
      data: null,
      error: 'Failed to update post',
    });

    render(<UpdateBlogPostButton />);

    await waitFor(() => {
      expect(screen.getByText('Failed to update post')).toBeInTheDocument();
    });
  });

  it('should not display anything initially', () => {
    (BlogPostConnector.updatePostById as jest.Mock).mockResolvedValue({
      data: null,
      error: null,
    });

    render(<UpdateBlogPostButton />);

    expect(screen.queryByText('updated title')).not.toBeInTheDocument();
    expect(screen.queryByText('Some Content')).not.toBeInTheDocument();
  });
});
