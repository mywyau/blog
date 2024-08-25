import axios from 'axios';
import { config } from 'dotenv';
import BlogPostConnector from '../../src/connectors/BlogPostConnector';
import { PostData } from '../../src/models/PostData';
import { DeleteResponseBody } from '../../src/models/DeleteResponseBody';

config({ path: '../../.env' });

const apiUrl = process.env.REACT_APP_API_BASE_URL;

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedBlogPostConnector = BlogPostConnector as jest.Mocked<typeof BlogPostConnector>;

const blogPostConnector = BlogPostConnector

describe('BlogPostConnector API functions', () => {

    // Tests for getPostById
    describe('getPostById', () => {

        it('should return post data when API call is successful', async () => {

            const mockPost: PostData = {
                id: 1,
                post_id: 'mikey-1',
                title: 'Test Post',
                body: 'This is a test post.',
            };

            mockedAxios.get.mockResolvedValueOnce({ data: mockPost });

            const result = await blogPostConnector.getPostById(1);

            expect(mockedAxios.get).toHaveBeenCalledWith(apiUrl + '/blog/post/retrieve/1');
            expect(result.data).toEqual(mockPost);
            expect(result.error).toBeUndefined();
        });

        it('should return an error message when API call fails', async () => {
            const errorMessage = 'Post not found';
            mockedAxios.get.mockRejectedValueOnce({
                response: {
                    data: { message: errorMessage },
                },
            });

            const result = await blogPostConnector.getPostById(1);

            expect(result.data).toBeUndefined();
            expect(result.error).toBe(errorMessage);
        });
    });

    // Tests for getViaPost_Id
    describe('getViaPostId', () => {

        it('should return post data when API call is successful', async () => {

            const mockPost: PostData = {
                id: 1,
                post_id: 'mikey-2',
                title: 'Test Post',
                body: 'This is a test post.',
            };

            mockedAxios.get.mockResolvedValueOnce({ data: mockPost });

            const result = await blogPostConnector.getViaPostId('mikey-2');

            expect(mockedAxios.get).toHaveBeenCalledWith(apiUrl + '/blog/post/retrieve/post-id/mikey-2');
            expect(result.data).toEqual(mockPost);
            expect(result.error).toBeUndefined();
        });

        it('should return an error message when API call fails', async () => {
            const errorMessage = 'Post not found';
            mockedAxios.get.mockRejectedValueOnce({
                response: {
                    data: { message: errorMessage },
                },
            });

            const result = await blogPostConnector.getViaPostId('mikey-2');
            // const result = await getViaPost_Id('mikey-2');

            expect(result.data).toBeUndefined();
            expect(result.error).toBe(errorMessage);
        });
    });

    // Tests for updatePostById
    describe('updatePostById', () => {
        it('should update post data and return the updated data when API call is successful', async () => {

            const updatedPost: PostData = {
                id: 10,
                post_id: 'mikey-2',
                title: 'Hardcoded title update',
                body: 'Some updated content',
            };

            mockedAxios.put.mockResolvedValueOnce({ data: updatedPost });


            const result = await blogPostConnector.updatePostById('mikey-2', updatedPost);

            // const result = await updatePostById('mikey-2', updatedPost);

            expect(mockedAxios.put).toHaveBeenCalledWith(
                apiUrl + '/blog/posts/update/mikey-2',
                updatedPost
            );
            expect(result.data).toEqual(updatedPost);
            expect(result.error).toBeUndefined();
        });

        it('should return an error message when API call fails', async () => {

            const errorMessage = 'Post not found';

            const updatedPost: PostData = {
                id: 10,
                post_id: 'mikey-2',
                title: 'Hardcoded title update',
                body: 'Some updated content',
            };

            mockedAxios.put.mockRejectedValueOnce({
                response: {
                    data: { message: errorMessage },
                },
            });

            const result = await blogPostConnector.updatePostById('mikey-2', updatedPost);
            // const result = await updatePostById('mikey-2', updatedPost);

            expect(result.data).toBeUndefined();
            expect(result.error).toBe(errorMessage);
        });
    });

    // Tests for deleteAllRequest
    describe('deleteAllRequest', () => {

        it('should return a success message when API call is successful', async () => {

            const successMessage: DeleteResponseBody = {
                message: 'All posts have been deleted.',
            };

            mockedAxios.delete.mockResolvedValueOnce({ data: successMessage });

            const result = await blogPostConnector.deleteAllRequest();
            // const result = await deleteAllRequest();

            expect(mockedAxios.delete).toHaveBeenCalledWith(apiUrl + '/blog/post/all');
            expect(result.data).toEqual(successMessage);
            expect(result.error).toBeUndefined();
        });

        it('should return an error message when API call fails', async () => {

            const errorMessage = 'Failed to delete posts';

            mockedAxios.delete.mockRejectedValueOnce({
                response: {
                    data: { message: errorMessage },
                },
            });

            const result = await blogPostConnector.deleteAllRequest();

            expect(result.data).toBeUndefined();
            expect(result.error).toBe(errorMessage);
        });
    });
});
