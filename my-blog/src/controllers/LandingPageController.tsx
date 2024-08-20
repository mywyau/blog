import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BlogPostConnector from '../connectors/BlogPostConnector';
import { PostData } from '../models/PostData';
import TextCountService from '../services/TextCountHelper';
import LandingPage from '../views/pages/LandingPage';
import TextCountHelper from '../services/TextCountHelper';

function paragraph(postBody: string): JSX.Element[] {
    return postBody.split('\n').map((para, index) => (
        <p key={index} className="mb-4">{para}</p>
    ));
}

const LandingPageController = () => {

    const textCountHelper = TextCountHelper;

    const [posts, setPosts] = useState<PostData[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            setErrorMessage(null);
            setPosts([]);

            const { data, error } = await BlogPostConnector.getAllPosts();
            if (error) {
                setErrorMessage(error);
            } else if (data) {
                setPosts(data);
                console.log('[LandingPageController][getAllPosts] Data retrieved:', data);
            }

            setLoading(false);
        };

        fetchPost(); // Call the async function when component mounts
    }, []); // Empty dependency array ensures it runs only once on mount
    
    console.log(`[LandingPageController][getViaPostId] ${posts}`)

    return (    
        <LandingPage posts={posts} />
    );
};

export default LandingPageController;
