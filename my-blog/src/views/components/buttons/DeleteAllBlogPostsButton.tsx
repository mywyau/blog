import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BlogPostConnector from "../../../connectors/BlogPostConnector";
import UserTypes from '../../../models/ADTs/UserType';
import { DeleteResponseBody } from '../../../models/DeleteResponseBody';
import { PostData } from '../../../models/PostData';
import AuthService from '../../../service/AuthService';
import UserType from '../../../models/ADTs/UserType';

const DeleteAllBlogPostsButton: React.FC<{ posts: PostData[]; setPosts: React.Dispatch<React.SetStateAction<PostData[]>> }> =
    ({ posts, setPosts }) => {

        const [deleteResponseBody, setDeleteResponseBody] = useState<DeleteResponseBody | null>(null);
        const [loading, setLoading] = useState<boolean>(false);
        const [userRole, setUserRole] = useState<UserType | null>(null); // State to track user role

        // Fetch user role when component mounts
        useEffect(() => {
            const fetchUserRole = async () => {
                try {
                    const role = await AuthService.getRole();
                    setUserRole(role); // Set user role to state
                } catch (error) {
                    console.error('Failed to fetch user role:', error);
                    setUserRole(null); // In case of error, set role to null
                }
            };

            fetchUserRole();
        }, []); // Empty dependency array means this effect runs once on mount

        const handleDelete = async () => {
            const confirmDelete = window.confirm("Are you sure you want to delete all blog posts?");
            if (!confirmDelete) return;

            setLoading(true);

            const previousPosts = [...posts]; // Save a copy of the current posts for potential rollback
            setPosts([]); // Optimistically clear the posts from UI

            const { data, error } = await BlogPostConnector.deleteAllRequest();

            if (error) {
                toast.error("Error deleting posts", {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                setPosts(previousPosts); // Revert to the previous state if the delete failed
            } else if (data) {
                setDeleteResponseBody(data);
                toast.success("All blog posts deleted successfully", {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }

            setLoading(false);
        };

        // Conditionally render the delete button based on user role
        if (userRole === UserTypes.Admin) {
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
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                            {loading ? 'Loading...' : 'Delete All Blog Posts'}
                        </button>

                        {deleteResponseBody && (
                            <div className="mt-4">
                                {/* Add any message or confirmation if needed */}
                            </div>
                        )}
                    </div>
                </form>
            );
        } else if (userRole === UserTypes.Viewer) {
            return <></>; // Render message for non-admin users
        } else {
            return <p>Trying to determine user type...</p>; // Show loading if user role is not yet determined
        }
    };

export default DeleteAllBlogPostsButton;
