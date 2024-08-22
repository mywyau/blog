import { render, screen } from '@testing-library/react';
import { some, none } from 'fp-ts/Option';
import { MemoryRouter } from 'react-router-dom';  // Import MemoryRouter to provide routing context
import BlogPostController from '../../src/controllers/BlogPostController';
import useBlogPost from '../../src/controllers/hooks/useBlogPost';
import { PostData } from '../../src/models/PostData';

// Mock the useBlogPost hook
jest.mock('../../src/controllers/hooks/useBlogPost');

describe('BlogPostController', () => {

    const mockUseBlogPost = useBlogPost as jest.MockedFunction<typeof useBlogPost>;

    it('should render loading state', () => {
        // Mock the return value of useBlogPost to simulate loading state
        mockUseBlogPost.mockReturnValue({
            post: none,
            loading: some(true),
            errorMessage: none,
        });

        // Render the component
        render(
            <MemoryRouter>
                <BlogPostController />
            </MemoryRouter>
        );

        // Assert that the loading state is rendered
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('should render error message when there is an error', () => {
        // Mock the return value of useBlogPost to simulate an error state
        mockUseBlogPost.mockReturnValue({
            post: none,
            loading: some(false),
            errorMessage: some('Error occurred'),
        });

        // Render the component
        render(
            <MemoryRouter>
                <BlogPostController />
            </MemoryRouter>
        );

        // Assert that the error message is rendered
        expect(screen.getByText('Error occurred')).toBeInTheDocument();
    });

    it('should render BlogPostPage component with post title', () => {
        // Define a mock post
        const mockPost: PostData = { id: 1, post_id: 'test-id', title: 'Test Title', body: 'Test Body' };

        // Mock the return value of useBlogPost to simulate a successful post fetch
        mockUseBlogPost.mockReturnValue({
            post: some(mockPost),
            loading: some(false),
            errorMessage: none,
        });

        // Render the component
        render(
            <MemoryRouter>
                <BlogPostController />
            </MemoryRouter>
        );

        // Assert that the post title is rendered
        expect(screen.getByText('Test Title')).toBeInTheDocument();
    });
});
