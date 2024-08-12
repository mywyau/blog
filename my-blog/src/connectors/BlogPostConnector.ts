// BlogPostConnector.ts 
import axios, { AxiosError } from 'axios';

const baseUrl = "http://localhost:8080";

export interface PostData {
    title: string;
    body: string; // The content is stored as plain text with newlines separating paragraphs
}

export async function getPostById(id: number): Promise<{ data?: PostData; error?: string }> {
    try {
        const response = await axios.get(`${baseUrl}/blog/post/retrieve/${id}`);
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
        const response = await axios.delete(`${baseUrl}/blog/posts/all/message`);
        return { data: response.data };
    } catch (error) {
        const axiosError = error as AxiosError;
        return {
            error: axiosError.response?.data?.message || 'An error occurred while fetching the post',
        };
    }
};
