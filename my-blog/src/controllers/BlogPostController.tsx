import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BlogPostConnector from '../connectors/BlogPostConnector';
import { PostData } from '../models/PostData';

function paragraph(postBody: string): JSX.Element[] {
    return postBody.split('\n').map((para, index) => (
        <p key={index} className="mb-4">{para}</p>
    ));
}

const BlogPostController = () => {


    const textCountService = new TextCountService();
    
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
