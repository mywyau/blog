import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BlogPostConnector from "../../connectors/BlogPostConnector";
import TextCountHelper from '../../helpers/TextCountHelper';
import { PostData } from '../../models/PostData';


function paragraph(postBody: string): JSX.Element[] {
    return postBody.split('\n').map((para, index) => (
        <p key={index} className="mb-4">{para}</p>
    ));
}

const GETAndRenderBlogPost: React.FC = () => {

    const textCountHelper = TextCountHelper;

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


            const { data, error } = await BlogPostConnector.getViaPostId(postId);

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
                <div>
                    <div className="mt-4">
                        <h1 id="post-title" className="text-2xl font-bold pt-6 pb-6">{post.title}</h1>
                        <p className='text-sm text-gray-600 mb-6 pt-2'>
                            Word Count: {textCountHelper.countWords(post.body)}
                        </p>
                    </div>
                    <div>
                        <p className="text-gray-600 text-sm mb-4">
                            Read time: {textCountHelper.calculateReadingTime(textCountHelper.countWords(post.body))}
                        </p>
                    </div>
                    <div>
                        {paragraph(post.body)}
                    </div>
                </div>
            )}
        </div>
    );
};

export default GETAndRenderBlogPost;
