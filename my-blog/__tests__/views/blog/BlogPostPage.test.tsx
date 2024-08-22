import { fireEvent, render, screen } from '@testing-library/react';
import { fold, getOrElse, none, Option, some } from 'fp-ts/Option';
import BlogPostConnector from '../../../src/connectors/BlogPostConnector';
import { DeleteResponseBody } from '../../../src/models/DeleteResponseBody';
import { PostData } from '../../../src/models/PostData';
import BlogPostPage from '../../../src/views/blog/BlogPostPage';

// Define fp-ts utilities outside the mock
const renderPost = (post: Option<PostData>) =>
  fold(
    () => 'No post',
    (postData: PostData) => postData.title
  )(post);

const renderLoading = (loading: Option<boolean>) =>
  getOrElse(() => false)(loading);

const renderErrorMessage = (errorMessage: Option<string>) =>
  getOrElse(() => '')(errorMessage);

// Mock the deleteBlogPost method
jest.mock('../../../src/connectors/BlogPostConnector', () => ({
  __esModule: true,
  default: {
    deleteBlogPost: jest.fn(),
  },
}));

jest.mock('../../../src/views/components/navigation_bar/NavBar', () => () => <div>Navbar Component</div>);

jest.mock('../../../src/views/components/Copyright', () => () => <div>Copyright Component</div>);

jest.mock('../../../src/views/components/buttons/DeletePostButton', () => ({ handleDelete }: { handleDelete: () => void }) => (
  <button onClick={handleDelete}>Delete Post</button>
));

jest.mock('../../../src/views/components/buttons/EditButton', () => () => <div>Edit Button</div>);

jest.mock('../../../src/views/blog/RenderBlogPost', () => ({
  __esModule: true,
  default: ({ post, loading, errorMessage }: { post: Option<PostData>; loading: Option<boolean>; errorMessage: Option<string> }) => (
    <div>
      {renderLoading(loading) ? 'Loading...' : renderPost(post)}
      {<div>{renderErrorMessage(errorMessage)}</div>}
    </div>
  ),
}));

const mockedBlogPostConnector = BlogPostConnector as jest.Mocked<typeof BlogPostConnector>;

describe('BlogPostPage', () => {
  const mockPost: PostData = {
    id: 1,
    post_id: 'test-id',
    title: 'Test Blog Post',
    body: 'This is a test blog post content.',
  };


  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockDeleteBlogPost = BlogPostConnector.deleteBlogPost as jest.Mock;

  it('should render the blog post title when post is provided', () => {
    render(
      <BlogPostPage
        post={some(mockPost)}
        loading={some(false)}
        errorMessage={none}
      />
    );

    expect(screen.getByText('Test Blog Post')).toBeInTheDocument();
  });

  it('should render the loading state', () => {
    render(
      <BlogPostPage
        post={none}
        loading={some(true)}
        errorMessage={none}
      />
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render the error message when there is an error', () => {
    render(
      <BlogPostPage
        post={none}
        loading={some(false)}
        errorMessage={some('Error occurred')}
      />
    );

    expect(screen.getByText('Error occurred')).toBeInTheDocument();
  });

  it('should call handleDelete when the delete button is clicked', async () => {

    render(
      <BlogPostPage
        post={some(mockPost)}
        loading={some(false)}
        errorMessage={none}
      />
    );

    const deleteButton = screen.getByText('Delete Post');
    fireEvent.click(deleteButton);

    // Simulate the confirmation dialog
    window.confirm = jest.fn(() => true);

    await screen.findByText('Delete Post');
  });

  it('should render the delete error message when deletion fails', async () => {


    mockDeleteBlogPost.mockResolvedValue({
      data: undefined,
      error: 'Delete failed',
    });

    render(
      <BlogPostPage
        post={some(mockPost)}
        loading={some(false)}
        errorMessage={none}
      />
    );

    const deleteButton = screen.getByText('Delete Post');

    fireEvent.click(deleteButton);

    window.confirm = jest.fn(() => true);

    await screen.findByText('Delete Post');
    await screen.findByText('Delete failed');
  });
});
