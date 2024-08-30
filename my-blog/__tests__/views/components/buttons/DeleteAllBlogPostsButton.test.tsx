// __tests__/DeleteAllBlogPostsButton.test.tsx

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import BlogPostConnector from '../../../../src/connectors/BlogPostConnector';
import { PostData } from '../../../../src/models/PostData';
import DeleteAllBlogPostsButton from '../../../../src/views/components/buttons/DeleteAllBlogPostsButton';

jest.mock('../../../../src/connectors/BlogPostConnector');

describe('DeleteAllBlogPostsButton Component', () => {
    const mockPosts: PostData[] = [
        { id: 1, post_id: 'post1', title: 'Post 1', body: 'Content of Post 1' },
        { id: 2, post_id: 'post2', title: 'Post 2', body: 'Content of Post 2' },
    ];

    const setPostsMock = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should confirm before deleting all posts', async () => {
        
        const confirmSpy = jest.spyOn(window, 'confirm').mockReturnValue(false);

        render(<DeleteAllBlogPostsButton posts={mockPosts} setPosts={setPostsMock} />);

        fireEvent.click(screen.getByText('Delete All Blog Posts'));

        expect(confirmSpy).toHaveBeenCalledWith('Are you sure you want to delete all blog posts?');
        expect(setPostsMock).not.toHaveBeenCalled();
    });

    it('should delete all posts when confirmed', async () => {
        const confirmSpy = jest.spyOn(window, 'confirm').mockReturnValue(true);
        (BlogPostConnector.deleteAllRequest as jest.Mock).mockResolvedValue({
            data: { message: 'All posts deleted successfully' },
            error: null,
        });

        render(<DeleteAllBlogPostsButton posts={mockPosts} setPosts={setPostsMock} />);

        fireEvent.click(screen.getByText('Delete All Blog Posts'));

        expect(confirmSpy).toHaveBeenCalledWith('Are you sure you want to delete all blog posts?');
        expect(setPostsMock).toHaveBeenCalledWith([]); // Optimistic UI update

        await waitFor(() => {
            expect(screen.getByText('All posts deleted successfully')).toBeInTheDocument();
        });

        expect(setPostsMock).toHaveBeenCalledTimes(1);
    });

    it('should display an error message when deletion fails', async () => {

        (BlogPostConnector.deleteAllRequest as jest.Mock).mockResolvedValue({
            data: null,
            error: 'Failed to delete posts',
        });

        render(<DeleteAllBlogPostsButton posts={mockPosts} setPosts={setPostsMock} />);

        fireEvent.click(screen.getByText('Delete All Blog Posts'));

        await waitFor(() => {
            expect(screen.getByText('Failed to delete posts')).toBeInTheDocument();
        });

        expect(setPostsMock).toHaveBeenCalledWith(mockPosts); // Revert to original posts on failure
    });

    it('should disable the button while loading', async () => {

        (BlogPostConnector.deleteAllRequest as jest.Mock).mockImplementation(
            () =>
                new Promise((resolve) => {
                    setTimeout(() => resolve({ data: { message: 'All posts deleted successfully' }, error: null }), 1000);
                })
        );

        render(<DeleteAllBlogPostsButton posts={mockPosts} setPosts={setPostsMock} />);

        fireEvent.click(screen.getByText('Delete All Blog Posts'));

        expect(screen.getByText('Loading...')).toBeDisabled();
    });
});
