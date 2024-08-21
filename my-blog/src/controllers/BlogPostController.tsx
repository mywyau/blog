import { none, Option, some } from 'fp-ts/Option';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BlogPostConnector from '../connectors/BlogPostConnector';
import { DeleteResponseBody } from '../models/DeleteResponseBody';
import { PostData } from '../models/PostData';
import BlogPostPage from '../views/blog/BlogPostPage';


interface OnDeleteReturn {
    handleDelete: () => Promise<void>;
    loading: Option<boolean>;
    errorMessage: Option<string>;
    deleteResponseBody: Option<DeleteResponseBody>;
}

class BlogPostController {

    onPageLoad = () => {

        const { id } = useParams<{ id: string }>();
        const postId = id ?? 'default-post-id';

        const [post, setPost] = useState<Option<PostData>>(none);
        const [loading, setLoading] = useState<Option<boolean>>(none);
        const [errorMessage, setErrorMessage] = useState<Option<string>>(none);

        // Fetch the post when the component mounts
        useEffect(
            () => {

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
            },
            []  // Empty dependency array means this runs once when the component mounts
        );

        return (
            <BlogPostPage post={post} loading={loading} errorMessage={errorMessage} />
        )
    };

    onDelete = (): OnDeleteReturn => {

        const { id } = useParams<{ id: string }>();
        const postId = id ?? 'default-post-id';

        const [post, setPost] = useState<Option<PostData>>(none);
        const [deleteResponseBody, setDeleteResponseBody] = useState<Option<DeleteResponseBody>>(none)
        const [errorMessage, setErrorMessage] = useState<Option<string>>(none);
        const [loading, setLoading] = useState<Option<boolean>>(none);

        const handleDelete = async () => {

            const confirmDelete = window.confirm("Are you sure you want to delete this blog post?");
            if (!confirmDelete) return;

            setLoading(some(false));
            setErrorMessage(none);

            const previousPost = post; // Save a copy of the current posts for potential rollback

            const { data, error } = await BlogPostConnector.deleteBlogPost(postId);

            if (error) {
                setErrorMessage(some(error));
                setLoading(some(true));
                // setPost(previousPost); // Revert to the previous state if the delete failed
            } else if (data) {
                setDeleteResponseBody(some(data));
            }
        };


        return (
            { handleDelete, loading, errorMessage, deleteResponseBody }
        )
    };
}

export default new BlogPostController;
