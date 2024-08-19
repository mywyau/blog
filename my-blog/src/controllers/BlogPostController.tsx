import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BlogPostConnector from '../connectors/BlogPostConnector';
import { PostData } from '../models/PostData';

function paragraph(postBody: string): JSX.Element[] {
    return postBody.split('\n').map((para, index) => (
        <p key={index} className="mb-4">{para}</p>
    ));
}

const calculateReadingTime = (wordCount: number): string => {
    const wordsPerMinute = 200;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    const message = wordsPerMinute < 200 ? `< ${minutes} min read` : `${minutes} min read`;
    return (message);
};

const countWords = (text: string): number => {
    return text
        ? text
            .trim()
            .replace(/(\r\n|\n|\r)/gm, "")
            .split(/[.,\s]+/) // Split by spaces, commas, or periods
            .filter(word => word.length > 0) // Filter out any empty strings
            .length
        : 0;
};

const BlogPostController = () => {

    const [posts, setPosts] = useState<PostData[]>([]);
    const { id } = useParams<{ id: string }>();
    const postId = id ?? 'default-post-id'; // Replace 'default-post-id' with an appropriate default value or handle it accordingly

    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {

        const fetchPost = async () => {
            setLoading(true);
            setErrorMessage(null);
            setPosts([])

            const { data, error } = await BlogPostConnector.getAllPosts();

            if (error) {
                setErrorMessage(error);
            } else if (data) {
                setPosts(data);
            }

            setLoading(false);
        }
        fetchPost(); // Call the async function
    }, [postId, setPosts, posts]);
    return {
        posts,
        setPosts,
        postId,
    };
};

export default BlogPostController;
