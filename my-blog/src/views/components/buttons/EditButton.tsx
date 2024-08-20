import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PostData } from '../../../models/PostData';
import BlogPostConnector from '../../../connectors/BlogPostConnector';

const EditButton = () => {

    const { id } = useParams<{ id: string }>();
    const postId = id ?? 'default-post-id'; // Replace 'default-post-id' with an appropriate default value or handle it accordingly

    const [post, setPost] = useState<PostData | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const editUrl = `/edit-blog-post/${postId}`

    return (
        <div>
            <Link
                id="edit-blog-post-button"
                to={editUrl}
                className="inline-block font-nunito p-2 pr-6 pl-6 rounded-md focus:outline-none bg-gradient-to-r from-primary-start to-primary-end text-white hover:animate-light-up "
            >
                Edit
            </Link>
        </div>
    )
}


export default EditButton;