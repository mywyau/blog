import { none, Option, some } from 'fp-ts/Option';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BlogPostConnector from '../connectors/BlogPostConnector';
import { PostData } from '../models/PostData';

const UseBlogPost = () => {

    const { id } = useParams<{ id: string }>();
    const postId = id ?? 'default-post-id';

    const [post, setPost] = useState<Option<PostData>>(none);
    const [loading, setLoading] = useState<Option<boolean>>(some(false));
    const [errorMessage, setErrorMessage] = useState<Option<string>>(none);

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(some(true));
            setErrorMessage(none);
            setPost(none);

            const { data, error } = await BlogPostConnector.getViaPostId(postId);

            if (error) {
                setErrorMessage(some(error));
            } else if (data) {
                setPost(some(data));
            }

            setLoading(some(false));
        };

        fetchPost(); // Call the async function
    }, [postId]);

    return { post, loading, errorMessage };
};

export default UseBlogPost;
