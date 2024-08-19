import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BlogPostConnector from "../../../connectors/BlogPostConnector";
import { PostData } from '../../../models/PostData';



function paragraph(postBody: string): JSX.Element[] {
    return postBody.split('\n').map((para, index) => (
        <p key={index} className="mb-4">{para}</p>
    ));
}

const GETAndRenderBlogPost: React.FC = () => {

    // Calculate estimated reading time
    const calculateReadingTime = (wordCount: number): string => {
        const wordsPerMinute = 200; // Average reading speed
        const minutes = Math.ceil(wordCount / wordsPerMinute);
        const message = wordsPerMinute < 200 ? `< ${minutes} min read` : `${minutes} min read`;
        return (message);
    };

    const countWords = (text: string): number => {
        return text
            ? text
                .trim()
                .replace(/(\r\n|\n|\r)/gm, "")
                .split(/[.,\s]+/) // Split by spaces, commas, or periods
                .filter(word => word.length > 0) // Filter out any empty strings
                .length
            : 0;
    };

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
                        <h1 className="text-2xl font-bold pt-6 pb-6">{post.title}</h1>
                        <p className='text-sm text-gray-600 mb-6 pt-2'>Word Count: {countWords(post.body)}</p>
                    </div>
                    <div>
                        <p className="text-gray-600 text-sm mb-4">Read time: ~{calculateReadingTime(countWords(post.body))}</p>
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
