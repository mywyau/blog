// __tests__/hooks/useBlogPost.test.tsx
import { renderHook, waitFor } from '@testing-library/react';
import { none, some } from 'fp-ts/Option';
import BlogPostConnector from '../../../src/connectors/BlogPostConnector';
import UseBlogPost from '../../../src/hooks/UseBlogPost';

jest.mock('../../../src/connectors/BlogPostConnector');

describe('UseBlogPost', () => {
    const mockPost = { id: 1, post_id: 'test-id', title: 'Test Title', body: 'Test Body' };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should set loading to true initially', async () => {
        (BlogPostConnector.getViaPostId as jest.Mock).mockResolvedValue({ data: mockPost, error: null });

        const { result } = renderHook(() => UseBlogPost());

        expect(result.current.loading).toEqual(some(true));

        await waitFor(() => expect(result.current.loading).toEqual(some(false)));
    });

    it('should set post data when fetched successfully', async () => {
        (BlogPostConnector.getViaPostId as jest.Mock).mockResolvedValue({ data: mockPost, error: null });

        const { result } = renderHook(() => UseBlogPost());

        await waitFor(() => expect(result.current.post).toEqual(some(mockPost)));
        expect(result.current.loading).toEqual(some(false));
        expect(result.current.errorMessage).toEqual(none);
    });

    it('should set errorMessage when there is an error', async () => {
        const error = 'Error occurred';
        // BlogPostConnector.getViaPostId.mockResolvedValue({ data: null, error });
        (BlogPostConnector.getViaPostId as jest.Mock).mockResolvedValue({ data: null, error: error });


        const { result } = renderHook(() => UseBlogPost());

        await waitFor(() => expect(result.current.errorMessage).toEqual(some(error)));
        expect(result.current.loading).toEqual(some(false));
        expect(result.current.post).toEqual(none);
    });
});

