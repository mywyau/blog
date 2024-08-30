// __tests__/UseDeleteBlogPost.test.ts
import { act, renderHook } from '@testing-library/react';
import { none, some } from 'fp-ts/Option';
import { useParams } from 'react-router-dom';
import BlogPostConnector from '../../src/connectors/BlogPostConnector';
import UseDeleteBlogPost from '../../src/hooks/UseDeleteBlogPost';
import { DeleteResponseBody } from '../../src/models/DeleteResponseBody';

jest.mock('../../src/connectors/BlogPostConnector');
jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
}));

describe('UseDeleteBlogPost hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should cancel deletion if user does not confirm', async () => {
    (useParams as jest.Mock).mockReturnValue({ id: '123' });
    const confirmSpy = jest.spyOn(window, 'confirm').mockReturnValue(false);

    const { result } = renderHook(() => UseDeleteBlogPost());

    await act(async () => {
      await result.current.handleDelete();
    });

    expect(confirmSpy).toHaveBeenCalledWith("Are you sure you want to delete this blog post?");
    expect(result.current.loadingState).toEqual(some(false)); // Loading should remain false
    expect(result.current.deleteErrorMessage).toEqual(none);
    expect(result.current.deleteResponseBody).toEqual(none);
  });

  it('should set loading and delete post when confirmed', async () => {

    (useParams as jest.Mock).mockReturnValue({ id: '123' });
    const confirmSpy = jest.spyOn(window, 'confirm').mockReturnValue(true);
    const mockResponse: DeleteResponseBody = { message: "some delete response" };
    (BlogPostConnector.deleteBlogPost as jest.Mock).mockResolvedValue({ data: mockResponse, error: null });

    const { result } = renderHook(() => UseDeleteBlogPost());

    await act(async () => {
      await result.current.handleDelete();
    });

    expect(confirmSpy).toHaveBeenCalledWith("Are you sure you want to delete this blog post?");

    expect(result.current.loadingState).toEqual(some(false)); // After the API call, loading should be false
    expect(result.current.deleteResponseBody).toEqual(some(mockResponse)); // Should return successful response
    expect(result.current.deleteErrorMessage).toEqual(none);
  });

  it('should handle error during deletion', async () => {
    (useParams as jest.Mock).mockReturnValue({ id: '123' });
    const confirmSpy = jest.spyOn(window, 'confirm').mockReturnValue(true);
    const mockError = 'Error deleting the post';
    (BlogPostConnector.deleteBlogPost as jest.Mock).mockResolvedValue({ data: null, error: mockError });

    const { result } = renderHook(() => UseDeleteBlogPost());

    await act(async () => {
      await result.current.handleDelete();
    });

    expect(confirmSpy).toHaveBeenCalledWith("Are you sure you want to delete this blog post?");

    expect(result.current.loadingState).toEqual(some(false)); // After the API call, loading should be false
    expect(result.current.deleteErrorMessage).toEqual(some(mockError)); // Error should be set
    expect(result.current.deleteResponseBody).toEqual(none); // No data should be set
  });
});
