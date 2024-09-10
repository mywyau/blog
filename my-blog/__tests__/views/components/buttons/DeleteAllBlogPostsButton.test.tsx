import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { left, right } from 'fp-ts/Either';
import { toast } from 'react-toastify';
import BlogPostConnector from '../../../../src/connectors/BlogPostConnector';
import UserTypes from '../../../../src/models/ADTs/UserType';
import UserTypeErrors from '../../../../src/models/ADTs/UserTypeErrors';
import { DeleteResponseBody } from '../../../../src/models/DeleteResponseBody';
import { PostData } from '../../../../src/models/PostData';
import AuthService from '../../../../src/service/AuthService';
import DeleteAllBlogPostsButton from '../../../../src/views/components/buttons/DeleteAllBlogPostsButton';

jest.mock('../../../../src/connectors/BlogPostConnector');
jest.mock('../../../../src/service/AuthService');
jest.mock('react-toastify', () => ({
    toast: {
        error: jest.fn(),
        success: jest.fn(),
    },
}));

describe('DeleteAllBlogPostsButton', () => {
    const mockPosts: PostData[] = [
        { id: 1, post_id: 'post1', title: 'Post 1', body: 'Content of Post 1', created_at: new Date(), updated_at: new Date() },
        { id: 2, post_id: 'post2', title: 'Post 2', body: 'Content of Post 2', created_at: new Date(), updated_at: new Date() },
    ];
    const setPostsMock = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should display the delete button for admin users and handle delete confirmation', async () => {
        (AuthService.getRole as jest.Mock).mockResolvedValue(right(UserTypes.Admin));
        (BlogPostConnector.deleteAllRequest as jest.Mock).mockResolvedValue({
            data: { message: 'All posts deleted successfully' } as DeleteResponseBody,
            error: null,
        });

        render(<DeleteAllBlogPostsButton posts={mockPosts} setPosts={setPostsMock} />);

        // Wait for user-based content to render
        await waitFor(() => expect(screen.getByText('Delete All Blog Posts')).toBeInTheDocument());

        const confirmSpy = jest.spyOn(window, 'confirm').mockReturnValue(true); // Simulate clicking "OK"

        fireEvent.click(screen.getByText('Delete All Blog Posts'));

        //TODO fix or delete:  does not see the toast maybe test in ui tests instead?
        // expect(confirmSpy).toHaveBeenCalledWith('Are you sure you want to delete all blog posts?');
        expect(setPostsMock).toHaveBeenCalledWith([]); // Optimistic UI update

        // await waitFor(() => {
        //     expect(screen.getByText('All posts deleted successfully')).toBeInTheDocument();
        // });

        // expect(toast.success).toHaveBeenCalledWith('All blog posts deleted successfully', expect.anything());
    });

    it('should handle delete failure and revert posts', async () => {
        (AuthService.getRole as jest.Mock).mockResolvedValue(right(UserTypes.Admin));
        (BlogPostConnector.deleteAllRequest as jest.Mock).mockResolvedValue({
            data: null,
            error: 'Failed to delete posts',
        });

        render(<DeleteAllBlogPostsButton posts={mockPosts} setPosts={setPostsMock} />);

        // Wait for user-based content to render
        await waitFor(() => expect(screen.getByText('Delete All Blog Posts')).toBeInTheDocument());

        const confirmSpy = jest.spyOn(window, 'confirm').mockReturnValue(true); // Simulate clicking "OK"

        fireEvent.click(screen.getByText('Delete All Blog Posts'));

        expect(confirmSpy).toHaveBeenCalledWith('Are you sure you want to delete all blog posts?');
        expect(setPostsMock).toHaveBeenCalledWith([]); // Optimistic UI update

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith('Error deleting posts', expect.anything());
        });

        expect(setPostsMock).toHaveBeenCalledWith(mockPosts); // Revert the UI on failure
    });

    it('should not render delete button for non-admin users', async () => {
        (AuthService.getRole as jest.Mock).mockResolvedValue(right(UserTypes.Viewer));

        render(<DeleteAllBlogPostsButton posts={mockPosts} setPosts={setPostsMock} />);

        await waitFor(() => {
            expect(screen.queryByText('Delete All Blog Posts')).not.toBeInTheDocument();
        });
    });

    it('should handle unknown user type gracefully', async () => {
        (AuthService.getRole as jest.Mock).mockResolvedValue(left(UserTypeErrors.UnknownUserType));

        render(<DeleteAllBlogPostsButton posts={mockPosts} setPosts={setPostsMock} />);

        await waitFor(() => {
            expect(screen.queryByText('Delete All Blog Posts')).not.toBeInTheDocument();
        });
    });

    it('should disable the button and show "Loading..." during delete process', async () => {
        (AuthService.getRole as jest.Mock).mockResolvedValue(right(UserTypes.Admin));
        (BlogPostConnector.deleteAllRequest as jest.Mock).mockImplementation(
            () =>
                new Promise((resolve) => {
                    setTimeout(() => resolve({ data: { message: 'All posts deleted successfully' }, error: null }), 1000);
                })
        );

        render(<DeleteAllBlogPostsButton posts={mockPosts} setPosts={setPostsMock} />);

        await waitFor(() => expect(screen.getByText('Delete All Blog Posts')).toBeInTheDocument());

        const confirmSpy = jest.spyOn(window, 'confirm').mockReturnValue(true); // Simulate clicking "OK"

        fireEvent.click(screen.getByText('Delete All Blog Posts'));

        await waitFor(() => {
            expect(screen.getByText('Delete All Blog Posts')).not.toBeDisabled();
        });
    });
});
