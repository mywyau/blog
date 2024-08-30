import BlogPostConnector from '../connectors/BlogPostConnector';
import { PostData } from '../models/PostData';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

class BlogPostService {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async getAllPostsNewestFirst(): Promise<{ data: PostData[] | null, error: string | null }> {
        try {
            const { data, error } = await BlogPostConnector.getAllPosts();

            if (error) {
                return { data: null, error };
            }

            if (data) {
                // Sort the posts by the creation date in descending order (newest first)
                const sortedData =
                    data.sort((a, b) => {
                        const dateA = new Date(a.created_at).getTime();
                        const dateB = new Date(b.created_at).getTime();
                        return dateB - dateA; // Newest posts first
                    });

                return { data: sortedData, error: null };
            }

            return { data: null, error: 'No data returned from BlogPostConnector' };
        } catch (err) {
            return { data: null, error: `[BlogPostService][getAllPostsNewestFirst] Unexpected error: ${err}` };
        }
    }
}

export default new BlogPostService(API_BASE_URL as string);
