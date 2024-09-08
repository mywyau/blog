import { Either, fold } from 'fp-ts/lib/Either';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BlogPostConnector from "../../../connectors/BlogPostConnector";
import { default as UserTypes } from '../../../models/ADTs/UserType';
import UserTypeErrors from '../../../models/ADTs/UserTypeErrors';
import { DeleteResponseBody } from '../../../models/DeleteResponseBody';
import { PostData } from '../../../models/PostData';
import AuthService from '../../../service/AuthService';

const DeleteAllBlogPostsButton: React.FC<{ posts: PostData[]; setPosts: React.Dispatch<React.SetStateAction<PostData[]>> }> = ({ posts, setPosts }) => {

    const [deleteResponseBody, setDeleteResponseBody] = useState<DeleteResponseBody | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [userBasedContent, setUserBasedContent] = useState<JSX.Element | null>(null); // Updated the state type to JSX.Element

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


    // Fetch user role when component mounts
    useEffect(() => {
        const renderContent = async () => {
            const result: Either<UserTypeErrors, UserTypes> = await AuthService.getRole();

            fold<UserTypeErrors, UserTypes, void>(
                (error) => {
                    switch (error) {
                        case UserTypeErrors.UnknownUserType:
                            setUserBasedContent(<></>); // Handle unknown user type
                            break;
                        default:
                            setUserBasedContent(<></>); // Handle other errors
                            break;
                    }
                },
                (userType) => {
                    switch (userType) {
                        case UserTypes.Admin:
                            setUserBasedContent(
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
                            break;
                        case UserTypes.Viewer:
                            setUserBasedContent(<></>); // Viewer role doesn't allow deletion
                            break;
                        default:
                            setUserBasedContent(<></>); // Handle any other cases
                            break;
                    }
                }
            )(result);
        };

        renderContent(); // Invoke the function to fetch and set the content based on the user role
    }, []); // Empty dependency array to run only on mount


    return userBasedContent; // Render the content based on the user's role
};

export default DeleteAllBlogPostsButton;
