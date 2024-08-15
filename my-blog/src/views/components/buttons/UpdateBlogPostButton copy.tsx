import React, { useEffect, useState } from 'react';
import { PostData, updatePostById } from '../../../connectors/BlogPostConnector';

function paragraph(postBody: string): JSX.Element[] {
    return postBody.split('\n').map((para, index) => (
        <p key={index} className="mb-4">{para}</p>
    ));
}

const UpdateBlogPostButton: React.FC = () => {

    const [post, setPost] = useState<PostData | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    // Fetch the post when the component mounts
    useEffect(() => {
        const updatePost = async () => {
            setLoading(true);
            setErrorMessage(null);
            setPost(null);

            const fakeBlogPost: PostData =
            {
                id: 1,
                post_id: "mikey-1",
                title: "updated title",
                body: "Some Content"
            }

            const { data, error } = await updatePostById(fakeBlogPost.post_id, fakeBlogPost); // Replace '1' with the post ID you want to retrieve

            if (error) {
                setErrorMessage(error);
            } else if (data) {
                setPost(data);
            }

            setLoading(false);
        };

        updatePost(); // Call the async function
    }, []); // Empty dependency array means this runs once when the component mounts

    return (
        <div>
            {loading && <p>Loading...</p>}
            {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
            {post && (
                <div className="mt-4">
                    <h1 className="text-2xl font-bold pt-6 pb-6">{post.title}</h1>
                    {paragraph(`${post.id}`)}
                    {paragraph(post.post_id)}
                    {paragraph(post.body)}
                </div>
            )}
        </div>
    );
};

export default UpdateBlogPostButton;
