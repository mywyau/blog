import React, { useState } from 'react';

import BlogPostConnector, { DeleteResponseBody } from "../../../connectors/BlogPostConnector";
import { PostData } from '../../../models/PostData';


const DeleteButton: React.FC<{ posts: PostData[]; setPosts: React.Dispatch<React.SetStateAction<PostData[]>> }> = ({ posts, setPosts }) => {

    const [deleteResponseBody, setDeleteResponseBody] = useState<DeleteResponseBody | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete all blog posts?");
        if (!confirmDelete) return;

        setLoading(true);
        setErrorMessage(null);
        setDeleteResponseBody(null);

        const previousPosts = [...posts]; // Save a copy of the current posts for potential rollback
        setPosts([]); // Optimistically clear the posts from UI

        const { data, error } = await BlogPostConnector.deleteAllRequest();

        if (error) {
            setErrorMessage(error);
            setPosts(previousPosts); // Revert to the previous state if the delete failed
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
                    // onClick={handleDelete}
                    disabled={loading}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    {loading ? 'Loading...' : 'Delete All Blog Posts'}
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

export default DeleteButton;
