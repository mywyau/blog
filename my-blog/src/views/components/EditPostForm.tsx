import React, { useEffect, useState } from 'react';
import BlogPostConnector from '../../connectors/BlogPostConnector';
import { PostData } from '../../models/PostData';
import { useParams } from 'react-router-dom';

const EditPostForm: React.FC = () => {

    const [sqlId, setSqlId] = useState(0);
    const [sqlPost_id, setSqlPostId] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const maxTitleLength = 100;
    const maxPostIdLength = 50;
    const maxContentLength = 20000;

    const { post_id } = useParams<{ post_id: string }>();
    const postIdDefaulted = post_id ?? 'default-post-id'; // Replace 'default-post-id' with an appropriate default value or handle it accordingly

    useEffect(() => {

        const fetchPost = async () => {
            setIsLoading(true);
            setErrorMessage(null);

            const { data, error } = await BlogPostConnector.getViaPostId(postIdDefaulted);

            if (error) {
                setErrorMessage(error);
            } else if (data) {
                // Preset the form fields with the fetched post data
                setSqlId(data.id);
                setSqlPostId(data.post_id);
                setTitle(data.title);
                setContent(data.body);
            }

            setIsLoading(false);
        };

        fetchPost(); // Call the async function when the component mounts
    }, [sqlPost_id]);

    const editPost = async () => {
        if (title.trim() === '' || content.trim() === '') {
            alert('Title and content cannot be empty');
            return;
        }

        setIsLoading(true);
        try {
            const updatedPost: PostData = {
                id: sqlId, // Use the current postId
                post_id: sqlPost_id, // Use the updated post_id from state
                title: title, // Use the updated title from state
                body: content // Use the updated content from state
            };

            const { data, error } = await BlogPostConnector.updatePostById(sqlPost_id, updatedPost);
            if (error) {
                setErrorMessage(error);
                alert(`[EditPostForm][axios.put] Failed to update the blog post. Please try again. ${API_BASE_URL}/blog/post/update`);
            } else {
                console.log('Post edited successfully:', data);
            }
        } catch (error) {
            console.error('Error when editing post:', error);
            alert(`[EditPostForm][axios.put] Failed to update the blog post. Please try again. ${API_BASE_URL}/blog/post/update`);
        } finally {
            setIsLoading(false);
        }
    };

    const remainingTitleChars = maxTitleLength - title.length;
    const remainingPostIdChars = maxPostIdLength - sqlPost_id.length;
    const remainingContentChars = maxContentLength - content.length;

    return (
        <div className="p-4">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    editPost();
                }}
            >
                <div className="mb-4">
                    <label className="block mb-2">
                        Title:
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full border border-gray-300 rounded p-2"
                            maxLength={maxTitleLength}
                            disabled={isLoading}
                        />
                    </label>
                    <p className="text-gray-600 text-sm">
                        {remainingTitleChars} characters remaining
                    </p>
                </div>
                <div>
                    <label className="block mb-2">
                        Post ID:
                        <input
                            type="text"
                            value={post_id}
                            onChange={(e) => setSqlPostId(e.target.value)}
                            className="w-full border border-gray-300 rounded p-2"
                            maxLength={maxPostIdLength}
                            disabled={isLoading}
                        />
                    </label>
                    <p className="text-gray-600 text-sm">
                        {remainingPostIdChars} characters remaining
                    </p>
                </div>
                <div className="mt-4 mb-4">
                    <label className="block mb-2">
                        Content:
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full h-64 border border-gray-300 rounded p-2"
                            maxLength={maxContentLength}
                            disabled={isLoading}
                        />
                    </label>
                    <p className="text-gray-600 text-sm">
                        {remainingContentChars} characters remaining
                    </p>
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-true-blue text-white hover:bg-cambridge-blue px-4 py-2 rounded"
                >
                    {isLoading ? 'Updating...' : 'Update Post'}
                </button>
            </form>
            {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
        </div>
    );
};

export default EditPostForm;
