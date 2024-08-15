// BlogPostConnector.ts 
import axios, { AxiosError } from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

console.log(API_BASE_URL);

export interface PostData {
    id: number;
    post_id: string;
    title: string;
    body: string; // The content is stored as plain text with newlines separating paragraphs
}

export async function getPostById(id: number): Promise<{ data?: PostData; error?: string }> {
    try {
        const response = await axios.get(`${API_BASE_URL}/blog/post/retrieve/${id}`);
        return { data: response.data };
    } catch (error) {
        const axiosError = error as AxiosError;
        return {
            error: axiosError.response?.data?.message || 'An error occurred while fetching the post. The post likely does not exist or has been deleted.',
        };
    }
}

export async function getViaPost_Id(post_id: string): Promise<{ data?: PostData; error?: string }> {
    try {
        const response = await axios.get(`${API_BASE_URL}/blog/post/retrieve/post-id/${post_id}`);
        return { data: response.data };
    } catch (error) {
        const axiosError = error as AxiosError;
        return {
            error: axiosError.response?.data?.message || 'An error occurred while fetching the post. The post likely does not exist or has been deleted.',
        };
    }
}

export async function updatePostById(post_id: string, newPostData: PostData): Promise<{ data?: PostData; error?: string }> {

    const newBlogPostData: PostData = newPostData

    try {
        const response = await axios.put(`${API_BASE_URL}/blog/posts/update/${post_id}`, newBlogPostData);
        return { data: response.data };
    } catch (error) {
        const axiosError = error as AxiosError;
        return {
            error: axiosError.response?.data?.message || 'An error occurred while fetching the post. The post likely does not exist or has been deleted.',
        };
    }
}


// Define the structure of the post data
export interface DeleteResponseBody {
    message: string
}

// Function to fetch post data by ID
export async function deleteAllRequest(): Promise<{ data?: DeleteResponseBody; error?: string }> {
    try {
        const response = await axios.delete(`${API_BASE_URL}/blog/post/all/message`);
        return { data: response.data };
    } catch (error) {
        const axiosError = error as AxiosError;
        return {
            error: axiosError.response?.data?.message || 'An error occurred while fetching the post',
        };
    }
};
