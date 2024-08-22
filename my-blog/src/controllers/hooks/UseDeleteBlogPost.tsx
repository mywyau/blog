import { none, Option, some } from 'fp-ts/Option';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import BlogPostConnector from '../../connectors/BlogPostConnector';
import { DeleteResponseBody } from '../../models/DeleteResponseBody';


interface OnDeleteReturn {
    handleDelete: () => Promise<void>;
    loadingState: Option<boolean>;
    deleteErrorMessage: Option<string>;
    deleteResponseBody: Option<DeleteResponseBody>;
}

const UseDeleteBlogPost = (): OnDeleteReturn => {

    const { id } = useParams<{ id: string }>();
    const postId = id ?? 'default-post-id';

    const [deleteResponseBody, setDeleteResponseBody] = useState<Option<DeleteResponseBody>>(none);
    const [deleteErrorMessage, setDeleteErrorMessage] = useState<Option<string>>(none);
    const [loadingState, setLoadingState] = useState<Option<boolean>>(some(false));

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this blog post?");
        if (!confirmDelete) return;

        setLoadingState(some(true));
        setDeleteErrorMessage(none);

        const { data, error } = await BlogPostConnector.deleteBlogPost(postId);

        if (error) {
            setDeleteErrorMessage(some(error));
            setLoadingState(some(false));
        } else if (data) {
            setDeleteResponseBody(some(data));
            setLoadingState(some(false));
        }
    };

    return { handleDelete, loadingState, deleteErrorMessage, deleteResponseBody };
};

export default UseDeleteBlogPost;
