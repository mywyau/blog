import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LandingPageController from '../../src/controllers/LandingPageController';
import BlogPostConnector from '../../src/connectors/BlogPostConnector';
import { PostData } from '../../src/models/PostData';

// Mocking BlogPostConnector
jest.mock('../../src/connectors/BlogPostConnector');

const mockedBlogPostConnector = BlogPostConnector as jest.Mocked<typeof BlogPostConnector>;

describe('LandingPageController', () => {

    const samplePosts: PostData[] = [
        { id: 1, post_id: "blog-post-1", title: 'Post 1', body: 'Content for post 1', created_at: new Date(), updated_at: new Date() },
        { id: 2, post_id: "blog-post-2", title: 'Post 2', body: 'Content for post 2', created_at: new Date(), updated_at: new Date() },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders posts when data is successfully fetched', async () => {
        mockedBlogPostConnector.getAllPosts.mockResolvedValueOnce({ data: samplePosts });

        render(
            <MemoryRouter>
                <LandingPageController />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('Post 1')).toBeInTheDocument();
            expect(screen.getByText('Post 2')).toBeInTheDocument();
        });
    });
});
