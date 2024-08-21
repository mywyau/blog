import React, { useState } from 'react';

import BlogPostConnector from "../../../connectors/BlogPostConnector";
import { DeleteResponseBody } from '../../../models/DeleteResponseBody';
import { PostData } from '../../../models/PostData';


const DeletePostButton: React.FC<{ post: PostData; setPost: React.Dispatch<React.SetStateAction<PostData>> }> = ({ post, setPost }) => {

    const [deleteResponseBody, setDeleteResponseBody] = useState<DeleteResponseBody | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleDelete = async () => {

        const confirmDelete = window.confirm("Are you sure you want to delete this blog post?");
        if (!confirmDelete) return;

        setLoading(true);
        setErrorMessage(null);

        const previousPost = post; // Save a copy of the current posts for potential rollback

        console.log(post.post_id)
        const { data, error } = await BlogPostConnector.deleteBlogPost(post.post_id);

        if (error) {
            setErrorMessage(error);
            setPost(previousPost); // Revert to the previous state if the delete failed
        } else if (data) {
            setDeleteResponseBody(data);
        }

        setLoading(false);
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleDelete();
            }}
        >
            <div>
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    {loading ? 'Loading...' : 'Delete this blog post'}
                </button>

                {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
                {deleteResponseBody && (
                    <div className="mt-4">
                        <p id="delete-button-response-body" className="mb-4">{deleteResponseBody.message}</p>
                    </div>
                )}
            </div>
        </ form>
    );
};

export default DeletePostButton;
