import { useEffect, useState } from 'react';
import BlogPostConnector from '../connectors/BlogPostConnector';
import { PostData } from '../models/PostData';
import LandingPage from '../views/pages/LandingPage';

class LandingPageController {

    onPageLoad = () => {

        const [posts, setPosts] = useState<PostData[]>([]);
        const [errorMessage, setErrorMessage] = useState<string | null>(null);
        const [loading, setLoading] = useState<boolean>(false);

        useEffect(() => {
            const fetchPost = async () => {
                setErrorMessage(null);
                setPosts([]);

                const { data, error } = await BlogPostConnector.getAllPosts();

                if (error) {
                    setErrorMessage(error);
                } else if (data) {
                    if (data.length === 0) {
                        setErrorMessage(`[LandingPageController][getAllPosts] No blog posts retrieved, data base likely empty`);
                    } else {
                        setPosts(data);
                        console.log('[LandingPageController][getAllPosts] Data retrieved:', data);
                    }
                }

                setLoading(false);
            };

            fetchPost(); // Call the async function when component mounts
        }, []); // Empty dependency array ensures it runs only once on mount

        console.log('[LandingPageController][getViaPostId] Posts:', posts);

        return (
            <LandingPage posts={posts} errorMessage={errorMessage ?? ''} />
        );
    };
}

export default new LandingPageController;
