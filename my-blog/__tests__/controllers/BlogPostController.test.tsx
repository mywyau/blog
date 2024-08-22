import { render, screen } from '@testing-library/react';
import { some, none } from 'fp-ts/Option';
import { BrowserRouter as Router } from 'react-router-dom';
import BlogPostController from '../../src/controllers/BlogPostController';

jest.mock('../../src/controllers/hooks/useBlogPost');
jest.mock('../../src/views/blog/BlogPostPage', () => jest.fn(() => <div>BlogPostPage Component</div>));

describe('BlogPostController', () => {
    
    const mockUseBlogPost = require('../../src/controllers/hooks/useBlogPost').useBlogPost;

    it('should render loading state', () => {
        mockUseBlogPost.mockReturnValue({
            post: none,
            loading: some(true),
            errorMessage: none,
        });

        render(
            <Router>
                <BlogPostController />
            </Router>
        );

        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('should render error message when there is an error', () => {
        mockUseBlogPost.mockReturnValue({
            post: none,
            loading: some(false),
            errorMessage: some('Error occurred'),
        });

        render(
            <Router>
                <BlogPostController />
            </Router>
        );

        expect(screen.getByText('Error occurred')).toBeInTheDocument();
    });

    it('should render BlogPostPage component with post title', () => {
        const mockPost = { id: 1, post_id: 'test-id', title: 'Test Title', body: 'Test Body' };
        mockUseBlogPost.mockReturnValue({
            post: some(mockPost),
            loading: some(false),
            errorMessage: none,
        });

        render(
            <Router>
                <BlogPostController />
            </Router>
        );

        expect(screen.getByText('Test Title')).toBeInTheDocument();
    });
});
