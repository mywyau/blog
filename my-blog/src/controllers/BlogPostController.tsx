import { none, Option, some } from 'fp-ts/Option';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BlogPostConnector from '../connectors/BlogPostConnector';
import { DeleteResponseBody } from '../models/DeleteResponseBody';
import { PostData } from '../models/PostData';
import BlogPostPage from '../views/blog/BlogPostPage';
import UseBlogPost from './hooks/UseBlogPost';


const BlogPostController: React.FC = () => {

    const { post, loading, errorMessage } = UseBlogPost();

    return (
        <BlogPostPage post={post} loading={loading} errorMessage={errorMessage} />
    );
};

export default BlogPostController;
