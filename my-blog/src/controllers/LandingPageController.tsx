import React, { useEffect, useState } from 'react';
import { PostData } from '../models/PostData';
import BlogPostService from '../service/BlogPostService';
import LandingPage from '../views/pages/LandingPage';

interface State {
    posts: PostData[];
    errorMessage: string | null;
    loading: boolean;
}

const LandingPageController: React.FC = () => {

    const [state, setState] =
        useState<State>({
            posts: [],
            errorMessage: null,
            loading: true,
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
                        errorMessage: '[LandingPageController][getAllPosts] No blog posts retrieved, database likely empty',
                        loading: false,
                    }));
                } else {
                    setState(prevState => ({
                        ...prevState,
                        posts: data,
                        errorMessage: null,
                        loading: false,
                    }));
                }
            }
        };
        fetchPosts();
    }, []);

    console.log('[LandingPageController][getAllPosts] Data retrieved:', state.posts);

    return (
        <LandingPage posts={state.posts} errorMessage={state.errorMessage ?? ''} />
    );
};

export default LandingPageController;
