import React, { useEffect, useState } from 'react';
import { PostData } from '../models/PostData';
import BlogPostService from '../service/BlogPostService';
import LandingPage from '../views/pages/LandingPage';

interface State {
    posts: PostData[];
}

const LandingPageController: React.FC = () => {

    const [state, setState] =
        useState<State>({
            posts: []
        });

    useEffect(() => {
        const fetchPosts = async () => {
            const { data, error } = await BlogPostService.getAllPostsNewestFirst();
            if (error) {
                setState(prevState => ({
                    ...prevState,
                    errorMessage: error,
                    loading: false,
                }));

            } else if (data) {
                console.log('Fetched and sorted posts:', data); // Log sorted data
                if (data.length === 0) {
                    setState(prevState => ({
                        ...prevState,
                        loading: false,
                    }));
                } else {
                    setState(prevState => ({
                        ...prevState,
                        posts: data,
                        loading: false,
                    }));
                }
            }
        };
        fetchPosts();
    }, []);

    console.log('[LandingPageController][getAllPosts] Data retrieved:', state.posts);

    return (
        <LandingPage posts={state.posts} />
    );
};

export default LandingPageController;
