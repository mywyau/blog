import React, { useEffect, useState } from 'react';
import { getViaPost_Id, PostData } from '../../../connectors/BlogPostConnector';
import { useParams } from 'react-router-dom';


function paragraph(postBody: string): JSX.Element[] {
    return postBody.split('\n').map((para, index) => (
        <p key={index} className="mb-4">{para}</p>
    ));
}

const GETAndRenderBlogPost: React.FC = () => {

    const { id } = useParams<{ id: string }>();
    const postId = id ?? 'default-post-id'; // Replace 'default-post-id' with an appropriate default value or handle it accordingly

    const [post, setPost] = useState<PostData | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    // Fetch the post when the component mounts
    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            setErrorMessage(null);
            setPost(null);


            const { data, error } = await getViaPost_Id(postId);

            if (error) {
                setErrorMessage(error);
            } else if (data) {
                setPost(data);
            }

            setLoading(false);
        };

        fetchPost(); // Call the async function
    }, []); // Empty dependency array means this runs once when the component mounts

    return (
        <div>
            {loading && <p>Loading...</p>}
            {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
            {post && (
                <div className="mt-4">
                    <h1 className="text-2xl font-bold pt-6 pb-6">{post.title}</h1>
                    {/* {paragraph(`${post.id}`)}
                    {paragraph(post.post_id)} */}
                    {paragraph(post.body)}
                </div>
            )}
        </div>
    );
};

export default GETAndRenderBlogPost;
