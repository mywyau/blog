import axios, { AxiosError } from 'axios';
import { PostData } from '../models/PostData';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export interface DeleteResponseBody {
    message: string;
}

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
            const response = await axios.get(`${this.baseUrl}/blog/post/retrieve/all`);
            return { data: response.data };
        } catch (error) {
            const axiosError = error as AxiosError;
            return {
                error: axiosError.response?.data?.message ||
                    '[BlogPostConnector][getAllPosts] An error occurred while fetching all posts.',
            };
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

    async deleteAllRequest(): Promise<{ data?: DeleteResponseBody; error?: string }> {
        try {
            const response = await axios.delete(`${this.baseUrl}/blog/post/all/message`);
            return { data: response.data };
        } catch (error) {
            const axiosError = error as AxiosError;
            return {
                error: axiosError.response?.data?.message || 
                '[BlogPostConnector][deleteAllRequest] An error occurred while deleting the posts.',
            };
        }
    }
}

export default new BlogPostConnector(API_BASE_URL as string);
