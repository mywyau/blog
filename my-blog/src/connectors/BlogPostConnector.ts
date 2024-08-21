import axios, { AxiosError } from 'axios';
import { PostData } from '../models/PostData';
import { DeleteResponseBody } from '../models/DeleteResponseBody';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


class BlogPostConnector {

    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async getPostById(id: number): Promise<{ data?: PostData; error?: string }> {
        try {
            const response = await axios.get(`${this.baseUrl}/blog/post/retrieve/${id}`);
            return { data: response.data };
        } catch (error) {
            const axiosError = error as AxiosError;
            return {
                error: axiosError.response?.data?.message ||
                    '[BlogPostConnector][getPostById] An error occurred while fetching the post. The post likely does not exist or has been deleted.'
            };
        }
    }

    async getViaPostId(post_id: string): Promise<{ data?: PostData; error?: string }> {
        try {
            const response = await axios.get(`${this.baseUrl}/blog/post/retrieve/post-id/${post_id}`);
            return { data: response.data };
        } catch (error) {
            const axiosError = error as AxiosError;
            return {
                error: axiosError.response?.data?.message ||
                    '[BlogPostConnector][getViaPostId] An error occurred while fetching the post. The post likely does not exist or has been deleted.'
            };
        }
    }

    async getAllPosts(): Promise<{ data?: PostData[]; error?: string }> {
        try {
            const response = await axios.get(`${this.baseUrl}/blog/post/get/all`);
            console.log('[BlogPostConnector][getAllPosts] Data retrieved:', response.data);
            return { data: response.data };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error(
                    '[BlogPostConnector][getAllPosts] Axios error occurred:',
                    error.response?.data?.message || error.message
                );
                return {
                    error: error.response?.data?.message ||
                        '[BlogPostConnector][getAllPosts] An error occurred while fetching all posts.',
                };
            } else {
                console.error(
                    '[BlogPostConnector][getAllPosts] Unknown error occurred:',
                    (error as Error).message
                );
                return {
                    error: '[BlogPostConnector][getAllPosts] An unknown error occurred.',
                };
            }
        }
    }


    async updatePostById(post_id: string, newPostData: PostData): Promise<{ data?: PostData; error?: string }> {
        try {
            const response = await axios.put(`${this.baseUrl}/blog/posts/update/${post_id}`, newPostData);
            return { data: response.data };
        } catch (error) {
            const axiosError = error as AxiosError;
            return {
                error: axiosError.response?.data?.message ||
                    '[BlogPostConnector][updatePostById] An error occurred while updating the post. The post likely does not exist, has been deleted, or data sent such as post_id is incorrect'
            };
        }
    }

    async deleteBlogPost(post_id: string): Promise<{ data?: DeleteResponseBody; error?: string }> {
        try {
            const response = await axios.delete(`${this.baseUrl}/blog/post/single/${post_id}`);
            return { data: response.data };
        } catch (error) {
            const axiosError = error as AxiosError;
            return {
                error: axiosError.response?.data?.message ||
                    '[BlogPostConnector][deleteBlogPost] An error occurred while deleting the blog post.',
            };
        }
    }

    async deleteAllRequest(): Promise<{ data?: DeleteResponseBody; error?: string }> {
        try {
            const response = await axios.delete(`${this.baseUrl}/blog/post/all/message`);
            return { data: response.data };
        } catch (error) {
            const axiosError = error as AxiosError;
            return {
                error: axiosError.response?.data?.message ||
                    '[BlogPostConnector][deleteAllRequest] An error occurred while deleting all blog posts.',
            };
        }
    }
}

export default new BlogPostConnector(API_BASE_URL as string);
